[@loopring-web/loopring-sdk](../README.md) / [Exports](../modules.md) / WhitelistedUserAPI

# Class: WhitelistedUserAPI

## Hierarchy

- `BaseAPI`

  ↳ **`WhitelistedUserAPI`**

## Table of contents

### Constructors

- [constructor](WhitelistedUserAPI.md#constructor)

### Properties

- [baseUrl](WhitelistedUserAPI.md#baseurl)

### Methods

- [makeReq](WhitelistedUserAPI.md#makereq)
- [setBaseUrl](WhitelistedUserAPI.md#setbaseurl)
- [setChainId](WhitelistedUserAPI.md#setchainid)
- [submitInternalTransfer](WhitelistedUserAPI.md#submitinternaltransfer)
- [submitOffchainWithdraw](WhitelistedUserAPI.md#submitoffchainwithdraw)

## Constructors

### constructor

• **new WhitelistedUserAPI**(`param`, `timeout?`)

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

___

### submitInternalTransfer

▸ **submitInternalTransfer**(`request`, `eddsaKey`, `apiKey`): `Promise`<{ `raw_data`: `any`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`OriginTransferRequestV3`](../interfaces/OriginTransferRequestV3.md) |
| `eddsaKey` | `string` |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `any`  }\>

#### Defined in

[api/whitelisted_user_api.ts:43](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/whitelisted_user_api.ts#L43)

___

### submitOffchainWithdraw

▸ `Private` **submitOffchainWithdraw**(`request`, `eddsaKey`, `apiKey`): `Promise`<{ `raw_data`: `any`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`OffChainWithdrawalRequestV3`](../interfaces/OffChainWithdrawalRequestV3.md) |
| `eddsaKey` | `string` |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `any`  }\>

#### Defined in

[api/whitelisted_user_api.ts:19](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/whitelisted_user_api.ts#L19)
