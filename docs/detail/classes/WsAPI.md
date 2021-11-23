[@loopring-web/loopring-sdk](../README.md) / [Exports](../modules.md) / WsAPI

# Class: WsAPI

## Hierarchy

- `BaseAPI`

  ↳ **`WsAPI`**

## Table of contents

### Constructors

- [constructor](WsAPI.md#constructor)

### Properties

- [baseUrl](WsAPI.md#baseurl)

### Methods

- [getWsKey](WsAPI.md#getwskey)
- [makeReq](WsAPI.md#makereq)
- [setBaseUrl](WsAPI.md#setbaseurl)
- [setChainId](WsAPI.md#setchainid)

## Constructors

### constructor

• **new WsAPI**(`param`, `timeout?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `param` | `InitParam` | `undefined` |
| `timeout` | `number` | `DEFAULT_TIMEOUT` |

#### Inherited from

BaseAPI.constructor

#### Defined in

[api/base_api.ts:29](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/base_api.ts#L29)

## Properties

### baseUrl

• `Protected` **baseUrl**: `string` = `''`

#### Inherited from

BaseAPI.baseUrl

#### Defined in

[api/base_api.ts:26](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/base_api.ts#L26)

## Methods

### getWsKey

▸ **getWsKey**(): `Promise`<{ `raw_data`: `any` ; `wsKey`: `any`  }\>

#### Returns

`Promise`<{ `raw_data`: `any` ; `wsKey`: `any`  }\>

#### Defined in

[api/ws_api.ts:14](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/ws_api.ts#L14)

___

### makeReq

▸ `Protected` **makeReq**(): `Request`

#### Returns

`Request`

#### Inherited from

BaseAPI.makeReq

#### Defined in

[api/base_api.ts:49](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/base_api.ts#L49)

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

[api/base_api.ts:45](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/base_api.ts#L45)

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

[api/base_api.ts:41](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/base_api.ts#L41)
