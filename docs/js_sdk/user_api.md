# User API

## getUserApiKey

```javascript
const request: GetUserApiKeyRequest = {
  accountId: acc.accountId,
};
const response = await api.getUserApiKey(request, acc.eddsaKey);
```

## getUserTranferList

```javascript
const request: GetUserTransferListRequest = {
  accountId: acc.accountId,
};
const response = await api.getUserTranferList(request, acc.apiKey);
```

## getUserTrades

```javascript
const request: GetUserTradesRequest = {
  accountId: acc.accountId,
  market: "AMM-LRC-ETH",
  fillTypes: FilledType.amm,
};
const response = await api.getUserTrades(request, acc.apiKey);
```

## getNextStorageId

```javascript
const request: GetNextStorageIdRequest = {
  accountId: acc.accountId,
  sellTokenId: 1,
};
const response = await api.getNextStorageId(request, acc.apiKey);
```

## getUserFeeRate

```javascript
const request: GetUserFeeRateRequest = {
  accountId: acc.accountId,
  markets: "AMM-LRC-ETH",
};
const response = await api.getUserFeeRate(request, acc.apiKey);
```

## getUserOrderFeeRate

```javascript
const request: GetUserOrderFeeRateRequest = {
  accountId: acc.accountId,
  market: "LRC-ETH",
  tokenB: 0,
  amountB: "1000000000000000000",
};
const response = await api.getUserOrderFeeRate(request, acc.apiKey);
```

## getOffchainFeeAmt

```javascript
const request: GetOffchainFeeAmtRequest = {
  accountId: acc.accountId,
  requestType: OffchainFeeReqType.OFFCHAIN_WITHDRAWAL,
  tokenSymbol: "LRC",
  amount: "1000000000000000000",
};
const type = OffchainFeeReqType.ORDER;
const response = await api.getOffchainFeeAmt(request, acc.apiKey);
```

## getOrderDetails

```javascript
let orderHash = process.env.ORDER_HASH ? process.env.ORDER_HASH : "";
const request: GetOrderDetailsRequest = {
  accountId: acc.accountId,
  orderHash,
};
const response = await api.getOrderDetails(request, acc.apiKey);
```

## getUserBalances

```javascript
const request: GetUserBalancesRequest = {
  accountId: acc.accountId,
  tokens: "0",
};

const response = await api.getUserBalances(request, acc.apiKey);
```

## submitOffchainWithdraw

```javascript
const request: OffChainWithdrawalRequestV3 = {
  exchange: acc.exchangeAddr,
  owner: acc.address,
  to: acc.address,
  accountId: acc.accountId,
  storageId: storageId.offchainId,
  token: {
    tokenId: "1",
    volume: "100000000000000000000",
  },
  maxFee: {
    tokenId: "1",
    volume: "9400000000000000000",
  },
  extraData: "",
  minGas: 0,
  validUntil: VALID_UNTIL,
};

const response = await api.submitOffchainWithdraw(
  request,
  web3,
  ChainId.GORLI,
  ConnectorNames.Injected,
  acc.eddsaKey,
  acc.apiKey,
  false
);
```

## submitInternalTransfer

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
