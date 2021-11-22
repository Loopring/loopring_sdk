# Whitelisted User Part

##### 1) getUserAssets

```javascript
    // step 1. get account info
            const request: GetUserAssetsRequest = {
                wallet: '0xeF041462825bFdF79b2f1f02A70b2753cB5b1516',
                offset: 10,
                limit: 10,
            }

            const response = await api.getUserAssets(request)
```

##### 2) getTokenPrices

```javascript
    // step 1. get account info
            const request: GetTokenPricesRequest = {
                token: '0xdac17f958d2ee523a2206206994597c13d831ec7'
            }

            const response = await api.getTokenPrices(request)
```

##### 3) getLatestTokenPrices

```javascript
    // step 1. get account info
            const response = await api.getLatestTokenPrices()
```
