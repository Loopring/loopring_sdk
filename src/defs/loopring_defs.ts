import { ChainId, ConnectorNames } from './web3_defs'

import Web3 from 'web3'

import {
  AmmPoolActivityStatus,
  AmmTxType,
  AssetType,
  BillType,
  Currency,
  IntervalType,
  MarketStatus,
  OffchainFeeReqType,
  OffchainNFTFeeReqType,
  OrderStatus,
  OrderType,
  OrderTypeResp,
  ReqMethod,
  RuleType,
  Side,
  SIG_FLAG,
  TradeChannel,
  TradingInterval,
  TransferType,
  TxStatus,
  TxType,
  UserBillTypes,
  UserNFTTxTypes,
  UserTxTypes,
  WithdrawalTypes,
} from './loopring_enums'
import { RESULT_INFO } from './error_codes'
import { HEBAO_LOCK_STATUS, HEBAO_META_TYPE } from './loopring_constants'
import { CounterFactualInfo, NFTCounterFactualInfo } from './account_defs'
import { NFTType } from '../api'

export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }
export type XOR<T, U> = T | U extends { [key: string]: any }
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U

export interface VipFeeRateInfo {
  symbol: string
  makerRate: number
  takerRate: number
}

export type VipFeeRateInfoMap = { [key: string]: VipFeeRateInfo }

export type TX_HASH_API = { hash?: string; resultInfo?: RESULT_INFO }
export type TX_HASH_RESULT<T> = T & { raw_data: T }

export interface ReqOptions {
  baseUrl?: string
  apiKey?: string
  signature?: string

  url?: string
}

export enum NetworkWallet {
  ETHEREUM = 'ETHEREUM',
  ARBITRUM = 'ARBITRUM',
  GOERLI = 'GOERLI',
  TAIKO = 'TAIKO',
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
    sig?: string
    sigPatch?: string

    PrivateKey?: string

    owner?: string
    pwd?: string
    web3?: any
    hasDataStruct?: boolean
  }
  eddsaSignature?: string
  ecdsaSignature?: string
  eddsaSignatureREFER?: boolean
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
  }
  luckyTokenAmounts: {
    minimum: string
    maximum: string
    dust: string
  }
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

export interface AmmPoolInProgressActivityRule {
  market: string
  ruleType: RuleType[]
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
  name: string
  market: string
  address: string
  version: string
  tokens: {
    pooled: string[]
    lp: number
  }
  feeBips: number
  precisions: {
    price: number
    amount: number
  }
  createdAt: string
  status: number
  domainSeparator: string
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

  getTokenInfoBySymbol: any
  getTokenInfoById: any

  tokenSymbolArr: string[]
  tokenSymbolArrStr: string
  tokenIdArr: string[]
  tokenIdArrStr: string
  tokenAddressArr: string[]
  tokenAddressArrStr: string

  raw_data: any
}

export interface MarketInfo {
  baseTokenId: number
  enabled: boolean
  market: string
  orderbookAggLevels: number
  precisionForPrice: number
  quoteTokenId: number
  status?: MarketStatus
  isSwapEnabled?: boolean
  createdAt?: number
}

export enum DefiMarketStatus {
  hide = 0,
  show = 1,
  depositOnly = 3,
  depositAll = 7,
  withdrawOnly = 9,
  depositAllAndWithdraw = 15,
  withdrawAll = 25,
  WithdrawAllAndDeposit = 27,
  depositAndWithdraw = 11,
  all = 31,
}

export interface DefiMarketInfo {
  type: string
  market: string
  apy: string
  baseTokenId: number
  quoteTokenId: number
  precisionForPrice: number
  orderbookAggLevels: number
  enabled: boolean
  currency: string
  status: DefiMarketStatus
  accountId: number
  address: string
  depositFeeBips: number
  withdrawFeeBips: number
  depositPrice: string
  withdrawPrice: string
  baseVolume: string
  quoteVolume: string
  quoteLimitAmount: string
  baseLimitAmount: string
  quoteAlias: string
  stepLength: string
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
  tokenId: string | number
  /**
   * The volume of the token
   * @type {string}
   * @memberof TokenVolumeV3
   */
  volume: string
}

export interface TokenVolumeV5 {
  /**
   * The Loopring\'s token identifier.
   * @type {string}
   * @memberof TokenVolumeV3
   */
  tokenId: string | number
  /**
   * The volume of the token
   * @type {string}
   * @memberof TokenVolumeV3
   */
  amount: string
}

export interface TokenVolumeNFT {
  /**
   * The Loopring\'s token identifier.
   * @type {string}
   * @memberof TokenVolumeV3
   */
  tokenId: string | number
  /**
   * The amount of the token
   * @type {string}
   * @memberof TokenVolumeV3
   */
  amount: string
  /**
   * The Loopring's NFTAction token data identifier which is a hash string of NFTAction token address and NFT_ID
   * @type {string}
   * @memberof The Loopring's NFTAction token data identifier which is a hash string of NFTAction token address and NFT_ID
   */
  nftData: NftData
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
  market: string
  feeRewards: string[]
  extraRewards: TokenVolumeV3[]
  currentRewards: TokenVolumeV3[]
}

export interface AmmUserRewardMap {
  [key: string]: {
    current?: AmmUserReward
    lastDay?: AmmUserReward
  }
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
  poolName: string
  poolAddress: string
  pooled: [TokenVolumeV3, TokenVolumeV3]
  lp: TokenVolumeV3
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
  domainSeparator?: string
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
  domainSeparator?: string
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
  ammLayerType: string
  poolTokens: [TokenVolumeV4, TokenVolumeV4]
  lpToken: TokenVolumeV4
  createdAt: number
  updatedAt: number
}

export enum AMMtxTypes {
  JOIN = 0,
  EXIT = 1,
}

