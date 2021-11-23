[@loopring-web/loopring-sdk](../README.md) / [Exports](../modules.md) / UpdateAccountRequestV3

# Interface: UpdateAccountRequestV3

## Table of contents

### Properties

- [accountId](UpdateAccountRequestV3.md#accountid)
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

[defs/loopring_defs.ts:1721](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/defs/loopring_defs.ts#L1721)

___

### ecdsaSignature

• `Optional` **ecdsaSignature**: `string`

ecdsa signature of this request

**`memberof`** UpdateAccountRequestV3

#### Defined in

[defs/loopring_defs.ts:1757](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/defs/loopring_defs.ts#L1757)

___

### eddsaSignature

• `Optional` **eddsaSignature**: `string`

eddsa signature of this request

**`memberof`** UpdateAccountRequestV3

#### Defined in

[defs/loopring_defs.ts:1751](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/defs/loopring_defs.ts#L1751)

___

### exchange

• **exchange**: `string`

exchange address

**`memberof`** UpdateAccountRequestV3

#### Defined in

[defs/loopring_defs.ts:1709](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/defs/loopring_defs.ts#L1709)

___

### hashApproved

• `Optional` **hashApproved**: `string`

An approved hash string which was submitted on eth mainnet

**`memberof`** UpdateAccountRequestV3

#### Defined in

[defs/loopring_defs.ts:1763](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/defs/loopring_defs.ts#L1763)

___

### keySeed

• `Optional` **keySeed**: `string`

#### Defined in

[defs/loopring_defs.ts:1765](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/defs/loopring_defs.ts#L1765)

___

### maxFee

• **maxFee**: [`TokenVolumeV3`](TokenVolumeV3.md)

**`memberof`** UpdateAccountRequestV3

#### Defined in

[defs/loopring_defs.ts:1733](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/defs/loopring_defs.ts#L1733)

___

### nonce

• **nonce**: `number`

Nonce of users exchange account that used in off-chain requests.

**`memberof`** UpdateAccountRequestV3

#### Defined in

[defs/loopring_defs.ts:1745](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/defs/loopring_defs.ts#L1745)

___

### owner

• **owner**: `string`

owner address

**`memberof`** UpdateAccountRequestV3

#### Defined in

[defs/loopring_defs.ts:1715](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/defs/loopring_defs.ts#L1715)

___

### publicKey

• **publicKey**: [`PublicKey`](PublicKey.md)

**`memberof`** UpdateAccountRequestV3

#### Defined in

[defs/loopring_defs.ts:1727](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/defs/loopring_defs.ts#L1727)

___

### validUntil

• **validUntil**: `number`

Timestamp for order to become invalid

**`memberof`** UpdateAccountRequestV3

#### Defined in

[defs/loopring_defs.ts:1739](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/defs/loopring_defs.ts#L1739)
