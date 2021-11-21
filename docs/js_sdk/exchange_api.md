# Exchange API

## getAccount

```javascript
const request: GetAccountRequest = {
  owner: acc.address,
};
const response = await api.getAccount(request);
```

## getRelayerCurrentTime

```javascript
const response = await api.getRelayerCurrentTime();
```

## getFiatPrice

```javascript
const response = await api.getFiatPrice({ legal: "USD" });
```

## getLatestTokenPrices

```javascript
const response = await api.getLatestTokenPrices();
```

## getAllowances

```javascript
const request: GetAllowancesRequest = {
  owner: acc.address,
  token: "LRC,ETH,DAI",
};

const tokens = await api.getTokens();

const response = await api.getAllowances(request, tokens.tokenSymbolMap);
```

## getAllowances

```javascript
const request: GetAllowancesRequest = {
  owner: acc.address,
  token: "LRC,ETH,DAI",
};

const tokens = await api.getTokens();

const response = await api.getAllowances(request, tokens.tokenSymbolMap);
```

## getTokenBalances

```javascript
const tokens = await api.getTokens();

const request: GetTokenBalancesRequest = {
  owner: acc.address,
  token: "",
};

const response = await api.getTokenBalances(request, tokens.tokenSymbolMap);
```

## getMixMarkets

```javascript
const response = await api.getMixMarkets();
```

## getTokens

```javascript
const response = await api.getTokens();
```

## getDepth

```javascript
const request: GetDepthRequest = {
  market: ["LRC-ETH"],
};

const response = await api.getDepth(request);
```

## getExchangeInfo

```javascript
const response = await api.getExchangeInfo();
```

## getTicker

```javascript
const request: GetTickerRequest = {
  market: "LRC-ETH",
};
const response = await api.getTicker(request);
```

## getAllTickers

```javascript
const response = await api.getAllTickers();
```

## getCandlestick

```javascript
const request: GetCandlestickRequest = {
  market: "LRC-ETH",
  interval: TradingInterval.min15,
  limit: 96,
};
const response = await api.getCandlestick(request);
```
