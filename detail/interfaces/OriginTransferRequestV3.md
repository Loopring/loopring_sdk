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

[defs/loopring_defs.ts:1593](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1593)

___

### counterFactualInfo

• `Optional` **counterFactualInfo**: [`CounterFactualInfo`](CounterFactualInfo.md)

CounterFactualInfo

**`memberof`** OriginTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1600](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1600)

___

### ecdsaSignature

• `Optional` **ecdsaSignature**: `string`

ecdsa signature

**`memberof`** OriginTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1575](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1575)

___

### eddsaSignature

• `Optional` **eddsaSignature**: `string`

eddsa signature

**`memberof`** OriginTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1569](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1569)

___

### exchange

• **exchange**: `string`

exchange address

**`memberof`** OriginTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1515](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1515)

___

### hashApproved

• `Optional` **hashApproved**: `string`

An approved hash string which was already submitted on eth mainnet

**`memberof`** OriginTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1581](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1581)

___

### maxFee

• **maxFee**: [`TokenVolumeV3`](TokenVolumeV3.md)

**`memberof`** OriginTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1551](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1551)

___

### memo

• `Optional` **memo**: `string`

transfer memo

**`memberof`** OriginTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1587](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1587)

___

### payPayeeUpdateAccount

• `Optional` **payPayeeUpdateAccount**: `boolean`

If true, let the sender transferring to the receiver pay the receiver's account activation fee

**`memberof`** OriginTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1607](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1607)

___

### payeeAddr

• **payeeAddr**: `string`

payee account address

**`memberof`** OriginTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1539](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1539)

___

### payeeId

• **payeeId**: `number`

payee account ID

**`memberof`** OriginTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1533](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1533)

___

### payerAddr

• **payerAddr**: `string`

payer account address

**`memberof`** OriginTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1527](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1527)

___

### payerId

• **payerId**: `number`

payer account ID

**`memberof`** OriginTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1521](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1521)

___

### storageId

• **storageId**: `number`

offchain Id

**`memberof`** OriginTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1557](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1557)

___

### token

• **token**: [`TokenVolumeV3`](TokenVolumeV3.md)

**`memberof`** OriginTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1545](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1545)

___

### validUntil

• **validUntil**: `number`

Timestamp for order to become invalid

**`memberof`** OriginTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:1563](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1563)
