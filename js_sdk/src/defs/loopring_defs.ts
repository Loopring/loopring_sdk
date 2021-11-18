import { ChainId, ConnectorNames } from "./web3_defs"

import Web3 from 'web3'

import {
    ReqMethod,
    MarketStatus,
    AssetType,
    IntervalType,
    TradeChannel,
    OrderType,
    Currency,
    OffchainFeeReqType,
    TradingInterval,
    TxStatus,
    OrderStatus,
    Side,
    TransferType,
    BillType,
    TxType,
    AmmTxType,
    RuleType,
    AmmPoolActivityStatus,
    SIG_FLAG,
    WithdrawalTypes,
    UserTxTypes,
    OrderTypeResp, OffchainNFTFeeReqType,
} from './loopring_enums'

export interface VipFeeRateInfo {
    symbol: string
    makerRate: number
    takerRate: number
}

export type VipFeeRateInfoMap = { [key: string]: VipFeeRateInfo }

export interface ReqOptions {
    baseUrl?: string
    apiKey?: string
    signature?: string

    url?: string
}

export interface ReqParams {
    url: string
    method: ReqMethod
    sigFlag: SIG_FLAG

    queryParams?: any
    bodyParams?: any

    apiKey?: string

    sigObj?: {
        dataToSig?: any

        sigPatch?: string

        PrivateKey?: string

        owner?: string
        pwd?: string
        web3?: any
        hasDataStruct?: boolean
    }
    eddsaSignature?: string
    ecdsaSignature?: string
}

export interface LoopringMap<T> {
    [key: string]: T
}

export interface ExchangeInfo {
    ammExitFees: Array<any>[]
    chainId: number
    depositAddress: string
    exchangeAddress: string
    fastWithdrawalFees: Array<any>[]
    onchainFees: Array<any>[]
    openAccountFees: Array<any>[]
    transferFees: Array<any>[]
    updateFees: Array<any>[]
    withdrawalFees: Array<any>[]
}

export interface TickerData {
    symbol: string
    base: string | undefined
    quote: string | undefined
    timestamp: number
    base_token_volume: string
    quote_token_volume: string
    base_fee_amt: string
    quote_fee_amt: string
    open: number
    high: number
    low: number
    close: number
    count: number
    bid: number
    ask: number
    change?: number
}

export interface ABInfo {
    price: number
    amt: string
    vol: string
    amtTotal: string
    volTotal: string
}

export interface DepthData {
    symbol: string

    version: number
    timestamp: number

    mid_price: number

    bids: ABInfo[]
    bids_prices: number[]
    bids_amtTotals: string[]
    bids_volTotals: string[]
    bids_amtTotal: string
    bids_volTotal: string

    asks: ABInfo[]
    asks_prices: number[]
    asks_amtTotals: string[]
    asks_volTotals: string[]
    asks_amtTotal: string
    asks_volTotal: string
}

export interface Candlestick {
    timestamp: number
    txs: number
    open: number
    close: number
    high: number
    low: number
    baseVol: string
    quoteVol: string
}

export interface TradesData {
    totalNum: number
    trades: any[][]
}

export interface OrdersData {
    totalNum: number
    trades: any[][]
}

export interface QuotesData {
    quotes: any[][]
}

export interface TokenInfo {
    type: string
    tokenId: number
    symbol: string
    name: string
    address: string
    decimals: number
    precision: number
    precisionForOrder: number
    orderAmounts: {
        minimum: string
        maximum: string
        dust: string
    },
    luckyTokenAmounts: {
        minimum: string
        maximum: string
        dust: string
    },
    fastWithdrawLimit: string
    gasAmounts: {
        distribution: string
        deposit: string
    }
    enabled: boolean

    isLpToken: boolean
}

export interface AmmPoolStat {
    market: string
    liquidity: string[]
    lpLiquidity: string
    liquidityUSD: string
    ohlc: string[]
    volume: string[]
    fees: string[]
    apyBips: string
    isRecommended: boolean
    rewards: TokenVolumeV3[]
}

export interface AmmPoolActivityRule {
    market: string
    ruleType: RuleType
    rangeFrom: number
    rangeTo: number
    awardRules: TokenVolumeV3[]
    maxSpread: number
    topK: number

    status: AmmPoolActivityStatus
}

export interface AmmTrade {
    accountId: number
    orderHash: string
    market: string
    side: string
    size: string
    price: number
    feeAmount: string
    createdAt: number
}

export interface AmmPoolInfoV3 {
    name: string,
    market: string,
    address: string,
    version: string,
    tokens: {
        pooled: string[],
        lp: number
    },
    feeBips: number,
    precisions: {
        price: number,
        amount: number,
    },
    createdAt: string,
    status: number
}

export interface TokenRelatedInfo {
    tokenId: string
    tokenList: string[]
}

export interface AmmPoolConfResponse {
    ammpools: LoopringMap<AmmPoolInfoV3>
    pairs: LoopringMap<TokenRelatedInfo>
    raw_data: any
}

export interface PooledMap {
    [key: number]: TokenVolumeV3
}

export interface AmmPoolBalance {
    poolName: string
    poolAddress: string
    pooled: [TokenVolumeV3, TokenVolumeV3]
    lp: any
    risky: boolean
    pooledMap: PooledMap
}

export interface AmmPoolBalancesResponse {
    ammpoolsbalances: LoopringMap<FiatPriceInfo>
    raw_data: any
}