export interface GetUserAmmPoolTxsRequest {
  accountId: number
  start?: number
  end?: number
  limit?: number
  offset?: number
  txTypes?: AMMtxTypes // combine of AmmTxType
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
  startAt: number
  timeInterval: string
  accountId: number
  tokenId: number
  market: string
  score: number
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

export enum OrderMakerType {
  taker = 'taker',
  maker = 'maker',
}

export interface MarketTradeInfo {
  tradeTime: number
  tradeId: string
  side: Side
  volume: string
  price: string
  market: string
  fee: string
  type: OrderMakerType
}

export interface GetWithdrawalAgentsRequest {
  tokenId: number
  amount: string
}

export interface GetEthBalancesRequest {
  owner: string
}

export type TokenAddress = string

export interface GetTokenBalancesRequest {
  owner: string
  token: TokenAddress[]
}

export interface GetALLTokenBalancesRequest {
  owner: string
}

export interface GetAllowancesRequest {
  owner: string
  token: TokenAddress[] // tokenAddress
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

export type GetAccountRequest =
  | {
      owner: string
    }
  | {
      accountId: number
    }

export interface GetCounterFactualInfoRequest {
  accountId: number
}

export interface GetAvailableBrokerRequest {
  type: number
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

export type GetOffchainFeeAmtRequest =
  | ({
      accountId: number
      amount?: string
    } & {
      requestType: Omit<
        OffchainFeeReqType,
        | OffchainFeeReqType.OFFCHAIN_WITHDRAWAL
        | OffchainFeeReqType.AMM_JOIN
        | OffchainFeeReqType.AMM_EXIT
        | OffchainFeeReqType.ORDER
        | OffchainFeeReqType.FAST_OFFCHAIN_WITHDRAWAL
      >
    })
  | {
      requestType:
        | OffchainFeeReqType.OFFCHAIN_WITHDRAWAL
        | OffchainFeeReqType.AMM_JOIN
        | OffchainFeeReqType.AMM_EXIT
        | OffchainFeeReqType.ORDER
      tokenSymbol: string
    }
  | {
      requestType: OffchainFeeReqType.DEFI_EXIT | OffchainFeeReqType.DEFI_JOIN
      market: string
    }
  | {
      requestType: OffchainFeeReqType.FAST_OFFCHAIN_WITHDRAWAL
      tokenSymbol: string
      amount: string
    }
  | { requestType: OffchainFeeReqType.EXTRA_TYPES; extraType: any }

/**
 * @methodOf OffchainNFTFeeReqType.NFT_MINT
 * @requires  tokenAddress
 *
 * @methodOf {} OffchainNFTFeeReqType.NFT_WITHDRAWAL
 * @param deployInWithdraw
 */
export type GetNFTOffchainFeeAmtRequest = {
  accountId: number
  amount?: string
} & XOR<
  {
    requestType: Omit<
      OffchainNFTFeeReqType,
      | OffchainNFTFeeReqType.NFT_MINT
      | OffchainNFTFeeReqType.NFT_WITHDRAWAL
      | OffchainNFTFeeReqType.EXTRA_TYPES
    >
  },
  | {
      requestType: OffchainNFTFeeReqType.NFT_MINT
      tokenAddress: string
    }
  | {
      requestType: OffchainNFTFeeReqType.NFT_WITHDRAWAL
      tokenAddress: string
      deployInWithdraw?: boolean
    }
  | { requestType: OffchainNFTFeeReqType.EXTRA_TYPES; extraType: any }
>

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
  tradeCost: string
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

// export interface GetUserBalancesRequest {
// 	accountId: number;
// 	tokens: string;
// 	*accountId		10106
// 	*tokenId		1
// 	*status		10106
// 	*lockTag		DUAL_CURRENCY,DUAL_BASE
// 	offset		3
// 	limit
// 	hash
// 	delegatorAccountId
// 	start
// }

export interface UserBalanceInfo {
  tokenId: number
  total: string
  locked: string
  pending: {
    withdraw: string
    deposit: string
  }
}

export interface GetOrderDetailsRequest {
  accountId: number
  orderHash: string
}

export interface OrderDetail {
  hash: string
  clientOrderId: string
  side: Side
  market: string
  price: string
  volumes: {
    baseAmount: string
    quoteAmount: string
    baseFilled: string
    quoteFilled: string
    fee: string
  }
  validity: { start: number; end: number }
  orderType: OrderTypeResp
  tradeChannel: TradeChannel
  status: OrderStatus
  extraOrderType?: boolean
  stopPrice?: string
  stopSide: STOP_SIDE
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
  exchange: string
  /**
   * account ID
   * @type {number}
   * @memberof OffChainWithdrawalRequestV3
   */
  accountId: number
  /**
   * account owner address
   * @type {string}
   * @memberof OffChainWithdrawalRequestV3
   */
  owner: string
  /**
   *
   * @type {TokenVolumeV3}
   * @memberof OffChainWithdrawalRequestV3
   */
  token: TokenVolumeV3
  /**
   *
   * @type {TokenVolumeV3}
   * @memberof OffChainWithdrawalRequestV3
   */
  maxFee: TokenVolumeV3
  /**
   * offchain ID
   * @type {number}
   * @memberof OffChainWithdrawalRequestV3
   */
  storageId: number
  /**
   * Timestamp for order to become invalid
   * @type {number}
   * @memberof OffChainWithdrawalRequestV3
   */
  validUntil: number
  /**
   * min gas for on-chain withdraw, Loopring exchange allocates gas for each distribution,
   * but people can also assign this min gas,
   * so Loopring has to allocate higher gas value for this specific distribution.
   * Normally no need to take care of this value,
   * 0 means let loopring choose the reasonable gas
   * @type {number}
   * @memberof OffChainWithdrawalRequestV3
   */
  minGas: number
  /**
   * withdraw to address
   * @type {string}
   * @memberof OffChainWithdrawalRequestV3
   */
  to: string
  /**
   * extra data for complex withdraw mode, normally none
   * @type {string}
   * @memberof OffChainWithdrawalRequestV3
   */
  extraData?: string
  /**
   * is fast withdraw mode
   * @type {boolean}
   * @memberof OffChainWithdrawalRequestV3
   */
  fastWithdrawalMode?: boolean
  /**
   * eddsa signature
   * @type {string}
   * @memberof OffChainWithdrawalRequestV3
   */
  eddsaSignature?: string
  /**
   * ecdsa signature
   * @type {string}
   * @memberof OffChainWithdrawalRequestV3
   */
  ecdsaSignature?: string
  /**
   * An approved hash string which was already submitted on eth mainnet
   * @type {string}
   * @memberof OffChainWithdrawalRequestV3
   */
  hashApproved?: string
  counterFactualInfo?: CounterFactualInfo
}

export enum EXTRA_ORDER_TYPES {
  TRADITIONAL_ORDER = 'TRADITIONAL_ORDER',
  STOP_LIMIT = 'STOP_LIMIT',
  TRAILING_STOP = 'TRAILING_STOP',
  OCO = 'OCO',
}

export interface GetOrdersRequest {
  accountId: number
  market?: string
  start?: number
  end?: number
  side?: Side[]
  status?: string[]
  tradeChannels?: string[]
  limit?: number
  offset?: number
  orderTypes?: OrderType
  extraOrderTypes?: string
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

export type UserPwdResetTx = UserRegTx

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
  id: number
  txType: WithdrawalTypes
  hash: string
  symbol: string
  amount: string
  txHash: string
  feeTokenSymbol: string
  feeAmount: string
  status: TxStatus
  progress: string
  timestamp: number
  blockNum: number
  updatedAt: number
  distributeHash: string
  requestId: number
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
  network?: NetworkWallet
}

export interface GetUserTradeAmount {
  accountId: number
  markets?: string
  limit?: number
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
  network?: NetworkWallet
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

export interface GetUserBillsRequest {
  accountId: number
  fromAddress?: string
  transferAddress?: string
  start?: number
  end?: number
  offset?: number
  limit?: number
  billType?: UserBillTypes[]
}

export interface GetReferSelf {
  accountId: string
  offset?: number
  limit?: number
  start?: number
  end?: number
}

export interface ReferSelf {
  accountId: string
  lrcAmount: string
  startAt: number
  endAt: number
}

export enum GetReferStatisticReason {
  Recommender = 9,
  Invited = 1,
}

export interface GetReferStatistic {
  accountId: string
  reason: GetReferStatisticReason
}

export interface ReferStatistic {
  accountId: number
  totalProfit: string
  claimableProfit: string
  tradeNum: number
  reason: string
  createdAt: number
  updatedAt: number
  downsidesNum: number
}

export interface GetReferDownsides {
  accountId: string
  offset?: number
  limit?: number
  start?: number
  end?: number
}

export interface ReferDownsides {
  address: string
  lrcAmount: string
  startAt: number
  endAt: number
}

export enum REWARD_TYPE {
  MakerRewards = 1,
  ReferralRewards = 2,
  RefereeRewards = 3,
}

export interface GetUserRewardRequest {
  rewardType: REWARD_TYPE
  accountId: number
  size?: number
}

export interface GetUserNFTTxsRequest {
  accountId: number
  // tokenSymbol?: string;
  metadata?: boolean
  start?: number
  end?: number
  offset?: number
  limit?: number
  types?: UserNFTTxTypes[] | string
}

export declare enum NFT_TRADE {
  SELL = 'SELL',
  BUY = 'BUY',
}

export interface GetUserNFTTradeRequest {
  accountId: number
  nftData?: boolean
  orderHash?: string
  tradeHash?: string
  start?: number
  end?: number
  side: NFT_TRADE
  offset?: number
  limit?: number
  metadata?: boolean
}

export interface UserTx {
  id: number
  txType: string
  hash: string
  symbol: string
  amount: string
  receiver: number
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

/**
 * @param {string} guardian address
 */
export interface SendMetaTxRequest {
  wallet: string
  module: string
  value: string
  data: string
  nonce: string
  validUntil: string
  gasToken: string
  gasPrice: string
  gasLimit: string
  gasOverhead: string
  feeRecipient: string
  signatures: string
  signers: string
  metaTxType: 0
  requestId: string
  securityId: string
  guardianType: string
  network?: NetworkWallet
}

/**
 * @param {string} guardian address
 */
export interface GetGuardianApproveListRequest {
  guardian: string
  network?: NetworkWallet
}

/**
 * @param {string} owner address
 */
export interface GetEnsNameRequest {
  owner: string
  network?: NetworkWallet
}

export interface GET_WALLET_TYPE {
  wallet: string
  network?: NetworkWallet
}

/**
 * @param {string} fullName ENSName
 */
export interface GetEnsAddressRequest {
  fullName: string
  network?: NetworkWallet
}

export interface SubmitApproveSignatureRequestWithPatch {
  request: ApproveSignatureRequest
  guardian: Guardian
  web3: Web3
  chainId: ChainId
  walletType: ConnectorNames
  eddsaKey: string
  apiKey: string
  isHWAddr?: boolean
}

/**
 * @param {string} approveRecordId
 * @param {string} securityNumber
 * @param {string} txAwareHash
 * @param {string} signer
 * @param {string} wallet
 * @param {string} signature
 */
export interface ApproveSignatureRequest {
  approveRecordId: string
  txAwareHash?: string //currentRequest.messageHash,
  securityNumber: string
  signer: string //address,
  signature: string
  network?: NetworkWallet
}

/**
 * @param {string} guardian address
 * @param {string} protectAddress? address
 */
export interface GetProtectorRequest {
  guardian: string
  protectAddress?: string
  network?: NetworkWallet
}

export enum TradesFillTypes {
  dex = 'dex',
  amm = 'amm',
}

export interface GetUserTradesRequest {
  accountId: number
  market?: string
  orderHash?: string
  offset?: number
  limit?: number
  fromId?: number
  fillTypes?: TradesFillTypes
}

export type UserTrade = MarketTradeInfo

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

export enum EXTRAORDER_TYPE {
  TRADITIONAL_ORDER = 'TRADITIONAL_ORDER',
  STOP_LIMIT = 'STOP_LIMIT',
}

export enum STOP_SIDE {
  NO_CONDITION = 'NO_CONDITION',
  GREAT_THAN_AND_EQUAL = 'GREAT_THAN_AND_EQUAL',
  LESS_THAN_AND_EQUAL = 'LESS_THAN_AND_EQUAL',
}

export interface SubmitOrderRequestV3 {
  /**
   * The adderss of the exchange which has to process this order
   * @type {string}
   * @memberof SubmitOrderRequestV3
   */
  exchange: string
  /**
   * Loopring\'s account ID
   * @type {number}
   * @memberof SubmitOrderRequestV3
   */
  accountId: number
  /**
   * The unique identifier of the L2 Merkle tree storage slot where the burn made in order to exit the pool will or has been stored.
   * @type {number}
   * @memberof SubmitOrderRequestV3
   */
  storageId: number
  /**
   *
   * @type {TokenVolumeV3}
   * @memberof SubmitOrderRequestV3
   */
  sellToken: TokenVolumeV3
  /**
   *
   * @type {TokenVolumeV3}
   * @memberof SubmitOrderRequestV3
   */
  buyToken: TokenVolumeV3
  /**
   * Whether the order supports partial fills or not.Currently only supports false as a valid value
   * @type {string}
   * @memberof SubmitOrderRequestV3
   */
  allOrNone: boolean
  /**
   * Fill size by buy token or by sell token
   * @type {string}
   * @memberof SubmitOrderRequestV3
   */
  fillAmountBOrS: boolean
  /**
   * Order expiration time, accuracy is in seconds
   * @type {number}
   * @memberof SubmitOrderRequestV3
   */
  validUntil: number
  /**
   * Maximum order fee that the user can accept, value range (in ten thousandths) 1 ~ 63
   * @type {number}
   * @memberof SubmitOrderRequestV3
   */
  maxFeeBips: number
  /**
   * The orders EdDSA signature. The signature is a hexadecimal string obtained by signing the order itself and concatenating the resulting signature parts (Rx, Ry, and S). Used to authenticate and authorize the operation.
   * @type {string}
   * @memberof SubmitOrderRequestV3
   */
  eddsaSignature: string
  /**
   * An arbitrary, client-set unique order identifier, max length is 120 bytes
   * @type {string}
   * @memberof SubmitOrderRequestV3
   */
  clientOrderId?: string
  /**
   * Order types, can be AMM, LIMIT_ORDER, MAKER_ONLY, TAKER_ONLY
   * @type {string}
   * @memberof SubmitOrderRequestV3
   */
  orderType?: OrderType
  /**
   * Used by the P2P order which user specify the taker, so far its 0x0000000000000000000000000000000000000000
   * @type {string}
   * @memberof SubmitOrderRequestV3
   */

  tradeChannel?: TradeChannel

  taker?: string
  /**
   * The AMM pool address if order type is AMM
   * @type {string}
   * @memberof SubmitOrderRequestV3
   */
  poolAddress?: string
  /**
   * Aux data to mark the order source
   * @type {string}
   * @memberof SubmitOrderRequestV3
   */
  channelId?: string
  extraOrderType?: EXTRAORDER_TYPE
  stopPrice?: string
  stopSide?: STOP_SIDE
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
  exchange: string
  /**
   * payer account ID
   * @type {number}
   * @memberof OriginTransferRequestV3
   */
  payerId: number
  /**
   * payer account address
   * @type {string}
   * @memberof OriginTransferRequestV3
   */
  payerAddr: string
  /**
   * payee account ID
   * @type {number}
   * @memberof OriginTransferRequestV3
   */
  payeeId: number
  /**
   * payee account address
   * @type {string}
   * @memberof OriginTransferRequestV3
   */
  payeeAddr: string
  /**
   *
   * @type {TokenVolumeV3}
   * @memberof OriginTransferRequestV3
   */
  token: TokenVolumeV3
  /**
   *
   * @type {TokenVolumeV3}
   * @memberof OriginTransferRequestV3
   */
  maxFee: TokenVolumeV3
  /**
   * offchain Id
   * @type {number}
   * @memberof OriginTransferRequestV3
   */
  storageId: number
  /**
   * Timestamp for order to become invalid
   * @type {number}
   * @memberof OriginTransferRequestV3
   */
  validUntil: number
  /**
   * eddsa signature
   * @type {string}
   * @memberof OriginTransferRequestV3
   */
  eddsaSignature?: string
  /**
   * ecdsa signature
   * @type {string}
   * @memberof OriginTransferRequestV3
   */
  ecdsaSignature?: string
  /**
   * An approved hash string which was already submitted on eth mainnet
   * @type {string}
   * @memberof OriginTransferRequestV3
   */
  hashApproved?: string
  /**
   * transfer memo
   * @type {string}
   * @memberof OriginTransferRequestV3
   */
  memo?: string
  /**
   * A user-defined id
   * @type {string}
   * @memberof OriginTransferRequestV3
   */
  clientId?: string

