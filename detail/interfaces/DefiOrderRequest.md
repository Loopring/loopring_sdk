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

[defs/loopring_defs.ts:3067](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L3067)

___

### action

• **action**: `string`

action

**`memberof`** DefiOrderRequest

#### Defined in

[defs/loopring_defs.ts:3133](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L3133)

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

[defs/loopring_defs.ts:3082](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L3082)

___

### eddsaSignature

• `Optional` **eddsaSignature**: `string`

The orders EdDSA signature. The signature is a hexadecimal string obtained by signing the order itself and concatenating the resulting signature parts (Rx, Ry, and S). Used to authenticate and authorize the operation.

**`memberof`** DefiOrderRequest

#### Defined in

[defs/loopring_defs.ts:3121](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L3121)

___

### exchange

• **exchange**: `string`

exchange address

**`memberof`** DefiOrderRequest

#### Defined in

[defs/loopring_defs.ts:3055](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L3055)

___

### fee

• **fee**: `string`

fee

**`memberof`** DefiOrderRequest

#### Defined in

[defs/loopring_defs.ts:3097](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L3097)

___

### fillAmountBOrS

• **fillAmountBOrS**: `boolean`

fillAmountBOrS

**`memberof`** DefiOrderRequest

#### Defined in

[defs/loopring_defs.ts:3109](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L3109)

___

### maxFeeBips

• **maxFeeBips**: `number`

Maximum order fee that the user can accept, value range (in ten thousandths) 1 ~ 63

**`memberof`** DefiOrderRequest

#### Defined in

[defs/loopring_defs.ts:3103](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L3103)

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

[defs/loopring_defs.ts:3073](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L3073)

___

### storageId

• **storageId**: `number`

storageId

**`memberof`** DefiOrderRequest

#### Defined in

[defs/loopring_defs.ts:3061](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L3061)

___

### taker

• `Optional` **taker**: `string`

taker address

**`memberof`** DefiOrderRequest

#### Defined in

[defs/loopring_defs.ts:3115](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L3115)

___

### type

• **type**: `string`

type

**`memberof`** DefiOrderRequest

#### Defined in

[defs/loopring_defs.ts:3127](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L3127)

___

### validUntil

• **validUntil**: `number`

Timestamp for order become invalid

**`memberof`** DefiOrderRequest

#### Defined in

[defs/loopring_defs.ts:3091](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L3091)