export interface TokensResponse {
    tokenSymbolMap: LoopringMap<TokenInfo>
    tokenIdMap: LoopringMap<TokenInfo>
    tokenAddressMap: LoopringMap<TokenInfo>

    getTokenInfoBySymbol: any,
    getTokenInfoById: any,

    tokenSymbolArr: string[],
    tokenSymbolArrStr: string,
    tokenIdArr: string[],
    tokenIdArrStr: string,
    tokenAddressArr: string[],
    tokenAddressArrStr: string

    raw_data: any
}

export interface MarketInfo {
    baseTokenId: number,
    enabled: boolean,
    market: string,
    orderbookAggLevels: number,
    precisionForPrice: number,
    quoteTokenId: number,
    status?: MarketStatus,
    isSwapEnabled?: boolean,
    createdAt?: number,
}

export interface MarketsResponse {
    hasMarket: any
    getExistedMarket: any
    markets: LoopringMap<MarketInfo>
    pairs: LoopringMap<TokenRelatedInfo>
    tokenArr: string[]
    tokenArrStr: string
    marketArr: string[]
    marketArrStr: string
    raw_data: any
}

export interface TokenVolumeV3 {
    /**
     * The Loopring\'s token identifier.
     * @type {string}
     * @memberof TokenVolumeV3
     */
    tokenId: string | number;
    /**
     * The volume of the token
     * @type {string}
     * @memberof TokenVolumeV3
     */
    volume: string;
}
export interface TokenVolumeNFT   {
    /**
     * The Loopring\'s token identifier.
     * @type {string}
     * @memberof TokenVolumeV3
     */
    tokenId: string | number;
    /**
     * The ammount of the token
     * @type {string}
     * @memberof TokenVolumeV3
     */
    amount: string;
    /**
     * The Loopring's NFT token data identifier which is a hash string of NFT token address and NFT_ID
     * @type {string}
     * @memberof The Loopring's NFT token data identifier which is a hash string of NFT token address and NFT_ID
     */
    nftData:NftData
}


export interface AmmPoolJoinTokens {
    pooled: TokenVolumeV3[]
    minimumLp: TokenVolumeV3
}

export interface AmmPoolExitTokens {
    unPooled: TokenVolumeV3[]
    burned: TokenVolumeV3
}

export interface GameRankInfo {
    address: string
    volume: string
    rank: number
    rewards: TokenVolumeV3[]
}

export interface SetReferrerRequest {
    address: string
    referrer?: number
    promotionCode?: string
    publicKeyX: string
    publicKeyY: string
}

export interface GetAmmUserRewardsRequest {
    owner: number // accountId
    ammPoolMarkets?: string // pool-name list
}

export interface AmmUserReward {
    market: string,
    feeRewards: string[],
    extraRewards: TokenVolumeV3[],
    currentRewards: TokenVolumeV3[],
}

export interface AmmUserRewardMap {
    [key: string]: AmmUserReward
}

export interface GetAmmPoolGameRankRequest {
    ammPoolMarket: string // symbol AMM-LRC-ETH
}

export interface GetAmmAssetRequest {
    poolAddress: string
    limit?: number
}

export interface GetAmmPoolGameUserRankRequest {
    owner: string // address
    ammPoolMarket: string // symbol AMM-LRC-ETH
}

export interface GetAmmPoolSnapshotRequest {
    poolAddress: string
}

export interface AmmPoolSnapshot {
    poolName: string,
    poolAddress: string,
    pooled: [TokenVolumeV3, TokenVolumeV3],
    lp: TokenVolumeV3,
    risky: boolean
}

export interface AmmPoolRequestPatch {
    chainId: ChainId
    ammName: string
    poolAddress: string
    eddsaKey: string
}

export interface JoinAmmPoolRequest {
    owner: string
    poolAddress: string
    joinTokens: AmmPoolJoinTokens
    storageIds: number[]
    fee: string
    validUntil?: number
    eddsaSignature?: string
    ecdsaSignature?: string
}

export interface JoinAmmPoolResult {
    hash: string
    status: TxStatus
    isIdempotent: boolean
}

export interface ExitAmmPoolRequest {
    owner: string
    poolAddress: string
    exitTokens: AmmPoolExitTokens
    storageId: number
    maxFee: string
    validUntil?: number
    eddsaSignature?: string
    ecdsaSignature?: string
}

export interface ExitAmmPoolResult {
    hash: string
    status: TxStatus
    isIdempotent: boolean
}

export interface GetAmmPoolTradesRequest {
    ammPoolAddress: string
    limit?: number
    offset?: number
}

export interface AmmPoolTrade {
    accountId: number
    orderHash: string
    market: string
    side: Side
    size: string
    price: number
    feeAmount: string
    createdAt: number
}



export interface GetAmmPoolTxsRequest {
    poolAddress: string
    billType?: BillType
    start?: number
    end?: number
    limit?: number
    offset?: number
    tokenId?: number
    income?: boolean
    transferAddress?: string
    fromAddress?: string
}

export interface AmmPoolTxOld {
    id: number
    from: string
    to: string
    token: string
    amount: string
    tokenF: string
    amountF: string
    status: TxStatus
    txHash: string
    billType: BillType
    income: boolean
    timestamp: number
    memo: string
    price: string
    transferType: TransferType
    label: string
}

export interface TokenVolumeV4 {
    tokenId: number
    amount: string
    actualAmount: string
    feeAmount: string
}

