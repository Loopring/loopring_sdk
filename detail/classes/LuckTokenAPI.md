[@loopring-web/loopring-sdk](../README.md) / [Exports](../modules.md) / LuckTokenAPI

# Class: LuckTokenAPI

## Hierarchy

- [`BaseAPI`](BaseAPI.md)

  ↳ **`LuckTokenAPI`**

## Table of contents

### Constructors

- [constructor](LuckTokenAPI.md#constructor)

### Properties

- [baseUrl](LuckTokenAPI.md#baseurl)
- [chainId](LuckTokenAPI.md#chainid)
- [KEY\_MESSAGE](LuckTokenAPI.md#key_message)

### Methods

- [genErr](LuckTokenAPI.md#generr)
- [getAvailableBroker](LuckTokenAPI.md#getavailablebroker)
- [getCounterFactualInfo](LuckTokenAPI.md#getcounterfactualinfo)
- [getLuckTokenAgents](LuckTokenAPI.md#getlucktokenagents)
- [getLuckTokenAuthorizedSigners](LuckTokenAPI.md#getlucktokenauthorizedsigners)
- [getLuckTokenBalances](LuckTokenAPI.md#getlucktokenbalances)
- [getLuckTokenClaimHistory](LuckTokenAPI.md#getlucktokenclaimhistory)
- [getLuckTokenClaimedLuckyTokens](LuckTokenAPI.md#getlucktokenclaimedluckytokens)
- [getLuckTokenDetail](LuckTokenAPI.md#getlucktokendetail)
- [getLuckTokenLuckyTokens](LuckTokenAPI.md#getlucktokenluckytokens)
- [getLuckTokenSummary](LuckTokenAPI.md#getlucktokensummary)
- [getLuckTokenWithdrawals](LuckTokenAPI.md#getlucktokenwithdrawals)
- [makeReq](LuckTokenAPI.md#makereq)
- [returnTxHash](LuckTokenAPI.md#returntxhash)
- [sendLuckTokenClaimLuckyToken](LuckTokenAPI.md#sendlucktokenclaimluckytoken)
- [sendLuckTokenSend](LuckTokenAPI.md#sendlucktokensend)
- [sendLuckTokenWithdraws](LuckTokenAPI.md#sendlucktokenwithdraws)
- [setBaseUrl](LuckTokenAPI.md#setbaseurl)
- [setChainId](LuckTokenAPI.md#setchainid)

## Constructors

### constructor

• **new LuckTokenAPI**(`param`, `timeout?`, `baseUrlMap?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `param` | [`InitParam`](../interfaces/InitParam.md) | `undefined` |
| `timeout` | `number` | `6000` |
| `baseUrlMap` | `Object` | `undefined` |
| `baseUrlMap.1` | `string` | `"https://api3.loopring.io"` |
| `baseUrlMap.5` | `string` | `"https://uat2.loopring.io"` |

#### Inherited from

[BaseAPI](BaseAPI.md).[constructor](BaseAPI.md#constructor)

#### Defined in

[api/base_api.ts:104](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/base_api.ts#L104)

## Properties

### baseUrl

• `Protected` **baseUrl**: `string` = `""`

#### Inherited from

[BaseAPI](BaseAPI.md).[baseUrl](BaseAPI.md#baseurl)

#### Defined in

[api/base_api.ts:39](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/base_api.ts#L39)

___

### chainId

• `Protected` **chainId**: [`ChainId`](../enums/ChainId.md) = `ChainId.MAINNET`

#### Inherited from

[BaseAPI](BaseAPI.md).[chainId](BaseAPI.md#chainid)

#### Defined in

[api/base_api.ts:40](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/base_api.ts#L40)

___

### KEY\_MESSAGE

▪ `Static` **KEY\_MESSAGE**: `string` = `KEY_MESSAGE`

#### Inherited from

[BaseAPI](BaseAPI.md).[KEY_MESSAGE](BaseAPI.md#key_message)

#### Defined in

[api/base_api.ts:38](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/base_api.ts#L38)

## Methods

### genErr

▸ **genErr**(`err`): [`RESULT_INFO`](../interfaces/RESULT_INFO.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` \| `AxiosResponse`<`any`\> & `Error` |

#### Returns

[`RESULT_INFO`](../interfaces/RESULT_INFO.md)

#### Inherited from

[BaseAPI](BaseAPI.md).[genErr](BaseAPI.md#generr)

#### Defined in

[api/base_api.ts:41](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/base_api.ts#L41)

___

### getAvailableBroker

▸ **getAvailableBroker**(`request`): `Promise`<{ `broker`: `string`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetAvailableBrokerRequest`](../interfaces/GetAvailableBrokerRequest.md) |

#### Returns

`Promise`<{ `broker`: `string`  }\>

#### Inherited from

[BaseAPI](BaseAPI.md).[getAvailableBroker](BaseAPI.md#getavailablebroker)

#### Defined in

[api/base_api.ts:123](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/base_api.ts#L123)

___

### getCounterFactualInfo

▸ **getCounterFactualInfo**<`T`\>(`request`): `Promise`<{ `counterFactualInfo`: `undefined` \| [`CounterFactualInfo`](../interfaces/CounterFactualInfo.md) ; `error?`: [`RESULT_INFO`](../interfaces/RESULT_INFO.md) ; `raw_data`: `T`  }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetCounterFactualInfoRequest`](../interfaces/GetCounterFactualInfoRequest.md) |

#### Returns

`Promise`<{ `counterFactualInfo`: `undefined` \| [`CounterFactualInfo`](../interfaces/CounterFactualInfo.md) ; `error?`: [`RESULT_INFO`](../interfaces/RESULT_INFO.md) ; `raw_data`: `T`  }\>

#### Inherited from

[BaseAPI](BaseAPI.md).[getCounterFactualInfo](BaseAPI.md#getcounterfactualinfo)

#### Defined in

[api/base_api.ts:136](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/base_api.ts#L136)

___

### getLuckTokenAgents

▸ **getLuckTokenAgents**<`R`\>(): `Promise`<{ `luckTokenAgents`: { `[key: string]`: [`LuckyTokenInfo`](../modules.md#luckytokeninfo);  } ; `raw_data`: `R`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Returns

`Promise`<{ `luckTokenAgents`: { `[key: string]`: [`LuckyTokenInfo`](../modules.md#luckytokeninfo);  } ; `raw_data`: `R`  }\>

#### Defined in

[api/luckToken_api.ts:21](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/luckToken_api.ts#L21)

___

### getLuckTokenAuthorizedSigners

▸ **getLuckTokenAuthorizedSigners**<`R`\>(): `Promise`<{ `luckTokenAgents`: { `[key: string]`: [`LuckyTokenInfo`](../modules.md#luckytokeninfo);  } ; `raw_data`: `R`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Returns

`Promise`<{ `luckTokenAgents`: { `[key: string]`: [`LuckyTokenInfo`](../modules.md#luckytokeninfo);  } ; `raw_data`: `R`  }\>

#### Defined in

[api/luckToken_api.ts:58](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/luckToken_api.ts#L58)

___

### getLuckTokenBalances

▸ **getLuckTokenBalances**<`R`\>(`request`, `apiKey`): `Promise`<{ `raw_data`: `R` ; `tokenBalance`: [`UserBalanceInfo`](../interfaces/UserBalanceInfo.md) & { `isNft?`: `boolean` ; `nftTokenInfo?`: [`NFTTokenInfo`](../interfaces/NFTTokenInfo.md)  }[] ; `totalNum`: `number`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | `Object` |
| `request.accountId` | `number` |
| `request.isNft?` | `boolean` |
| `request.limit?` | `number` |
| `request.offset?` | `number` |
| `request.tokens?` | `number`[] |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `R` ; `tokenBalance`: [`UserBalanceInfo`](../interfaces/UserBalanceInfo.md) & { `isNft?`: `boolean` ; `nftTokenInfo?`: [`NFTTokenInfo`](../interfaces/NFTTokenInfo.md)  }[] ; `totalNum`: `number`  }\>

#### Defined in

[api/luckToken_api.ts:236](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/luckToken_api.ts#L236)

___

### getLuckTokenClaimHistory

▸ **getLuckTokenClaimHistory**<`R`\>(`request`, `apiKey`): `Promise`<{ `list`: [`LuckTokenHistory`](../modules.md#lucktokenhistory)[] ; `raw_data`: `R` ; `totalNum`: `number`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | `Object` |
| `request.fromId` | `number` |
| `request.isNft?` | `boolean` |
| `request.limit?` | `number` |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `list`: [`LuckTokenHistory`](../modules.md#lucktokenhistory)[] ; `raw_data`: `R` ; `totalNum`: `number`  }\>

#### Defined in

[api/luckToken_api.ts:94](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/luckToken_api.ts#L94)

___

### getLuckTokenClaimedLuckyTokens

▸ **getLuckTokenClaimedLuckyTokens**<`R`\>(`request`, `apiKey`): `Promise`<{ `claimedHistory`: [`LuckyTokenItemForReceive`](../modules.md#luckytokenitemforreceive) & { `id`: `number`  }[] ; `raw_data`: `R` ; `totalNum`: `number`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | `Object` |
| `request.fromId` | `number` |
| `request.hashes?` | `string`[] |
| `request.isNft?` | `boolean` |
| `request.limit?` | `number` |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `claimedHistory`: [`LuckyTokenItemForReceive`](../modules.md#luckytokenitemforreceive) & { `id`: `number`  }[] ; `raw_data`: `R` ; `totalNum`: `number`  }\>

#### Defined in

[api/luckToken_api.ts:275](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/luckToken_api.ts#L275)

___

### getLuckTokenDetail

▸ **getLuckTokenDetail**<`R`\>(`request`, `apiKey`): `Promise`<{ `detail`: [`LuckTokenClaimDetail`](../modules.md#lucktokenclaimdetail) ; `raw_data`: `R`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | `Object` |
| `request.accountId?` | `number` |
| `request.fromId?` | `number` |
| `request.hash` | `string` |
| `request.limit?` | `number` |
| `request.showHelper` | `boolean` |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `detail`: [`LuckTokenClaimDetail`](../modules.md#lucktokenclaimdetail) ; `raw_data`: `R`  }\>

#### Defined in

[api/luckToken_api.ts:169](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/luckToken_api.ts#L169)

___

### getLuckTokenLuckyTokens

▸ **getLuckTokenLuckyTokens**<`R`\>(`request`, `apiKey`): `Promise`<{ `list`: [`LuckyTokenItemForReceive`](../modules.md#luckytokenitemforreceive)[] ; `raw_data`: `R` ; `totalNum`: `number`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | `Object` |
| `request.endTime` | `number` |
| `request.fromId` | `number` |
| `request.hash` | `string` |
| `request.isNft?` | `boolean` |
| `request.limit?` | `number` |
| `request.modes` | `string` |
| `request.official` | `boolean` |
| `request.partitions` | `string` |
| `request.scopes` | `string` |
| `request.senderId` | `number` |
| `request.startTime` | `number` |
| `request.statuses` | `string` |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `list`: [`LuckyTokenItemForReceive`](../modules.md#luckytokenitemforreceive)[] ; `raw_data`: `R` ; `totalNum`: `number`  }\>

#### Defined in

[api/luckToken_api.ts:125](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/luckToken_api.ts#L125)

___

### getLuckTokenSummary

▸ **getLuckTokenSummary**<`R`\>(`apiKey`): `Promise`<{ `raw_data`: `R` ; `tokenSummaryList`: { `amount`: `string` ; `isNft?`: `Boolean` ; `nftTokenInfo?`: [`NFTTokenInfo`](../interfaces/NFTTokenInfo.md) ; `tokenId`: `number`  }[] ; `totalNum`: `number`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `R` ; `tokenSummaryList`: { `amount`: `string` ; `isNft?`: `Boolean` ; `nftTokenInfo?`: [`NFTTokenInfo`](../interfaces/NFTTokenInfo.md) ; `tokenId`: `number`  }[] ; `totalNum`: `number`  }\>

#### Defined in

[api/luckToken_api.ts:311](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/luckToken_api.ts#L311)

___

### getLuckTokenWithdrawals

▸ **getLuckTokenWithdrawals**<`R`\>(`request`, `apiKey`): `Promise`<{ `luckTokenWithdraw`: [`LuckTokenWithdraw`](../modules.md#lucktokenwithdraw)[] ; `raw_data`: `R` ; `totalNum`: `number`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | `Object` |
| `request.endTime?` | `number` |
| `request.fromId?` | `number` |
| `request.isNft?` | `boolean` |
| `request.limit?` | `number` |
| `request.offset?` | `number` |
| `request.startTime?` | `number` |
| `request.statuses` | [`LuckyTokenWithdrawStatus`](../enums/LuckyTokenWithdrawStatus.md)[] |
| `request.tokenId?` | `number` |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `luckTokenWithdraw`: [`LuckTokenWithdraw`](../modules.md#lucktokenwithdraw)[] ; `raw_data`: `R` ; `totalNum`: `number`  }\>

#### Defined in

[api/luckToken_api.ts:199](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/luckToken_api.ts#L199)

___

### makeReq

▸ `Protected` **makeReq**(): `Request`

#### Returns

`Request`

#### Inherited from

[BaseAPI](BaseAPI.md).[makeReq](BaseAPI.md#makereq)

#### Defined in

[api/base_api.ts:182](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/base_api.ts#L182)

___

### returnTxHash

▸ `Protected` **returnTxHash**<`T`\>(`raw_data`): [`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| `Omit`<`T`, ``"resultInfo"``\> & { `raw_data`: `Omit`<`T`, ``"resultInfo"``\>  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`TX_HASH_API`](../modules.md#tx_hash_api) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `raw_data` | `T` |

#### Returns

[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| `Omit`<`T`, ``"resultInfo"``\> & { `raw_data`: `Omit`<`T`, ``"resultInfo"``\>  }

#### Inherited from

[BaseAPI](BaseAPI.md).[returnTxHash](BaseAPI.md#returntxhash)

#### Defined in

[api/base_api.ts:82](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/base_api.ts#L82)

___

### sendLuckTokenClaimLuckyToken

▸ **sendLuckTokenClaimLuckyToken**<`R`\>(`__namedParameters`): `Promise`<{ `raw_data`: `R`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.apiKey` | `string` |
| `__namedParameters.eddsaKey` | `string` |
| `__namedParameters.request` | `Object` |
| `__namedParameters.request.claimer` | `string` |
| `__namedParameters.request.hash` | `string` |
| `__namedParameters.request.referrer` | `string` |

#### Returns

`Promise`<{ `raw_data`: `R`  }\>

#### Defined in

[api/luckToken_api.ts:341](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/luckToken_api.ts#L341)

___

### sendLuckTokenSend

▸ **sendLuckTokenSend**<`R`\>(`req`, `options?`): `Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| [`TX_HASH_RESULT`](../modules.md#tx_hash_result)<`R`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | { `accountId`: `number` ; `hash`: `string` ; `isIdempotent`: `boolean` ; `status`: `string` ; `storageId`: `number` ; `tokenId`: `number`  } |

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | [`OriginLuckTokenSendRequestV3WithPatch`](../interfaces/OriginLuckTokenSendRequestV3WithPatch.md) |
| `options?` | `Object` |
| `options.accountId?` | `number` |
| `options.counterFactualInfo?` | `any` |

#### Returns

`Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| [`TX_HASH_RESULT`](../modules.md#tx_hash_result)<`R`\>\>

#### Defined in

[api/luckToken_api.ts:613](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/luckToken_api.ts#L613)

___

### sendLuckTokenWithdraws

▸ **sendLuckTokenWithdraws**<`T`\>(`req`, `options?`): `Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| [`TX_HASH_RESULT`](../modules.md#tx_hash_result)<`T`\>\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | [`OriginLuckTokenWithdrawsRequestV3WithPatch`](../interfaces/OriginLuckTokenWithdrawsRequestV3WithPatch.md) |
| `options?` | `Object` |
| `options.accountId?` | `number` |
| `options.counterFactualInfo?` | `any` |

#### Returns

`Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| [`TX_HASH_RESULT`](../modules.md#tx_hash_result)<`T`\>\>

#### Defined in

[api/luckToken_api.ts:378](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/luckToken_api.ts#L378)

___

### setBaseUrl

▸ **setBaseUrl**(`baseUrl`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `baseUrl` | `string` |

#### Returns

`void`

#### Inherited from

[BaseAPI](BaseAPI.md).[setBaseUrl](BaseAPI.md#setbaseurl)

#### Defined in

[api/base_api.ts:178](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/base_api.ts#L178)

___

### setChainId

▸ **setChainId**(`chainId`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | [`ChainId`](../enums/ChainId.md) |

#### Returns

`void`

#### Inherited from

[BaseAPI](BaseAPI.md).[setChainId](BaseAPI.md#setchainid)

#### Defined in

[api/base_api.ts:170](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/base_api.ts#L170)
