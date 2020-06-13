import React, { Component } from 'react';
import Authereum from "authereum";
import Web3 from "web3";
import Web3Modal from "web3modal";
import DSA from "dsa-sdk";
import tokens from "./consts/token";

import './App.css';

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

    this.state = {
      dsa: false,
      availableLiquidity: {},
      arbOpps: []
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
        console.log("No DSA", dsaAccounts);
      }
    } catch (error) {
      console.log("Error fetching DSA Accounts", error);
    }

    console.log("DSA ID", dsaId);

    if (dsaId) {
      dsa.setInstance(dsaId); // DSA ID
      this.setState({
        dsa: dsa
      });
    }

    this.getInstaPoolLiquidity();
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

  async findArbOpps(token, amount) {
    if (this.state.dsa) {
      const arbOpps = [];
      for (let [key, val] of Object.entries(tokens)) {
        if (key !== token && val.type === "token") {
          let buyFinal = {};
          let sellFinal = {};
          const buyResultOneInch = await this.state.dsa.oneInch.getBuyAmount(key, token, amount, 0);
          const buyResultKyber = await this.state.dsa.kyber.getBuyAmount(key, token, amount, 0);
          if (buyResultOneInch.buyAmt > buyResultKyber.buyAmt) {
            console.log("1inch", amount, token, "->", key, buyResultOneInch);
            buyFinal = {"amt": buyResultOneInch.buyAmt, "dex": "1inch"};
          } else {
            console.log("Kyber", amount, token, "->", key, buyResultKyber);
            buyFinal = {"amt": buyResultKyber.buyAmt, "dex": "Kyber"};
          }
          const sellResultOneInch = await this.state.dsa.oneInch.getBuyAmount(token, key, buyFinal.amt, 0);
          const sellResultKyber = await this.state.dsa.kyber.getBuyAmount(token, key, buyFinal.amt, 0);
          if (sellResultOneInch.buyAmt > sellResultKyber.buyAmt) {
            console.log("1inch", amount, key, "->", token, sellResultOneInch);
            sellFinal = {"amt": sellResultOneInch.buyAmt, "dex": "1inch"};
          } else {
            console.log("Kyber", amount, key, "->", token, sellResultKyber);
            sellFinal = {"amt": sellResultKyber.buyAmt, "dex": "Kyber"};
          }

          if (sellFinal.amt > amount) {
            arbOpps.push({
              "from": buyFinal.dex,
              "to": sellFinal.dex,
              "amount": amount,
              "fromAmt": buyFinal.amt,
              "toAmt": sellFinal.amt,
              "borrowToken": token,
              "buyToken": key
            });
            this.setState({ arbOpps });
          }
        }
      }
    }
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.connectWallet}>
          Connect Wallet
        </button>
        <h2>Available Liquidity</h2>
        <ul>
          <li>USDC - {this.state.availableLiquidity.usdc}</li>
          <li>DAI - {this.state.availableLiquidity.dai}</li>
          <li>ETH - {this.state.availableLiquidity.eth}</li>
        </ul>
        <button onClick={() => this.findArbOpps("eth", 2)}>
          Find Arbitrage Opportunities
        </button>
      </div>
    );
  }
}



export default App;
