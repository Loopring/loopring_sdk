[@loopring-web/loopring-sdk](../README.md) / [Exports](../modules.md) / BaseAPI

# Class: BaseAPI

## Hierarchy

- **`BaseAPI`**

  ↳ [`WsAPI`](WsAPI.md)

  ↳ [`ExchangeAPI`](ExchangeAPI.md)

  ↳ [`AmmpoolAPI`](AmmpoolAPI.md)

  ↳ [`UserAPI`](UserAPI.md)

  ↳ [`WalletAPI`](WalletAPI.md)

  ↳ [`WhitelistedUserAPI`](WhitelistedUserAPI.md)

  ↳ [`NFTAPI`](NFTAPI.md)

  ↳ [`GlobalAPI`](GlobalAPI.md)

  ↳ [`DelegateAPI`](DelegateAPI.md)

  ↳ [`DefiAPI`](DefiAPI.md)

  ↳ [`LuckTokenAPI`](LuckTokenAPI.md)

## Table of contents

### Constructors

- [constructor](BaseAPI.md#constructor)

### Properties

- [baseUrl](BaseAPI.md#baseurl)
- [baseUrlMap](BaseAPI.md#baseurlmap)
- [chainId](BaseAPI.md#chainid)
- [timeout](BaseAPI.md#timeout)
- [KEY\_MESSAGE](BaseAPI.md#key_message)

### Methods

- [genErr](BaseAPI.md#generr)
- [getAvailableBroker](BaseAPI.md#getavailablebroker)
- [getCounterFactualInfo](BaseAPI.md#getcounterfactualinfo)
- [makeReq](BaseAPI.md#makereq)
- [returnTxHash](BaseAPI.md#returntxhash)
- [setBaseUrl](BaseAPI.md#setbaseurl)
- [setChainId](BaseAPI.md#setchainid)

## Constructors

### constructor

• **new BaseAPI**(`param`, `timeout?`, `baseUrlMap?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `param` | [`InitParam`](../interfaces/InitParam.md) | `undefined` |
| `timeout` | `number` | `6000` |
| `baseUrlMap` | `Object` | `undefined` |
| `baseUrlMap.1` | `string` | `"https://api3.loopring.io"` |
| `baseUrlMap.5` | `string` | `"https://uat2.loopring.io"` |

#### Defined in

[api/base_api.ts:104](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/base_api.ts#L104)

## Properties

### baseUrl

• `Protected` **baseUrl**: `string` = `""`

#### Defined in

[api/base_api.ts:39](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/base_api.ts#L39)

___

### baseUrlMap

• `Private` **baseUrlMap**: `undefined` \| { `[key: number]`: `string`;  }

#### Defined in

[api/base_api.ts:102](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/base_api.ts#L102)

___

### chainId

• `Protected` **chainId**: [`ChainId`](../enums/ChainId.md) = `ChainId.MAINNET`

#### Defined in

[api/base_api.ts:40](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/base_api.ts#L40)

___

### timeout

• `Private` **timeout**: `number`

#### Defined in

[api/base_api.ts:101](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/base_api.ts#L101)

___

### KEY\_MESSAGE

▪ `Static` **KEY\_MESSAGE**: `string` = `KEY_MESSAGE`

#### Defined in

[api/base_api.ts:38](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/base_api.ts#L38)

## Methods

### genErr

▸ **genErr**(`err`): [`RESULT_INFO`](../interfaces/RESULT_INFO.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` \| `AxiosResponse`<`any`\> & `Error` |

#### Returns

[`RESULT_INFO`](../interfaces/RESULT_INFO.md)

#### Defined in

[api/base_api.ts:41](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/base_api.ts#L41)

___

### getAvailableBroker

▸ **getAvailableBroker**(`request`): `Promise`<{ `broker`: `string`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetAvailableBrokerRequest`](../interfaces/GetAvailableBrokerRequest.md) |

#### Returns

`Promise`<{ `broker`: `string`  }\>

#### Defined in

[api/base_api.ts:123](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/base_api.ts#L123)

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

#### Defined in

[api/base_api.ts:136](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/base_api.ts#L136)

___

### makeReq

▸ `Protected` **makeReq**(): `Request`

#### Returns

`Request`

#### Defined in

[api/base_api.ts:182](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/base_api.ts#L182)

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

#### Defined in

[api/base_api.ts:82](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/base_api.ts#L82)

___

### setBaseUrl

▸ **setBaseUrl**(`baseUrl`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `baseUrl` | `string` |

#### Returns

`void`

#### Defined in

[api/base_api.ts:178](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/base_api.ts#L178)

___

### setChainId

▸ **setChainId**(`chainId`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | [`ChainId`](../enums/ChainId.md) |

#### Returns

`void`

#### Defined in

[api/base_api.ts:170](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/base_api.ts#L170)