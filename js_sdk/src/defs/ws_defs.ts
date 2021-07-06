import { OrderStatus, Side } from "./loopring_enums"

export interface WsProps {
    topics: any[],
    needApiKey: boolean,
    apikey?: string,
}

export enum WsOps {
    Sub = 'sub',
    Unsub = 'unSub',
}

export enum WsTopicType {
    account = 'account',
    order = 'order',
    orderBook = 'orderbook',
    trade = 'trade',
    ticker = 'ticker',
    candlestick = 'candlestick',
    ammpool = 'ammpool',
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

export const getOrderBookArg = (market: string, level: number) => {
    return {
        topic: WsTopicType.orderBook,
        market,
        level,
    }
}

export const getTradeArg = (market: string) => {
    return {
        topic: WsTopicType.trade,
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
