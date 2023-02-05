[@loopring-web/loopring-sdk](../README.md) / [Exports](../modules.md) / AmmpoolAPI

# Class: AmmpoolAPI

## Hierarchy

- [`BaseAPI`](BaseAPI.md)

  ↳ **`AmmpoolAPI`**

## Table of contents

### Constructors

- [constructor](AmmpoolAPI.md#constructor)

### Properties

- [baseUrl](AmmpoolAPI.md#baseurl)
- [chainId](AmmpoolAPI.md#chainid)
- [KEY\_MESSAGE](AmmpoolAPI.md#key_message)

### Methods

- [exitAmmPool](AmmpoolAPI.md#exitammpool)
- [genErr](AmmpoolAPI.md#generr)
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
- [getAvailableBroker](AmmpoolAPI.md#getavailablebroker)
- [getCounterFactualInfo](AmmpoolAPI.md#getcounterfactualinfo)
- [getLiquidityMining](AmmpoolAPI.md#getliquiditymining)
- [getLiquidityMiningUserHistory](AmmpoolAPI.md#getliquiditymininguserhistory)
- [getOrderList](AmmpoolAPI.md#getorderlist)
- [getUserAmmPoolTxs](AmmpoolAPI.md#getuserammpooltxs)
- [joinAmmPool](AmmpoolAPI.md#joinammpool)
- [makeReq](AmmpoolAPI.md#makereq)
- [returnTxHash](AmmpoolAPI.md#returntxhash)
- [setBaseUrl](AmmpoolAPI.md#setbaseurl)
- [setChainId](AmmpoolAPI.md#setchainid)

## Constructors

### constructor

• **new AmmpoolAPI**(`param`, `timeout?`, `baseUrlMap?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `param` | [`InitParam`](../interfaces/InitParam.md) | `undefined` |
| `timeout` | `number` | `6000` |
| `baseUrlMap` | `Object` | `undefined` |
| `baseUrlMap.1` | `string` | `"https://api3.loopring.io"` |
| `baseUrlMap.5` | `string` | `"https://uat2.loopring.io"` |

#### Inherited from

[BaseAPI](BaseAPI.md).[constructor](BaseAPI.md#constructor)

#### Defined in

[api/base_api.ts:104](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/base_api.ts#L104)

## Properties

### baseUrl

• `Protected` **baseUrl**: `string` = `""`

#### Inherited from

[BaseAPI](BaseAPI.md).[baseUrl](BaseAPI.md#baseurl)

#### Defined in

[api/base_api.ts:39](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/base_api.ts#L39)

___

### chainId

• `Protected` **chainId**: [`ChainId`](../enums/ChainId.md) = `ChainId.MAINNET`

#### Inherited from

[BaseAPI](BaseAPI.md).[chainId](BaseAPI.md#chainid)

#### Defined in

[api/base_api.ts:40](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/base_api.ts#L40)

___

### KEY\_MESSAGE

▪ `Static` **KEY\_MESSAGE**: `string` = `KEY_MESSAGE`

#### Inherited from

[BaseAPI](BaseAPI.md).[KEY_MESSAGE](BaseAPI.md#key_message)

#### Defined in

[api/base_api.ts:38](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/base_api.ts#L38)

## Methods

### exitAmmPool

▸ **exitAmmPool**<`R`\>(`request`, `patch`, `apiKey`): `Promise`<{ `exitAmmPoolResult`: [`ExitAmmPoolResult`](../interfaces/ExitAmmPoolResult.md) ; `raw_data`: `R`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`ExitAmmPoolRequest`](../interfaces/ExitAmmPoolRequest.md) |
| `patch` | [`AmmPoolRequestPatch`](../interfaces/AmmPoolRequestPatch.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `exitAmmPoolResult`: [`ExitAmmPoolResult`](../interfaces/ExitAmmPoolResult.md) ; `raw_data`: `R`  }\>

#### Defined in

[api/ammpool_api.ts:661](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/ammpool_api.ts#L661)

___

### genErr

▸ **genErr**(`err`): [`RESULT_INFO`](../interfaces/RESULT_INFO.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` \| `AxiosResponse`<`any`\> & `Error` |

#### Returns

[`RESULT_INFO`](../interfaces/RESULT_INFO.md)

#### Inherited from

[BaseAPI](BaseAPI.md).[genErr](BaseAPI.md#generr)

#### Defined in

[api/base_api.ts:41](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/base_api.ts#L41)

___

### getAmmAssetHistory

▸ **getAmmAssetHistory**<`R`\>(`request`): `Promise`<{ `dataSeries`: `any` ; `market`: `string` ; `poolAddress`: `string` ; `raw_data`: `R`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetAmmAssetRequest`](../interfaces/GetAmmAssetRequest.md) |

#### Returns

`Promise`<{ `dataSeries`: `any` ; `market`: `string` ; `poolAddress`: `string` ; `raw_data`: `R`  }\>

#### Defined in

[api/ammpool_api.ts:330](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/ammpool_api.ts#L330)

___

### getAmmPoolActivityRules

▸ **getAmmPoolActivityRules**<`R`\>(): `Promise`<{ `activityDateMap`: [`LoopringMap`](../interfaces/LoopringMap.md)<{ `AMM_MINING?`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`AmmPoolActivityRule`](../interfaces/AmmPoolActivityRule.md)\> ; `ORDERBOOK_MINING?`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`AmmPoolActivityRule`](../interfaces/AmmPoolActivityRule.md)\> ; `SWAP_VOLUME_RANKING?`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`AmmPoolActivityRule`](../interfaces/AmmPoolActivityRule.md)\>  }\> ; `activityInProgressRules`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`AmmPoolInProgressActivityRule`](../interfaces/AmmPoolInProgressActivityRule.md)\> ; `groupByActivityStatus`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`AmmPoolActivityRule`](../interfaces/AmmPoolActivityRule.md)[]\> ; `groupByRuleType`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`AmmPoolActivityRule`](../interfaces/AmmPoolActivityRule.md)[]\> ; `groupByRuleTypeAndStatus`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`LoopringMap`](../interfaces/LoopringMap.md)<[`AmmPoolActivityRule`](../interfaces/AmmPoolActivityRule.md)[]\>\> ; `raw_data`: `R`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Returns

`Promise`<{ `activityDateMap`: [`LoopringMap`](../interfaces/LoopringMap.md)<{ `AMM_MINING?`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`AmmPoolActivityRule`](../interfaces/AmmPoolActivityRule.md)\> ; `ORDERBOOK_MINING?`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`AmmPoolActivityRule`](../interfaces/AmmPoolActivityRule.md)\> ; `SWAP_VOLUME_RANKING?`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`AmmPoolActivityRule`](../interfaces/AmmPoolActivityRule.md)\>  }\> ; `activityInProgressRules`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`AmmPoolInProgressActivityRule`](../interfaces/AmmPoolInProgressActivityRule.md)\> ; `groupByActivityStatus`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`AmmPoolActivityRule`](../interfaces/AmmPoolActivityRule.md)[]\> ; `groupByRuleType`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`AmmPoolActivityRule`](../interfaces/AmmPoolActivityRule.md)[]\> ; `groupByRuleTypeAndStatus`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`LoopringMap`](../interfaces/LoopringMap.md)<[`AmmPoolActivityRule`](../interfaces/AmmPoolActivityRule.md)[]\>\> ; `raw_data`: `R`  }\>

#### Defined in

[api/ammpool_api.ts:210](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/ammpool_api.ts#L210)

___

### getAmmPoolBalances

▸ **getAmmPoolBalances**<`R`\>(): `Promise`<{ `ammpoolsbalances`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`AmmPoolBalance`](../interfaces/AmmPoolBalance.md)\> ; `raw_data`: `R`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Returns

`Promise`<{ `ammpoolsbalances`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`AmmPoolBalance`](../interfaces/AmmPoolBalance.md)\> ; `raw_data`: `R`  }\>

#### Defined in

[api/ammpool_api.ts:425](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/ammpool_api.ts#L425)

___

### getAmmPoolConf

▸ **getAmmPoolConf**<`R`\>(): `Promise`<{ `ammpools`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`AmmPoolInfoV3`](../interfaces/AmmPoolInfoV3.md)\> ; `pairs`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`TokenRelatedInfo`](../interfaces/TokenRelatedInfo.md)\> ; `raw_data`: `R`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Returns

`Promise`<{ `ammpools`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`AmmPoolInfoV3`](../interfaces/AmmPoolInfoV3.md)\> ; `pairs`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`TokenRelatedInfo`](../interfaces/TokenRelatedInfo.md)\> ; `raw_data`: `R`  }\>

#### Defined in

[api/ammpool_api.ts:50](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/ammpool_api.ts#L50)

___

### getAmmPoolGameRank

▸ **getAmmPoolGameRank**<`R`\>(`request`): `Promise`<{ `raw_data`: `R` ; `totalRewards`: [`TokenVolumeV3`](../interfaces/TokenVolumeV3.md)[] ; `userRankList`: [`GameRankInfo`](../interfaces/GameRankInfo.md)[]  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetAmmPoolGameRankRequest`](../interfaces/GetAmmPoolGameRankRequest.md) |

#### Returns

`Promise`<{ `raw_data`: `R` ; `totalRewards`: [`TokenVolumeV3`](../interfaces/TokenVolumeV3.md)[] ; `userRankList`: [`GameRankInfo`](../interfaces/GameRankInfo.md)[]  }\>

#### Defined in

[api/ammpool_api.ts:132](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/ammpool_api.ts#L132)

___

### getAmmPoolGameUserRank

▸ **getAmmPoolGameUserRank**<`R`\>(`request`, `apiKey`): `Promise`<{ `raw_data`: `R` ; `userRank`: [`GameRankInfo`](../interfaces/GameRankInfo.md)  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetAmmPoolGameUserRankRequest`](../interfaces/GetAmmPoolGameUserRankRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `R` ; `userRank`: [`GameRankInfo`](../interfaces/GameRankInfo.md)  }\>

#### Defined in

[api/ammpool_api.ts:169](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/ammpool_api.ts#L169)

___

### getAmmPoolSnapshot

▸ **getAmmPoolSnapshot**<`R`\>(`request`): `Promise`<{ `ammPoolSnapshot`: [`AmmPoolSnapshot`](../interfaces/AmmPoolSnapshot.md) ; `raw_data`: `R`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetAmmPoolSnapshotRequest`](../interfaces/GetAmmPoolSnapshotRequest.md) |

#### Returns

`Promise`<{ `ammPoolSnapshot`: [`AmmPoolSnapshot`](../interfaces/AmmPoolSnapshot.md) ; `raw_data`: `R`  }\>

#### Defined in

[api/ammpool_api.ts:395](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/ammpool_api.ts#L395)

___

### getAmmPoolStats

▸ **getAmmPoolStats**<`R`\>(): `Promise`<{ `ammPoolStats`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`AmmPoolStat`](../interfaces/AmmPoolStat.md)\> ; `raw_data`: `R`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Returns

`Promise`<{ `ammPoolStats`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`AmmPoolStat`](../interfaces/AmmPoolStat.md)\> ; `raw_data`: `R`  }\>

#### Defined in

[api/ammpool_api.ts:363](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/ammpool_api.ts#L363)

___

### getAmmPoolTrades

▸ **getAmmPoolTrades**<`R`\>(`request`): `Promise`<{ `ammPoolTrades`: [`AmmPoolTrade`](../interfaces/AmmPoolTrade.md)[] ; `raw_data`: `R` ; `totalNum`: `number`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetAmmPoolTradesRequest`](../interfaces/GetAmmPoolTradesRequest.md) |

#### Returns

`Promise`<{ `ammPoolTrades`: [`AmmPoolTrade`](../interfaces/AmmPoolTrade.md)[] ; `raw_data`: `R` ; `totalNum`: `number`  }\>

#### Defined in

[api/ammpool_api.ts:598](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/ammpool_api.ts#L598)

___

### getAmmPoolTxs

▸ **getAmmPoolTxs**<`R`\>(`request`): `Promise`<{ `raw_data`: `R` ; `totalNum`: `number` ; `transactions`: [`AmmPoolTx`](../interfaces/AmmPoolTx.md)[]  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetAmmPoolTxsRequest`](../interfaces/GetAmmPoolTxsRequest.md) |

#### Returns

`Promise`<{ `raw_data`: `R` ; `totalNum`: `number` ; `transactions`: [`AmmPoolTx`](../interfaces/AmmPoolTx.md)[]  }\>

#### Defined in

[api/ammpool_api.ts:563](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/ammpool_api.ts#L563)

___

### getAmmPoolUserRewards

▸ **getAmmPoolUserRewards**<`R`\>(`request`): `Promise`<{ `ammUserRewardMap`: [`AmmUserRewardMap`](../interfaces/AmmUserRewardMap.md) ; `raw_data`: `R`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetAmmUserRewardsRequest`](../interfaces/GetAmmUserRewardsRequest.md) |

#### Returns

`Promise`<{ `ammUserRewardMap`: [`AmmUserRewardMap`](../interfaces/AmmUserRewardMap.md) ; `raw_data`: `R`  }\>

#### Defined in

[api/ammpool_api.ts:84](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/ammpool_api.ts#L84)

___

### getAvailableBroker

▸ **getAvailableBroker**(`request`): `Promise`<{ `broker`: `string`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetAvailableBrokerRequest`](../interfaces/GetAvailableBrokerRequest.md) |

#### Returns

`Promise`<{ `broker`: `string`  }\>

#### Inherited from

[BaseAPI](BaseAPI.md).[getAvailableBroker](BaseAPI.md#getavailablebroker)

#### Defined in

[api/base_api.ts:123](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/base_api.ts#L123)

___

### getCounterFactualInfo

▸ **getCounterFactualInfo**<`T`\>(`request`): `Promise`<{ `counterFactualInfo`: `undefined` \| [`CounterFactualInfo`](../interfaces/CounterFactualInfo.md) ; `error?`: [`RESULT_INFO`](../interfaces/RESULT_INFO.md) ; `raw_data`: `T`  }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetCounterFactualInfoRequest`](../interfaces/GetCounterFactualInfoRequest.md) |

#### Returns

`Promise`<{ `counterFactualInfo`: `undefined` \| [`CounterFactualInfo`](../interfaces/CounterFactualInfo.md) ; `error?`: [`RESULT_INFO`](../interfaces/RESULT_INFO.md) ; `raw_data`: `T`  }\>

#### Inherited from

[BaseAPI](BaseAPI.md).[getCounterFactualInfo](BaseAPI.md#getcounterfactualinfo)

#### Defined in

[api/base_api.ts:136](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/base_api.ts#L136)

___

### getLiquidityMining

▸ **getLiquidityMining**<`R`\>(`request`, `apiKey`): `Promise`<{ `raw_data`: `R` ; `rewards`: [`RewardItem`](../interfaces/RewardItem.md)[]  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetLiquidityMiningRequest`](../interfaces/GetLiquidityMiningRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `R` ; `rewards`: [`RewardItem`](../interfaces/RewardItem.md)[]  }\>

#### Defined in

[api/ammpool_api.ts:472](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/ammpool_api.ts#L472)

___

### getLiquidityMiningUserHistory

▸ **getLiquidityMiningUserHistory**<`R`\>(`request`): `Promise`<{ `raw_data`: `R` ; `userMiningInfos`: [`UserMiningInfo`](../interfaces/UserMiningInfo.md)[]  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetLiquidityMiningUserHistoryRequest`](../interfaces/GetLiquidityMiningUserHistoryRequest.md) |

#### Returns

`Promise`<{ `raw_data`: `R` ; `userMiningInfos`: [`UserMiningInfo`](../interfaces/UserMiningInfo.md)[]  }\>

#### Defined in

[api/ammpool_api.ts:502](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/ammpool_api.ts#L502)

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

[api/ammpool_api.ts:198](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/ammpool_api.ts#L198)

___

### getUserAmmPoolTxs

▸ **getUserAmmPoolTxs**<`R`\>(`request`, `apiKey`): `Promise`<{ `raw_data`: `R` ; `totalNum`: `number` ; `userAmmPoolTxs`: [`UserAmmPoolTx`](../interfaces/UserAmmPoolTx.md)[]  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserAmmPoolTxsRequest`](../interfaces/GetUserAmmPoolTxsRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `R` ; `totalNum`: `number` ; `userAmmPoolTxs`: [`UserAmmPoolTx`](../interfaces/UserAmmPoolTx.md)[]  }\>

#### Defined in

[api/ammpool_api.ts:531](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/ammpool_api.ts#L531)

___

### joinAmmPool

▸ **joinAmmPool**<`R`\>(`request`, `patch`, `apiKey`): `Promise`<{ `joinAmmPoolResult`: [`JoinAmmPoolResult`](../interfaces/JoinAmmPoolResult.md) ; `raw_data`: `R`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`JoinAmmPoolRequest`](../interfaces/JoinAmmPoolRequest.md) |
| `patch` | [`AmmPoolRequestPatch`](../interfaces/AmmPoolRequestPatch.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `joinAmmPoolResult`: [`JoinAmmPoolResult`](../interfaces/JoinAmmPoolResult.md) ; `raw_data`: `R`  }\>

#### Defined in

[api/ammpool_api.ts:625](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/ammpool_api.ts#L625)

___

### makeReq

▸ `Protected` **makeReq**(): `Request`

#### Returns

`Request`

#### Inherited from

[BaseAPI](BaseAPI.md).[makeReq](BaseAPI.md#makereq)

#### Defined in

[api/base_api.ts:182](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/base_api.ts#L182)

___

### returnTxHash

▸ `Protected` **returnTxHash**<`T`\>(`raw_data`): [`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| `Omit`<`T`, ``"resultInfo"``\> & { `raw_data`: `Omit`<`T`, ``"resultInfo"``\>  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`TX_HASH_API`](../modules.md#tx_hash_api) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `raw_data` | `T` |

#### Returns

[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| `Omit`<`T`, ``"resultInfo"``\> & { `raw_data`: `Omit`<`T`, ``"resultInfo"``\>  }

#### Inherited from

[BaseAPI](BaseAPI.md).[returnTxHash](BaseAPI.md#returntxhash)

#### Defined in

[api/base_api.ts:82](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/base_api.ts#L82)

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

[BaseAPI](BaseAPI.md).[setBaseUrl](BaseAPI.md#setbaseurl)

#### Defined in

[api/base_api.ts:178](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/base_api.ts#L178)

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

[BaseAPI](BaseAPI.md).[setChainId](BaseAPI.md#setchainid)

#### Defined in

[api/base_api.ts:170](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/base_api.ts#L170)
