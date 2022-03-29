import Web3 from "web3";

const PrivateKeyProvider = require("truffle-privatekey-provider");

const dumpRequest = async (request: any, currentTestName?: string) => {
  try {
    console.log("--->", request);
    console.log("--->", currentTestName, request.data);
  } catch (error: any) {
    if (error.response) {
      console.log(
        "---error",
        expect.getState().currentTestName,
        error.response.data
      );
    } else {
      console.log("---error", expect.getState().currentTestName, error);
    }
  }
};

const apikey =
  "k5nOMDDQ0ESqcSDakP7IX0FdVuncwZKyulmqxceEYXv1iYBeuJcOo0ClOVa1FbW1";
const edd =
  "0xb445691fce9c899fa2bfcb4d4ed6a08d4dca2e254d1a4147e4d345987f9d41b2";
const ecd =
  "0xb445691fce9c899fa2bfcb4d4ed6a08d4dca2e254d1a4147e4d345987f9d41b2";

const owner = "0xb639fff1f9dd568e3d89966885d2674e3999a603";

const new_account = "0xef439044717c3af35f4f46e52aa99280217a7114";
const acc_pwd = "";

const exAddr = "0x2e76EBd1c7c0C8e7c2B875b6d505a260C525d25e";

const privateKey =
  "adc22517f2de0093429e5365b042da0ec9299353943db0f0cc104743c69104cf";

const provider = new PrivateKeyProvider(
  privateKey,
  "https://goerli.infura.io/v3/a06ed9c6b5424b61beafff27ecc3abf3"
);
const web3 = new Web3(provider);

const local_web3 = () => {
  return new Web3("http://127.0.0.1:8545");
};
const nftTokenAddress = "0x662168Dc15F4D516bE7741f3BBC3592Ea9A6eDB5";
const nftId =
  "0x0000000000000000000000000000000000000000000000000000000000000099";
const nftData =
  "0x20771c3bac05b4225b2203c39001b4222e0934597dfb74ab145147da67f91e7f";

