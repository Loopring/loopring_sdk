[@loopring-web/loopring-sdk](../README.md) / [Exports](../modules.md) / OriginLuckTokenWithdrawsRequestV3

# Interface: OriginLuckTokenWithdrawsRequestV3

## Table of contents

### Properties

- [amount](OriginLuckTokenWithdrawsRequestV3.md#amount)
- [claimer](OriginLuckTokenWithdrawsRequestV3.md#claimer)
- [feeTokenId](OriginLuckTokenWithdrawsRequestV3.md#feetokenid)
- [nftData](OriginLuckTokenWithdrawsRequestV3.md#nftdata)
- [tokenId](OriginLuckTokenWithdrawsRequestV3.md#tokenid)
- [transfer](OriginLuckTokenWithdrawsRequestV3.md#transfer)

## Properties

### amount

• **amount**: `string`

#### Defined in

[defs/loopring_defs.ts:3718](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/defs/loopring_defs.ts#L3718)

___

### claimer

• **claimer**: `string`

#### Defined in

[defs/loopring_defs.ts:3719](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/defs/loopring_defs.ts#L3719)

___

### feeTokenId

• **feeTokenId**: `number`

#### Defined in

[defs/loopring_defs.ts:3717](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/defs/loopring_defs.ts#L3717)

___

### nftData

• `Optional` **nftData**: `string`

#### Defined in

[defs/loopring_defs.ts:3728](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/defs/loopring_defs.ts#L3728)

___

### tokenId

• **tokenId**: `number`

#### Defined in

[defs/loopring_defs.ts:3716](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/defs/loopring_defs.ts#L3716)

___

### transfer

• **transfer**: `Omit`<[`OriginTransferRequestV3`](OriginTransferRequestV3.md), ``"payeeId"`` \| ``"maxFee"`` \| ``"memo"``\> & { `maxFee?`: { `tokenId`: `string` \| `number` ; `volume`: ``"0"``  } ; `memo?`: `string` ; `payeeId?`: ``0``  }

#### Defined in

[defs/loopring_defs.ts:3720](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/defs/loopring_defs.ts#L3720)
