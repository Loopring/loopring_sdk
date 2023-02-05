[@loopring-web/loopring-sdk](../README.md) / [Exports](../modules.md) / DelegateAPI

# Class: DelegateAPI

## Hierarchy

- [`BaseAPI`](BaseAPI.md)

  ↳ **`DelegateAPI`**

## Table of contents

### Constructors

- [constructor](DelegateAPI.md#constructor)

### Properties

- [baseUrl](DelegateAPI.md#baseurl)
- [chainId](DelegateAPI.md#chainid)
- [KEY\_MESSAGE](DelegateAPI.md#key_message)

### Methods

- [genErr](DelegateAPI.md#generr)
- [getAvailableBroker](DelegateAPI.md#getavailablebroker)
- [getCode](DelegateAPI.md#getcode)
- [getCollectionDomain](DelegateAPI.md#getcollectiondomain)
- [getCounterFactualInfo](DelegateAPI.md#getcounterfactualinfo)
- [getIPFS](DelegateAPI.md#getipfs)
- [makeReq](DelegateAPI.md#makereq)
- [returnTxHash](DelegateAPI.md#returntxhash)
- [setBaseUrl](DelegateAPI.md#setbaseurl)
- [setChainId](DelegateAPI.md#setchainid)

## Constructors

### constructor

• **new DelegateAPI**(`param`, `timeout?`, `baseUrlMap?`)

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

[api/base_api.ts:104](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/base_api.ts#L104)

## Properties

### baseUrl

• `Protected` **baseUrl**: `string` = `""`

#### Inherited from

[BaseAPI](BaseAPI.md).[baseUrl](BaseAPI.md#baseurl)

#### Defined in

[api/base_api.ts:39](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/base_api.ts#L39)

___

### chainId

• `Protected` **chainId**: [`ChainId`](../enums/ChainId.md) = `ChainId.MAINNET`

#### Inherited from

[BaseAPI](BaseAPI.md).[chainId](BaseAPI.md#chainid)

#### Defined in

[api/base_api.ts:40](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/base_api.ts#L40)

___

### KEY\_MESSAGE

▪ `Static` **KEY\_MESSAGE**: `string` = `KEY_MESSAGE`

#### Inherited from

[BaseAPI](BaseAPI.md).[KEY_MESSAGE](BaseAPI.md#key_message)

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

#### Inherited from

[BaseAPI](BaseAPI.md).[genErr](BaseAPI.md#generr)

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

#### Inherited from

[BaseAPI](BaseAPI.md).[getAvailableBroker](BaseAPI.md#getavailablebroker)

#### Defined in

[api/base_api.ts:123](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/base_api.ts#L123)

___

### getCode

▸ **getCode**(`address`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[api/delegate_api.ts:7](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/delegate_api.ts#L7)

___

### getCollectionDomain

▸ **getCollectionDomain**(): ``"https://uatnftinfos.loopring.io"`` \| ``"https://nftinfos.loopring.io"``

#### Returns

``"https://uatnftinfos.loopring.io"`` \| ``"https://nftinfos.loopring.io"``

#### Defined in

[api/delegate_api.ts:43](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/delegate_api.ts#L43)

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

[api/base_api.ts:136](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/base_api.ts#L136)

___

### getIPFS

▸ **getIPFS**(`path`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[api/delegate_api.ts:25](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/delegate_api.ts#L25)

___

### makeReq

▸ `Protected` **makeReq**(): `Request`

#### Returns

`Request`

#### Inherited from

[BaseAPI](BaseAPI.md).[makeReq](BaseAPI.md#makereq)

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

#### Inherited from

[BaseAPI](BaseAPI.md).[returnTxHash](BaseAPI.md#returntxhash)

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

#### Inherited from

[BaseAPI](BaseAPI.md).[setBaseUrl](BaseAPI.md#setbaseurl)

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

#### Inherited from

[BaseAPI](BaseAPI.md).[setChainId](BaseAPI.md#setchainid)

#### Defined in

[api/base_api.ts:170](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/base_api.ts#L170)
