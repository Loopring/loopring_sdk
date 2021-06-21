import { ChainId } from "./web3_defs"

export const VALID_UNTIL = 1700000000

export enum ReqMethod {
    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE',
}

export enum SigPatchField {
    EddsaSignature = 'eddsaSignature',
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
export const REFRESH_RATE = 1000

export const REFRESH_RATE_SLOW = 15000

export const DEFAULT_TIMEOUT = 30000

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
    base_token_volume: number
    quote_token_volume: number
    base_token_amt: number
    quote_token_amt: number
    open: number
    high: number
    low: number
    close: number
    count: number
    bid: number
    ask: number
    change?: number
}

export interface DepthData {
    version: number
    date_time: Date
    bids: any[][]
    bids_prices: any[]
    bids_amtTotals: any[]
    asks: any[][]
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

export interface AmmPoolInfoMap {
    [key: string]: AmmPoolInfoV3
}

export interface TokenRelatedInfo {
    tokenId: string
    tokenList: string[]
}

export interface TokenPairs {
    [key: string]: TokenRelatedInfo
}

export interface AmmPoolConfResponse {
    ammpools: {
        [key: string]: AmmPoolInfoV3
    },
    pairs: TokenPairs,
    raw_data: any,
}

export interface AmmPoolBalance {
    poolName: string,
    poolAddress: string,
    pooled: any[],
    lp: any,
    risky: boolean,
    pooledMap: {
        [key: string]: any,
    }
}

export interface AmmPoolBalancesResponse {
    ammpoolsbalances: {
        [key: string]: AmmPoolBalance
    },
    raw_data: any,
}

export interface TokensResponse {
    tokenSymbolMap: {
        [key: string]: TokenInfo
    },
    tokenIdMap: {
        [key: string]: TokenInfo
    },
    tokenAddressMap: {
        [key: string]: TokenInfo
    },

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
    hasMarket: any,
    getExistedMarket: any,
    markets: {
        [key: string]: MarketInfo,
    },
    pairs: TokenPairs,
    tokenArr: string[],
    tokenArrStr: string,
    marketArr: string[],
    marketArrStr: string,
    raw_data: any,
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

export interface GetAmmUserRewardsRequest {
    owner: number // accountId
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

export interface GetAmmPoolTradesRequest {
    ammPoolAddress: string
    limit?: number
    offset?: number
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

export interface GetFiatPriceRequest {
    legal: string
}

export interface GetMarketTradesRequest {
    market: string
    limit?: number
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

export interface GetUserBalancesRequest {
    accountId: number
    tokens: string
}

export interface GetUserFeeRateRequest {
    accountId: number
    markets: string
}

export interface GetOrderDetailsRequest {
    accountId: number
    orderHash: string
}

export interface GetUserOrderFeeRateRequest {
    accountId: number
    market: string
    tokenB: number
    amountB: string
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

export interface GetUserPwdResetTxsRequest {
    accountId: number
    start?: number
    end?: number
    status?: string
    limit?: number
    offset?: number
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

export interface GetUserTradesRequest {
    accountId: number
    market?: string
    orderHash?: string
    offset?: number
    limit?: number
    fromId?: number
    fillTypes?: string
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
