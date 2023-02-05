[@loopring-web/loopring-sdk](../README.md) / [Exports](../modules.md) / DualOrderRequest

# Interface: DualOrderRequest

DualOrderRequest

## Table of contents

### Properties

- [accountId](DualOrderRequest.md#accountid)
- [baseProfit](DualOrderRequest.md#baseprofit)
- [buyToken](DualOrderRequest.md#buytoken)
- [clientOrderId](DualOrderRequest.md#clientorderid)
- [eddsaSignature](DualOrderRequest.md#eddsasignature)
- [exchange](DualOrderRequest.md#exchange)
- [expireTime](DualOrderRequest.md#expiretime)
- [fee](DualOrderRequest.md#fee)
- [fillAmountBOrS](DualOrderRequest.md#fillamountbors)
- [maxFeeBips](DualOrderRequest.md#maxfeebips)
- [productId](DualOrderRequest.md#productid)
- [sellToken](DualOrderRequest.md#selltoken)
- [settleRatio](DualOrderRequest.md#settleratio)
- [storageId](DualOrderRequest.md#storageid)
- [validUntil](DualOrderRequest.md#validuntil)

## Properties

### accountId

• **accountId**: `number`

accountId

**`memberof`** DefiOrderRequest

#### Defined in

[defs/loopring_defs.ts:3458](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L3458)

___

### baseProfit

• **baseProfit**: `string`

#### Defined in

[defs/loopring_defs.ts:3508](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L3508)

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

[defs/loopring_defs.ts:3473](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L3473)

___

### clientOrderId

• **clientOrderId**: `string`

#### Defined in

[defs/loopring_defs.ts:3509](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L3509)

___

### eddsaSignature

• `Optional` **eddsaSignature**: `string`

The orders EdDSA signature. The signature is a hexadecimal string obtained by signing the order itself and concatenating the resulting signature parts (Rx, Ry, and S). Used to authenticate and authorize the operation.

**`memberof`** DefiOrderRequest

#### Defined in

[defs/loopring_defs.ts:3506](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L3506)

___

### exchange

• **exchange**: `string`

exchange address

**`memberof`** DefiOrderRequest

#### Defined in

[defs/loopring_defs.ts:3446](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L3446)

___

### expireTime

• **expireTime**: `number`

#### Defined in

[defs/loopring_defs.ts:3512](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L3512)

___

### fee

• **fee**: `string`

fee

**`memberof`** DefiOrderRequest

#### Defined in

[defs/loopring_defs.ts:3488](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L3488)

___

### fillAmountBOrS

• **fillAmountBOrS**: `boolean`

fillAmountBOrS

**`memberof`** DefiOrderRequest

#### Defined in

[defs/loopring_defs.ts:3500](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L3500)

___

### maxFeeBips

• **maxFeeBips**: `number`

Maximum order fee that the user can accept, value range (in ten thousandths) 1 ~ 63

**`memberof`** DefiOrderRequest

#### Defined in

[defs/loopring_defs.ts:3494](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L3494)

___

### productId

• **productId**: `string`

#### Defined in

[defs/loopring_defs.ts:3510](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L3510)

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

[defs/loopring_defs.ts:3464](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L3464)

___

### settleRatio

• **settleRatio**: `string`

#### Defined in

[defs/loopring_defs.ts:3511](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L3511)

___

### storageId

• **storageId**: `number`

storageId

**`memberof`** DefiOrderRequest

#### Defined in

[defs/loopring_defs.ts:3452](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L3452)

___

### validUntil

• **validUntil**: `number`

Timestamp for order become invalid

**`memberof`** DefiOrderRequest

#### Defined in

[defs/loopring_defs.ts:3482](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L3482)
