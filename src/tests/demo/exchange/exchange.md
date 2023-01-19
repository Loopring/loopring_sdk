# Loopring Exchange

Definition: Loopring Dex Main API for get Exchange Information, L2 Block, ERC20 Token Information, AMM Information,
Market Config and so on static and dynamic information

***

## getExchangeInfo

```ts
const response = await LoopringAPI.exchangeAPI.getExchangeInfo();
console.log(response);
```

***

## getTokens

```ts
const {tokensMap, coinMap, totalCoinMap, idIndex, addressIndex} =
  await LoopringAPI.exchangeAPI.getTokens<any>();
console.log(
  "tokenMap:",
  tokensMap,
  coinMap,
  totalCoinMap,
  idIndex,
  addressIndex
);
```

***

## getMixMarkets

```ts
const {markets, pairs, tokenArr, tokenArrStr, marketArr, marketArrStr} =
  await LoopringAPI.exchangeAPI.getMixMarkets();
console.log("markets:", markets);
console.log("pairs:", pairs);
console.log("tokenArr:", tokenArr);
console.log("tokenArrStr:", tokenArrStr);
console.log("marketArr", marketArr);
console.log("marketArrStr", marketArrStr);
```

***

## getAmmPoolConf

```ts
const response = await LoopringAPI.ammpoolAPI.getAmmPoolConf();
console.log(response.ammpools);
console.log(response.pairs);
```

***

## getAvailableBroker

```ts
const result = await LoopringAPI.exchangeAPI.getAvailableBroker();
console.log(result);
```

***

## getTokenPrices

```ts
const response = await LoopringAPI.walletAPI.getTokenPrices({
  token: TOKEN_INFO.tokenMap.LRC.address,
});
console.log(response);
```

***

## getLatestTokenPrices

```ts
const response = await LoopringAPI.walletAPI.getLatestTokenPrices();
console.log(response);
```

***

## getLatestTokenPrices_cny

```ts
const response = await LoopringAPI.walletAPI.getLatestTokenPrices({
  currency: sdk.Currency.cny,
});
console.log(response);
```

***

## getWithdrawalAgents

```ts
const response = await LoopringAPI.exchangeAPI.getWithdrawalAgents({
  tokenId: 1,
  amount: "10000000000",
});
console.log(response);
```

***

## getCandlestick

```ts
const response = await LoopringAPI.exchangeAPI.getCandlestick({
  market: "LRC-ETH",
  interval: sdk.TradingInterval.min15,
  limit: 96,
});
console.log(response);
```

***

## getAccountServices

```ts
const response = await LoopringAPI.exchangeAPI.getAccountServices({});
console.log(response);
```

***

## getExchangeFeeInfo

```ts
const response = await LoopringAPI.exchangeAPI.getExchangeFeeInfo<any>();
console.log(response);
console.log(
  response.raw_data[sdk.VipCatergory.ORDERBOOK_TRADING_FEES_STABLECOIN]
);
```

***

## getProtocolPortrait

```ts
const response = await LoopringAPI.exchangeAPI.getProtocolPortrait();
console.log(response);
```

***

## getRecommendedMarkets

```ts
const response = await LoopringAPI.exchangeAPI.getRecommendedMarkets();
console.log(response);
```

***

## getGasPrice

```ts
const response = await LoopringAPI.exchangeAPI.getGasPrice();
console.log(response);
```

***

## getGasPriceRange

```ts
const response = await LoopringAPI.exchangeAPI.getGasPriceRange();
console.log(response);
```

***

## getMarketTrades

```ts
const response = await LoopringAPI.exchangeAPI.getMarketTrades<any>({
  market: "ETH-USDT",
});
console.log(response.raw_data.trades);
```

***

## getRelayerCurrentTime

```ts
const response = await LoopringAPI.exchangeAPI.getRelayerCurrentTime();
console.log(response);
```

***

## getFiatPriceUSD

```ts
const response = await LoopringAPI.exchangeAPI.getFiatPrice({
  legal: "USD",
});
console.log(response);
```

***

## getFiatPriceCNY

```ts
const response = await LoopringAPI.exchangeAPI.getFiatPrice({
  legal: "CNY",
});
console.log(response);
```

***

## getMarkets

```ts
const response = await LoopringAPI.exchangeAPI.getMarkets();
console.log(response);
console.log(response.pairs.LRC.tokenList);

console.log(
  "hasMarket LRC-ETH:",
  sdk.hasMarket(response.marketArr, "LRC-ETH")
);
console.log(
  "market 1:",
  sdk.getExistedMarket(response.marketArr, "LRC", "ETH")
);
console.log(
  "market 2:",
  sdk.getExistedMarket(response.marketArr, "ETH", "LRC")
);
```

***

## getDepth

```ts
const response = await LoopringAPI.exchangeAPI.getDepth({
  market: "LRC-ETH",
});
console.log(response);
```

***

## getTicker

```ts
const response = await LoopringAPI.exchangeAPI.getTicker({
  market: "LRC-ETH",
});
console.log(response);
```

***

## getAllTickers

```ts
const response = await LoopringAPI.exchangeAPI.getAllTickers();
console.log(response);
```

***

## getMixDepth

```ts
const response = await LoopringAPI.exchangeAPI.getMixDepth({
  market: "LRC-ETH",
});
console.log(response);
console.log(response.depth.bids);
```

***

## getMixTicker

```ts
const response = await LoopringAPI.exchangeAPI.getMixTicker({
  market: ["LRC-ETH", "ETH-USDC", "DAI-USDT"].join(","),
});
console.log(response.tickMap["DAI-USDT"]);
```

***

## getAllMixTickers

```ts
const response: any = await LoopringAPI.exchangeAPI.getAllMixTickers();
console.log(response?.tickMap);
```

***

## getMixCandlestickAMM

```ts
const response = await LoopringAPI.exchangeAPI.getMixCandlestick({
  market: "AMM-LRC-ETH",
  interval: sdk.TradingInterval.min15,
  limit: 96,
});
console.log(response);
```

});



