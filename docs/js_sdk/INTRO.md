# JS SDK Introduction
- [Quick Start](#-quick-start)   
- [Initialize the APIs](#1-initialize-the-apis)
- [Simple Demo for Transfer](#2-simple-demo-for-transfer)
- [Error Code](#3-error-code)
- [Reference](#reference)
   - [mockData](#mockdata)
   - [getApiKey](#getapikey)


## 🚀 Quick Start
```shell
# Using npm
npm i @loopring-web/loopring-sdk --save
```
```shell
# Using yarn
yarn add @loopring-web/loopring-sdk
```
> Make sure you are using the original npm registry.  
> `npm config set registry http://registry.npmjs.org`

## 1. Initialize the APIs

```ts
import * as sdk from "@loopring-web/loopring-sdk";
export class LoopringAPI {
  public static userAPI: UserAPI;
  public static exchangeAPI: ExchangeAPI;
  public static ammpoolAPI: AmmpoolAPI;
  public static walletAPI: WalletAPI;
  public static wsAPI: WsAPI;
  public static nftAPI: NFTAPI;
  public static delegate: DelegateAPI;
  public static globalAPI: GlobalAPI;
  public static WhitelistedUserAPI: WhitelistedUserAPI;
  public static contractAPI: typeof ContractAPI;
  public static __chainId__: ChainId;
  public static InitApi = (chainId: ChainId) => {
    LoopringAPI.userAPI = new sdk.UserAPI({ chainId });
    LoopringAPI.exchangeAPI = new sdk.ExchangeAPI({ chainId });
    LoopringAPI.globalAPI = new sdk.GlobalAPI({ chainId });
    LoopringAPI.ammpoolAPI = new sdk.AmmpoolAPI({ chainId });
    LoopringAPI.walletAPI = new sdk.WalletAPI({ chainId });
    LoopringAPI.wsAPI = new sdk.WsAPI({ chainId });
    LoopringAPI.WhitelistedUserAPI = new sdk.WhitelistedUserAPI({ chainId });
    LoopringAPI.nftAPI = new sdk.NFTAPI({ chainId });
    LoopringAPI.__chainId__ = chainId; // 
    LoopringAPI.contractAPI = sdk.ContractAPI;
  };
}
LoopringAPI.InitApi(sdk.ChainId.GOERLI); // LoopringAPI.InitApi(ChainId.MAINNET)
```
- contractAPI -- Ethereum method
- exchangeAPI -- Loopring Exchange Info
- wsAPI -- Websocket
- nftAPI -- NFT metadata & contract Info
- walletAPI -- Wallet Info & Layer1 Info
- userAPI & globalAPI -- layer2 asset(ERC20 & NFT) Info 
- ammpoolAPI -- user layer2 Amm Info

## 2. Simple Demo for Transfer 

[Test MockData](#reference)

---
#### Step1: getAccount -- Layer2 Account info
```ts
const { accInfo } = await LoopringAPI.exchangeAPI.getAccount({
  owner: LOOPRING_EXPORTED_ACCOUNT.address,
});
```
[account.test.ts](https://github.com/Loopring/loopring_sdk/tree/master/src/tests/account/account.test.ts)

---
#### Step2: getUserBalance
```ts
const { userBalances } = await LoopringAPI.userAPI.getUserBalances(
  { accountId: LOOPRING_EXPORTED_ACCOUNT.accountId, tokens: "" },
  apiKey  // Please see the reference get-apikey
);
console.log(`Layer2 ERC20 Balance: ${userBalances}`);
```
[account.test.ts](https://github.com/Loopring/loopring_sdk/tree/master/src/tests/account/account.test.ts)

Reference: [apiKey](#get-apikey)

---
#### Step2: getStorageId
```ts
const request2: GetNextStorageIdRequest = {
  accountId: accInfo.accountId,
  sellTokenId: 1,
};

const storageId = await LoopringAPI.userAPI.getNextStorageId(
  request2,
  apiKey
);
```
[transferNFT.test.ts](https://github.com/Loopring/loopring_sdk/tree/master/src/tests/transfer/transferNFT.test.ts)

---
#### Step3: getFee
```ts
const requestFee: GetNFTOffchainFeeAmtRequest = {
  accountId: accInfo.accountId,
  // tokenAddress: LOOPRING_EXPORTED_ACCOUNT.nftTokenAddress,
  requestType: OffchainNFTFeeReqType.NFT_TRANSFER,
  amount: "0",
};
const responseFee = await LoopringAPI.userAPI.getNFTOffchainFeeAmt(
  requestFee,
  apiKey
);
```
[transferNFT.test.ts](https://github.com/Loopring/loopring_sdk/tree/master/src/tests/transfer/transferNFT.test.ts)

---
#### Step4: submitTransfer
```ts
const request3: OriginNFTTransferRequestV3 = {
  exchange: LOOPRING_EXPORTED_ACCOUNT.exchangeAddr,
  fromAccountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
  fromAddress: LOOPRING_EXPORTED_ACCOUNT.address,
  toAccountId: 0, // toAccountId is not required, input 0 as default
  toAddress: LOOPRING_EXPORTED_ACCOUNT.address2,
  token: {
    tokenId: LOOPRING_EXPORTED_ACCOUNT.nftTokenId,
    nftData: LOOPRING_EXPORTED_ACCOUNT.nftData,
    amount: "1",
  },
  maxFee: {
    tokenId:
      // @ts-ignore
      TOKEN_INFO.tokenMap[responseFee.fees[1]?.token?.toString() ?? "LRC"]
        .tokenId,
    amount: responseFee.fees[1]?.fee ?? "9400000000000000000",
  },
  storageId: storageId.offchainId,
  validUntil: 1667396982,
  // memo: '',
};

const response = await LoopringAPI.userAPI.submitNFTInTransfer({
  request: request3,
  web3,
  chainId: ChainId.GOERLI,
  walletType: ConnectorNames.Unknown,
  eddsaKey: eddsaKey.sk,
  apiKey,
});
console.log("response:", response);

```







## 3. Error code 

### Error format
```ts
/* 
* @param ErrorCode
* Service side code is from  100000 - 199999
* SDK side code is from  500000 - 599999
* 
* @param message
* Service side message show to devlopr debug
* 
* @param msg?
* UI level used, shw to customer, inculde information about error resson and solution 
*/
export interface RESULT_INFO {
  code?: number;
  msg?: string;
  message?: string;
}
```
> We3 Function or API, catch or get any error, will only return a `RESULT_INFO`
> Loopring API current now have two common Error format,
> From sdk it will convert v3/wallet follow dex rule.   
> v3/wallet: `api will always return a resultInfo object`   
> other dex/v3: `api will return a resultInfo object only when catch error`
>
More detail please read code error_codes.ts

## Reference

### mockData
```ts
export const LOOPRING_EXPORTED_ACCOUNT = {
  address: "0x727E0Fa09389156Fc803EaF9C7017338EfD76E7F", // Primary test address
  privateKey:
    "adc22517f2de0093429e5365b042da0ec9299353943db0f0cc104743c69104cf", // Primary test address privateKey
  accountId: 12454,   // Primary test address accountId (from LoopringAPI.exchangeAPI.getAccount)
  address2: "0xb6d8c39D5528357dBCe6BEd82aC71c74e9D19079", // secoundary test address
  privateKey2:
    "e020ed769032ba95d9a5207687a663d6198fe2f5cedf28a250f7cbd8c81a5263", // secoundary test address privateKey
  accountId2: 10488,   // secoundary test address accountId
  addressCF: "0x23dE4Da688c94a66E8bbE9BCc95CB03b4e209C15",  // counter factual test address 
  accountIdCF: 11632, // counter factual test accountId 
  addressContractWallet: "0xD4BD7c71B6d4A09217ccc713f740d6ed8f4EA0cd", // Loopring wallet test address 
  depositAddress: "0xb684B265f650a77afd27Ce0D95252a7329B5bD72", // Loopring depositAddress (from LoopringAPI.exchangeAPI.getExchangeInfo)
  exchangeAddress: "0x2e76EBd1c7c0C8e7c2B875b6d505a260C525d25e",  // Loopring exchangeAddress (from LoopringAPI.exchangeAPI.getExchangeInfo)
  whitelistedAddress: "0x35405E1349658BcA12810d0f879Bf6c5d89B512C",
  whitelistedEddkey:
    "0x27a5b716c7309a30703ede3f1a218cdec857e424a31543f8a658e7d2208db33",
  chainId: 5, // GOERLI  chainId 
  nftTokenAddress: "0x8394cB7e768070217592572582228f62CdDE4FCE", // NFT contract token addrss
  nftTokenId: "32768", // NFT loopring tokenId (from LoopringAPI.userAPI.getUserNFTBalances & LoopringAPI.nftAPI.getInfoForNFTTokens )
  nftId: "0xa0ce8990402955e559799af24ea765b14ffecc32dfa1cce2dadaf20016b074e6",  // NFT token id (contract -> uri)
  nftData: "0x1a2001aac7a1fd00cef07889cdb67b1355f86e5bc9df71cfa44fa1c7b49f598f", // NFT loopring nftData (from LoopringAPI.userAPI.getUserNFTBalances & LoopringAPI.nftAPI.getInfoForNFTTokens )
  testNotOx: "ff7d59d9316eba168837e3ef924bcdfd64b237d8",
  tradeLRCValue: 1000000000000000000,
  tradeETHValue: 0.0001,
  gasPrice: 19, // for test
  gasLimit: 200000, // for test
};

//welcome use [@loopring-web/web3-provider](#https://www.npmjs.com/package/@loopring-web/web3-provider)
const provider = new PrivateKeyProvider(
  LOOPRING_EXPORTED_ACCOUNT.privateKey,
  "https://goerli.infura.io/v3/a06ed9c6b5424b61beafff27ecc3abf3"
);
const provider2 = new PrivateKeyProvider(
  LOOPRING_EXPORTED_ACCOUNT.privateKey2,
  "https://goerli.infura.io/v3/a06ed9c6b5424b61beafff27ecc3abf3"
);
export const web3 = new Web3(provider);
export const web3_2 = new Web3(provider2);
```
welcome use [@loopring-web/web3-provider](#https://www.npmjs.com/package/@loopring-web/web3-provider)

### getApiKey
```ts
const {accInfo} = await LoopringAPI.exchangeAPI.getAccount({
  owner: LOOPRING_EXPORTED_ACCOUNT.address,
});

const eddsakey = await sign_tools.generateKeyPair({
  web3,
  address: accInfo.owner,
  keySeed:
    accInfo.keySeed && accInfo.keySeed !== ""
      ? accInfo.keySeed
      : BaseAPI.KEY_MESSAGE.replace(
        "${exchangeAddress}",
        LOOPRING_EXPORTED_ACCOUNT.exchangeAddr
      ).replace("${nonce}", (accInfo.nonce - 1).toString()),
  walletType: ConnectorNames.MetaMask,
  chainId: ChainId.GOERLI,
});

console.log("eddsakey:", eddsakey.sk);

// step 3 get apikey
const request: GetUserApiKeyRequest = {
  accountId: accInfo.accountId,
};

let {apiKey} = await LoopringAPI.userAPI.getUserApiKey(
  request,
  eddsakey.sk
);

```
