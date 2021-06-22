import { TokenInfo } from "defs"

const specialSymbols = [
    'ETH2x-FIL',
]

export function getBaseQuote(symbol: string) {
    if (!symbol) {
        return {
            base: undefined,
            quote: undefined,
        }
    }

    if (symbol.startsWith('AMM-')) {
        symbol = symbol.substr(4)
    }

    if (specialSymbols.length > 0) {
        for (let i = 0; i < specialSymbols.length; i++) {
            const ind = symbol.indexOf(specialSymbols[i])
            if (ind >= 0) {
                if (ind === 0) {
                    return {
                        base: specialSymbols[i],
                        quote: symbol.substr(symbol.lastIndexOf('-') + 1)
                    }
                } else {
                    return {
                        base: symbol.substr(0, symbol.indexOf('-')),
                        quote: specialSymbols[i]
                    }
                }
            }
        }
    }

    const base = symbol.substr(0, symbol.indexOf('-'))
    const quote = symbol.substr(symbol.indexOf('-') + 1)

    return {
        base,
        quote,
    }
}

export const getTokenInfoBySymbol = (tokenSymbolMap: { [key: string]: TokenInfo }, symbol: string) => {
    if (!tokenSymbolMap) {
        return undefined
    }
    try {
        return tokenSymbolMap[symbol]
    } catch (reason) {
    }
    return undefined
}


export const getTokenInfoById = (tokenIdMap: { [key: number]: TokenInfo }, id: number) => {
    if (!tokenIdMap) {
        return undefined
    }
    try {
        return tokenIdMap[id]
    } catch (reason) {
    }
    return undefined
}

export const hasMarket = (marketArr: any, market: string) => {

    if (!marketArr) {
        return false
    }

    if (marketArr.includes(market)) {
        return true
    }
    return false

}

export const getPair = (marketArr: any, market: string) => {

    const {
        base,
        quote,
    }  = getBaseQuote(market)

    return getExistedMarket(marketArr, base, quote)
}

export const getExistedMarket = (marketArr: any, base: string | undefined, quote: string| undefined) => {
    let market: any = undefined
    let baseShow: any = undefined
    let quoteShow: any = undefined

    if (base && quote) {
        market = `${base}-${quote}`
        baseShow = base
        quoteShow = quote
        if (hasMarket(marketArr, market)) {
        } else {
            market = `${quote}-${base}`
            if (hasMarket(marketArr, market)) {
                baseShow = quote
                quoteShow = base
            } else {
                market = undefined
                baseShow = undefined
                quoteShow = undefined
            }
        }

    }

    const amm = market ? `AMM-${market}` : undefined

    return {
        market,
        amm,
        baseShow,
        quoteShow,
    }
}