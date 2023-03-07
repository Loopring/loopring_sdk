[@loopring-web/loopring-sdk](../README.md) / [Exports](../modules.md) / ReqParams

# Interface: ReqParams

## Table of contents

### Properties

- [apiKey](ReqParams.md#apikey)
- [bodyParams](ReqParams.md#bodyparams)
- [ecdsaSignature](ReqParams.md#ecdsasignature)
- [eddsaSignature](ReqParams.md#eddsasignature)
- [method](ReqParams.md#method)
- [queryParams](ReqParams.md#queryparams)
- [sigFlag](ReqParams.md#sigflag)
- [sigObj](ReqParams.md#sigobj)
- [url](ReqParams.md#url)

## Properties

### apiKey

• `Optional` **apiKey**: `string`

#### Defined in

[defs/loopring_defs.ts:69](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L69)

___

### bodyParams

• `Optional` **bodyParams**: `any`

#### Defined in

[defs/loopring_defs.ts:67](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L67)

___

### ecdsaSignature

• `Optional` **ecdsaSignature**: `string`

#### Defined in

[defs/loopring_defs.ts:84](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L84)

___

### eddsaSignature

• `Optional` **eddsaSignature**: `string`

#### Defined in

[defs/loopring_defs.ts:83](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L83)

___

### method

• **method**: [`ReqMethod`](../enums/ReqMethod.md)

#### Defined in

[defs/loopring_defs.ts:63](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L63)

___

### queryParams

• `Optional` **queryParams**: `any`

#### Defined in

[defs/loopring_defs.ts:66](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L66)

___

### sigFlag

• **sigFlag**: [`SIG_FLAG`](../enums/SIG_FLAG.md)

#### Defined in

[defs/loopring_defs.ts:64](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L64)

___

### sigObj

• `Optional` **sigObj**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `PrivateKey?` | `string` |
| `dataToSig?` | `any` |
| `hasDataStruct?` | `boolean` |
| `owner?` | `string` |
| `pwd?` | `string` |
| `sig?` | `string` |
| `sigPatch?` | `string` |
| `web3?` | `any` |

#### Defined in

[defs/loopring_defs.ts:71](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L71)

___

### url

• **url**: `string`

#### Defined in

[defs/loopring_defs.ts:62](https://github.com/Loopring/loopring_sdk/blob/81e0b16/src/defs/loopring_defs.ts#L62)
