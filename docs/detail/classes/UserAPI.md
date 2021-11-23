[@loopring-web/loopring-sdk](../README.md) / [Exports](../modules.md) / UserAPI

# Class: UserAPI

## Hierarchy

- `BaseAPI`

  ↳ **`UserAPI`**

## Table of contents

### Constructors

- [constructor](UserAPI.md#constructor)

### Properties

- [baseUrl](UserAPI.md#baseurl)

### Methods

- [SetReferrer](UserAPI.md#setreferrer)
- [cancelMultiOrdersByCreditOrderId](UserAPI.md#cancelmultiordersbycreditorderid)
- [cancelMultiOrdersByHash](UserAPI.md#cancelmultiordersbyhash)
- [cancelOrder](UserAPI.md#cancelorder)
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
- [getUserNFTBalances](UserAPI.md#getusernftbalances)
- [getUserNFTDepositHistory](UserAPI.md#getusernftdeposithistory)
- [getUserNFTTranferHistory](UserAPI.md#getusernfttranferhistory)
- [getUserNFTWithdrawalHistory](UserAPI.md#getusernftwithdrawalhistory)
- [getUserOnchainWithdrawalHistory](UserAPI.md#getuseronchainwithdrawalhistory)
- [getUserOrderFeeRate](UserAPI.md#getuserorderfeerate)
- [getUserPwdResetTxs](UserAPI.md#getuserpwdresettxs)
- [getUserRegTxs](UserAPI.md#getuserregtxs)
- [getUserTrades](UserAPI.md#getusertrades)
- [getUserTranferList](UserAPI.md#getusertranferlist)
- [getUserTxs](UserAPI.md#getusertxs)
- [getUserVIPAssets](UserAPI.md#getuservipassets)
- [getUserVIPInfo](UserAPI.md#getuservipinfo)
- [makeReq](UserAPI.md#makereq)
- [returnTxHash](UserAPI.md#returntxhash)
- [setBaseUrl](UserAPI.md#setbaseurl)
- [setChainId](UserAPI.md#setchainid)
- [submitInternalTransfer](UserAPI.md#submitinternaltransfer)
- [submitNFTInTransfer](UserAPI.md#submitnftintransfer)
- [submitNFTMint](UserAPI.md#submitnftmint)
- [submitNFTWithdraw](UserAPI.md#submitnftwithdraw)
- [submitOffchainWithdraw](UserAPI.md#submitoffchainwithdraw)
- [submitOrder](UserAPI.md#submitorder)
- [updateAccount](UserAPI.md#updateaccount)
- [updateUserApiKey](UserAPI.md#updateuserapikey)

## Constructors

### constructor

• **new UserAPI**(`param`, `timeout?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `param` | `InitParam` | `undefined` |
| `timeout` | `number` | `DEFAULT_TIMEOUT` |

#### Inherited from

BaseAPI.constructor

#### Defined in

[api/base_api.ts:29](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/base_api.ts#L29)

## Properties

### baseUrl

• `Protected` **baseUrl**: `string` = `''`

#### Inherited from

BaseAPI.baseUrl

#### Defined in

[api/base_api.ts:26](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/base_api.ts#L26)

## Methods

### SetReferrer

▸ **SetReferrer**(`request`, `eddsaKey`): `Promise`<{ `raw_data`: `any` ; `result`: `any` = raw\_data.result }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`SetReferrerRequest`](../interfaces/SetReferrerRequest.md) |
| `eddsaKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `any` ; `result`: `any` = raw\_data.result }\>

#### Defined in

[api/user_api.ts:1242](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/user_api.ts#L1242)

___

### cancelMultiOrdersByCreditOrderId

▸ **cancelMultiOrdersByCreditOrderId**(`request`, `PrivateKey`, `apiKey`): `Promise`<{ `raw_data`: `any`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`CancelMultiOrdersByClientOrderIdRequest`](../interfaces/CancelMultiOrdersByClientOrderIdRequest.md) |
| `PrivateKey` | `string` |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `any`  }\>

#### Defined in

[api/user_api.ts:278](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/user_api.ts#L278)

___

### cancelMultiOrdersByHash

▸ **cancelMultiOrdersByHash**(`request`, `PrivateKey`, `apiKey`): `Promise`<{ `raw_data`: `any`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`CancelMultiOrdersByHashRequest`](../interfaces/CancelMultiOrdersByHashRequest.md) |
| `PrivateKey` | `string` |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `any`  }\>

#### Defined in

[api/user_api.ts:252](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/user_api.ts#L252)

___

### cancelOrder

▸ **cancelOrder**(`request`, `PrivateKey`, `apiKey`): `Promise`<{ `raw_data`: `any`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`CancelOrderRequest`](../interfaces/CancelOrderRequest.md) |
| `PrivateKey` | `string` |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `any`  }\>

#### Defined in

[api/user_api.ts:219](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/user_api.ts#L219)

___

### getMinimumTokenAmt

▸ **getMinimumTokenAmt**(`request`, `apiKey`): `Promise`<{ `amountMap`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`TokenAmount`](../interfaces/TokenAmount.md)\> ; `amounts`: [[`TokenAmount`](../interfaces/TokenAmount.md), [`TokenAmount`](../interfaces/TokenAmount.md)] ; `cacheOverdueAt`: `any` = raw\_data.cacheOverdueAt; `gasPrice`: `number` ; `raw_data`: `any`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetMinimumTokenAmtRequest`](../interfaces/GetMinimumTokenAmtRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `amountMap`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`TokenAmount`](../interfaces/TokenAmount.md)\> ; `amounts`: [[`TokenAmount`](../interfaces/TokenAmount.md), [`TokenAmount`](../interfaces/TokenAmount.md)] ; `cacheOverdueAt`: `any` = raw\_data.cacheOverdueAt; `gasPrice`: `number` ; `raw_data`: `any`  }\>

#### Defined in

[api/user_api.ts:582](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/user_api.ts#L582)

___

### getNFTOffchainFeeAmt

▸ **getNFTOffchainFeeAmt**(`request`, `apiKey`): `Promise`<{ `fees`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`OffchainFeeInfo`](../interfaces/OffchainFeeInfo.md)\> ; `raw_data`: `any`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetNFTOffchainFeeAmtRequest`](../interfaces/GetNFTOffchainFeeAmtRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `fees`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`OffchainFeeInfo`](../interfaces/OffchainFeeInfo.md)\> ; `raw_data`: `any`  }\>

#### Defined in

[api/user_api.ts:656](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/user_api.ts#L656)

___

### getNextStorageId

▸ **getNextStorageId**(`request`, `apiKey`): `Promise`<{ `offchainId`: `any` ; `orderId`: `any` ; `raw_data`: `any`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetNextStorageIdRequest`](../interfaces/GetNextStorageIdRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `offchainId`: `any` ; `orderId`: `any` ; `raw_data`: `any`  }\>

#### Defined in

[api/user_api.ts:111](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/user_api.ts#L111)

___

### getOffchainFeeAmt

▸ **getOffchainFeeAmt**(`request`, `apiKey`): `Promise`<{ `fees`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`OffchainFeeInfo`](../interfaces/OffchainFeeInfo.md)\> ; `gasPrice`: `number` ; `raw_data`: `any`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetOffchainFeeAmtRequest`](../interfaces/GetOffchainFeeAmtRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `fees`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`OffchainFeeInfo`](../interfaces/OffchainFeeInfo.md)\> ; `gasPrice`: `number` ; `raw_data`: `any`  }\>

#### Defined in

[api/user_api.ts:621](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/user_api.ts#L621)

___

### getOrderDetails

▸ **getOrderDetails**(`request`, `apiKey`): `Promise`<{ `orderDetail`: [`OrderDetail`](../interfaces/OrderDetail.md) = raw\_data; `raw_data`: [`OrderDetail`](../interfaces/OrderDetail.md)  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetOrderDetailsRequest`](../interfaces/GetOrderDetailsRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `orderDetail`: [`OrderDetail`](../interfaces/OrderDetail.md) = raw\_data; `raw_data`: [`OrderDetail`](../interfaces/OrderDetail.md)  }\>

#### Defined in

[api/user_api.ts:133](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/user_api.ts#L133)

___

### getOrders

▸ **getOrders**(`request`, `apiKey`): `Promise`<{ `orders`: [`OrderDetail`](../interfaces/OrderDetail.md)[] ; `raw_data`: `any` ; `totalNum`: `number`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetOrdersRequest`](../interfaces/GetOrdersRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `orders`: [`OrderDetail`](../interfaces/OrderDetail.md)[] ; `raw_data`: `any` ; `totalNum`: `number`  }\>

#### Defined in

[api/user_api.ts:152](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/user_api.ts#L152)

___

### getUserApiKey

▸ **getUserApiKey**(`request`, `eddsaKey`): `Promise`<{ `apiKey`: `any` ; `raw_data`: `any`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserApiKeyRequest`](../interfaces/GetUserApiKeyRequest.md) |
| `eddsaKey` | `string` |

#### Returns

`Promise`<{ `apiKey`: `any` ; `raw_data`: `any`  }\>

#### Defined in

[api/user_api.ts:43](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/user_api.ts#L43)

___

### getUserBalances

▸ **getUserBalances**(`request`, `apiKey`): `Promise`<{ `raw_data`: `any` ; `userBalances`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`UserBalanceInfo`](../interfaces/UserBalanceInfo.md)\>  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserBalancesRequest`](../interfaces/GetUserBalancesRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `any` ; `userBalances`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`UserBalanceInfo`](../interfaces/UserBalanceInfo.md)\>  }\>

#### Defined in

[api/user_api.ts:354](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/user_api.ts#L354)

___

### getUserDepositHistory

▸ **getUserDepositHistory**(`request`, `apiKey`): `Promise`<{ `raw_data`: `any` ; `totalNum`: `any` = raw\_data.totalNum; `userDepositHistory`: [`UserDepositHistoryTx`](../interfaces/UserDepositHistoryTx.md)[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserDepositHistoryRequest`](../interfaces/GetUserDepositHistoryRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `any` ; `totalNum`: `any` = raw\_data.totalNum; `userDepositHistory`: [`UserDepositHistoryTx`](../interfaces/UserDepositHistoryTx.md)[]  }\>

#### Defined in

[api/user_api.ts:386](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/user_api.ts#L386)

___

### getUserFeeRate

▸ **getUserFeeRate**(`request`, `apiKey`): `Promise`<{ `raw_data`: `any` ; `userFreeRateMap`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`UserFeeRateInfo`](../interfaces/UserFeeRateInfo.md)\>  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserFeeRateRequest`](../interfaces/GetUserFeeRateRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `any` ; `userFreeRateMap`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`UserFeeRateInfo`](../interfaces/UserFeeRateInfo.md)\>  }\>

#### Defined in

[api/user_api.ts:525](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/user_api.ts#L525)

___

### getUserNFTBalances

▸ **getUserNFTBalances**(`request`, `apiKey`): `Promise`<{ `raw_data`: `any` ; `totalNum`: `any` = raw\_data.totalNum; `userNFTBalances`: [`UserNFTBalanceInfo`](../interfaces/UserNFTBalanceInfo.md)[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserNFTBalancesRequest`](../interfaces/GetUserNFTBalancesRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `any` ; `totalNum`: `any` = raw\_data.totalNum; `userNFTBalances`: [`UserNFTBalanceInfo`](../interfaces/UserNFTBalanceInfo.md)[]  }\>

#### Defined in

[api/user_api.ts:1275](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/user_api.ts#L1275)

___

### getUserNFTDepositHistory

▸ **getUserNFTDepositHistory**(`request`, `apiKey`): `Promise`<{ `raw_data`: `any` ; `totalNum`: `any` = raw\_data.totalNum; `userNFTDepositHistory`: [`UserNFTDepositHistoryTx`](../interfaces/UserNFTDepositHistoryTx.md)[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserNFTDepositHistoryRequest`](../modules.md#getusernftdeposithistoryrequest) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `any` ; `totalNum`: `any` = raw\_data.totalNum; `userNFTDepositHistory`: [`UserNFTDepositHistoryTx`](../interfaces/UserNFTDepositHistoryTx.md)[]  }\>

#### Defined in

[api/user_api.ts:1103](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/user_api.ts#L1103)

___

### getUserNFTTranferHistory

▸ **getUserNFTTranferHistory**(`request`, `apiKey`): `Promise`<{ `raw_data`: `any` ; `totalNum`: `any` = raw\_data.totalNum; `userNFTTransfers`: [`UserNFTTransferHistoryTx`](../interfaces/UserNFTTransferHistoryTx.md)[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserNFTTransferHistoryRequest`](../modules.md#getusernfttransferhistoryrequest) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `any` ; `totalNum`: `any` = raw\_data.totalNum; `userNFTTransfers`: [`UserNFTTransferHistoryTx`](../interfaces/UserNFTTransferHistoryTx.md)[]  }\>

#### Defined in

[api/user_api.ts:1148](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/user_api.ts#L1148)

___

### getUserNFTWithdrawalHistory

▸ **getUserNFTWithdrawalHistory**(`request`, `apiKey`): `Promise`<{ `raw_data`: `any` ; `totalNum`: `any` = raw\_data.totalNum; `userNFTWithdrawalHistory`: [`UserNFTWithdrawalHistoryTx`](../interfaces/UserNFTWithdrawalHistoryTx.md)[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserNFTWithdrawalHistoryRequest`](../modules.md#getusernftwithdrawalhistoryrequest) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `any` ; `totalNum`: `any` = raw\_data.totalNum; `userNFTWithdrawalHistory`: [`UserNFTWithdrawalHistoryTx`](../interfaces/UserNFTWithdrawalHistoryTx.md)[]  }\>

#### Defined in

[api/user_api.ts:1126](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/user_api.ts#L1126)

___

### getUserOnchainWithdrawalHistory

▸ **getUserOnchainWithdrawalHistory**(`request`, `apiKey`): `Promise`<{ `raw_data`: `any` ; `totalNum`: `any` = raw\_data.totalNum; `userOnchainWithdrawalHistory`: [`UserOnchainWithdrawalHistoryTx`](../interfaces/UserOnchainWithdrawalHistoryTx.md)[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserOnchainWithdrawalHistoryRequest`](../interfaces/GetUserOnchainWithdrawalHistoryRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `any` ; `totalNum`: `any` = raw\_data.totalNum; `userOnchainWithdrawalHistory`: [`UserOnchainWithdrawalHistoryTx`](../interfaces/UserOnchainWithdrawalHistoryTx.md)[]  }\>

#### Defined in

[api/user_api.ts:409](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/user_api.ts#L409)

___

### getUserOrderFeeRate

▸ **getUserOrderFeeRate**(`request`, `apiKey`): `Promise`<{ `feeRate`: [`FeeRateInfo`](../interfaces/FeeRateInfo.md) ; `gasPrice`: `number` ; `raw_data`: `any`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserOrderFeeRateRequest`](../interfaces/GetUserOrderFeeRateRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `feeRate`: [`FeeRateInfo`](../interfaces/FeeRateInfo.md) ; `gasPrice`: `number` ; `raw_data`: `any`  }\>

#### Defined in

[api/user_api.ts:557](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/user_api.ts#L557)

___

### getUserPwdResetTxs

▸ **getUserPwdResetTxs**(`request`, `apiKey`): `Promise`<{ `raw_data`: `any` ; `totalNum`: `any` = raw\_data.totalNum; `userPwdResetTxs`: [`UserPwdResetTx`](../interfaces/UserPwdResetTx.md)[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserPwdResetTxsRequest`](../interfaces/GetUserPwdResetTxsRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `any` ; `totalNum`: `any` = raw\_data.totalNum; `userPwdResetTxs`: [`UserPwdResetTx`](../interfaces/UserPwdResetTx.md)[]  }\>

#### Defined in

[api/user_api.ts:329](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/user_api.ts#L329)

___

### getUserRegTxs

▸ **getUserRegTxs**(`request`, `apiKey`): `Promise`<{ `raw_data`: `any` ; `totalNum`: `any` = raw\_data.totalNum; `userRegTxs`: [`UserRegTx`](../interfaces/UserRegTx.md)[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserRegTxsRequest`](../interfaces/GetUserRegTxsRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `any` ; `totalNum`: `any` = raw\_data.totalNum; `userRegTxs`: [`UserRegTx`](../interfaces/UserRegTx.md)[]  }\>

#### Defined in

[api/user_api.ts:304](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/user_api.ts#L304)

___

### getUserTrades

▸ **getUserTrades**(`request`, `apiKey`): `Promise`<{ `raw_data`: `any` ; `totalNum`: `any` = raw\_data.totalNum; `userTrades`: [`UserTrade`](../interfaces/UserTrade.md)[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserTradesRequest`](../interfaces/GetUserTradesRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `any` ; `totalNum`: `any` = raw\_data.totalNum; `userTrades`: [`UserTrade`](../interfaces/UserTrade.md)[]  }\>

#### Defined in

[api/user_api.ts:485](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/user_api.ts#L485)

___

### getUserTranferList

▸ **getUserTranferList**(`request`, `apiKey`): `Promise`<{ `raw_data`: `any` ; `totalNum`: `any` = raw\_data.totalNum; `userTransfers`: [`UserTransferRecord`](../interfaces/UserTransferRecord.md)[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserTransferListRequest`](../interfaces/GetUserTransferListRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `any` ; `totalNum`: `any` = raw\_data.totalNum; `userTransfers`: [`UserTransferRecord`](../interfaces/UserTransferRecord.md)[]  }\>

#### Defined in

[api/user_api.ts:431](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/user_api.ts#L431)

___

### getUserTxs

▸ **getUserTxs**(`request`, `apiKey`): `Promise`<{ `raw_data`: `any` ; `totalNum`: `any` = raw\_data.totalNum; `userTxs`: [`UserTx`](../interfaces/UserTx.md)[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserTxsRequest`](../interfaces/GetUserTxsRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `any` ; `totalNum`: `any` = raw\_data.totalNum; `userTxs`: [`UserTx`](../interfaces/UserTx.md)[]  }\>

#### Defined in

[api/user_api.ts:454](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/user_api.ts#L454)

___

### getUserVIPAssets

▸ **getUserVIPAssets**(`request`): `Promise`<{ `raw_data`: `any`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`getUserVIPAssetsRequest`](../interfaces/getUserVIPAssetsRequest.md) |

#### Returns

`Promise`<{ `raw_data`: `any`  }\>

#### Defined in

[api/user_api.ts:1295](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/user_api.ts#L1295)

___

### getUserVIPInfo

▸ **getUserVIPInfo**(`request`, `apiKey`): `Promise`<{ `raw_data`: `any` ; `vipInfo`: { `createdAt`: `any` = raw\_data.created\_at; `org`: `any` = raw\_data.org; `validTo`: `any` = raw\_data.valid\_to; `vipTag`: `any` = raw\_data.vip\_tag }  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserVIPInfoRequest`](../interfaces/GetUserVIPInfoRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `any` ; `vipInfo`: { `createdAt`: `any` = raw\_data.created\_at; `org`: `any` = raw\_data.org; `validTo`: `any` = raw\_data.valid\_to; `vipTag`: `any` = raw\_data.vip\_tag }  }\>

#### Defined in

[api/user_api.ts:1310](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/user_api.ts#L1310)

___

### makeReq

▸ `Protected` **makeReq**(): `Request`

#### Returns

`Request`

#### Inherited from

BaseAPI.makeReq

#### Defined in

[api/base_api.ts:49](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/base_api.ts#L49)

___

### returnTxHash

▸ `Private` **returnTxHash**(`raw_data`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `raw_data` | `any` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `hash` | `any` |
| `raw_data` | `any` |
| `resultInfo` | `any` |

#### Defined in

[api/user_api.ts:686](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/user_api.ts#L686)

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

BaseAPI.setBaseUrl

#### Defined in

[api/base_api.ts:45](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/base_api.ts#L45)

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

BaseAPI.setChainId

#### Defined in

[api/base_api.ts:41](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/base_api.ts#L41)

___

### submitInternalTransfer

▸ **submitInternalTransfer**(`req`): `Promise`<{ `errorInfo`: `any` ; `hash`: `any` ; `raw_data`: `any` ; `resultInfo`: `any`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | [`OriginTransferRequestV3WithPatch`](../interfaces/OriginTransferRequestV3WithPatch.md) |

#### Returns

`Promise`<{ `errorInfo`: `any` ; `hash`: `any` ; `raw_data`: `any` ; `resultInfo`: `any`  }\>

#### Defined in

[api/user_api.ts:788](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/user_api.ts#L788)

___

### submitNFTInTransfer

▸ **submitNFTInTransfer**(`req`): `Promise`<{ `errorInfo`: `any` ; `hash`: `any` ; `raw_data`: `any` ; `resultInfo`: `any`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | [`OriginNFTTransferRequestV3WithPatch`](../interfaces/OriginNFTTransferRequestV3WithPatch.md) |

#### Returns

`Promise`<{ `errorInfo`: `any` ; `hash`: `any` ; `raw_data`: `any` ; `resultInfo`: `any`  }\>

#### Defined in

[api/user_api.ts:869](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/user_api.ts#L869)

___

### submitNFTMint

▸ **submitNFTMint**(`req`): `Promise`<{ `errorInfo`: `any` ; `hash`: `any` ; `raw_data`: `any` ; `resultInfo`: `any`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | [`OriginNFTMINTRequestV3WithPatch`](../interfaces/OriginNFTMINTRequestV3WithPatch.md) |

#### Returns

`Promise`<{ `errorInfo`: `any` ; `hash`: `any` ; `raw_data`: `any` ; `resultInfo`: `any`  }\>

#### Defined in

[api/user_api.ts:1026](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/user_api.ts#L1026)

___

### submitNFTWithdraw

▸ **submitNFTWithdraw**(`req`): `Promise`<{ `errorInfo`: `any` ; `hash`: `any` ; `raw_data`: `any` ; `resultInfo`: `any`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | [`OriginNFTWithdrawRequestV3WithPatch`](../interfaces/OriginNFTWithdrawRequestV3WithPatch.md) |

#### Returns

`Promise`<{ `errorInfo`: `any` ; `hash`: `any` ; `raw_data`: `any` ; `resultInfo`: `any`  }\>

#### Defined in

[api/user_api.ts:949](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/user_api.ts#L949)

___

### submitOffchainWithdraw

▸ **submitOffchainWithdraw**(`req`): `Promise`<{ `errorInfo`: `any` ; `hash`: `any` ; `raw_data`: `any` ; `resultInfo`: `any`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | [`OffChainWithdrawalRequestV3WithPatch`](../interfaces/OffChainWithdrawalRequestV3WithPatch.md) |

#### Returns

`Promise`<{ `errorInfo`: `any` ; `hash`: `any` ; `raw_data`: `any` ; `resultInfo`: `any`  }\>

#### Defined in

[api/user_api.ts:710](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/user_api.ts#L710)

___

### submitOrder

▸ **submitOrder**(`orderRequest`, `PrivateKey`, `apiKey`): `Promise`<{ `hash`: `any` ; `raw_data`: `any` ; `resultInfo`: `any`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `orderRequest` | [`SubmitOrderRequestV3`](../interfaces/SubmitOrderRequestV3.md) |
| `PrivateKey` | `string` |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `hash`: `any` ; `raw_data`: `any` ; `resultInfo`: `any`  }\>

#### Defined in

[api/user_api.ts:177](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/user_api.ts#L177)

___

### updateAccount

▸ **updateAccount**(`req`): `Promise`<{ `errorInfo`: `any` ; `hash`: `any` ; `raw_data`: `any` ; `resultInfo`: `any`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | [`UpdateAccountRequestV3WithPatch`](../interfaces/UpdateAccountRequestV3WithPatch.md) |

#### Returns

`Promise`<{ `errorInfo`: `any` ; `hash`: `any` ; `raw_data`: `any` ; `resultInfo`: `any`  }\>

#### Defined in

[api/user_api.ts:1172](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/user_api.ts#L1172)

___

### updateUserApiKey

▸ **updateUserApiKey**(`request`, `apiKey`, `eddsaKey`): `Promise`<{ `raw_data`: `any`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`UpdateUserApiKeyRequest`](../interfaces/UpdateUserApiKeyRequest.md) |
| `apiKey` | `string` |
| `eddsaKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `any`  }\>

#### Defined in

[api/user_api.ts:77](https://github.com/Loopring/loopring_sdk/blob/ea87b1c/src/api/user_api.ts#L77)
