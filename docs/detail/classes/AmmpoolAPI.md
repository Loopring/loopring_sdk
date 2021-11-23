[@loopring-web/loopring-sdk](../README.md) / [Exports](../modules.md) / AmmpoolAPI

# Class: AmmpoolAPI

## Hierarchy

- `BaseAPI`

  ↳ **`AmmpoolAPI`**

## Table of contents

### Constructors

- [constructor](AmmpoolAPI.md#constructor)

### Properties

- [baseUrl](AmmpoolAPI.md#baseurl)

### Methods

- [exitAmmPool](AmmpoolAPI.md#exitammpool)
- [getAmmAssetHistory](AmmpoolAPI.md#getammassethistory)
- [getAmmPoolActivityRules](AmmpoolAPI.md#getammpoolactivityrules)
- [getAmmPoolBalances](AmmpoolAPI.md#getammpoolbalances)
- [getAmmPoolConf](AmmpoolAPI.md#getammpoolconf)
- [getAmmPoolGameRank](AmmpoolAPI.md#getammpoolgamerank)
- [getAmmPoolGameUserRank](AmmpoolAPI.md#getammpoolgameuserrank)
- [getAmmPoolSnapshot](AmmpoolAPI.md#getammpoolsnapshot)
- [getAmmPoolStats](AmmpoolAPI.md#getammpoolstats)
- [getAmmPoolTrades](AmmpoolAPI.md#getammpooltrades)
- [getAmmPoolTxs](AmmpoolAPI.md#getammpooltxs)
- [getAmmPoolUserRewards](AmmpoolAPI.md#getammpooluserrewards)
- [getLiquidityMining](AmmpoolAPI.md#getliquiditymining)
- [getLiquidityMiningUserHistory](AmmpoolAPI.md#getliquiditymininguserhistory)
- [getOrderList](AmmpoolAPI.md#getorderlist)
- [getUserAmmPoolTxs](AmmpoolAPI.md#getuserammpooltxs)
- [joinAmmPool](AmmpoolAPI.md#joinammpool)
- [makeReq](AmmpoolAPI.md#makereq)
- [setBaseUrl](AmmpoolAPI.md#setbaseurl)
- [setChainId](AmmpoolAPI.md#setchainid)

## Constructors

### constructor

• **new AmmpoolAPI**(`param`, `timeout?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `param` | `InitParam` | `undefined` |
| `timeout` | `number` | `DEFAULT_TIMEOUT` |

#### Inherited from

BaseAPI.constructor

#### Defined in

[api/base_api.ts:29](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/base_api.ts#L29)

## Properties

### baseUrl

• `Protected` **baseUrl**: `string` = `''`

#### Inherited from

BaseAPI.baseUrl

#### Defined in

[api/base_api.ts:26](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/base_api.ts#L26)

## Methods

### exitAmmPool

▸ **exitAmmPool**(`request`, `patch`, `apiKey`): `Promise`<{ `exitAmmPoolResult`: [`ExitAmmPoolResult`](../interfaces/ExitAmmPoolResult.md) ; `raw_data`: `any`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`ExitAmmPoolRequest`](../interfaces/ExitAmmPoolRequest.md) |
| `patch` | [`AmmPoolRequestPatch`](../interfaces/AmmPoolRequestPatch.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `exitAmmPoolResult`: [`ExitAmmPoolResult`](../interfaces/ExitAmmPoolResult.md) ; `raw_data`: `any`  }\>

#### Defined in

[api/ammpool_api.ts:549](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/ammpool_api.ts#L549)

___

### getAmmAssetHistory

▸ **getAmmAssetHistory**(`request`): `Promise`<{ `dataSeries`: `any` ; `market`: `any` ; `poolAddress`: `any` ; `raw_data`: `any`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetAmmAssetRequest`](../interfaces/GetAmmAssetRequest.md) |

#### Returns

`Promise`<{ `dataSeries`: `any` ; `market`: `any` ; `poolAddress`: `any` ; `raw_data`: `any`  }\>

#### Defined in

[api/ammpool_api.ts:281](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/ammpool_api.ts#L281)

___

### getAmmPoolActivityRules

▸ **getAmmPoolActivityRules**(): `Promise`<{ `activityRules`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`AmmPoolActivityRule`](../interfaces/AmmPoolActivityRule.md)\> ; `groupByActivityStatus`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`AmmPoolActivityRule`](../interfaces/AmmPoolActivityRule.md)[]\> ; `groupByRuleType`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`AmmPoolActivityRule`](../interfaces/AmmPoolActivityRule.md)[]\> ; `groupByRuleTypeAndStatus`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`LoopringMap`](../interfaces/LoopringMap.md)<[`AmmPoolActivityRule`](../interfaces/AmmPoolActivityRule.md)[]\>\> ; `raw_data`: `any`  }\>

#### Returns

`Promise`<{ `activityRules`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`AmmPoolActivityRule`](../interfaces/AmmPoolActivityRule.md)\> ; `groupByActivityStatus`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`AmmPoolActivityRule`](../interfaces/AmmPoolActivityRule.md)[]\> ; `groupByRuleType`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`AmmPoolActivityRule`](../interfaces/AmmPoolActivityRule.md)[]\> ; `groupByRuleTypeAndStatus`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`LoopringMap`](../interfaces/LoopringMap.md)<[`AmmPoolActivityRule`](../interfaces/AmmPoolActivityRule.md)[]\>\> ; `raw_data`: `any`  }\>

#### Defined in

[api/ammpool_api.ts:199](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/ammpool_api.ts#L199)

___

### getAmmPoolBalances

▸ **getAmmPoolBalances**(): `Promise`<{ `ammpoolsbalances`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`AmmPoolBalance`](../interfaces/AmmPoolBalance.md)\> ; `raw_data`: `any`  }\>

#### Returns

`Promise`<{ `ammpoolsbalances`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`AmmPoolBalance`](../interfaces/AmmPoolBalance.md)\> ; `raw_data`: `any`  }\>

#### Defined in

[api/ammpool_api.ts:364](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/ammpool_api.ts#L364)

___

### getAmmPoolConf

▸ **getAmmPoolConf**(): `Promise`<{ `ammpools`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`AmmPoolInfoV3`](../interfaces/AmmPoolInfoV3.md)\> ; `pairs`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`TokenRelatedInfo`](../interfaces/TokenRelatedInfo.md)\> ; `raw_data`: `any`  }\>

#### Returns

`Promise`<{ `ammpools`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`AmmPoolInfoV3`](../interfaces/AmmPoolInfoV3.md)\> ; `pairs`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`TokenRelatedInfo`](../interfaces/TokenRelatedInfo.md)\> ; `raw_data`: `any`  }\>

#### Defined in

[api/ammpool_api.ts:54](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/ammpool_api.ts#L54)

___

### getAmmPoolGameRank

▸ **getAmmPoolGameRank**(`request`): `Promise`<{ `raw_data`: `any` ; `totalRewards`: [`TokenVolumeV3`](../interfaces/TokenVolumeV3.md)[] ; `userRankList`: [`GameRankInfo`](../interfaces/GameRankInfo.md)[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetAmmPoolGameRankRequest`](../interfaces/GetAmmPoolGameRankRequest.md) |

#### Returns

`Promise`<{ `raw_data`: `any` ; `totalRewards`: [`TokenVolumeV3`](../interfaces/TokenVolumeV3.md)[] ; `userRankList`: [`GameRankInfo`](../interfaces/GameRankInfo.md)[]  }\>

#### Defined in

[api/ammpool_api.ts:141](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/ammpool_api.ts#L141)

___

### getAmmPoolGameUserRank

▸ **getAmmPoolGameUserRank**(`request`, `apiKey`): `Promise`<{ `raw_data`: `any` ; `userRank`: [`GameRankInfo`](../interfaces/GameRankInfo.md)  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetAmmPoolGameUserRankRequest`](../interfaces/GetAmmPoolGameUserRankRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `any` ; `userRank`: [`GameRankInfo`](../interfaces/GameRankInfo.md)  }\>

#### Defined in

[api/ammpool_api.ts:166](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/ammpool_api.ts#L166)

___

### getAmmPoolSnapshot

▸ **getAmmPoolSnapshot**(`request`): `Promise`<{ `ammPoolSnapshot`: `undefined` \| [`AmmPoolSnapshot`](../interfaces/AmmPoolSnapshot.md) ; `error`: `any` ; `raw_data`: `any`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetAmmPoolSnapshotRequest`](../interfaces/GetAmmPoolSnapshotRequest.md) |

#### Returns

`Promise`<{ `ammPoolSnapshot`: `undefined` \| [`AmmPoolSnapshot`](../interfaces/AmmPoolSnapshot.md) ; `error`: `any` ; `raw_data`: `any`  }\>

#### Defined in

[api/ammpool_api.ts:334](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/ammpool_api.ts#L334)

___

### getAmmPoolStats

▸ **getAmmPoolStats**(): `Promise`<{ `ammPoolStats`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`AmmPoolStat`](../interfaces/AmmPoolStat.md)\> ; `raw_data`: `any`  }\>

#### Returns

`Promise`<{ `ammPoolStats`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`AmmPoolStat`](../interfaces/AmmPoolStat.md)\> ; `raw_data`: `any`  }\>

#### Defined in

[api/ammpool_api.ts:307](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/ammpool_api.ts#L307)

___

### getAmmPoolTrades

▸ **getAmmPoolTrades**(`request`): `Promise`<{ `ammPoolTrades`: [`AmmPoolTrade`](../interfaces/AmmPoolTrade.md)[] ; `raw_data`: `any` ; `totalNum`: `any` = raw\_data.totalNum }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetAmmPoolTradesRequest`](../interfaces/GetAmmPoolTradesRequest.md) |

#### Returns

`Promise`<{ `ammPoolTrades`: [`AmmPoolTrade`](../interfaces/AmmPoolTrade.md)[] ; `raw_data`: `any` ; `totalNum`: `any` = raw\_data.totalNum }\>

#### Defined in

[api/ammpool_api.ts:500](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/ammpool_api.ts#L500)

___

### getAmmPoolTxs

▸ **getAmmPoolTxs**(`request`): `Promise`<{ `raw_data`: `any` ; `totalNum`: `any` = raw\_data.data.totalNum; `transactions`: [`AmmPoolTx`](../interfaces/AmmPoolTx.md)[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetAmmPoolTxsRequest`](../interfaces/GetAmmPoolTxsRequest.md) |

#### Returns

`Promise`<{ `raw_data`: `any` ; `totalNum`: `any` = raw\_data.data.totalNum; `transactions`: [`AmmPoolTx`](../interfaces/AmmPoolTx.md)[]  }\>

#### Defined in

[api/ammpool_api.ts:473](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/ammpool_api.ts#L473)

___

### getAmmPoolUserRewards

▸ **getAmmPoolUserRewards**(`request`): `Promise`<{ `ammUserRewardMap`: [`AmmUserRewardMap`](../interfaces/AmmUserRewardMap.md) ; `raw_data`: [`AmmUserReward`](../interfaces/AmmUserReward.md)[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetAmmUserRewardsRequest`](../interfaces/GetAmmUserRewardsRequest.md) |

#### Returns

`Promise`<{ `ammUserRewardMap`: [`AmmUserRewardMap`](../interfaces/AmmUserRewardMap.md) ; `raw_data`: [`AmmUserReward`](../interfaces/AmmUserReward.md)[]  }\>

#### Defined in

[api/ammpool_api.ts:113](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/ammpool_api.ts#L113)

___

### getLiquidityMining

▸ **getLiquidityMining**(`request`, `apiKey`): `Promise`<{ `raw_data`: `any` ; `resultInfo`: `any` = raw\_data.resultInfo; `rewards`: [`RewardItem`](../interfaces/RewardItem.md)[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetLiquidityMiningRequest`](../interfaces/GetLiquidityMiningRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `any` ; `resultInfo`: `any` = raw\_data.resultInfo; `rewards`: [`RewardItem`](../interfaces/RewardItem.md)[]  }\>

#### Defined in

[api/ammpool_api.ts:409](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/ammpool_api.ts#L409)

___

### getLiquidityMiningUserHistory

▸ **getLiquidityMiningUserHistory**(`request`): `Promise`<{ `raw_data`: `any` ; `userMiningInfos`: [`UserMiningInfo`](../interfaces/UserMiningInfo.md)[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetLiquidityMiningUserHistoryRequest`](../interfaces/GetLiquidityMiningUserHistoryRequest.md) |

#### Returns

`Promise`<{ `raw_data`: `any` ; `userMiningInfos`: [`UserMiningInfo`](../interfaces/UserMiningInfo.md)[]  }\>

#### Defined in

[api/ammpool_api.ts:431](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/ammpool_api.ts#L431)

___

### getOrderList

▸ `Private` **getOrderList**(`lst`, `order`): [`AmmPoolActivityRule`](../interfaces/AmmPoolActivityRule.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `lst` | [`AmmPoolActivityRule`](../interfaces/AmmPoolActivityRule.md)[] |
| `order` | [`SortOrder`](../enums/SortOrder.md) |

#### Returns

[`AmmPoolActivityRule`](../interfaces/AmmPoolActivityRule.md)[]

#### Defined in

[api/ammpool_api.ts:187](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/ammpool_api.ts#L187)

___

### getUserAmmPoolTxs

▸ **getUserAmmPoolTxs**(`request`, `apiKey`): `Promise`<{ `raw_data`: `any` ; `totalNum`: `any` = raw\_data.totalNum; `userAmmPoolTxs`: [`UserAmmPoolTx`](../interfaces/UserAmmPoolTx.md)[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserAmmPoolTxsRequest`](../interfaces/GetUserAmmPoolTxsRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `any` ; `totalNum`: `any` = raw\_data.totalNum; `userAmmPoolTxs`: [`UserAmmPoolTx`](../interfaces/UserAmmPoolTx.md)[]  }\>

#### Defined in

[api/ammpool_api.ts:451](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/ammpool_api.ts#L451)

___

### joinAmmPool

▸ **joinAmmPool**(`request`, `patch`, `apiKey`): `Promise`<{ `joinAmmPoolResult`: [`JoinAmmPoolResult`](../interfaces/JoinAmmPoolResult.md) ; `raw_data`: `any`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`JoinAmmPoolRequest`](../interfaces/JoinAmmPoolRequest.md) |
| `patch` | [`AmmPoolRequestPatch`](../interfaces/AmmPoolRequestPatch.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `joinAmmPoolResult`: [`JoinAmmPoolResult`](../interfaces/JoinAmmPoolResult.md) ; `raw_data`: `any`  }\>

#### Defined in

[api/ammpool_api.ts:521](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/ammpool_api.ts#L521)

___

### makeReq

▸ `Protected` **makeReq**(): `Request`

#### Returns

`Request`

#### Inherited from

BaseAPI.makeReq

#### Defined in

[api/base_api.ts:49](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/base_api.ts#L49)

___

### setBaseUrl

▸ **setBaseUrl**(`baseUrl`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `baseUrl` | `string` |

#### Returns

`void`

#### Inherited from

BaseAPI.setBaseUrl

#### Defined in

[api/base_api.ts:45](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/base_api.ts#L45)

___

### setChainId

▸ **setChainId**(`chainId`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | [`ChainId`](../enums/ChainId.md) |

#### Returns

`void`

#### Inherited from

BaseAPI.setChainId

#### Defined in

[api/base_api.ts:41](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/base_api.ts#L41)
