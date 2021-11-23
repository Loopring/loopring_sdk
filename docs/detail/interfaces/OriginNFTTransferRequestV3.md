[@loopring-web/loopring-sdk](../README.md) / [Exports](../modules.md) / OriginNFTTransferRequestV3

# Interface: OriginNFTTransferRequestV3

Submit internal transfer params

**`export`**

**`interface`** OriginNFTTransferRequestV3

## Table of contents

### Properties

- [clientId](OriginNFTTransferRequestV3.md#clientid)
- [ecdsaSignature](OriginNFTTransferRequestV3.md#ecdsasignature)
- [eddsaSignature](OriginNFTTransferRequestV3.md#eddsasignature)
- [exchange](OriginNFTTransferRequestV3.md#exchange)
- [fromAccountId](OriginNFTTransferRequestV3.md#fromaccountid)
- [fromAddress](OriginNFTTransferRequestV3.md#fromaddress)
- [hashApproved](OriginNFTTransferRequestV3.md#hashapproved)
- [maxFee](OriginNFTTransferRequestV3.md#maxfee)
- [memo](OriginNFTTransferRequestV3.md#memo)
- [storageId](OriginNFTTransferRequestV3.md#storageid)
- [toAccountId](OriginNFTTransferRequestV3.md#toaccountid)
- [toAddress](OriginNFTTransferRequestV3.md#toaddress)
- [token](OriginNFTTransferRequestV3.md#token)
- [validUntil](OriginNFTTransferRequestV3.md#validuntil)

## Properties

### clientId

• `Optional` **clientId**: `string`

A user-defined id

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1382](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/defs/loopring_defs.ts#L1382)

___

### ecdsaSignature

• `Optional` **ecdsaSignature**: `string`

ecdsa signature

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1364](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/defs/loopring_defs.ts#L1364)

___

### eddsaSignature

• `Optional` **eddsaSignature**: `string`

eddsa signature

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1358](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/defs/loopring_defs.ts#L1358)

___

### exchange

• **exchange**: `string`

exchange address

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1304](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/defs/loopring_defs.ts#L1304)

___

### fromAccountId

• **fromAccountId**: `number`

fromAccountId

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1310](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/defs/loopring_defs.ts#L1310)

___

### fromAddress

• **fromAddress**: `string`

payer account address

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1316](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/defs/loopring_defs.ts#L1316)

___

### hashApproved

• `Optional` **hashApproved**: `string`

An approved hash string which was already submitted on eth mainnet

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1370](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/defs/loopring_defs.ts#L1370)

___

### maxFee

• **maxFee**: `Pick`<[`TokenVolumeV3`](TokenVolumeV3.md), ``"tokenId"``\> & { `amount`: `string`  }

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1340](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/defs/loopring_defs.ts#L1340)

___

### memo

• `Optional` **memo**: `string`

transfer memo

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1376](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/defs/loopring_defs.ts#L1376)

___

### storageId

• **storageId**: `number`

offchain Id

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1346](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/defs/loopring_defs.ts#L1346)

___

### toAccountId

• **toAccountId**: `number`

to account ID

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1322](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/defs/loopring_defs.ts#L1322)

___

### toAddress

• **toAddress**: `string`

toAddress address

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1328](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/defs/loopring_defs.ts#L1328)

___

### token

• **token**: [`TokenVolumeNFT`](TokenVolumeNFT.md)

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1334](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/defs/loopring_defs.ts#L1334)

___

### validUntil

• **validUntil**: `number`

Timestamp for order to become invalid

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1352](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/defs/loopring_defs.ts#L1352)
