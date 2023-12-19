import { OrderStatus, Side, NetworkWallet } from './'

export interface WsProps {
  topics: any[]
  needApiKey: boolean
  apikey?: string
}

export enum WsOps {
  Sub = 'sub',
  Unsub = 'unSub',
}

export enum WsTopicType {
  account = 'account',
  order = 'order',
  trade = 'trade',
  mixtrade = 'mixtrade',
  ticker = 'ticker',
  candlestick = 'candlestick',
  ammpool = 'ammpool',
  orderbook = 'orderbook',
  mixorder = 'mixorder',
  btradedepth = 'btradedepth',
  crawlTokenPrices = 'crawltokenprices',
  notification = 'notification',
  vaultAccount = 'vaultAccount',
  l2Common = 'l2Common',
}

export const getCrawlTokenPrices = ({
  topic = WsTopicType.crawlTokenPrices,
  currency = 'USD',
}: {
  topic?: WsTopicType.crawlTokenPrices
} & Omit<{ currency?: 'USD' }, 'topic'>) => {
  return { topic, currency }
}

export const getAccountArg = () => {
  return {
    topic: WsTopicType.account,
  }
}

export interface WsAccount {
  accountId: number
  totalAmount: string
  tokenId: number
  amountLocked: string
}

export const getOrderArg = (market: string) => {
  return {
    topic: WsTopicType.order,
    market,
  }
}

export interface WsOrder {
  hash: string
  clientOrderId: string
  size: string
  volume: string
  price: string
  filledSize: string
  filledVolume: string
  filledFee: string
  status: OrderStatus
  createdAt: string
  validSince: string
  validUntil: string
  side: Side
  market: string
}

export type OrderWsRequest = {
  topic?: WsTopicType.orderbook | WsTopicType.mixorder | WsTopicType.btradedepth
  market: string
  level: number
  count?: number
  snapshot?: boolean
  showOverlap?: boolean
}
export const getOrderBookArg = ({
  topic = WsTopicType.orderbook,
  market,
  level,
  count,
  snapshot,
  showOverlap,
}: OrderWsRequest) => {
  const obj: any = {
    topic,
    market,
    level,
    count,
    snapshot,
    showOverlap,
  }
  Object.keys(obj).forEach((key) => (obj[key] === undefined ? delete obj[key] : {}))
  return obj
}

export const getMixOrderArg = ({
  topic = WsTopicType.mixorder,
  ...orderWsRequest
}: { topic?: WsTopicType.mixorder } & Omit<OrderWsRequest, 'topic'>) => {
  return getOrderBookArg({
    topic,
    ...orderWsRequest,
  })
}

export const getBtradeOrderBook = ({
  topic = WsTopicType.btradedepth,
  ...orderWsRequest
}: { topic?: WsTopicType.btradedepth } & Omit<OrderWsRequest, 'topic'>) => {
  return getOrderBookArg({
    topic,
    ...orderWsRequest,
  })
}

export const getTradeArg = (market: string) => {
  return {
    topic: WsTopicType.trade,
    market,
  }
}

export const getMixTradeArg = (market: string) => {
  return {
    topic: WsTopicType.mixtrade,
    market,
  }
}

export const getTickerArg = (market: string) => {
  return {
    topic: WsTopicType.ticker,
    market,
  }
}

export const getCandlestickArg = (market: string) => {
  return {
    topic: WsTopicType.candlestick,
    market,
  }
}

export const getAmmpoolArg = (poolAddress: string) => {
  return {
    topic: WsTopicType.ammpool,
    snapshot: true,
    poolAddress,
  }
}

export const getNotificationArg = ({
  address,
  network,
}: {
  address: string
  network: NetworkWallet
}) => {
  return {
    topic: WsTopicType.notification,
    address,
    network,
  }
}

export const getL2Common = ({ address, network }: { address: string; network: NetworkWallet }) => {
  return {
    topic: WsTopicType.l2Common,
    address,
    network,
  }
}

export enum WS_ACTIONT_YPE {
  VAULT_ACCOUNT_UPDATE = 'VAULT_ACCOUNT_UPDATE',
}
export interface WsL2Common {
  accountId: number
  address: string
  isUpdated: true
}
