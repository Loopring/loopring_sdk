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

### Initalize the APIs

```javascript
const userApi: UserAPI = new UserApi(ChainId.GORLI);
const exchangeApi: ExchangeAPI = new ExchangeAPI(ChainId.GORLI);
const exchangeApi: AmmpoolAPI = new AmmpoolAPI(ChainId.GORLI);
const wsAPI: WsAPI = new WsAPI(ChainId.GORLI);
const walletAPI: WalletAPI = new WalletAPI(ChainId.GORLI);
const walletAPI: WalletAPI = new WalletAPI(ChainId.GORLI);
```

### Example (Transfer Process)

#### 1. Initalize the api

```javascript
const api: UserAPI = new UserApi(ChainId.GORLI);
const exchangeApi: UserAPI = new UserApi(ChainId.GORLI);
```

#### 2. Get storageId for transfer

```javascript
const request: GetNextStorageIdRequest = {
  accountId: acc.accountId,
  sellTokenId: 1,
};
const storageId = await api.getNextStorageId(request, acc.apiKey);
```

#### 3. Get nonce with getAccountApi

```javascript
const { nonce } = await exchangeApi.getAccount({
  owner: acc.address,
});
```

#### 4. Submit internal transfer

```javascript
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
    tokenId: "1",
    volume: "9400000000000000000",
  },
  validUntil: VALID_UNTIL,
};

const response = await api.submitInternalTransfer(
  request,
  web3,
  ChainId.GORLI,
  ConnectorNames.Injected,
  acc.eddsaKey,
  acc.apiKey,
  true
);
```
