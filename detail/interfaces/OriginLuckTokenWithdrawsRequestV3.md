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

[defs/loopring_defs.ts:3727](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L3727)

___

### claimer

• **claimer**: `string`

#### Defined in

[defs/loopring_defs.ts:3728](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L3728)

___

### feeTokenId

• **feeTokenId**: `number`

#### Defined in

[defs/loopring_defs.ts:3726](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L3726)

___

### nftData

• `Optional` **nftData**: `string`

#### Defined in

[defs/loopring_defs.ts:3737](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L3737)

___

### tokenId

• **tokenId**: `number`

#### Defined in

[defs/loopring_defs.ts:3725](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L3725)

___

### transfer

• **transfer**: `Omit`<[`OriginTransferRequestV3`](OriginTransferRequestV3.md), ``"payeeId"`` \| ``"maxFee"`` \| ``"memo"``\> & { `maxFee?`: { `tokenId`: `string` \| `number` ; `volume`: ``"0"``  } ; `memo?`: `string` ; `payeeId?`: ``0``  }

#### Defined in

[defs/loopring_defs.ts:3729](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L3729)
