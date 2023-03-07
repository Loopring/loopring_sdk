[@loopring-web/loopring-sdk](../README.md) / [Exports](../modules.md) / ContactAPI

# Class: ContactAPI

## Hierarchy

- [`BaseAPI`](BaseAPI.md)

  ↳ **`ContactAPI`**

## Table of contents

### Constructors

- [constructor](ContactAPI.md#constructor)

### Properties

- [baseUrl](ContactAPI.md#baseurl)
- [chainId](ContactAPI.md#chainid)
- [KEY\_MESSAGE](ContactAPI.md#key_message)

### Methods

- [createContact](ContactAPI.md#createcontact)
- [deleteContact](ContactAPI.md#deletecontact)
- [genErr](ContactAPI.md#generr)
- [getAvailableBroker](ContactAPI.md#getavailablebroker)
- [getContacts](ContactAPI.md#getcontacts)
- [getCounterFactualInfo](ContactAPI.md#getcounterfactualinfo)
- [makeReq](ContactAPI.md#makereq)
- [returnTxHash](ContactAPI.md#returntxhash)
- [setBaseUrl](ContactAPI.md#setbaseurl)
- [setChainId](ContactAPI.md#setchainid)
- [updateContact](ContactAPI.md#updatecontact)

## Constructors

### constructor

• **new ContactAPI**(`param`, `timeout?`, `baseUrlMap?`)

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

### createContact

▸ **createContact**(`request`, `apiKey`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`CreateContactRequest`](../interfaces/CreateContactRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[api/contacts_api.ts:36](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/api/contacts_api.ts#L36)

___

### deleteContact

▸ **deleteContact**(`request`, `apiKey`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`DeleteContactRequest`](../interfaces/DeleteContactRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[api/contacts_api.ts:67](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/api/contacts_api.ts#L67)

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

### getContacts

▸ **getContacts**(`request`, `apiKey`): `Promise`<[`GetContactsResponse`](../interfaces/GetContactsResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetContactsRequest`](../interfaces/GetContactsRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<[`GetContactsResponse`](../interfaces/GetContactsResponse.md)\>

#### Defined in

[api/contacts_api.ts:18](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/api/contacts_api.ts#L18)

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

### makeReq

▸ `Protected` **makeReq**(): `Request`

#### Returns

`Request`

#### Inherited from

[BaseAPI](BaseAPI.md).[makeReq](BaseAPI.md#makereq)

#### Defined in

[api/base_api.ts:182](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/api/base_api.ts#L182)

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

___

### updateContact

▸ **updateContact**(`request`, `apiKey`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`UpdateContactRequest`](../interfaces/UpdateContactRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[api/contacts_api.ts:52](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/api/contacts_api.ts#L52)
