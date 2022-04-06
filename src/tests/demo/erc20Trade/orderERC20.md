# Order ERC20

***
## LRC-ETH : for  Base to Quote

### MOCK Data

```ts
const buy = "LRC",
  sell = "ETH",
  MARKET = "LRC-ETH",
  AMM_MARKET = "AMM-LRC-ETH",
  isAtoB = true,
  slippage = "50"
```

### Step 1. get apikey & eddsaKey

```ts
const {accInfo} = await LoopringAPI.exchangeAPI.getAccount({
  owner: LOOPRING_EXPORTED_ACCOUNT.address,
});
const eddsaKey = await signatureKeyPairMock(accInfo);
apiKey = (
  await LoopringAPI.userAPI.getUserApiKey(
    {
      accountId: accInfo.accountId,
    },
    eddsaKey.sk
  )
).apiKey;
```

### Step Step 2 : storageId

```ts

const storageId = await LoopringAPI.userAPI.getNextStorageId(
  {
    accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
    sellTokenId: TOKEN_INFO.tokenMap[sell].tokenId,
  },
  apiKey
);
```

### Step 3. get user AmountMap, which decided user minimum order

```ts
const amountMap = {
  [AMM_MARKET]: (
    await LoopringAPI.userAPI.getMinimumTokenAmt(
      {
        accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
        market: AMM_MAP[AMM_MARKET].market,
      },
      apiKey
    )
  ).amountMap,
  [MARKET]: (
    await LoopringAPI.userAPI.getMinimumTokenAmt(
      {
        accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
        market: MARKET,
      },
      apiKey
    )
  ).amountMap,
};
```

### Step 4. depth, ammPoolSnapshot ,tickMap

```ts
const [{depth}, {ammPoolSnapshot}] = await Promise.all([
  LoopringAPI.exchangeAPI.getMixDepth({
    market: AMM_MAP["AMM-LRC-ETH"].market,
  }),
  LoopringAPI.ammpoolAPI.getAmmPoolSnapshot({
    poolAddress: AMM_MAP["AMM-LRC-ETH"].address,
  }),
]);
```

### Step 5. check MinAmt

```ts
let buyMinAmtInfo = (amountMap[AMM_MARKET] ?? amountMap[MARKET])[buy];
let takerRate = buyMinAmtInfo
  ? buyMinAmtInfo.userOrderInfo.takerRate
  : 0;
const minAmountInput = buyMinAmtInfo.userOrderInfo.minAmount;
```

### Step 6. calcTradeParams

```ts
const calcTradeParams = sdk.getOutputAmount({
  input: LOOPRING_EXPORTED_ACCOUNT.tradeLRCValue.toString(),
  sell,
  buy,
  isAtoB,
  marketArr: ["LRC-ETH", "ETH-USDT", "DAI-USDT", "USDC-ETH"],
  tokenMap: TOKEN_INFO.tokenMap,
  marketMap: TOKEN_INFO.marketMap,
  depth,
  ammPoolSnapshot: ammPoolSnapshot,
  feeBips: AMM_MAP["AMM-LRC-ETH"].feeBips.toString(),
  takerRate: takerRate ? takerRate.toString() : "0",
  slipBips: slippage,
});
console.log(
  "Buy",
  ",LRC:",
  LOOPRING_EXPORTED_ACCOUNT.tradeLRCValue.toString(),
  ",minAmountInput LRC:",
  minAmountInput,
  ",ETH:",
  calcTradeParams?.amountBOutSlip?.minReceivedVal
);

const response: { hash: string } | any =
  await LoopringAPI.userAPI.submitOrder(
    {
      exchange: LOOPRING_EXPORTED_ACCOUNT.exchangeAddress,
      accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
      storageId: storageId.orderId,
      sellToken: {
        tokenId: TOKEN_INFO.tokenMap[sell].tokenId,
        volume: calcTradeParams?.amountS as string,
      },
      buyToken: {
        tokenId: TOKEN_INFO.tokenMap[buy].tokenId,
        volume: calcTradeParams?.amountBOutSlip.minReceived as string,
      },
      allOrNone: false,
      validUntil: LOOPRING_EXPORTED_ACCOUNT.validUntil,
      maxFeeBips: 63,
      fillAmountBOrS: false, // amm only false
      tradeChannel: calcTradeParams?.exceedDepth
        ? sdk.TradeChannel.BLANK
        : sdk.TradeChannel.MIXED,
      orderType: calcTradeParams?.exceedDepth
        ? sdk.OrderType.ClassAmm
        : sdk.OrderType.TakerOnly,
      eddsaSignature: "",
    },
    eddsaKey.sk,
    apiKey
  );
console.log("submitOrder", response);
```   

***

