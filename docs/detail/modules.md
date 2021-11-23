[@loopring-web/loopring-sdk](README.md) / Exports

# @loopring-web/loopring-sdk

## Table of contents

### Enumerations

- [AmmPoolActivityStatus](enums/AmmPoolActivityStatus.md)
- [AmmTxType](enums/AmmTxType.md)
- [AssetType](enums/AssetType.md)
- [BillType](enums/BillType.md)
- [ChainId](enums/ChainId.md)
- [ConnectorNames](enums/ConnectorNames.md)
- [Currency](enums/Currency.md)
- [ERC20Method](enums/ERC20Method.md)
- [FilledType](enums/FilledType.md)
- [GetEcDSASigType](enums/GetEcDSASigType.md)
- [IntervalType](enums/IntervalType.md)
- [LoopringErrorCode](enums/LoopringErrorCode.md)
- [MarketStatus](enums/MarketStatus.md)
- [NFTMethod](enums/NFTMethod.md)
- [NFTType](enums/NFTType.md)
- [OffchainFeeReqType](enums/OffchainFeeReqType.md)
- [OffchainNFTFeeReqType](enums/OffchainNFTFeeReqType.md)
- [OrderStatus](enums/OrderStatus.md)
- [OrderType](enums/OrderType.md)
- [OrderTypeResp](enums/OrderTypeResp.md)
- [ReqMethod](enums/ReqMethod.md)
- [RuleType](enums/RuleType.md)
- [SIG\_FLAG](enums/SIG_FLAG.md)
- [Side](enums/Side.md)
- [SigPatchField](enums/SigPatchField.md)
- [SigSuffix](enums/SigSuffix.md)
- [SortOrder](enums/SortOrder.md)
- [TradeChannel](enums/TradeChannel.md)
- [TradingInterval](enums/TradingInterval.md)
- [TransferType](enums/TransferType.md)
- [TxStatus](enums/TxStatus.md)
- [TxType](enums/TxType.md)
- [UserTxTypes](enums/UserTxTypes.md)
- [VipCatergory](enums/VipCatergory.md)
- [WithdrawalTypes](enums/WithdrawalTypes.md)
- [WsOps](enums/WsOps.md)
- [WsTopicType](enums/WsTopicType.md)

### Classes

- [AmmpoolAPI](classes/AmmpoolAPI.md)
- [ExchangeAPI](classes/ExchangeAPI.md)
- [NFTAPI](classes/NFTAPI.md)
- [UserAPI](classes/UserAPI.md)
- [WalletAPI](classes/WalletAPI.md)
- [WhitelistedUserAPI](classes/WhitelistedUserAPI.md)
- [WsAPI](classes/WsAPI.md)

### Interfaces

- [ABInfo](interfaces/ABInfo.md)
- [AccountInfo](interfaces/AccountInfo.md)
- [AmmPoolActivityRule](interfaces/AmmPoolActivityRule.md)
- [AmmPoolBalance](interfaces/AmmPoolBalance.md)
- [AmmPoolBalancesResponse](interfaces/AmmPoolBalancesResponse.md)
- [AmmPoolConfResponse](interfaces/AmmPoolConfResponse.md)
- [AmmPoolExitTokens](interfaces/AmmPoolExitTokens.md)
- [AmmPoolInfoV3](interfaces/AmmPoolInfoV3.md)
- [AmmPoolJoinTokens](interfaces/AmmPoolJoinTokens.md)
- [AmmPoolRequestPatch](interfaces/AmmPoolRequestPatch.md)
- [AmmPoolSnapshot](interfaces/AmmPoolSnapshot.md)
- [AmmPoolStat](interfaces/AmmPoolStat.md)
- [AmmPoolTrade](interfaces/AmmPoolTrade.md)
- [AmmPoolTx](interfaces/AmmPoolTx.md)
- [AmmPoolTxOld](interfaces/AmmPoolTxOld.md)
- [AmmTrade](interfaces/AmmTrade.md)
- [AmmUserReward](interfaces/AmmUserReward.md)
- [AmmUserRewardMap](interfaces/AmmUserRewardMap.md)
- [CancelMultiOrdersByClientOrderIdRequest](interfaces/CancelMultiOrdersByClientOrderIdRequest.md)
- [CancelMultiOrdersByHashRequest](interfaces/CancelMultiOrdersByHashRequest.md)
- [CancelOrderRequest](interfaces/CancelOrderRequest.md)
- [Candlestick](interfaces/Candlestick.md)
- [DepthData](interfaces/DepthData.md)
- [ExchangeInfo](interfaces/ExchangeInfo.md)
- [ExitAmmPoolRequest](interfaces/ExitAmmPoolRequest.md)
- [ExitAmmPoolResult](interfaces/ExitAmmPoolResult.md)
- [FeeRateInfo](interfaces/FeeRateInfo.md)
- [FiatPriceInfo](interfaces/FiatPriceInfo.md)
- [GameRankInfo](interfaces/GameRankInfo.md)
- [GetAccountRequest](interfaces/GetAccountRequest.md)
- [GetAccountServicesRequest](interfaces/GetAccountServicesRequest.md)
- [GetAllowancesRequest](interfaces/GetAllowancesRequest.md)
- [GetAmmAssetRequest](interfaces/GetAmmAssetRequest.md)
- [GetAmmPoolGameRankRequest](interfaces/GetAmmPoolGameRankRequest.md)
- [GetAmmPoolGameUserRankRequest](interfaces/GetAmmPoolGameUserRankRequest.md)
- [GetAmmPoolSnapshotRequest](interfaces/GetAmmPoolSnapshotRequest.md)
- [GetAmmPoolTradesRequest](interfaces/GetAmmPoolTradesRequest.md)
- [GetAmmPoolTxsRequest](interfaces/GetAmmPoolTxsRequest.md)
- [GetAmmUserRewardsRequest](interfaces/GetAmmUserRewardsRequest.md)
- [GetCandlestickRequest](interfaces/GetCandlestickRequest.md)
- [GetDepthRequest](interfaces/GetDepthRequest.md)
- [GetEthBalancesRequest](interfaces/GetEthBalancesRequest.md)
- [GetEthNonceRequest](interfaces/GetEthNonceRequest.md)
- [GetFiatPriceRequest](interfaces/GetFiatPriceRequest.md)
- [GetLiquidityMiningRequest](interfaces/GetLiquidityMiningRequest.md)
- [GetLiquidityMiningUserHistoryRequest](interfaces/GetLiquidityMiningUserHistoryRequest.md)
- [GetMarketTradesRequest](interfaces/GetMarketTradesRequest.md)
- [GetMinimumTokenAmtRequest](interfaces/GetMinimumTokenAmtRequest.md)
- [GetNFTOffchainFeeAmtRequest](interfaces/GetNFTOffchainFeeAmtRequest.md)
- [GetNextStorageIdRequest](interfaces/GetNextStorageIdRequest.md)
- [GetOffchainFeeAmtRequest](interfaces/GetOffchainFeeAmtRequest.md)
- [GetOrderDetailsRequest](interfaces/GetOrderDetailsRequest.md)
- [GetOrdersRequest](interfaces/GetOrdersRequest.md)
- [GetTickerRequest](interfaces/GetTickerRequest.md)
- [GetTokenBalancesRequest](interfaces/GetTokenBalancesRequest.md)
- [GetTokenPricesRequest](interfaces/GetTokenPricesRequest.md)
- [GetUserAmmPoolTxsRequest](interfaces/GetUserAmmPoolTxsRequest.md)
- [GetUserApiKeyRequest](interfaces/GetUserApiKeyRequest.md)
- [GetUserAssetsRequest](interfaces/GetUserAssetsRequest.md)
- [GetUserBalancesRequest](interfaces/GetUserBalancesRequest.md)
- [GetUserDepositHistoryRequest](interfaces/GetUserDepositHistoryRequest.md)
- [GetUserFeeRateRequest](interfaces/GetUserFeeRateRequest.md)
- [GetUserNFTBalancesRequest](interfaces/GetUserNFTBalancesRequest.md)
- [GetUserOnchainWithdrawalHistoryRequest](interfaces/GetUserOnchainWithdrawalHistoryRequest.md)
- [GetUserOrderFeeRateRequest](interfaces/GetUserOrderFeeRateRequest.md)
- [GetUserPwdResetTxsRequest](interfaces/GetUserPwdResetTxsRequest.md)
- [GetUserRegTxsRequest](interfaces/GetUserRegTxsRequest.md)
- [GetUserTradeAmount](interfaces/GetUserTradeAmount.md)
- [GetUserTradesRequest](interfaces/GetUserTradesRequest.md)
- [GetUserTransferListRequest](interfaces/GetUserTransferListRequest.md)
- [GetUserTxsRequest](interfaces/GetUserTxsRequest.md)
- [GetUserVIPInfoRequest](interfaces/GetUserVIPInfoRequest.md)
- [GetWithdrawalAgentsRequest](interfaces/GetWithdrawalAgentsRequest.md)
- [JoinAmmPoolRequest](interfaces/JoinAmmPoolRequest.md)
- [JoinAmmPoolResult](interfaces/JoinAmmPoolResult.md)
- [KeyPairParams](interfaces/KeyPairParams.md)
- [LoopringMap](interfaces/LoopringMap.md)
- [MarketInfo](interfaces/MarketInfo.md)
- [MarketTradeInfo](interfaces/MarketTradeInfo.md)
- [MarketsResponse](interfaces/MarketsResponse.md)
- [NFTMintRequestV3](interfaces/NFTMintRequestV3.md)
- [NFTTokenInfo](interfaces/NFTTokenInfo.md)
- [NFTWithdrawRequestV3](interfaces/NFTWithdrawRequestV3.md)
- [OffChainWithdrawalRequestV3](interfaces/OffChainWithdrawalRequestV3.md)
- [OffChainWithdrawalRequestV3WithPatch](interfaces/OffChainWithdrawalRequestV3WithPatch.md)
- [OffchainFeeInfo](interfaces/OffchainFeeInfo.md)
- [OrderDetail](interfaces/OrderDetail.md)
- [OrderInfo](interfaces/OrderInfo.md)
- [OrdersData](interfaces/OrdersData.md)
- [OriginNFTMINTRequestV3WithPatch](interfaces/OriginNFTMINTRequestV3WithPatch.md)
- [OriginNFTTransferRequestV3](interfaces/OriginNFTTransferRequestV3.md)
- [OriginNFTTransferRequestV3WithPatch](interfaces/OriginNFTTransferRequestV3WithPatch.md)
- [OriginNFTWithdrawRequestV3WithPatch](interfaces/OriginNFTWithdrawRequestV3WithPatch.md)
- [OriginTransferRequestV3](interfaces/OriginTransferRequestV3.md)
- [OriginTransferRequestV3WithPatch](interfaces/OriginTransferRequestV3WithPatch.md)
- [PooledMap](interfaces/PooledMap.md)
- [PooledToken](interfaces/PooledToken.md)
- [PublicKey](interfaces/PublicKey.md)
- [QuotesData](interfaces/QuotesData.md)
- [ReqOptions](interfaces/ReqOptions.md)
- [ReqParams](interfaces/ReqParams.md)
- [RewardItem](interfaces/RewardItem.md)
- [SetReferrerRequest](interfaces/SetReferrerRequest.md)
- [SubmitOrderRequestV3](interfaces/SubmitOrderRequestV3.md)
- [TickerData](interfaces/TickerData.md)
- [TokenAmount](interfaces/TokenAmount.md)
- [TokenInfo](interfaces/TokenInfo.md)
- [TokenPriceInfo](interfaces/TokenPriceInfo.md)
- [TokenRelatedInfo](interfaces/TokenRelatedInfo.md)
- [TokenVolumeNFT](interfaces/TokenVolumeNFT.md)
- [TokenVolumeV3](interfaces/TokenVolumeV3.md)
- [TokenVolumeV4](interfaces/TokenVolumeV4.md)
- [TokensResponse](interfaces/TokensResponse.md)
- [TradesData](interfaces/TradesData.md)
- [UpdateAccountRequestV3](interfaces/UpdateAccountRequestV3.md)
- [UpdateAccountRequestV3WithPatch](interfaces/UpdateAccountRequestV3WithPatch.md)
- [UpdateUserApiKeyRequest](interfaces/UpdateUserApiKeyRequest.md)
- [UserAmmPoolTx](interfaces/UserAmmPoolTx.md)
- [UserAssetInfo](interfaces/UserAssetInfo.md)
- [UserBalanceInfo](interfaces/UserBalanceInfo.md)
- [UserDepositHistoryTx](interfaces/UserDepositHistoryTx.md)
- [UserFeeRateInfo](interfaces/UserFeeRateInfo.md)
- [UserMiningInfo](interfaces/UserMiningInfo.md)
- [UserNFTBalanceInfo](interfaces/UserNFTBalanceInfo.md)
- [UserNFTDepositHistoryTx](interfaces/UserNFTDepositHistoryTx.md)
- [UserNFTTransferHistoryTx](interfaces/UserNFTTransferHistoryTx.md)
- [UserNFTWithdrawalHistoryTx](interfaces/UserNFTWithdrawalHistoryTx.md)
- [UserOnchainWithdrawalHistoryTx](interfaces/UserOnchainWithdrawalHistoryTx.md)
- [UserPwdResetTx](interfaces/UserPwdResetTx.md)
- [UserRegTx](interfaces/UserRegTx.md)
- [UserTrade](interfaces/UserTrade.md)
- [UserTrades](interfaces/UserTrades.md)
- [UserTransferRecord](interfaces/UserTransferRecord.md)
- [UserTx](interfaces/UserTx.md)
- [VipFeeRateInfo](interfaces/VipFeeRateInfo.md)
- [WsAccount](interfaces/WsAccount.md)
- [WsOrder](interfaces/WsOrder.md)
- [WsProps](interfaces/WsProps.md)
- [getLatestTokenPricesRequest](interfaces/getLatestTokenPricesRequest.md)
- [getUserVIPAssetsRequest](interfaces/getUserVIPAssetsRequest.md)

