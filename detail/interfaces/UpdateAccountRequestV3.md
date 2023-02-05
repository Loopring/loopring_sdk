[@loopring-web/loopring-sdk](../README.md) / [Exports](../modules.md) / UpdateAccountRequestV3

# Interface: UpdateAccountRequestV3

## Table of contents

### Properties

- [accountId](UpdateAccountRequestV3.md#accountid)
- [counterFactualInfo](UpdateAccountRequestV3.md#counterfactualinfo)
- [ecdsaSignature](UpdateAccountRequestV3.md#ecdsasignature)
- [eddsaSignature](UpdateAccountRequestV3.md#eddsasignature)
- [exchange](UpdateAccountRequestV3.md#exchange)
- [hashApproved](UpdateAccountRequestV3.md#hashapproved)
- [keySeed](UpdateAccountRequestV3.md#keyseed)
- [maxFee](UpdateAccountRequestV3.md#maxfee)
- [nonce](UpdateAccountRequestV3.md#nonce)
- [owner](UpdateAccountRequestV3.md#owner)
- [publicKey](UpdateAccountRequestV3.md#publickey)
- [validUntil](UpdateAccountRequestV3.md#validuntil)

## Properties

### accountId

• **accountId**: `number`

user account ID

**`memberof`** UpdateAccountRequestV3

#### Defined in

[defs/loopring_defs.ts:2416](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L2416)

___

### counterFactualInfo

• `Optional` **counterFactualInfo**: [`CounterFactualInfo`](CounterFactualInfo.md)

#### Defined in

[defs/loopring_defs.ts:2461](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L2461)

___

### ecdsaSignature

• `Optional` **ecdsaSignature**: `string`

ecdsa signature of this request

**`memberof`** UpdateAccountRequestV3

#### Defined in

[defs/loopring_defs.ts:2452](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L2452)

___

### eddsaSignature

• `Optional` **eddsaSignature**: `string`

eddsa signature of this request

**`memberof`** UpdateAccountRequestV3

#### Defined in

[defs/loopring_defs.ts:2446](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L2446)

___

### exchange

• **exchange**: `string`

exchange address

**`memberof`** UpdateAccountRequestV3

#### Defined in

[defs/loopring_defs.ts:2404](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L2404)

___

### hashApproved

• `Optional` **hashApproved**: `string`

An approved hash string which was submitted on eth mainnet

**`memberof`** UpdateAccountRequestV3

#### Defined in

[defs/loopring_defs.ts:2458](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L2458)

___

### keySeed

• `Optional` **keySeed**: `string`

#### Defined in

[defs/loopring_defs.ts:2460](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L2460)

___

### maxFee

• **maxFee**: [`TokenVolumeV3`](TokenVolumeV3.md)

**`memberof`** UpdateAccountRequestV3

#### Defined in

[defs/loopring_defs.ts:2428](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L2428)

___

### nonce

• **nonce**: `number`

Nonce of users exchange account that used in off-chain requests.

**`memberof`** UpdateAccountRequestV3

#### Defined in

[defs/loopring_defs.ts:2440](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L2440)

___

### owner

• **owner**: `string`

owner address

**`memberof`** UpdateAccountRequestV3

#### Defined in

[defs/loopring_defs.ts:2410](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L2410)

___

### publicKey

• **publicKey**: [`PublicKey`](PublicKey.md)

**`memberof`** UpdateAccountRequestV3

#### Defined in

[defs/loopring_defs.ts:2422](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L2422)

___

### validUntil

• **validUntil**: `number`

Timestamp for order to become invalid

**`memberof`** UpdateAccountRequestV3

#### Defined in

[defs/loopring_defs.ts:2434](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L2434)
