[@loopring-web/loopring-sdk](../README.md) / [Exports](../modules.md) / OriginDeployCollectionRequestV3

# Interface: OriginDeployCollectionRequestV3

## Table of contents

### Properties

- [counterFactualInfo](OriginDeployCollectionRequestV3.md#counterfactualinfo)
- [nftBaseUri](OriginDeployCollectionRequestV3.md#nftbaseuri)
- [nftFactory](OriginDeployCollectionRequestV3.md#nftfactory)
- [nftOwner](OriginDeployCollectionRequestV3.md#nftowner)
- [tokenAddress](OriginDeployCollectionRequestV3.md#tokenaddress)
- [transfer](OriginDeployCollectionRequestV3.md#transfer)

## Properties

### counterFactualInfo

• `Optional` **counterFactualInfo**: [`CounterFactualInfo`](CounterFactualInfo.md)

#### Defined in

[defs/loopring_defs.ts:1710](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/defs/loopring_defs.ts#L1710)

___

### nftBaseUri

• **nftBaseUri**: `string`

nftBaseUri

**`memberof`** OriginDeployCollectionRequestV3

#### Defined in

[defs/loopring_defs.ts:1697](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/defs/loopring_defs.ts#L1697)

___

### nftFactory

• **nftFactory**: `string`

nftFactory

**`memberof`** OriginDeployCollectionRequestV3

#### Defined in

[defs/loopring_defs.ts:1703](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/defs/loopring_defs.ts#L1703)

___

### nftOwner

• **nftOwner**: `string`

nftOwner

**`memberof`** OriginDeployCollectionRequestV3

#### Defined in

[defs/loopring_defs.ts:1691](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/defs/loopring_defs.ts#L1691)

___

### tokenAddress

• **tokenAddress**: `string`

tokenAddress

**`memberof`** OriginDeployCollectionRequestV3

#### Defined in

[defs/loopring_defs.ts:1709](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/defs/loopring_defs.ts#L1709)

___

### transfer

• **transfer**: `Omit`<[`OriginTransferRequestV3`](OriginTransferRequestV3.md), ``"payeeId"`` \| ``"maxFee"`` \| ``"memo"``\> & { `maxFee?`: { `tokenId`: `string` \| `number` ; `volume`: ``"0"``  } ; `memo?`: `string` ; `payeeId?`: ``0``  }

Transfer

**`memberof`** OriginDeployNFTRequestV3

#### Defined in

[defs/loopring_defs.ts:1678](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/defs/loopring_defs.ts#L1678)