### Type aliases

- [GetUserNFTDepositHistoryRequest](modules.md#getusernftdeposithistoryrequest)
- [GetUserNFTTransferHistoryRequest](modules.md#getusernfttransferhistoryrequest)
- [GetUserNFTWithdrawalHistoryRequest](modules.md#getusernftwithdrawalhistoryrequest)
- [NftData](modules.md#nftdata)
- [VipFeeRateInfoMap](modules.md#vipfeerateinfomap)

### Properties

- [contractWallet\_abi](modules.md#contractwallet_abi)
- [deposit\_abi](modules.md#deposit_abi)
- [erc20\_abi](modules.md#erc20_abi)
- [exchange\_abi](modules.md#exchange_abi)
- [hebao\_abi](modules.md#hebao_abi)

### Variables

- [ApproveVal](modules.md#approveval)
- [ConnectorError](modules.md#connectorerror)
- [DEFAULT\_TIMEOUT](modules.md#default_timeout)
- [NetworkContextName](modules.md#networkcontextname)
- [VALID\_UNTIL](modules.md#valid_until)

### Functions

- [addHexPrefix](modules.md#addhexprefix)
- [ammPoolCalc](modules.md#ammpoolcalc)
- [approve](modules.md#approve)
- [approveMax](modules.md#approvemax)
- [approveZero](modules.md#approvezero)
- [clearHexPrefix](modules.md#clearhexprefix)
- [convertPublicKey](modules.md#convertpublickey)
- [convertPublicKey2](modules.md#convertpublickey2)
- [deposit](modules.md#deposit)
- [dumpError400](modules.md#dumperror400)
- [eddsaSign](modules.md#eddsasign)
- [forceWithdrawal](modules.md#forcewithdrawal)
- [formatAddress](modules.md#formataddress)
- [formatEddsaKey](modules.md#formateddsakey)
- [formatKey](modules.md#formatkey)
- [fromGWEI](modules.md#fromgwei)
- [fromWEI](modules.md#fromwei)
- [genErr](modules.md#generr)
- [genExchangeData](modules.md#genexchangedata)
- [generateKeyPair](modules.md#generatekeypair)
- [getAccountArg](modules.md#getaccountarg)
- [getAmmExitEcdsaTypedData](modules.md#getammexitecdsatypeddata)
- [getAmmJoinEcdsaTypedData](modules.md#getammjoinecdsatypeddata)
- [getAmmpoolArg](modules.md#getammpoolarg)
- [getBaseQuote](modules.md#getbasequote)
- [getCandlestickArg](modules.md#getcandlestickarg)
- [getCurPrice](modules.md#getcurprice)
- [getDisplaySymbol](modules.md#getdisplaysymbol)
- [getEcDSASig](modules.md#getecdsasig)
- [getEdDSASig](modules.md#geteddsasig)
- [getEdDSASigWithPoseidon](modules.md#geteddsasigwithposeidon)
- [getExistedMarket](modules.md#getexistedmarket)
- [getMidPrice](modules.md#getmidprice)
- [getMinReceived](modules.md#getminreceived)
- [getMixOrderArg](modules.md#getmixorderarg)
- [getNFTMintTypedData](modules.md#getnftminttypeddata)
- [getNFTTransferTypedData](modules.md#getnfttransfertypeddata)
- [getNFTWithdrawTypedData](modules.md#getnftwithdrawtypeddata)
- [getNftData](modules.md#getnftdata)
- [getNonce](modules.md#getnonce)
- [getOrderArg](modules.md#getorderarg)
- [getOrderBookArg](modules.md#getorderbookarg)
- [getOutputAmount](modules.md#getoutputamount)
- [getPair](modules.md#getpair)
- [getPriceImpact](modules.md#getpriceimpact)
- [getReserveInfo](modules.md#getreserveinfo)
- [getTickerArg](modules.md#gettickerarg)
- [getToPrice](modules.md#gettoprice)
- [getToken](modules.md#gettoken)
- [getTokenInfoById](modules.md#gettokeninfobyid)
- [getTokenInfoBySymbol](modules.md#gettokeninfobysymbol)
- [getTokenInfoByToken](modules.md#gettokeninfobytoken)
- [getTradeArg](modules.md#gettradearg)
- [getTransferTypedData](modules.md#gettransfertypeddata)
- [getUpdateAccountEcdsaTypedData](modules.md#getupdateaccountecdsatypeddata)
- [getWithdrawTypedData](modules.md#getwithdrawtypeddata)
- [get\_EddsaSig\_ExitAmmPool](modules.md#get_eddsasig_exitammpool)
- [get\_EddsaSig\_JoinAmmPool](modules.md#get_eddsasig_joinammpool)
- [get\_EddsaSig\_NFT\_Mint](modules.md#get_eddsasig_nft_mint)
- [get\_EddsaSig\_NFT\_Transfer](modules.md#get_eddsasig_nft_transfer)
- [get\_EddsaSig\_NFT\_Withdraw](modules.md#get_eddsasig_nft_withdraw)
- [get\_EddsaSig\_OffChainWithdraw](modules.md#get_eddsasig_offchainwithdraw)
- [get\_EddsaSig\_Transfer](modules.md#get_eddsasig_transfer)
- [hasMarket](modules.md#hasmarket)
- [isEmpty](modules.md#isempty)
- [makeExitAmmPoolRequest](modules.md#makeexitammpoolrequest)
- [makeExitAmmPoolRequest2](modules.md#makeexitammpoolrequest2)
- [makeJoinAmmPoolRequest](modules.md#makejoinammpoolrequest)
- [numberWithCommas](modules.md#numberwithcommas)
- [padLeftEven](modules.md#padlefteven)
- [sendRawTx](modules.md#sendrawtx)
- [sendTransaction](modules.md#sendtransaction)
- [sign](modules.md#sign)
- [signEip712](modules.md#signeip712)
- [signEip712WalletConnect](modules.md#signeip712walletconnect)
- [signEthereumTx](modules.md#signethereumtx)
- [signNFTMintWithDataStructure](modules.md#signnftmintwithdatastructure)
- [signNFTMintWithDataStructureForContract](modules.md#signnftmintwithdatastructureforcontract)
- [signNFTMintWithoutDataStructure](modules.md#signnftmintwithoutdatastructure)
- [signNFTTransferWithDataStructureForContract](modules.md#signnfttransferwithdatastructureforcontract)
- [signNFTTransferWithoutDataStructure](modules.md#signnfttransferwithoutdatastructure)
- [signNFTWithdrawWithDataStructure](modules.md#signnftwithdrawwithdatastructure)
- [signNFTWithdrawWithDataStructureForContract](modules.md#signnftwithdrawwithdatastructureforcontract)
- [signNFTWithdrawWithoutDataStructure](modules.md#signnftwithdrawwithoutdatastructure)
- [signOffchainWithdrawWithDataStructure](modules.md#signoffchainwithdrawwithdatastructure)
- [signOffchainWithdrawWithDataStructureForContract](modules.md#signoffchainwithdrawwithdatastructureforcontract)
- [signOffchainWithdrawWithoutDataStructure](modules.md#signoffchainwithdrawwithoutdatastructure)
- [signTNFTransferWithDataStructure](modules.md#signtnftransferwithdatastructure)
- [signTransferWithDataStructure](modules.md#signtransferwithdatastructure)
- [signTransferWithDataStructureForContract](modules.md#signtransferwithdatastructureforcontract)
- [signTransferWithoutDataStructure](modules.md#signtransferwithoutdatastructure)
- [signUpdateAccountWithDataStructure](modules.md#signupdateaccountwithdatastructure)
- [signUpdateAccountWithDataStructureForContract](modules.md#signupdateaccountwithdatastructureforcontract)
- [signUpdateAccountWithoutDataStructure](modules.md#signupdateaccountwithoutdatastructure)
- [sleep](modules.md#sleep)
- [toBN](modules.md#tobn)
- [toBig](modules.md#tobig)
- [toBuffer](modules.md#tobuffer)
- [toFixed](modules.md#tofixed)
- [toGWEI](modules.md#togwei)
- [toHex](modules.md#tohex)
- [toNumber](modules.md#tonumber)
- [toWEI](modules.md#towei)
- [updatePriceImpact\_new](modules.md#updatepriceimpact_new)
- [zeroPad](modules.md#zeropad)

## Type aliases

### GetUserNFTDepositHistoryRequest

Ƭ **GetUserNFTDepositHistoryRequest**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `accountId` | `number` |
| `end?` | `number` |
| `hashes?` | `string` |
| `limit?` | `number` |
| `nftData?` | `string` |
| `start?` | `number` |
| `startId?` | `number` |
| `txStatus?` | `string` |

#### Defined in

[defs/loopring_defs.ts:1893](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/defs/loopring_defs.ts#L1893)

___

### GetUserNFTTransferHistoryRequest

Ƭ **GetUserNFTTransferHistoryRequest**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `accountId` | `number` |
| `end?` | `number` |
| `hashes?` | `string` |
| `limit?` | `number` |
| `nftData?` | `string` |
| `start?` | `number` |
| `txStatus?` | `string` |

#### Defined in

[defs/loopring_defs.ts:1881](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/defs/loopring_defs.ts#L1881)

___

### GetUserNFTWithdrawalHistoryRequest

Ƭ **GetUserNFTWithdrawalHistoryRequest**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `accountId` | `number` |
| `end?` | `number` |
| `hashes?` | `string` |
| `limit?` | `number` |
| `nftData?` | `string` |
| `start?` | `number` |
| `startId?` | `number` |
| `txStatus?` | `string` |

#### Defined in

[defs/loopring_defs.ts:1904](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/defs/loopring_defs.ts#L1904)

___

### NftData

Ƭ **NftData**: `string`

#### Defined in

[defs/loopring_defs.ts:1869](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/defs/loopring_defs.ts#L1869)

___

### VipFeeRateInfoMap

Ƭ **VipFeeRateInfoMap**: `Object`

#### Index signature

▪ [key: `string`]: [`VipFeeRateInfo`](interfaces/VipFeeRateInfo.md)

#### Defined in

[defs/loopring_defs.ts:36](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/defs/loopring_defs.ts#L36)

## Properties

### contractWallet\_abi

• **contractWallet\_abi**: ({ `constant`: `undefined` = true; `inputs`: { `internalType`: `string` = "bytes"; `name`: `string` = "\_data"; `type`: `string` = "bytes" }[] ; `name`: `string` = "isValidSignature"; `outputs`: { `internalType`: `string` = "bytes4"; `name`: `string` = "magicValue"; `type`: `string` = "bytes4" }[] ; `payable`: `undefined` = false; `stateMutability`: `string` = "view"; `type`: `string` = "function" } \| { `constant`: `boolean` = true; `inputs`: { `name`: `string` = "\_account"; `type`: `string` = "address" }[] ; `name`: `string` = "getKeyData"; `outputs`: { `name`: `string` = ""; `type`: `string` = "address" }[] ; `payable`: `boolean` = false; `stateMutability`: `string` = "view"; `type`: `string` = "function" })[]

___

### deposit\_abi

• **deposit\_abi**: ({ `anonymous`: `boolean` = false; `inputs`: { `indexed`: `boolean` = true; `internalType`: `string` = "address"; `name`: `string` = "token"; `type`: `string` = "address" }[] ; `name`: `string` = "CheckBalance"; `outputs`: `undefined` ; `stateMutability`: `undefined` = "payable"; `type`: `string` = "event" } \| { `anonymous`: `undefined` = false; `inputs`: { `internalType`: `string` = "address"; `name`: `string` = "from"; `type`: `string` = "address" }[] ; `name`: `string` = "deposit"; `outputs`: { `internalType`: `string` = "uint96"; `name`: `string` = "amountReceived"; `type`: `string` = "uint96" }[] ; `stateMutability`: `string` = "payable"; `type`: `string` = "function" })[]

___

### erc20\_abi

• **erc20\_abi**: ({ `anonymous`: `undefined` = false; `constant`: `boolean` = false; `inputs`: { `name`: `string` = "\_spender"; `type`: `string` = "address" }[] ; `name`: `string` = "approve"; `outputs`: { `name`: `string` = ""; `type`: `string` = "bool" }[] ; `payable`: `boolean` = false; `stateMutability`: `string` = "nonpayable"; `type`: `string` = "function" } \| { `anonymous`: `undefined` = false; `constant`: `undefined` = true; `inputs`: `undefined` ; `name`: `undefined` = "Approval"; `outputs`: `undefined` ; `payable`: `boolean` = true; `stateMutability`: `string` = "payable"; `type`: `string` = "fallback" } \| { `anonymous`: `boolean` = false; `constant`: `undefined` = true; `inputs`: { `indexed`: `boolean` = true; `name`: `string` = "owner"; `type`: `string` = "address" }[] ; `name`: `string` = "Approval"; `outputs`: `undefined` ; `payable`: `undefined` = false; `stateMutability`: `undefined` = "payable"; `type`: `string` = "event" })[]

___

### exchange\_abi

• **exchange\_abi**: { `inputs`: { `internalType`: `string` = "address"; `name`: `string` = "owner"; `type`: `string` = "address" }[] ; `name`: `string` = "getAmountWithdrawable"; `outputs`: { `internalType`: `string` = "uint256"; `name`: `string` = ""; `type`: `string` = "uint256" }[] ; `stateMutability`: `string` = "view"; `type`: `string` = "function" }[]

___

### hebao\_abi

• **hebao\_abi**: { `inputs`: { `internalType`: `string` = "address"; `name`: `string` = "wallet"; `type`: `string` = "address" }[] ; `name`: `string` = "lock"; `outputs`: `never`[] = []; `stateMutability`: `string` = "nonpayable"; `type`: `string` = "function" }[]

## Variables

### ApproveVal

• **ApproveVal**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Max` | `string` |
| `Zero` | `string` |

#### Defined in

[api/contract_api.ts:22](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/contract_api.ts#L22)

___

### ConnectorError

• **ConnectorError**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `NOT_SUPPORT_ERROR` | `string` |
| `USER_DENIED` | `string` |

#### Defined in

[defs/error_codes.ts:48](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/defs/error_codes.ts#L48)

___

### DEFAULT\_TIMEOUT

• **DEFAULT\_TIMEOUT**: ``30000``

#### Defined in

[defs/loopring_constants.ts:3](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/defs/loopring_constants.ts#L3)

___

### NetworkContextName

• **NetworkContextName**: ``"NETWORK"``

#### Defined in

[defs/web3_defs.ts:6](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/defs/web3_defs.ts#L6)

___

### VALID\_UNTIL

• **VALID\_UNTIL**: ``1700000000``

#### Defined in

[defs/loopring_constants.ts:1](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/defs/loopring_constants.ts#L1)

## Functions

### addHexPrefix

▸ **addHexPrefix**(`input`): `string`

Returns hex string with '0x' prefix

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `any` |

#### Returns

`string`

#### Defined in

[utils/formatter.ts:169](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/utils/formatter.ts#L169)

___

### ammPoolCalc

▸ **ammPoolCalc**(`rawVal`, `isAtoB`, `coinA`, `coinB`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rawVal` | `string` |
| `isAtoB` | `boolean` |
| `coinA` | [`TokenVolumeV3`](interfaces/TokenVolumeV3.md) |
| `coinB` | [`TokenVolumeV3`](interfaces/TokenVolumeV3.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `output` | `string` |
| `ratio` | `BigNumber` |

#### Defined in

[utils/swap_calc_utils.ts:621](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/utils/swap_calc_utils.ts#L621)

___

### approve

▸ **approve**(`web3`, `from`, `to`, `depositAddress`, `_value`, `chainId`, `nonce`, `gasPrice`, `gasLimit`, `sendByMetaMask`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `web3` | `default` |
| `from` | `string` |
| `to` | `string` |
| `depositAddress` | `string` |
| `_value` | `string` |
| `chainId` | [`ChainId`](enums/ChainId.md) |
| `nonce` | `number` |
| `gasPrice` | `number` |
| `gasLimit` | `number` |
| `sendByMetaMask` | `boolean` |

#### Returns

`Promise`<`any`\>

#### Defined in

[api/contract_api.ts:187](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/contract_api.ts#L187)

___

### approveMax

▸ **approveMax**(`web3`, `owner`, `tokenAddress`, `depositAddress`, `gasPrice`, `gasLimit`, `chainId?`, `nonce`, `sendByMetaMask?`): `Promise`<`any`\>

Approve Max

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `web3` | `any` | `undefined` |
| `owner` | `string` | `undefined` |
| `tokenAddress` | `string` | `undefined` |
| `depositAddress` | `string` | `undefined` |
| `gasPrice` | `number` | `undefined` |
| `gasLimit` | `number` | `undefined` |
| `chainId` | [`ChainId`](enums/ChainId.md) | `ChainId.GOERLI` |
| `nonce` | `number` | `undefined` |
| `sendByMetaMask` | `boolean` | `false` |

#### Returns

`Promise`<`any`\>

#### Defined in

[api/contract_api.ts:232](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/contract_api.ts#L232)

___

### approveZero

▸ **approveZero**(`web3`, `owner`, `tokenAddress`, `depositAddress`, `gasPrice`, `gasLimit`, `chainId?`, `nonce`, `sendByMetaMask?`): `Promise`<`any`\>

Approve Zero

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `web3` | `any` | `undefined` |
| `owner` | `string` | `undefined` |
| `tokenAddress` | `string` | `undefined` |
| `depositAddress` | `string` | `undefined` |
| `gasPrice` | `number` | `undefined` |
| `gasLimit` | `number` | `undefined` |
| `chainId` | [`ChainId`](enums/ChainId.md) | `ChainId.GOERLI` |
| `nonce` | `number` | `undefined` |
| `sendByMetaMask` | `boolean` | `false` |

#### Returns

`Promise`<`any`\>

#### Defined in

[api/contract_api.ts:207](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/contract_api.ts#L207)

___

### clearHexPrefix

▸ **clearHexPrefix**(`input`): `string`

Returns hex string without '0x' prefix

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `any` | string |

#### Returns

`string`

#### Defined in

[utils/formatter.ts:181](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/utils/formatter.ts#L181)

___

### convertPublicKey

▸ **convertPublicKey**(`pk`): `BN`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pk` | [`PublicKey`](interfaces/PublicKey.md) |

#### Returns

`BN`

#### Defined in

[api/sign/sign_tools.ts:359](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/sign/sign_tools.ts#L359)

___

### convertPublicKey2

▸ **convertPublicKey2**(`pk`): `BN`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pk` | [`PublicKey`](interfaces/PublicKey.md) |

#### Returns

`BN`

#### Defined in

[api/sign/sign_tools.ts:355](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/sign/sign_tools.ts#L355)

___

### deposit

▸ **deposit**(`web3`, `from`, `exchangeAddress`, `token`, `value`, `fee`, `gasPrice`, `gasLimit`, `chainId?`, `nonce`, `sendByMetaMask?`): `Promise`<`any`\>

deposit

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `web3` | `any` | `undefined` |
| `from` | `string` | `undefined` |
| `exchangeAddress` | `string` | `undefined` |
| `token` | [`TokenInfo`](interfaces/TokenInfo.md) | `undefined` |
| `value` | `number` | `undefined` |
| `fee` | `number` | `undefined` |
| `gasPrice` | `number` | `undefined` |
| `gasLimit` | `number` | `undefined` |
| `chainId` | [`ChainId`](enums/ChainId.md) | `ChainId.GOERLI` |
| `nonce` | `number` | `undefined` |
| `sendByMetaMask` | `boolean` | `true` |

#### Returns

`Promise`<`any`\>

#### Defined in

[api/contract_api.ts:253](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/contract_api.ts#L253)

___

### dumpError400

▸ `Const` **dumpError400**(`reason`, `src?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `reason` | `any` | `undefined` |
| `src` | `string` | `''` |

#### Returns

`void`

#### Defined in

[utils/network_tools.ts:1](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/utils/network_tools.ts#L1)

___

### eddsaSign

▸ **eddsaSign**(`typedData`, `eddsaKey`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `typedData` | `any` |
| `eddsaKey` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `eddsaSig` | `string` |

#### Defined in

[api/sign/sign_tools.ts:899](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/sign/sign_tools.ts#L899)

___

### forceWithdrawal

▸ **forceWithdrawal**(`web3`, `from`, `accountID`, `exchangeAddress`, `token`, `fee`, `gasPrice`, `gasLimit`, `chainId?`, `nonce`, `sendByMetaMask?`): `Promise`<`any`\>

forceWithdrawal

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `web3` | `any` | `undefined` |
| `from` | `string` | `undefined` |
| `accountID` | `number` | `undefined` |
| `exchangeAddress` | `string` | `undefined` |
| `token` | [`TokenInfo`](interfaces/TokenInfo.md) | `undefined` |
| `fee` | `number` | `undefined` |
| `gasPrice` | `number` | `undefined` |
| `gasLimit` | `number` | `undefined` |
| `chainId` | [`ChainId`](enums/ChainId.md) | `ChainId.GOERLI` |
| `nonce` | `number` | `undefined` |
| `sendByMetaMask` | `boolean` | `false` |

#### Returns

`Promise`<`any`\>

#### Defined in

[api/contract_api.ts:293](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/contract_api.ts#L293)

___

### formatAddress

▸ **formatAddress**(`mixed`): `string`

Returns hex string of a given address

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mixed` | `any` | Buffer \| string |

#### Returns

`string`

#### Defined in

[utils/formatter.ts:151](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/utils/formatter.ts#L151)

___

### formatEddsaKey

▸ **formatEddsaKey**(`key`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `any` |

#### Returns

`string`

#### Defined in

[utils/formatter.ts:242](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/utils/formatter.ts#L242)

___

### formatKey

▸ **formatKey**(`mixed`): `string`

Returns formatted hex string of a given private key

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mixed` | `any` | Buffer\| string |

#### Returns

`string`

#### Defined in

[utils/formatter.ts:135](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/utils/formatter.ts#L135)

___

### fromGWEI

▸ **fromGWEI**(`value`): `BigNumber`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `any` | number \| BigNumber \| Buffer \| string |

#### Returns

`BigNumber`

#### Defined in

[utils/formatter.ts:117](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/utils/formatter.ts#L117)

___

### fromWEI

▸ **fromWEI**(`tokens`, `symbol`, `valueInWEI`, `precision?`, `ceil?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokens` | `any` |
| `symbol` | `any` |
| `valueInWEI` | `any` |
| `precision?` | `any` |
| `ceil?` | `any` |

#### Returns

`string`

#### Defined in

[utils/swap_calc_utils.ts:39](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/utils/swap_calc_utils.ts#L39)

___

### genErr

▸ **genErr**(`err`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `any` |

#### Returns

`any`

#### Defined in

[api/user_api.ts:20](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/user_api.ts#L20)

___

### genExchangeData

▸ **genExchangeData**(`method`, `data`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `method` | `string` |
| `data` | `any` |

#### Returns

`any`

#### Defined in

[api/contract_api.ts:183](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/contract_api.ts#L183)

___

### generateKeyPair

▸ **generateKeyPair**(`__namedParameters`): `Promise`<{ `formatedPx`: `string` ; `formatedPy`: `string` ; `keyPair`: { `publicKeyX`: `any` ; `publicKeyY`: `any` ; `secretKey`: `any`  } ; `sk`: `string`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`KeyPairParams`](interfaces/KeyPairParams.md) |

#### Returns

`Promise`<{ `formatedPx`: `string` ; `formatedPy`: `string` ; `keyPair`: { `publicKeyX`: `any` ; `publicKeyY`: `any` ; `secretKey`: `any`  } ; `sk`: `string`  }\>

#### Defined in

[api/sign/sign_tools.ts:58](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/sign/sign_tools.ts#L58)

___

### getAccountArg

▸ `Const` **getAccountArg**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `topic` | [`WsTopicType`](enums/WsTopicType.md) |

#### Defined in

[defs/ws_defs.ts:25](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/defs/ws_defs.ts#L25)

___

### getAmmExitEcdsaTypedData

▸ **getAmmExitEcdsaTypedData**(`data`, `patch`): `EIP712TypedData`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`ExitAmmPoolRequest`](interfaces/ExitAmmPoolRequest.md) |
| `patch` | [`AmmPoolRequestPatch`](interfaces/AmmPoolRequestPatch.md) |

#### Returns

`EIP712TypedData`

#### Defined in

[api/sign/sign_tools.ts:967](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/sign/sign_tools.ts#L967)

___

### getAmmJoinEcdsaTypedData

▸ **getAmmJoinEcdsaTypedData**(`data`, `patch`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`JoinAmmPoolRequest`](interfaces/JoinAmmPoolRequest.md) |
| `patch` | [`AmmPoolRequestPatch`](interfaces/AmmPoolRequestPatch.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `domain` | `Object` |
| `domain.chainId` | [`ChainId`](enums/ChainId.md) |
| `domain.name` | `string` |
| `domain.verifyingContract` | `string` |
| `domain.version` | `string` |
| `message` | `Object` |
| `message.fee` | `string` |
| `message.joinAmounts` | `string`[] |
| `message.joinStorageIDs` | `number`[] |
| `message.mintMinAmount` | `string` |
| `message.owner` | `string` |
| `message.validUntil` | `undefined` \| `number` |
| `primaryType` | `string` |
| `types` | `Object` |
| `types.EIP712Domain` | { `name`: `string` = 'name'; `type`: `string` = 'string' }[] |
| `types.PoolJoin` | { `name`: `string` = 'owner'; `type`: `string` = 'address' }[] |

#### Defined in

[api/sign/sign_tools.ts:921](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/sign/sign_tools.ts#L921)

___

### getAmmpoolArg

▸ `Const` **getAmmpoolArg**(`poolAddress`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `poolAddress` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `poolAddress` | `string` |
| `snapshot` | `boolean` |
| `topic` | [`WsTopicType`](enums/WsTopicType.md) |

#### Defined in

[defs/ws_defs.ts:107](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/defs/ws_defs.ts#L107)

___

### getBaseQuote

▸ **getBaseQuote**(`symbol`): { `base`: `undefined` = undefined; `quote`: `undefined` = undefined } \| { `base`: `string` ; `quote`: `string`  }

#### Parameters

| Name | Type |
| :------ | :------ |
| `symbol` | `string` |

#### Returns

{ `base`: `undefined` = undefined; `quote`: `undefined` = undefined } \| { `base`: `string` ; `quote`: `string`  }

#### Defined in

[utils/symbol_tools.ts:7](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/utils/symbol_tools.ts#L7)

___

### getCandlestickArg

▸ `Const` **getCandlestickArg**(`market`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `market` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `market` | `string` |
| `topic` | [`WsTopicType`](enums/WsTopicType.md) |

#### Defined in

[defs/ws_defs.ts:100](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/defs/ws_defs.ts#L100)

___

### getCurPrice

▸ **getCurPrice**(`reserveIn`, `reserveOut`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `reserveIn` | `string` |
| `reserveOut` | `string` |

#### Returns

`string`

#### Defined in

[utils/swap_calc_utils.ts:342](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/utils/swap_calc_utils.ts#L342)

___

### getDisplaySymbol

▸ **getDisplaySymbol**(`settingsCurrency`): ``""`` \| ``"￥"`` \| ``"$"``

Returns symbol of a given kind of currency

#### Parameters

| Name | Type |
| :------ | :------ |
| `settingsCurrency` | `any` |

#### Returns

``""`` \| ``"￥"`` \| ``"$"``

#### Defined in

[utils/formatter.ts:202](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/utils/formatter.ts#L202)

___

### getEcDSASig

▸ **getEcDSASig**(`web3`, `typedData`, `address`, `type`, `pwd?`, `walletType?`): `Promise`<{ `ecdsaSig`: `any` = response.result }\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `web3` | `any` | `undefined` |
| `typedData` | `any` | `undefined` |
| `address` | `undefined` \| `string` | `undefined` |
| `type` | [`GetEcDSASigType`](enums/GetEcDSASigType.md) | `undefined` |
| `pwd` | `string` | `''` |
| `walletType?` | [`ConnectorNames`](enums/ConnectorNames.md) | `undefined` |

#### Returns

`Promise`<{ `ecdsaSig`: `any` = response.result }\>

#### Defined in

[api/sign/sign_tools.ts:272](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/sign/sign_tools.ts#L272)

___

### getEdDSASig

▸ **getEdDSASig**(`method`, `basePath`, `api_url`, `requestInfo`, `PrivateKey`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `method` | `string` |
| `basePath` | `string` |
| `api_url` | `string` |
| `requestInfo` | `any` |
| `PrivateKey` | `undefined` \| `string` |

#### Returns

`string`

#### Defined in

[api/sign/sign_tools.ts:173](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/sign/sign_tools.ts#L173)

___

### getEdDSASigWithPoseidon

▸ `Const` **getEdDSASigWithPoseidon**(`inputs`, `PrivateKey`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `inputs` | `any` |
| `PrivateKey` | `undefined` \| `string` |

#### Returns

`string`

#### Defined in

[api/sign/sign_tools.ts:203](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/sign/sign_tools.ts#L203)

___

### getExistedMarket

▸ `Const` **getExistedMarket**(`marketArr`, `base`, `quote`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `marketArr` | `any` |
| `base` | `undefined` \| `string` |
| `quote` | `undefined` \| `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `amm` | `undefined` \| `string` |
| `baseShow` | `any` |
| `market` | `any` |
| `quoteShow` | `any` |

#### Defined in

[utils/symbol_tools.ts:93](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/utils/symbol_tools.ts#L93)

___

### getMidPrice

▸ **getMidPrice**(`__namedParameters`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters._asks` | `any` |
| `__namedParameters._bids` | `any` |
| `__namedParameters.askReverse?` | `boolean` |
| `__namedParameters.bidReverse?` | `boolean` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `asks` | `Object` |
| `asks.ab_amtTotals` | `string`[] |
| `asks.ab_arr` | [`ABInfo`](interfaces/ABInfo.md)[] |
| `asks.ab_prices` | `number`[] |
| `asks.ab_volTotals` | `string`[] |
| `asks.amtTotal` | `BigNumber` |
| `asks.best` | `number` |
| `asks.volTotal` | `BigNumber` |
| `bids` | `Object` |
| `bids.ab_amtTotals` | `string`[] |
| `bids.ab_arr` | [`ABInfo`](interfaces/ABInfo.md)[] |
| `bids.ab_prices` | `number`[] |
| `bids.ab_volTotals` | `string`[] |
| `bids.amtTotal` | `BigNumber` |
| `bids.best` | `number` |
| `bids.volTotal` | `BigNumber` |
| `mid_price` | `number` |

#### Defined in

[api/exchange_api.ts:120](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/exchange_api.ts#L120)

___

### getMinReceived

▸ **getMinReceived**(`amountBOut`, `minimumDecimal`, `slipBips`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `amountBOut` | `string` |
| `minimumDecimal` | `number` |
| `slipBips` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `minReceived` | `string` |
| `minReceivedVal` | `string` |
| `minimumDecimal` | `number` |

#### Defined in

[utils/swap_calc_utils.ts:612](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/utils/swap_calc_utils.ts#L612)

___

### getMixOrderArg

▸ `Const` **getMixOrderArg**(`__namedParameters`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.count?` | `number` |
| `__namedParameters.level` | `number` |
| `__namedParameters.market` | `string` |
| `__namedParameters.showOverlap?` | `boolean` |
| `__namedParameters.snapshot?` | `boolean` |

#### Returns

`any`

#### Defined in

[defs/ws_defs.ts:62](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/defs/ws_defs.ts#L62)

___

### getNFTMintTypedData

▸ **getNFTMintTypedData**(`data`, `chainId`): `EIP712TypedData`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`NFTMintRequestV3`](interfaces/NFTMintRequestV3.md) |
| `chainId` | [`ChainId`](enums/ChainId.md) |

#### Returns

`EIP712TypedData`

#### Defined in

[api/sign/sign_tools.ts:660](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/sign/sign_tools.ts#L660)

___

### getNFTTransferTypedData

▸ **getNFTTransferTypedData**(`data`, `chainId`): `EIP712TypedData`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`OriginNFTTransferRequestV3`](interfaces/OriginNFTTransferRequestV3.md) |
| `chainId` | [`ChainId`](enums/ChainId.md) |

#### Returns

`EIP712TypedData`

#### Defined in

[api/sign/sign_tools.ts:830](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/sign/sign_tools.ts#L830)

___

### getNFTWithdrawTypedData

▸ **getNFTWithdrawTypedData**(`data`, `chainId`): `EIP712TypedData`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`NFTWithdrawRequestV3`](interfaces/NFTWithdrawRequestV3.md) |
| `chainId` | [`ChainId`](enums/ChainId.md) |

#### Returns

`EIP712TypedData`

#### Defined in

[api/sign/sign_tools.ts:559](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/sign/sign_tools.ts#L559)

___

### getNftData

▸ **getNftData**(`request`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`NFTMintRequestV3`](interfaces/NFTMintRequestV3.md) |

#### Returns

`any`

#### Defined in

[api/sign/sign_tools.ts:644](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/sign/sign_tools.ts#L644)

___

### getNonce

▸ **getNonce**(`web3`, `addr`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `web3` | `default` |
| `addr` | `string` |

#### Returns

`Promise`<`number`\>

#### Defined in

[api/contract_api.ts:137](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/contract_api.ts#L137)

___

### getOrderArg

▸ `Const` **getOrderArg**(`market`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `market` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `market` | `string` |
| `topic` | [`WsTopicType`](enums/WsTopicType.md) |

#### Defined in

[defs/ws_defs.ts:38](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/defs/ws_defs.ts#L38)

___

### getOrderBookArg

▸ `Const` **getOrderBookArg**(`__namedParameters`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.count?` | `number` |
| `__namedParameters.level` | `number` |
| `__namedParameters.market` | `string` |
| `__namedParameters.showOverlap?` | `boolean` |
| `__namedParameters.snapshot?` | `boolean` |
| `__namedParameters.topic?` | `string` |

#### Returns

`any`

#### Defined in

[defs/ws_defs.ts:68](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/defs/ws_defs.ts#L68)

___

### getOutputAmount

▸ **getOutputAmount**(`__namedParameters`): `undefined` \| { `amountBOut`: `string` ; `amountBOutSlip`: { `minReceived`: `string` ; `minReceivedVal`: `string` ; `minimumDecimal`: `number`  } ; `amountBOutWithoutFee`: `string` ; `amountS`: `string` ; `buyAmt`: `string` ; `exceedDepth`: `boolean` ; `feeBips`: `string` ; `isAtoB`: `boolean` ; `isReverse`: `boolean` ; `output`: `string` ; `priceImpact`: `string` ; `sellAmt`: `string` ; `slipBips`: `string` ; `takerRate`: `string`  }

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.ammPoolSnapshot` | `undefined` \| [`AmmPoolSnapshot`](interfaces/AmmPoolSnapshot.md) |
| `__namedParameters.buy` | `string` |
| `__namedParameters.depth` | [`DepthData`](interfaces/DepthData.md) |
| `__namedParameters.feeBips` | `string` |
| `__namedParameters.input` | `string` |
| `__namedParameters.isAtoB` | `boolean` |
| `__namedParameters.marketArr` | `string`[] |
| `__namedParameters.marketMap` | [`LoopringMap`](interfaces/LoopringMap.md)<[`MarketInfo`](interfaces/MarketInfo.md)\> |
| `__namedParameters.sell` | `string` |
| `__namedParameters.slipBips` | `string` |
| `__namedParameters.takerRate` | `string` |
| `__namedParameters.tokenMap` | [`LoopringMap`](interfaces/LoopringMap.md)<[`TokenInfo`](interfaces/TokenInfo.md)\> |

#### Returns

`undefined` \| { `amountBOut`: `string` ; `amountBOutSlip`: { `minReceived`: `string` ; `minReceivedVal`: `string` ; `minimumDecimal`: `number`  } ; `amountBOutWithoutFee`: `string` ; `amountS`: `string` ; `buyAmt`: `string` ; `exceedDepth`: `boolean` ; `feeBips`: `string` ; `isAtoB`: `boolean` ; `isReverse`: `boolean` ; `output`: `string` ; `priceImpact`: `string` ; `sellAmt`: `string` ; `slipBips`: `string` ; `takerRate`: `string`  }

#### Defined in

[utils/swap_calc_utils.ts:429](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/utils/swap_calc_utils.ts#L429)

___

### getPair

▸ `Const` **getPair**(`marketArr`, `market`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `marketArr` | `any` |
| `market` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `amm` | `undefined` \| `string` |
| `baseShow` | `any` |
| `market` | `any` |
| `quoteShow` | `any` |

#### Defined in

[utils/symbol_tools.ts:83](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/utils/symbol_tools.ts#L83)

___

### getPriceImpact

▸ **getPriceImpact**(`reserveIn`, `reserveOut`, `amountS`, `feeBips`, `takerFee`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `reserveIn` | `string` |
| `reserveOut` | `string` |
| `amountS` | `string` |
| `feeBips` | `string` |
| `takerFee` | `string` |

#### Returns

`string`

#### Defined in

[utils/swap_calc_utils.ts:379](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/utils/swap_calc_utils.ts#L379)

___

### getReserveInfo

▸ **getReserveInfo**(`sell`, `buy`, `marketArr`, `tokenMap`, `marketMap`, `ammPoolSnapshot?`): `undefined` \| { `buyToken`: `undefined` \| [`TokenInfo`](interfaces/TokenInfo.md) ; `coinA`: `undefined` \| [`TokenVolumeV3`](interfaces/TokenVolumeV3.md) ; `coinB`: `undefined` \| [`TokenVolumeV3`](interfaces/TokenVolumeV3.md) ; `isReverse`: `boolean` ; `marketInfo`: [`MarketInfo`](interfaces/MarketInfo.md) ; `reserveIn`: `string` ; `reserveOut`: `string` ; `sellToken`: `undefined` \| [`TokenInfo`](interfaces/TokenInfo.md)  }

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `sell` | `string` | `undefined` |
| `buy` | `string` | `undefined` |
| `marketArr` | `string`[] | `undefined` |
| `tokenMap` | [`LoopringMap`](interfaces/LoopringMap.md)<[`TokenInfo`](interfaces/TokenInfo.md)\> | `undefined` |
| `marketMap` | [`LoopringMap`](interfaces/LoopringMap.md)<[`MarketInfo`](interfaces/MarketInfo.md)\> | `undefined` |
| `ammPoolSnapshot` | `undefined` \| [`AmmPoolSnapshot`](interfaces/AmmPoolSnapshot.md) | `undefined` |

#### Returns

`undefined` \| { `buyToken`: `undefined` \| [`TokenInfo`](interfaces/TokenInfo.md) ; `coinA`: `undefined` \| [`TokenVolumeV3`](interfaces/TokenVolumeV3.md) ; `coinB`: `undefined` \| [`TokenVolumeV3`](interfaces/TokenVolumeV3.md) ; `isReverse`: `boolean` ; `marketInfo`: [`MarketInfo`](interfaces/MarketInfo.md) ; `reserveIn`: `string` ; `reserveOut`: `string` ; `sellToken`: `undefined` \| [`TokenInfo`](interfaces/TokenInfo.md)  }

#### Defined in

[utils/swap_calc_utils.ts:270](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/utils/swap_calc_utils.ts#L270)

___

### getTickerArg

▸ `Const` **getTickerArg**(`market`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `market` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `market` | `string` |
| `topic` | [`WsTopicType`](enums/WsTopicType.md) |

#### Defined in

[defs/ws_defs.ts:93](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/defs/ws_defs.ts#L93)

___

### getToPrice

▸ **getToPrice**(`amountS`, `amountB`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `amountS` | `string` |
| `amountB` | `string` |

#### Returns

`string`

#### Defined in

[utils/swap_calc_utils.ts:361](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/utils/swap_calc_utils.ts#L361)

___

### getToken

▸ `Const` **getToken**(`tokens`, `token`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokens` | `any` |
| `token` | `any` |

#### Returns

`any`

#### Defined in

[utils/swap_calc_utils.ts:20](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/utils/swap_calc_utils.ts#L20)

___

### getTokenInfoById

▸ `Const` **getTokenInfoById**(`tokenIdMap`, `id`): `undefined` \| [`TokenInfo`](interfaces/TokenInfo.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenIdMap` | `Object` |
| `id` | `number` |

#### Returns

`undefined` \| [`TokenInfo`](interfaces/TokenInfo.md)

#### Defined in

[utils/symbol_tools.ts:59](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/utils/symbol_tools.ts#L59)

___

### getTokenInfoBySymbol

▸ `Const` **getTokenInfoBySymbol**(`tokenSymbolMap`, `symbol`): `undefined` \| [`TokenInfo`](interfaces/TokenInfo.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenSymbolMap` | `Object` |
| `symbol` | `string` |

#### Returns

`undefined` \| [`TokenInfo`](interfaces/TokenInfo.md)

#### Defined in

[utils/symbol_tools.ts:47](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/utils/symbol_tools.ts#L47)

___

### getTokenInfoByToken

▸ `Const` **getTokenInfoByToken**(`ammBalance`, `tokens`, `token`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ammBalance` | `any` |
| `tokens` | `any` |
| `token` | `any` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `reserve` | `BigNumber` |
| `tokenInfo` | `any` |
| `tokenVol` | `any` |

#### Defined in

[utils/swap_calc_utils.ts:27](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/utils/swap_calc_utils.ts#L27)

___

### getTradeArg

▸ `Const` **getTradeArg**(`market`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `market` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `market` | `string` |
| `topic` | [`WsTopicType`](enums/WsTopicType.md) |

#### Defined in

[defs/ws_defs.ts:86](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/defs/ws_defs.ts#L86)

___

### getTransferTypedData

▸ **getTransferTypedData**(`data`, `chainId`): `EIP712TypedData`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`OriginTransferRequestV3`](interfaces/OriginTransferRequestV3.md) |
| `chainId` | [`ChainId`](enums/ChainId.md) |

#### Returns

`EIP712TypedData`

#### Defined in

[api/sign/sign_tools.ts:748](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/sign/sign_tools.ts#L748)

___

### getUpdateAccountEcdsaTypedData

▸ **getUpdateAccountEcdsaTypedData**(`data`, `chainId`): `EIP712TypedData`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`UpdateAccountRequestV3`](interfaces/UpdateAccountRequestV3.md) |
| `chainId` | [`ChainId`](enums/ChainId.md) |

#### Returns

`EIP712TypedData`

#### Defined in

[api/sign/sign_tools.ts:367](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/sign/sign_tools.ts#L367)

___

### getWithdrawTypedData

▸ **getWithdrawTypedData**(`data`, `chainId`): `EIP712TypedData`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`OffChainWithdrawalRequestV3`](interfaces/OffChainWithdrawalRequestV3.md) |
| `chainId` | [`ChainId`](enums/ChainId.md) |

#### Returns

`EIP712TypedData`

#### Defined in

[api/sign/sign_tools.ts:460](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/sign/sign_tools.ts#L460)

___

### get\_EddsaSig\_ExitAmmPool

▸ **get_EddsaSig_ExitAmmPool**(`data`, `patch`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`ExitAmmPoolRequest`](interfaces/ExitAmmPoolRequest.md) |
| `patch` | [`AmmPoolRequestPatch`](interfaces/AmmPoolRequestPatch.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `eddsaSig` | `string` |

#### Defined in

[api/sign/sign_tools.ts:962](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/sign/sign_tools.ts#L962)

___

### get\_EddsaSig\_JoinAmmPool

▸ **get_EddsaSig_JoinAmmPool**(`data`, `patch`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`JoinAmmPoolRequest`](interfaces/JoinAmmPoolRequest.md) |
| `patch` | [`AmmPoolRequestPatch`](interfaces/AmmPoolRequestPatch.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `eddsaSig` | `string` |

#### Defined in

[api/sign/sign_tools.ts:916](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/sign/sign_tools.ts#L916)

___

### get\_EddsaSig\_NFT\_Mint

▸ **get_EddsaSig_NFT_Mint**(`request`, `eddsaKey`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`NFTMintRequestV3`](interfaces/NFTMintRequestV3.md) |
| `eddsaKey` | `string` |

#### Returns

`string`

#### Defined in

[api/sign/sign_tools.ts:629](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/sign/sign_tools.ts#L629)

___

### get\_EddsaSig\_NFT\_Transfer

▸ **get_EddsaSig_NFT_Transfer**(`request`, `eddsaKey`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`OriginNFTTransferRequestV3`](interfaces/OriginNFTTransferRequestV3.md) |
| `eddsaKey` | `string` |

#### Returns

`string`

#### Defined in

[api/sign/sign_tools.ts:811](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/sign/sign_tools.ts#L811)

___

### get\_EddsaSig\_NFT\_Withdraw

▸ **get_EddsaSig_NFT_Withdraw**(`request`, `eddsaKey`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`NFTWithdrawRequestV3`](interfaces/NFTWithdrawRequestV3.md) |
| `eddsaKey` | `string` |

#### Returns

`string`

#### Defined in

[api/sign/sign_tools.ts:530](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/sign/sign_tools.ts#L530)

___

### get\_EddsaSig\_OffChainWithdraw

▸ **get_EddsaSig_OffChainWithdraw**(`request`, `eddsaKey`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`OffChainWithdrawalRequestV3`](interfaces/OffChainWithdrawalRequestV3.md) |
| `eddsaKey` | `string` |

#### Returns

`string`

#### Defined in

[api/sign/sign_tools.ts:431](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/sign/sign_tools.ts#L431)

___

### get\_EddsaSig\_Transfer

▸ **get_EddsaSig_Transfer**(`request`, `eddsaKey`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`OriginTransferRequestV3`](interfaces/OriginTransferRequestV3.md) |
| `eddsaKey` | `string` |

#### Returns

`string`

#### Defined in

[api/sign/sign_tools.ts:728](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/sign/sign_tools.ts#L728)

___

### hasMarket

▸ `Const` **hasMarket**(`marketArr`, `market`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `marketArr` | `any` |
| `market` | `string` |

#### Returns

`boolean`

#### Defined in

[utils/symbol_tools.ts:70](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/utils/symbol_tools.ts#L70)

___

### isEmpty

▸ **isEmpty**(`input`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `any` |

#### Returns

`boolean`

#### Defined in

[utils/swap_calc_utils.ts:63](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/utils/swap_calc_utils.ts#L63)

___

### makeExitAmmPoolRequest

▸ **makeExitAmmPoolRequest**(`rawVal`, `isAtoB`, `slippageTolerance`, `owner`, `fees`, `ammPoolSnapshot`, `tokenMap`, `idIdx`, `offchainId?`): `Object`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `rawVal` | `string` | `undefined` |
| `isAtoB` | `boolean` | `undefined` |
| `slippageTolerance` | `string` | `undefined` |
| `owner` | `string` | `undefined` |
| `fees` | [`LoopringMap`](interfaces/LoopringMap.md)<[`OffchainFeeInfo`](interfaces/OffchainFeeInfo.md)\> | `undefined` |
| `ammPoolSnapshot` | [`AmmPoolSnapshot`](interfaces/AmmPoolSnapshot.md) | `undefined` |
| `tokenMap` | [`LoopringMap`](interfaces/LoopringMap.md)<[`TokenInfo`](interfaces/TokenInfo.md)\> | `undefined` |
| `idIdx` | [`LoopringMap`](interfaces/LoopringMap.md)<`string`\> | `undefined` |
| `offchainId` | `number` | `0` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `request` | [`ExitAmmPoolRequest`](interfaces/ExitAmmPoolRequest.md) |

#### Defined in

[utils/swap_calc_utils.ts:694](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/utils/swap_calc_utils.ts#L694)

___

### makeExitAmmPoolRequest2

▸ **makeExitAmmPoolRequest2**(`rawVal`, `slippageTolerance`, `owner`, `fees`, `ammPoolSnapshot`, `tokenMap`, `idIdx`, `offchainId?`): `Object`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `rawVal` | `string` | `undefined` |
| `slippageTolerance` | `string` | `undefined` |
| `owner` | `string` | `undefined` |
| `fees` | [`LoopringMap`](interfaces/LoopringMap.md)<[`OffchainFeeInfo`](interfaces/OffchainFeeInfo.md)\> | `undefined` |
| `ammPoolSnapshot` | [`AmmPoolSnapshot`](interfaces/AmmPoolSnapshot.md) | `undefined` |
| `tokenMap` | [`LoopringMap`](interfaces/LoopringMap.md)<[`TokenInfo`](interfaces/TokenInfo.md)\> | `undefined` |
| `idIdx` | [`LoopringMap`](interfaces/LoopringMap.md)<`string`\> | `undefined` |
| `offchainId` | `number` | `0` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `ratio` | `BigNumber` |
| `request` | [`ExitAmmPoolRequest`](interfaces/ExitAmmPoolRequest.md) |
| `volA` | `string` |
| `volA_show` | `number` |
| `volB` | `string` |
| `volB_show` | `number` |

#### Defined in

[utils/swap_calc_utils.ts:741](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/utils/swap_calc_utils.ts#L741)

___

### makeJoinAmmPoolRequest

▸ **makeJoinAmmPoolRequest**(`rawVal`, `isAtoB`, `slippageTolerance`, `owner`, `fees`, `ammPoolSnapshot`, `tokenMap`, `idIdx`, `coinAOffchainId?`, `coinBOffchainId?`): `Object`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `rawVal` | `string` | `undefined` |
| `isAtoB` | `boolean` | `undefined` |
| `slippageTolerance` | `string` | `undefined` |
| `owner` | `string` | `undefined` |
| `fees` | [`LoopringMap`](interfaces/LoopringMap.md)<[`OffchainFeeInfo`](interfaces/OffchainFeeInfo.md)\> | `undefined` |
| `ammPoolSnapshot` | [`AmmPoolSnapshot`](interfaces/AmmPoolSnapshot.md) | `undefined` |
| `tokenMap` | [`LoopringMap`](interfaces/LoopringMap.md)<[`TokenInfo`](interfaces/TokenInfo.md)\> | `undefined` |
| `idIdx` | [`LoopringMap`](interfaces/LoopringMap.md)<`string`\> | `undefined` |
| `coinAOffchainId` | `number` | `0` |
| `coinBOffchainId` | `number` | `0` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `request` | [`JoinAmmPoolRequest`](interfaces/JoinAmmPoolRequest.md) |

#### Defined in

[utils/swap_calc_utils.ts:653](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/utils/swap_calc_utils.ts#L653)

___

### numberWithCommas

▸ **numberWithCommas**(`number`): `any`

Returns a number with commas as thousands separators

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `number` | `any` | number |

#### Returns

`any`

#### Defined in

[utils/formatter.ts:252](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/utils/formatter.ts#L252)

___

### padLeftEven

▸ **padLeftEven**(`hex`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `hex` | `any` |

#### Returns

`any`

#### Defined in

[utils/formatter.ts:193](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/utils/formatter.ts#L193)

___

### sendRawTx

▸ **sendRawTx**(`web3`, `from`, `to`, `value`, `data`, `chainId`, `nonce`, `gasPrice`, `gasLimit`, `sendByMetaMask?`): `Promise`<`any`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `web3` | `any` | `undefined` |
| `from` | `string` | `undefined` |
| `to` | `string` | `undefined` |
| `value` | `string` | `undefined` |
| `data` | `any` | `undefined` |
| `chainId` | [`ChainId`](enums/ChainId.md) | `undefined` |
| `nonce` | `number` | `undefined` |
| `gasPrice` | `any` | `undefined` |
| `gasLimit` | `number` | `undefined` |
| `sendByMetaMask` | `boolean` | `true` |

#### Returns

`Promise`<`any`\>

#### Defined in

[api/contract_api.ts:143](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/contract_api.ts#L143)

___

### sendTransaction

▸ **sendTransaction**(`web3`, `tx`): `Promise`<`any`\>

**`description`** Sends ethereum tx through MetaMask

#### Parameters

| Name | Type |
| :------ | :------ |
| `web3` | `any` |
| `tx` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

[api/contract_api.ts:67](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/contract_api.ts#L67)

___

### sign

▸ **sign**(`web3`, `account`, `hash`): `Promise`<`unknown`\>

**`description`** sign hash

#### Parameters

| Name | Type |
| :------ | :------ |
| `web3` | `default` |
| `account` | `string` |
| `hash` | `string` |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[api/contract_api.ts:38](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/contract_api.ts#L38)

___

### signEip712

▸ **signEip712**(`web3`, `account`, `method`, `params`): `Promise`<`any`\>

**`description`** sign EIP712

#### Parameters

| Name | Type |
| :------ | :------ |
| `web3` | `any` |
| `account` | `string` |
| `method` | `string` |
| `params` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

[api/sign/sign_tools.ts:223](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/sign/sign_tools.ts#L223)

___

### signEip712WalletConnect

▸ **signEip712WalletConnect**(`web3`, `account`, `typedData`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `web3` | `any` |
| `account` | `string` |
| `typedData` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

[api/sign/sign_tools.ts:254](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/sign/sign_tools.ts#L254)

___

### signEthereumTx

▸ **signEthereumTx**(`web3`, `account`, `rawTx`, `chainId`): `Promise`<{ `error`: `undefined` ; `rawTx`: `any` = jsonTx; `result`: `string`  } \| { `error`: `any` ; `rawTx`: `undefined` = jsonTx; `result`: `undefined`  }\>

**`description`** Signs ethereum tx

#### Parameters

| Name | Type |
| :------ | :------ |
| `web3` | `any` |
| `account` | `any` |
| `rawTx` | `any` |
| `chainId` | [`ChainId`](enums/ChainId.md) |

#### Returns

`Promise`<{ `error`: `undefined` ; `rawTx`: `any` = jsonTx; `result`: `string`  } \| { `error`: `any` ; `rawTx`: `undefined` = jsonTx; `result`: `undefined`  }\>

#### Defined in

[api/contract_api.ts:99](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/contract_api.ts#L99)

___

### signNFTMintWithDataStructure

▸ **signNFTMintWithDataStructure**(`web3`, `owner`, `bodyParams`, `chainId`): `Promise`<{ `ecdsaSig`: `any` = response.result }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `web3` | `default` |
| `owner` | `string` |
| `bodyParams` | [`NFTMintRequestV3`](interfaces/NFTMintRequestV3.md) |
| `chainId` | [`ChainId`](enums/ChainId.md) |

#### Returns

`Promise`<{ `ecdsaSig`: `any` = response.result }\>

#### Defined in

[api/sign/sign_tools.ts:708](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/sign/sign_tools.ts#L708)

___

### signNFTMintWithDataStructureForContract

▸ **signNFTMintWithDataStructureForContract**(`web3`, `owner`, `bodyParams`, `chainId`): `Promise`<{ `ecdsaSig`: `any` = response.result }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `web3` | `default` |
| `owner` | `string` |
| `bodyParams` | [`NFTMintRequestV3`](interfaces/NFTMintRequestV3.md) |
| `chainId` | [`ChainId`](enums/ChainId.md) |

#### Returns

`Promise`<{ `ecdsaSig`: `any` = response.result }\>

#### Defined in

[api/sign/sign_tools.ts:721](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/sign/sign_tools.ts#L721)

___

### signNFTMintWithoutDataStructure

▸ **signNFTMintWithoutDataStructure**(`web3`, `owner`, `bodyParams`, `chainId`, `walletType`): `Promise`<{ `ecdsaSig`: `any` = response.result }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `web3` | `default` |
| `owner` | `string` |
| `bodyParams` | [`NFTMintRequestV3`](interfaces/NFTMintRequestV3.md) |
| `chainId` | [`ChainId`](enums/ChainId.md) |
| `walletType` | [`ConnectorNames`](enums/ConnectorNames.md) |

#### Returns

`Promise`<{ `ecdsaSig`: `any` = response.result }\>

#### Defined in

[api/sign/sign_tools.ts:714](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/sign/sign_tools.ts#L714)

___

### signNFTTransferWithDataStructureForContract

▸ **signNFTTransferWithDataStructureForContract**(`web3`, `owner`, `bodyParams`, `chainId`): `Promise`<{ `ecdsaSig`: `any` = response.result }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `web3` | `default` |
| `owner` | `string` |
| `bodyParams` | [`OriginNFTTransferRequestV3`](interfaces/OriginNFTTransferRequestV3.md) |
| `chainId` | [`ChainId`](enums/ChainId.md) |

#### Returns

`Promise`<{ `ecdsaSig`: `any` = response.result }\>

#### Defined in

[api/sign/sign_tools.ts:892](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/sign/sign_tools.ts#L892)

___

### signNFTTransferWithoutDataStructure

▸ **signNFTTransferWithoutDataStructure**(`web3`, `owner`, `bodyParams`, `chainId`, `walletType`): `Promise`<{ `ecdsaSig`: `any` = response.result }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `web3` | `default` |
| `owner` | `string` |
| `bodyParams` | [`OriginNFTTransferRequestV3`](interfaces/OriginNFTTransferRequestV3.md) |
| `chainId` | [`ChainId`](enums/ChainId.md) |
| `walletType` | [`ConnectorNames`](enums/ConnectorNames.md) |

#### Returns

`Promise`<{ `ecdsaSig`: `any` = response.result }\>

#### Defined in

[api/sign/sign_tools.ts:879](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/sign/sign_tools.ts#L879)

___

### signNFTWithdrawWithDataStructure

▸ **signNFTWithdrawWithDataStructure**(`web3`, `owner`, `bodyParams`, `chainId`): `Promise`<{ `ecdsaSig`: `any` = response.result }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `web3` | `default` |
| `owner` | `string` |
| `bodyParams` | [`NFTWithdrawRequestV3`](interfaces/NFTWithdrawRequestV3.md) |
| `chainId` | [`ChainId`](enums/ChainId.md) |

#### Returns

`Promise`<{ `ecdsaSig`: `any` = response.result }\>

#### Defined in

[api/sign/sign_tools.ts:609](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/sign/sign_tools.ts#L609)

___

### signNFTWithdrawWithDataStructureForContract

▸ **signNFTWithdrawWithDataStructureForContract**(`web3`, `owner`, `bodyParams`, `chainId`): `Promise`<{ `ecdsaSig`: `any` = response.result }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `web3` | `default` |
| `owner` | `string` |
| `bodyParams` | [`NFTWithdrawRequestV3`](interfaces/NFTWithdrawRequestV3.md) |
| `chainId` | [`ChainId`](enums/ChainId.md) |

#### Returns

`Promise`<{ `ecdsaSig`: `any` = response.result }\>

#### Defined in

[api/sign/sign_tools.ts:622](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/sign/sign_tools.ts#L622)

___

### signNFTWithdrawWithoutDataStructure

▸ **signNFTWithdrawWithoutDataStructure**(`web3`, `owner`, `bodyParams`, `chainId`, `walletType`): `Promise`<{ `ecdsaSig`: `any` = response.result }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `web3` | `default` |
| `owner` | `string` |
| `bodyParams` | [`NFTWithdrawRequestV3`](interfaces/NFTWithdrawRequestV3.md) |
| `chainId` | [`ChainId`](enums/ChainId.md) |
| `walletType` | [`ConnectorNames`](enums/ConnectorNames.md) |

#### Returns

`Promise`<{ `ecdsaSig`: `any` = response.result }\>

#### Defined in

[api/sign/sign_tools.ts:615](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/sign/sign_tools.ts#L615)

___

### signOffchainWithdrawWithDataStructure

▸ **signOffchainWithdrawWithDataStructure**(`web3`, `owner`, `bodyParams`, `chainId`): `Promise`<{ `ecdsaSig`: `any` = response.result }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `web3` | `default` |
| `owner` | `string` |
| `bodyParams` | [`OffChainWithdrawalRequestV3`](interfaces/OffChainWithdrawalRequestV3.md) |
| `chainId` | [`ChainId`](enums/ChainId.md) |

#### Returns

`Promise`<{ `ecdsaSig`: `any` = response.result }\>

#### Defined in

[api/sign/sign_tools.ts:510](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/sign/sign_tools.ts#L510)

___

### signOffchainWithdrawWithDataStructureForContract

▸ **signOffchainWithdrawWithDataStructureForContract**(`web3`, `owner`, `bodyParams`, `chainId`): `Promise`<{ `ecdsaSig`: `any` = response.result }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `web3` | `default` |
| `owner` | `string` |
| `bodyParams` | [`OffChainWithdrawalRequestV3`](interfaces/OffChainWithdrawalRequestV3.md) |
| `chainId` | [`ChainId`](enums/ChainId.md) |

#### Returns

`Promise`<{ `ecdsaSig`: `any` = response.result }\>

#### Defined in

[api/sign/sign_tools.ts:523](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/sign/sign_tools.ts#L523)

___

### signOffchainWithdrawWithoutDataStructure

▸ **signOffchainWithdrawWithoutDataStructure**(`web3`, `owner`, `bodyParams`, `chainId`, `walletType`): `Promise`<{ `ecdsaSig`: `any` = response.result }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `web3` | `default` |
| `owner` | `string` |
| `bodyParams` | [`OffChainWithdrawalRequestV3`](interfaces/OffChainWithdrawalRequestV3.md) |
| `chainId` | [`ChainId`](enums/ChainId.md) |
| `walletType` | [`ConnectorNames`](enums/ConnectorNames.md) |

#### Returns

`Promise`<{ `ecdsaSig`: `any` = response.result }\>

#### Defined in

[api/sign/sign_tools.ts:516](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/sign/sign_tools.ts#L516)

___

### signTNFTransferWithDataStructure

▸ **signTNFTransferWithDataStructure**(`web3`, `owner`, `bodyParams`, `chainId`): `Promise`<{ `ecdsaSig`: `any` = response.result }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `web3` | `default` |
| `owner` | `string` |
| `bodyParams` | [`OriginNFTTransferRequestV3`](interfaces/OriginNFTTransferRequestV3.md) |
| `chainId` | [`ChainId`](enums/ChainId.md) |

#### Returns

`Promise`<{ `ecdsaSig`: `any` = response.result }\>

#### Defined in

[api/sign/sign_tools.ts:873](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/sign/sign_tools.ts#L873)

___

### signTransferWithDataStructure

▸ **signTransferWithDataStructure**(`web3`, `owner`, `bodyParams`, `chainId`): `Promise`<{ `ecdsaSig`: `any` = response.result }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `web3` | `default` |
| `owner` | `string` |
| `bodyParams` | [`OriginTransferRequestV3`](interfaces/OriginTransferRequestV3.md) |
| `chainId` | [`ChainId`](enums/ChainId.md) |

#### Returns

`Promise`<{ `ecdsaSig`: `any` = response.result }\>

#### Defined in

[api/sign/sign_tools.ts:792](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/sign/sign_tools.ts#L792)

___

### signTransferWithDataStructureForContract

▸ **signTransferWithDataStructureForContract**(`web3`, `owner`, `bodyParams`, `chainId`): `Promise`<{ `ecdsaSig`: `any` = response.result }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `web3` | `default` |
| `owner` | `string` |
| `bodyParams` | [`OriginTransferRequestV3`](interfaces/OriginTransferRequestV3.md) |
| `chainId` | [`ChainId`](enums/ChainId.md) |

#### Returns

`Promise`<{ `ecdsaSig`: `any` = response.result }\>

#### Defined in

[api/sign/sign_tools.ts:805](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/sign/sign_tools.ts#L805)

___

### signTransferWithoutDataStructure

▸ **signTransferWithoutDataStructure**(`web3`, `owner`, `bodyParams`, `chainId`, `walletType`): `Promise`<{ `ecdsaSig`: `any` = response.result }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `web3` | `default` |
| `owner` | `string` |
| `bodyParams` | [`OriginTransferRequestV3`](interfaces/OriginTransferRequestV3.md) |
| `chainId` | [`ChainId`](enums/ChainId.md) |
| `walletType` | [`ConnectorNames`](enums/ConnectorNames.md) |

#### Returns

`Promise`<{ `ecdsaSig`: `any` = response.result }\>

#### Defined in

[api/sign/sign_tools.ts:798](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/sign/sign_tools.ts#L798)

___

### signUpdateAccountWithDataStructure

▸ **signUpdateAccountWithDataStructure**(`web3`, `bodyParams`, `chainId`): `Promise`<{ `ecdsaSig`: `any` = response.result }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `web3` | `default` |
| `bodyParams` | [`UpdateAccountRequestV3`](interfaces/UpdateAccountRequestV3.md) |
| `chainId` | [`ChainId`](enums/ChainId.md) |

#### Returns

`Promise`<{ `ecdsaSig`: `any` = response.result }\>

#### Defined in

[api/sign/sign_tools.ts:410](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/sign/sign_tools.ts#L410)

___

### signUpdateAccountWithDataStructureForContract

▸ **signUpdateAccountWithDataStructureForContract**(`web3`, `bodyParams`, `chainId`): `Promise`<{ `ecdsaSig`: `any` = response.result }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `web3` | `default` |
| `bodyParams` | [`UpdateAccountRequestV3`](interfaces/UpdateAccountRequestV3.md) |
| `chainId` | [`ChainId`](enums/ChainId.md) |

#### Returns

`Promise`<{ `ecdsaSig`: `any` = response.result }\>

#### Defined in

[api/sign/sign_tools.ts:424](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/sign/sign_tools.ts#L424)

___

### signUpdateAccountWithoutDataStructure

▸ **signUpdateAccountWithoutDataStructure**(`web3`, `bodyParams`, `chainId`, `walletType`): `Promise`<{ `ecdsaSig`: `any` = response.result }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `web3` | `default` |
| `bodyParams` | [`UpdateAccountRequestV3`](interfaces/UpdateAccountRequestV3.md) |
| `chainId` | [`ChainId`](enums/ChainId.md) |
| `walletType` | [`ConnectorNames`](enums/ConnectorNames.md) |

#### Returns

`Promise`<{ `ecdsaSig`: `any` = response.result }\>

#### Defined in

[api/sign/sign_tools.ts:417](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/api/sign/sign_tools.ts#L417)

___

### sleep

▸ **sleep**(`milliseconds`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `milliseconds` | `number` |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[utils/network_tools.ts:12](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/utils/network_tools.ts#L12)

___

### toBN

▸ **toBN**(`mixed`): `BN`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mixed` | `any` | number \| BigNumber \|  BN  \| Buffer \| string |

#### Returns

`BN`

#### Defined in

[utils/formatter.ts:108](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/utils/formatter.ts#L108)

___

### toBig

▸ **toBig**(`mixed`): `BigNumber`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mixed` | `any` | number \| BigNumber \|  BN  \| Buffer \| string |

#### Returns

`BigNumber`

#### Defined in

[utils/formatter.ts:87](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/utils/formatter.ts#L87)

___

### toBuffer

▸ **toBuffer**(`mixed`): `Buffer` \| `Uint8Array`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mixed` | `any` | Buffer\|number\|string (hex string must be with '0x' prefix) |

#### Returns

`Buffer` \| `Uint8Array`

#### Defined in

[utils/formatter.ts:16](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/utils/formatter.ts#L16)

___

### toFixed

▸ **toFixed**(`number`, `precision`, `ceil`): `string`

Returns number in string with a given precision

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `number` | `any` | number \| BigNumber |
| `precision` | `any` | number |
| `ceil` | `any` | bool  round up |

#### Returns

`string`

#### Defined in

[utils/formatter.ts:220](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/utils/formatter.ts#L220)

___

### toGWEI

▸ **toGWEI**(`value`): `BigNumber`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `any` | number \| BigNumber \| Buffer \| string |

#### Returns

`BigNumber`

#### Defined in

[utils/formatter.ts:126](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/utils/formatter.ts#L126)

___

### toHex

▸ **toHex**(`mixed`): `string`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mixed` | `any` | number \| BigNumber \|  BN  \| Buffer \| string |

#### Returns

`string`

#### Defined in

[utils/formatter.ts:39](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/utils/formatter.ts#L39)

___

### toNumber

▸ **toNumber**(`mixed`): `number`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mixed` | `any` | number \| BigNumber \|  BN  \| Buffer \| string |

#### Returns

`number`

#### Defined in

[utils/formatter.ts:66](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/utils/formatter.ts#L66)

___

### toWEI

▸ **toWEI**(`tokens`, `symbol`, `value`, `rm?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `tokens` | `any` | `undefined` |
| `symbol` | `any` | `undefined` |
| `value` | `any` | `undefined` |
| `rm` | `any` | `undefined` |

#### Returns

`string`

#### Defined in

[utils/swap_calc_utils.ts:51](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/utils/swap_calc_utils.ts#L51)

___

### updatePriceImpact\_new

▸ **updatePriceImpact_new**(`reverseIn`, `reverseOut`, `amountS`, `sellDecimal`, `amountBOut`, `buyDecimal`, `feeBips`, `takerFee`, `isAtoB`, `isReversed`, `exceedDepth`, `depth`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `reverseIn` | `string` |
| `reverseOut` | `string` |
| `amountS` | `string` |
| `sellDecimal` | `number` |
| `amountBOut` | `string` |
| `buyDecimal` | `number` |
| `feeBips` | `string` |
| `takerFee` | `string` |
| `isAtoB` | `boolean` |
| `isReversed` | `boolean` |
| `exceedDepth` | `boolean` |
| `depth` | [`DepthData`](interfaces/DepthData.md) |

#### Returns

`string`

#### Defined in

[utils/swap_calc_utils.ts:388](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/utils/swap_calc_utils.ts#L388)

___

### zeroPad

▸ **zeroPad**(`num`, `places`): `Buffer` \| `Uint8Array`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `num` | `any` | number\|string (hex string must be with '0x' prefix) |
| `places` | `any` | number of zeros to pad |

#### Returns

`Buffer` \| `Uint8Array`

#### Defined in

[utils/formatter.ts:30](https://github.com/Loopring/loopring_sdk/blob/acbd5a2/src/utils/formatter.ts#L30)
