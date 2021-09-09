
export enum ReqMethod {
    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE',
}

export enum SigPatchField {
    EddsaSignature = 'eddsaSignature',
}

export enum MarketStatus {
    AMM = 1,
    ORDER_BOOK = 2,
    ALL = 3,
}

export enum TradeChannel {
    BLANK = '',
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

export enum Currency {
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

export enum WithdrawalTypes {
    OFFCHAIN_WITHDRAWAL = 'OFFCHAIN_WITHDRAWAL',
    ONCHAIN_WITHDRAWAL = 'ONCHAIN_WITHDRAWAL',
    FORCE_WITHDRAWAL = 'FORCE_WITHDRAWAL',
}

export enum UserTxTypes {
    DEPOSIT = 'deposit',
    TRANSFER = 'transfer',
    ONCHAIN_WITHDRAWAL = 'onchain_withdrawal',
    FORCE_WITHDRAWAL = 'force_withdrawal',
}

export enum TransferType {
    transfer = 'transfer',
    transfer_red = 'transfer_red',
}

export enum BillType {
    ORDER = 'order',
    DEPOSIT = 'deposit',
    ONCHAIN_WITHDRAWAL = 'onchain_withdrawal',
    OFFCHAIN_WITHDRAWAL = 'offchain_withdrawal',
    TRANSFER = 'transfer',
    TRANSFER_RED = 'transfer_red',
}

export enum FilledType {
    dex = 'dex',
    amm = 'amm',
}

export enum TxType {
    TRANSFER = 'TRANSFER',
    DEPOSIT = 'DEPOSIT',
    OFFCHAIN_WITHDRAWAL = 'OFFCHAIN_WITHDRAWAL',
}

export enum AmmTxType {
    JOIN = 'AMM_JOIN',
    EXIT = 'AMM_EXIT',
}

export enum SortOrder {
    ASC = 0,
    DESC = 1,
}

export enum RuleType {
    AMM_MINING = 'AMM_MINING',
    SWAP_VOLUME_RANKING = 'SWAP_VOLUME_RANKING',
    ORDERBOOK_MINING = 'ORDERBOOK_MINING',
}

export enum AmmPoolActivityStatus {
    NotStarted = 'NotStarted',
    InProgress = 'InProgress',
    EndOfGame = 'EndOfGame',
}

export enum SIG_FLAG {
    NO_SIG,
    EDDSA_SIG,
    EDDSA_SIG_POSEIDON,
}

export enum AssetType {
    LEVEL_ONE = 0,
    DEX = 1,
}

export enum IntervalType {
    HOUR = 0,
    DAY = 1,
}
