# AmmPool API

## getAmmPoolConf

```javascript
const { ammpools, pairs } = await api.getAmmPoolConf();
```

## getAmmPoolUserRewards

```javascript
const response: any = await api.getAmmPoolUserRewards({
  owner: acc.accountId.toString(),
});
```

## getAmmPoolActivityRules

```javascript
const response: any = await api.getAmmPoolActivityRules();
```

## getAmmPoolStats

```javascript
const response: any = await api.getAmmPoolStats();
```

## getAmmPoolSnapshot

```javascript
const request: GetAmmPoolSnapshotRequest = {
  poolAddress,
};

const response = await api.getAmmPoolSnapshot(request, acc.apiKey);
```

## getAmmPoolBalances

```javascript
const response = await api.getAmmPoolBalances();
```

## getAmmPoolTrades

```javascript
const request: GetAmmPoolTradesRequest = {
  ammPoolAddress: poolAddress,
};

const response = await api.getAmmPoolTrades(request);
```

## getUserAmmPoolTxs

```javascript
const request: GetUserAmmPoolTxsRequest = {
  accountId: acc.accountId,
};

const response = await api.getUserAmmPoolTxs(request, acc.apiKey);
```

## joinAmmPool

```javascript
const request2: JoinAmmPoolRequest = {
  owner: acc.address,
  poolAddress,
  joinTokens: {
    pooled: [
      { tokenId: "1", volume: "1000000000000000000000" },
      { tokenId: "0", volume: "1000000000000000000" },
    ],
    minimumLp: { tokenId: "4", volume: "100000" },
  },
  storageIds: [storageId_1.offchainId, storageId.offchainId],
  fee: "1000000000000000000",
};

const patch: AmmPoolRequestPatch = {
  chainId: ChainId.GORLI,
  ammName: "LRCETH-Pool",
  poolAddress,
  eddsaKey: acc.eddsaKey,
};

const response = await api.joinAmmPool(request2, patch, acc.apiKey);
```

## exitAmmPool

```javascript
const request2: ExitAmmPoolRequest = {
  owner: acc.address,
  poolAddress,
  exitTokens: {
    unPooled: [
      { tokenId: "1", volume: "1000000000000000000000" },
      { tokenId: "0", volume: "1000000000000000000" },
    ],
    burned: { tokenId: "4", volume: "100000" },
  },
  storageId: storageId_1.offchainId,
  maxFee: "1000000000000000000",
};

const patch: AmmPoolRequestPatch = {
  chainId: ChainId.GORLI,
  ammName: "LRCETH-Pool",
  poolAddress,
  eddsaKey: acc.eddsaKey,
};

const response = await api.exitAmmPool(request2, patch, acc.apiKey);
```
