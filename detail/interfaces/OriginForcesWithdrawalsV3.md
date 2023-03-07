[@loopring-web/loopring-sdk](../README.md) / [Exports](../modules.md) / OriginForcesWithdrawalsV3

# Interface: OriginForcesWithdrawalsV3

Submit Forces Withdrawals params

**`export`**

**`interface`** OriginForcesWithdrawalsV3

## Table of contents

### Properties

- [requesterAddress](OriginForcesWithdrawalsV3.md#requesteraddress)
- [tokenId](OriginForcesWithdrawalsV3.md#tokenid)
- [transfer](OriginForcesWithdrawalsV3.md#transfer)
- [withdrawAddress](OriginForcesWithdrawalsV3.md#withdrawaddress)

## Properties

### requesterAddress

• **requesterAddress**: `string`

requesterAddress account address

**`memberof`** OriginForcesWithdrawalsV3

#### Defined in

[defs/loopring_defs.ts:1621](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1621)

___

### tokenId

• **tokenId**: `number`

requester withdrawls tokenId

**`memberof`** OriginForcesWithdrawalsV3

#### Defined in

[defs/loopring_defs.ts:1627](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1627)

___

### transfer

• **transfer**: `Omit`<[`OriginTransferRequestV3`](OriginTransferRequestV3.md), ``"payeeId"`` \| ``"maxFee"`` \| ``"memo"``\> & { `maxFee?`: { `tokenId`: `string` \| `number` ; `volume`: ``"0"``  } ; `memo?`: `string` ; `payeeId?`: ``0``  }

Transfer Request

**`memberof`** OriginForcesWithdrawalsV3

#### Defined in

[defs/loopring_defs.ts:1639](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1639)

___

### withdrawAddress

• **withdrawAddress**: `string`

withdrawAddress account address

**`memberof`** OriginForcesWithdrawalsV3

#### Defined in

[defs/loopring_defs.ts:1633](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L1633)
