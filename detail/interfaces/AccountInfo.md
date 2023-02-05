[@loopring-web/loopring-sdk](../README.md) / [Exports](../modules.md) / AccountInfo

# Interface: AccountInfo

AccountInfo

**`property`** accountId number Account ID

**`property`** owner string  Ethereum address

**`property`** frozen boolean The frozen state of the account, true stands for frozen, if the account is frozen, the user cant submit order.

**`property`** publicKey PublicKey The user's public key

**`property`** tags? string Comma separated list of tags such as VIP levels, etc

**`property`** nonce number field.DexAccountV3.nonce

**`property`** keyNonce number Nonce of users key change request, for backward compatible

**`property`** keySeed string KeySeed of users L2 eddsaKey, the L2 key should be generated from this seed, i.e., L2_EDDSA_KEY=eth.sign(keySeed). Otherwise, user may meet error in login loopring DEX

## Table of contents

### Properties

- [accountId](AccountInfo.md#accountid)
- [frozen](AccountInfo.md#frozen)
- [keyNonce](AccountInfo.md#keynonce)
- [keySeed](AccountInfo.md#keyseed)
- [nonce](AccountInfo.md#nonce)
- [owner](AccountInfo.md#owner)
- [publicKey](AccountInfo.md#publickey)
- [tags](AccountInfo.md#tags)

## Properties

### accountId

• **accountId**: `number`

#### Defined in

[defs/account_defs.ts:15](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/defs/account_defs.ts#L15)

___

### frozen

• **frozen**: `boolean`

#### Defined in

[defs/account_defs.ts:17](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/defs/account_defs.ts#L17)

___

### keyNonce

• **keyNonce**: `number`

#### Defined in

[defs/account_defs.ts:21](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/defs/account_defs.ts#L21)

___

### keySeed

• **keySeed**: `string`

#### Defined in

[defs/account_defs.ts:22](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/defs/account_defs.ts#L22)

___

### nonce

• **nonce**: `number`

#### Defined in

[defs/account_defs.ts:20](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/defs/account_defs.ts#L20)

___

### owner

• **owner**: `string`

#### Defined in

[defs/account_defs.ts:16](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/defs/account_defs.ts#L16)

___

### publicKey

• **publicKey**: [`PublicKey`](PublicKey.md)

#### Defined in

[defs/account_defs.ts:18](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/defs/account_defs.ts#L18)

___

### tags

• `Optional` **tags**: `string`

#### Defined in

[defs/account_defs.ts:19](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/defs/account_defs.ts#L19)