export const TOKEN_INFO = {
  addressIndex: {
    "0x0000000000000000000000000000000000000000": "ETH",
    "0xfc28028d9b1f6966fe74710653232972f50673be": "LRC",
    "0xd4e71c4bb48850f5971ce40aa428b09f242d3e8a": "USDT",
    "0xfeb069407df0e1e4b365c10992f1bc16c078e34b": "LP-LRC-ETH",
    "0x049a02fa9bc6bd54a2937e67d174cc69a9194f8e": "LP-ETH-USDT",
    "0xcd2c81b322a5b530b5fa3432e57da6803b0317f7": "DAI",
    "0x47525e6a5def04c9a56706e93f54cc70c2e8f165": "USDC",
    "0xf37cf4ced77b985708d591acc6bfd08586ab3409": "LP-USDC-ETH",
  },
  tokenMap: {
    ETH: {
      type: "ETH",
      tokenId: 0,
      symbol: "ETH",
      name: "Ethereum",
      address: "0x0000000000000000000000000000000000000000",
      decimals: 18,
      precision: 7,
      precisionForOrder: 3,
      orderAmounts: {
        minimum: "5000000000000000",
        maximum: "1000000000000000000000",
        dust: "200000000000000",
      },
      luckyTokenAmounts: {
        minimum: "50000000000000",
        maximum: "1000000000000000000000",
        dust: "50000000000000",
      },
      fastWithdrawLimit: "100000000000000000000",
      gasAmounts: {
        distribution: "85000",
        deposit: "100000",
      },
      enabled: true,
      isLpToken: false,
      tradePairs: ["LRC", "USDT", "USDC"],
    },
    LRC: {
      type: "ERC20",
      tokenId: 1,
      symbol: "LRC",
      name: "Loopring",
      address: "0xfc28028d9b1f6966fe74710653232972f50673be",
      decimals: 18,
      precision: 3,
      precisionForOrder: 3,
      orderAmounts: {
        minimum: "5000000000000000000",
        maximum: "5000000000000000000000000",
        dust: "5000000000000000000",
      },
      luckyTokenAmounts: {
        minimum: "50000000000000000",
        maximum: "5000000000000000000000000",
        dust: "50000000000000000",
      },
      fastWithdrawLimit: "750000000000000000000000",
      gasAmounts: {
        distribution: "101827",
        deposit: "200000",
      },
      enabled: true,
      isLpToken: false,
      tradePairs: ["ETH"],
    },
    USDT: {
      type: "ERC20",
      tokenId: 2,
      symbol: "USDT",
      name: "USDT",
      address: "0xd4e71c4bb48850f5971ce40aa428b09f242d3e8a",
      decimals: 6,
      precision: 2,
      precisionForOrder: 3,
      orderAmounts: {
        minimum: "5000000",
        maximum: "2000000000000",
        dust: "250000",
      },
      luckyTokenAmounts: {
        minimum: "50000",
        maximum: "200000000000",
        dust: "50000",
      },
      fastWithdrawLimit: "250000000000",
      gasAmounts: {
        distribution: "106233",
        deposit: "200000",
      },
      enabled: true,
      isLpToken: false,
      tradePairs: ["ETH", "DAI"],
    },
    "LP-LRC-ETH": {
      type: "ERC20",
      tokenId: 4,
      symbol: "LP-LRC-ETH",
      name: "AMM-LRC-ETH",
      address: "0xfeb069407df0e1e4b365c10992f1bc16c078e34b",
      decimals: 8,
      precision: 6,
      precisionForOrder: 3,
      orderAmounts: {
        minimum: "100000000",
        maximum: "10000000000000000000",
        dust: "100000000",
      },
      luckyTokenAmounts: {
        minimum: "100000000",
        maximum: "10000000000000000000",
        dust: "100000000",
      },
      fastWithdrawLimit: "20000000000",
      gasAmounts: {
        distribution: "150000",
        deposit: "200000",
      },
      enabled: true,
      isLpToken: true,
    },
    "LP-ETH-USDT": {
      type: "ERC20",
      tokenId: 7,
      symbol: "LP-ETH-USDT",
      name: "LP-ETH-USDT",
      address: "0x049a02fa9bc6bd54a2937e67d174cc69a9194f8e",
      decimals: 8,
      precision: 6,
      precisionForOrder: 3,
      orderAmounts: {
        minimum: "100000000",
        maximum: "10000000000000",
        dust: "100000000",
      },
      luckyTokenAmounts: {
        minimum: "100000000",
        maximum: "10000000000000",
        dust: "100000000",
      },
      fastWithdrawLimit: "20000000000",
      gasAmounts: {
        distribution: "150000",
        deposit: "200000",
      },
      enabled: true,
      isLpToken: true,
    },
    DAI: {
      type: "ERC20",
      tokenId: 6,
      symbol: "DAI",
      name: "dai",
      address: "0xcd2c81b322a5b530b5fa3432e57da6803b0317f7",
      decimals: 18,
      precision: 6,
      precisionForOrder: 3,
      orderAmounts: {
        minimum: "10000000000000000000",
        maximum: "100000000000000000000000",
        dust: "10000000000000000",
      },
      luckyTokenAmounts: {
        minimum: "10000000000000000000",
        maximum: "100000000000000000000000",
        dust: "10000000000000000000",
      },
      fastWithdrawLimit: "10000000000000000000000",
      gasAmounts: {
        distribution: "150000",
        deposit: "200000",
      },
      enabled: true,
      isLpToken: false,
      tradePairs: ["USDT"],
    },
    USDC: {
      type: "USDC",
      tokenId: 8,
      symbol: "USDC",
      name: "USDC",
      address: "0x47525e6a5def04c9a56706e93f54cc70c2e8f165",
      decimals: 6,
      precision: 6,
      precisionForOrder: 3,
      orderAmounts: {
        minimum: "1000",
        maximum: "10000000000000000000",
        dust: "100",
      },
      luckyTokenAmounts: {
        minimum: "1000000",
        maximum: "10000000000",
        dust: "1000000",
      },
      fastWithdrawLimit: "20000000000000000000",
      gasAmounts: {
        distribution: "150000",
        deposit: "200000",
      },
      enabled: true,
      isLpToken: false,
      tradePairs: ["ETH"],
    },
    "LP-USDC-ETH": {
      type: "LP-USDC-ETH",
      tokenId: 9,
      symbol: "LP-USDC-ETH",
      name: "LP-USDC-ETH",
      address: "0xf37cf4ced77b985708d591acc6bfd08586ab3409",
      decimals: 8,
      precision: 7,
      precisionForOrder: 3,
      orderAmounts: {
        minimum: "100000",
        maximum: "1000000000000000000000000000000000000000",
        dust: "10000",
      },
      luckyTokenAmounts: {
        minimum: "1000000000000000",
        maximum: "10000000000000000000",
        dust: "1000000000000000",
      },
      fastWithdrawLimit: "20000000000000000000",
      gasAmounts: {
        distribution: "150000",
        deposit: "200000",
      },
      enabled: true,
      isLpToken: true,
    },
  },
  idIndex: {
    "0": "ETH",
    "1": "LRC",
    "2": "USDT",
    "4": "LP-LRC-ETH",
    "6": "DAI",
    "7": "LP-ETH-USDT",
    "8": "USDC",
    "9": "LP-USDC-ETH",
  },
};

const loopring_exported_account = {
  name: "DEV Account 1",
  exchangeName: "LoopringDEX: V2",
  privateKey:
    "adc22517f2de0093429e5365b042da0ec9299353943db0f0cc104743c69104cf",
  privateKey2:
    "e020ed769032ba95d9a5207687a663d6198fe2f5cedf28a250f7cbd8c81a5263",
  depositAddr: "0xb684B265f650a77afd27Ce0D95252a7329B5bD72",
  exchangeAddr: "0x2e76EBd1c7c0C8e7c2B875b6d505a260C525d25e",
  address: "0xff7d59d9316eba168837e3ef924bcdfd64b237d8",
  address2: "0xb6d8c39D5528357dBCe6BEd82aC71c74e9D19079",
  accountId: 10083,
  accountId2: 10488,
  addressWhitlisted: "0x35405E1349658BcA12810d0f879Bf6c5d89B512C",
  apiKey: "2PYgTOZwXHkPXtJMlOMG06ZX1QKJInpoky6iYIbtMgmkbfdL4PvxyEOj0LPOfgYX",
  chainId: 5,
  publicKeyX:
    "0x1256c6535c9de10e874a59d098364ea67f6341a0e519971068b916d94ab95476",
  publicKeyY:
    "0x1a84c4104e002c506302239c8c68756b91cfa62a7a6d76be6fa8534b2feba3a3",
  ecdsaKey: "",
  eddsaKey: "0x27a5b716c7309a30703ede3f1a218cdec857e424a31543f8a658e7d2208db33",
  nftTokenAddress,
  nftId,
  nftData,
  nftTokenID: 32777,
  testNotOx: "ff7d59d9316eba168837e3ef924bcdfd64b237d8",
};

export {
  local_web3,
  dumpRequest,
  apikey,
  exAddr,
  edd,
  ecd,
  owner,
  new_account,
  acc_pwd,
  loopring_exported_account,
  web3,
};