  /**
   * CounterFactualInfo
   * @type {CounterFactualInfo}
   * @memberof OriginTransferRequestV3
   */
  counterFactualInfo?: CounterFactualInfo

  /**
   * If true, let the sender transferring to the receiver pay the receiver's account activation fee
   * @type {boolean}
   * @memberof OriginTransferRequestV3
   */
  payPayeeUpdateAccount?: boolean
}

/**
 * Submit Forces Withdrawals params
 * @export
 * @interface OriginForcesWithdrawalsV3
 */
export interface OriginForcesWithdrawalsV3 {
  /**
   * requesterAddress account address
   * @type {string}
   * @memberof OriginForcesWithdrawalsV3
   */
  requesterAddress: string
  /**
   * requester withdrawls tokenId
   * @type {number}
   * @memberof OriginForcesWithdrawalsV3
   */
  tokenId: number
  /**
   * withdrawAddress account address
   * @type {string}
   * @memberof OriginForcesWithdrawalsV3
   */
  withdrawAddress: string
  /**
   * Transfer Request
   * @type {OriginTransferRequestV3}
   * @memberof OriginForcesWithdrawalsV3
   */
  transfer: Omit<OriginTransferRequestV3, 'payeeId' | 'maxFee' | 'memo'> & {
    payeeId?: 0
    memo?: string
    maxFee?: {
      volume: '0'
      tokenId: number | string
    }
  }
}

/**
 * Submit Deploy NFTAction params
 * @export
 * @interface OriginDeployNFTRequestV3
 */
export interface OriginDeployNFTRequestV3 {
  /**
   * Transfer
   * @type {OriginTransferRequestV3}
   * @memberof OriginDeployNFTRequestV3
   */
  transfer: Omit<OriginTransferRequestV3, 'payeeId' | 'maxFee' | 'memo'> & {
    payeeId?: 0
    memo?: string
    maxFee?: {
      volume: '0'
      tokenId: number | string
    }
  }
  /**
   * nftData
   * @type {string}
   * @memberof OriginDeployNFTRequestV3
   */
  nftData: string
  /**
   * NFTAction address
   * @type {string}
   * @memberof OriginDeployNFTRequestV3
   */
  tokenAddress: string
  counterFactualInfo?: CounterFactualInfo
}

export interface OriginDeployCollectionRequestV3 {
  /**
   * Transfer
   * @type {OriginTransferRequestV3}
   * @memberof OriginDeployNFTRequestV3
   */
  transfer: Omit<OriginTransferRequestV3, 'payeeId' | 'maxFee' | 'memo'> & {
    payeeId?: 0
    memo?: string
    maxFee?: {
      volume: '0'
      tokenId: number | string
    }
  }
  /**
   * nftOwner
   * @type {string}
   * @memberof OriginDeployCollectionRequestV3
   */
  nftOwner: string
  /**
   * nftBaseUri
   * @type {string}
   * @memberof OriginDeployCollectionRequestV3
   */
  nftBaseUri: string
  /**
   * nftFactory
   * @type {string}
   * @memberof OriginDeployCollectionRequestV3
   */
  nftFactory: string
  /**
   * tokenAddress
   * @type {string}
   * @memberof OriginDeployCollectionRequestV3
   */
  tokenAddress: string
  counterFactualInfo?: CounterFactualInfo
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
  exchange: string
  /**
   * fromAccountId
   * @type {number}
   * @memberof OriginNFTTransferRequestV3
   */
  fromAccountId: number
  /**
   * payer account address
   * @type {string}
   * @memberof OriginNFTTransferRequestV3
   */
  fromAddress: string
  /**
   * to account ID
   * @type {number}
   * @memberof OriginNFTTransferRequestV3
   */
  toAccountId: number
  /**
   * toAddress address
   * @type {string}
   * @memberof OriginNFTTransferRequestV3
   */
  toAddress: string
  /**
   *
   * @type {TokenVolumeNFT}
   * @memberof OriginNFTTransferRequestV3
   */
  token: TokenVolumeNFT
  /**
   *
   * @type { Pick<TokenVolumeV3,'tokenId'> & {amount:string}}
   * @memberof OriginNFTTransferRequestV3
   */
  maxFee: Pick<TokenVolumeV3, 'tokenId'> & { amount: string }
  /**
   * offchain Id
   * @type {number}
   * @memberof OriginNFTTransferRequestV3
   */
  storageId: number
  /**
   * Timestamp for order to become invalid
   * @type {number}
   * @memberof OriginNFTTransferRequestV3
   */
  validUntil: number
  /**
   * eddsa signature
   * @type {string}
   * @memberof OriginNFTTransferRequestV3
   */
  eddsaSignature?: string
  /**
   * ecdsa signature
   * @type {string}
   * @memberof OriginNFTTransferRequestV3
   */
  ecdsaSignature?: string
  /**
   * An approved hash string which was already submitted on eth mainnet
   * @type {string}
   * @memberof OriginNFTTransferRequestV3
   */
  hashApproved?: string
  /**
   * transfer memo
   * @type {string}
   * @memberof OriginNFTTransferRequestV3
   */
  memo?: string
  /**
   * A user-defined id
   * @type {string}
   * @memberof OriginNFTTransferRequestV3
   */
  clientId?: string

  /**
   * CounterFactualInfo
   * @type {CounterFactualInfo}
   * @memberof OriginNFTTransferRequestV3
   */
  counterFactualInfo?: CounterFactualInfo

  /**
   * If true, let the sender transferring to the receiver pay the receiver's account activation fee
   * @type {boolean}
   * @memberof OriginNFTTransferRequestV3
   */
  payPayeeUpdateAccount?: boolean
}

/**
 *
 * @export
 * @interface NFTWithdrawRequestV3
 */
export interface NFTWithdrawRequestV3 {
  /**
   * exchange address
   * @type {string}
   * @memberof OriginNFTWithdrawRequestV3
   */
  exchange: string
  /**
   * account ID
   * @type {number}
   * @memberof OriginNFTWithdrawRequestV3
   */
  accountId: number
  /**
   * account owner address
   * @type {string}
   * @memberof OriginNFTWithdrawRequestV3
   */
  owner: string
  /**
   *
   * @type {TokenVolumeNFT}
   * @memberof OriginNFTTransferRequestV3
   */
  token: TokenVolumeNFT
  /**
   *
   * @type {Pick<TokenVolumeV3,'tokenId'> & {amount:string}};
   * @memberof OriginNFTTransferRequestV3
   */
  maxFee: Pick<TokenVolumeV3, 'tokenId'> & { amount: string }
  /**
   * offchain ID
   * @type {number}
   * @memberof OriginNFTWithdrawRequestV3
   */
  storageId: number
  /**
   * Timestamp for order to become invalid
   * @type {number}
   * @memberof OriginNFTWithdrawRequestV3
   */
  validUntil: number
  /**
   * min gas for on-chain withdraw, Loopring exchange allocates gas for each distribution, but people can also assign this min gas, so Loopring have to allocate higher gas value for this specific distribution. Normally no need to take care of this value, 0 means let loopring choose the reasonable gas
   * @type {number}
   * @memberof OriginNFTWithdrawRequestV3
   */
  minGas: number
  /**
   * withdraw to address
   * @type {string}
   * @memberof OriginNFTWithdrawRequestV3
   */
  to: string
  /**
   * extra data for complex withdraw mode, normally none
   * @type {string}
   * @memberof OriginNFTWithdrawRequestV3
   */
  extraData?: string
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
  eddsaSignature?: string
  /**
   * ecdsa signature
   * @type {string}
   * @memberof OriginNFTWithdrawRequestV3
   */
  ecdsaSignature?: string
  /**
   * An approved hash string which was already submitted on eth mainnet
   * @type {string}
   * @memberof OriginNFTWithdrawRequestV3
   */
  hashApproved?: string
  counterFactualInfo?: CounterFactualInfo
}

/**
 *
 * @export
 * @interface NFTMintRequestV3
 */
export interface NFTMintRequestV3 {
  /**
   * exchange address
   * @type {string}
   * @memberof OriginNFTMintRequestV3
   */
  exchange: string
  /**
   * account ID
   * @type {number}
   * @memberof OriginNFTMintRequestV3
   */
  minterId: number
  /**
   * account owner address
   * @type {string}
   * @memberof OriginNFTMintRequestV3
   */
  minterAddress: string
  /**
   * The account receive the minted NFTAction token, now should be minter himself.
   * @type {number}
   * @memberof OriginNFTMintRequestV3
   */
  toAccountId: number
  /**
   * The account receive the minted NFTAction token, now should be minter himself.
   * @type {string}
   * @memberof OriginNFTMintRequestV3
   */
  toAddress?: string
  /**
   * nftType: 0 for EIP1155, 1 for EIP712. EIP1155 by default.
   * @type {number}
   * @memberof OriginNFTMintRequestV3
   */
  nftType: 0 | 1
  /**
   * Contract address
   * @type{string}
   * @memberof OriginNFTTransferRequestV3
   */
  tokenAddress: string
  /**
   * NFT_ID url_id
   * @type {string}   toString(16)
   * @memberof OriginNFTTransferRequestV3
   */
  nftId: string
  /**
   * The amount of the token
   * @type {string}
   * @memberof TokenVolumeV3
   */
  amount: string

