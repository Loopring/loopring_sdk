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

[defs/loopring_defs.ts:68](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/defs/loopring_defs.ts#L68)

___

### bodyParams

• `Optional` **bodyParams**: `any`

#### Defined in

[defs/loopring_defs.ts:66](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/defs/loopring_defs.ts#L66)

___

### ecdsaSignature

• `Optional` **ecdsaSignature**: `string`

#### Defined in

[defs/loopring_defs.ts:83](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/defs/loopring_defs.ts#L83)

___

### eddsaSignature

• `Optional` **eddsaSignature**: `string`

#### Defined in

[defs/loopring_defs.ts:82](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/defs/loopring_defs.ts#L82)

___

### method

• **method**: [`ReqMethod`](../enums/ReqMethod.md)

#### Defined in

[defs/loopring_defs.ts:62](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/defs/loopring_defs.ts#L62)

___

### queryParams

• `Optional` **queryParams**: `any`

#### Defined in

[defs/loopring_defs.ts:65](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/defs/loopring_defs.ts#L65)

___

### sigFlag

• **sigFlag**: [`SIG_FLAG`](../enums/SIG_FLAG.md)

#### Defined in

[defs/loopring_defs.ts:63](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/defs/loopring_defs.ts#L63)

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

[defs/loopring_defs.ts:70](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/defs/loopring_defs.ts#L70)

___

### url

• **url**: `string`

#### Defined in

[defs/loopring_defs.ts:61](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/defs/loopring_defs.ts#L61)
