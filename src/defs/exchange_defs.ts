export const REFRESH_RATE = 1000

export const REFRESH_RATE_SLOW = 15000

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

export interface TokenInfo {
    address: string
    decimals: number
    enabled: boolean
    fastWithdrawLimit: string
    gasAmounts: any
    name: string
    orderAmounts: any
    precision: number
    symbol: string
    tokenId: number
    type: string
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
