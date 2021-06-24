import { ChainId } from "./web3_defs"

export const VALID_UNTIL = 1700000000

export const DEFAULT_TIMEOUT = 30000

export enum ReqMethod {
    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE',
}

export enum SigPatchField {
    EddsaSignature = 'eddsaSignature',
}

export enum TradeChannel {
    ORDER_BOOK = 'ORDER_BOOK', // 0
    AMM_POOL = 'AMM_POOL', // 1
    MIXED = 'MIXED', // 2
}

export enum OrderType {
    LimitOrder = 'LIMIT_ORDER',
    TakerOnly = 'TAKER_ONLY',
    MakerOnly = 'MAKER_ONLY',
    ClassAmm = 'AMM'
}

export enum FiatType {
    USD = 'usd',
    CNY = 'cny',
}

export enum OffchainFeeReqType {
    ORDER,
    OFFCHAIN_WITHDRAWAL,
    UPDATE_ACCOUNT,
    TRANSFER,
    FAST_OFFCHAIN_WITHDRAWAL,
    OPEN_ACCOUNT,
    AMM_EXIT,
    DEPOSIT,
    AMM_JOIN,
}

export enum TradingInterval {
    min1 = '1min',
    min5 = '5min',
    min15 = '15min',
    min30 = '30min',
    hr1 = '1hr',
    hr2 = '2hr',
    hr4 = '4hr',
    hr12 = '12hr',
    d1 = '1d',
    w1 = '1w',
}

export enum TxStatus {
    processing = 'processing',
    processed = 'processed',
    received = 'received',
    failed = 'failed',
}

export enum OrderStatus {
    processing = 'processing',
    processed = 'processed',
    failed = 'failed',
    cancelled = 'cancelled',
    cancelling = 'cancelling',
    expired = 'expired',
}

export enum Side {
    Buy = 'BUY',
    Sell = 'SELL',
}

export enum TransferType {
    transfer = 'transfer',
    transfer_red = 'transfer_red',
}

export enum FilledType {
    dex = 'dex',
    amm = 'amm',
}

export enum TxTypes {
    JOIN = 'join',
    EXIT = 'exit',
}

export enum SIG_FLAG {
    NO_SIG,
    EDDSA_SIG,
    EDDSA_SIG_POSEIDON,
    ECDSA_SIG,
}

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
        web3? : any
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
    date_time: Date
    base_token_volume: string
    quote_token_volume: string
    base_token_amt: string
    quote_token_amt: string
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
    amt: number
    amtTotal: number
}

export interface DepthData {
    version: number
    date_time: Date
    bids: ABInfo[][]
    bids_prices: any[]
    bids_amtTotals: any[]
    asks: ABInfo[][]
    asks_prices: any[]
    asks_amtTotals: any[]
}

export interface Candlestick {
    timeStamp: number
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
    decimals: number,
    precision: number,
    orderAmounts: {
        minimum: string
        maximum: string
        dust: string
    },
    fastWithdrawLimit: string,
    gasAmounts: {
        distribution: string,
        deposit: string
    },
    enabled: boolean
}

export interface AmmPoolStat {
    market: string,
    liquidity: string[],
    lpLiquidity: string,
    liquidityUSD: string,
    ohlc: string[],
    volume: string[],
    fees: string[],
    apyBips: string,
    isRecommended: boolean,
    rewards: any[]
}

export interface AmmPoolActivityRule {
    market: string
    ruleType: string
    rangeFrom: number
    rangeTo: number
    awardRules: any[]
    maxSpread: number
    topK: number
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
    tokenId: string;
    /**
     * The volume of the token
     * @type {string}
     * @memberof TokenVolumeV3
     */
    volume: string;
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
    rank: number,
    rewards: TokenVolumeV3[]
}

export interface GetAmmUserRewardsRequest {
    owner: number // accountId
}

export interface AmmUserReward {
    market: string,
    feeRewards: [],
    extraRewards: [],
    currentRewards: [],
}

export interface AmmUserRewardMap {
    [key: string]: AmmUserReward
}

export interface GetAmmPoolGameRankRequest {
    ammPoolMarket: string // symbol AMM-LRC-ETH
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
    lp: TokenInfo,
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

export interface AmmPoolTrades {
    totalNum: number
    trades: AmmPoolTrade[]
}

export interface GetUserAmmPoolTxsRequest {
    accountId: number
    start?: number
    end?: number
    limit?: number
    offset?: number
    txTypes?: TxTypes
    txStatus?: TxStatus
    ammPoolAddress?: string
}

export interface PooledToken {
    tokenId: number
    amount: string
    actualAmount: string
    feeAmount: string
}

export interface AmmPoolTx {
    hash: string
    txType: string
    txStatus: TxStatus
    ammPoolAddress: string
    ammLayerType: string
    poolTokens: [PooledToken, PooledToken]
    lpToken: PooledToken
    createdAt: number
    updatedAt: number
}

export interface UserAmmPoolTxs {
    totalNum: number
    transactions: AmmPoolTx[]

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

export interface GetTokenBalancesRequest {
    owner: string
    token: string
}

export interface GetAllowancesRequest {
    owner: string
    token: string
}

export interface GetDepthRequest {
    market: string[]
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
    orderType: OrderType,
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
    accountId: number
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

export interface UserDepositHistory {
    totalNum: number
    transactions: UserDepositHistoryTx[]
}

export interface UserOnchainWithdrawalHistoryTx extends UserDepositHistoryTx {}

export interface UserOnchainWithdrawalHistory {
    totalNum: number
    transactions: UserOnchainWithdrawalHistoryTx[]
}

export interface GetUserOnchainWithdrawalHistoryRequest {
    accountId: number
    start?: number
    end?: number
    status?: string
    limit?: number
    tokenSymbol?: string
    offset?: number
    withdrawalTypes?: string
}

export interface GetUserTransferListRequest {
    accountId: number
    start?: number
    end?: number
    status?: string
    limit?: number
    tokenSymbol?: string
    offset?: number
    transferTypes?: string
}

export interface UserTransferRecord {
    id: number
    hash: string
    txType: TxTypes
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

export interface UserTransferList {
    totalNum: number
    transactions: UserTransferRecord[]
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

export interface UserTrade extends MarketTradeInfo {}

export interface UserTrades {
    totalNum: number
    trades: UserTrade[]
}

export interface CancelOrderRequest {
    accountId: number
    orderHash?: string
    clientOrderId?: string
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
}
