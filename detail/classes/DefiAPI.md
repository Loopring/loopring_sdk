[@loopring-web/loopring-sdk](../README.md) / [Exports](../modules.md) / DefiAPI

# Class: DefiAPI

## Hierarchy

- [`BaseAPI`](BaseAPI.md)

  ↳ **`DefiAPI`**

## Table of contents

### Constructors

- [constructor](DefiAPI.md#constructor)

### Properties

- [baseUrl](DefiAPI.md#baseurl)
- [chainId](DefiAPI.md#chainid)
- [KEY\_MESSAGE](DefiAPI.md#key_message)

### Methods

- [genErr](DefiAPI.md#generr)
- [getAvailableBroker](DefiAPI.md#getavailablebroker)
- [getCounterFactualInfo](DefiAPI.md#getcounterfactualinfo)
- [getDefiMarkets](DefiAPI.md#getdefimarkets)
- [getDefiReward](DefiAPI.md#getdefireward)
- [getDefiToken](DefiAPI.md#getdefitoken)
- [getDefiTransaction](DefiAPI.md#getdefitransaction)
- [getDualBalance](DefiAPI.md#getdualbalance)
- [getDualIndex](DefiAPI.md#getdualindex)
- [getDualInfos](DefiAPI.md#getdualinfos)
- [getDualPrices](DefiAPI.md#getdualprices)
- [getDualTransactions](DefiAPI.md#getdualtransactions)
- [getDualUserLocked](DefiAPI.md#getdualuserlocked)
- [getStakeProducts](DefiAPI.md#getstakeproducts)
- [getStakeSummary](DefiAPI.md#getstakesummary)
- [getStakeTransactions](DefiAPI.md#getstaketransactions)
- [makeReq](DefiAPI.md#makereq)
- [orderDefi](DefiAPI.md#orderdefi)
- [orderDual](DefiAPI.md#orderdual)
- [returnTxHash](DefiAPI.md#returntxhash)
- [sendStake](DefiAPI.md#sendstake)
- [sendStakeClaim](DefiAPI.md#sendstakeclaim)
- [sendStakeRedeem](DefiAPI.md#sendstakeredeem)
- [setBaseUrl](DefiAPI.md#setbaseurl)
- [setChainId](DefiAPI.md#setchainid)

## Constructors

### constructor

• **new DefiAPI**(`param`, `timeout?`, `baseUrlMap?`)

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

[api/base_api.ts:104](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/api/base_api.ts#L104)

## Properties

### baseUrl

• `Protected` **baseUrl**: `string` = `""`

#### Inherited from

[BaseAPI](BaseAPI.md).[baseUrl](BaseAPI.md#baseurl)

#### Defined in

[api/base_api.ts:39](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/api/base_api.ts#L39)

___

### chainId

• `Protected` **chainId**: [`ChainId`](../enums/ChainId.md) = `ChainId.MAINNET`

#### Inherited from

[BaseAPI](BaseAPI.md).[chainId](BaseAPI.md#chainid)

#### Defined in

[api/base_api.ts:40](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/api/base_api.ts#L40)

___

### KEY\_MESSAGE

▪ `Static` **KEY\_MESSAGE**: `string` = `KEY_MESSAGE`

#### Inherited from

[BaseAPI](BaseAPI.md).[KEY_MESSAGE](BaseAPI.md#key_message)

#### Defined in

[api/base_api.ts:38](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/api/base_api.ts#L38)

## Methods

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

[api/base_api.ts:41](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/api/base_api.ts#L41)

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

[api/base_api.ts:123](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/api/base_api.ts#L123)

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

[api/base_api.ts:136](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/api/base_api.ts#L136)

___

### getDefiMarkets

▸ **getDefiMarkets**<`R`\>(`request`, `url?`): `Promise`<{ `marketArr`: `string`[] ; `marketArrStr`: `string` ; `markets`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`DefiMarketInfo`](../interfaces/DefiMarketInfo.md)\> ; `pairs`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`TokenRelatedInfo`](../interfaces/TokenRelatedInfo.md)\> ; `raw_data`: `R` ; `tokenArr`: `string`[] ; `tokenArrStr`: `string`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `request` | [`GetDefiMarketRequest`](../interfaces/GetDefiMarketRequest.md) | `undefined` |
| `url` | `string` | `LOOPRING_URLs.GET_DEFI_MARKETS` |

#### Returns

`Promise`<{ `marketArr`: `string`[] ; `marketArrStr`: `string` ; `markets`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`DefiMarketInfo`](../interfaces/DefiMarketInfo.md)\> ; `pairs`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`TokenRelatedInfo`](../interfaces/TokenRelatedInfo.md)\> ; `raw_data`: `R` ; `tokenArr`: `string`[] ; `tokenArrStr`: `string`  }\>

#### Defined in

[api/defi_api.ts:80](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/api/defi_api.ts#L80)

___

### getDefiReward

▸ **getDefiReward**<`R`\>(`request`, `apiKey`): `Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| { `lastDayRewards`: `string` ; `raw_data`: `R` ; `rewards`: [] ; `totalNum`: `number` ; `totalRewards`: `string`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserDefiRewardRequest`](../interfaces/GetUserDefiRewardRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| { `lastDayRewards`: `string` ; `raw_data`: `R` ; `rewards`: [] ; `totalNum`: `number` ; `totalRewards`: `string`  }\>

#### Defined in

[api/defi_api.ts:219](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/api/defi_api.ts#L219)

___

### getDefiToken

▸ **getDefiToken**<`R`\>(): `Promise`<{ `addressIndex`: [`LoopringMap`](../interfaces/LoopringMap.md)<`string`\> ; `idIndex`: [`LoopringMap`](../interfaces/LoopringMap.md)<`string`\> ; `raw_data`: `R` ; `tokensMap`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`TokenInfo`](../interfaces/TokenInfo.md)\>  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Returns

`Promise`<{ `addressIndex`: [`LoopringMap`](../interfaces/LoopringMap.md)<`string`\> ; `idIndex`: [`LoopringMap`](../interfaces/LoopringMap.md)<`string`\> ; `raw_data`: `R` ; `tokensMap`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`TokenInfo`](../interfaces/TokenInfo.md)\>  }\>

#### Defined in

[api/defi_api.ts:27](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/api/defi_api.ts#L27)

___

### getDefiTransaction

▸ **getDefiTransaction**<`R`\>(`request`, `apiKey`): `Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| { `raw_data`: `R` ; `totalNum`: `number` ; `userDefiTxs`: [`UserDefiTxsHistory`](../interfaces/UserDefiTxsHistory.md)[]  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserDefiTxRequest`](../interfaces/GetUserDefiTxRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| { `raw_data`: `R` ; `totalNum`: `number` ; `userDefiTxs`: [`UserDefiTxsHistory`](../interfaces/UserDefiTxsHistory.md)[]  }\>

#### Defined in

[api/defi_api.ts:254](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/api/defi_api.ts#L254)

___

### getDualBalance

▸ **getDualBalance**<`R`\>(`request?`): `Promise`<`any`\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `request` | `undefined` | `undefined` |

#### Returns

`Promise`<`any`\>

#### Defined in

[api/defi_api.ts:327](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/api/defi_api.ts#L327)

___

### getDualIndex

▸ **getDualIndex**(`request`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | `Object` |
| `request.baseSymbol` | `string` |
| `request.quoteSymbol` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[api/defi_api.ts:397](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/api/defi_api.ts#L397)

___

### getDualInfos

▸ **getDualInfos**<`R`\>(`request`): `Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| { `dualInfo`: { `balance`: [`DualBalance`](../modules.md#dualbalance)[] ; `index`: [`DualIndex`](../modules.md#dualindex) ; `infos`: [`DualProductAndPrice`](../modules.md#dualproductandprice)[] ; `rules`: [`DualRulesCoinsInfo`](../modules.md#dualrulescoinsinfo)[]  } ; `raw_data`: `R` ; `totalNum`: `number`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetDualInfosRequest`](../modules.md#getdualinfosrequest) |

#### Returns

`Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| { `dualInfo`: { `balance`: [`DualBalance`](../modules.md#dualbalance)[] ; `index`: [`DualIndex`](../modules.md#dualindex) ; `infos`: [`DualProductAndPrice`](../modules.md#dualproductandprice)[] ; `rules`: [`DualRulesCoinsInfo`](../modules.md#dualrulescoinsinfo)[]  } ; `raw_data`: `R` ; `totalNum`: `number`  }\>

#### Defined in

[api/defi_api.ts:288](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/api/defi_api.ts#L288)

___

### getDualPrices

▸ **getDualPrices**(`request`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetDualPricesRequest`](../modules.md#getdualpricesrequest) |

#### Returns

`Promise`<`any`\>

#### Defined in

[api/defi_api.ts:375](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/api/defi_api.ts#L375)

___

### getDualTransactions

▸ **getDualTransactions**(`request`, `apiKey`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserDualTxRequest`](../interfaces/GetUserDualTxRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[api/defi_api.ts:420](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/api/defi_api.ts#L420)

___

### getDualUserLocked

▸ **getDualUserLocked**(`__namedParameters`, `apiKey`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`DualUserLockedRequest`](../interfaces/DualUserLockedRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[api/defi_api.ts:481](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/api/defi_api.ts#L481)

___

### getStakeProducts

▸ **getStakeProducts**<`R`\>(): `Promise`<{ `products`: [`STACKING_PRODUCT`](../modules.md#stacking_product)[] ; `raw_data`: `R`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Returns

`Promise`<{ `products`: [`STACKING_PRODUCT`](../modules.md#stacking_product)[] ; `raw_data`: `R`  }\>

#### Defined in

[api/defi_api.ts:707](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/api/defi_api.ts#L707)

___

### getStakeSummary

▸ **getStakeSummary**<`R`\>(`request`, `apiKey`): `Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| { `list`: [`StakeInfoOrigin`](../modules.md#stakeinfoorigin)[] ; `raw_data`: `R` ; `totalClaimableRewards`: `string` ; `totalLastDayPendingRewards`: `string` ; `totalNum`: `number` ; `totalStaked`: `string` ; `totalStakedRewards`: `string`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | `Object` |
| `request.accountId` | `number` |
| `request.end?` | `number` |
| `request.hashes?` | `string` |
| `request.limit?` | `number` |
| `request.offset?` | `number` |
| `request.start?` | `number` |
| `request.statuses?` | `string` |
| `request.tokenId` | `number` |
| `apiKey` | `string` |

#### Returns

`Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| { `list`: [`StakeInfoOrigin`](../modules.md#stakeinfoorigin)[] ; `raw_data`: `R` ; `totalClaimableRewards`: `string` ; `totalLastDayPendingRewards`: `string` ; `totalNum`: `number` ; `totalStaked`: `string` ; `totalStakedRewards`: `string`  }\>

#### Defined in

[api/defi_api.ts:726](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/api/defi_api.ts#L726)

___

### getStakeTransactions

▸ **getStakeTransactions**<`R`\>(`request`, `apiKey`): `Promise`<{ `list`: [`STACKING_TRANSACTIONS`](../modules.md#stacking_transactions)[] ; `raw_data`: `R` ; `totalNum`: `number`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | `Object` |
| `request.accountId` | `number` |
| `request.end?` | `number` |
| `request.hashes?` | `string` |
| `request.limit?` | `number` |
| `request.offset?` | `number` |
| `request.start?` | `number` |
| `request.tokenId` | `number` |
| `request.types?` | `string` |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `list`: [`STACKING_TRANSACTIONS`](../modules.md#stacking_transactions)[] ; `raw_data`: `R` ; `totalNum`: `number`  }\>

#### Defined in

[api/defi_api.ts:766](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/api/defi_api.ts#L766)

___

### makeReq

▸ `Protected` **makeReq**(): `Request`

#### Returns

`Request`

#### Inherited from

[BaseAPI](BaseAPI.md).[makeReq](BaseAPI.md#makereq)

#### Defined in

[api/base_api.ts:182](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/api/base_api.ts#L182)

___

### orderDefi

▸ **orderDefi**<`R`\>(`request`, `privateKey`, `apiKey`): `Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| `Omit`<`any`, ``"resultInfo"``\> & { `raw_data`: `Omit`<`any`, ``"resultInfo"``\>  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`DefiOrderRequest`](../interfaces/DefiOrderRequest.md) |
| `privateKey` | `string` |
| `apiKey` | `string` |

#### Returns

`Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| `Omit`<`any`, ``"resultInfo"``\> & { `raw_data`: `Omit`<`any`, ``"resultInfo"``\>  }\>

#### Defined in

[api/defi_api.ts:180](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/api/defi_api.ts#L180)

___

### orderDual

▸ **orderDual**(`request`, `privateKey`, `apiKey`): `Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| `Omit`<`any`, ``"resultInfo"``\> & { `raw_data`: `Omit`<`any`, ``"resultInfo"``\>  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`DualOrderRequest`](../interfaces/DualOrderRequest.md) |
| `privateKey` | `string` |
| `apiKey` | `string` |

#### Returns

`Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| `Omit`<`any`, ``"resultInfo"``\> & { `raw_data`: `Omit`<`any`, ``"resultInfo"``\>  }\>

#### Defined in

[api/defi_api.ts:446](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/api/defi_api.ts#L446)

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

[api/base_api.ts:82](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/api/base_api.ts#L82)

___

### sendStake

▸ **sendStake**(`request`, `privateKey`, `apiKey`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | `Object` |
| `request.accountId` | `number` |
| `request.timestamp` | `number` |
| `request.token` | [`TokenVolumeV3`](../interfaces/TokenVolumeV3.md) |
| `privateKey` | `string` |
| `apiKey` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[api/defi_api.ts:676](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/api/defi_api.ts#L676)

___

### sendStakeClaim

▸ **sendStakeClaim**(`req`, `options?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | [`OriginStakeClaimRequestV3WithPatch`](../interfaces/OriginStakeClaimRequestV3WithPatch.md) |
| `options?` | `Object` |
| `options.accountId?` | `number` |
| `options.counterFactualInfo?` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

[api/defi_api.ts:512](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/api/defi_api.ts#L512)

___

### sendStakeRedeem

▸ **sendStakeRedeem**(`request`, `privateKey`, `apiKey`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | `Object` |
| `request.accountId` | `number` |
| `request.hash` | `string` |
| `request.token` | [`TokenVolumeV3`](../interfaces/TokenVolumeV3.md) |
| `privateKey` | `string` |
| `apiKey` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[api/defi_api.ts:646](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/api/defi_api.ts#L646)

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

[api/base_api.ts:178](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/api/base_api.ts#L178)

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

[api/base_api.ts:170](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/api/base_api.ts#L170)