export interface AmmPoolTx {
    hash: string
    txType: AmmTxType
    txStatus: TxStatus
    ammPoolAddress: string
    ammLayerType: string,
    poolTokens: [TokenVolumeV4, TokenVolumeV4],
    lpToken: TokenVolumeV4
    createdAt: number
    updatedAt: number
}

export interface GetUserAmmPoolTxsRequest {
    accountId: number
    start?: number
    end?: number
    limit?: number
    offset?: number
    txTypes?: string // combine of AmmTxType
    txStatus?: TxStatus
    ammPoolAddress?: string
}

export interface PooledToken {
    tokenId: number
    amount: string
    actualAmount: string
    feeAmount: string
}

export interface UserAmmPoolTx {
    hash: string
    txType: AmmTxType
    txStatus: TxStatus
    ammPoolAddress: string
    ammLayerType: string
    poolTokens: [PooledToken, PooledToken]
    lpToken: PooledToken
    createdAt: number
    updatedAt: number
}

export interface GetLiquidityMiningRequest {
    accountId: number
    market: string
    size: number
}

export interface RewardItem {
    startAt: number,
    timeInterval: string,
    accountId: number,
    tokenId: number,
    market: string,
    score: number,
    amount: string
}

export interface GetLiquidityMiningUserHistoryRequest {
    accountId: number
    start?: number
    end?: number
}

export interface UserMiningInfo {
    account_id: number
    market: string
    start: number
    end: number
    awards: TokenVolumeV3[]
}

export interface GetFiatPriceRequest {
    legal: string
}

export interface FiatPriceInfo {
    symbol: string
    price: number
    updatedAt: number
}

export interface GetMarketTradesRequest {
    market: string
    limit?: number
}

export interface MarketTradeInfo {
    tradeTime: number
    tradeId: string
    side: Side
    volume: string
    price: string
    market: string
    fee: string
}

export interface GetWithdrawalAgentsRequest {
    tokenId: number
    amount: string
}

export interface GetEthBalancesRequest {
    owner: string
}

export interface GetTokenBalancesRequest {
    owner: string
    token: string
}

export interface GetAllowancesRequest {
    owner: string
    token: string // tokenAddress
}

export interface GetDepthRequest {
    market: string
    level?: number
    limit?: number
}

export interface GetTickerRequest {
    market: string
}

export interface GetCandlestickRequest {
    market: string
    interval: TradingInterval
    start?: number
    end?: number
    limit?: number
}

export interface GetAccountRequest {
    owner: string
}

export interface GetEthNonceRequest {
    owner: string
}

export interface GetUserApiKeyRequest {
    accountId: number
}

export interface UpdateUserApiKeyRequest {
    accountId: number
}

export interface GetOffchainFeeAmtRequest {
    accountId: number
    requestType: OffchainFeeReqType
    tokenSymbol?: string
    amount?: string
}
export interface GetNFTOffchainFeeAmtRequest {
    accountId: number
    requestType: OffchainNFTFeeReqType
    tokenAddress?: string
    amount?: string
}

export interface OrderInfo {
    minAmount: string
    makerRate: number
    takerRate: number
}

export interface TokenAmount {
    tokenSymbol: string
    discount: number
    baseOrderInfo: OrderInfo
    userOrderInfo: OrderInfo
}

export interface GetMinimumTokenAmtRequest {
    accountId: number
    market: string
}

export interface OffchainFeeInfo {
    token: string
    fee: string
    discount: number
}

export interface GetUserBalancesRequest {
    accountId: number
    tokens: string
}

export interface UserBalanceInfo {
    tokenId: number,
    total: string,
    locked: string,
    pending: {
        withdraw: string,
        deposit: string
    }
}

export interface GetOrderDetailsRequest {
    accountId: number
    orderHash: string
}

export interface OrderDetail {
    hash: string
    clientOrderId: string,
    side: Side,
    market: string,
    price: string,
    volumes: {
        baseAmount: string,
        quoteAmount: string,
        baseFilled: string,
        quoteFilled: string,
        fee: string
    },
    validity: { start: number, end: number },
    orderType: OrderTypeResp,
    tradeChannel: TradeChannel,
    status: OrderStatus
}

export interface GetUserOrderFeeRateRequest {
    accountId: number
    market: string
    tokenB: number
    amountB: string
}

export interface FeeRateInfo {
    symbol: string
    makerRate: number
    takerRate: number
}

export interface GetUserFeeRateRequest {
    accountId: number
    markets: string
}

export interface UserFeeRateInfo {
    symbol: string
    makerRate: number
    takerRate: number
}

export interface GetNextStorageIdRequest {
    accountId: number
    sellTokenId: number
}

/**
 * 
 * @export
 * @interface OffChainWithdrawalRequestV3
 */