  /**
   * Timestamp for order to become invalid
   * @type {number}
   * @memberof OriginNFTMintRequestV3
   */
  validUntil: number
  /**
   * offchain ID
   * @type {number}
   * @memberof OriginNFTMintRequestV3
   */
  storageId: number
  /**
   *
   * @type { Pick<TokenVolumeV3,'tokenId'> & {amount:string}}
   * @memberof OriginNFTTransferRequestV3
   */
  maxFee: Pick<TokenVolumeV3, 'tokenId'> & { amount: string }
  /**
   * 0-50
   * @type number
   * @memberof OriginNFTMintRequestV3
   */
  royaltyPercentage: number
  /**
   * force to mint, regardless the previous mint record
   * @type {boolean}
   * @memberof OriginNFTMintRequestV3
   */
  forceToMint?: boolean
  /**
   * eddsa signature
   * @type {string}
   * @memberof OriginNFTMintRequestV3
   */
  eddsaSignature?: string
  /**
   * ecdsa signature
   * @type {string}
   * @memberof OriginNFTMintRequestV3
   */
  ecdsaSignature?: string
  /**
   * An approved hash string which was already submitted on eth mainnet
   * @type {string}
   * @memberof OriginNFTMintRequestV3
   */
  hashApproved?: string
  counterFactualNftInfo?: NFTCounterFactualInfo | null
  counterFactualInfo?: CounterFactualInfo
}

// /**
//  *
//  * @export
//  * @interface NFTCollectionCreateRequestV3
//  */
// export interface NFTollectionCreateRequestV3 {
//   /**
//    * exchange address
//    * @type {string}
//    * @memberof OriginNFTMintRequestV3
//    */
//   exchange: string;
//   /**
//    * account ID
//    * @type {number}
//    * @memberof OriginNFTMintRequestV3
//    */
//   minterId: number;
//   /**
//    * account owner address
//    * @type {string}
//    * @memberof OriginNFTMintRequestV3
//    */
//   minterAddress: string;
//   /**
//    * The account receive the minted NFTAction token, now should be minter himself.
//    * @type {number}
//    * @memberof OriginNFTMintRequestV3
//    */
//   toAccountId: number;
//   /**
//    * The account receive the minted NFTAction token, now should be minter himself.
//    * @type {string}
//    * @memberof OriginNFTMintRequestV3
//    */
//   toAddress?: string;
//   /**
//    * nftType: 0 for EIP1155, 1 for EIP712. EIP1155 by default.
//    * @type {number}
//    * @memberof OriginNFTMintRequestV3
//    */
//   nftType: 0 | 1;
//   /**
//    * Contract address
//    * @type{string}
//    * @memberof OriginNFTTransferRequestV3
//    */
//   tokenAddress: string;
//   /**
//    * NFT_ID url_id
//    * @type {string}   toString(16)
//    * @memberof OriginNFTTransferRequestV3
//    */
//   nftId: string;
//   /**
//    * The amount of the token
//    * @type {string}
//    * @memberof TokenVolumeV3
//    */
//   amount: string;
//
//   /**
//    * Timestamp for order to become invalid
//    * @type {number}
//    * @memberof OriginNFTMintRequestV3
//    */
//   validUntil: number;
//   /**
//    * offchain ID
//    * @type {number}
//    * @memberof OriginNFTMintRequestV3
//    */
//   storageId: number;
//   /**
//    *
//    * @type { Pick<TokenVolumeV3,'tokenId'> & {amount:string}}
//    * @memberof OriginNFTTransferRequestV3
//    */
//   maxFee: Pick<TokenVolumeV3, "tokenId"> & { amount: string };
//   /**
//    * 0-50
//    * @type number
//    * @memberof OriginNFTMintRequestV3
//    */
//   royaltyPercentage: number;
//   /**
//    * force to mint, regardless the previous mint record
//    * @type {boolean}
//    * @memberof OriginNFTMintRequestV3
//    */
//   forceToMint?: boolean;
//   /**
//    * eddsa signature
//    * @type {string}
//    * @memberof OriginNFTMintRequestV3
//    */
//   eddsaSignature?: string;
//   /**
//    * ecdsa signature
//    * @type {string}
//    * @memberof OriginNFTMintRequestV3
//    */
//   ecdsaSignature?: string;
//   /**
//    * An approved hash string which was already submitted on eth mainnet
//    * @type {string}
//    * @memberof OriginNFTMintRequestV3
//    */
//   hashApproved?: string;
//   counterFactualNftInfo?: NFTCounterFactualInfo | null;
//   counterFactualInfo?: CounterFactualInfo;
// }

/**
 *
 * @export
 * @interface NFTOrderRequestV3
 */
export type NFTOrderRequestV3<R = 'Taker' | 'Maker'> = {
  /**
   * exchange address
   * @type {string}
   * @memberof NFTOrderRequestV3
   */
  exchange: string
  /**
   * account ID
   * @type {number}
   * @memberof NFTOrderRequestV3
   */
  accountId: number
  /**
   * storage ID
   * @type {number}
   * @memberof NFTOrderRequestV3
   */
  storageId: number

  /**
   *
   * @type {boolean}
   * @memberof NFTOrderRequestV3
   */
  allOrNone: boolean
  /**
   *
   * @type {boolean}
   * @memberof NFTOrderRequestV3
   */
  fillAmountBOrS: boolean
  /**
   * Timestamp for order to become invalid
   * @type {number}
   * @memberof NFTOrderRequestV3
   */
  validUntil: number
  /**
   * max fee bips.
   * @type {number | 0}
   * @memberof NFTOrderRequestV3
   */
  maxFeeBips?: number | 0
  /**
   * eddsa signature.
   * @type {string}
   * @memberof NFTOrderRequestV3
   */
  eddsaSignature?: string
  /**
   * client order id.
   * @type {string}
   * @memberof NFTOrderRequestV3
   */
  clientOrderId?: string
  /**
   * order type
   * @type{string}
   * @memberof NFTOrderRequestV3
   */
  orderType?: string
  /**
   * trade channel
   * @type {string}
   * @memberof NFTOrderRequestV3
   */
  tradeChannel?: string
  /**
   * taker address
   * @type {string}
   * @memberof NFTOrderRequestV3
   */
  taker?: string
  /**
   * affiliate account id
   * @type {string}
   * @memberof NFTOrderRequestV3
   */
  affiliate?: string
} & XOR<
  {
    /**
     * maker order
     * sell token info
     * @type {NFTTokenAmountInfo}
     * @memberof NFTOrderRequestV3
     */
    sellToken: NFTTokenAmountInfo
    /**
     * buy token info
     * @type {TokenVolumeV5}
     * @memberof NFTOrderRequestV3
     */
    buyToken: TokenVolumeV5
  },
  {
    /**
     * taker order
     * sell token info
     * @type {TokenVolumeV5}
     * @memberof NFTOrderRequestV3
     */
    sellToken: TokenVolumeV5
    /**
     * maker Order
     * buy token info
     * @type {NFTTokenAmountInfo}
     * @memberof NFTOrderRequestV3
     */
    buyToken: NFTTokenAmountInfo
  }
>

/**
 *
 * @export
 * @interface NFTTradeRequestV3
 */
export interface NFTTradeRequestV3 {
  /**
   * maker order
   * @type {NFTOrderRequestV3}
   * @memberof NFTTradeRequestV3
   */
  maker: NFTOrderRequestV3
  /**
   * maker fee bips
   * @type {number}
   * @memberof NFTOrderRequestV3
   */
  makerFeeBips: number
  /**
   * taker order
   * @type {NFTOrderRequestV3}
   * @memberof NFTTradeRequestV3
   */
  taker: NFTOrderRequestV3
  /**
   * taker fee bips
   * @type {number}
   * @memberof NFTTradeRequestV3
   */
  takerFeeBips: number
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
  exchange: string
  /**
   * account ID
   * @type {number}
   * @memberof OffChainWithdrawalRequestV3
   */
  accountId: number
  /**
   * account owner address
   * @type {string}
   * @memberof OffChainWithdrawalRequestV3
   */
  owner: string
  /**
   *
   * @type {TokenVolumeV3}
   * @memberof OffChainWithdrawalRequestV3
   */
  token: TokenVolumeV3
  /**
   *
   * @type {TokenVolumeV3}
   * @memberof OffChainWithdrawalRequestV3
   */
  maxFee: TokenVolumeV3
  /**
   * offchain ID
   * @type {number}
   * @memberof OffChainWithdrawalRequestV3
   */
  storageId: number
  /**
   * Timestamp for order to become invalid
   * @type {number}
   * @memberof OffChainWithdrawalRequestV3
   */
  validUntil: number
  /**
   * min gas for on-chain withdraw, Loopring exchange allocates gas for each distribution, but people can also assign this min gas, so Loopring have to allocate higher gas value for this specific distribution. Normally no need to take care of this value, 0 means let loopring choose the reasonable gas
   * @type {number}
   * @memberof OffChainWithdrawalRequestV3
   */
  minGas: number
  /**
   * withdraw to address
   * @type {string}
   * @memberof OffChainWithdrawalRequestV3
   */
  to: string
  /**
   * extra data for complex withdraw mode, normally none
   * @type {string}
   * @memberof OffChainWithdrawalRequestV3
   */
  extraData?: string
  /**
   * is fast withdraw mode
   * @type {boolean}
   * @memberof OffChainWithdrawalRequestV3
   */
  fastWithdrawalMode?: boolean
  /**
   * eddsa signature
   * @type {string}
   * @memberof OffChainWithdrawalRequestV3
   */
  eddsaSignature?: string
  /**
   * ecdsa signature
   * @type {string}
   * @memberof OffChainWithdrawalRequestV3
   */
  ecdsaSignature?: string
  /**
   * An approved hash string which was already submitted on eth mainnet
   * @type {string}
   * @memberof OffChainWithdrawalRequestV3
   */
  hashApproved?: string
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
  x: string
  /**
   * The public keys y part.
   * @type {string}
   * @memberof PublicKey
   */
  y: string
}

export interface UpdateAccountRequestV3 {
  /**
   * exchange address
   * @type {string}
   * @memberof UpdateAccountRequestV3
   */
  exchange: string
  /**
   * owner address
   * @type {string}
   * @memberof UpdateAccountRequestV3
   */
  owner: string
  /**
   * user account ID
   * @type {number}
   * @memberof UpdateAccountRequestV3
   */
  accountId: number
  /**
   *
   * @type {PublicKey}
   * @memberof UpdateAccountRequestV3
   */
  publicKey: PublicKey
  /**
   *
   * @type {TokenVolumeV3}
   * @memberof UpdateAccountRequestV3
   */
  maxFee: TokenVolumeV3
  /**
   * Timestamp for order to become invalid
   * @type {number}
   * @memberof UpdateAccountRequestV3
   */
  validUntil: number
  /**
   * Nonce of users exchange account that used in off-chain requests.
   * @type {number}
   * @memberof UpdateAccountRequestV3
   */
  nonce: number
  /**
   * eddsa signature of this request
   * @type {string}
   * @memberof UpdateAccountRequestV3
   */
  eddsaSignature?: string
  /**
   * ecdsa signature of this request
   * @type {string}
   * @memberof UpdateAccountRequestV3
   */
  ecdsaSignature?: string
  /**
   * An approved hash string which was submitted on eth mainnet
   * @type {string}
   * @memberof UpdateAccountRequestV3
   */
  hashApproved?: string

