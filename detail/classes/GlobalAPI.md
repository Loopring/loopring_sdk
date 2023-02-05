[@loopring-web/loopring-sdk](../README.md) / [Exports](../modules.md) / GlobalAPI

# Class: GlobalAPI

## Hierarchy

- [`BaseAPI`](BaseAPI.md)

  ↳ **`GlobalAPI`**

## Table of contents

### Constructors

- [constructor](GlobalAPI.md#constructor)

### Properties

- [baseUrl](GlobalAPI.md#baseurl)
- [chainId](GlobalAPI.md#chainid)
- [KEY\_MESSAGE](GlobalAPI.md#key_message)

### Methods

- [genErr](GlobalAPI.md#generr)
- [getActiveFeeInfo](GlobalAPI.md#getactivefeeinfo)
- [getAmmPoolGameUserRank](GlobalAPI.md#getammpoolgameuserrank)
- [getAvailableBroker](GlobalAPI.md#getavailablebroker)
- [getBanxaAPI](GlobalAPI.md#getbanxaapi)
- [getCounterFactualInfo](GlobalAPI.md#getcounterfactualinfo)
- [getUserBalanceForFee](GlobalAPI.md#getuserbalanceforfee)
- [makeReq](GlobalAPI.md#makereq)
- [returnTxHash](GlobalAPI.md#returntxhash)
- [setBaseUrl](GlobalAPI.md#setbaseurl)
- [setChainId](GlobalAPI.md#setchainid)

## Constructors

### constructor

• **new GlobalAPI**(`param`, `timeout?`, `baseUrlMap?`)

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

[api/base_api.ts:104](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/api/base_api.ts#L104)

## Properties

### baseUrl

• `Protected` **baseUrl**: `string` = `""`

#### Inherited from

[BaseAPI](BaseAPI.md).[baseUrl](BaseAPI.md#baseurl)

#### Defined in

[api/base_api.ts:39](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/api/base_api.ts#L39)

___

### chainId

• `Protected` **chainId**: [`ChainId`](../enums/ChainId.md) = `ChainId.MAINNET`

#### Inherited from

[BaseAPI](BaseAPI.md).[chainId](BaseAPI.md#chainid)

#### Defined in

[api/base_api.ts:40](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/api/base_api.ts#L40)

___

### KEY\_MESSAGE

▪ `Static` **KEY\_MESSAGE**: `string` = `KEY_MESSAGE`

#### Inherited from

[BaseAPI](BaseAPI.md).[KEY_MESSAGE](BaseAPI.md#key_message)

#### Defined in

[api/base_api.ts:38](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/api/base_api.ts#L38)

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

[api/base_api.ts:41](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/api/base_api.ts#L41)

___

### getActiveFeeInfo

▸ **getActiveFeeInfo**(`request`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | `Object` |
| `request.accountId?` | `number` |

#### Returns

`Promise`<`any`\>

#### Defined in

[api/global_api.ts:32](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/api/global_api.ts#L32)

___

### getAmmPoolGameUserRank

▸ **getAmmPoolGameUserRank**<`R`\>(`request`): `Promise`<{ `raw_data`: `R` ; `userRank`: [`GameRankInfo`](../interfaces/GameRankInfo.md)  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetAmmPoolGameUserRankRequest`](../interfaces/GetAmmPoolGameUserRankRequest.md) |

#### Returns

`Promise`<{ `raw_data`: `R` ; `userRank`: [`GameRankInfo`](../interfaces/GameRankInfo.md)  }\>

#### Defined in

[api/global_api.ts:106](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/api/global_api.ts#L106)

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

[api/base_api.ts:123](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/api/base_api.ts#L123)

___

### getBanxaAPI

▸ **getBanxaAPI**<`R`\>(`__namedParameters`, `eddsaKey`, `apiKey`): `Promise`<{ `raw_data`: `R` ; `result`: `R`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.accountId` | `number` |
| `__namedParameters.method` | [`ReqMethod`](../enums/ReqMethod.md) |
| `__namedParameters.payload` | `string` |
| `__namedParameters.query` | `string` |
| `__namedParameters.url` | `string` |
| `eddsaKey` | `string` |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `R` ; `result`: `R`  }\>

#### Defined in

[api/global_api.ts:134](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/api/global_api.ts#L134)

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

[api/base_api.ts:136](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/api/base_api.ts#L136)

___

### getUserBalanceForFee

▸ **getUserBalanceForFee**(`request`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | `Object` |
| `request.accountId` | `number` |
| `request.tokens` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[api/global_api.ts:71](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/api/global_api.ts#L71)

___

### makeReq

▸ `Protected` **makeReq**(): `Request`

#### Returns

`Request`

#### Inherited from

[BaseAPI](BaseAPI.md).[makeReq](BaseAPI.md#makereq)

#### Defined in

[api/base_api.ts:182](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/api/base_api.ts#L182)

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

[api/base_api.ts:82](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/api/base_api.ts#L82)

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

[api/base_api.ts:178](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/api/base_api.ts#L178)

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

[api/base_api.ts:170](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/api/base_api.ts#L170)
