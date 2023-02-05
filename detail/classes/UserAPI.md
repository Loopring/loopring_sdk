[@loopring-web/loopring-sdk](../README.md) / [Exports](../modules.md) / UserAPI

# Class: UserAPI

## Hierarchy

- [`BaseAPI`](BaseAPI.md)

  ↳ **`UserAPI`**

## Table of contents

### Constructors

- [constructor](UserAPI.md#constructor)

### Properties

- [baseUrl](UserAPI.md#baseurl)
- [chainId](UserAPI.md#chainid)
- [KEY\_MESSAGE](UserAPI.md#key_message)

### Methods

- [SetReferrer](UserAPI.md#setreferrer)
- [cancelMultiOrdersByCreditOrderId](UserAPI.md#cancelmultiordersbycreditorderid)
- [cancelMultiOrdersByHash](UserAPI.md#cancelmultiordersbyhash)
- [cancelOrder](UserAPI.md#cancelorder)
- [deleteNFTCollection](UserAPI.md#deletenftcollection)
- [genErr](UserAPI.md#generr)
- [getAssetLookRecords](UserAPI.md#getassetlookrecords)
- [getAvailableBroker](UserAPI.md#getavailablebroker)
- [getCounterFactualInfo](UserAPI.md#getcounterfactualinfo)
- [getMinimumTokenAmt](UserAPI.md#getminimumtokenamt)
- [getNFTOffchainFeeAmt](UserAPI.md#getnftoffchainfeeamt)
- [getNextStorageId](UserAPI.md#getnextstorageid)
- [getOffchainFeeAmt](UserAPI.md#getoffchainfeeamt)
- [getOrderDetails](UserAPI.md#getorderdetails)
- [getOrders](UserAPI.md#getorders)
- [getUserApiKey](UserAPI.md#getuserapikey)
- [getUserBalances](UserAPI.md#getuserbalances)
- [getUserDepositHistory](UserAPI.md#getuserdeposithistory)
- [getUserFeeRate](UserAPI.md#getuserfeerate)
- [getUserLegacyCollection](UserAPI.md#getuserlegacycollection)
- [getUserNFTBalances](UserAPI.md#getusernftbalances)
- [getUserNFTBalancesByCollection](UserAPI.md#getusernftbalancesbycollection)
- [getUserNFTCollection](UserAPI.md#getusernftcollection)
- [getUserNFTDepositHistory](UserAPI.md#getusernftdeposithistory)
- [getUserNFTLegacyBalance](UserAPI.md#getusernftlegacybalance)
- [getUserNFTLegacyTokenAddress](UserAPI.md#getusernftlegacytokenaddress)
- [getUserNFTMintHistory](UserAPI.md#getusernftminthistory)
- [getUserNFTTradeHistory](UserAPI.md#getusernfttradehistory)
- [getUserNFTTransactionHistory](UserAPI.md#getusernfttransactionhistory)
- [getUserNFTTransferHistory](UserAPI.md#getusernfttransferhistory)
- [getUserNFTWithdrawalHistory](UserAPI.md#getusernftwithdrawalhistory)
- [getUserOnchainWithdrawalHistory](UserAPI.md#getuseronchainwithdrawalhistory)
- [getUserOrderFeeRate](UserAPI.md#getuserorderfeerate)
- [getUserOwenCollection](UserAPI.md#getuserowencollection)
- [getUserPwdResetTxs](UserAPI.md#getuserpwdresettxs)
- [getUserRegTxs](UserAPI.md#getuserregtxs)
- [getUserTrades](UserAPI.md#getusertrades)
- [getUserTransferList](UserAPI.md#getusertransferlist)
- [getUserTxs](UserAPI.md#getusertxs)
- [getUserVIPAssets](UserAPI.md#getuservipassets)
- [getUserVIPInfo](UserAPI.md#getuservipinfo)
- [makeReq](UserAPI.md#makereq)
- [returnTxHash](UserAPI.md#returntxhash)
- [setBaseUrl](UserAPI.md#setbaseurl)
- [setChainId](UserAPI.md#setchainid)
- [submitDeployCollection](UserAPI.md#submitdeploycollection)
- [submitDeployNFT](UserAPI.md#submitdeploynft)
- [submitEditNFTCollection](UserAPI.md#submiteditnftcollection)
- [submitForceWithdrawals](UserAPI.md#submitforcewithdrawals)
- [submitInternalTransfer](UserAPI.md#submitinternaltransfer)
- [submitNFTCollection](UserAPI.md#submitnftcollection)
- [submitNFTInTransfer](UserAPI.md#submitnftintransfer)
- [submitNFTLegacyCollection](UserAPI.md#submitnftlegacycollection)
- [submitNFTMint](UserAPI.md#submitnftmint)
- [submitNFTTrade](UserAPI.md#submitnfttrade)
- [submitNFTValidateOrder](UserAPI.md#submitnftvalidateorder)
- [submitNFTWithdraw](UserAPI.md#submitnftwithdraw)
- [submitOffchainWithdraw](UserAPI.md#submitoffchainwithdraw)
- [submitOrder](UserAPI.md#submitorder)
- [submitUpdateNFTGroup](UserAPI.md#submitupdatenftgroup)
- [submitUpdateNFTLegacyCollection](UserAPI.md#submitupdatenftlegacycollection)
- [unLockAccount](UserAPI.md#unlockaccount)
- [updateAccount](UserAPI.md#updateaccount)
- [updateUserApiKey](UserAPI.md#updateuserapikey)

## Constructors

### constructor

• **new UserAPI**(`param`, `timeout?`, `baseUrlMap?`)

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

### SetReferrer

▸ **SetReferrer**<`R`\>(`request`, `eddsaKey`): `Promise`<{ `raw_data`: `R` ; `result`: `any`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`SetReferrerRequest`](../interfaces/SetReferrerRequest.md) |
| `eddsaKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `R` ; `result`: `any`  }\>

#### Defined in

[api/user_api.ts:1280](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L1280)

___

### cancelMultiOrdersByCreditOrderId

▸ **cancelMultiOrdersByCreditOrderId**<`R`\>(`request`, `PrivateKey`, `apiKey`): `Promise`<{ `raw_data`: `R`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`CancelMultiOrdersByClientOrderIdRequest`](../interfaces/CancelMultiOrdersByClientOrderIdRequest.md) |
| `PrivateKey` | `string` |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `R`  }\>

#### Defined in

[api/user_api.ts:282](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L282)

___

### cancelMultiOrdersByHash

▸ **cancelMultiOrdersByHash**<`R`\>(`request`, `PrivateKey`, `apiKey`): `Promise`<{ `raw_data`: `R`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`CancelMultiOrdersByHashRequest`](../interfaces/CancelMultiOrdersByHashRequest.md) |
| `PrivateKey` | `string` |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `R`  }\>

#### Defined in

[api/user_api.ts:248](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L248)

___

### cancelOrder

▸ **cancelOrder**<`R`\>(`request`, `PrivateKey`, `apiKey`): `Promise`<{ `raw_data`: `R`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`CancelOrderRequest`](../interfaces/CancelOrderRequest.md) |
| `PrivateKey` | `string` |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `R`  }\>

#### Defined in

[api/user_api.ts:210](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L210)

___

### deleteNFTCollection

▸ **deleteNFTCollection**<`R`\>(`req`, `chainId`, `apiKey`, `eddsaKey`): `Promise`<{ `raw_data`: `R`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | [`CollectionDelete`](../modules.md#collectiondelete) |
| `chainId` | [`ChainId`](../enums/ChainId.md) |
| `apiKey` | `string` |
| `eddsaKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `R`  }\>

#### Defined in

[api/user_api.ts:2564](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L2564)

___

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

### getAssetLookRecords

▸ **getAssetLookRecords**<`R`\>(`request`, `apiKey`): `Promise`<{ `raw_data`: `R` ; `userBalances`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`UserBalanceInfo`](../interfaces/UserBalanceInfo.md)\>  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserBalancesRequest`](../interfaces/GetUserBalancesRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `R` ; `userBalances`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`UserBalanceInfo`](../interfaces/UserBalanceInfo.md)\>  }\>

#### Defined in

[api/user_api.ts:419](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L419)

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

### getMinimumTokenAmt

▸ **getMinimumTokenAmt**<`R`\>(`request`, `apiKey`): `Promise`<{ `amountMap`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`TokenAmount`](../interfaces/TokenAmount.md)\> ; `amounts`: [[`TokenAmount`](../interfaces/TokenAmount.md), [`TokenAmount`](../interfaces/TokenAmount.md)] ; `cacheOverdueAt`: `any` ; `gasPrice`: `number` ; `raw_data`: `R`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetMinimumTokenAmtRequest`](../interfaces/GetMinimumTokenAmtRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `amountMap`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`TokenAmount`](../interfaces/TokenAmount.md)\> ; `amounts`: [[`TokenAmount`](../interfaces/TokenAmount.md), [`TokenAmount`](../interfaces/TokenAmount.md)] ; `cacheOverdueAt`: `any` ; `gasPrice`: `number` ; `raw_data`: `R`  }\>

#### Defined in

[api/user_api.ts:720](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L720)

___

### getNFTOffchainFeeAmt

▸ **getNFTOffchainFeeAmt**<`R`\>(`request`, `apiKey`): `Promise`<{ `fees`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`OffchainFeeInfo`](../interfaces/OffchainFeeInfo.md)\> ; `raw_data`: `R`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetNFTOffchainFeeAmtRequest`](../modules.md#getnftoffchainfeeamtrequest) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `fees`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`OffchainFeeInfo`](../interfaces/OffchainFeeInfo.md)\> ; `raw_data`: `R`  }\>

#### Defined in

[api/user_api.ts:811](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L811)

___

### getNextStorageId

▸ **getNextStorageId**<`R`\>(`request`, `apiKey`): `Promise`<{ `offchainId`: `number` ; `orderId`: `number` ; `raw_data`: `R`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetNextStorageIdRequest`](../interfaces/GetNextStorageIdRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `offchainId`: `number` ; `orderId`: `number` ; `raw_data`: `R`  }\>

#### Defined in

[api/user_api.ts:74](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L74)

___

### getOffchainFeeAmt

▸ **getOffchainFeeAmt**<`R`\>(`request`, `apiKey`): `Promise`<{ `fees`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`OffchainFeeInfo`](../interfaces/OffchainFeeInfo.md)\> ; `gasPrice`: `number` ; `raw_data`: `R`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetOffchainFeeAmtRequest`](../modules.md#getoffchainfeeamtrequest) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `fees`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`OffchainFeeInfo`](../interfaces/OffchainFeeInfo.md)\> ; `gasPrice`: `number` ; `raw_data`: `R`  }\>

#### Defined in

[api/user_api.ts:769](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L769)

___

### getOrderDetails

▸ **getOrderDetails**<`R`\>(`request`, `apiKey`): `Promise`<{ `orderDetail`: [`OrderDetail`](../interfaces/OrderDetail.md) ; `raw_data`: `R`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetOrderDetailsRequest`](../interfaces/GetOrderDetailsRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `orderDetail`: [`OrderDetail`](../interfaces/OrderDetail.md) ; `raw_data`: `R`  }\>

#### Defined in

[api/user_api.ts:103](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L103)

___

### getOrders

▸ **getOrders**<`R`\>(`request`, `apiKey`): `Promise`<{ `orders`: [`OrderDetail`](../interfaces/OrderDetail.md)[] ; `raw_data`: `R` ; `totalNum`: `number`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetOrdersRequest`](../interfaces/GetOrdersRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `orders`: [`OrderDetail`](../interfaces/OrderDetail.md)[] ; `raw_data`: `R` ; `totalNum`: `number`  }\>

#### Defined in

[api/user_api.ts:128](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L128)

___

### getUserApiKey

▸ **getUserApiKey**<`R`\>(`request`, `eddsaKey`): `Promise`<{ `apiKey`: `string` ; `raw_data`: `R`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserApiKeyRequest`](../interfaces/GetUserApiKeyRequest.md) |
| `eddsaKey` | `string` |

#### Returns

`Promise`<{ `apiKey`: `string` ; `raw_data`: `R`  }\>

#### Defined in

[api/user_api.ts:2991](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L2991)

___

### getUserBalances

▸ **getUserBalances**<`R`\>(`request`, `apiKey`): `Promise`<{ `raw_data`: `R` ; `userBalances`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`UserBalanceInfo`](../interfaces/UserBalanceInfo.md)\>  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserBalancesRequest`](../interfaces/GetUserBalancesRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `R` ; `userBalances`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`UserBalanceInfo`](../interfaces/UserBalanceInfo.md)\>  }\>

#### Defined in

[api/user_api.ts:383](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L383)

___

### getUserDepositHistory

▸ **getUserDepositHistory**<`R`\>(`request`, `apiKey`): `Promise`<{ `raw_data`: `R` ; `totalNum`: `number` ; `userDepositHistory`: [`UserDepositHistoryTx`](../interfaces/UserDepositHistoryTx.md)[]  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserDepositHistoryRequest`](../interfaces/GetUserDepositHistoryRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `R` ; `totalNum`: `number` ; `userDepositHistory`: [`UserDepositHistoryTx`](../interfaces/UserDepositHistoryTx.md)[]  }\>

#### Defined in

[api/user_api.ts:458](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L458)

___

### getUserFeeRate

▸ **getUserFeeRate**<`R`\>(`request`, `apiKey`): `Promise`<{ `raw_data`: `R` ; `userFreeRateMap`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`UserFeeRateInfo`](../interfaces/UserFeeRateInfo.md)\>  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserFeeRateRequest`](../interfaces/GetUserFeeRateRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `R` ; `userFreeRateMap`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`UserFeeRateInfo`](../interfaces/UserFeeRateInfo.md)\>  }\>

#### Defined in

[api/user_api.ts:646](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L646)

___

### getUserLegacyCollection

▸ **getUserLegacyCollection**<`R`\>(`request`, `apiKey`): `Promise`<`any`\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserLegacyCollectionRequest`](../interfaces/GetUserLegacyCollectionRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[api/user_api.ts:945](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L945)

___

### getUserNFTBalances

▸ **getUserNFTBalances**<`R`\>(`request`, `apiKey`): `Promise`<{ `raw_data`: `R` ; `totalNum`: `number` ; `userNFTBalances`: [`UserNFTBalanceInfo`](../interfaces/UserNFTBalanceInfo.md)<[`NFT_IMAGE_SIZES`](../enums/NFT_IMAGE_SIZES.md)\>[]  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserNFTBalancesRequest`](../interfaces/GetUserNFTBalancesRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `R` ; `totalNum`: `number` ; `userNFTBalances`: [`UserNFTBalanceInfo`](../interfaces/UserNFTBalanceInfo.md)<[`NFT_IMAGE_SIZES`](../enums/NFT_IMAGE_SIZES.md)\>[]  }\>

#### Defined in

[api/user_api.ts:1317](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L1317)

___

### getUserNFTBalancesByCollection

▸ **getUserNFTBalancesByCollection**<`R`\>(`request`, `apiKey`): `Promise`<{ `raw_data`: `R` ; `totalNum`: `number` ; `userNFTBalances`: [`UserNFTBalanceInfo`](../interfaces/UserNFTBalanceInfo.md)<[`NFT_IMAGE_SIZES`](../enums/NFT_IMAGE_SIZES.md)\>[]  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserNFTBalancesByCollectionRequest`](../interfaces/GetUserNFTBalancesByCollectionRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `R` ; `totalNum`: `number` ; `userNFTBalances`: [`UserNFTBalanceInfo`](../interfaces/UserNFTBalanceInfo.md)<[`NFT_IMAGE_SIZES`](../enums/NFT_IMAGE_SIZES.md)\>[]  }\>

#### Defined in

[api/user_api.ts:1377](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L1377)

___

### getUserNFTCollection

▸ **getUserNFTCollection**(`request`, `apiKey`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserNFTCollectionRequest`](../interfaces/GetUserNFTCollectionRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[api/user_api.ts:983](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L983)

___

### getUserNFTDepositHistory

▸ **getUserNFTDepositHistory**<`R`\>(`request`, `apiKey`): `Promise`<{ `raw_data`: `R` ; `totalNum`: `number` ; `userNFTDepositHistory`: [`UserNFTDepositHistoryTx`](../interfaces/UserNFTDepositHistoryTx.md)[]  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserNFTDepositHistoryRequest`](../modules.md#getusernftdeposithistoryrequest) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `R` ; `totalNum`: `number` ; `userNFTDepositHistory`: [`UserNFTDepositHistoryTx`](../interfaces/UserNFTDepositHistoryTx.md)[]  }\>

#### Defined in

[api/user_api.ts:1054](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L1054)

___

### getUserNFTLegacyBalance

▸ **getUserNFTLegacyBalance**<`R`\>(`request`, `apiKey`): `Promise`<{ `raw_data`: `R` ; `totalNum`: `number` ; `userNFTBalances`: [`UserNFTBalanceInfo`](../interfaces/UserNFTBalanceInfo.md)<[`NFT_IMAGE_SIZES`](../enums/NFT_IMAGE_SIZES.md)\>[]  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserNFTLegacyBalanceRequest`](../interfaces/GetUserNFTLegacyBalanceRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `R` ; `totalNum`: `number` ; `userNFTBalances`: [`UserNFTBalanceInfo`](../interfaces/UserNFTBalanceInfo.md)<[`NFT_IMAGE_SIZES`](../enums/NFT_IMAGE_SIZES.md)\>[]  }\>

#### Defined in

[api/user_api.ts:1437](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L1437)

___

### getUserNFTLegacyTokenAddress

▸ **getUserNFTLegacyTokenAddress**(`request`, `apiKey`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | `Object` |
| `request.accountId` | `number` |
| `apiKey` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[api/user_api.ts:1021](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L1021)

___

### getUserNFTMintHistory

▸ **getUserNFTMintHistory**<`R`\>(`request`, `apiKey`): `Promise`<{ `raw_data`: `R` ; `totalNum`: `number` ; `userNFTMints`: [`UserNFTMintHistoryTx`](../modules.md#usernftminthistorytx)[]  }\>

Get user NFTAction Mint list.

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserNFTMintHistoryRequest`](../modules.md#getusernftminthistoryrequest) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `R` ; `totalNum`: `number` ; `userNFTMints`: [`UserNFTMintHistoryTx`](../modules.md#usernftminthistorytx)[]  }\>

#### Defined in

[api/user_api.ts:1155](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L1155)

___

### getUserNFTTradeHistory

▸ **getUserNFTTradeHistory**<`R`\>(`request`, `apiKey`): `Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| { `raw_data`: `R` ; `totalNum`: `number` ; `trades`: [`UserNFTTradeHistory`](../interfaces/UserNFTTradeHistory.md)[]  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserNFTTradeRequest`](../interfaces/GetUserNFTTradeRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| { `raw_data`: `R` ; `totalNum`: `number` ; `trades`: [`UserNFTTradeHistory`](../interfaces/UserNFTTradeHistory.md)[]  }\>

#### Defined in

[api/user_api.ts:1246](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L1246)

___

### getUserNFTTransactionHistory

▸ **getUserNFTTransactionHistory**<`R`\>(`request`, `apiKey`): `Promise`<{ `raw_data`: `R` ; `totalNum`: `number` ; `userNFTTxs`: [`UserNFTTxsHistory`](../interfaces/UserNFTTxsHistory.md)[]  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserNFTTxsRequest`](../interfaces/GetUserNFTTxsRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `R` ; `totalNum`: `number` ; `userNFTTxs`: [`UserNFTTxsHistory`](../interfaces/UserNFTTxsHistory.md)[]  }\>

#### Defined in

[api/user_api.ts:1187](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L1187)

___

### getUserNFTTransferHistory

▸ **getUserNFTTransferHistory**<`R`\>(`request`, `apiKey`): `Promise`<{ `raw_data`: `R` ; `totalNum`: `number` ; `userNFTTransfers`: [`UserNFTTransferHistoryTx`](../interfaces/UserNFTTransferHistoryTx.md)[]  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserNFTTransferHistoryRequest`](../modules.md#getusernfttransferhistoryrequest) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `R` ; `totalNum`: `number` ; `userNFTTransfers`: [`UserNFTTransferHistoryTx`](../interfaces/UserNFTTransferHistoryTx.md)[]  }\>

#### Defined in

[api/user_api.ts:1120](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L1120)

___

### getUserNFTWithdrawalHistory

▸ **getUserNFTWithdrawalHistory**<`R`\>(`request`, `apiKey`): `Promise`<{ `raw_data`: `R` ; `totalNum`: `number` ; `userNFTWithdrawalHistory`: [`UserNFTWithdrawalHistoryTx`](../interfaces/UserNFTWithdrawalHistoryTx.md)[]  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserNFTWithdrawalHistoryRequest`](../modules.md#getusernftwithdrawalhistoryrequest) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `R` ; `totalNum`: `number` ; `userNFTWithdrawalHistory`: [`UserNFTWithdrawalHistoryTx`](../interfaces/UserNFTWithdrawalHistoryTx.md)[]  }\>

#### Defined in

[api/user_api.ts:1087](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L1087)

___

### getUserOnchainWithdrawalHistory

▸ **getUserOnchainWithdrawalHistory**<`R`\>(`request`, `apiKey`): `Promise`<{ `raw_data`: `R` ; `totalNum`: `number` ; `userOnchainWithdrawalHistory`: [`UserOnchainWithdrawalHistoryTx`](../interfaces/UserOnchainWithdrawalHistoryTx.md)[]  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserOnchainWithdrawalHistoryRequest`](../interfaces/GetUserOnchainWithdrawalHistoryRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `R` ; `totalNum`: `number` ; `userOnchainWithdrawalHistory`: [`UserOnchainWithdrawalHistoryTx`](../interfaces/UserOnchainWithdrawalHistoryTx.md)[]  }\>

#### Defined in

[api/user_api.ts:491](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L491)

___

### getUserOrderFeeRate

▸ **getUserOrderFeeRate**<`R`\>(`request`, `apiKey`): `Promise`<{ `feeRate`: [`FeeRateInfo`](../interfaces/FeeRateInfo.md) ; `gasPrice`: `number` ; `raw_data`: `R`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserOrderFeeRateRequest`](../interfaces/GetUserOrderFeeRateRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `feeRate`: [`FeeRateInfo`](../interfaces/FeeRateInfo.md) ; `gasPrice`: `number` ; `raw_data`: `R`  }\>

#### Defined in

[api/user_api.ts:686](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L686)

___

### getUserOwenCollection

▸ **getUserOwenCollection**<`R`\>(`request`, `apiKey`): `Promise`<`any`\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserOwnerCollectionRequest`](../interfaces/GetUserOwnerCollectionRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[api/user_api.ts:907](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L907)

___

### getUserPwdResetTxs

▸ **getUserPwdResetTxs**<`R`\>(`request`, `apiKey`): `Promise`<{ `raw_data`: `R` ; `totalNum`: `number` ; `userPwdResetTxs`: [`UserRegTx`](../interfaces/UserRegTx.md)[]  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserPwdResetTxsRequest`](../interfaces/GetUserPwdResetTxsRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `R` ; `totalNum`: `number` ; `userPwdResetTxs`: [`UserRegTx`](../interfaces/UserRegTx.md)[]  }\>

#### Defined in

[api/user_api.ts:349](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L349)

___

### getUserRegTxs

▸ **getUserRegTxs**<`R`\>(`request`, `apiKey`): `Promise`<{ `raw_data`: `R` ; `totalNum`: `number` ; `userRegTxs`: [`UserRegTx`](../interfaces/UserRegTx.md)[]  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserRegTxsRequest`](../interfaces/GetUserRegTxsRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `R` ; `totalNum`: `number` ; `userRegTxs`: [`UserRegTx`](../interfaces/UserRegTx.md)[]  }\>

#### Defined in

[api/user_api.ts:316](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L316)

___

### getUserTrades

▸ **getUserTrades**<`R`\>(`request`, `apiKey`): `Promise`<{ `raw_data`: `R` ; `totalNum`: `number` ; `userTrades`: [`MarketTradeInfo`](../interfaces/MarketTradeInfo.md)[]  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserTradesRequest`](../interfaces/GetUserTradesRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `R` ; `totalNum`: `number` ; `userTrades`: [`MarketTradeInfo`](../interfaces/MarketTradeInfo.md)[]  }\>

#### Defined in

[api/user_api.ts:597](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L597)

___

### getUserTransferList

▸ **getUserTransferList**<`R`\>(`request`, `apiKey`): `Promise`<{ `raw_data`: `R` ; `totalNum`: `number` ; `userTransfers`: [`UserTransferRecord`](../interfaces/UserTransferRecord.md)[]  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserTransferListRequest`](../interfaces/GetUserTransferListRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `R` ; `totalNum`: `number` ; `userTransfers`: [`UserTransferRecord`](../interfaces/UserTransferRecord.md)[]  }\>

#### Defined in

[api/user_api.ts:524](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L524)

___

### getUserTxs

▸ **getUserTxs**<`R`\>(`request`, `apiKey`): `Promise`<{ `raw_data`: `R` ; `totalNum`: `number` ; `userTxs`: [`UserTx`](../interfaces/UserTx.md)[]  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserTxsRequest`](../interfaces/GetUserTxsRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `R` ; `totalNum`: `number` ; `userTxs`: [`UserTx`](../interfaces/UserTx.md)[]  }\>

#### Defined in

[api/user_api.ts:557](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L557)

___

### getUserVIPAssets

▸ **getUserVIPAssets**<`R`\>(`request`): `Promise`<{ `raw_data`: { `data`: `R`  } ; `vipAsset`: `R`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`getUserVIPAssetsRequest`](../interfaces/getUserVIPAssetsRequest.md) |

#### Returns

`Promise`<{ `raw_data`: { `data`: `R`  } ; `vipAsset`: `R`  }\>

#### Defined in

[api/user_api.ts:1496](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L1496)

___

### getUserVIPInfo

▸ **getUserVIPInfo**<`R`\>(`request`, `apiKey`): `Promise`<{ `raw_data`: `R` ; `vipInfo`: { `createdAt`: `number` ; `org`: `any` ; `validTo`: `string` ; `vipTag`: `any`  }  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserVIPInfoRequest`](../interfaces/GetUserVIPInfoRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `R` ; `vipInfo`: { `createdAt`: `number` ; `org`: `any` ; `validTo`: `string` ; `vipTag`: `any`  }  }\>

#### Defined in

[api/user_api.ts:1518](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L1518)

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

___

### submitDeployCollection

▸ **submitDeployCollection**<`T`\>(`req`, `options?`): `Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| [`TX_HASH_RESULT`](../modules.md#tx_hash_result)<`T`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`TX_HASH_API`](../modules.md#tx_hash_api) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | [`OriginDeployCollectionRequestV3WithPatch`](../interfaces/OriginDeployCollectionRequestV3WithPatch.md) |
| `options?` | `Object` |
| `options.accountId?` | `number` |
| `options.counterFactualInfo?` | `any` |

#### Returns

`Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| [`TX_HASH_RESULT`](../modules.md#tx_hash_result)<`T`\>\>

#### Defined in

[api/user_api.ts:2753](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L2753)

___

### submitDeployNFT

▸ **submitDeployNFT**<`T`\>(`req`, `options?`): `Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| [`TX_HASH_RESULT`](../modules.md#tx_hash_result)<`T`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`TX_HASH_API`](../modules.md#tx_hash_api) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | [`OriginDeployNFTRequestV3WithPatch`](../interfaces/OriginDeployNFTRequestV3WithPatch.md) |
| `options?` | `Object` |
| `options.accountId?` | `number` |
| `options.counterFactualInfo?` | `any` |

#### Returns

`Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| [`TX_HASH_RESULT`](../modules.md#tx_hash_result)<`T`\>\>

#### Defined in

[api/user_api.ts:2005](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L2005)

___

### submitEditNFTCollection

▸ **submitEditNFTCollection**<`R`\>(`req`, `chainId`, `apiKey`, `eddsaKey`): `Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| { `contractAddress`: `string` ; `raw_data`: `R`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `Omit`<[`CollectionBasicMeta`](../modules.md#collectionbasicmeta), ``"owner"`` \| ``"nftFactory"``\> & { `accountId`: `number` ; `collectionId`: `string`  } |
| `chainId` | [`ChainId`](../enums/ChainId.md) |
| `apiKey` | `string` |
| `eddsaKey` | `string` |

#### Returns

`Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| { `contractAddress`: `string` ; `raw_data`: `R`  }\>

#### Defined in

[api/user_api.ts:2633](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L2633)

___

### submitForceWithdrawals

▸ **submitForceWithdrawals**<`T`\>(`req`, `options?`): `Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| [`TX_HASH_RESULT`](../modules.md#tx_hash_result)<`T`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`TX_HASH_API`](../modules.md#tx_hash_api) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | [`OriginForcesWithdrawalsRequestV3WithPatch`](../interfaces/OriginForcesWithdrawalsRequestV3WithPatch.md) |
| `options?` | `Object` |
| `options.accountId?` | `number` |
| `options.counterFactualInfo?` | `any` |

#### Returns

`Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| [`TX_HASH_RESULT`](../modules.md#tx_hash_result)<`T`\>\>

#### Defined in

[api/user_api.ts:1867](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L1867)

___

### submitInternalTransfer

▸ **submitInternalTransfer**<`T`\>(`req`, `options?`): `Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| `AxiosResponse`<`any`\> \| [`TX_HASH_RESULT`](../modules.md#tx_hash_result)<`T`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`TX_HASH_API`](../modules.md#tx_hash_api) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | [`OriginTransferRequestV3WithPatch`](../interfaces/OriginTransferRequestV3WithPatch.md) |
| `options?` | `Object` |
| `options.accountId?` | `number` |
| `options.counterFactualInfo?` | `any` |

#### Returns

`Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| `AxiosResponse`<`any`\> \| [`TX_HASH_RESULT`](../modules.md#tx_hash_result)<`T`\>\>

#### Defined in

[api/user_api.ts:1745](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L1745)

___

### submitNFTCollection

▸ **submitNFTCollection**<`R`\>(`req`, `chainId`, `apiKey`, `eddsaKey`): `Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| { `contractAddress`: `string` ; `raw_data`: `R`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | [`CollectionBasicMeta`](../modules.md#collectionbasicmeta) |
| `chainId` | [`ChainId`](../enums/ChainId.md) |
| `apiKey` | `string` |
| `eddsaKey` | `string` |

#### Returns

`Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| { `contractAddress`: `string` ; `raw_data`: `R`  }\>

#### Defined in

[api/user_api.ts:2524](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L2524)

___

### submitNFTInTransfer

▸ **submitNFTInTransfer**<`T`\>(`req`, `options?`): `Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| [`TX_HASH_RESULT`](../modules.md#tx_hash_result)<`T`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`TX_HASH_API`](../modules.md#tx_hash_api) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | [`OriginNFTTransferRequestV3WithPatch`](../interfaces/OriginNFTTransferRequestV3WithPatch.md) |
| `options?` | `Object` |
| `options.accountId?` | `number` |
| `options.counterFactualInfo?` | `any` |

#### Returns

`Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| [`TX_HASH_RESULT`](../modules.md#tx_hash_result)<`T`\>\>

#### Defined in

[api/user_api.ts:2141](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L2141)

___

### submitNFTLegacyCollection

▸ **submitNFTLegacyCollection**<`R`\>(`req`, `chainId`, `apiKey`, `eddsaKey`): `Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| { `raw_data`: `R` ; `result`: `boolean`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | [`CollectionLegacyMeta`](../modules.md#collectionlegacymeta) |
| `chainId` | [`ChainId`](../enums/ChainId.md) |
| `apiKey` | `string` |
| `eddsaKey` | `string` |

#### Returns

`Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| { `raw_data`: `R` ; `result`: `boolean`  }\>

#### Defined in

[api/user_api.ts:2593](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L2593)

___

### submitNFTMint

▸ **submitNFTMint**<`T`\>(`req`, `options?`): `Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| [`TX_HASH_RESULT`](../modules.md#tx_hash_result)<`T`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`TX_HASH_API`](../modules.md#tx_hash_api) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | [`OriginNFTMINTRequestV3WithPatch`](../interfaces/OriginNFTMINTRequestV3WithPatch.md) |
| `options?` | `Object` |
| `options._noEcdsa?` | `boolean` |
| `options.accountId?` | `number` |
| `options.counterFactualInfo?` | `any` |

#### Returns

`Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| [`TX_HASH_RESULT`](../modules.md#tx_hash_result)<`T`\>\>

#### Defined in

[api/user_api.ts:2387](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L2387)

___

### submitNFTTrade

▸ **submitNFTTrade**<`T`\>(`req`): `Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| [`TX_HASH_RESULT`](../modules.md#tx_hash_result)<`T`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`TX_HASH_API`](../modules.md#tx_hash_api) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | [`OriginNFTTradeRequestV3WithPatch`](../interfaces/OriginNFTTradeRequestV3WithPatch.md) |

#### Returns

`Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| [`TX_HASH_RESULT`](../modules.md#tx_hash_result)<`T`\>\>

#### Defined in

[api/user_api.ts:875](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L875)

___

### submitNFTValidateOrder

▸ **submitNFTValidateOrder**<`T`\>(`req`): `Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| [`TX_HASH_RESULT`](../modules.md#tx_hash_result)<`T`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`TX_HASH_API`](../modules.md#tx_hash_api) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | [`OriginNFTValidateOrderRequestV3WithPatch`](../interfaces/OriginNFTValidateOrderRequestV3WithPatch.md) |

#### Returns

`Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| [`TX_HASH_RESULT`](../modules.md#tx_hash_result)<`T`\>\>

#### Defined in

[api/user_api.ts:849](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L849)

___

### submitNFTWithdraw

▸ **submitNFTWithdraw**<`T`\>(`req`, `options?`): `Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| [`TX_HASH_RESULT`](../modules.md#tx_hash_result)<`T`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`TX_HASH_API`](../modules.md#tx_hash_api) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | [`OriginNFTWithdrawRequestV3WithPatch`](../interfaces/OriginNFTWithdrawRequestV3WithPatch.md) |
| `options?` | `Object` |
| `options.accountId?` | `number` |
| `options.counterFactualInfo?` | `any` |

#### Returns

`Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| [`TX_HASH_RESULT`](../modules.md#tx_hash_result)<`T`\>\>

#### Defined in

[api/user_api.ts:2263](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L2263)

___

### submitOffchainWithdraw

▸ **submitOffchainWithdraw**<`T`\>(`req`, `options?`): `Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| `AxiosResponse`<`any`\> \| [`TX_HASH_RESULT`](../modules.md#tx_hash_result)<`T`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`TX_HASH_API`](../modules.md#tx_hash_api) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | [`OffChainWithdrawalRequestV3WithPatch`](../interfaces/OffChainWithdrawalRequestV3WithPatch.md) |
| `options?` | `Object` |
| `options.accountId?` | `number` |
| `options.counterFactualInfo?` | `any` |

#### Returns

`Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| `AxiosResponse`<`any`\> \| [`TX_HASH_RESULT`](../modules.md#tx_hash_result)<`T`\>\>

#### Defined in

[api/user_api.ts:1625](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L1625)

___

### submitOrder

▸ **submitOrder**(`orderRequest`, `privateKey`, `apiKey`): `Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| `Omit`<`any`, ``"resultInfo"``\> & { `raw_data`: `Omit`<`any`, ``"resultInfo"``\>  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `orderRequest` | [`SubmitOrderRequestV3`](../interfaces/SubmitOrderRequestV3.md) |
| `privateKey` | `string` |
| `apiKey` | `string` |

#### Returns

`Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| `Omit`<`any`, ``"resultInfo"``\> & { `raw_data`: `Omit`<`any`, ``"resultInfo"``\>  }\>

#### Defined in

[api/user_api.ts:166](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L166)

___

### submitUpdateNFTGroup

▸ **submitUpdateNFTGroup**<`R`\>(`req`, `chainId`, `apiKey`, `eddsaKey`): `Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| { `raw_data`: `R` ; `result`: `boolean`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | [`UpdateNFTGroupRequest`](../modules.md#updatenftgrouprequest) |
| `chainId` | [`ChainId`](../enums/ChainId.md) |
| `apiKey` | `string` |
| `eddsaKey` | `string` |

#### Returns

`Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| { `raw_data`: `R` ; `result`: `boolean`  }\>

#### Defined in

[api/user_api.ts:2712](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L2712)

___

### submitUpdateNFTLegacyCollection

▸ **submitUpdateNFTLegacyCollection**<`R`\>(`req`, `chainId`, `apiKey`, `eddsaKey`): `Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| { `raw_data`: `R` ; `result`: `boolean`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | [`UpdateNFTLegacyCollectionRequest`](../modules.md#updatenftlegacycollectionrequest) |
| `chainId` | [`ChainId`](../enums/ChainId.md) |
| `apiKey` | `string` |
| `eddsaKey` | `string` |

#### Returns

`Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| { `raw_data`: `R` ; `result`: `boolean`  }\>

#### Defined in

[api/user_api.ts:2674](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L2674)

___

### unLockAccount

▸ **unLockAccount**<`R`\>(`__namedParameters`): `Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| `AxiosResponse`<`any`\> \| { `apiKey`: `string` ; `eddsaKey`: { `counterFactualInfo`: [`CounterFactualInfo`](../interfaces/CounterFactualInfo.md) ; `formatedPx`: `string` ; `formatedPy`: `string` ; `keyPair`: `object` ; `sk`: `string`  } ; `raw_data`: `R`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.keyPair` | [`KeyPairParams`](../interfaces/KeyPairParams.md) |
| `__namedParameters.request` | [`GetUserApiKeyRequest`](../interfaces/GetUserApiKeyRequest.md) |

#### Returns

`Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| `AxiosResponse`<`any`\> \| { `apiKey`: `string` ; `eddsaKey`: { `counterFactualInfo`: [`CounterFactualInfo`](../interfaces/CounterFactualInfo.md) ; `formatedPx`: `string` ; `formatedPy`: `string` ; `keyPair`: `object` ; `sk`: `string`  } ; `raw_data`: `R`  }\>

#### Defined in

[api/user_api.ts:1557](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L1557)

___

### updateAccount

▸ **updateAccount**<`T`\>(`req`, `options?`): `Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| [`TX_HASH_RESULT`](../modules.md#tx_hash_result)<`T`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`TX_HASH_API`](../modules.md#tx_hash_api) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | [`UpdateAccountRequestV3WithPatch`](../interfaces/UpdateAccountRequestV3WithPatch.md) |
| `options?` | `Object` |
| `options.accountId?` | `number` |
| `options.counterFactualInfo?` | `any` |

#### Returns

`Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| [`TX_HASH_RESULT`](../modules.md#tx_hash_result)<`T`\>\>

#### Defined in

[api/user_api.ts:2887](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L2887)

___

### updateUserApiKey

▸ **updateUserApiKey**<`R`\>(`request`, `apiKey`, `eddsaKey`): `Promise`<{ `raw_data`: `R`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`UpdateUserApiKeyRequest`](../interfaces/UpdateUserApiKeyRequest.md) |
| `apiKey` | `string` |
| `eddsaKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `R`  }\>

#### Defined in

[api/user_api.ts:36](https://github.com/Loopring/loopring_sdk/blob/6d0be7c/src/api/user_api.ts#L36)