export interface OffChainWithdrawalRequestV3 {
    /**
     * exchange address
     * @type {string}
     * @memberof OffChainWithdrawalRequestV3
     */
    exchange: string;
    /**
     * account ID
     * @type {number}
     * @memberof OffChainWithdrawalRequestV3
     */
    accountId: number;
    /**
     * account owner address
     * @type {string}
     * @memberof OffChainWithdrawalRequestV3
     */
    owner: string;
    /**
     * 
     * @type {TokenVolumeV3}
     * @memberof OffChainWithdrawalRequestV3
     */
    token: TokenVolumeV3;
    /**
     * 
     * @type {TokenVolumeV3}
     * @memberof OffChainWithdrawalRequestV3
     */
    maxFee: TokenVolumeV3;
    /**
     * offchain ID
     * @type {number}
     * @memberof OffChainWithdrawalRequestV3
     */
    storageId: number;
    /**
     * Timestamp for order to become invalid
     * @type {number}
     * @memberof OffChainWithdrawalRequestV3
     */
    validUntil: number;
    /**
     * min gas for on-chain withdraw, Loopring exchange allocates gas for each distribution, but people can also assign this min gas, so Loopring have to allocate higher gas value for this specific distribution. Normally no need to take care of this value, 0 means let loopring choose the reasonable gas
     * @type {number}
     * @memberof OffChainWithdrawalRequestV3
     */
    minGas: number;
    /**
     * withdraw to address
     * @type {string}
     * @memberof OffChainWithdrawalRequestV3
     */
    to: string;
    /**
     * extra data for complex withdraw mode, normally none
     * @type {string}
     * @memberof OffChainWithdrawalRequestV3
     */
    extraData?: string;
    /**
     * is fast withdraw mode
     * @type {boolean}
     * @memberof OffChainWithdrawalRequestV3
     */
    fastWithdrawalMode?: boolean;
    /**
     * eddsa signature
     * @type {string}
     * @memberof OffChainWithdrawalRequestV3
     */
    eddsaSignature?: string;
    /**
     * ecdsa signature
     * @type {string}
     * @memberof OffChainWithdrawalRequestV3
     */
    ecdsaSignature?: string;
    /**
     * An approved hash string which was already submitted on eth mainnet
     * @type {string}
     * @memberof OffChainWithdrawalRequestV3
     */
    hashApproved?: string;
}

export interface GetOrdersRequest {
    accountId: number
    market?: string
    start?: number
    end?: number
    side?: Side[]
    status?: string
    limit?: number
    offset?: number
    orderTypes?: OrderType
}

export interface GetUserRegTxsRequest {
    accountId: number
    start?: number
    end?: number
    status?: string
    limit?: number
    offset?: number
}

export interface UserRegTx {
    id: number
    hash: string
    owner: string
    txHash: string
    feeTokenSymbol: string
    feeAmount: number
    status: TxStatus
    progress: string
    timestamp: number
    blockNum: number
    updatedAt: number
}

export interface GetUserPwdResetTxsRequest {
    accountId: number
    start?: number
    end?: number
    status?: string
    limit?: number
    offset?: number
}

export interface UserPwdResetTx extends UserRegTx {
}

export interface GetUserDepositHistoryRequest {
    accountId?: number
    hashes?: string
    start?: number
    end?: number
    status?: string
    limit?: number
    tokenSymbol?: string
    offset?: number
}

export interface UserDepositHistoryTx {
    id: number
    hash: string
    symbol: string
    amount: string
    txHash: string
    status: TxStatus
    progress: string
    timestamp: number
    blockNum: number
    updatedAt: number
}

export interface UserOnchainWithdrawalHistoryTx {
    id: number,
    txType: WithdrawalTypes,
    hash: string,
    symbol: string,
    amount: string,
    txHash: string,
    feeTokenSymbol: string,
    feeAmount: string,
    status: TxStatus,
    progress: string,
    timestamp: number,
    blockNum: number,
    updatedAt: number,
    distributeHash: string,
    requestId: number,
    fastStatus: string
}

export interface GetUserOnchainWithdrawalHistoryRequest {
    accountId?: number
    hashes?: string
    start?: number
    end?: number
    status?: string
    limit?: number
    tokenSymbol?: string
    offset?: number
    withdrawalTypes?: string
}

export interface GetUserTransferListRequest {
    accountId?: number
    hashes?: string
    start?: number
    end?: number
    status?: string
    limit?: number
    tokenSymbol?: string
    offset?: number
    transferTypes?: string // transfer, transfer_red
}

export interface UserTransferRecord {
    id: number
    hash: string
    txType: TxType
    symbol: string
    amount: string
    senderAddress: string
    receiver: number
    receiverAddress: string
    feeTokenSymbol: string
    feeAmount: string
    status: TxStatus
    progress: string
    timestamp: number
    updatedAt: number
    memo: string
}

export interface UserAssetInfo {
    amount: string
    createdAt: number
    createdAtStr: string
}

export interface GetUserAssetsRequest {
    wallet: string
    assetType?: AssetType
    currency?: Currency

    limit?: number
    offset?: number
}

export interface GetUserTradeAmount {
    accountId: number;
    markets?: string;
    limit?: number;
}

export interface TokenPriceInfo {
    price: string
    createdAt: number
}

export interface GetTokenPricesRequest {
    token: string
    intervalType?: IntervalType
    currency?: Currency

    limit?: number
}

export interface getLatestTokenPricesRequest {
    tokens?: string
    currency?: string
}

export interface GetUserTxsRequest {
    accountId: number
    tokenSymbol?: string
    start?: number
    end?: number
    offset?: number
    limit?: number
    types?: UserTxTypes[] | string
}

export interface UserTx {
    id: number
    txType: string
    hash: string
    symbol: string
    amount: string
    receiver: number,
    txHash: string
    feeTokenSymbol: string
    feeAmount: string
    status: TxStatus
    progress: string
    timestamp: number
    blockNum: number
    updatedAt: number
    distributeHash: string
    receiverAddress: string
    senderAddress: string
    memo: string
    requestId: number
    fastStatus: string
    recipient: string
}

export interface GetUserTradesRequest {
    accountId: number
    market?: string
    orderHash?: string
    offset?: number
    limit?: number
    fromId?: number
    fillTypes?: string
}

export interface UserTrade extends MarketTradeInfo { }

