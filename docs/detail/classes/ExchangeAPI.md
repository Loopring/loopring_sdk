[@loopring-web/loopring-sdk](../README.md) / [Exports](../modules.md) / ExchangeAPI

# Class: ExchangeAPI

## Hierarchy

- `BaseAPI`

  ↳ **`ExchangeAPI`**

## Table of contents

### Constructors

- [constructor](ExchangeAPI.md#constructor)

### Properties

- [baseUrl](ExchangeAPI.md#baseurl)

### Methods

- [getAccount](ExchangeAPI.md#getaccount)
- [getAccountServices](ExchangeAPI.md#getaccountservices)
- [getAllMixTickers](ExchangeAPI.md#getallmixtickers)
- [getAllTickers](ExchangeAPI.md#getalltickers)
- [getAllowances](ExchangeAPI.md#getallowances)
- [getCandlestick](ExchangeAPI.md#getcandlestick)
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
- [setBaseUrl](ExchangeAPI.md#setbaseurl)
- [setChainId](ExchangeAPI.md#setchainid)
- [splitTokens](ExchangeAPI.md#splittokens)

## Constructors

### constructor

• **new ExchangeAPI**(`param`, `timeout?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `param` | `InitParam` | `undefined` |
| `timeout` | `number` | `DEFAULT_TIMEOUT` |

#### Inherited from

BaseAPI.constructor

#### Defined in

[api/base_api.ts:29](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/base_api.ts#L29)

## Properties

### baseUrl

• `Protected` **baseUrl**: `string` = `''`

#### Inherited from

BaseAPI.baseUrl

#### Defined in

[api/base_api.ts:26](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/base_api.ts#L26)

## Methods

### getAccount

▸ **getAccount**(`request`): `Promise`<{ `accInfo`: `undefined` \| [`AccountInfo`](../interfaces/AccountInfo.md) ; `error`: `any` ; `raw_data`: `any`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetAccountRequest`](../interfaces/GetAccountRequest.md) |

#### Returns

`Promise`<{ `accInfo`: `undefined` \| [`AccountInfo`](../interfaces/AccountInfo.md) ; `error`: `any` ; `raw_data`: `any`  }\>

#### Defined in

[api/exchange_api.ts:950](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/exchange_api.ts#L950)

___

### getAccountServices

▸ **getAccountServices**(`request`): `Promise`<{ `dAppTrade`: `any` = raw\_data.dAppTrade; `joinAmm`: `any` = raw\_data.joinAmm; `order`: `any` = raw\_data.order; `raw_data`: `any` ; `register`: `any` = raw\_data.register }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetAccountServicesRequest`](../interfaces/GetAccountServicesRequest.md) |

#### Returns

`Promise`<{ `dAppTrade`: `any` = raw\_data.dAppTrade; `joinAmm`: `any` = raw\_data.joinAmm; `order`: `any` = raw\_data.order; `raw_data`: `any` ; `register`: `any` = raw\_data.register }\>

#### Defined in

[api/exchange_api.ts:1042](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/exchange_api.ts#L1042)

___

### getAllMixTickers

▸ **getAllMixTickers**(`markets?`): `Promise`<{ `raw_data`: `any` ; `tickList`: [`TickerData`](../interfaces/TickerData.md)[] ; `tickMap`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`TickerData`](../interfaces/TickerData.md)\>  }\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `markets` | `undefined` \| `string` | `undefined` |

#### Returns

`Promise`<{ `raw_data`: `any` ; `tickList`: [`TickerData`](../interfaces/TickerData.md)[] ; `tickMap`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`TickerData`](../interfaces/TickerData.md)\>  }\>

#### Defined in

[api/exchange_api.ts:696](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/exchange_api.ts#L696)

___

### getAllTickers

▸ **getAllTickers**(`markets?`): `Promise`<{ `raw_data`: `any` ; `tickList`: [`TickerData`](../interfaces/TickerData.md)[] ; `tickMap`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`TickerData`](../interfaces/TickerData.md)\>  }\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `markets` | `undefined` \| `string` | `undefined` |

#### Returns

`Promise`<{ `raw_data`: `any` ; `tickList`: [`TickerData`](../interfaces/TickerData.md)[] ; `tickMap`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`TickerData`](../interfaces/TickerData.md)\>  }\>

#### Defined in

[api/exchange_api.ts:714](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/exchange_api.ts#L714)

___

### getAllowances

▸ **getAllowances**(`request`, `tokens`): `Promise`<{ `raw_data`: `any` ; `tokenAllowances`: [`LoopringMap`](../interfaces/LoopringMap.md)<`string`\>  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetAllowancesRequest`](../interfaces/GetAllowancesRequest.md) |
| `tokens` | `any` |

#### Returns

`Promise`<{ `raw_data`: `any` ; `tokenAllowances`: [`LoopringMap`](../interfaces/LoopringMap.md)<`string`\>  }\>

#### Defined in

[api/exchange_api.ts:496](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/exchange_api.ts#L496)

___

### getCandlestick

▸ **getCandlestick**(`request`, `url?`): `Promise`<{ `candlesticks`: [`Candlestick`](../interfaces/Candlestick.md)[] ; `raw_data`: `any`  }\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `request` | [`GetCandlestickRequest`](../interfaces/GetCandlestickRequest.md) | `undefined` |
| `url` | `string` | `LOOPRING_URLs.GET_CANDLESTICK` |

#### Returns

`Promise`<{ `candlesticks`: [`Candlestick`](../interfaces/Candlestick.md)[] ; `raw_data`: `any`  }\>

#### Defined in

[api/exchange_api.ts:739](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/exchange_api.ts#L739)

___

### getDepth

▸ **getDepth**(`request`, `url?`): `Promise`<{ `depth`: [`DepthData`](../interfaces/DepthData.md) ; `raw_data`: `any`  }\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `request` | [`GetDepthRequest`](../interfaces/GetDepthRequest.md) | `undefined` |
| `url` | `string` | `LOOPRING_URLs.GET_DEPTH` |

#### Returns

`Promise`<{ `depth`: [`DepthData`](../interfaces/DepthData.md) ; `raw_data`: `any`  }\>

#### Defined in

[api/exchange_api.ts:569](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/exchange_api.ts#L569)

___

### getEthBalances

▸ **getEthBalances**(`request`): `Promise`<{ `ethBalance`: `any` ; `raw_data`: `any`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetEthBalancesRequest`](../interfaces/GetEthBalancesRequest.md) |

#### Returns

`Promise`<{ `ethBalance`: `any` ; `raw_data`: `any`  }\>

#### Defined in

[api/exchange_api.ts:437](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/exchange_api.ts#L437)

___

### getEthNonce

▸ **getEthNonce**(`request`): `Promise`<{ `nonce`: `any` ; `raw_data`: `any`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetEthNonceRequest`](../interfaces/GetEthNonceRequest.md) |

#### Returns

`Promise`<{ `nonce`: `any` ; `raw_data`: `any`  }\>

#### Defined in

[api/exchange_api.ts:980](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/exchange_api.ts#L980)

___

### getExchangeFeeInfo

▸ **getExchangeFeeInfo**(): `Promise`<{ `ammTradingFees`: [`VipFeeRateInfoMap`](../modules.md#vipfeerateinfomap) ; `orderbookTradingFees`: [`VipFeeRateInfoMap`](../modules.md#vipfeerateinfomap) ; `orderbookTradingFeesStablecoin`: [`VipFeeRateInfoMap`](../modules.md#vipfeerateinfomap) ; `otherFees`: { [key: string]: `string`;  } ; `raw_data`: `any`  }\>

#### Returns

`Promise`<{ `ammTradingFees`: [`VipFeeRateInfoMap`](../modules.md#vipfeerateinfomap) ; `orderbookTradingFees`: [`VipFeeRateInfoMap`](../modules.md#vipfeerateinfomap) ; `orderbookTradingFeesStablecoin`: [`VipFeeRateInfoMap`](../modules.md#vipfeerateinfomap) ; `otherFees`: { [key: string]: `string`;  } ; `raw_data`: `any`  }\>

#### Defined in

[api/exchange_api.ts:185](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/exchange_api.ts#L185)

___

### getExchangeInfo

▸ **getExchangeInfo**(): `Promise`<{ `exchangeInfo`: [`ExchangeInfo`](../interfaces/ExchangeInfo.md) ; `raw_data`: `any`  }\>

#### Returns

`Promise`<{ `exchangeInfo`: [`ExchangeInfo`](../interfaces/ExchangeInfo.md) ; `raw_data`: `any`  }\>

#### Defined in

[api/exchange_api.ts:532](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/exchange_api.ts#L532)

___

### getFiatPrice

▸ **getFiatPrice**(`request`): `Promise`<{ `fiatPrices`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`FiatPriceInfo`](../interfaces/FiatPriceInfo.md)\> ; `raw_data`: `any`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetFiatPriceRequest`](../interfaces/GetFiatPriceRequest.md) |

#### Returns

`Promise`<{ `fiatPrices`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`FiatPriceInfo`](../interfaces/FiatPriceInfo.md)\> ; `raw_data`: `any`  }\>

#### Defined in

[api/exchange_api.ts:876](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/exchange_api.ts#L876)

___

### getGasPrice

▸ **getGasPrice**(): `Promise`<{ `gasPrice`: `any` ; `raw_data`: `any`  }\>

#### Returns

`Promise`<{ `gasPrice`: `any` ; `raw_data`: `any`  }\>

#### Defined in

[api/exchange_api.ts:1002](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/exchange_api.ts#L1002)

___

### getGasPriceRange

▸ **getGasPriceRange**(): `Promise`<{ `gasPriceRanges`: `any` ; `raw_data`: `any`  }\>

#### Returns

`Promise`<{ `gasPriceRanges`: `any` ; `raw_data`: `any`  }\>

#### Defined in

[api/exchange_api.ts:1023](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/exchange_api.ts#L1023)

___

### getMarketTrades

▸ **getMarketTrades**(`request`): `Promise`<{ `marketTrades`: [`MarketTradeInfo`](../interfaces/MarketTradeInfo.md)[] ; `raw_data`: `any` ; `totalNum`: `any` = raw\_data.totalNum }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetMarketTradesRequest`](../interfaces/GetMarketTradesRequest.md) |

#### Returns

`Promise`<{ `marketTrades`: [`MarketTradeInfo`](../interfaces/MarketTradeInfo.md)[] ; `raw_data`: `any` ; `totalNum`: `any` = raw\_data.totalNum }\>

#### Defined in

[api/exchange_api.ts:907](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/exchange_api.ts#L907)

___

### getMarkets

▸ **getMarkets**(`url?`): `Promise`<{ `marketArr`: (`string` \| `symbol`)[] ; `marketArrStr`: `string` ; `markets`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`MarketInfo`](../interfaces/MarketInfo.md)\> ; `pairs`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`TokenRelatedInfo`](../interfaces/TokenRelatedInfo.md)\> ; `raw_data`: `any` ; `tokenArr`: (`string` \| `symbol`)[] ; `tokenArrStr`: `string`  }\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `url` | `string` | `LOOPRING_URLs.GET_MARKETS` |

#### Returns

`Promise`<{ `marketArr`: (`string` \| `symbol`)[] ; `marketArrStr`: `string` ; `markets`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`MarketInfo`](../interfaces/MarketInfo.md)\> ; `pairs`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`TokenRelatedInfo`](../interfaces/TokenRelatedInfo.md)\> ; `raw_data`: `any` ; `tokenArr`: (`string` \| `symbol`)[] ; `tokenArrStr`: `string`  }\>

#### Defined in

[api/exchange_api.ts:260](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/exchange_api.ts#L260)

___

### getMixCandlestick

▸ **getMixCandlestick**(`request`): `Promise`<{ `candlesticks`: [`Candlestick`](../interfaces/Candlestick.md)[] ; `raw_data`: `any`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetCandlestickRequest`](../interfaces/GetCandlestickRequest.md) |

#### Returns

`Promise`<{ `candlesticks`: [`Candlestick`](../interfaces/Candlestick.md)[] ; `raw_data`: `any`  }\>

#### Defined in

[api/exchange_api.ts:732](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/exchange_api.ts#L732)

___

### getMixDepth

▸ **getMixDepth**(`request`): `Promise`<{ `depth`: [`DepthData`](../interfaces/DepthData.md) ; `raw_data`: `any`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetDepthRequest`](../interfaces/GetDepthRequest.md) |

#### Returns

`Promise`<{ `depth`: [`DepthData`](../interfaces/DepthData.md) ; `raw_data`: `any`  }\>

#### Defined in

[api/exchange_api.ts:562](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/exchange_api.ts#L562)

___

### getMixMarkets

▸ **getMixMarkets**(): `Promise`<{ `marketArr`: (`string` \| `symbol`)[] ; `marketArrStr`: `string` ; `markets`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`MarketInfo`](../interfaces/MarketInfo.md)\> ; `pairs`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`TokenRelatedInfo`](../interfaces/TokenRelatedInfo.md)\> ; `raw_data`: `any` ; `tokenArr`: (`string` \| `symbol`)[] ; `tokenArrStr`: `string`  }\>

#### Returns

`Promise`<{ `marketArr`: (`string` \| `symbol`)[] ; `marketArrStr`: `string` ; `markets`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`MarketInfo`](../interfaces/MarketInfo.md)\> ; `pairs`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`TokenRelatedInfo`](../interfaces/TokenRelatedInfo.md)\> ; `raw_data`: `any` ; `tokenArr`: (`string` \| `symbol`)[] ; `tokenArrStr`: `string`  }\>

#### Defined in

[api/exchange_api.ts:347](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/exchange_api.ts#L347)

___

### getMixTicker

▸ **getMixTicker**(`request`): `Promise`<{ `raw_data`: `any` ; `tickList`: [`TickerData`](../interfaces/TickerData.md)[] ; `tickMap`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`TickerData`](../interfaces/TickerData.md)\>  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetTickerRequest`](../interfaces/GetTickerRequest.md) |

#### Returns

`Promise`<{ `raw_data`: `any` ; `tickList`: [`TickerData`](../interfaces/TickerData.md)[] ; `tickMap`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`TickerData`](../interfaces/TickerData.md)\>  }\>

#### Defined in

[api/exchange_api.ts:622](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/exchange_api.ts#L622)

___

### getProtocolPortrait

▸ **getProtocolPortrait**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Defined in

[api/exchange_api.ts:166](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/exchange_api.ts#L166)

___

### getRecommendedMarkets

▸ **getRecommendedMarkets**(): `Promise`<{ `raw_data`: `any` ; `recommended`: `any`  }\>

#### Returns

`Promise`<{ `raw_data`: `any` ; `recommended`: `any`  }\>

#### Defined in

[api/exchange_api.ts:231](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/exchange_api.ts#L231)

___

### getRelayerCurrentTime

▸ **getRelayerCurrentTime**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Defined in

[api/exchange_api.ts:147](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/exchange_api.ts#L147)

___

### getTicker

▸ **getTicker**(`request`, `url?`): `Promise`<{ `raw_data`: `any` ; `tickList`: [`TickerData`](../interfaces/TickerData.md)[] ; `tickMap`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`TickerData`](../interfaces/TickerData.md)\>  }\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `request` | [`GetTickerRequest`](../interfaces/GetTickerRequest.md) | `undefined` |
| `url` | `string` | `LOOPRING_URLs.GET_TICKER` |

#### Returns

`Promise`<{ `raw_data`: `any` ; `tickList`: [`TickerData`](../interfaces/TickerData.md)[] ; `tickMap`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`TickerData`](../interfaces/TickerData.md)\>  }\>

#### Defined in

[api/exchange_api.ts:630](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/exchange_api.ts#L630)

___

### getTokenBalances

▸ **getTokenBalances**(`request`, `tokens`): `Promise`<{ `raw_data`: `any` ; `tokenBalances`: [`LoopringMap`](../interfaces/LoopringMap.md)<`string`\>  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetTokenBalancesRequest`](../interfaces/GetTokenBalancesRequest.md) |
| `tokens` | [`LoopringMap`](../interfaces/LoopringMap.md)<[`TokenInfo`](../interfaces/TokenInfo.md)\> |

#### Returns

`Promise`<{ `raw_data`: `any` ; `tokenBalances`: [`LoopringMap`](../interfaces/LoopringMap.md)<`string`\>  }\>

#### Defined in

[api/exchange_api.ts:460](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/exchange_api.ts#L460)

___

### getTokens

▸ **getTokens**(): `Promise`<{ `raw_data`: `any` ; `tokenAddressArr`: (`string` \| `symbol`)[] ; `tokenAddressArrStr`: `string` ; `tokenAddressMap`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`TokenInfo`](../interfaces/TokenInfo.md)\> ; `tokenIdArr`: (`string` \| `symbol`)[] ; `tokenIdArrStr`: `string` ; `tokenIdIndex`: [`LoopringMap`](../interfaces/LoopringMap.md)<`string`\> ; `tokenIdMap`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`TokenInfo`](../interfaces/TokenInfo.md)\> ; `tokenSymbolArr`: (`string` \| `symbol`)[] ; `tokenSymbolArrStr`: `string` ; `tokenSymbolMap`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`TokenInfo`](../interfaces/TokenInfo.md)\>  }\>

#### Returns

`Promise`<{ `raw_data`: `any` ; `tokenAddressArr`: (`string` \| `symbol`)[] ; `tokenAddressArrStr`: `string` ; `tokenAddressMap`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`TokenInfo`](../interfaces/TokenInfo.md)\> ; `tokenIdArr`: (`string` \| `symbol`)[] ; `tokenIdArrStr`: `string` ; `tokenIdIndex`: [`LoopringMap`](../interfaces/LoopringMap.md)<`string`\> ; `tokenIdMap`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`TokenInfo`](../interfaces/TokenInfo.md)\> ; `tokenSymbolArr`: (`string` \| `symbol`)[] ; `tokenSymbolArrStr`: `string` ; `tokenSymbolMap`: [`LoopringMap`](../interfaces/LoopringMap.md)<[`TokenInfo`](../interfaces/TokenInfo.md)\>  }\>

#### Defined in

[api/exchange_api.ts:354](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/exchange_api.ts#L354)

___

### getWithdrawalAgents

▸ **getWithdrawalAgents**(`request`): `Promise`<{ `raw_data`: `any` ; `supportTokenMap`: { [key: string]: `any`;  }  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetWithdrawalAgentsRequest`](../interfaces/GetWithdrawalAgentsRequest.md) |

#### Returns

`Promise`<{ `raw_data`: `any` ; `supportTokenMap`: { [key: string]: `any`;  }  }\>

#### Defined in

[api/exchange_api.ts:204](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/exchange_api.ts#L204)

___

### makeReq

▸ `Protected` **makeReq**(): `Request`

#### Returns

`Request`

#### Inherited from

BaseAPI.makeReq

#### Defined in

[api/base_api.ts:49](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/base_api.ts#L49)

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

[api/base_api.ts:45](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/base_api.ts#L45)

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

[api/base_api.ts:41](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/base_api.ts#L41)

___

### splitTokens

▸ `Private` **splitTokens**(`token`, `tokens`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |
| `tokens` | [`LoopringMap`](../interfaces/LoopringMap.md)<[`TokenInfo`](../interfaces/TokenInfo.md)\> |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `token` | `string` |
| `tokenArray` | `any` |

#### Defined in

[api/exchange_api.ts:406](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/exchange_api.ts#L406)
