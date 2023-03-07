[@loopring-web/loopring-sdk](../README.md) / [Exports](../modules.md) / OriginNFTTransferRequestV3

# Interface: OriginNFTTransferRequestV3

Submit internal transfer params

**`export`**

**`interface`** OriginNFTTransferRequestV3

## Table of contents

### Properties

- [clientId](OriginNFTTransferRequestV3.md#clientid)
- [counterFactualInfo](OriginNFTTransferRequestV3.md#counterfactualinfo)
- [ecdsaSignature](OriginNFTTransferRequestV3.md#ecdsasignature)
- [eddsaSignature](OriginNFTTransferRequestV3.md#eddsasignature)
- [exchange](OriginNFTTransferRequestV3.md#exchange)
- [fromAccountId](OriginNFTTransferRequestV3.md#fromaccountid)
- [fromAddress](OriginNFTTransferRequestV3.md#fromaddress)
- [hashApproved](OriginNFTTransferRequestV3.md#hashapproved)
- [maxFee](OriginNFTTransferRequestV3.md#maxfee)
- [memo](OriginNFTTransferRequestV3.md#memo)
- [payPayeeUpdateAccount](OriginNFTTransferRequestV3.md#paypayeeupdateaccount)
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

[defs/loopring_defs.ts:1813](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1813)

___

### counterFactualInfo

• `Optional` **counterFactualInfo**: [`CounterFactualInfo`](CounterFactualInfo.md)

CounterFactualInfo

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1820](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1820)

___

### ecdsaSignature

• `Optional` **ecdsaSignature**: `string`

ecdsa signature

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1795](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1795)

___

### eddsaSignature

• `Optional` **eddsaSignature**: `string`

eddsa signature

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1789](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1789)

___

### exchange

• **exchange**: `string`

exchange address

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1735](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1735)

___

### fromAccountId

• **fromAccountId**: `number`

fromAccountId

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1741](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1741)

___

### fromAddress

• **fromAddress**: `string`

payer account address

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1747](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1747)

___

### hashApproved

• `Optional` **hashApproved**: `string`

An approved hash string which was already submitted on eth mainnet

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1801](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1801)

___

### maxFee

• **maxFee**: `Pick`<[`TokenVolumeV3`](TokenVolumeV3.md), ``"tokenId"``\> & { `amount`: `string`  }

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1771](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1771)

___

### memo

• `Optional` **memo**: `string`

transfer memo

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1807](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1807)

___

### payPayeeUpdateAccount

• `Optional` **payPayeeUpdateAccount**: `boolean`

If true, let the sender transferring to the receiver pay the receiver's account activation fee

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1827](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1827)

___

### storageId

• **storageId**: `number`

offchain Id

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1777](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1777)

___

### toAccountId

• **toAccountId**: `number`

to account ID

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1753](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1753)

___

### toAddress

• **toAddress**: `string`

toAddress address

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1759](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1759)

___

### token

• **token**: [`TokenVolumeNFT`](TokenVolumeNFT.md)

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1765](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1765)

___

### validUntil

• **validUntil**: `number`

Timestamp for order to become invalid

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1783](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1783)