export interface UserTrades {
    totalNum: number
    trades: UserTrade[]
}

export interface CancelOrderRequest {
    accountId: number
    clientOrderId?: string
    orderHash?: string
}

export interface CancelMultiOrdersByHashRequest {
    accountId: number
    orderHash: string // comma seprated string
}

export interface CancelMultiOrdersByClientOrderIdRequest {
    accountId: number
    clientOrderId: string // comma seprated string
}

export interface SubmitOrderRequestV3 {
    /**
     * The adderss of the exchange which has to process this order
     * @type {string}
     * @memberof SubmitOrderRequestV3
     */
    exchange: string;
    /**
     * Loopring\'s account ID
     * @type {number}
     * @memberof SubmitOrderRequestV3
     */
    accountId: number;
    /**
     * The unique identifier of the L2 Merkle tree storage slot where the burn made in order to exit the pool will or has been stored.
     * @type {number}
     * @memberof SubmitOrderRequestV3
     */
    storageId: number;
    /**
     * 
     * @type {TokenVolumeV3}
     * @memberof SubmitOrderRequestV3
     */
    sellToken: TokenVolumeV3;
    /**
     * 
     * @type {TokenVolumeV3}
     * @memberof SubmitOrderRequestV3
     */
    buyToken: TokenVolumeV3;
    /**
     * Whether the order supports partial fills or not.Currently only supports false as a valid value
     * @type {string}
     * @memberof SubmitOrderRequestV3
     */
    allOrNone: boolean;
    /**
     * Fill size by buy token or by sell token
     * @type {string}
     * @memberof SubmitOrderRequestV3
     */
    fillAmountBOrS: boolean;
    /**
     * Order expiration time, accuracy is in seconds
     * @type {number}
     * @memberof SubmitOrderRequestV3
     */
    validUntil: number;
    /**
     * Maximum order fee that the user can accept, value range (in ten thousandths) 1 ~ 63
     * @type {number}
     * @memberof SubmitOrderRequestV3
     */
    maxFeeBips: number;
    /**
     * The orders EdDSA signature. The signature is a hexadecimal string obtained by signing the order itself and concatenating the resulting signature parts (Rx, Ry, and S). Used to authenticate and authorize the operation.
     * @type {string}
     * @memberof SubmitOrderRequestV3
     */
    eddsaSignature: string;
    /**
     * An arbitrary, client-set unique order identifier, max length is 120 bytes
     * @type {string}
     * @memberof SubmitOrderRequestV3
     */
    clientOrderId?: string;
    /**
     * Order types, can be AMM, LIMIT_ORDER, MAKER_ONLY, TAKER_ONLY
     * @type {string}
     * @memberof SubmitOrderRequestV3
     */
    orderType?: OrderType;
    /**
     * Used by the P2P order which user specify the taker, so far its 0x0000000000000000000000000000000000000000
     * @type {string}
     * @memberof SubmitOrderRequestV3
     */

    tradeChannel?: TradeChannel

    taker?: string;
    /**
     * The AMM pool address if order type is AMM
     * @type {string}
     * @memberof SubmitOrderRequestV3
     */
    poolAddress?: string;
    /**
     * Aux data to mark the order source
     * @type {string}
     * @memberof SubmitOrderRequestV3
     */
    channelId?: string;
}

/**
 * Submit internal transfer params
 * @export
 * @interface OriginTransferRequestV3
 */
export interface OriginTransferRequestV3 {
    /**
     * exchange address
     * @type {string}
     * @memberof OriginTransferRequestV3
     */
    exchange: string;
    /**
     * payer account ID
     * @type {number}
     * @memberof OriginTransferRequestV3
     */
    payerId: number;
    /**
     * payer account address
     * @type {string}
     * @memberof OriginTransferRequestV3
     */
    payerAddr: string;
    /**
     * payee account ID
     * @type {number}
     * @memberof OriginTransferRequestV3
     */
    payeeId: number;
    /**
     * payee account address
     * @type {string}
     * @memberof OriginTransferRequestV3
     */
    payeeAddr: string;
    /**
     * 
     * @type {TokenVolumeV3}
     * @memberof OriginTransferRequestV3
     */
    token: TokenVolumeV3;
    /**
     * 
     * @type {TokenVolumeV3}
     * @memberof OriginTransferRequestV3
     */
    maxFee: TokenVolumeV3;
    /**
     * offchain Id
     * @type {number}
     * @memberof OriginTransferRequestV3
     */
    storageId: number;
    /**
     * Timestamp for order to become invalid
     * @type {number}
     * @memberof OriginTransferRequestV3
     */
    validUntil: number;
    /**
     * eddsa signature
     * @type {string}
     * @memberof OriginTransferRequestV3
     */
    eddsaSignature?: string;
    /**
     * ecdsa signature
     * @type {string}
     * @memberof OriginTransferRequestV3
     */
    ecdsaSignature?: string;
    /**
     * An approved hash string which was already submitted on eth mainnet
     * @type {string}
     * @memberof OriginTransferRequestV3
     */
    hashApproved?: string;
    /**
     * transfer memo
     * @type {string}
     * @memberof OriginTransferRequestV3
     */
    memo?: string;
    /**
     * A user-defined id
     * @type {string}
     * @memberof OriginTransferRequestV3
     */
    clientId?: string;
}

/**
 * Submit internal transfer params
 * @export
 * @interface OriginNFTTransferRequestV3
 */
