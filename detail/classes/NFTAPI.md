[@loopring-web/loopring-sdk](../README.md) / [Exports](../modules.md) / NFTAPI

# Class: NFTAPI

## Hierarchy

- [`BaseAPI`](BaseAPI.md)

  ↳ **`NFTAPI`**

## Table of contents

### Constructors

- [constructor](NFTAPI.md#constructor)

### Properties

- [baseUrl](NFTAPI.md#baseurl)
- [chainId](NFTAPI.md#chainid)
- [KEY\_MESSAGE](NFTAPI.md#key_message)

### Methods

- [\_genContract](NFTAPI.md#_gencontract)
- [\_genContractData](NFTAPI.md#_gencontractdata)
- [\_genERC1155Data](NFTAPI.md#_generc1155data)
- [\_genERC721Data](NFTAPI.md#_generc721data)
- [approveNFT](NFTAPI.md#approvenft)
- [callContractMethod](NFTAPI.md#callcontractmethod)
- [callRefreshNFT](NFTAPI.md#callrefreshnft)
- [computeNFTAddress](NFTAPI.md#computenftaddress)
- [depositNFT](NFTAPI.md#depositnft)
- [genErr](NFTAPI.md#generr)
- [getAvailableBroker](NFTAPI.md#getavailablebroker)
- [getCollectionWholeNFTs](NFTAPI.md#getcollectionwholenfts)
- [getContractNFTMeta](NFTAPI.md#getcontractnftmeta)
- [getCounterFactualInfo](NFTAPI.md#getcounterfactualinfo)
- [getInfoForNFTTokens](NFTAPI.md#getinfofornfttokens)
- [getNFTBalance](NFTAPI.md#getnftbalance)
- [getPublicCollectionById](NFTAPI.md#getpubliccollectionbyid)
- [ipfsCid0ToNftID](NFTAPI.md#ipfscid0tonftid)
- [ipfsNftIDToCid](NFTAPI.md#ipfsnftidtocid)
- [isApprovedForAll](NFTAPI.md#isapprovedforall)
- [makeReq](NFTAPI.md#makereq)
- [returnTxHash](NFTAPI.md#returntxhash)
- [setBaseUrl](NFTAPI.md#setbaseurl)
- [setChainId](NFTAPI.md#setchainid)

## Constructors

### constructor

• **new NFTAPI**(`param`, `timeout?`, `baseUrlMap?`)

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

[api/nft_api.ts:94](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/nft_api.ts#L94)

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

[api/nft_api.ts:82](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/nft_api.ts#L82)

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

[api/nft_api.ts:86](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/nft_api.ts#L86)

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

[api/nft_api.ts:90](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/nft_api.ts#L90)

___

### approveNFT

▸ **approveNFT**(`__namedParameters`): `Promise`<`any`\>

approveNFT

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `ApproveParam` |

#### Returns

`Promise`<`any`\>

#### Defined in

[api/nft_api.ts:297](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/nft_api.ts#L297)

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

[api/nft_api.ts:70](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/nft_api.ts#L70)

___

### callRefreshNFT

▸ **callRefreshNFT**(`request`): `Promise`<`undefined` \| { `createdAt`: `number` ; `status`: `string` ; `updatedAt`: `number`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | `CallRefreshNFT` |

#### Returns

`Promise`<`undefined` \| { `createdAt`: `number` ; `status`: `string` ; `updatedAt`: `number`  }\>

#### Defined in

[api/nft_api.ts:205](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/nft_api.ts#L205)

___

### computeNFTAddress

▸ **computeNFTAddress**(`__namedParameters`): `Object`

**`function`** computeNFTAddress

**`throws`** Error

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.nftBaseUri?` | `string` |
| `__namedParameters.nftFactory?` | `string` |
| `__namedParameters.nftOwner` | `string` |

#### Returns

`Object`

tokenAddress

| Name | Type |
| :------ | :------ |
| `tokenAddress` | `string` |

#### Defined in

[api/nft_api.ts:463](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/nft_api.ts#L463)

___

### depositNFT

▸ **depositNFT**(`__namedParameters`): `Promise`<`any`\>

**`depositparam`** an NFTAction to the specified account.

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `DepositNFTParam` |

#### Returns

`Promise`<`any`\>

#### Defined in

[api/nft_api.ts:416](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/nft_api.ts#L416)

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

### getCollectionWholeNFTs

▸ **getCollectionWholeNFTs**<`R`\>(`request`): `Promise`<`any`\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetCollectionWholeNFTsRequest`](../interfaces/GetCollectionWholeNFTsRequest.md) |

#### Returns

`Promise`<`any`\>

#### Defined in

[api/nft_api.ts:537](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/nft_api.ts#L537)

___

### getContractNFTMeta

▸ **getContractNFTMeta**(`__namedParameters`, `_IPFS_META_URL?`): `Promise`<`any`\>

getContractNFTMeta

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `__namedParameters` | `ContractNFTMetaParam` | `undefined` |
| `_IPFS_META_URL` | `string` | `LOOPRING_URLs.IPFS_META_URL` |

#### Returns

`Promise`<`any`\>

#### Defined in

[api/nft_api.ts:250](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/nft_api.ts#L250)

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

### getInfoForNFTTokens

▸ **getInfoForNFTTokens**(`nftDatas`): `Promise`<`undefined` \| { `[key: string]`: [`NFTTokenInfo`](../interfaces/NFTTokenInfo.md);  }\>

getInfoForNFTTokens

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nftDatas` | `Object` | NftData[] |
| `nftDatas.nftDatas` | `string`[] | - |

#### Returns

`Promise`<`undefined` \| { `[key: string]`: [`NFTTokenInfo`](../interfaces/NFTTokenInfo.md);  }\>

#### Defined in

[api/nft_api.ts:167](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/nft_api.ts#L167)

___

### getNFTBalance

▸ **getNFTBalance**(`__namedParameters`): `Promise`<{ `count?`: `string`  }\>

getNFTBalance

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `UserNFTBalanceParam` |

#### Returns

`Promise`<{ `count?`: `string`  }\>

#### Defined in

[api/nft_api.ts:115](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/nft_api.ts#L115)

___

### getPublicCollectionById

▸ **getPublicCollectionById**<`R`\>(`request`): `Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| { `raw_data`: `R`  } & [`CollectionExtendsKey`](../modules.md#collectionextendskey) & [`CollectionBasicMeta`](../modules.md#collectionbasicmeta)\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | extends [`CollectionMeta`](../modules.md#collectionmeta) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | `Object` |
| `request.id` | `string` |

#### Returns

`Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| { `raw_data`: `R`  } & [`CollectionExtendsKey`](../modules.md#collectionextendskey) & [`CollectionBasicMeta`](../modules.md#collectionbasicmeta)\>

#### Defined in

[api/nft_api.ts:508](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/nft_api.ts#L508)

___

### ipfsCid0ToNftID

▸ **ipfsCid0ToNftID**(`cidV0Str`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `cidV0Str` | `string` |

#### Returns

`string`

#### Defined in

[api/nft_api.ts:346](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/nft_api.ts#L346)

___

### ipfsNftIDToCid

▸ **ipfsNftIDToCid**(`nftId`): `any`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nftId` | `string` | 16 |

#### Returns

`any`

#### Defined in

[api/nft_api.ts:359](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/nft_api.ts#L359)

___

### isApprovedForAll

▸ **isApprovedForAll**(`__namedParameters`): `Promise`<`any`\>

isApprovedForAll

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `IsApproveParam` |

#### Returns

`Promise`<`any`\>

#### Defined in

[api/nft_api.ts:375](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/nft_api.ts#L375)

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