  keySeed?: string
  recommenderAccountId?: number
  counterFactualInfo?: CounterFactualInfo
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

export interface OriginForcesWithdrawalsRequestV3WithPatch {
  request: OriginForcesWithdrawalsV3
  web3: Web3
  chainId: ChainId
  walletType: ConnectorNames
  eddsaKey: string
  apiKey: string
  isHWAddr?: boolean
}

export interface OriginDeployNFTRequestV3WithPatch {
  request: OriginDeployNFTRequestV3
  web3: Web3
  chainId: ChainId
  walletType: ConnectorNames
  eddsaKey: string
  apiKey: string
  isHWAddr?: boolean
}

export interface OriginDeployCollectionRequestV3WithPatch {
  request: OriginDeployCollectionRequestV3
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

export interface OriginNFTWithdrawRequestV3WithPatch {
  request: NFTWithdrawRequestV3
  web3: Web3
  chainId: ChainId
  walletType: ConnectorNames
  eddsaKey: string
  apiKey: string
  isHWAddr?: boolean
}

export interface OriginNFTMINTRequestV3WithPatch {
  request: NFTMintRequestV3
  web3: Web3
  chainId: ChainId
  walletType: ConnectorNames
  eddsaKey: string
  apiKey: string
  isHWAddr?: boolean
}

export interface OriginNFTCreateCollectionRequestV3WithPatch {
  // request: NFTMintRequestV3;
  // web3: Web3;
  // chainId: ChainId;
  // walletType: ConnectorNames;
  // eddsaKey: string;
  // apiKey: string;
  // isHWAddr?: boolean;
}

export interface OriginNFTValidateOrderRequestV3WithPatch {
  request: NFTOrderRequestV3
  web3: Web3
  chainId: ChainId
  walletType: ConnectorNames
  eddsaKey: string
  apiKey: string
  isHWAddr?: boolean
}

export interface OriginNFTTradeRequestV3WithPatch {
  request: NFTTradeRequestV3
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
  privateKey?: string
}

export interface GetAccountServicesRequest {
  phone?: string
  email?: string
  wallet?: string
}

// NFTAction

export interface GetUserNFTBalancesRequest {
  accountId: number
  nftDatas?: string
  tokenAddrs?: string
  tokenIds?: string
  offset?: number
  limit?: number
  nonZero?: boolean
  metadata?: boolean
}

export interface GetUserNFTBalancesByCollectionRequest {
  accountId: number
  tokenAddress: string
  collectionId: number
  offset?: number
  limit?: number
  nonZero?: boolean
  metadata?: boolean
  favourite?: boolean
  hidden?: boolean
}

export enum LegacyNFT {
  inside = 'inside',
  outside = 'outside',
  undecided = 'undecided',
}

export interface GetUserNFTLegacyBalanceRequest {
  accountId: number
  tokenAddress: string
  collectionId: number
  filter?: LegacyNFT
  offset?: number
  limit?: number
  metadata?: boolean
}

export enum DEPLOYMENT_STATUS {
  NOT_DEPLOYED = 'NOT_DEPLOYED',
  DEPLOY_FAILED = 'DEPLOY_FAILED',
  DEPLOYING = 'DEPLOYING',
  DEPLOYED = 'DEPLOYED',
}

export enum NFT_IMAGE_SIZES {
  small = '240-240',
  large = '332-332',
  original = 'original',
}

export type IPFS_METADATA = {
  uri: string
  base: {
    name: string
    decimals: number
    description: string
    image: string
    properties: string
    localization: string
  }

  imageSize: { [P in NFT_IMAGE_SIZES]?: string }
  extra: {
    imageData: string
    externalUrl: string
    attributes: string
    backgroundColor: string
    animationUrl: string
    youtubeUrl: string
    minter: string
  }
  nftId?: string
  nftType: NFTType
  network: 0
  tokenAddress: string
  tokenId: string
}

export interface UserNFTBalanceInfo<I = NFT_IMAGE_SIZES> extends NFTTokenInfo {
  accountId: number
  tokenId: number
  total?: string
  locked?: string
  pending: {
    withdraw: string
    deposit: string
  }
  preference: {
    favourite: boolean
    hide: boolean
  }
  collectionInfo: CollectionMeta
  metadata?: IPFS_METADATA
  deploymentStatus: DEPLOYMENT_STATUS
  isCounterFactualNFT: boolean
}

export interface GetUserVIPInfoRequest {
  userAddress: string
}

export interface getUserVIPAssetsRequest {
  address: string
  currency?: string
  assetTypes?: string
  token?: string
  limit?: number
}

export type NftData = string

export interface NFTTokenInfo {
  nftData: string
  minter: string
  nftType: string
  tokenAddress: string
  nftId: string
  status: boolean
}

export interface NFTTokenAmountInfo {
  tokenId: number
  nftData?: string
  amount: string
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

export type GetUserNFTMintHistoryRequest = {
  accountId: number
  nftData?: string
  start?: number
  startId?: number
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
  accountId: number
  owner: string
  status: TxStatus
  progress: string
  timestamp: number
  blockId: number
  indexInBlock: number
  createdAt: number
  updatedAt: number
  feeTokenSymbol: string
  feeAmount: string
  memo?: string
  depositFrom: string
  depositFromAccountId: string
}

export interface UserNFTWithdrawalHistoryTx {
  id: number
  requestId: number
  hash: string
  txHash: string
  accountId: number
  owner: string
  status: string
  nftData?: string
  amount?: string
  feeTokenSymbol?: string
  feeAmount: string
  createdAt: number
  updatedAt: number
  memo?: string
  recipient: string
  distributeHash: string
  fastWithdrawStatus: string
  isFast: false
  blockIdInfo: {
    blockId: number
    indexInBlock: number
  }
  storageInfo: {
    accountId: number
    tokenId: number
    storageId: number
  }
}

export interface UserNFTTransferHistoryTx {
  id: string
  requestId: number
  hash: string
  txHash: string
  accountId: number
  owner: string
  status: string
  nftData: string
  amount: string
  feeTokenSymbol: string
  feeAmount: string
  createdAt: number
  updatedAt: number
  memo: string
  payeeId: number
  payeeAddress: string
  blockIdInfo: {
    blockId: number
    indexInBlock: number
  }
  storageInfo: {
    accountId: number
    tokenId: number
    storageId: number
  }
}

export type UserNFTMintHistoryTx = {
  id: string
  requestId: number
  hash: string
  txHash: string
  accountId: number
  owner: string
  status: string
  nftData: string
  amount: string
  feeTokenSymbol: string
  feeAmount: string
  createdAt: number
  updatedAt: number
  memo: string
  minterId: number
  minterAddress: string
  blockIdInfo: {
    blockId: number
    indexInBlock: number
  }
  storageInfo: {
    accountId: number
    tokenId: number
    storageId: number
  }
}

export interface UserNFTTxsHistory {
  id: string
  requestId: number
  hash: string
  txHash: string
  accountId: number
  owner: string
  nftData: string
  amount: string
  feeTokenSymbol: string
  feeAmount: string
  createdAt: number
  updatedAt: number
  memo: string
  payeeId: number
  payeeAddress: string
  nftTxType: string
  symbol: string
  receiver: number
  status: TxStatus
  progress: string
  timestamp: number
  blockNum: number
  distributeHash: string
  receiverAddress: string
  senderAddress: string
  fastStatus: string
  recipient: string
  minterInfo: { accountId: number; minter: string; originalMinter: string }
  nftStatusInfo: {}
  withdrawalInfo: {
    distributeHash: string
    fastStatus: boolean
    recipient: string
  }
  metadata?: IPFS_METADATA
  storageInfo: {
    accountId: number
    tokenId: number
    storageId: number
  }
}

export declare type NFTOrderInfo = {
  orderHash: string
  accountId: number
  feeAmount: string
  storageId: number
  address: string
}

export interface UserNFTTradeHistory {
  fillId: number
  nftHash: string
  feeTokenId: number
  price: string
  nftAmount: string
  feeAmount: string
  feeTokenSymbol: string
  createdAt: number
  hash: string
  blockId: number
  indexInBlock: number
  tokenId: number
  counter: number
  tokenAddress: number
  sInfo: NFTOrderInfo
  bInfo: NFTOrderInfo
  metadata: IPFS_METADATA
}

export type Protector = {
  ens: string
  address: string
  lockStatus: HEBAO_LOCK_STATUS
}
export type HebaoOperationLog = {
  createdAt: number
  ens: string
  from: string
  hebaoTxType: HEBAO_META_TYPE
  id: number
  status: 0 | 1
  to: string
}

export type Guardian = {
  ens: string
  address: string
  type: HEBAO_META_TYPE
  id: string
  messageHash: string
  businessDataJson: any
  signedRequest: any
  createAt: number
}

/**
 *
 * @export
 * @interface ApproveHebaoRequest
 */
export type GuardiaContractAddress = string

export interface ApproveHebaoRequestV3WithPatch {
  request: Guardian & { code: string }
  web3: Web3
  address: string
  chainId: ChainId
  guardiaContractAddress: GuardiaContractAddress
  walletType?: ConnectorNames
}

export interface RejectHebaoRequestV3WithPatch {
  request: { approveRecordId: string; signer: string; network?: NetworkWallet }
  web3: Web3
  address: string
  chainId: ChainId
  guardiaContractAddress: GuardiaContractAddress
  walletType?: ConnectorNames
}

export interface LockHebaoHebaoParam {
  web3: Web3
  from: string
  wallet: string
  value?: string | number
  contractAddress: string
  gasPrice: number
  gasLimit: number
  chainId?: ChainId
  nonce: number
  isVersion1: boolean
  sendByMetaMask?: boolean
}

export interface HebaoOperationLogs {
  from: string
  fromTime: number
  to?: string
  offset?: number
  statues?: string
  hebaoTxType?: string
  limit?: number
  network?: NetworkWallet
}

export interface WalletType {
  isInCounterFactualStatus: boolean
  isContract: boolean
  loopringWalletContractVersion: string
}

export interface ContractType {
  network: string
  contractVersion: string //V1_x_x"|V2_x_x
  masterCopy?: string // V2 only
  walletFactory?: string // V2 only
  ens?: string
  walletStatus: number
  queueStatus: number
  walletType: number // HEBAO = 0; EOA = 1;
  isCounterFactual: boolean //isCounterFactual
}

export interface ModuleType {
  moduleName: string // FORWARDER_MODULE
  moduleAddress: string
}

/**
 * DefiOrderRequest
 */
export interface DefiOrderRequest {
  /**
   * exchange address
   * @type {string}
   * @memberof DefiOrderRequest
   */
  exchange: string
  /**
   * storageId
   * @type {number}
   * @memberof DefiOrderRequest
   */
  storageId: number
  /**
   * accountId
   * @type {number}
   * @memberof DefiOrderRequest
   */
  accountId: number
  /**
   * sellToken
   * @type TokenVolumeV3
   * @memberof DefiOrderRequest
   */
  sellToken: TokenVolumeV3
  /**
   * buyToken
   * @type TokenVolumeV3
   * @memberof DefiOrderRequest
   */
  buyToken: TokenVolumeV3
  /**
   * Timestamp for order become invalid
   * @type {number}
   * @memberof DefiOrderRequest
   */
  validUntil: number
  /**
   * fee
   * @type {string}
   * @memberof DefiOrderRequest
   */
  fee: string
  /**
   * Maximum order fee that the user can accept, value range (in ten thousandths) 1 ~ 63
   * @type {number}
   * @memberof DefiOrderRequest
   */
  maxFeeBips: number
  /**
   * fillAmountBOrS
   * @type boolean
   * @memberof DefiOrderRequest
   */
  fillAmountBOrS: boolean
  /**
   * taker address
   * @type {string}
   * @memberof DefiOrderRequest
   */
  taker?: string
  /**
   * The orders EdDSA signature. The signature is a hexadecimal string obtained by signing the order itself and concatenating the resulting signature parts (Rx, Ry, and S). Used to authenticate and authorize the operation.
   * @type {string}
   * @memberof DefiOrderRequest
   */
  eddsaSignature?: string
  /**
   * type
   * @type {string}
   * @memberof DefiOrderRequest
   */
  type: string
  /**
   * action
   * @type {string}
   * @memberof DefiOrderRequest
   */
  action: string
}

export interface DefiResult {
  hash: string
  clientOrderId: string
  status: TxStatus
  isIdempotent: boolean
}

export const SEP = ','

export enum DefiAction {
  Deposit = 'deposit',
  Withdraw = 'withdraw',
}

export interface UserDefiTxsHistory {
  id: string
  txType: string
  action: DefiAction
  hash: string
  market: string
  sellToken: TokenVolumeV3
  buyToken: TokenVolumeV3
  fee: TokenVolumeV3
  status: TxStatus
  updatedAt: number
  storageInfo: {
    accountId: number
    tokenId: number
    storageId: number
  }
}

export interface GetDefiMarketRequest {
  defiType?: string
}

export interface GetUserDefiRewardRequest {
  accountId: number
}

export interface GetUserDefiTxRequest {
  accountId: number
  offset: number
  start?: number
  end?: number
  limit: number
}

export type CollectionExtendsKey = {
  thumbnail?: string
  cid?: string
  id?: string
  contractAddress: string
  collectionAddress: string
  deployStatus: DEPLOYMENT_STATUS
  updatedAt: number
  createdAt: number
  nftType: string
  baseUri: string
  collectionTitle?: string
  extra: {
    mintChannel: string
    properties: {
      isCounterFactualNFT: boolean
      isDeletable: boolean
      isEditable: boolean
      isLegacy: boolean
      isMintable: boolean
      isPublic: boolean
    }
  }
  cached: {
    avatar: string
    banner: string
    thumbnail: string
    tileUri: string
  }
  isCounterFactualNFT?: boolean
  isDeletable?: boolean
  isEditable?: boolean
  isLegacy?: boolean
  isMintable?: boolean
  isPublic?: boolean
}

export type CollectionBasicMeta = {
  name: string
  tileUri: string
  nftFactory?: string
  description?: string
  avatar?: string
  banner?: string
  owner: string
}
export type CollectionDelete = {
  accountId: number
  collectionId: number
}

export type CollectionLegacyMeta = Omit<CollectionBasicMeta, 'owner'> & {
  accountId: number
  tokenAddress: string
}

export enum NFT_PREFERENCE_TYPE {
  fav = 'fav',
  hide = 'hide',
}

export type UpdateNFTLegacyCollectionRequest = {
  accountId: number
  nftHashes: string[]
  collectionId?: number
}

export type UpdateNFTGroupRequest = {
  accountId: number
  nftHashes: string[]
  collectionId?: number
  preferenceType: NFT_PREFERENCE_TYPE
  statusToUpdate: boolean
}
/**
 * CollectionMeta
 * @property name string useToCreate Collection
 * @property name string
 * @property tileUri string option
 * @property owner? string option
 * @property nftFactory? string option
 * @property baseUri? string option
 * @property collectionTitle? string option
 * @property description? string option
 * @property avatar? string option
 * @property banner? string option
 * @property thumbnail? string option
 * @property cid? string option
 *
 */
export type CollectionMeta = CollectionExtendsKey & CollectionBasicMeta

export interface GetUserOwnerCollectionRequest {
  owner: string
  offset?: number
  limit?: number
  tokenAddress?: string
  isMintable?: boolean
}

export interface GetUserLegacyCollectionRequest {
  accountId: string
  tokenAddress: string
  offset?: number
  limit?: number
}

export interface GetCollectionWholeNFTsRequest {
  id: number
  metadata?: boolean
  offset?: number
  limit?: number
}

export interface GetUserNFTCollectionRequest {
  accountId: string
  offset?: number
  limit?: number
  collectionId?: number
  tokenAddress?: string
}

export enum DUAL_TYPE {
  DUAL_BASE = 'DUAL_BASE',
  DUAL_CURRENCY = 'DUAL_CURRENCY',
}

export type GetDualInfosRequest = {
  baseSymbol: string
  quoteSymbol: string
  currency: string
  dualType: DUAL_TYPE
  minStrike?: string
  maxStrike?: string
  startTime?: number
  timeSpan?: number
  limit: number
}
export type GetDualPricesRequest = {
  baseSymbol: string
  productIds: string
}
export type GetDualRuleRequest = { baseSymbol: string; currency?: string }

export type DualBid = {
  baseProfit: string
  baseQty: string
}
export type DualPrice = {
  productId: string
  cacheQty: string
  priceTime: number
  dualBid: DualBid[]
}
export type DualIndex = {
  index: string
  base: string
  quote: string
  indexTime: number
}

export type DualProductAndPrice = {
  productId: string
  base: string
  quote: string
  currency: string
  createTime: number
  expireTime: number
  strike: string
  expired: boolean
  dualType: DUAL_TYPE
  ratio: number
  profit: string
  baseSize: string
}

export type DualRulesCoinsInfo = {
  base: string
  quote: string
  currency: string
  basePrecision: number
  currencyPrecision: number
  baseMin: string
  currencyMin: string
  baseMax: string
  currencyMax: string
  granulation: number
  baseProfitStep: number
}
export type DualBalance = {
  coin: string
  free: string
  frozen: string
}

export enum LABEL_INVESTMENT_STATUS {
  // INVESTMENT_SUCCEEDED = "INVESTMENT_SUCCEEDED",
  // INVESTMENT_FAILED = "INVESTMENT_FAILED",
  // INVESTMENT_RECEIVED = "INVESTMENT_RECEIVED",
  PAID = 'paid',
  UNSETTLED = 'unsettled',
  SETTLED = 'settled',
  REJECTED = 'rejected',
  SUCCESS = 'success',
  RECEIVED = 'received',
  PROCESSED = 'processed',
  FAILED = 'failed',
  PROCESSING = 'processing',
  CANCELLED = 'cancelled',
}

export enum SETTLEMENT_STATUS {
  UNSETTLED = 'UNSETTLED',
  SETTLED = 'SETTLED',
  PAID = 'PAID',
}

export enum DUAL_RETRY_STATUS {
  NO_RETRY = 'NO_RETRY',
  RETRYING = 'RETRYING',
  RETRY_SUCCESS = 'RETRY_SUCCESS',
  RETRY_FAILED = 'RETRY_FAILED',
}

export interface GetUserDualTxRequest {
  accountId: number
  dualTypes: DUAL_TYPE
  hashes: string
  investmentStatuses?: LABEL_INVESTMENT_STATUS
  settlementStatuses?: SETTLEMENT_STATUS
  offset?: number
  start?: number
  end?: number
  limit: number
  retryStatuses?: DUAL_RETRY_STATUS[]
}

export type DUAL_REINVEST_INFO = {
  isRecursive: boolean
  maxDuration: string
  newStrike: number
  retryStatus: DUAL_RETRY_STATUS
}

export interface UserDualTxsHistory {
  id: string
  hash: string
  productId: string
  dualType: DUAL_TYPE
  settleRatio: number
  filled: string
  dualFilled: string
  deliveryPrice: number
  strike: number
  market: string
  tokenInfoOrigin: {
    base: string
    quote: string
    currency: string
    amountIn: string
    amountOut: string
    market: string
    tokenIn: number
    tokenOut: number
  }
  timeOrigin: {
    expireTime: number
    createTime: number
    updateTime: number
    settlementTime: number
  }
  investmentStatus: LABEL_INVESTMENT_STATUS
  settlementStatus: SETTLEMENT_STATUS
  dualReinvestInfo?: DUAL_REINVEST_INFO
  createdAt: number
  updatedAt: number
}

/**
 * DualOrderRequest
 */
export interface DualOrderRequest {
  /**
   * exchange address
   * @type {string}
   * @memberof DefiOrderRequest
   */
  exchange: string
  /**
   * storageId
   * @type {number}
   * @memberof DefiOrderRequest
   */
  storageId: number
  /**
   * accountId
   * @type {number}
   * @memberof DefiOrderRequest
   */
  accountId: number
  /**
   * sellToken
   * @type TokenVolumeV3
   * @memberof DefiOrderRequest
   */
  sellToken: TokenVolumeV3
  /**
   * buyToken
   * @type TokenVolumeV3
   * @memberof DefiOrderRequest
   */
  buyToken: TokenVolumeV3
  /**
   * Timestamp for order become invalid
   * @type {number}
   * @memberof DefiOrderRequest
   */
  validUntil: number
  /**
   * fee
   * @type {string}
   * @memberof DefiOrderRequest
   */
  fee: string
  /**
   * Maximum order fee that the user can accept, value range (in ten thousandths) 1 ~ 63
   * @type {number}
   * @memberof DefiOrderRequest
   */
  maxFeeBips: number
  /**
   * fillAmountBOrS
   * @type boolean
   * @memberof DefiOrderRequest
   */
  fillAmountBOrS: boolean
  /**
   * The orders EdDSA signature. The signature is a hexadecimal string obtained by signing the order itself and concatenating the resulting signature parts (Rx, Ry, and S). Used to authenticate and authorize the operation.
   * @type {string}
   * @memberof DefiOrderRequest
   */
  eddsaSignature?: string

