const tokens = {
    "eth": {
        "type": "token",
        "symbol": "ETH",
        "name": "Ethereum",
        "address": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        "decimals": 18
    },
    "dai": {
        "type": "token",
        "symbol": "DAI",
        "name": "DAI Stable",
        "address": "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        "decimals": 18
    },
    "usdc": {
        "type": "token",
        "symbol": "USDC",
        "name": "USD Coin",
        "address": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        "decimals": 6
    },
    "usdt": {
        "type": "token",
        "symbol": "USDT",
        "name": "Tether USD Coin",
        "address": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        "decimals": 6
    },
    "mkr": {
        "type": "token",
        "symbol": "MKR",
        "name": "MakerDAO",
        "address": "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
        "decimals": 18
    },
    "zrx": {
        "type": "token",
        "symbol": "ZRX",
        "name": "0x Protocol",
        "address": "0xe41d2489571d322189246dafa5ebde1f4699f498",
        "decimals": 18
    },
    "rep": {
        "type": "token",
        "symbol": "REP",
        "name": "Augur",
        "address": "0x1985365e9f78359a9b6ad760e32412f4a445e862",
        "decimals": 18
    },
    "tusd": {
        "type": "token",
        "symbol": "TUSD",
        "name": "TrueUSD",
        "address": "0x0000000000085d4780B73119b644AE5ecd22b376",
        "decimals": 18
    },
    "bat": {
        "type": "token",
        "symbol": "BAT",
        "name": "Basic Attention",
        "address": "0x0d8775f648430679a709e98d2b0cb6250d2887ef",
        "decimals": 18
    },
    "knc": {
        "type": "token",
        "symbol": "KNC",
        "name": "Kyber Network",
        "address": "0xdd974d5c2e2928dea5f71b9825b8b646686bd200",
        "decimals": 18
    },
    "wbtc": {
        "type": "token",
        "symbol": "WBTC",
        "name": "Wrapped BTC",
        "address": "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
        "decimals": 8
    },
    "susd": {
        "type": "token",
        "symbol": "SUSD",
        "name": "Synthetix USD",
        "address": "0x57ab1ec28d129707052df4df418d58a2d46d5f51",
        "decimals": 18
    },
    "busd": {
        "type": "token",
        "symbol": "BUSD",
        "name": "Binance USD",
        "address": "0x4Fabb145d64652a948d72533023f6E7A623C7C53",
        "decimals": 18
    },
    "lend": {
        "type": "token",
        "symbol": "LEND",
        "name": "ETH LEND",
        "address": "0x80fB784B7eD66730e8b1DBd9820aFD29931aab03",
        "decimals": 18
    },
    "link": {
        "type": "token",
        "symbol": "LINK",
        "name": "ChainLink Token",
        "address": "0x514910771AF9Ca656af840dff83E8264EcF986CA",
        "decimals": 18
    },
    "mana": {
        "type": "token",
        "symbol": "MANA",
        "name": "Decentraland",
        "address": "0x0F5D2fB29fb7d3CFeE444a200298f468908cC942",
        "decimals": 18
    },
    "snx": {
        "type": "token",
        "symbol": "SNX",
        "name": "Synthetix Network Token",
        "address": "0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F",
        "decimals": 18
    },
    "ceth": {
        "type": "ctoken",
        "symbol": "CETH",
        "name": "Compound ETH",
        "address": "0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5",
        "decimals": 8,
        "factor": 0.75,
        "root": "eth"
    },
    "cdai": {
        "type": "ctoken",
        "symbol": "CDAI",
        "name": "Compound DAI",
        "address": "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643",
        "decimals": 8,
        "factor": 0.75,
        "root": "dai"
    },
    "cusdc": {
        "type": "ctoken",
        "symbol": "CUSDC",
        "name": "Compound USDC",
        "address": "0x39aa39c021dfbae8fac545936693ac917d5e7563",
        "decimals": 8,
        "factor": 0.75,
        "root": "usdc"
    },
    "cusdt": {
        "type": "ctoken",
        "symbol": "CUSDT",
        "name": "Compound USDT",
        "address": "0xf650C3d88D12dB855b8bf7D11Be6C55A4e07dCC9",
        "decimals": 8,
        "factor": 0,
        "root": "usdt"
    },
    "czrx": {
        "type": "ctoken",
        "symbol": "CZRX",
        "name": "Compound ZRX",
        "address": "0xb3319f5d18bc0d84dd1b4825dcde5d5f7266d407",
        "decimals": 8,
        "factor": 0.6,
        "root": "zrx"
    },
    "crep": {
        "type": "ctoken",
        "symbol": "CREP",
        "name": "Compound REP",
        "address": "0x158079ee67fce2f58472a96584a73c7ab9ac95c1",
        "decimals": 8,
        "factor": 0.4,
        "root": "rep"
    },
    "cbat": {
        "type": "ctoken",
        "symbol": "CBAT",
        "name": "Compound BAT",
        "address": "0x6c8c6b02e7b2be14d4fa6022dfd6d75921d90e4e",
        "decimals": 8,
        "factor": 0.6,
        "root": "bat"
    },
    "cwbtc": {
        "type": "ctoken",
        "symbol": "CWBTC",
        "name": "Compound WBTC",
        "address": "0xc11b1268c1a384e55c48c2391d8d480264a3a7f4",
        "decimals": 8,
        "factor": 0,
        "root": "wbtc"
    },
    "curvesusd": {
        "type": "curvetoken",
        "symbol": "CSUSD",
        "name": "Curve SUSD",
        "address": "0xC25a3A3b969415c80451098fa907EC722572917F",
        "decimals": 18
    },
    "aeth": {
        "type": "atoken",
        "symbol": "AETH",
        "name": "Aave ETH",
        "address": "0x3a3A65aAb0dd2A17E3F1947bA16138cd37d08c04",
        "decimals": 18,
        "factor": 0.75,
        "root": "eth"
    },
    "adai": {
        "type": "atoken",
        "symbol": "ADAI",
        "name": "Aave DAI",
        "address": "0xfC1E690f61EFd961294b3e1Ce3313fBD8aa4f85d",
        "decimals": 18,
        "factor": 0.75,
        "root": "dai"
    },
    "ausdc": {
        "type": "atoken",
        "symbol": "AUSDC",
        "name": "Aave USDC",
        "address": "0x9bA00D6856a4eDF4665BcA2C2309936572473B7E",
        "decimals": 6,
        "factor": 0.75,
        "root": "usdc"
    },
    "ausdt": {
        "type": "atoken",
        "symbol": "AUSDT",
        "name": "Aave USDT",
        "address": "0x71fc860F7D3A592A4a98740e39dB31d25db65ae8",
        "decimals": 6,
        "factor": 0,
        "root": "usdt"
    },
    "asusd": {
        "type": "atoken",
        "symbol": "ASUSD",
        "name": "Aave SUSD",
        "address": "0x625aE63000f46200499120B906716420bd059240",
        "decimals": 18,
        "factor": 0,
        "root": "susd"
    },
    "atusd": {
        "type": "atoken",
        "symbol": "ATUSD",
        "name": "Aave TUSD",
        "address": "0x4DA9b813057D04BAef4e5800E36083717b4a0341",
        "decimals": 18,
        "factor": 0.75,
        "root": "tusd"
    },
    "abusd": {
        "type": "atoken",
        "symbol": "ABUSD",
        "name": "Aave BUSD",
        "address": "0x6Ee0f7BB50a54AB5253dA0667B0Dc2ee526C30a8",
        "decimals": 18,
        "factor": 0,
        "root": "busd"
    },
    "abat": {
        "type": "atoken",
        "symbol": "ABAT",
        "name": "Aave BAT",
        "address": "0xE1BA0FB44CCb0D11b80F92f4f8Ed94CA3fF51D00",
        "decimals": 18,
        "factor": 0.6,
        "root": "bat"
    },
    "aknc": {
        "type": "atoken",
        "symbol": "AKNC",
        "name": "Aave KNC",
        "address": "0x9D91BE44C06d373a8a226E1f3b146956083803eB",
        "decimals": 18,
        "factor": 0.6,
        "root": "knc"
    },
    "alend": {
        "type": "atoken",
        "symbol": "ALEND",
        "name": "Aave LEND",
        "address": "0x7D2D3688Df45Ce7C552E19c27e007673da9204B8",
        "decimals": 18,
        "factor": 0.4,
        "root": "lend"
    },
    "alink": {
        "type": "atoken",
        "symbol": "ALINK",
        "name": "Aave LINK",
        "address": "0xA64BD6C70Cb9051F6A9ba1F163Fdc07E0DfB5F84",
        "decimals": 18,
        "factor": 0.65,
        "root": "link"
    },
    "amana": {
        "type": "atoken",
        "symbol": "AMANA",
        "name": "Aave MANA",
        "address": "0x6FCE4A401B6B80ACe52baAefE4421Bd188e76F6f",
        "decimals": 18,
        "factor": 0.6,
        "root": "mana"
    },
    "amkr": {
        "type": "atoken",
        "symbol": "AMKR",
        "name": "Aave MKR",
        "address": "0x7deB5e830be29F91E298ba5FF1356BB7f8146998",
        "decimals": 18,
        "factor": 0.35,
        "root": "mkr"
    },
    "asnx": {
        "type": "atoken",
        "symbol": "ASNX",
        "name": "Aave SNX",
        "address": "0x328C4c80BC7aCa0834Db37e6600A6c49E12Da4DE",
        "decimals": 18,
        "factor": 0,
        "root": "snx"
    },
    "awbtc": {
        "type": "atoken",
        "symbol": "AWBTC",
        "name": "Aave WBTC",
        "address": "0xFC4B8ED459e00e5400be803A9BB3954234FD50e3",
        "decimals": 8,
        "factor": 0.6,
        "root": "wbtc"
    },
    "azrx": {
        "type": "atoken",
        "symbol": "AZRX",
        "name": "Aave ZRX",
        "address": "0x6Fb0855c404E09c47C3fBCA25f08d4E41f9F062f",
        "decimals": 18,
        "factor": 0.6,
        "root": "zrx"
    },
    "arep": {
        "type": "atoken",
        "symbol": "AREP",
        "name": "Aave REP",
        "address": "0x71010A9D003445aC60C4e6A7017c1E89A477B438",
        "decimals": 18,
        "factor": 0.35,
        "root": "rep"
    }
}

export default tokens;