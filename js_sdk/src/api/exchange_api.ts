import { BaseAPI } from './base_api'

import { LOOPRING_URLs, } from '../defs/url_defs'

import {
    ReqParams, 
    SIG_FLAG, 
    ReqMethod, 
    TokenInfo, 
    MarketTradeInfo, 
    Side, 
    FiatPriceInfo, 
    LoopringMap, 
    GetAccountRequest,
    GetCandlestickRequest,
    GetDepthRequest,
    GetTickerRequest,
    GetMarketTradesRequest, 
    GetFiatPriceRequest,
    GetTokenBalancesRequest,
    GetAllowancesRequest,
    MarketInfo,
    ExchangeInfo, 
    TickerData, 
    DepthData, 
    Candlestick,
    TokenRelatedInfo,
} from '../defs/loopring_defs'

import { AccountInfo } from '../defs/account_defs'

import BigNumber from 'bignumber.js'
import { getBaseQuote } from '../utils/symbol_tools'

const SEP = ','

function getFeeMap(feeArr: any[], type: number = 0) {
    let feesMap: any = {}

    feeArr.forEach((item: any, index: number, array: any)=>{
        let key = ''
        switch(type) {
            case 1:
                key = item.type
                break
            default:
                key = item.token
        }
        // feesMap[key] = new BigNumber(item.fee)
        feesMap[key] = item.fee
    })

    return feesMap
}

function genAB(data: any[], isReverse: boolean = false) {

    var ab_arr: any[] = []
    var amtTotal = 0

    var ab_prices : any[] = []
    var ab_amtTotals :any [] = []
    
    data.forEach((item: any, ind: number, arr: any) => {
        const price = parseFloat(item[0])
        const amt = new BigNumber(item[1]).dividedBy(1e+18).toNumber()
        amtTotal += amt
        ab_arr.push({
            price: price,
            amt: amt,
            amtTotal: amtTotal,
        })
        ab_prices.push(price)
        ab_amtTotals.push(amtTotal)
    })

    if (isReverse) {
        ab_arr.reverse()
        ab_prices.reverse()
        ab_amtTotals.reverse()
    }

    return { ab_arr, ab_prices, ab_amtTotals }

}

export class ExchangeAPI extends BaseAPI {

    /*
    * Returns the relayer's current time in millisecond
    */
    public async getRelayerCurrentTime() {

        const reqParams: ReqParams = {
            url: LOOPRING_URLs.GET_RELAYER_CURRENT_TIME,
            method: ReqMethod.GET,
            sigFlag: SIG_FLAG.NO_SIG,
        }

        const raw_data = (await this.makeReq().request(reqParams)).data

        const timestamp = raw_data.timestamp

        return {
            timestamp,
            raw_data,
        }
    }

    /*
    * Returns the configurations of all supported markets (trading pairs)
    */
    public async getMarkets(url: string = LOOPRING_URLs.GET_MARKETS) {

        const reqParams: ReqParams = {
            url,
            method: ReqMethod.GET,
            sigFlag: SIG_FLAG.NO_SIG,
        }

        const raw_data = (await this.makeReq().request(reqParams)).data

        var markets: {
            [key: string]: MarketInfo,
        } = {}

        var pairs: LoopringMap<TokenRelatedInfo> = {}
            
        raw_data.markets.forEach((item: any, index: number, array: any)=>{
            console.log(item)
            markets[item.market] = {
                'baseTokenId': item.baseTokenId, 
                'enabled': item.enabled, 
                'market': item.market, 
                'orderbookAggLevels': item.orderbookAggLevels, 
                'precisionForPrice': item.precisionForPrice, 
                'quoteTokenId': item.quoteTokenId, 
            }

            if (item.enabled) {

                const market: string = item.market
                const ind = market.indexOf('-')
                const base = market.substring(0, ind)
                const quote = market.substring(ind + 1, market.length)
    
                if (!pairs[base]) {
                    pairs[base] = {
                        tokenId: item.baseTokenId,
                        tokenList: [quote],
                    }
                } else {
                    pairs[base].tokenList = [...pairs[base].tokenList, quote]
                }
    
                if (!pairs[quote]) {
                    pairs[quote] = {
                        tokenId: item.quoteTokenId,
                        tokenList: [base],
                    }
                } else {
                    pairs[quote].tokenList = [...pairs[quote].tokenList, base]
                }

            }

        })

        const marketArr = Reflect.ownKeys(markets)

        const tokenArr = Reflect.ownKeys(pairs)

        return {
            markets,
            pairs,
            tokenArr,
            tokenArrStr: tokenArr.join(SEP),
            marketArr,
            marketArrStr: marketArr.join(SEP),
            raw_data,
        }

    }

