export enum ReqMethod {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
}

export enum SigPatchField {
  EddsaSignature = "eddsaSignature",
}

export enum MarketStatus {
  AMM = 1,
  ORDER_BOOK = 2,
  ALL = 3,
}

export enum VipCatergory {
  ORDERBOOK_TRADING_FEES_STABLECOIN = "ORDERBOOK_TRADING_FEES_STABLECOIN",
  ORDERBOOK_TRADING_FEES = "ORDERBOOK_TRADING_FEES",
  AMM_TRADING_FEES = "AMM_TRADING_FEES",
  OTHER_FEES = "OTHER_FEES",
}

export enum TradeChannel {
  BLANK = "",
  ORDER_BOOK = "ORDER_BOOK", // 0
  AMM_POOL = "AMM_POOL", // 1
  MIXED = "MIXED", // 2
}

export enum OrderType {
  LimitOrder = "LIMIT_ORDER",
  TakerOnly = "TAKER_ONLY",
  MakerOnly = "MAKER_ONLY",
  ClassAmm = "AMM",
}

export enum OrderTypeResp {
  LimitOrder = "LIMIT_ORDER",
  TakerOnly = "TAKER_ONLY",
  MakerOnly = "MAKER_ONLY",
  ClassAmm = "CLASS_AMM",
}

export enum Currency {
  usd = "usd",
  cny = "cny",
}

export enum OffchainFeeReqType {
  ORDER = 0,
  OFFCHAIN_WITHDRAWAL = 1,
  UPDATE_ACCOUNT = 2,
  TRANSFER = 3,
  FAST_OFFCHAIN_WITHDRAWAL = 4,
  OPEN_ACCOUNT = 5,
  AMM_EXIT = 6,
  DEPOSIT = 7,
  AMM_JOIN = 8,
  TRANSFER_AND_UPDATE_ACCOUNT = 15,
  DEFI_JOIN = 21,
  DEFI_EXIT = 22,
  FORCE_WITHDRAWAL = 23,
}
export enum OffchainNFTFeeReqType {
  NFT_MINT = 9,
  NFT_WITHDRAWAL = 10,
  NFT_TRANSFER = 11,
  NFT_DEPLOY = 13,
  NFT_TRANSFER_AND_UPDATE_ACCOUNT = 19,
}

export enum TradingInterval {
  min1 = "1min",
  min5 = "5min",
  min15 = "15min",
  min30 = "30min",
  hr1 = "1hr",
  hr2 = "2hr",
  hr4 = "4hr",
  hr12 = "12hr",
  d1 = "1d",
  w1 = "1w",
}

export enum TxStatus {
  processing = "processing",
  processed = "processed",
  received = "received",
  failed = "failed",
}

export enum OrderStatus {
  processing = "processing",
  processed = "processed",
  failed = "failed",
  cancelled = "cancelled",
  cancelling = "cancelling",
  expired = "expired",
}

export enum Side {
  Buy = "BUY",
  Sell = "SELL",
}

export enum WithdrawalTypes {
  OFFCHAIN_WITHDRAWAL = "OFFCHAIN_WITHDRAWAL",
  ONCHAIN_WITHDRAWAL = "ONCHAIN_WITHDRAWAL",
  FORCE_WITHDRAWAL = "FORCE_WITHDRAWAL",
}

export enum UserTxTypes {
  DEPOSIT = "deposit",
  TRANSFER = "transfer",
  OFFCHAIN_WITHDRAWAL = "offchain_withdrawal",
  FORCE_WITHDRAWAL = "force_withdrawal",
  DELEGATED_FORCE_WITHDRAW = "delegated_force_withdraw",
}

export enum UserNFTTxTypes {
  DEPOSIT = "deposit",
  TRANSFER = "transfer",
  WITHDRAW = "onchain_withdrawal",
  MINT = "mint",
}

export enum TransferType {
  transfer = "transfer",
  transfer_red = "transfer_red",
}

export enum BillType {
  ORDER = "order",
  DEPOSIT = "deposit",
  ONCHAIN_WITHDRAWAL = "onchain_withdrawal",
  OFFCHAIN_WITHDRAWAL = "offchain_withdrawal",
  TRANSFER = "transfer",
  TRANSFER_RED = "transfer_red",
}

export enum FilledType {
  dex = "dex",
  amm = "amm",
}

export enum TxType {
  TRANSFER = "TRANSFER",
  DEPOSIT = "DEPOSIT",
  OFFCHAIN_WITHDRAWAL = "OFFCHAIN_WITHDRAWAL",
}

export enum TxNFTType {
  TRANSFER = "TRANSFER",
  DEPOSIT = "DEPOSIT",
  WITHDRAW = "WITHDRAW",
  ALL = "ALL",
  MINT = "MINT",
}

export enum AmmTxType {
  JOIN = "AMM_JOIN",
  EXIT = "AMM_EXIT",
}

export enum SortOrder {
  ASC = 0,
  DESC = 1,
}

export enum RuleType {
  AMM_MINING = "AMM_MINING",
  SWAP_VOLUME_RANKING = "SWAP_VOLUME_RANKING",
  ORDERBOOK_MINING = "ORDERBOOK_MINING",
}

export enum AmmPoolActivityStatus {
  NotStarted = "NotStarted",
  InProgress = "InProgress",
  EndOfGame = "EndOfGame",
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
