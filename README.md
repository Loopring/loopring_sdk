<p align="center">
  <a href="https://github.com/Loopring/loopring_sdk" rel="noopener" target="_blank"><img width="150" src="https://loopring.org/images/logo.svg" alt="Loopring-website"></a>
</p>

<h1 align="center">Loopring SDK</h1>

[![license](https://img.shields.io/badge/license-GPL-blue)](https://github.com/Loopring/loopring_sdk/master/LICENSE)

Software development kit for the Loopring protocol.

See our [Online Docs](https://loopring.github.io/loopring_sdk/)

## Install

```bash
yarn add loopring-sdk
```

## Getting Started

### Initalizing APIs

```javascript
const userApi: UserAPI = new UserApi(ChainId.GORLI);
const exchangeApi: ExchangeAPI = new ExchangeAPI(ChainId.GORLI);
const exchangeApi: AmmpoolAPI = new AmmpoolAPI(ChainId.GORLI);
const wsAPI: WsAPI = new WsAPI(ChainId.GORLI);
const walletAPI: WalletAPI = new WalletAPI(ChainId.GORLI);
const walletAPI: WalletAPI = new WalletAPI(ChainId.GORLI);
```

### Example: (Transfer Process)

1. Initialize the API.

```javascript
const api: UserAPI = new UserApi(ChainId.GORLI);
const exchangeApi: UserAPI = new UserApi(ChainId.GORLI);
```

2. Get the `storageId` for transfer.

```javascript
const request: GetNextStorageIdRequest = {
  accountId: acc.accountId,
  sellTokenId: 1,
};
const storageId = await api.getNextStorageId(request, acc.apiKey);
```

3. Get nonce with `getAccountApi`

```javascript
const { nonce } = await exchangeApi.getAccount({
  owner: acc.address,
});
```

4. Submit for final transfer.

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
