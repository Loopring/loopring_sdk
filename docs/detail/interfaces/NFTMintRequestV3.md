[@loopring-web/loopring-sdk](../README.md) / [Exports](../modules.md) / NFTMintRequestV3

# Interface: NFTMintRequestV3

**`export`**

**`interface`** NFTMintRequestV3

## Table of contents

### Properties

- [amount](NFTMintRequestV3.md#amount)
- [creatorFeeBips](NFTMintRequestV3.md#creatorfeebips)
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
- [storageId](NFTMintRequestV3.md#storageid)
- [toAccountId](NFTMintRequestV3.md#toaccountid)
- [toAddress](NFTMintRequestV3.md#toaddress)
- [tokenAddress](NFTMintRequestV3.md#tokenaddress)
- [validUntil](NFTMintRequestV3.md#validuntil)

## Properties

### amount

• **amount**: `string`

The ammount of the token

**`memberof`** TokenVolumeV3

#### Defined in

[defs/loopring_defs.ts:1540](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/defs/loopring_defs.ts#L1540)

___

### creatorFeeBips

• `Optional` **creatorFeeBips**: `number`

fee to the creator of each NFT transaction.

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1546](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/defs/loopring_defs.ts#L1546)

___

### ecdsaSignature

• `Optional` **ecdsaSignature**: `string`

ecdsa signature

**`memberof`** OriginNFTMintRequestV3

#### Defined in

[defs/loopring_defs.ts:1583](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/defs/loopring_defs.ts#L1583)

___

### eddsaSignature

• `Optional` **eddsaSignature**: `string`

eddsa signature

**`memberof`** OriginNFTMintRequestV3

#### Defined in

[defs/loopring_defs.ts:1577](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/defs/loopring_defs.ts#L1577)

___

### exchange

• **exchange**: `string`

exchange address

**`memberof`** OriginNFTMintRequestV3

#### Defined in

[defs/loopring_defs.ts:1492](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/defs/loopring_defs.ts#L1492)

___

### forceToMint

• `Optional` **forceToMint**: `boolean`

force to mint, regardless the previous mint record

**`memberof`** OriginNFTMintRequestV3

#### Defined in

[defs/loopring_defs.ts:1571](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/defs/loopring_defs.ts#L1571)

___

### hashApproved

• `Optional` **hashApproved**: `string`

An approved hash string which was already submitted on eth mainnet

**`memberof`** OriginNFTMintRequestV3

#### Defined in

[defs/loopring_defs.ts:1589](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/defs/loopring_defs.ts#L1589)

___

### maxFee

• **maxFee**: `Pick`<[`TokenVolumeV3`](TokenVolumeV3.md), ``"tokenId"``\> & { `amount`: `string`  }

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1565](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/defs/loopring_defs.ts#L1565)

___

### minterAddress

• **minterAddress**: `string`

account owner address

**`memberof`** OriginNFTMintRequestV3

#### Defined in

[defs/loopring_defs.ts:1504](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/defs/loopring_defs.ts#L1504)

___

### minterId

• **minterId**: `number`

account ID

**`memberof`** OriginNFTMintRequestV3

#### Defined in

[defs/loopring_defs.ts:1498](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/defs/loopring_defs.ts#L1498)

___

### nftId

• **nftId**: `string`

NFT_ID url_id

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1534](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/defs/loopring_defs.ts#L1534)

___

### nftType

• **nftType**: ``0`` \| ``1``

nftType: 0 for EIP1155, 1 for EIP712. EIP1155 by default.

**`memberof`** OriginNFTMintRequestV3

#### Defined in

[defs/loopring_defs.ts:1522](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/defs/loopring_defs.ts#L1522)

___

### storageId

• **storageId**: `number`

offchain ID

**`memberof`** OriginNFTMintRequestV3

#### Defined in

[defs/loopring_defs.ts:1559](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/defs/loopring_defs.ts#L1559)

___

### toAccountId

• **toAccountId**: `number`

The account receive the minted NFT token, now should be minter himself.

**`memberof`** OriginNFTMintRequestV3

#### Defined in

[defs/loopring_defs.ts:1510](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/defs/loopring_defs.ts#L1510)

___

### toAddress

• `Optional` **toAddress**: `string`

The account receive the minted NFT token, now should be minter himself.

**`memberof`** OriginNFTMintRequestV3

#### Defined in

[defs/loopring_defs.ts:1516](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/defs/loopring_defs.ts#L1516)

___

### tokenAddress

• **tokenAddress**: `string`

Contract address

**`type{string}`**

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1528](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/defs/loopring_defs.ts#L1528)

___

### validUntil

• **validUntil**: `number`

Timestamp for order to become invalid

**`memberof`** OriginNFTMintRequestV3

#### Defined in

[defs/loopring_defs.ts:1553](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/defs/loopring_defs.ts#L1553)
