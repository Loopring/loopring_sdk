[@loopring-web/loopring-sdk](../README.md) / [Exports](../modules.md) / DefiOrderRequest

# Interface: DefiOrderRequest

DefiOrderRequest

## Table of contents

### Properties

- [accountId](DefiOrderRequest.md#accountid)
- [action](DefiOrderRequest.md#action)
- [buyToken](DefiOrderRequest.md#buytoken)
- [eddsaSignature](DefiOrderRequest.md#eddsasignature)
- [exchange](DefiOrderRequest.md#exchange)
- [fee](DefiOrderRequest.md#fee)
- [fillAmountBOrS](DefiOrderRequest.md#fillamountbors)
- [maxFeeBips](DefiOrderRequest.md#maxfeebips)
- [sellToken](DefiOrderRequest.md#selltoken)
- [storageId](DefiOrderRequest.md#storageid)
- [taker](DefiOrderRequest.md#taker)
- [type](DefiOrderRequest.md#type)
- [validUntil](DefiOrderRequest.md#validuntil)

## Properties

### accountId

• **accountId**: `number`

accountId

**`memberof`** DefiOrderRequest

#### Defined in

[defs/loopring_defs.ts:3075](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L3075)

___

### action

• **action**: `string`

action

**`memberof`** DefiOrderRequest

#### Defined in

[defs/loopring_defs.ts:3141](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L3141)

___

### buyToken

• **buyToken**: `Object`

buyToken

**`memberof`** DefiOrderRequest

#### Type declaration

| Name | Type |
| :------ | :------ |
| `tokenId` | `number` |
| `volume` | `string` |

#### Defined in

[defs/loopring_defs.ts:3090](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L3090)

___

### eddsaSignature

• `Optional` **eddsaSignature**: `string`

The orders EdDSA signature. The signature is a hexadecimal string obtained by signing the order itself and concatenating the resulting signature parts (Rx, Ry, and S). Used to authenticate and authorize the operation.

**`memberof`** DefiOrderRequest

#### Defined in

[defs/loopring_defs.ts:3129](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L3129)

___

### exchange

• **exchange**: `string`

exchange address

**`memberof`** DefiOrderRequest

#### Defined in

[defs/loopring_defs.ts:3063](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L3063)

___

### fee

• **fee**: `string`

fee

**`memberof`** DefiOrderRequest

#### Defined in

[defs/loopring_defs.ts:3105](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L3105)

___

### fillAmountBOrS

• **fillAmountBOrS**: `boolean`

fillAmountBOrS

**`memberof`** DefiOrderRequest

#### Defined in

[defs/loopring_defs.ts:3117](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L3117)

___

### maxFeeBips

• **maxFeeBips**: `number`

Maximum order fee that the user can accept, value range (in ten thousandths) 1 ~ 63

**`memberof`** DefiOrderRequest

#### Defined in

[defs/loopring_defs.ts:3111](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L3111)

___

### sellToken

• **sellToken**: `Object`

sellToken

**`memberof`** DefiOrderRequest

#### Type declaration

| Name | Type |
| :------ | :------ |
| `tokenId` | `number` |
| `volume` | `string` |

#### Defined in

[defs/loopring_defs.ts:3081](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L3081)

___

### storageId

• **storageId**: `number`

storageId

**`memberof`** DefiOrderRequest

#### Defined in

[defs/loopring_defs.ts:3069](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L3069)

___

### taker

• `Optional` **taker**: `string`

taker address

**`memberof`** DefiOrderRequest

#### Defined in

[defs/loopring_defs.ts:3123](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L3123)

___

### type

• **type**: `string`

type

**`memberof`** DefiOrderRequest

#### Defined in

[defs/loopring_defs.ts:3135](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L3135)

___

### validUntil

• **validUntil**: `number`

Timestamp for order become invalid

**`memberof`** DefiOrderRequest

#### Defined in

[defs/loopring_defs.ts:3099](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L3099)
