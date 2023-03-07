[@loopring-web/loopring-sdk](../README.md) / [Exports](../modules.md) / OffChainWithdrawalRequestV3

# Interface: OffChainWithdrawalRequestV3

**`export`**

**`interface`** OffChainWithdrawalRequestV3

## Table of contents

### Properties

- [accountId](OffChainWithdrawalRequestV3.md#accountid)
- [counterFactualInfo](OffChainWithdrawalRequestV3.md#counterfactualinfo)
- [ecdsaSignature](OffChainWithdrawalRequestV3.md#ecdsasignature)
- [eddsaSignature](OffChainWithdrawalRequestV3.md#eddsasignature)
- [exchange](OffChainWithdrawalRequestV3.md#exchange)
- [extraData](OffChainWithdrawalRequestV3.md#extradata)
- [fastWithdrawalMode](OffChainWithdrawalRequestV3.md#fastwithdrawalmode)
- [hashApproved](OffChainWithdrawalRequestV3.md#hashapproved)
- [maxFee](OffChainWithdrawalRequestV3.md#maxfee)
- [minGas](OffChainWithdrawalRequestV3.md#mingas)
- [owner](OffChainWithdrawalRequestV3.md#owner)
- [storageId](OffChainWithdrawalRequestV3.md#storageid)
- [to](OffChainWithdrawalRequestV3.md#to)
- [token](OffChainWithdrawalRequestV3.md#token)
- [validUntil](OffChainWithdrawalRequestV3.md#validuntil)

## Properties

### accountId

• **accountId**: `number`

account ID

**`memberof`** OffChainWithdrawalRequestV3

#### Defined in

[defs/loopring_defs.ts:961](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L961)

___

### counterFactualInfo

• `Optional` **counterFactualInfo**: [`CounterFactualInfo`](CounterFactualInfo.md)

#### Defined in

[defs/loopring_defs.ts:1038](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1038)

___

### ecdsaSignature

• `Optional` **ecdsaSignature**: `string`

ecdsa signature

**`memberof`** OffChainWithdrawalRequestV3

#### Defined in

[defs/loopring_defs.ts:1031](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1031)

___

### eddsaSignature

• `Optional` **eddsaSignature**: `string`

eddsa signature

**`memberof`** OffChainWithdrawalRequestV3

#### Defined in

[defs/loopring_defs.ts:1025](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1025)

___

### exchange

• **exchange**: `string`

exchange address

**`memberof`** OffChainWithdrawalRequestV3

#### Defined in

[defs/loopring_defs.ts:955](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L955)

___

### extraData

• `Optional` **extraData**: `string`

extra data for complex withdraw mode, normally none

**`memberof`** OffChainWithdrawalRequestV3

#### Defined in

[defs/loopring_defs.ts:1013](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1013)

___

### fastWithdrawalMode

• `Optional` **fastWithdrawalMode**: `boolean`

is fast withdraw mode

**`memberof`** OffChainWithdrawalRequestV3

#### Defined in

[defs/loopring_defs.ts:1019](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1019)

___

### hashApproved

• `Optional` **hashApproved**: `string`

An approved hash string which was already submitted on eth mainnet

**`memberof`** OffChainWithdrawalRequestV3

#### Defined in

[defs/loopring_defs.ts:1037](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1037)

___

### maxFee

• **maxFee**: [`TokenVolumeV3`](TokenVolumeV3.md)

**`memberof`** OffChainWithdrawalRequestV3

#### Defined in

[defs/loopring_defs.ts:979](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L979)

___

### minGas

• **minGas**: `number`

min gas for on-chain withdraw, Loopring exchange allocates gas for each distribution,
but people can also assign this min gas,
so Loopring has to allocate higher gas value for this specific distribution.
Normally no need to take care of this value,
0 means let loopring choose the reasonable gas

**`memberof`** OffChainWithdrawalRequestV3

#### Defined in

[defs/loopring_defs.ts:1001](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1001)

___

### owner

• **owner**: `string`

account owner address

**`memberof`** OffChainWithdrawalRequestV3

#### Defined in

[defs/loopring_defs.ts:967](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L967)

___

### storageId

• **storageId**: `number`

offchain ID

**`memberof`** OffChainWithdrawalRequestV3

#### Defined in

[defs/loopring_defs.ts:985](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L985)

___

### to

• **to**: `string`

withdraw to address

**`memberof`** OffChainWithdrawalRequestV3

#### Defined in

[defs/loopring_defs.ts:1007](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1007)

___

### token

• **token**: [`TokenVolumeV3`](TokenVolumeV3.md)

**`memberof`** OffChainWithdrawalRequestV3

#### Defined in

[defs/loopring_defs.ts:973](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L973)

___

### validUntil

• **validUntil**: `number`

Timestamp for order to become invalid

**`memberof`** OffChainWithdrawalRequestV3

#### Defined in

[defs/loopring_defs.ts:991](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L991)
