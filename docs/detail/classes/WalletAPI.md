[@loopring-web/loopring-sdk](../README.md) / [Exports](../modules.md) / WalletAPI

# Class: WalletAPI

## Hierarchy

- `BaseAPI`

  ↳ **`WalletAPI`**

## Table of contents

### Constructors

- [constructor](WalletAPI.md#constructor)

### Properties

- [baseUrl](WalletAPI.md#baseurl)

### Methods

- [getLatestTokenPrices](WalletAPI.md#getlatesttokenprices)
- [getTokenPrices](WalletAPI.md#gettokenprices)
- [getUserAssets](WalletAPI.md#getuserassets)
- [getUserTradeAmount](WalletAPI.md#getusertradeamount)
- [makeReq](WalletAPI.md#makereq)
- [setBaseUrl](WalletAPI.md#setbaseurl)
- [setChainId](WalletAPI.md#setchainid)

## Constructors

### constructor

• **new WalletAPI**(`param`, `timeout?`)

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

### getLatestTokenPrices

▸ **getLatestTokenPrices**(`request?`): `Promise`<{ `raw_data`: `any` ; `tokenPrices`: [`LoopringMap`](../interfaces/LoopringMap.md)<`number`\>  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request?` | [`getLatestTokenPricesRequest`](../interfaces/getLatestTokenPricesRequest.md) |

#### Returns

`Promise`<{ `raw_data`: `any` ; `tokenPrices`: [`LoopringMap`](../interfaces/LoopringMap.md)<`number`\>  }\>

#### Defined in

[api/wallet_api.ts:111](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/wallet_api.ts#L111)

___

### getTokenPrices

▸ **getTokenPrices**(`request`): `Promise`<{ `priceSeries`: `string`[] ; `raw_data`: `any` ; `timestampSeries`: `number`[] ; `tokenPrices`: [`TokenPriceInfo`](../interfaces/TokenPriceInfo.md)[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetTokenPricesRequest`](../interfaces/GetTokenPricesRequest.md) |

#### Returns

`Promise`<{ `priceSeries`: `string`[] ; `raw_data`: `any` ; `timestampSeries`: `number`[] ; `tokenPrices`: [`TokenPriceInfo`](../interfaces/TokenPriceInfo.md)[]  }\>

#### Defined in

[api/wallet_api.ts:75](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/wallet_api.ts#L75)

___

### getUserAssets

▸ **getUserAssets**(`request`): `Promise`<{ `assetSeries`: `string`[] ; `dateSeries`: `string`[] ; `raw_data`: `any` ; `timestampSeries`: `number`[] ; `userAssets`: [`UserAssetInfo`](../interfaces/UserAssetInfo.md)[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserAssetsRequest`](../interfaces/GetUserAssetsRequest.md) |

#### Returns

`Promise`<{ `assetSeries`: `string`[] ; `dateSeries`: `string`[] ; `raw_data`: `any` ; `timestampSeries`: `number`[] ; `userAssets`: [`UserAssetInfo`](../interfaces/UserAssetInfo.md)[]  }\>

#### Defined in

[api/wallet_api.ts:16](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/wallet_api.ts#L16)

___

### getUserTradeAmount

▸ **getUserTradeAmount**(`request`): `Promise`<{ `raw_data`: `any`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserTradeAmount`](../interfaces/GetUserTradeAmount.md) |

#### Returns

`Promise`<{ `raw_data`: `any`  }\>

#### Defined in

[api/wallet_api.ts:54](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/wallet_api.ts#L54)

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