## ETH-LRC : for Quote to Base

### MOCK Data

> user should had apikey, please check get apikey

```ts
const buy = "ETH",
  sell = "LRC",
  MARKET = "LRC-ETH",
  AMM_MARKET = "AMM-LRC-ETH",
  slippage = "50";
const isAtoB = false;
```

### Step 1. get apikey & eddsaKey

```ts
const {accInfo} = await LoopringAPI.exchangeAPI.getAccount({
  owner: LOOPRING_EXPORTED_ACCOUNT.address,
});
const eddsaKey = await signatureKeyPairMock(accInfo);
apiKey = (
  await LoopringAPI.userAPI.getUserApiKey(
    {
      accountId: accInfo.accountId,
    },
    eddsaKey.sk
  )
).apiKey;
```

### Step  2. storageId

```ts
const storageId = await LoopringAPI.userAPI.getNextStorageId(
  {
    accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
    sellTokenId: TOKEN_INFO.tokenMap[sell].tokenId,
  },
  apiKey
);
```

### Step 3. get user AmountMap, which decided user minimum order

```ts
const amountMap = {
  [AMM_MARKET]: (
    await LoopringAPI.userAPI.getMinimumTokenAmt(
      {
        accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
        market: AMM_MAP[AMM_MARKET].market,
      },
      apiKey
    )
  ).amountMap,
  [MARKET]: (
    await LoopringAPI.userAPI.getMinimumTokenAmt(
      {
        accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
        market: MARKET,
      },
      apiKey
    )
  ).amountMap,
};
```

### Step 4. depth, ammPoolSnapshot ,tickMap

```ts
const [{depth}, {ammPoolSnapshot}] = await Promise.all([
  LoopringAPI.exchangeAPI.getMixDepth({
    market: AMM_MAP["AMM-LRC-ETH"].market,
  }),
  LoopringAPI.ammpoolAPI.getAmmPoolSnapshot({
    poolAddress: AMM_MAP["AMM-LRC-ETH"].address,
  }),
]);
```

### Step 5. check  MinAmt

```ts
const amount: sdk.LoopringMap<sdk.TokenAmount> =
  amountMap[AMM_MARKET] ?? amountMap[MARKET];

let buyMinAmtInfo = amount[buy];
// let sellMinAmtInfo = amount[sell];

let takerRate = buyMinAmtInfo
  ? buyMinAmtInfo.userOrderInfo.takerRate
  : 0;

const minAmountInput = buyMinAmtInfo.userOrderInfo.minAmount;
```

### Step 6. calcTradeParams

```ts
const calcTradeParams = sdk.getOutputAmount({
  input: LOOPRING_EXPORTED_ACCOUNT.tradeETHValue.toString(),
  sell,
  buy,
  isAtoB,
  marketArr: ["LRC-ETH", "ETH-USDT", "DAI-USDT", "USDC-ETH"],
  tokenMap: TOKEN_INFO.tokenMap,
  marketMap: TOKEN_INFO.marketMap,
  depth,
  ammPoolSnapshot: ammPoolSnapshot,
  feeBips: AMM_MAP["AMM-LRC-ETH"].feeBips.toString(),
  takerRate: takerRate ? takerRate.toString() : "0",
  slipBips: slippage,
});
console.log(
  "Buy",
  ",ETH:",
  LOOPRING_EXPORTED_ACCOUNT.tradeLRCValue.toString(),
  ",minAmountInput ETH:",
  minAmountInput,
  ",LRC:",
  calcTradeParams?.amountBOutSlip?.minReceivedVal
);

const response: { hash: string } | any =
  await LoopringAPI.userAPI.submitOrder(
    {
      exchange: LOOPRING_EXPORTED_ACCOUNT.exchangeAddress,
      accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
      storageId: storageId.orderId,
      sellToken: {
        tokenId: TOKEN_INFO.tokenMap[sell].tokenId,
        volume: calcTradeParams?.amountS as string,
      },
      buyToken: {
        tokenId: TOKEN_INFO.tokenMap[buy].tokenId,
        volume: calcTradeParams?.amountBOutSlip.minReceived as string,
      },
      allOrNone: false,
      validUntil: LOOPRING_EXPORTED_ACCOUNT.validUntil,
      maxFeeBips: 63,
      fillAmountBOrS: false, // amm only false
      tradeChannel: calcTradeParams?.exceedDepth
        ? sdk.TradeChannel.BLANK
        : sdk.TradeChannel.MIXED,
      orderType: calcTradeParams?.exceedDepth
        ? sdk.OrderType.ClassAmm
        : sdk.OrderType.TakerOnly,
      eddsaSignature: "",
    },
    eddsaKey.sk,
    apiKey
  );
console.log("submitOrder", response);
```     

