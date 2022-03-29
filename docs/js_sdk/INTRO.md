# JS SDK Introduction

## Preinstall

Make sure you are using the original npm registry.

```shell
npm config set registry http://registry.npmjs.org
```

## Install

Using NPM

```shell
npm i @loopring-web/loopring-sdk --save
```

Using Yarn

```shell
yarn add @loopring-web/loopring-sdk
```

## Getting Started

### Initialize the APIs

```javascript
const userApi: UserAPI = new UserApi(ChainId.GORLI);
const exchangeApi: ExchangeAPI = new ExchangeAPI(ChainId.GORLI);
const exchangeApi: AmmpoolAPI = new AmmpoolAPI(ChainId.GORLI);
const wsAPI: WsAPI = new WsAPI(ChainId.GORLI);
const walletAPI: WalletAPI = new WalletAPI(ChainId.GORLI);
const walletAPI: WalletAPI = new WalletAPI(ChainId.GORLI);
```

### Example (Transfer Process)

#### 1. Initialize the api

```ts
const userApi: UserAPI = new UserApi(ChainId.GORLI);
const exchangeApi: UserAPI = new UserApi(ChainId.GORLI);
```

#### 4. Get accInfo & nonce with getAccountApi
```ts
// step 1. get account info & nonce
const { accInfo } = await exchange.getAccount({
  owner: loopring_exported_account.address,
});
const nonce = accInfo.nonce
```

#### 2. Get apiKey & eddsaKey
```ts
const eddsakey = await sign_tools.generateKeyPair({
  web3,
  address: accInfo.owner,
  keySeed: BaseAPI.KEY_MESSAGE.replace(
    "${exchangeAddress}",
    loopring_exported_account.exchangeAddr
  ).replace("${nonce}", (accInfo.nonce - 1).toString()),
  walletType: ConnectorNames.Unknown,
  chainId: ChainId.GOERLI,
});

const { apiKey } = await userApi.getUserApiKey({
  accountId: accInfo.accountId,
}, eddsakey.sk);
```

#### 3. Get storageId for transfer
```ts
const request: GetNextStorageIdRequest = {
  accountId: acc.accountId,
  sellTokenId: 1,
};
const storageId = await api.getNextStorageId(request, apiKey);
```


#### 4. get TransferFee
```ts
const responseFee = await userApi.getOffchainFeeAmt({
  accountId: accInfo.accountId,
    requestType: OffchainFeeReqType.TRANSFER,
}, apiKey);
```

#### 5. Submit internal transfer

```ts
const request: OriginTransferRequestV3 = {
  exchange: acc.exchangeAddr,
  payerAddr: acc.address,
  payerId: acc.accountId,
  payeeAddr: "0xb6AdaC3e924B4985Ad74646FEa3610f14cDFB79c",
  payeeId: 10392,
  storageId: storageId.offchainId,
  token: {
    tokenId: "1",
    volume: "100000000000000000000",
  },
  maxFee: {
    maxFee: {
      tokenId:
      // @ts-ignore
      TOKEN_INFO.tokenMap[
      responseFee.fees[1]?.token?.toString() ?? "LRC"
        ].tokenId,
      volume: responseFee.fees[1]?.fee ?? "9400000000000000000",
    },
  },
  validUntil: VALID_UNTIL,
};

const response = await api.submitInternalTransfer(
  request,
  web3,
  ChainId.GORLI,
  ConnectorNames.Injected,
  eddsaKey,
  apiKey,
  true
);
```

## Error code 

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
> -  v3/wallet: `api will always return a resultInfo object` 
> -  other dex/v3: `api will return a resultInfo object only when catch error`
>
More detail please read code error_codes.ts
