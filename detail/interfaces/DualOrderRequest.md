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

[defs/loopring_defs.ts:3466](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L3466)

___

### baseProfit

• **baseProfit**: `string`

#### Defined in

[defs/loopring_defs.ts:3516](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L3516)

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

[defs/loopring_defs.ts:3481](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L3481)

___

### clientOrderId

• **clientOrderId**: `string`

#### Defined in

[defs/loopring_defs.ts:3517](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L3517)

___

### eddsaSignature

• `Optional` **eddsaSignature**: `string`

The orders EdDSA signature. The signature is a hexadecimal string obtained by signing the order itself and concatenating the resulting signature parts (Rx, Ry, and S). Used to authenticate and authorize the operation.

**`memberof`** DefiOrderRequest

#### Defined in

[defs/loopring_defs.ts:3514](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L3514)

___

### exchange

• **exchange**: `string`

exchange address

**`memberof`** DefiOrderRequest

#### Defined in

[defs/loopring_defs.ts:3454](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L3454)

___

### expireTime

• **expireTime**: `number`

#### Defined in

[defs/loopring_defs.ts:3520](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L3520)

___

### fee

• **fee**: `string`

fee

**`memberof`** DefiOrderRequest

#### Defined in

[defs/loopring_defs.ts:3496](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L3496)

___

### fillAmountBOrS

• **fillAmountBOrS**: `boolean`

fillAmountBOrS

**`memberof`** DefiOrderRequest

#### Defined in

[defs/loopring_defs.ts:3508](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L3508)

___

### maxFeeBips

• **maxFeeBips**: `number`

Maximum order fee that the user can accept, value range (in ten thousandths) 1 ~ 63

**`memberof`** DefiOrderRequest

#### Defined in

[defs/loopring_defs.ts:3502](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L3502)

___

### productId

• **productId**: `string`

#### Defined in

[defs/loopring_defs.ts:3518](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L3518)

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

[defs/loopring_defs.ts:3472](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L3472)

___

### settleRatio

• **settleRatio**: `string`

#### Defined in

[defs/loopring_defs.ts:3519](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L3519)

___

### storageId

• **storageId**: `number`

storageId

**`memberof`** DefiOrderRequest

#### Defined in

[defs/loopring_defs.ts:3460](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L3460)

___

### validUntil

• **validUntil**: `number`

Timestamp for order become invalid

**`memberof`** DefiOrderRequest

#### Defined in

[defs/loopring_defs.ts:3490](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L3490)
