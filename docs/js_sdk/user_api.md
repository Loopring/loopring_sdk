# User API

## Customer KeySeed

### Customer KeySeed format
BaseAPI.KEY_MESSAGE is a static for BaseAPI, storage loopring Sign message
` with key nonce: ${nonce}` should be end of the string


>_**Preview loopring customer keySeed is default value,
> Api will return an empty keySeed,
> please keep them signature follow the loopring message
> 
> ```BaseAPI.KEY_MESSAGE.replace("${exchangeAddress}",exchangeInfo.exchangeAddress).replace("${nonce}", (nonce - 1).toString())```**_
> 
> More detail read unit test updateAccount & getUserApiKey & customer_keySeed

extends BaseAPI list:
- AmmpoolAPI
- DelegateAPI
- ExchangeAPI
- GlobalAPI
- NFTAPI
- UserAPI
- WalletAPI
- WhitelistedUserAPI
- WsAPI

updateAccount generateKeyPair
```ts 
    /**
     * Customer KEY_MESSAGE as a const at website local
     * @description Suggest follow this format,but you can use your owne message.
     * But make sure noece is include, ${nonce} important for support reset user apikey
     * ` with key nonce: ${nonce}` should be end of string
 *    
     *  @example Loopring office keyseed format example
     * export const KEY_MESSAGE =  "*** your message **** " +
     * " with key nonce: " +  // required
     * "${nonce}";   // required, plese keep nonce varibale is inside the message; 
     */
    export const KEY_MESSAGE = 
        "*** your message **** " +
        " with key nonce: " +
        "${nonce}";

    const eddsakey = await sign_tools.generateKeyPair({
      web3,
      address: accInfo.owner,
      // if KEY_MESSAGE is emyty,please keep loopring KEY_MESSAGE work
      keySeed: KEY_MESSAGE ? KEY_MESSAGE.replace("${nonce}", (accInfo.nonce).toString()) 
        : GlobalAPI.KEY_MESSAGE.replace(
        "${exchangeAddress}",
        exchangeInfo.exchangeAddress
      ).replace("${nonce}", (accInfo.nonce).toString()),
      walletType: ConnectorNames.MetaMask,
      chainId: ChainId.GOERLI,
    });
    const request = {
      exchange: exchangeInfo.exchangeAddress,
      owner: accInfo.owner,
      accountId: accInfo.accountId,
      publicKey: { x: eddsaKey.formatedPx, y: eddsaKey.formatedPy },
      maxFee: {
        tokenId: 1,
        volume: "100000000000000000",
      },
      keySeed,
      validUntil: VALID_UNTIL,
      nonce: accInfo.nonce as number,
    };
    const result = await userApi.updateAccount({
      request,
      web3,
      chainId: ChainId.GOERLI,
      walletType: ConnectorNames.Unknown,
      isHWAddr: false,
  });
```

### Customer KeySeed return
if Customer keySeed is set up `getAccount`, will return the string `.keySeed`.
`generateKeyPair` directory use this keySeed

```ts
    const { accInfo } = await exchange.getAccount({
    owner: loopring_exported_account.address,
    });
    console.log(accInfo.keySeed)
```

### generateKeyPair for signature
generateKeyPair when signature accInfo.keySeed
```ts
  const { accInfo } = await exchange.getAccount({
    owner: loopring_exported_account.address,
  });
  const nonce = accInfo.nonce;
  const eddsaKey = await sign_tools.generateKeyPair({
    web3,
    address: accInfo.owner,
    /**
     * Preview loopring customer keySeed is default value,
     * Api will return an empty keySeed, 
     * please keep them signature follow the loopring message
     * please keep using loopring KEY_MESSAGE  
     * "Sign this message to access Loopring Exchange: " + "${exchangeAddress}" + " with key nonce: " + "${nonce}";
     */
    keySeed: account.keySeed && account.keySeed !== ""
      ? account.keySeed
      : GlobalAPI.KEY_MESSAGE.replace(
        "${exchangeAddress}",
        exchangeInfo.exchangeAddress
      ).replace("${nonce}", (nonce - 1).toString()),
    walletType: ConnectorNames.MetaMask,
    chainId: ChainId.GOERLI,
  });
  console.log("eddsakey:", eddsaKey.sk);
  const request: GetUserApiKeyRequest = {
    accountId: acc.accountId,
  };
  const response = await api.getUserApiKey(request, acc.eddsaKey);
```

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
