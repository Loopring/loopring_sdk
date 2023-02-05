[@loopring-web/loopring-sdk](../README.md) / [Exports](../modules.md) / OriginTransferRequestV3

# Interface: OriginTransferRequestV3

Submit internal transfer params

**`export`**

**`interface`** OriginTransferRequestV3

## Table of contents

### Properties

- [clientId](OriginTransferRequestV3.md#clientid)
- [counterFactualInfo](OriginTransferRequestV3.md#counterfactualinfo)
- [ecdsaSignature](OriginTransferRequestV3.md#ecdsasignature)
- [eddsaSignature](OriginTransferRequestV3.md#eddsasignature)
- [exchange](OriginTransferRequestV3.md#exchange)
- [hashApproved](OriginTransferRequestV3.md#hashapproved)
- [maxFee](OriginTransferRequestV3.md#maxfee)
- [memo](OriginTransferRequestV3.md#memo)
- [payPayeeUpdateAccount](OriginTransferRequestV3.md#paypayeeupdateaccount)
- [payeeAddr](OriginTransferRequestV3.md#payeeaddr)
- [payeeId](OriginTransferRequestV3.md#payeeid)
- [payerAddr](OriginTransferRequestV3.md#payeraddr)
- [payerId](OriginTransferRequestV3.md#payerid)
- [storageId](OriginTransferRequestV3.md#storageid)
- [token](OriginTransferRequestV3.md#token)
- [validUntil](OriginTransferRequestV3.md#validuntil)

## Properties

### clientId

• `Optional` **clientId**: `string`

A user-defined id

**`memberof`** OriginTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1582](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/defs/loopring_defs.ts#L1582)

___

### counterFactualInfo

• `Optional` **counterFactualInfo**: [`CounterFactualInfo`](CounterFactualInfo.md)

CounterFactualInfo

**`memberof`** OriginTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1589](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/defs/loopring_defs.ts#L1589)

___

### ecdsaSignature

• `Optional` **ecdsaSignature**: `string`

ecdsa signature

**`memberof`** OriginTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1564](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/defs/loopring_defs.ts#L1564)

___

### eddsaSignature

• `Optional` **eddsaSignature**: `string`

eddsa signature

**`memberof`** OriginTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1558](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/defs/loopring_defs.ts#L1558)

___

### exchange

• **exchange**: `string`

exchange address

**`memberof`** OriginTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1504](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/defs/loopring_defs.ts#L1504)

___

### hashApproved

• `Optional` **hashApproved**: `string`

An approved hash string which was already submitted on eth mainnet

**`memberof`** OriginTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1570](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/defs/loopring_defs.ts#L1570)

___

### maxFee

• **maxFee**: [`TokenVolumeV3`](TokenVolumeV3.md)

**`memberof`** OriginTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1540](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/defs/loopring_defs.ts#L1540)

___

### memo

• `Optional` **memo**: `string`

transfer memo

**`memberof`** OriginTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1576](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/defs/loopring_defs.ts#L1576)

___

### payPayeeUpdateAccount

• `Optional` **payPayeeUpdateAccount**: `boolean`

If true, let the sender transferring to the receiver pay the receiver's account activation fee

**`memberof`** OriginTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1596](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/defs/loopring_defs.ts#L1596)

___

### payeeAddr

• **payeeAddr**: `string`

payee account address

**`memberof`** OriginTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1528](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/defs/loopring_defs.ts#L1528)

___

### payeeId

• **payeeId**: `number`

payee account ID

**`memberof`** OriginTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1522](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/defs/loopring_defs.ts#L1522)

___

### payerAddr

• **payerAddr**: `string`

payer account address

**`memberof`** OriginTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1516](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/defs/loopring_defs.ts#L1516)

___

### payerId

• **payerId**: `number`

payer account ID

**`memberof`** OriginTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1510](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/defs/loopring_defs.ts#L1510)

___

### storageId

• **storageId**: `number`

offchain Id

**`memberof`** OriginTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1546](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/defs/loopring_defs.ts#L1546)

___

### token

• **token**: [`TokenVolumeV3`](TokenVolumeV3.md)

**`memberof`** OriginTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1534](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/defs/loopring_defs.ts#L1534)

___

### validUntil

• **validUntil**: `number`

Timestamp for order to become invalid

**`memberof`** OriginTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1552](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/defs/loopring_defs.ts#L1552)
