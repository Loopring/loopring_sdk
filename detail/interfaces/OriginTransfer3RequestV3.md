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

[defs/loopring_defs.ts:3829](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L3829)

___

### counterFactualInfo

• `Optional` **counterFactualInfo**: [`CounterFactualInfo`](CounterFactualInfo.md)

ecdsa signature

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:3866](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L3866)

___

### eddsaSig

• `Optional` **eddsaSig**: `string`

eddsa signature

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:3860](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L3860)

___

### exchange

• **exchange**: `string`

exchange address

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:3798](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L3798)

___

### feeToken

• **feeToken**: `string`

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:3835](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L3835)

___

### maxFeeAmount

• **maxFeeAmount**: `string`

#### Defined in

[defs/loopring_defs.ts:3836](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L3836)

___

### memo

• `Optional` **memo**: `string`

transfer memo

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:3854](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L3854)

___

### payeeAddr

• **payeeAddr**: `string`

payee account address

**`memberof`** OriginTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:3822](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L3822)

___

### payeeId

• **payeeId**: `number`

payee account ID

**`memberof`** OriginTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:3816](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L3816)

___

### payerAddr

• **payerAddr**: `string`

payer account address

**`memberof`** OriginTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:3810](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L3810)

___

### payerId

• **payerId**: `number`

payer account ID

**`memberof`** OriginTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:3804](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L3804)

___

### storageId

• **storageId**: `number`

offchain Id

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:3842](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L3842)

___

### token

• **token**: `string`

**`memberof`** OriginTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:3828](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L3828)

___

### validUntil

• **validUntil**: `number`

Timestamp for order to become invalid

**`memberof`** OriginNFTTransferRequestV3

#### Defined in

[defs/loopring_defs.ts:3848](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L3848)
