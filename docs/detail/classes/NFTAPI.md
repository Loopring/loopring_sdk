[@loopring-web/loopring-sdk](../README.md) / [Exports](../modules.md) / NFTAPI

# Class: NFTAPI

## Hierarchy

- `BaseAPI`

  ↳ **`NFTAPI`**

## Table of contents

### Constructors

- [constructor](NFTAPI.md#constructor)

### Properties

- [baseUrl](NFTAPI.md#baseurl)

### Methods

- [\_genContract](NFTAPI.md#_gencontract)
- [\_genContractData](NFTAPI.md#_gencontractdata)
- [\_genERC1155Data](NFTAPI.md#_generc1155data)
- [\_genERC721Data](NFTAPI.md#_generc721data)
- [approveNFT](NFTAPI.md#approvenft)
- [callContractMethod](NFTAPI.md#callcontractmethod)
- [depositNFT](NFTAPI.md#depositnft)
- [getContractNFTMeta](NFTAPI.md#getcontractnftmeta)
- [getInfoForNFTTokens](NFTAPI.md#getinfofornfttokens)
- [isApprovedForAll](NFTAPI.md#isapprovedforall)
- [makeReq](NFTAPI.md#makereq)
- [setBaseUrl](NFTAPI.md#setbaseurl)
- [setChainId](NFTAPI.md#setchainid)

## Constructors

### constructor

• **new NFTAPI**(`param`, `timeout?`)

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

### \_genContract

▸ `Private` **_genContract**(`web3`, `contractAddress`, `type?`): `any`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `web3` | `any` | `undefined` |
| `contractAddress` | `string` | `undefined` |
| `type` | [`NFTType`](../enums/NFTType.md) | `NFTType.ERC1155` |

#### Returns

`any`

#### Defined in

[api/nft_api.ts:43](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/nft_api.ts#L43)

___

### \_genContractData

▸ `Private` **_genContractData**(`Contract`, `method`, `data`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `Contract` | `any` |
| `method` | `string` |
| `data` | `any` |

#### Returns

`any`

#### Defined in

[api/nft_api.ts:31](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/nft_api.ts#L31)

___

### \_genERC1155Data

▸ `Private` **_genERC1155Data**(`method`, `data`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `method` | `string` |
| `data` | `any` |

#### Returns

`any`

#### Defined in

[api/nft_api.ts:35](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/nft_api.ts#L35)

___

### \_genERC721Data

▸ `Private` **_genERC721Data**(`method`, `data`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `method` | `string` |
| `data` | `any` |

#### Returns

`any`

#### Defined in

[api/nft_api.ts:39](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/nft_api.ts#L39)

___

### approveNFT

▸ **approveNFT**(`__namedParameters`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.chainId` | [`ChainId`](../enums/ChainId.md) |
| `__namedParameters.depositAddress` | `string` |
| `__namedParameters.from` | `string` |
| `__namedParameters.gasLimit` | `number` |
| `__namedParameters.gasPrice` | `number` |
| `__namedParameters.nftType` | [`NFTType`](../enums/NFTType.md) |
| `__namedParameters.nonce` | `number` |
| `__namedParameters.sendByMetaMask?` | `boolean` |
| `__namedParameters.tokenAddress` | `string` |
| `__namedParameters.tokenId` | `string` |
| `__namedParameters.web3` | `default` |

#### Returns

`Promise`<`any`\>

#### Defined in

[api/nft_api.ts:110](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/nft_api.ts#L110)

___

### callContractMethod

▸ `Private` **callContractMethod**(`web3`, `method`, `data`, `contractAddress`, `type?`): `Promise`<`any`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `web3` | `any` | `undefined` |
| `method` | `string` | `undefined` |
| `data` | `any`[] | `undefined` |
| `contractAddress` | `string` | `undefined` |
| `type` | [`NFTType`](../enums/NFTType.md) | `NFTType.ERC1155` |

#### Returns

`Promise`<`any`\>

#### Defined in

[api/nft_api.ts:25](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/nft_api.ts#L25)

___

### depositNFT

▸ **depositNFT**(`__namedParameters`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.amount` | `number` |
| `__namedParameters.chainId?` | [`ChainId`](../enums/ChainId.md) |
| `__namedParameters.exchangeAddress` | `string` |
| `__namedParameters.extraData?` | `any` |
| `__namedParameters.from` | `string` |
| `__namedParameters.gasLimit` | `number` |
| `__namedParameters.gasPrice` | `number` |
| `__namedParameters.nftID` | `string` |
| `__namedParameters.nftType?` | [`NFTType`](../enums/NFTType.md) |
| `__namedParameters.nonce` | `number` |
| `__namedParameters.sendByMetaMask?` | `boolean` |
| `__namedParameters.tokenAddress` | `string` |
| `__namedParameters.web3` | `default` |

#### Returns

`Promise`<`any`\>

#### Defined in

[api/nft_api.ts:179](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/nft_api.ts#L179)

___

### getContractNFTMeta

▸ **getContractNFTMeta**(`__namedParameters`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters._id` | `string` |
| `__namedParameters.nftType?` | [`NFTType`](../enums/NFTType.md) |
| `__namedParameters.tokenAddress` | `string` |
| `__namedParameters.web3` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

[api/nft_api.ts:77](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/nft_api.ts#L77)

___

### getInfoForNFTTokens

▸ **getInfoForNFTTokens**(`__namedParameters`): `Promise`<`undefined` \| { [key: string]: [`NFTTokenInfo`](../interfaces/NFTTokenInfo.md);  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.nftDatas` | `string`[] |

#### Returns

`Promise`<`undefined` \| { [key: string]: [`NFTTokenInfo`](../interfaces/NFTTokenInfo.md);  }\>

#### Defined in

[api/nft_api.ts:55](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/nft_api.ts#L55)

___

### isApprovedForAll

▸ **isApprovedForAll**(`__namedParameters`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.exchangeAddress` | `string` |
| `__namedParameters.from` | `string` |
| `__namedParameters.nftType` | [`NFTType`](../enums/NFTType.md) |
| `__namedParameters.tokenAddress` | `string` |
| `__namedParameters.web3` | `default` |

#### Returns

`Promise`<`any`\>

#### Defined in

[api/nft_api.ts:153](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/nft_api.ts#L153)

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
