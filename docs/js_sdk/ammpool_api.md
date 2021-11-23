# AmmPool API

## getAmmPoolConf

```typescript
    const { ammpools, pairs } = await api.getAmmPoolConf();
```

## getAmmPoolUserRewards

```typescript
    const response: any = await api.getAmmPoolUserRewards({
      owner: acc.accountId.toString(),
    });
```

## getAmmPoolActivityRules

```typescript
    const response: any = await api.getAmmPoolActivityRules();
```

## getAmmPoolStats

```typescript
    const response: any = await api.getAmmPoolStats();
```

## getAmmPoolSnapshot

```typescript
    const request: GetAmmPoolSnapshotRequest = {
      poolAddress,
    };
    const response = await api.getAmmPoolSnapshot(request, acc.apiKey);
```

## getAmmPoolBalances

```typescript
    const response = await api.getAmmPoolBalances();
```

## getAmmPoolTrades

```typescript
    const request: GetAmmPoolTradesRequest = {
      ammPoolAddress: poolAddress,
    };
    
    const response = await api.getAmmPoolTrades(request);
```

## getUserAmmPoolTxs

```typescript
    const request: GetUserAmmPoolTxsRequest = {
      accountId: acc.accountId,
    };
    
    const response = await api.getUserAmmPoolTxs(request, acc.apiKey);
```

## joinAmmPool

```typescript
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

```typescript
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