  baseProfit: string
  clientOrderId: string
  productId: string
  settleRatio: string
  expireTime: number
  /**
   * If this dual order is recursive
   * @memberof DefiOrderRequest
   * @type {boolean}
   */
  isRecursive?: boolean
  /**
   * If this dual order is recursive, max expire time of next dual product (1-10days in millieseconds)
   * @memberof DefiOrderRequest
   * @type {numbwe}
   */
  maxRecurseProductDuration?: number
}

export type DualEditRequest = {
  newOrder?: Omit<DualOrderRequest, 'isRecursive' | 'maxRecurseProductDuration'>
  currentDualHash: string
  isRecursive: boolean
  maxDuration: number
  newStrike: string
  accountId: null
}

export type CalDualResult = {
  sellVol: string
  quota: string
  lessEarnVol: string
  lessEarnTokenSymbol: string
  greaterEarnVol: string
  greaterEarnTokenSymbol: string
  maxSellAmount: string
  miniSellVol: string
  feeVol: string | undefined
  feeTokenSymbol?: string
  maxFeeBips: number
  sellToken: TokenInfo
}

export interface DualUserLockedRequest {
  accountId: number
  lockTag: DUAL_TYPE[]
  status: string
}

export enum LuckyTokenItemStatusIndex {
  SUBMITTING = 0,
  NOT_EFFECTIVE = 1,
  PENDING = 2,
  COMPLETED = 3,
  OVER_DUE = 4,
  FAILED = 5,
}

export enum LuckyTokenWithdrawStatus {
  RECEIVED = 0,
  PROCESSING = 1,
  PROCESSED = 2,
  WITHDRAW_FAILED = 3,
  PREPARE_FAILED = 4,
}

export enum LuckyTokenItemStatus {
  SUBMITTING = 'SUBMITTING',
  NOT_EFFECTIVE = 'NOT_EFFECTIVE',
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  OVER_DUE = 'OVER_DUE',
  FAILED = 'FAILED',
}

export enum LuckyTokenAmountType {
  RANDOM = 0,
  AVERAGE = 1,
}

export enum LuckyTokenViewType {
  PUBLIC = 0,
  PRIVATE = 1,
  TARGET = 2,
}

export enum LuckyTokenClaimType {
  RELAY = 0,
  COMMON = 1,
  BLIND_BOX = 2,
}

export enum ClaimRecordStatus {
  WAITING_CLAIM = 'WAITING_CLAIM',
  CLAIMED = 'CLAIMED',
  EXPIRED = 'EXPIRED',
  CLAIMING = 'CLAIMING',
}

export enum BlindBoxStatus {
  NOT_OPENED = 'NOT_OPENED',
  OPENED = 'OPENED',
  EXPIRED = 'EXPIRED',
}

export type LuckyTokenChampion = {
  accountId: number
  address: string
  ens: string
  amount: number
}
export type LuckyTokenAmount = {
  totalCount: number
  remainCount: number
  totalAmount: string
  remainAmount: string
  claimedBoxCount: number
  giftCount: number
}
export type LuckyTokenType = {
  partition: LuckyTokenAmountType
  scope: LuckyTokenViewType
  mode: LuckyTokenClaimType
}
export type LuckyTokenInfo = {
  memo: string
  signer: string
  signerUrl: string
  logoUrl: string
}
export type LuckyTokenSender = {
  accountId: number
  address: string
  ens: string
}
export type LuckyTokenItemForReceive = {
  hash: string
  sender: LuckyTokenSender
  champion: LuckyTokenChampion
  tokenId: number
  tokenAmount: LuckyTokenAmount
  type: LuckyTokenType
  status: LuckyTokenItemStatus
  validSince: number
  validUntil: number
  info: LuckyTokenInfo
  templateNo: number
  createdAt: number
  nftTokenInfo?: UserNFTBalanceInfo
  isNft?: boolean
  isOfficial?: boolean
  nftExpireTime: number
}
export type BlindBoxClaimInfo = {
  // 盲盒信息
  id: number
  hash: string
  claimer: {
    accountId: number
    address: string
    ens: string
  }
  tokenId: number
  nftHash: string
  amount: string
  status: string
  openTime: string
  expireTime: string
  createdAt: number
}
export type LuckyTokenBlindBoxItemReceive = {
  luckyToken: LuckyTokenItemForReceive
  claim: BlindBoxClaimInfo
}
export type LuckTokenClaim = {
  hash: string
  claimer: {
    accountId: number
    address: string
    ens: string
  }
  referrer: {
    accountId: number
    address: number
    ens: string
  }
  helper: {
    accountId: number
    address: number
    ens: number
  }
  amount: number
  createdAt: number
  claimId: number
}

export type LuckyTokenSignerFlag = 0 | 1
export type LuckTokenHistory = {
  champion: LuckyTokenChampion
  claimAmount: number
  claim: {
    id: number
  } & LuckTokenClaim
  tokenId: number
  hash: string
  helpers: {
    accountId: number
    address: number
    ens: number
  }[]
  luckyToken: {
    id: number
  } & LuckyTokenItemForReceive
}
export type LuckTokenClaimDetail = {
  champion: LuckyTokenChampion
  claimAmount: number
  claims: Array<
    {
      id: number
    } & LuckTokenClaim
  >
  tokenId: number
  hash: string
  helpers: {
    accountId: number
    address: number
    ens: number
    amount: number
  }[]
  luckyToken: {
    id: number
  } & LuckyTokenItemForReceive
  claimStatus: ClaimRecordStatus
}

export type LuckTokenWithdraw = {
  id: number
  hash: string
  claimer: {
    accountId: number
    address: number
    ens: string
  }
  tokenId: number
  amount: string
  feeTokenId: number
  feeAmount: number
  status: 0 | 1 | 2 // PENDING:0 SUCCESS:1  FAIL:2
  createdAt: number
  updatedAt: number
  isNft: boolean
  nftTokenInfo?: UserNFTBalanceInfo
}

export type TOKENMAPLIST = {
  tokensMap: LoopringMap<TokenInfo>
  coinMap: LoopringMap<{
    icon?: string
    name: string
    simpleName: string
    description?: string
    company: string
  }>
  totalCoinMap: LoopringMap<{
    icon?: string
    name: string
    simpleName: string
    description?: string
    company: string
  }>
  idIndex: LoopringMap<string>
  addressIndex: LoopringMap<TokenAddress>
}

export interface OriginLuckTokenWithdrawsRequestV3 {
  tokenId: number
  feeTokenId: number
  amount: string
  claimer: string
  transfer: Omit<OriginTransferRequestV3, 'payeeId' | 'maxFee' | 'memo'> & {
    payeeId?: 0
    memo?: string
    maxFee?: {
      volume: '0'
      tokenId: number | string
    }
  }
  nftData?: string
  luckyTokenHash?: string
}

export interface OriginLuckTokenWithdrawsRequestV3WithPatch {
  request: OriginLuckTokenWithdrawsRequestV3
  web3: Web3
  chainId: ChainId
  walletType: ConnectorNames
  eddsaKey: string
  apiKey: string
  isHWAddr?: boolean
}

/**
 * LuckyTokenItemForSend
 *
 */
export type LuckyTokenItemForSendV3 = {
  type: LuckyTokenType
  /**
   * numbers
   * @type {number}  ERC20 [1,10000], NFT [1,20000]
   * @memberof LuckyTokenItemForSend
   */
  numbers: number // <10000
  giftNumbers: number // <10000
  memo: string
  signerFlag: boolean
  templateId: number
  validSince: number
  validUntil: number
} & (
  | {
      luckyToken: OriginTransfer3RequestV3
      /**
       * nftData
       * @type {string}  NFT required
       * @memberof LuckyTokenItemForSend
       */
      nftData: string
    }
  | {
      luckyToken: OriginTransfer3RequestV3
    }
)

export interface OriginLuckTokenSendRequestV3WithPatch {
  request: LuckyTokenItemForSendV3
  web3: Web3
  chainId: ChainId
  walletType: ConnectorNames
  eddsaKey: string
  apiKey: string
  isHWAddr?: boolean
}

export interface OriginTransfer3RequestV3 {
  /**
   * exchange address
   * @type {string}
   * @memberof OriginNFTTransferRequestV3
   */
  exchange: string
  /**
   * payer account ID
   * @type {number}
   * @memberof OriginTransferRequestV3
   */
  payerId: number
  /**
   * payer account address
   * @type {string}
   * @memberof OriginTransferRequestV3
   */
  payerAddr: string
  /**
   * payee account ID
   * @type {number}
   * @memberof OriginTransferRequestV3
   */
  payeeId: number
  /**
   * payee account address
   * @type {string}
   * @memberof OriginTransferRequestV3
   */
  payeeAddr: string
  /**
   *
   * @type {TokenVolumeV3}
   * @memberof OriginTransferRequestV3
   */
  token: string
  amount: string
  /**
   *
   * @type { Pick<TokenVolumeV3,'tokenId'> & {amount:string}}
   * @memberof OriginNFTTransferRequestV3
   */
  feeToken: string
  maxFeeAmount: string //Pick<TokenVolumeV3, "tokenId"> & { amount: string };
  /**
   * offchain Id
   * @type {number}
   * @memberof OriginNFTTransferRequestV3
   */
  storageId: number
  /**
   * Timestamp for order to become invalid
   * @type {number}
   * @memberof OriginNFTTransferRequestV3
   */
  validUntil: number
  /**
   * transfer memo
   * @type {string}
   * @memberof OriginNFTTransferRequestV3
   */
  memo?: string
  /**
   * eddsa signature
   * @type {string}
   * @memberof OriginNFTTransferRequestV3
   */
  eddsaSig?: string
  /**
   * ecdsa signature
   * @type {string}
   * @memberof OriginNFTTransferRequestV3
   */
  counterFactualInfo?: CounterFactualInfo
}

export type STACKING_PRODUCT = {
  tokenId: number
  symbol: string
  address: string
  decimals: number
  status: number
  apr: string
  precision: number
  staked: string
  rewardPeriod: string
  minAmount: string
  maxAmount: string
}

export enum StakeStatus {
  received = 'received',
  locked = 'locked',
  partial_unlocked = 'partial_unlocked',
  completely_unlocked = 'completely_unlocked',
  failed = 'failed',
}

export type StakeInfoOrigin = {
  accountId: number
  tokenId: number
  stakeAt: number
  createdAt: number
  updatedAt: number
  claimableTime: number
  apr: string
  lastDayPendingRewards: string
  initialAmount: string
  remainAmount: string
  totalRewards: string
  productId: string
  hash: string
  status: StakeStatus
}
export type STACKING_SUMMARY = {
  totalStaked: string
  totalLastDayPendingRewards: string
  totalStakedRewards: string
  totalClaimableRewards: string
  staking: StakeInfoOrigin[]
}

export enum StakeTransactionType {
  subscribe = 'subscribe',
  redeem = 'redeem',
  claim = 'claim',
}

export type STACKING_TRANSACTIONS = {
  accountId: number
  tokenId: number
  amount: string
  productId: string
  hash: string
  type: StakeTransactionType
  createdAt: number
  updatedAt: number
}

export interface OriginClaimRequestV3 {
  accountId: number
  token: TokenVolumeV3
  transfer: Omit<OriginTransferRequestV3, 'payeeId' | 'memo'> & {
    payeeId?: 0
    memo?: string
  }
}

export type OriginStakeClaimRequestV3 = OriginClaimRequestV3

export interface OriginClaimRequestV3WithPatch {
  request: OriginClaimRequestV3
  web3: Web3
  chainId: ChainId
  walletType: ConnectorNames
  eddsaKey: string
  apiKey: string
  isHWAddr?: boolean
}

export type OriginStakeClaimRequestV3WithPatch = Omit<OriginClaimRequestV3WithPatch, 'request'> & {
  request: OriginStakeClaimRequestV3
}

export interface GetContactsRequest {
  isHebao: boolean
  accountId: number
  limit?: number
  offset?: number
}

export const AddressType = {
  UNKNOWN_ADDRESS: 0,
  LOOPRING_HEBAO_CF: 100,
  // hebao
  LOOPRING_HEBAO_CONTRACT_1_1_6: 2000,
  LOOPRING_HEBAO_CONTRACT_1_2_0: 2001,
  LOOPRING_HEBAO_CONTRACT_2_0_0: 2002,
  LOOPRING_HEBAO_CONTRACT_2_1_0: 2003,
  LOOPRING_HEBAO_CONTRACT_2_2_0: 2004,
  LOOPRING_DEX_EOA: 300,
  //exchange
  EXCHANGE_OTHER: 4000,
  EXCHANGE_BINANCE: 4001,
  EXCHANGE_OKX: 4002,
  EXCHANGE_HUOBI: 4003,
  EXCHANGE_COINBASE: 4004,

  EOA: 5000,
  EOA_METAMASK: 5001,
  EOA_COINBASE: 5002,
  EOA_LEDGER: 5003,

  CONTRACT: 600,
  OFFICIAL: 200,
}
export type AddressTypeKeys = keyof typeof AddressType

export interface GetContactsResponse {
  contacts: {
    addressType: (typeof AddressType)[AddressTypeKeys]
    contactAddress: string
    contactMemo: string
    contactName: string
    isFavourite: boolean
    network: string
    ownerAccountId: number
  }[]
  total: number
}

export interface CreateContactRequest {
  accountId: number
  isHebao: boolean
  contactAddress: string
  contactName: string
  contactMemo?: string
  network?: string
  addressType?: (typeof AddressType)[AddressTypeKeys]
}

export interface UpdateContactRequest {
  contactAddress: string
  isHebao: boolean
  accountId: number
  contactName?: string
  contactMemo?: string
  addressType?: (typeof AddressType)[AddressTypeKeys]
}

export interface DeleteContactRequest {
  contactAddress: string
  isHebao: boolean
  accountId: number
  contactName?: string
  contactMemo?: string
}

export type BTRADE_MARKET = {
  market: string //`LRC-USDT`;
  baseTokenId: number
  quoteTokenId: number
  precisionForPrice: number
  orderbookAggLevels: number
  precisionForAmount: number
  precisionForTotal: number
  enabled: boolean
  feeBips: number
  minAmount: {
    base: string | ''
    quote: string | ''
  }
  btradeAmount: {
    base: string | ''
    quote: string | ''
  }
  l2Amount: {
    base: string | ''
    quote: string | ''
  }
  btradeMarket: string //`${BTRADENAME}LRC-USDT`;
}

export interface OriginBTRADEV3OrderRequest {
  /**
   * exchange address
   * @type {string}
   * @memberof OriginBTRADEV3OrderRequest
   */
  exchange: string
  /**
   * storageId
   * @type {number}
   * @memberof OriginBTRADEV3OrderRequest
   */
  storageId: number
  /**
   * accountId
   * @type {number}
   * @memberof OriginBTRADEV3OrderRequest
   */
  accountId: number
  /**
   * sellToken
   * @type TokenVolumeV3
   * @memberof OriginBTRADEV3OrderRequest
   */
  sellToken: TokenVolumeV3
  /**
   * buyToken
   * @type TokenVolumeV3
   * @memberof OriginBTRADEV3OrderRequest
   */
  buyToken: TokenVolumeV3
  /**
   * allOrNone
   * @description Whether the order supports partial fills or not.Currently only supports false as a valid value
   * @type boolean
   * @memberof OriginBTRADEV3OrderRequest
   */
  allOrNone: Boolean
  /**
   * fillAmountBOrS
   * @type boolean
   * @memberof OriginBTRADEV3OrderRequest
   */
  fillAmountBOrS: boolean
  /**
   * Timestamp for order become invalid
   * @type {number}
   * @memberof OriginBTRADEV3OrderRequest
   */
  validUntil: number
  /**
   * fee
   * @type {string}
   * @memberof OriginBTRADEV3OrderRequest
   */
  maxFeeBips: number
  /**
   * The orders EdDSA signature. The signature is a hexadecimal string obtained by signing the order itself and concatenating the resulting signature parts (Rx, Ry, and S). Used to authenticate and authorize the operation.
   * @type {string}
   * @memberof OriginBTRADEV3OrderRequest
   */
  eddsaSignature?: string
  clientOrderId: string
  orderType: OrderTypeResp
  fastMode: boolean
}

export type BtradeResult<R> = {
  exceedDepth: boolean
  isAtoB: boolean
  isReverse: boolean
  feeBips: string
  /**
   *  with decimals
   */
  amountS: string | undefined
  amountBSlipped:
    | {
        minReceived: string
        minReceivedVal: string
        minimumDecimal: number
      }
    | undefined
  // amountBMiniReceiveCutFee: string | undefined;

  /**
   *  with decimals
   */
  amountB: string | undefined
  info: R
  // view
  sellVol: string | undefined
  // view
  buyVol: string | undefined
}

export const BTRADENAME = 'BTRADE-'

export enum LOCK_TYPE {
  DUAL_CURRENCY = 'DUAL_CURRENCY',
  DUAL_BASE = 'DUAL_BASE',
  BTRADE = 'BTRADE',
  L2STAKING = 'L2STAKING',
  STOP_LIMIT = 'STOP_LIMIT',
}

export type getUserLockSummaryRequest = {
  accountId: number
  tokenId: number
  lockTags: LOCK_TYPE[]
}

export type UserLockSummary = {
  lockRecord: {
    amount: string
    lockTag: string
    tokenId: number
  }[]
}

export interface GetTotalClaimRequest {
  accountId: number
}

export enum CLAIM_TYPE {
  PROTOCOL_FEE = 'PROTOCOL_FEE',
  RECOMMENDER_FEE = 'RECOMMENDER_FEE',
  REFERER_FEE = 'REFERER_FEE',
  REBATE_FEE = 'REBATE_FEE',
  LRC_STAKING = 'LRC_STAKING',
}

export type ClaimItem = {
  tokenId: number
  claimableInfo: Array<{
    amount: string
    claimType: CLAIM_TYPE
  }>
}
export const VTokenPrefix = 'VAULT'
export const VMarketPrefix = 'VAULT-'

export type VaultToken = Omit<TokenInfo, 'type'> & {
  type: 'Vault'
  interestRate: string
  /**
   VaultToken Token ID
   * @type number
   * @memberof VaultToken
   */
  vaultTokenId: number
  /**
   *  ERC20 Token ID
   * @type number
   * @memberof VaultToken
   */
  gasAmounts: any
  // enabled: boolean
  btradeAmount: string // important for vault
  vaultTokenAmounts: {
    // important for vault
    minAmount: string
    qtyStepScale: number
    // bit1:show
    // bit2:join
    // bit3:exit
    // bit4:loan
    // bit5:repay
    status: number
  }
}

export type VaultMarket = {
  market: string
  baseTokenId: number
  quoteTokenId: number
  precisionForPrice: number
  orderbookAggLevels: number
  precisionForAmount: number
  precisionForTotal: number
  enabled: true
  accountId: number
  address: string
  feeBips: number
  minAmount: {
    base: string
    quote: string
  }
  btradeAmount: {
    base: string
    quote: string
  }
  l2Amount: {
    base: string
    quote: string
  }
  // cefiMarket: LRCUSDT,
  riskThreshold: number
  interestThreshold: number
  priceTolerance: number
  qtyStepScale: number
}

export type VaultAvaiableNFT = {
  nftTokenInfo: NFTTokenInfo
  accountId: null
  tokenId: null
  nftData: string
  broker: string
  brokerId: null
}

export type VaultBalance = {
  accountId: null
  tokenId: null
  symbol: string
  total: string
  borrowed: string
  netAsset: string
  interest: string
  creditLimit: string
}
export type CollateralInfo = {
  nftHash: string
  orderHash: string
  collateralTokenId: number
  collateralTokenAmount: string
  openDate: number
  nftTokenId: number
  nftData: string
}
export enum VaultAccountStatus {
  FREE = 'FREE',
  IN_STAKING = 'IN_STAKING',
  IN_REDEEM = 'IN_REDEEM',
  UNDEFINED = 'UNDEFINED',
}
export type VaultAccountInfo = {
  accountStatus: VaultAccountStatus
  marginLevel: string
  totalBalanceOfUsd: string
  totalDebtOfUsd: string
  totalEquityOfUsd: string
  totalCollateralOfUsd: string
  collateralInfo: CollateralInfo
  maxBorrowableOfUsd: string
  userAssets: VaultBalance[]
  openDate: number
}

export enum VaultOperationType {
  VAULT_OPEN_POSITION = 'VAULT_OPEN_POSITION',
  VAULT_MARGIN_CALL = 'VAULT_MARGIN_CALL',
  VAULT_BORROW = 'VAULT_BORROW',
  VAULT_REPAY = 'VAULT_REPAY',
  VAULT_TRADE = 'VAULT_TRADE',
  VAULT_CLOSE_OUT = 'VAULT_CLOSE_OUT',
}
export enum VaultOperationStatus {
  VAULT_STATUS_RECEIVED = 'VAULT_STATUS_RECEIVED',
  VAULT_STATUS_PROCESSING = 'VAULT_STATUS_PROCESSING',
  VAULT_STATUS_SUCCEED = 'VAULT_STATUS_SUCCEED',
  VAULT_STATUS_FAILED = 'VAULT_STATUS_FAILED',
  VAULT_STATUS_PENDING = 'VAULT_STATUS_PENDING',
}

export type VaultOperation = {
  hash: string
  operateType: string
  operateSubType: VaultOperationType
  status: VaultOperationStatus
  tokenIn: number
  amountIn: string
  tokenOut: number
  amountOut: string
  totalBalance: string
  Collateral: string
  totalDebt: string
  totalEquity: string
  createdAt: number
  updatedAt: number
}
export type VaultOrder = {
  hash: string
  clientOrderId: string
  status: string
  tokens: number
  amountS: string
  fillAmountS: string
  tokenB: number
  amountB: string
  fillAmountB: string
  price: string
  fee: string
  createdAt: number
  updatedAt: number
}

//Taker order
export type VaultJoinRequest = NFTOrderRequestV3 & { joinHash: string }
//Maker order
export type VaultExitRequest = {
  accountId: number
  joinHash: string
  timestamp: number
}

export type VaultOrderRequest = OriginBTRADEV3OrderRequest

export interface VaultOrderResult {
  hash: string
  clientOrderId: string
  status: TxStatus
  isIdempotent: boolean
  accountId: number
  storageId: number
  tokens: any[]
}

export interface VaultOrderNFTRequestV3WithPatch {
  request: VaultJoinRequest
  web3: Web3
  chainId: ChainId
  walletType: ConnectorNames
  eddsaKey: string
  apiKey: string
  isHWAddr?: boolean
}

export interface VaultLoadRequest {
  accountId: number
  token: {
    tokenId: number
    volume: string
  }
  timestamp: number
}

export interface VaultRepayRequest {
  accountId: number
  token: {
    tokenId: number
    volume: string
  }
  timestamp: number
}

export interface DatacenterTokenQuote {
  price: string
  volume24H: string
  volumeChange24H: string
  percentChange1H: string
  percentChange24H: string
  percentChange7D: string
  percentChange30D: string
  marketCap: string
  fullyDilutedMarketCap: string
}

export interface GetDatacenterTokenInfoRequest {
  tokens?: string[]
  currency: 'USD'
}
export interface DatacenterTokenInfoSimple {
  tokenAddress: string
  symbol: string
  price: string
  marketCap: string
  volume24H: string
  volumeChange24H: string
  percentChange24H: string
  percentChange7D: string
  tokenId: number
  cmcRank: number
  timestamp: number
}
export interface DatacenterTokenInfo {
  tokenId: number
  tokenAddress: string
  name: string
  symbol: string
  description: string
  slug: string
  logo: string
  cmcRank: number
  website: string
  explorer: string
  platform: string
  dateAdded: string
  dateLaunched: string
  selfReportedCirculatingSupply: string
  selfReportedMarketCap: string
  infiniteSupply: boolean
  circulatingSupply: string
  totalSupply: string
  maxSupply: string
  quote: DatacenterTokenQuote
  timestamp: number
}
export enum DatacenterRange {
  RANGE_ONE_HOUR = 'RANGE_ONE_HOUR',
  RANGE_ONE_DAY = 'RANGE_ONE_DAY',
  RANGE_ONE_WEEK = 'RANGE_ONE_WEEK',
  RANGE_ONE_MONTH = 'RANGE_ONE_MONTH',
}

export interface GetDatacenterTokenQuoteTrendRequest {
  token: string
  rang?: DatacenterRange[]
  currency: 'USD'
}
export enum GetDatacenterTokenQuoteTrend {
  timestamp,
  price,
  volume24H,
  volumeChange24H,
  percentChange1H,
  percentChange24H,
  percentChange7D,
  percentChange30D,
  marketCap,
}

//