export interface OriginNFTTransferRequestV3 {
    /**
     * exchange address
     * @type {string}
     * @memberof OriginNFTTransferRequestV3
     */
    exchange: string;
    /**
     * fromAccountId
     * @type {number}
     * @memberof OriginNFTTransferRequestV3
     */
    fromAccountId: number;
    /**
     * payer account address
     * @type {string}
     * @memberof OriginNFTTransferRequestV3
     */
    fromAddress: string;
    /**
     * to account ID
     * @type {number}
     * @memberof OriginNFTTransferRequestV3
     */
    toAccountId: number;
    /**
     * toAddress address
     * @type {string}
     * @memberof OriginNFTTransferRequestV3
     */
    toAddress: string;
    /**
     *
     * @type {TokenVolumeNFT}
     * @memberof OriginNFTTransferRequestV3
     */
    token: TokenVolumeNFT;
    /**
     *
     * @type { Pick<TokenVolumeV3,'tokenId'> & {amount:string}}
     * @memberof OriginNFTTransferRequestV3
     */
     maxFee: Pick<TokenVolumeV3,'tokenId'> & {amount:string};
    /**
     * offchain Id
     * @type {number}
     * @memberof OriginNFTTransferRequestV3
     */
    storageId: number;
    /**
     * Timestamp for order to become invalid
     * @type {number}
     * @memberof OriginNFTTransferRequestV3
     */
    validUntil: number;
    /**
     * eddsa signature
     * @type {string}
     * @memberof OriginNFTTransferRequestV3
     */
    eddsaSignature?: string;
    /**
     * ecdsa signature
     * @type {string}
     * @memberof OriginNFTTransferRequestV3
     */
    ecdsaSignature?: string;
    /**
     * An approved hash string which was already submitted on eth mainnet
     * @type {string}
     * @memberof OriginNFTTransferRequestV3
     */
    hashApproved?: string;
    /**
     * transfer memo
     * @type {string}
     * @memberof OriginNFTTransferRequestV3
     */
    memo?: string;
    /**
     * A user-defined id
     * @type {string}
     * @memberof OriginNFTTransferRequestV3
     */
    clientId?: string;
}
/**
 *
 * @export
 * @interface NFTWithdrawRequestV3
 */
export interface NFTWithdrawRequestV3{
    /**
     * exchange address
     * @type {string}
     * @memberof OriginNFTWithdrawRequestV3
     */
    exchange: string;
    /**
     * account ID
     * @type {number}
     * @memberof OriginNFTWithdrawRequestV3
     */
    accountId: number;
    /**
     * account owner address
     * @type {string}
     * @memberof OriginNFTWithdrawRequestV3
     */
    owner: string;
    /**
     *
     * @type {TokenVolumeV3}
     * @memberof OriginNFTWithdrawRequestV3
     */
    /**
     *
     * @type {TokenVolumeNFT}
     * @memberof OriginNFTTransferRequestV3
     */
    token: TokenVolumeNFT;
    /**
     *
     * @type {Pick<TokenVolumeV3,'tokenId'> & {amount:string}};
     * @memberof OriginNFTTransferRequestV3
     */
     maxFee: Pick<TokenVolumeV3,'tokenId'> & {amount:string};
    /**
     * offchain ID
     * @type {number}
     * @memberof OriginNFTWithdrawRequestV3
     */
    storageId: number;
    /**
     * Timestamp for order to become invalid
     * @type {number}
     * @memberof OriginNFTWithdrawRequestV3
     */
    validUntil: number;
    /**
     * min gas for on-chain withdraw, Loopring exchange allocates gas for each distribution, but people can also assign this min gas, so Loopring have to allocate higher gas value for this specific distribution. Normally no need to take care of this value, 0 means let loopring choose the reasonable gas
     * @type {number}
     * @memberof OriginNFTWithdrawRequestV3
     */
    minGas: number;
    /**
     * withdraw to address
     * @type {string}
     * @memberof OriginNFTWithdrawRequestV3
     */
    to: string;
    /**
     * extra data for complex withdraw mode, normally none
     * @type {string}
     * @memberof OriginNFTWithdrawRequestV3
     */
    extraData?: string;
    // /**
    //  * is fast withdraw mode
    //  * @type {boolean}
    //  * @memberof OriginNFTWithdrawRequestV3
    //  */
    // fastWithdrawalMode?: boolean;
    /**
     * eddsa signature
     * @type {string}
     * @memberof OriginNFTWithdrawRequestV3
     */
    eddsaSignature?: string;
    /**
     * ecdsa signature
     * @type {string}
     * @memberof OriginNFTWithdrawRequestV3
     */
    ecdsaSignature?: string;
    /**
     * An approved hash string which was already submitted on eth mainnet
     * @type {string}
     * @memberof OriginNFTWithdrawRequestV3
     */
    hashApproved?: string;
}

/**
 *
 * @export
 * @interface NFTMintRequestV3
 */
