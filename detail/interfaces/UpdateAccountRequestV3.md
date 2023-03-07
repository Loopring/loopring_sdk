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

[defs/loopring_defs.ts:2427](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L2427)

___

### counterFactualInfo

• `Optional` **counterFactualInfo**: [`CounterFactualInfo`](CounterFactualInfo.md)

#### Defined in

[defs/loopring_defs.ts:2472](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L2472)

___

### ecdsaSignature

• `Optional` **ecdsaSignature**: `string`

ecdsa signature of this request

**`memberof`** UpdateAccountRequestV3

#### Defined in

[defs/loopring_defs.ts:2463](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L2463)

___

### eddsaSignature

• `Optional` **eddsaSignature**: `string`

eddsa signature of this request

**`memberof`** UpdateAccountRequestV3

#### Defined in

[defs/loopring_defs.ts:2457](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L2457)

___

### exchange

• **exchange**: `string`

exchange address

**`memberof`** UpdateAccountRequestV3

#### Defined in

[defs/loopring_defs.ts:2415](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L2415)

___

### hashApproved

• `Optional` **hashApproved**: `string`

An approved hash string which was submitted on eth mainnet

**`memberof`** UpdateAccountRequestV3

#### Defined in

[defs/loopring_defs.ts:2469](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L2469)

___

### keySeed

• `Optional` **keySeed**: `string`

#### Defined in

[defs/loopring_defs.ts:2471](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L2471)

___

### maxFee

• **maxFee**: [`TokenVolumeV3`](TokenVolumeV3.md)

**`memberof`** UpdateAccountRequestV3

#### Defined in

[defs/loopring_defs.ts:2439](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L2439)

___

### nonce

• **nonce**: `number`

Nonce of users exchange account that used in off-chain requests.

**`memberof`** UpdateAccountRequestV3

#### Defined in

[defs/loopring_defs.ts:2451](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L2451)

___

### owner

• **owner**: `string`

owner address

**`memberof`** UpdateAccountRequestV3

#### Defined in

[defs/loopring_defs.ts:2421](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L2421)

___

### publicKey

• **publicKey**: [`PublicKey`](PublicKey.md)

**`memberof`** UpdateAccountRequestV3

#### Defined in

[defs/loopring_defs.ts:2433](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L2433)

___

### validUntil

• **validUntil**: `number`

Timestamp for order to become invalid

**`memberof`** UpdateAccountRequestV3

#### Defined in

[defs/loopring_defs.ts:2445](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L2445)
