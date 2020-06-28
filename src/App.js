import React, { Component } from 'react';
import Authereum from "authereum";
import Web3 from "web3";
import Web3Modal from "web3modal";
import DSA from "dsa-sdk";
import { Button, Select, InputNumber } from 'antd';
import tokens from "./consts/token";

import './App.css';

const { Option } = Select;

const providerOptions = {
  authereum: {
    package: Authereum // required
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.connectWallet = this.connectWallet.bind(this);
    this.getInstaPoolLiquidity = this.getInstaPoolLiquidity.bind(this);
    this.findArbOpps = this.findArbOpps.bind(this);
    this.executeTransaction = this.executeTransaction.bind(this);
    this.changeAsset = this.changeAsset.bind(this);
    this.changeAmount = this.changeAmount.bind(this);
    this.createDSA = this.createDSA.bind(this);

    this.state = {
      dsa: false,
      availableLiquidity: {},
      arbOpps: [],
      flashloan: {
        asset: "usdc",
        amount: 100
      },
      createAccount: false,
      web3: false
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("New DSA State", this.state.dsa);
    console.log("New Liquidity State", this.state.availableLiquidity);
  }

  async connectWallet() {
    const web3Modal = new Web3Modal({
      network: "mainnet", // optional
      cacheProvider: false, // optional
      providerOptions // required
    });
    const provider = await web3Modal.connect();

    const web3 = new Web3(provider);

    const accounts = await web3.eth.getAccounts()

    const address = accounts[0];

    const dsa = new DSA(web3);

    let dsaId = NaN;

    try {
      const dsaAccounts = await dsa.getAccounts(address);
      if (Array.isArray(dsaAccounts) && dsaAccounts.length) {
        dsaId = dsaAccounts[0].id;
        console.log(dsaId, dsaAccounts);
      } else {
        this.setState({
          createAccount: true,
          web3
        });
        console.log("No DSA", dsaAccounts);
      }
    } catch (error) {
      console.log("Error fetching DSA Accounts", error);
    }

    console.log("DSA ID", dsaId);

    if (dsaId) {
      dsa.setInstance(dsaId); // DSA ID
      this.setState({
        dsa,
        web3
      });
    }

    this.getInstaPoolLiquidity();
  }

  async createDSA() {
    const web3 = this.state.web3;

    const accounts = await web3.eth.getAccounts()

    const address = accounts[0];

    const dsa = new DSA(web3);

    const hash = await dsa.build();

    console.log(hash, address);
  }

  async getInstaPoolLiquidity() {
    if (this.state.dsa) {
      const liquidity = await this.state.dsa.instapool.getLiquidity();
      console.log(liquidity);
      this.setState({
        availableLiquidity: liquidity
      })
    }
  }

  async findArbOpps() {
    const token = this.state.flashloan.asset;
    const amount = this.state.flashloan.amount;
    if (this.state.dsa) {
      const arbOpps = [];
      this.setState({ arbOpps });
      let index = 0;
      for (let [key, val] of Object.entries(tokens)) {
        if (key !== token && val.type === "token") {
          let buyFinal = {};
          let sellFinal = {};
          const buyResultOneInch = await this.state.dsa.oneInch.getBuyAmount(key, token, amount, 0);
          const buyResultKyber = await this.state.dsa.kyber.getBuyAmount(key, token, amount, 0);
          if (buyResultOneInch.buyAmt > buyResultKyber.buyAmt) {
            console.log("1inch", amount, token, "->", key, buyResultOneInch);
            buyFinal = {"amt": 0.999*buyResultOneInch.buyAmt, "dex": "1inch", "unitAmt": buyResultOneInch.unitAmt};
          } else {
            console.log("Kyber", amount, token, "->", key, buyResultKyber);
            buyFinal = {"amt": 0.999*buyResultKyber.buyAmt, "dex": "Kyber", "unitAmt": buyResultKyber.unitAmt};
          }
          const sellResultOneInch = await this.state.dsa.oneInch.getBuyAmount(token, key, buyFinal.amt, 0);
          const sellResultKyber = await this.state.dsa.kyber.getBuyAmount(token, key, buyFinal.amt, 0);
          if (sellResultOneInch.buyAmt > sellResultKyber.buyAmt) {
            console.log("1inch", amount, key, "->", token, sellResultOneInch);
            sellFinal = {"amt": sellResultOneInch.buyAmt, "dex": "1inch", "unitAmt": sellResultOneInch.unitAmt};
          } else {
            console.log("Kyber", amount, key, "->", token, sellResultKyber);
            sellFinal = {"amt": sellResultKyber.buyAmt, "dex": "Kyber",  "unitAmt": sellResultKyber.unitAmt};
          }

          if (sellFinal.amt > amount * 1.001) {
            arbOpps.push({
              "index": index,
              "from": buyFinal.dex,
              "to": sellFinal.dex,
              "amount": amount,
              "fromAmt": buyFinal.amt,
              "toAmt": sellFinal.amt,
              "borrowToken": token,
              "buyToken": key,
              "buyUnitAmt": buyFinal.unitAmt,
              "sellUnitAmt": sellFinal.unitAmt
            });
            this.setState({ arbOpps });
            index++;
          }
        }
      }
    }
  }

  async executeTransaction(index) {
    if (this.state.dsa) {
      if (Array.isArray(this.state.arbOpps) && this.state.arbOpps.length > index) {
        const trxDetails = this.state.arbOpps[index];
        console.log("Executing ", trxDetails);
        let spells = this.state.dsa.Spell();

        let bAmountInWei = this.state.dsa.tokens.fromDecimal(trxDetails.amount, trxDetails.borrowToken);

        spells.add({
          connector: "instapool",
          method: "flashBorrow",
          args: [
            tokens[trxDetails.borrowToken].address,
            bAmountInWei,
            0,
            0
          ]
        });

        if (trxDetails.from === "1inch") {

          spells.add({
            connector: "oneInch",
            method: "sell",
            args: [
              tokens[trxDetails.buyToken].address,
              tokens[trxDetails.borrowToken].address,
              bAmountInWei,
              trxDetails.buyUnitAmt,
              0,
              0
            ]
          });
        } else if (trxDetails.from === "Kyber") {
          spells.add({
            connector: "kyber",
            method: "sell",
            args: [
              tokens[trxDetails.buyToken].address,
              tokens[trxDetails.borrowToken].address,
              bAmountInWei,
              trxDetails.buyUnitAmt,
              0,
              0
            ]
          });
        } else {
          return 0;
        }

        bAmountInWei = this.state.dsa.tokens.fromDecimal(trxDetails.fromAmt, trxDetails.buyToken);

        if (trxDetails.to === "1inch") {
          spells.add({
            connector: "oneInch",
            method: "sell",
            args: [
              tokens[trxDetails.borrowToken].address,
              tokens[trxDetails.buyToken].address,
              bAmountInWei,
              trxDetails.sellUnitAmt,
              0,
              0
            ]
          });
        } else if (trxDetails.to === "Kyber") {
          spells.add({
            connector: "kyber",
            method: "sell",
            args: [
              tokens[trxDetails.borrowToken].address,
              tokens[trxDetails.buyToken].address,
              bAmountInWei,
              trxDetails.sellUnitAmt,
              0,
              0
            ]
          });
        } else {
          return 0;
        }

        spells.add({
          connector: "instapool",
          method: "flashPayback",
          args: [
            tokens[trxDetails.borrowToken].address,
            0,
            0
          ]
        });

        console.log(spells);

        try {
          const trxHash = await this.state.dsa.cast(spells);
          console.log("Transaction went through", trxHash)          
        } catch (error) {
          console.log("Failed Transaction", error);
        }
      }
    }
  }

  changeAsset(value) {
    console.log(`Selected ${value}`);
    const flashloan = {...this.state.flashloan}
    // flashloan.asset = event.target.value;
    flashloan.asset = value;
    this.setState({
      flashloan
    });
  }

  changeAmount(value) {
    const flashloan = {...this.state.flashloan}
    flashloan.amount = Number.parseFloat(value);
    this.setState({
      flashloan
    });
  }

  render() {
    return (
      <div className="App">
        <Button type="primary" onClick={this.connectWallet}>
          Connect Wallet
        </Button>
        { this.state.createAccount ? <Button type="primary" onClick={this.createDSA}>Created DSA Account</Button> : null }
        <h2>Available Liquidity</h2>
        <ul>
          <li>USDC - {this.state.availableLiquidity.usdc}</li>
          <li>DAI - {this.state.availableLiquidity.dai}</li>
          <li>ETH - {this.state.availableLiquidity.eth}</li>
        </ul>
        Asset: 
        <Select value={this.state.flashloan.asset} onChange={this.changeAsset}>
          <Option value="usdc">USDC</Option>
          <Option value="dai">DAI</Option>
          <Option value="eth">ETH</Option>
        </Select>
        Amount: 
        <InputNumber step="0.001" min={10} value={this.state.flashloan.amount} onChange={this.changeAmount} />
        <Button type="primary" onClick={this.findArbOpps}>
          Find Arbitrage Opportunities
        </Button>
        <h2>Available Opportunities</h2>
        <ul>
          {this.state.arbOpps.map(item => (
            <li key={item.index}>
              Flashloan {item.amount} {item.borrowToken} ~ Buy {item.fromAmt} {item.buyToken} from {item.from} ~ Sell {item.buyToken} for {item.toAmt} {item.borrowToken} from {item.to} = Profit {item.toAmt - item.amount} {" "}
              <Button onClick={() => this.executeTransaction(item.index)}>
                Execute
              </Button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}



export default App;