export interface NFTMintRequestV3{
    /**
     * exchange address
     * @type {string}
     * @memberof OriginNFTMintRequestV3
     */
    exchange: string;
    /**
     * account ID
     * @type {number}
     * @memberof OriginNFTMintRequestV3
     */
    minterId: number;
    /**
     * account owner address
     * @type {string}
     * @memberof OriginNFTMintRequestV3
     */
    minterAddress: string;
    /**
     * The account receive the minted NFT token, now should be minter himself.
     * @type {number}
     * @memberof OriginNFTMintRequestV3
     */
    toAccountId: number;
    /**
     * The account receive the minted NFT token, now should be minter himself.
     * @type {string}
     * @memberof OriginNFTMintRequestV3
     */
    toAddress?: string;
    /**
     * nftType: 0 for EIP1155, 1 for EIP712. EIP1155 by default.
     * @type {number}
     * @memberof OriginNFTMintRequestV3
     */
    nftType: 0 | 1,
    /**
     * Contract address
     * @type{string}
     * @memberof OriginNFTTransferRequestV3
     */
    tokenAddress: string;
    /**
     * NFT_ID url_id
     * @type {string}   toString(16)
     * @memberof OriginNFTTransferRequestV3
     */
    nftId:  string
    /**
     * The ammount of the token
     * @type {string}
     * @memberof TokenVolumeV3
     */
    amount: string;
    /**
     * fee to the creator of each NFT transaction.
     * @type {number | 0}
     * @memberof OriginNFTTransferRequestV3
     */
    creatorFeeBips?: number | 0

    /**
     * Timestamp for order to become invalid
     * @type {number}
     * @memberof OriginNFTMintRequestV3
     */
    validUntil: number;
    /**
     * offchain ID
     * @type {number}
     * @memberof OriginNFTMintRequestV3
     */
    storageId: number;
    /**
     *
     * @type { Pick<TokenVolumeV3,'tokenId'> & {amount:string}}
     * @memberof OriginNFTTransferRequestV3
     */
    maxFee: Pick<TokenVolumeV3,'tokenId'> & {amount:string};
    /**
     * force to mint, regardless the previous mint record
     * @type {boolean}
     * @memberof OriginNFTMintRequestV3
     */
    forceToMint?: boolean;
    /**
     * eddsa signature
     * @type {string}
     * @memberof OriginNFTMintRequestV3
     */
    eddsaSignature?: string;
    /**
     * ecdsa signature
     * @type {string}
     * @memberof OriginNFTMintRequestV3
     */
    ecdsaSignature?: string;
    /**
     * An approved hash string which was already submitted on eth mainnet
     * @type {string}
     * @memberof OriginNFTMintRequestV3
     */
    hashApproved?: string;
}
/**
 * 
 * @export
 * @interface OffChainWithdrawalRequestV3
 */
export interface OffChainWithdrawalRequestV3 {
    /**
     * exchange address
     * @type {string}
     * @memberof OffChainWithdrawalRequestV3
     */
    exchange: string;
    /**
     * account ID
     * @type {number}
     * @memberof OffChainWithdrawalRequestV3
     */
    accountId: number;
    /**
     * account owner address
     * @type {string}
     * @memberof OffChainWithdrawalRequestV3
     */
    owner: string;
    /**
     * 
     * @type {TokenVolumeV3}
     * @memberof OffChainWithdrawalRequestV3
     */
    token: TokenVolumeV3;
    /**
     * 
     * @type {TokenVolumeV3}
     * @memberof OffChainWithdrawalRequestV3
     */
    maxFee: TokenVolumeV3;
    /**
     * offchain ID
     * @type {number}
     * @memberof OffChainWithdrawalRequestV3
     */
    storageId: number;
    /**
     * Timestamp for order to become invalid
     * @type {number}
     * @memberof OffChainWithdrawalRequestV3
     */
    validUntil: number;
    /**
     * min gas for on-chain withdraw, Loopring exchange allocates gas for each distribution, but people can also assign this min gas, so Loopring have to allocate higher gas value for this specific distribution. Normally no need to take care of this value, 0 means let loopring choose the reasonable gas
     * @type {number}
     * @memberof OffChainWithdrawalRequestV3
     */
    minGas: number;
    /**
     * withdraw to address
     * @type {string}
     * @memberof OffChainWithdrawalRequestV3
     */
    to: string;
    /**
     * extra data for complex withdraw mode, normally none
     * @type {string}
     * @memberof OffChainWithdrawalRequestV3
     */
    extraData?: string;
    /**
     * is fast withdraw mode
     * @type {boolean}
     * @memberof OffChainWithdrawalRequestV3
     */
    fastWithdrawalMode?: boolean;
    /**
     * eddsa signature
     * @type {string}
     * @memberof OffChainWithdrawalRequestV3
     */
    eddsaSignature?: string;
    /**
     * ecdsa signature
     * @type {string}
     * @memberof OffChainWithdrawalRequestV3
     */
    ecdsaSignature?: string;
    /**
     * An approved hash string which was already submitted on eth mainnet
     * @type {string}
     * @memberof OffChainWithdrawalRequestV3
     */
    hashApproved?: string;
}

/**
 * Describes the users public key which is a point of the selected eclipse curve.
 * @export
 * @interface PublicKey
 */
export interface PublicKey {
    /**
     * The public keys x part.
     * @type {string}
     * @memberof PublicKey
     */
    x: string;
    /**
     * The public keys y part.
     * @type {string}
     * @memberof PublicKey
     */
    y: string;
}

