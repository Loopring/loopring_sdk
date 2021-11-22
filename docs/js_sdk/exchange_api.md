# Exchange Part

##### 1) getAccount

```javascript
    const request: GetAccountRequest = {
        owner: acc.address
    }
    const response = await api.getAccount(request)
```

##### 2) getRelayerCurrentTime

```javascript
    const response = await api.getRelayerCurrentTime()
```

##### 3) getFiatPrice

```javascript
    const response = await api.getFiatPrice({ legal: 'USD' })
```

##### 4) getLatestTokenPrices

```javascript
    const response = await api.getLatestTokenPrices()
```

##### 5) getAllowances

```javascript
    const request: GetAllowancesRequest = {
        owner: acc.address,
        token: 'LRC,ETH,DAI',
    }

    const tokens = await api.getTokens()

    const response = await api.getAllowances(request, tokens.tokenSymbolMap)
```

##### 6) getAllowances

```javascript
    const request: GetAllowancesRequest = {
        owner: acc.address,
        token: 'LRC,ETH,DAI',
    }

    const tokens = await api.getTokens()

    const response = await api.getAllowances(request, tokens.tokenSymbolMap)
```

##### 7) getTokenBalances

```javascript
    const tokens = await api.getTokens()

    const request: GetTokenBalancesRequest = {
        owner: acc.address,
        token: '',
    }

    const response = await api.getTokenBalances(request, tokens.tokenSymbolMap)
```

##### 8) getMixMarkets

```javascript
    const response = await api.getMixMarkets()
```

##### 9) getTokens

```javascript
    const response = await api.getTokens()
```

##### 10) getDepth

```javascript
    const request: GetDepthRequest = {
        market: ['LRC-ETH']
    }

    const response = await api.getDepth(request)
```

##### 11) getExchangeInfo

```javascript
    const response = await api.getExchangeInfo()
```

##### 12) getTicker

```javascript
    const request: GetTickerRequest = {
        market: 'LRC-ETH',
    }
    const response = await api.getTicker(request)
```

##### 13) getAllTickers

```javascript
    const response = await api.getAllTickers()
```

##### 14) getCandlestick

```javascript
    const request: GetCandlestickRequest = {
        market: 'LRC-ETH',
        interval: TradingInterval.min15,
        limit: 96,
    }
    const response = await api.getCandlestick(request)
```
