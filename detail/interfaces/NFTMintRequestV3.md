[@loopring-web/loopring-sdk](../README.md) / [Exports](../modules.md) / NFTMintRequestV3

# Interface: NFTMintRequestV3

**`export`**

**`interface`** NFTMintRequestV3

## Table of contents

### Properties

- [amount](NFTMintRequestV3.md#amount)
- [counterFactualInfo](NFTMintRequestV3.md#counterfactualinfo)
- [counterFactualNftInfo](NFTMintRequestV3.md#counterfactualnftinfo)
- [ecdsaSignature](NFTMintRequestV3.md#ecdsasignature)
- [eddsaSignature](NFTMintRequestV3.md#eddsasignature)
- [exchange](NFTMintRequestV3.md#exchange)
- [forceToMint](NFTMintRequestV3.md#forcetomint)
- [hashApproved](NFTMintRequestV3.md#hashapproved)
- [maxFee](NFTMintRequestV3.md#maxfee)
- [minterAddress](NFTMintRequestV3.md#minteraddress)
- [minterId](NFTMintRequestV3.md#minterid)
- [nftId](NFTMintRequestV3.md#nftid)
- [nftType](NFTMintRequestV3.md#nfttype)
- [royaltyPercentage](NFTMintRequestV3.md#royaltypercentage)
- [storageId](NFTMintRequestV3.md#storageid)
- [toAccountId](NFTMintRequestV3.md#toaccountid)
- [toAddress](NFTMintRequestV3.md#toaddress)
- [tokenAddress](NFTMintRequestV3.md#tokenaddress)
- [validUntil](NFTMintRequestV3.md#validuntil)

## Properties

### amount

• **amount**: `string`

The amount of the token

**`memberof`** TokenVolumeV3

#### Defined in

[defs/loopring_defs.ts:1982](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1982)

___

### counterFactualInfo

• `Optional` **counterFactualInfo**: [`CounterFactualInfo`](CounterFactualInfo.md)

#### Defined in

[defs/loopring_defs.ts:2033](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L2033)

___

### counterFactualNftInfo

• `Optional` **counterFactualNftInfo**: ``null`` \| [`NFTCounterFactualInfo`](NFTCounterFactualInfo.md)

#### Defined in

[defs/loopring_defs.ts:2032](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L2032)

___

### ecdsaSignature

• `Optional` **ecdsaSignature**: `string`

ecdsa signature

**`memberof`** OriginNFTMintRequestV3

#### Defined in

[defs/loopring_defs.ts:2025](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L2025)

___

### eddsaSignature

• `Optional` **eddsaSignature**: `string`

eddsa signature

**`memberof`** OriginNFTMintRequestV3

#### Defined in

[defs/loopring_defs.ts:2019](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L2019)

___

### exchange

• **exchange**: `string`

exchange address

**`memberof`** OriginNFTMintRequestV3

#### Defined in

[defs/loopring_defs.ts:1934](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1934)

___

### forceToMint

• `Optional` **forceToMint**: `boolean`

force to mint, regardless the previous mint record

**`memberof`** OriginNFTMintRequestV3

#### Defined in

[defs/loopring_defs.ts:2013](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L2013)

___

### hashApproved

• `Optional` **hashApproved**: `string`

An approved hash string which was already submitted on eth mainnet

**`memberof`** OriginNFTMintRequestV3

#### Defined in

[defs/loopring_defs.ts:2031](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L2031)

___

### maxFee

• **maxFee**: `Pick`<[`TokenVolumeV3`](TokenVolumeV3.md), ``"tokenId"``\> & { `amount`: `string`  }

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:2001](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L2001)

___

### minterAddress

• **minterAddress**: `string`

account owner address

**`memberof`** OriginNFTMintRequestV3

#### Defined in

[defs/loopring_defs.ts:1946](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1946)

___

### minterId

• **minterId**: `number`

account ID

**`memberof`** OriginNFTMintRequestV3

#### Defined in

[defs/loopring_defs.ts:1940](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1940)

___

### nftId

• **nftId**: `string`

NFT_ID url_id

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1976](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1976)

___

### nftType

• **nftType**: ``0`` \| ``1``

nftType: 0 for EIP1155, 1 for EIP712. EIP1155 by default.

**`memberof`** OriginNFTMintRequestV3

#### Defined in

[defs/loopring_defs.ts:1964](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1964)

___

### royaltyPercentage

• **royaltyPercentage**: `number`

0-50

**`memberof`** OriginNFTMintRequestV3

#### Defined in

[defs/loopring_defs.ts:2007](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L2007)

___

### storageId

• **storageId**: `number`

offchain ID

**`memberof`** OriginNFTMintRequestV3

#### Defined in

[defs/loopring_defs.ts:1995](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1995)

___

### toAccountId

• **toAccountId**: `number`

The account receive the minted NFTAction token, now should be minter himself.

**`memberof`** OriginNFTMintRequestV3

#### Defined in

[defs/loopring_defs.ts:1952](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1952)

___

### toAddress

• `Optional` **toAddress**: `string`

The account receive the minted NFTAction token, now should be minter himself.

**`memberof`** OriginNFTMintRequestV3

#### Defined in

[defs/loopring_defs.ts:1958](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1958)

___

### tokenAddress

• **tokenAddress**: `string`

Contract address

**`type{string}`**

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1970](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1970)

___

### validUntil

• **validUntil**: `number`

Timestamp for order to become invalid

**`memberof`** OriginNFTMintRequestV3

#### Defined in

[defs/loopring_defs.ts:1989](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1989)
