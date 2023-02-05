[@loopring-web/loopring-sdk](../README.md) / [Exports](../modules.md) / OrderDetail

# Interface: OrderDetail

## Table of contents

### Properties

- [clientOrderId](OrderDetail.md#clientorderid)
- [hash](OrderDetail.md#hash)
- [market](OrderDetail.md#market)
- [orderType](OrderDetail.md#ordertype)
- [price](OrderDetail.md#price)
- [side](OrderDetail.md#side)
- [status](OrderDetail.md#status)
- [tradeChannel](OrderDetail.md#tradechannel)
- [validity](OrderDetail.md#validity)
- [volumes](OrderDetail.md#volumes)

## Properties

### clientOrderId

• **clientOrderId**: `string`

#### Defined in

[defs/loopring_defs.ts:897](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L897)

___

### hash

• **hash**: `string`

#### Defined in

[defs/loopring_defs.ts:896](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L896)

___

### market

• **market**: `string`

#### Defined in

[defs/loopring_defs.ts:899](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L899)

___

### orderType

• **orderType**: [`OrderTypeResp`](../enums/OrderTypeResp.md)

#### Defined in

[defs/loopring_defs.ts:909](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L909)

___

### price

• **price**: `string`

#### Defined in

[defs/loopring_defs.ts:900](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L900)

___

### side

• **side**: [`Side`](../enums/Side.md)

#### Defined in

[defs/loopring_defs.ts:898](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L898)

___

### status

• **status**: [`OrderStatus`](../enums/OrderStatus.md)

#### Defined in

[defs/loopring_defs.ts:911](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L911)

___

### tradeChannel

• **tradeChannel**: [`TradeChannel`](../enums/TradeChannel.md)

#### Defined in

[defs/loopring_defs.ts:910](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L910)

___

### validity

• **validity**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `end` | `number` |
| `start` | `number` |

#### Defined in

[defs/loopring_defs.ts:908](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L908)

___

### volumes

• **volumes**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `baseAmount` | `string` |
| `baseFilled` | `string` |
| `fee` | `string` |
| `quoteAmount` | `string` |
| `quoteFilled` | `string` |

#### Defined in

[defs/loopring_defs.ts:901](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/defs/loopring_defs.ts#L901)