    /*
    * Returns the configurations of all supported markets (trading pairs)
    */
    public async getMixMarkets() {
        return await this.getMarkets(LOOPRING_URLs.GET_MIX_MARKETS)
    }

    /*
    * Returns the configurations of all supported tokens, including Ether.
    */
    public async getTokens() {

        const reqParams: ReqParams = {
            url: LOOPRING_URLs.GET_TOKENS,
            method: ReqMethod.GET,
            sigFlag: SIG_FLAG.NO_SIG,
        }

        const raw_data = (await this.makeReq().request(reqParams)).data
        
        let tokenSymbolMap: LoopringMap<TokenInfo> = {}
        let tokenIdMap: LoopringMap<TokenInfo> = {}
        let tokenAddressMap: LoopringMap<TokenInfo> = {}

        raw_data.forEach((item: any) => {
            tokenSymbolMap[item.symbol] = item
            tokenIdMap[item.tokenId] = item
            tokenAddressMap[item.address] = item
        })

        let tokenSymbolArr = Reflect.ownKeys(tokenSymbolMap)
        let tokenIdArr = Reflect.ownKeys(tokenIdMap)
        let tokenAddressArr = Reflect.ownKeys(tokenAddressMap)

        return {
            tokenSymbolMap,
            tokenIdMap,
            tokenAddressMap,

            tokenSymbolArr,
            tokenSymbolArrStr: tokenSymbolArr.join(SEP),
            tokenIdArr,
            tokenIdArrStr: tokenIdArr.join(SEP),
            tokenAddressArr,
            tokenAddressArrStr: tokenAddressArr.join(SEP),

            raw_data,
        }

    }

    private splitTokens(token: string, tokens: any) {
        let tokenArray: any = token.split(SEP)

        let tokenAddrArr: string[] = []

        if (tokenArray.length <= 0 || (tokenArray.length === 1 && tokenArray[0] === '')) {
            tokenArray = Reflect.ownKeys(tokens)
        }

        tokenArray.forEach((item: string) => {
            tokenAddrArr.push(tokens[item].address)
        })

        token = tokenAddrArr.join(SEP)

        return {
            tokenArray,
            token,
        }
    }

    /*
    * Returns the balances of all supported tokens, including Ether.
    */
    public async getTokenBalances(request: GetTokenBalancesRequest, tokens: any) {

        const {
            tokenArray,
            token,
        } = this.splitTokens(request.token, tokens)

        request.token = token

        const reqParams: ReqParams = {
            queryParams: request,
            url: LOOPRING_URLs.GET_TOKEN_BALANCES,
            method: ReqMethod.GET,
            sigFlag: SIG_FLAG.NO_SIG,
        }

        const raw_data = (await this.makeReq().request(reqParams)).data

        let tokenBalances: LoopringMap<number> = {}

        raw_data.data.forEach((_: any, index: number) => {
            tokenBalances[tokenArray[index]] = raw_data.data[index]
        })

        return {
            tokenBalances,
            raw_data,
        }

    }

    /*
    * Returns the allowances of all supported tokens
    */
    public async getAllowances(request: GetAllowancesRequest, tokens: any) {

        const {
            tokenArray,
            token,
        } = this.splitTokens(request.token, tokens)

        request.token = token

        const reqParams: ReqParams = {
            queryParams: request,
            url: LOOPRING_URLs.GET_ALLOWANCES,
            method: ReqMethod.GET,
            sigFlag: SIG_FLAG.NO_SIG,
        }

        const raw_data = (await this.makeReq().request(reqParams)).data

        let tokenAllowances: LoopringMap<number> = {}

        raw_data.data.forEach((_: any, index: number) => {
            tokenAllowances[tokenArray[index]] = parseInt(raw_data.data[index])
        })

        return {
            tokenAllowances,
            raw_data,
        }

    }

