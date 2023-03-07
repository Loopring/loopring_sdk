[@loopring-web/loopring-sdk](../README.md) / [Exports](../modules.md) / UserNFTBalanceInfo

# Interface: UserNFTBalanceInfo<I\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `I` | [`NFT_IMAGE_SIZES`](../enums/NFT_IMAGE_SIZES.md) |

## Hierarchy

- [`NFTTokenInfo`](NFTTokenInfo.md)

  ↳ **`UserNFTBalanceInfo`**

## Table of contents

### Properties

- [accountId](UserNFTBalanceInfo.md#accountid)
- [collectionInfo](UserNFTBalanceInfo.md#collectioninfo)
- [deploymentStatus](UserNFTBalanceInfo.md#deploymentstatus)
- [isCounterFactualNFT](UserNFTBalanceInfo.md#iscounterfactualnft)
- [locked](UserNFTBalanceInfo.md#locked)
- [metadata](UserNFTBalanceInfo.md#metadata)
- [minter](UserNFTBalanceInfo.md#minter)
- [nftData](UserNFTBalanceInfo.md#nftdata)
- [nftId](UserNFTBalanceInfo.md#nftid)
- [nftType](UserNFTBalanceInfo.md#nfttype)
- [pending](UserNFTBalanceInfo.md#pending)
- [preference](UserNFTBalanceInfo.md#preference)
- [status](UserNFTBalanceInfo.md#status)
- [tokenAddress](UserNFTBalanceInfo.md#tokenaddress)
- [tokenId](UserNFTBalanceInfo.md#tokenid)
- [total](UserNFTBalanceInfo.md#total)

## Properties

### accountId

• **accountId**: `number`

#### Defined in

[defs/loopring_defs.ts:2681](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L2681)

___

### collectionInfo

• **collectionInfo**: [`CollectionMeta`](../modules.md#collectionmeta)

#### Defined in

[defs/loopring_defs.ts:2693](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L2693)

___

### deploymentStatus

• **deploymentStatus**: [`DEPLOYMENT_STATUS`](../enums/DEPLOYMENT_STATUS.md)

#### Defined in

[defs/loopring_defs.ts:2695](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L2695)

___

### isCounterFactualNFT

• **isCounterFactualNFT**: `boolean`

#### Defined in

[defs/loopring_defs.ts:2696](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L2696)

___

### locked

• `Optional` **locked**: `string`

#### Defined in

[defs/loopring_defs.ts:2684](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L2684)

___

### metadata

• `Optional` **metadata**: [`IPFS_METADATA`](../modules.md#ipfs_metadata)

#### Defined in

[defs/loopring_defs.ts:2694](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L2694)

___

### minter

• **minter**: `string`

#### Inherited from

[NFTTokenInfo](NFTTokenInfo.md).[minter](NFTTokenInfo.md#minter)

#### Defined in

[defs/loopring_defs.ts:2715](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L2715)

___

### nftData

• **nftData**: `string`

#### Inherited from

[NFTTokenInfo](NFTTokenInfo.md).[nftData](NFTTokenInfo.md#nftdata)

#### Defined in

[defs/loopring_defs.ts:2714](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L2714)

___

### nftId

• **nftId**: `string`

#### Inherited from

[NFTTokenInfo](NFTTokenInfo.md).[nftId](NFTTokenInfo.md#nftid)

#### Defined in

[defs/loopring_defs.ts:2718](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L2718)

___

### nftType

• **nftType**: `string`

#### Inherited from

[NFTTokenInfo](NFTTokenInfo.md).[nftType](NFTTokenInfo.md#nfttype)

#### Defined in

[defs/loopring_defs.ts:2716](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L2716)

___

### pending

• **pending**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `deposit` | `string` |
| `withdraw` | `string` |

#### Defined in

[defs/loopring_defs.ts:2685](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L2685)

___

### preference

• **preference**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `favourite` | `boolean` |
| `hide` | `boolean` |

#### Defined in

[defs/loopring_defs.ts:2689](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L2689)

___

### status

• **status**: `boolean`

#### Inherited from

[NFTTokenInfo](NFTTokenInfo.md).[status](NFTTokenInfo.md#status)

#### Defined in

[defs/loopring_defs.ts:2719](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L2719)

___

### tokenAddress

• **tokenAddress**: `string`

#### Inherited from

[NFTTokenInfo](NFTTokenInfo.md).[tokenAddress](NFTTokenInfo.md#tokenaddress)

#### Defined in

[defs/loopring_defs.ts:2717](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L2717)

___

### tokenId

• **tokenId**: `number`

#### Defined in

[defs/loopring_defs.ts:2682](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L2682)

___

### total

• `Optional` **total**: `string`

#### Defined in

[defs/loopring_defs.ts:2683](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L2683)
