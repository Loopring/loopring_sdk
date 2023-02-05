[@loopring-web/loopring-sdk](../README.md) / [Exports](../modules.md) / OriginTransfer3RequestV3

# Interface: OriginTransfer3RequestV3

## Table of contents

### Properties

- [amount](OriginTransfer3RequestV3.md#amount)
- [counterFactualInfo](OriginTransfer3RequestV3.md#counterfactualinfo)
- [eddsaSig](OriginTransfer3RequestV3.md#eddsasig)
- [exchange](OriginTransfer3RequestV3.md#exchange)
- [feeToken](OriginTransfer3RequestV3.md#feetoken)
- [maxFeeAmount](OriginTransfer3RequestV3.md#maxfeeamount)
- [memo](OriginTransfer3RequestV3.md#memo)
- [payeeAddr](OriginTransfer3RequestV3.md#payeeaddr)
- [payeeId](OriginTransfer3RequestV3.md#payeeid)
- [payerAddr](OriginTransfer3RequestV3.md#payeraddr)
- [payerId](OriginTransfer3RequestV3.md#payerid)
- [storageId](OriginTransfer3RequestV3.md#storageid)
- [token](OriginTransfer3RequestV3.md#token)
- [validUntil](OriginTransfer3RequestV3.md#validuntil)

## Properties

### amount

• **amount**: `string`

#### Defined in

[defs/loopring_defs.ts:3820](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/defs/loopring_defs.ts#L3820)

___

### counterFactualInfo

• `Optional` **counterFactualInfo**: [`CounterFactualInfo`](CounterFactualInfo.md)

ecdsa signature

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:3857](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/defs/loopring_defs.ts#L3857)

___

### eddsaSig

• `Optional` **eddsaSig**: `string`

eddsa signature

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:3851](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/defs/loopring_defs.ts#L3851)

___

### exchange

• **exchange**: `string`

exchange address

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:3789](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/defs/loopring_defs.ts#L3789)

___

### feeToken

• **feeToken**: `string`

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:3826](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/defs/loopring_defs.ts#L3826)

___

### maxFeeAmount

• **maxFeeAmount**: `string`

#### Defined in

[defs/loopring_defs.ts:3827](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/defs/loopring_defs.ts#L3827)

___

### memo

• `Optional` **memo**: `string`

transfer memo

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:3845](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/defs/loopring_defs.ts#L3845)

___

### payeeAddr

• **payeeAddr**: `string`

payee account address

**`memberof`** OriginTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:3813](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/defs/loopring_defs.ts#L3813)

___

### payeeId

• **payeeId**: `number`

payee account ID

**`memberof`** OriginTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:3807](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/defs/loopring_defs.ts#L3807)

___

### payerAddr

• **payerAddr**: `string`

payer account address

**`memberof`** OriginTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:3801](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/defs/loopring_defs.ts#L3801)

___

### payerId

• **payerId**: `number`

payer account ID

**`memberof`** OriginTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:3795](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/defs/loopring_defs.ts#L3795)

___

### storageId

• **storageId**: `number`

offchain Id

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:3833](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/defs/loopring_defs.ts#L3833)

___

### token

• **token**: `string`

**`memberof`** OriginTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:3819](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/defs/loopring_defs.ts#L3819)

___

### validUntil

• **validUntil**: `number`

Timestamp for order to become invalid

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:3839](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/defs/loopring_defs.ts#L3839)