export interface UpdateAccountRequestV3 {
    /**
     * exchange address
     * @type {string}
     * @memberof UpdateAccountRequestV3
     */
    exchange: string;
    /**
     * owner address
     * @type {string}
     * @memberof UpdateAccountRequestV3
     */
    owner: string;
    /**
     * user account ID
     * @type {number}
     * @memberof UpdateAccountRequestV3
     */
    accountId: number;
    /**
     * 
     * @type {PublicKey}
     * @memberof UpdateAccountRequestV3
     */
    publicKey: PublicKey;
    /**
     * 
     * @type {TokenVolumeV3}
     * @memberof UpdateAccountRequestV3
     */
    maxFee: TokenVolumeV3;
    /**
     * Timestamp for order to become invalid
     * @type {number}
     * @memberof UpdateAccountRequestV3
     */
    validUntil: number;
    /**
     * Nonce of users exchange account that used in off-chain requests.
     * @type {number}
     * @memberof UpdateAccountRequestV3
     */
    nonce: number;
    /**
     * eddsa signature of this request
     * @type {string}
     * @memberof UpdateAccountRequestV3
     */
    eddsaSignature?: string;
    /**
     * ecdsa signature of this request
     * @type {string}
     * @memberof UpdateAccountRequestV3
     */
    ecdsaSignature?: string;
    /**
     * An approved hash string which was submitted on eth mainnet
     * @type {string}
     * @memberof UpdateAccountRequestV3
     */
    hashApproved?: string;

    keySeed?: string;

}

export interface OffChainWithdrawalRequestV3WithPatch {
    request: OffChainWithdrawalRequestV3
    web3: Web3
    chainId: ChainId
    walletType: ConnectorNames
    eddsaKey: string
    apiKey: string
    isHWAddr?: boolean
}

export interface OriginTransferRequestV3WithPatch {
    request: OriginTransferRequestV3
    web3: Web3
    chainId: ChainId
    walletType: ConnectorNames
    eddsaKey: string
    apiKey: string
    isHWAddr?: boolean
}
export interface OriginNFTTransferRequestV3WithPatch {
    request: OriginNFTTransferRequestV3
    web3: Web3
    chainId: ChainId
    walletType: ConnectorNames
    eddsaKey: string
    apiKey: string
    isHWAddr?: boolean
}
export interface OriginNFTWithdrawRequestV3WithPatch{
    request: NFTWithdrawRequestV3
    web3: Web3
    chainId: ChainId
    walletType: ConnectorNames
    eddsaKey: string
    apiKey: string
    isHWAddr?: boolean
}
export interface OriginNFTMINTRequestV3WithPatch{
    request: NFTMintRequestV3
    web3: Web3
    chainId: ChainId
    walletType: ConnectorNames
    eddsaKey: string
    apiKey: string
    isHWAddr?: boolean
}


export interface UpdateAccountRequestV3WithPatch {
    request: UpdateAccountRequestV3
    web3: Web3
    chainId: ChainId
    walletType: ConnectorNames
    isHWAddr?: boolean
}

export interface GetAccountServicesRequest {
    phone?: string
    email?: string
    wallet?: string
}

// NFT

export interface GetUserNFTBalancesRequest {
    accountId: number
    nftDatas?:string
    tokenAddrs?:string
    tokenIds?:string
    offset?:number
    limit?:number
    nonZero?:boolean
}

export interface UserNFTBalanceInfo {
    accountId: number,
    tokenId: number,
    nftData?: string,
    tokenAddress?:string,
    nftId?:string,
    total?:string,
    locked?:string,
    pending: {
        withdraw: string,
        deposit: string
    }
}

export interface GetUserVIPInfoRequest {
    userAddress: string;
}

export interface getUserVIPAssetsRequest {
    address: string;
    currency?: string;
    assetTypes?: string;
    token?: string;
    limit?: number;
}

export type NftData = string;

export interface NFTTokenInfo  {
    nftData: string,
    minter: string,
    nftType: string,
    tokenAddress: string,
    nftId: string,
    creatorFeeBips: 0,
    status: boolean
}

export type GetUserNFTTransferHistoryRequest = {
    accountId: number
    nftData?: string
    start?: number
    end?: number
    hashes?: string
    txStatus?: string
    limit?: number
    // offset?: number
    // transferTypes?: string // transfer, transfer_red
}

export type GetUserNFTDepositHistoryRequest = {
    accountId: number
    nftData?: string
    start?: number
    end?: number
    startId?: number
    hashes?: string
    txStatus?: string
    limit?: number
}

export type GetUserNFTWithdrawalHistoryRequest = {
    accountId: number
    nftData?: string
    start?: number
    end?: number
    startId?: number
    hashes?: string
    txStatus?: string
    limit?: number
}

export interface UserNFTDepositHistoryTx {
    id: number
    requestId: number
    nftData: string
    amount: string
    hash: string
    txHash: string
    accountId:number
    owner:string
    status: TxStatus
    progress: string
    timestamp: number
    blockId: number
    indexInBlock: number
    createdAt:number
    updatedAt: number
    feeTokenSymbol:string
    feeAmount:string
    memo?:string
    depositFrom:string
    depositFromAccountId:string
}

export interface UserNFTWithdrawalHistoryTx {
    id : number,
    requestId : number,
    hash : string,
    txHash : string,
    accountId : number,
    owner : string,
    status : string,
    nftData? : string,
    amount? : string,
    feeTokenSymbol? : string,
    feeAmount :  string,
    createdAt : number,
    updatedAt : number,
    memo? : string,
    recipient : string,
    distributeHash : string,
    fastWithdrawStatus : string,
    isFast : false,
    blockId : number,
    indexInBlock : number
}

export interface UserNFTTransferHistoryTx {
    id : string,
    requestId : number,
    hash : string,
    txHash : string,
    accountId : number,
    owner : string,
    status : string,
    nftData : string,
    amount : string,
    feeTokenSymbol : string,
    feeAmount : string,
    createdAt : number,
    updatedAt : number,
    memo : string,
    payeeId : number,
    payeeAddress : string,
    blockId : number,
    indexInBlock : number
}
