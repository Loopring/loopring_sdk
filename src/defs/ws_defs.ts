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
    Account = 'account',
    Order = 'order',
    OrderBook = 'orderbook',
    Trade = 'trade',
    Ticker = 'ticker',
    Candlestick = 'candlestick',
    Ammpool = 'ammpool',
}

export const getAccountArg = () => {
    return {
        topic: WsTopicType.Account,
    }
}

export const getOrderArg = (market: string) => {
    return {
        topic: WsTopicType.Order,
        market,
    }
}

export const geOrderBookArg = (market: string, level: number) => {
    return {
        topic: WsTopicType.OrderBook,
        market,
        level,
    }
}

export const getTradeArg = (market: string) => {
    return {
        topic: WsTopicType.Trade,
        market,
    }
}

export const getTickerArg = (market: string) => {
    return {
        topic: WsTopicType.Ticker,
        market,
    }
}

export const getCandlestickArg = (market: string) => {
    return {
        topic: WsTopicType.Candlestick,
        market,
    }
}

export const getAmmpoolArg = (poolAddress: string) => {
    return {
        topic: WsTopicType.Ammpool,
        snapshot: true,
        poolAddress,
    }
}