    /*
    * Return various configurations of Loopring.io
    */
    public async getExchangeInfo() {

        const reqParams: ReqParams = {
            url: LOOPRING_URLs.GET_EXCHANGE_INFO,
            method: ReqMethod.GET,
            sigFlag: SIG_FLAG.NO_SIG,
        }

        const raw_data = (await this.makeReq().request(reqParams)).data

        const exchangeInfo: ExchangeInfo = {
            ammExitFees: getFeeMap(raw_data.ammExitFees),
            chainId: raw_data.chainId,
            depositAddress: raw_data.depositAddress,
            exchangeAddress: raw_data.exchangeAddress,
            fastWithdrawalFees: getFeeMap(raw_data.fastWithdrawalFees),
            onchainFees: getFeeMap(raw_data.onchainFees, 1),
            openAccountFees: getFeeMap(raw_data.openAccountFees),
            transferFees: getFeeMap(raw_data.transferFees),
            updateFees: getFeeMap(raw_data.updateFees),
            withdrawalFees: getFeeMap(raw_data.withdrawalFees),
        }

        return {
            exchangeInfo,
            raw_data,
        }

    }

    /*
    * Returns the order book of a given trading pair.
    */
    public async getDepth(request: GetDepthRequest) {

        if (request?.level === undefined) {
            request.level = 2
        }

        if (request?.limit === undefined) {
            request.limit = 50
        }

        const reqParams: ReqParams = {
            queryParams: request,
            url: LOOPRING_URLs.GET_DEPTH,
            method: ReqMethod.GET,
            sigFlag: SIG_FLAG.NO_SIG,
        }

        const raw_data = (await this.makeReq().request(reqParams)).data
        
        const bids = genAB(raw_data['bids'], true)
        const asks = genAB(raw_data['asks'])

        const depth: DepthData = {
            version: parseInt(raw_data['version']),
            date_time: new Date(raw_data['timestamp']),
            bids: bids.ab_arr,
            bids_prices: bids.ab_prices,
            bids_amtTotals: bids.ab_amtTotals,
            asks: asks.ab_arr,
            asks_prices: asks.ab_prices,
            asks_amtTotals: asks.ab_amtTotals,
        }

        return {
            depth,
            raw_data,
        }

    }

    /*
    * Gets a markets ticker. 
    * Generally speaking, a ticker in Loopring consists in data from the market taken last 24Hours.
    */
    public async getTicker(request: GetTickerRequest) {

        const reqParams: ReqParams = {
            url: LOOPRING_URLs.GET_TICKER,
            queryParams: request,
            method: ReqMethod.GET,
            sigFlag: SIG_FLAG.NO_SIG,
        }

        const raw_data = (await this.makeReq().request(reqParams)).data['tickers']

        var tickMap: LoopringMap<TickerData> = {}
        var tickList: TickerData[] = []
        raw_data.forEach((item: any, ind: number, arr: any) => {

            const open = parseFloat(item[4])
            const close = parseFloat(item[7])

            const {
                base,
                quote,
            } = getBaseQuote(item[0])

            let change = 0
            if (!isNaN(open) && !isNaN(close)) {
                change = (close - open) / open
            }

            const tick: TickerData = {
                symbol: item[0],
                base,
                quote,
                date_time: new Date(parseInt(item[1])),
                base_token_volume: parseInt(item[2]),
                quote_token_volume: parseInt(item[3]),
                open,
                high: parseFloat(item[5]),
                low: parseFloat(item[6]),
                close,
                count: parseInt(item[8]),
                bid: parseFloat(item[9]),
                ask: parseFloat(item[10]),
                base_token_amt: parseInt(item[11]),
                quote_token_amt: parseInt(item[12]),
                change,
            }
            
            tickMap[item[0]] = tick
            tickList.push(tick)
        })

        return {
            tickMap,
            tickList,
            raw_data,
        }

    }
    public async getAllTickers() {

        const { marketArrStr } = await this.getMarkets()

        const request: GetTickerRequest = {
            market: marketArrStr
        }

        return this.getTicker(request)

    }

