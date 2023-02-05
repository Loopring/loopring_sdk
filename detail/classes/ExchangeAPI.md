[@loopring-web/loopring-sdk](../README.md) / [Exports](../modules.md) / ExchangeAPI

# Class: ExchangeAPI

## Hierarchy

- [`BaseAPI`](BaseAPI.md)

  ↳ **`ExchangeAPI`**

## Table of contents

### Constructors

- [constructor](ExchangeAPI.md#constructor)

### Properties

- [baseUrl](ExchangeAPI.md#baseurl)
- [chainId](ExchangeAPI.md#chainid)
- [KEY\_MESSAGE](ExchangeAPI.md#key_message)

### Methods

- [disableWithdrawTokenList](ExchangeAPI.md#disablewithdrawtokenlist)
- [genErr](ExchangeAPI.md#generr)
- [getAccount](ExchangeAPI.md#getaccount)
- [getAccountServices](ExchangeAPI.md#getaccountservices)
- [getAllMixTickers](ExchangeAPI.md#getallmixtickers)
- [getAllTickers](ExchangeAPI.md#getalltickers)
- [getAllTokenBalances](ExchangeAPI.md#getalltokenbalances)
- [getAllowances](ExchangeAPI.md#getallowances)
- [getAvailableBroker](ExchangeAPI.md#getavailablebroker)
- [getCandlestick](ExchangeAPI.md#getcandlestick)
- [getCounterFactualInfo](ExchangeAPI.md#getcounterfactualinfo)
- [getDepth](ExchangeAPI.md#getdepth)
- [getEthBalances](ExchangeAPI.md#getethbalances)
- [getEthNonce](ExchangeAPI.md#getethnonce)
- [getExchangeFeeInfo](ExchangeAPI.md#getexchangefeeinfo)
- [getExchangeInfo](ExchangeAPI.md#getexchangeinfo)
- [getFiatPrice](ExchangeAPI.md#getfiatprice)
- [getGasPrice](ExchangeAPI.md#getgasprice)
- [getGasPriceRange](ExchangeAPI.md#getgaspricerange)
- [getMarketTrades](ExchangeAPI.md#getmarkettrades)
- [getMarkets](ExchangeAPI.md#getmarkets)
- [getMixCandlestick](ExchangeAPI.md#getmixcandlestick)
- [getMixDepth](ExchangeAPI.md#getmixdepth)
- [getMixMarkets](ExchangeAPI.md#getmixmarkets)
- [getMixTicker](ExchangeAPI.md#getmixticker)
- [getProtocolPortrait](ExchangeAPI.md#getprotocolportrait)
- [getRecommendedMarkets](ExchangeAPI.md#getrecommendedmarkets)
- [getRelayerCurrentTime](ExchangeAPI.md#getrelayercurrenttime)
- [getTicker](ExchangeAPI.md#getticker)
- [getTokenBalances](ExchangeAPI.md#gettokenbalances)
- [getTokens](ExchangeAPI.md#gettokens)
- [getWithdrawalAgents](ExchangeAPI.md#getwithdrawalagents)
- [makeReq](ExchangeAPI.md#makereq)
- [returnTxHash](ExchangeAPI.md#returntxhash)
- [setBaseUrl](ExchangeAPI.md#setbaseurl)
- [setChainId](ExchangeAPI.md#setchainid)

## Constructors

### constructor

• **new ExchangeAPI**(`param`, `timeout?`, `baseUrlMap?`)

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

[api/base_api.ts:104](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/base_api.ts#L104)

## Properties

### baseUrl

• `Protected` **baseUrl**: `string` = `""`

#### Inherited from

[BaseAPI](BaseAPI.md).[baseUrl](BaseAPI.md#baseurl)

#### Defined in

[api/base_api.ts:39](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/base_api.ts#L39)

___

### chainId

• `Protected` **chainId**: [`ChainId`](../enums/ChainId.md) = `ChainId.MAINNET`

#### Inherited from

[BaseAPI](BaseAPI.md).[chainId](BaseAPI.md#chainid)

#### Defined in

[api/base_api.ts:40](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/base_api.ts#L40)

___

### KEY\_MESSAGE

▪ `Static` **KEY\_MESSAGE**: `string` = `KEY_MESSAGE`

#### Inherited from

[BaseAPI](BaseAPI.md).[KEY_MESSAGE](BaseAPI.md#key_message)

#### Defined in

[api/base_api.ts:38](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/base_api.ts#L38)

## Methods

### disableWithdrawTokenList

▸ **disableWithdrawTokenList**<`R`\>(): `Promise`<{ `disableWithdrawTokenList`: `any`[] ; `raw_data`: `R`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Returns

`Promise`<{ `disableWithdrawTokenList`: `any`[] ; `raw_data`: `R`  }\>

#### Defined in

[api/exchange_api.ts:1009](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/exchange_api.ts#L1009)

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

[api/base_api.ts:41](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/base_api.ts#L41)

___

### getAccount

▸ **getAccount**<`R`\>(`request`): `Promise`<{ `accInfo`: [`AccountInfo`](../interfaces/AccountInfo.md) ; `raw_data`: `R`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetAccountRequest`](../modules.md#getaccountrequest) |

#### Returns

`Promise`<{ `accInfo`: [`AccountInfo`](../interfaces/AccountInfo.md) ; `raw_data`: `R`  }\>

#### Defined in

[api/exchange_api.ts:1083](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/exchange_api.ts#L1083)

___

### getAccountServices

▸ **getAccountServices**<`R`\>(`request`): `Promise`<{ `dAppTrade`: `any` ; `joinAmm`: `any` ; `legal`: `any` ; `order`: `any` ; `raw_data`: `R` ; `register`: `any`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetAccountServicesRequest`](../interfaces/GetAccountServicesRequest.md) |

#### Returns

`Promise`<{ `dAppTrade`: `any` ; `joinAmm`: `any` ; `legal`: `any` ; `order`: `any` ; `raw_data`: `R` ; `register`: `any`  }\>

#### Defined in

[api/exchange_api.ts:1184](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/exchange_api.ts#L1184)

___

### getAllMixTickers

▸ **getAllMixTickers**(`markets?`): `Promise`<{ `marketArr`: `string`[] ; `marketArrStr`: `string` ; `markets`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`MarketInfo`](../interfaces/MarketInfo.md)\> ; `pairs`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`TokenRelatedInfo`](../interfaces/TokenRelatedInfo.md)\> ; `raw_data`: `unknown` ; `tokenArr`: `string`[] ; `tokenArrStr`: `string`  } \| { `raw_data`: `unknown` ; `tickList`: [`TickerData`](../interfaces/TickerData.md)[] ; `tickMap`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`TickerData`](../interfaces/TickerData.md)\>  }\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `markets` | `undefined` \| `string` | `undefined` |

#### Returns

`Promise`<{ `marketArr`: `string`[] ; `marketArrStr`: `string` ; `markets`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`MarketInfo`](../interfaces/MarketInfo.md)\> ; `pairs`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`TokenRelatedInfo`](../interfaces/TokenRelatedInfo.md)\> ; `raw_data`: `unknown` ; `tokenArr`: `string`[] ; `tokenArrStr`: `string`  } \| { `raw_data`: `unknown` ; `tickList`: [`TickerData`](../interfaces/TickerData.md)[] ; `tickMap`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`TickerData`](../interfaces/TickerData.md)\>  }\>

#### Defined in

[api/exchange_api.ts:792](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/exchange_api.ts#L792)

___

### getAllTickers

▸ **getAllTickers**(`markets?`): `Promise`<{ `marketArr`: `string`[] ; `marketArrStr`: `string` ; `markets`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`MarketInfo`](../interfaces/MarketInfo.md)\> ; `pairs`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`TokenRelatedInfo`](../interfaces/TokenRelatedInfo.md)\> ; `raw_data`: `unknown` ; `tokenArr`: `string`[] ; `tokenArrStr`: `string`  } \| { `raw_data`: `unknown` ; `tickList`: [`TickerData`](../interfaces/TickerData.md)[] ; `tickMap`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`TickerData`](../interfaces/TickerData.md)\>  }\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `markets` | `undefined` \| `string` | `undefined` |

#### Returns

`Promise`<{ `marketArr`: `string`[] ; `marketArrStr`: `string` ; `markets`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`MarketInfo`](../interfaces/MarketInfo.md)\> ; `pairs`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`TokenRelatedInfo`](../interfaces/TokenRelatedInfo.md)\> ; `raw_data`: `unknown` ; `tokenArr`: `string`[] ; `tokenArrStr`: `string`  } \| { `raw_data`: `unknown` ; `tickList`: [`TickerData`](../interfaces/TickerData.md)[] ; `tickMap`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`TickerData`](../interfaces/TickerData.md)\>  }\>

#### Defined in

[api/exchange_api.ts:812](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/exchange_api.ts#L812)

___

### getAllTokenBalances

▸ **getAllTokenBalances**<`R`, `T`\>(`request`): `Promise`<{ `raw_data`: `R` ; `tokenBalances`: [`LoopringMap`](../interfaces/LoopringMap.md)<`string`\>  }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | `R` |
| `T` | `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetALLTokenBalancesRequest`](../interfaces/GetALLTokenBalancesRequest.md) |

#### Returns

`Promise`<{ `raw_data`: `R` ; `tokenBalances`: [`LoopringMap`](../interfaces/LoopringMap.md)<`string`\>  }\>

#### Defined in

[api/exchange_api.ts:538](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/exchange_api.ts#L538)

___

### getAllowances

▸ **getAllowances**<`R`, `T`\>(`request`): `Promise`<{ `raw_data`: `R` ; `tokenAllowances`: `Map`<`T`, `string`\>  }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | `R` |
| `T` | `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetAllowancesRequest`](../interfaces/GetAllowancesRequest.md) |

#### Returns

`Promise`<{ `raw_data`: `R` ; `tokenAllowances`: `Map`<`T`, `string`\>  }\>

#### Defined in

[api/exchange_api.ts:566](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/exchange_api.ts#L566)

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

[api/base_api.ts:123](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/base_api.ts#L123)

___

### getCandlestick

▸ **getCandlestick**<`R`\>(`request`, `url?`): `Promise`<{ `candlesticks`: [`Candlestick`](../interfaces/Candlestick.md)[] ; `raw_data`: `R`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `request` | [`GetCandlestickRequest`](../interfaces/GetCandlestickRequest.md) | `undefined` |
| `url` | `string` | `LOOPRING_URLs.GET_CANDLESTICK` |

#### Returns

`Promise`<{ `candlesticks`: [`Candlestick`](../interfaces/Candlestick.md)[] ; `raw_data`: `R`  }\>

#### Defined in

[api/exchange_api.ts:842](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/exchange_api.ts#L842)

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

[api/base_api.ts:136](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/base_api.ts#L136)

___

### getDepth

▸ **getDepth**<`R`\>(`request`, `url?`): `Promise`<{ `depth`: [`DepthData`](../interfaces/DepthData.md) ; `raw_data`: `R`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `request` | [`GetDepthRequest`](../interfaces/GetDepthRequest.md) | `undefined` |
| `url` | `string` | `LOOPRING_URLs.GET_DEPTH` |

#### Returns

`Promise`<{ `depth`: [`DepthData`](../interfaces/DepthData.md) ; `raw_data`: `R`  }\>

#### Defined in

[api/exchange_api.ts:648](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/exchange_api.ts#L648)

___

### getEthBalances

▸ **getEthBalances**<`R`\>(`request`): `Promise`<{ `ethBalance`: `string` ; `raw_data`: `R`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetEthBalancesRequest`](../interfaces/GetEthBalancesRequest.md) |

#### Returns

`Promise`<{ `ethBalance`: `string` ; `raw_data`: `R`  }\>

#### Defined in

[api/exchange_api.ts:477](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/exchange_api.ts#L477)

___

### getEthNonce

▸ **getEthNonce**<`R`\>(`request`): `Promise`<{ `nonce`: `number` ; `raw_data`: `R`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetEthNonceRequest`](../interfaces/GetEthNonceRequest.md) |

#### Returns

`Promise`<{ `nonce`: `number` ; `raw_data`: `R`  }\>

#### Defined in

[api/exchange_api.ts:1109](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/exchange_api.ts#L1109)

___

### getExchangeFeeInfo

▸ **getExchangeFeeInfo**<`R`\>(): `Promise`<{ `ammTradingFees`: [`VipFeeRateInfoMap`](../modules.md#vipfeerateinfomap) ; `orderbookTradingFees`: [`VipFeeRateInfoMap`](../modules.md#vipfeerateinfomap) ; `orderbookTradingFeesStablecoin`: [`VipFeeRateInfoMap`](../modules.md#vipfeerateinfomap) ; `otherFees`: { `[key: string]`: `string`;  } ; `raw_data`: `R`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Returns

`Promise`<{ `ammTradingFees`: [`VipFeeRateInfoMap`](../modules.md#vipfeerateinfomap) ; `orderbookTradingFees`: [`VipFeeRateInfoMap`](../modules.md#vipfeerateinfomap) ; `orderbookTradingFeesStablecoin`: [`VipFeeRateInfoMap`](../modules.md#vipfeerateinfomap) ; `otherFees`: { `[key: string]`: `string`;  } ; `raw_data`: `R`  }\>

#### Defined in

[api/exchange_api.ts:214](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/exchange_api.ts#L214)

___

### getExchangeInfo

▸ **getExchangeInfo**<`R`\>(): `Promise`<{ `exchangeInfo`: [`ExchangeInfo`](../interfaces/ExchangeInfo.md) ; `raw_data`: `R`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Returns

`Promise`<{ `exchangeInfo`: [`ExchangeInfo`](../interfaces/ExchangeInfo.md) ; `raw_data`: `R`  }\>

#### Defined in

[api/exchange_api.ts:606](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/exchange_api.ts#L606)

___

### getFiatPrice

▸ **getFiatPrice**<`R`\>(`request`): `Promise`<`any`\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetFiatPriceRequest`](../interfaces/GetFiatPriceRequest.md) |

#### Returns

`Promise`<`any`\>

#### Defined in

[api/exchange_api.ts:978](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/exchange_api.ts#L978)

___

### getGasPrice

▸ **getGasPrice**<`R`\>(): `Promise`<{ `gasPrice`: `number` ; `raw_data`: `R`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Returns

`Promise`<{ `gasPrice`: `number` ; `raw_data`: `R`  }\>

#### Defined in

[api/exchange_api.ts:1133](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/exchange_api.ts#L1133)

___

### getGasPriceRange

▸ **getGasPriceRange**<`R`\>(): `Promise`<{ `gasPriceRanges`: `any` ; `raw_data`: `R`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Returns

`Promise`<{ `gasPriceRanges`: `any` ; `raw_data`: `R`  }\>

#### Defined in

[api/exchange_api.ts:1160](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/exchange_api.ts#L1160)

___

### getMarketTrades

▸ **getMarketTrades**<`R`\>(`request`): `Promise`<{ `marketTrades`: [`MarketTradeInfo`](../interfaces/MarketTradeInfo.md)[] ; `raw_data`: `R` ; `totalNum`: `number`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetMarketTradesRequest`](../interfaces/GetMarketTradesRequest.md) |

#### Returns

`Promise`<{ `marketTrades`: [`MarketTradeInfo`](../interfaces/MarketTradeInfo.md)[] ; `raw_data`: `R` ; `totalNum`: `number`  }\>

#### Defined in

[api/exchange_api.ts:1035](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/exchange_api.ts#L1035)

___

### getMarkets

▸ **getMarkets**<`R`\>(`url?`): `Promise`<{ `marketArr`: `string`[] ; `marketArrStr`: `string` ; `markets`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`MarketInfo`](../interfaces/MarketInfo.md)\> ; `pairs`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`TokenRelatedInfo`](../interfaces/TokenRelatedInfo.md)\> ; `raw_data`: `R` ; `tokenArr`: `string`[] ; `tokenArrStr`: `string`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `url` | `string` | `LOOPRING_URLs.GET_MARKETS` |

#### Returns

`Promise`<{ `marketArr`: `string`[] ; `marketArrStr`: `string` ; `markets`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`MarketInfo`](../interfaces/MarketInfo.md)\> ; `pairs`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`TokenRelatedInfo`](../interfaces/TokenRelatedInfo.md)\> ; `raw_data`: `R` ; `tokenArr`: `string`[] ; `tokenArrStr`: `string`  }\>

#### Defined in

[api/exchange_api.ts:318](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/exchange_api.ts#L318)

___

### getMixCandlestick

▸ **getMixCandlestick**<`R`\>(`request`): `Promise`<{ `candlesticks`: [`Candlestick`](../interfaces/Candlestick.md)[] ; `raw_data`: `R`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetCandlestickRequest`](../interfaces/GetCandlestickRequest.md) |

#### Returns

`Promise`<{ `candlesticks`: [`Candlestick`](../interfaces/Candlestick.md)[] ; `raw_data`: `R`  }\>

#### Defined in

[api/exchange_api.ts:832](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/exchange_api.ts#L832)

___

### getMixDepth

▸ **getMixDepth**<`R`\>(`request`): `Promise`<{ `depth`: [`DepthData`](../interfaces/DepthData.md) ; `raw_data`: `R`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetDepthRequest`](../interfaces/GetDepthRequest.md) |

#### Returns

`Promise`<{ `depth`: [`DepthData`](../interfaces/DepthData.md) ; `raw_data`: `R`  }\>

#### Defined in

[api/exchange_api.ts:641](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/exchange_api.ts#L641)

___

### getMixMarkets

▸ **getMixMarkets**<`R`\>(): `Promise`<{ `marketArr`: `string`[] ; `marketArrStr`: `string` ; `markets`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`MarketInfo`](../interfaces/MarketInfo.md)\> ; `pairs`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`TokenRelatedInfo`](../interfaces/TokenRelatedInfo.md)\> ; `raw_data`: `R` ; `tokenArr`: `string`[] ; `tokenArrStr`: `string`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Returns

`Promise`<{ `marketArr`: `string`[] ; `marketArrStr`: `string` ; `markets`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`MarketInfo`](../interfaces/MarketInfo.md)\> ; `pairs`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`TokenRelatedInfo`](../interfaces/TokenRelatedInfo.md)\> ; `raw_data`: `R` ; `tokenArr`: `string`[] ; `tokenArrStr`: `string`  }\>

#### Defined in

[api/exchange_api.ts:358](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/exchange_api.ts#L358)

___

### getMixTicker

▸ **getMixTicker**<`R`\>(`request`): `Promise`<{ `raw_data`: `R` ; `tickList`: [`TickerData`](../interfaces/TickerData.md)[] ; `tickMap`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`TickerData`](../interfaces/TickerData.md)\>  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetTickerRequest`](../interfaces/GetTickerRequest.md) |

#### Returns

`Promise`<{ `raw_data`: `R` ; `tickList`: [`TickerData`](../interfaces/TickerData.md)[] ; `tickMap`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`TickerData`](../interfaces/TickerData.md)\>  }\>

#### Defined in

[api/exchange_api.ts:708](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/exchange_api.ts#L708)

___

### getProtocolPortrait

▸ **getProtocolPortrait**<`R`\>(): `Promise`<{ `raw_data`: `R`  } & `R`\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Returns

`Promise`<{ `raw_data`: `R`  } & `R`\>

#### Defined in

[api/exchange_api.ts:188](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/exchange_api.ts#L188)

___

### getRecommendedMarkets

▸ **getRecommendedMarkets**<`R`\>(): `Promise`<{ `raw_data`: `R` ; `recommended`: `string`[]  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Returns

`Promise`<{ `raw_data`: `R` ; `recommended`: `string`[]  }\>

#### Defined in

[api/exchange_api.ts:283](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/exchange_api.ts#L283)

___

### getRelayerCurrentTime

▸ **getRelayerCurrentTime**<`R`\>(): `Promise`<{ `raw_data`: `R`  } & `R`\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Returns

`Promise`<{ `raw_data`: `R`  } & `R`\>

#### Defined in

[api/exchange_api.ts:162](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/exchange_api.ts#L162)

___

### getTicker

▸ **getTicker**<`R`\>(`request`, `url?`): `Promise`<{ `raw_data`: `R` ; `tickList`: [`TickerData`](../interfaces/TickerData.md)[] ; `tickMap`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`TickerData`](../interfaces/TickerData.md)\>  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `request` | [`GetTickerRequest`](../interfaces/GetTickerRequest.md) | `undefined` |
| `url` | `string` | `LOOPRING_URLs.GET_TICKER` |

#### Returns

`Promise`<{ `raw_data`: `R` ; `tickList`: [`TickerData`](../interfaces/TickerData.md)[] ; `tickMap`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`TickerData`](../interfaces/TickerData.md)\>  }\>

#### Defined in

[api/exchange_api.ts:720](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/exchange_api.ts#L720)

___

### getTokenBalances

▸ **getTokenBalances**<`R`, `T`\>(`request`): `Promise`<{ `raw_data`: `R` ; `tokenBalances`: `Map`<`T`, `string`\>  }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | `R` |
| `T` | `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetTokenBalancesRequest`](../interfaces/GetTokenBalancesRequest.md) |

#### Returns

`Promise`<{ `raw_data`: `R` ; `tokenBalances`: `Map`<`T`, `string`\>  }\>

#### Defined in

[api/exchange_api.ts:505](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/exchange_api.ts#L505)

___

### getTokens

▸ **getTokens**<`R`\>(): `Promise`<[`TOKENMAPLIST`](../modules.md#tokenmaplist) & { `raw_data`: `R`  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Returns

`Promise`<[`TOKENMAPLIST`](../modules.md#tokenmaplist) & { `raw_data`: `R`  }\>

#### Defined in

[api/exchange_api.ts:373](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/exchange_api.ts#L373)

___

### getWithdrawalAgents

▸ **getWithdrawalAgents**<`R`\>(`request`): `Promise`<{ `raw_data`: `R` ; `supportTokenMap`: { `[key: string]`: `any`;  }  }\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetWithdrawalAgentsRequest`](../interfaces/GetWithdrawalAgentsRequest.md) |

#### Returns

`Promise`<{ `raw_data`: `R` ; `supportTokenMap`: { `[key: string]`: `any`;  }  }\>

#### Defined in

[api/exchange_api.ts:248](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/exchange_api.ts#L248)

___

### makeReq

▸ `Protected` **makeReq**(): `Request`

#### Returns

`Request`

#### Inherited from

[BaseAPI](BaseAPI.md).[makeReq](BaseAPI.md#makereq)

#### Defined in

[api/base_api.ts:182](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/base_api.ts#L182)

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

[api/base_api.ts:82](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/base_api.ts#L82)

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

[api/base_api.ts:178](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/base_api.ts#L178)

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

[api/base_api.ts:170](https://github.com/Loopring/loopring_sdk/blob/427d9da/src/api/base_api.ts#L170)