    /*
    * Gets a markets ticker. 
    * Generally speaking, a ticker in Loopring consists in data from the market taken last 24Hours.
    */
    public async getCandlestick(request: GetCandlestickRequest) {

        const reqParams: ReqParams = {
            url: LOOPRING_URLs.GET_CANDLESTICK,
            queryParams: request,
            method: ReqMethod.GET,
            sigFlag: SIG_FLAG.NO_SIG,
        }

        const raw_data = (await this.makeReq().request(reqParams)).data

        var candlesticks: Candlestick[] = []

        raw_data.candlesticks.forEach((item: any, ind: number, arr: any) => {
            const candlestick: Candlestick = {
                timeStamp: parseInt(item[0]),
                txs: parseInt(item[1]),
                open: parseFloat(item[2]),
                close: parseFloat(item[3]),
                high: parseFloat(item[4]),
                low: parseFloat(item[5]),
                baseVol: item[6],
                quoteVol: item[7],
            }
            candlesticks.push(candlestick)
        })

        return {
            candlesticks,
            raw_data,
        }

    }

    /*
    * Fetches, for all the tokens supported by Loopring, their fiat price.
    */
    public async getFiatPrice(request: GetFiatPriceRequest) {

        const reqParams: ReqParams = {
            url: LOOPRING_URLs.GET_FIAT_PRICE,
            queryParams: request,
            method: ReqMethod.GET,
            sigFlag: SIG_FLAG.NO_SIG,
        }

        const raw_data = (await this.makeReq().request(reqParams)).data

        let fiatPrices: LoopringMap<FiatPriceInfo> = {}

        raw_data.prices.forEach((item: FiatPriceInfo) => {
            fiatPrices[item.symbol] = item
        })

        return {
            fiatPrices,
            raw_data,
        }

    }

    /*
    * Fetches, for all the tokens supported by Loopring, their fiat price.
    * response: { [key: string]: <price> }  key is token address
    */
    public async getLatestTokenPrices() {

        const reqParams: ReqParams = {
            url: LOOPRING_URLs.GET_LATEST_TOKEN_PRICES,
            method: ReqMethod.GET,
            sigFlag: SIG_FLAG.NO_SIG,
        }

        const raw_data = (await this.makeReq().request(reqParams)).data

        let tokenPrices: LoopringMap<number> = {}

        raw_data.data.forEach((item: any) => {
            tokenPrices[item.token] = parseFloat(item.price)
        })

        return {
            tokenPrices,
            raw_data,
        }

    }

    /*
    * Query trades with specified market
    */
    public async getMarketTrades(request: GetMarketTradesRequest) {

        if (request.limit === undefined) {
            request.limit = 20
        }

        const reqParams: ReqParams = {
            url: LOOPRING_URLs.GET_TRADES,
            queryParams: request,
            method: ReqMethod.GET,
            sigFlag: SIG_FLAG.NO_SIG,
        }

        const raw_data = (await this.makeReq().request(reqParams)).data

        let marketTrades: MarketTradeInfo[] = []

        raw_data.trades.forEach((item: any) => {
            marketTrades.push({
                tradeTime: parseInt(item[0]),
                tradeId: item[1],
                side: item[2] as Side,
                volume: item[3],
                price: item[4],
                market: item[5],
                fee: item[6]
            })
        })

        return {
            marketTrades,
            raw_data,
        }

    }

    /*
    * Returns data associated with the user's exchange account.
    */
    public async getAccount(request: GetAccountRequest) {

        const reqParams: ReqParams = {
            url: LOOPRING_URLs.ACCOUNT_ACTION,
            queryParams: request,
            method: ReqMethod.GET,
            sigFlag: SIG_FLAG.NO_SIG,
        }

        const raw_data = (await this.makeReq().request(reqParams)).data

        return {
            accInfo: raw_data as AccountInfo,
            raw_data,
        }

    }

    /*
    * Returns data associated with the user's exchange account.
    */
    public async getGasPrice() {

        const reqParams: ReqParams = {
            url: LOOPRING_URLs.GET_GAS_PRICE,
            method: ReqMethod.GET,
            sigFlag: SIG_FLAG.NO_SIG,
        }

        const raw_data = (await this.makeReq().request(reqParams)).data

        const gasPrice = raw_data?.data

        return {
            gasPrice,
            raw_data
        }

    }

}