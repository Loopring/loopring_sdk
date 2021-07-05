import { utils } from 'ethers'

import * as fm from './formatter'

import BigNumber from 'bignumber.js'

import { AmmPoolInfoV3, AmmPoolSnapshot, DepthData, LoopringMap, MarketInfo, TokenInfo, } from '../defs/loopring_defs'

import { MarketStatus } from '../defs/loopring_enums'

import { getBaseQuote, getExistedMarket, getTokenInfoBySymbol } from './symbol_tools'

export const BIG0 = fm.toBig(0)

export const BIG1 = fm.toBig(1)

export const BIG10 = fm.toBig(10)

export const BIG10K = fm.toBig(10000)

export const MULTI_FACTOR = 10000

export const getToken = (tokens: any, token: any) => {
    if (!tokens) {
        throw Error('no tokens list!')
    }
    return tokens[token]
}

export const getTokenInfoByToken = (ammBalance: any, tokens: any, token: any) => {

    const tokenInfo = getToken(tokens, token)

    const tokenVol = ammBalance.pooledMap[tokenInfo.tokenId].volume
    const reserve = fm.toBig(tokenVol)

    return {
        tokenInfo, tokenVol, reserve,
    }
}

const getKey = (base: any, quote: any) => {

    if (!base || !quote) {
        return {
            key: undefined,
            key_bak: undefined,
            isOK: false,
        }
    }

    const isLRCETH = false
    const key = isLRCETH ? 'LRCETH-Pool' : ('AMM-' + base + '-' + quote)
    const key_bak = isLRCETH ? 'LRCETH-Pool' : ('AMM-' + quote + '-' + base)
    return {
        key,
        key_bak,
        isOK: true,
    }
}

const getInfoByKey = (raw_data: any, keyPair: any) => {
    const {
        key,
        key_bak,
    } = keyPair

    if (raw_data[key]) return raw_data[key]
    return raw_data[key_bak]
}

export const getBalances = (ammpools: any, ammPoolsBalances: any, base: any, quote: any, tokens: any) => {

    const { ammInfo,
        ammBalance,
    } = getAmmInfo(ammpools, ammPoolsBalances, base, quote)

    const baseToken = getToken(tokens, base)
    const quoteToken = getToken(tokens, quote)

    const baseBalance = ammBalance.pooledMap[baseToken.tokenId]
    const quoteBalance = ammBalance.pooledMap[quoteToken.tokenId]

    return {
        ammInfo,
        ammBalance,
        baseBalance,
        quoteBalance,
    }

}

export const getAmmInfoOnly = (ammpools: any, base: any, quote: any) => {

    const keyPair = getKey(base, quote)

    const ammInfo = getInfoByKey(ammpools, keyPair)

    if (!ammInfo) {
        throw Error('no ammInfo!')
    }

    return {
        ammInfo,
    }

}

export const getAmmInfo = (ammpools: any, ammPoolsBalances: any, base: any, quote: any) => {

    const keyPair = getKey(base, quote)

    const ammInfo = getInfoByKey(ammpools, keyPair)
    const ammBalance = getInfoByKey(ammPoolsBalances, keyPair)

    if (!ammInfo || !ammBalance) {
        throw Error('no ammInfo! no ammBalance!')
    }

    const feeBips = parseInt(ammInfo.feeBips)

    return {
        ammInfo,
        ammBalance,
        feeBips,
    }

}

const getAmt = (rawAmt: any, tokenInfo: any) => {
    if (rawAmt === undefined) {
        rawAmt = 0
    }

    return fm.toBig(rawAmt).times('1e' + tokenInfo.decimals)
}

export const applySlippageTolerance = (
    tokens: any,
    token: any,
    value: any,
    slippageTolerance: number = 0.01
) => {
    const tokenInfo = getToken(tokens, token)
    const f = 1e7
    const feeFactor = fm.toBig(f * (1 - slippageTolerance))
    const amount = fm.toBig(value).times('1e' + tokenInfo.decimals)
    const outInWei = amount.times(feeFactor).dividedBy(f)
    const out = fromWEI(tokens, token, outInWei)

    return {
        outInWei,
        out,
    }
}

export const applyOrderFee = (tokens: any, token: any, value: any, feeBip: any) => {
    const tokenInfo = getToken(tokens, token)
    const feeFactor = fm.toBig(MULTI_FACTOR - feeBip)
    const amount = fm.toBig(value).times('1e' + tokenInfo.decimals)
    const appliedAmount = amount.times(feeFactor).dividedBy(MULTI_FACTOR)
    return appliedAmount
}

export function fromWEI(tokens: any, symbol: any, valueInWEI: any, precision?: any, ceil?: any) {
    try {
        const tokenInfo = getToken(tokens, symbol)
        const precisionToFixed = precision ? precision : tokenInfo.precision
        const value = fm.toBig(valueInWEI).div('1e' + tokenInfo.decimals)
        return fm.toFixed(value, precisionToFixed, ceil)
    } catch (error) {
    }
    return '0'
}


export function toWEI(tokens: any, symbol: any, value: any, rm: any = 3) {
    const tokenInfo = getToken(tokens, symbol)
    if (typeof tokenInfo === 'undefined') {
        return '0'
    }

    return fm.toBig(value)
        .times('1e' + tokenInfo.decimals)
        .toFixed(0, rm)
}

export const getAmountOut = (amt: any, ammpools: any, ammPoolsBalances: any, tokens: any,
    base: any, quote: any, takerRate: number, currentPrice: number) => {

    if (amt === undefined) {
        amt = 0
    }

    const { ammBalance, feeBips, } = getAmmInfo(ammpools, ammPoolsBalances, base, quote)

    const { tokenInfo: baseTokenInfo, reserve: reserveIn } = getTokenInfoByToken(ammBalance, tokens, base)
    const { tokenInfo: quoteTokenInfo, reserve: reserveOut } = getTokenInfoByToken(ammBalance, tokens, quote)

    const amountIn = getAmt(amt, baseTokenInfo)
    const feeBipsFactor = fm.toBig(MULTI_FACTOR - feeBips)
    const amountInWithFee = amountIn.times(feeBipsFactor)
    const numerator = amountInWithFee.times(reserveOut)
    const denominator = reserveIn.times(MULTI_FACTOR).plus(amountInWithFee)
    const amountOutInWei: any = numerator.dividedBy(denominator)

    let quoteAmt: any = fromWEI(tokens, quote, amountOutInWei)

    const _amount1ApplyOrderFeeInWei = applyOrderFee(tokens, quote, quoteAmt, takerRate + feeBips)

    let _amount1ApplyOrderFee = Number(fromWEI(tokens, quote, _amount1ApplyOrderFeeInWei))

    let priceImpact = 0
    if (_amount1ApplyOrderFee < 0) {
        _amount1ApplyOrderFee = 0
        quoteAmt = null
    } else {
        const newPrice = Number(quoteAmt) / Number(amt)
        priceImpact = (newPrice - currentPrice) / currentPrice
    }

    return {
        quoteAmt,
        _amount1ApplyOrderFeeInWei,
        _amount1ApplyOrderFee,
        priceImpact,
    }

}

export const getAmountOut_Reverse = (amt: any, ammpools: any, ammPoolsBalances: any, tokens: any,
    base: any, quote: any, takerRate: number, currentPrice: number) => {

    if (amt === undefined) {
        amt = 0
    }
    
    const { ammBalance, feeBips, } = getAmmInfo(ammpools, ammPoolsBalances, base, quote)

    const { tokenInfo: baseTokenInfo, reserve: reserveIn } = getTokenInfoByToken(ammBalance, tokens, base)
    const { tokenInfo: quoteTokenInfo, reserve: reserveOut } = getTokenInfoByToken(ammBalance, tokens, quote)

    const amountOut = getAmt(amt, quoteTokenInfo)

    if (amountOut.gt(reserveOut)) {
        return {
            baseAmt: 0,
            _amount1ApplyOrderFeeInWei: 0,
            _amount1ApplyOrderFee: 0,
            priceImpact: 0,
            hasError: false,
        }
    }

    const numerator = amountOut.times(reserveIn).times(MULTI_FACTOR)
    const feeBipsFactor = fm.toBig(MULTI_FACTOR - feeBips)

    // If amountOut is larger than reserveOut?
    // It's handled before getAmountOut_reserve
    const reserveOutSubAmountOut = reserveOut.minus(amountOut)

    const denominator = feeBipsFactor.times(reserveOutSubAmountOut)
    const amountInInWei = numerator.dividedBy(denominator)

    let baseAmt: any = fromWEI(tokens, quote, amountInInWei)

    const _amount1ApplyOrderFeeInWei = applyOrderFee(tokens, quote, amt, takerRate + feeBips)

    let _amount1ApplyOrderFee = Number(fromWEI(tokens, quote, _amount1ApplyOrderFeeInWei))

    let priceImpact = 0
    if (_amount1ApplyOrderFee < 0) {
        _amount1ApplyOrderFee = 0
        baseAmt = null
    } else {
        const newPrice = Number(amt) / Number(baseAmt)
        priceImpact = (newPrice - currentPrice) / currentPrice
    }

    return {
        baseAmt,
        _amount1ApplyOrderFeeInWei,
        _amount1ApplyOrderFee,
        priceImpact,
        hasError: false,
    }

}

export function isEmpty(input: any) {
    if (!input || input.trim() === '') {
        return true
    }

    return false
}

function getAmountOutWithFeeBips(amountIn: string, feeBips: string, reserveIn: string, reserveOut: string) {
    const amountInBig = fm.toBig(amountIn)
    const reserveInBig = fm.toBig(reserveIn)
    const reserveOutBig = fm.toBig(reserveOut)
    
    if (amountInBig.lt(BIG0) || reserveInBig.lt(BIG0) || reserveOutBig.lt(BIG0)) {
        return BIG0
    }

    const feeBipsBig = fm.toBig(feeBips)

    const amountInWithFee = amountInBig.times(BIG10K.minus(feeBipsBig))
    const numerator = amountInWithFee.times(reserveOutBig)
    const denominator = reserveInBig.times(BIG10K).plus(amountInWithFee)

    return numerator.div(denominator)
}

function getAmountInWithFeeBips(amountOut: string, feeBips: string, reserveIn: string, reserveOut: string) {
    const amountOutBig = fm.toBig(amountOut)
    const reserveInBig = fm.toBig(reserveIn)
    const reserveOutBig = fm.toBig(reserveOut)
    
    if (amountOutBig.lt(BIG0) || reserveInBig.lt(BIG0) || reserveOutBig.lt(BIG0)) {
        return BIG0
    }

    const feeBipsBig = fm.toBig(feeBips)

    const numerator = reserveInBig.times(amountOutBig).times(BIG10K)
    const denominator = (reserveOutBig.minus(amountOutBig)).times(BIG10K.minus(feeBipsBig))

    return numerator.div(denominator).plus(BIG1)
}

function getOutputOrderbook(input: string, feeBips: string, isAtoB: boolean) {
    let output: string  = "0"
    let remain: string  = input

    if (isAtoB) {

    } else {

    }

    return output
}

export function getOutputAmount(input: string, base: string, quote: string, isAtoB: boolean, 
    marketArr: string[], tokenMap: LoopringMap<TokenInfo>, marketMap: LoopringMap<MarketInfo>, depth: DepthData, 
    ammpools: LoopringMap<AmmPoolInfoV3>, ammPoolSnapshot: AmmPoolSnapshot | undefined = undefined) {

    const { market, amm, } = getExistedMarket(marketArr, base, quote)

    if (isEmpty(input) || isEmpty(market) || isEmpty(amm)
        || (Object.keys(marketMap).indexOf(market) < 0)) {

        console.log('1', input, isEmpty(input), isEmpty(market),
         Object.keys(marketMap).indexOf(market))
        
        return undefined
    }

    const feeBips = ammpools[amm as string].feeBips.toString()

    const marketInfo: MarketInfo = marketMap[market]

    input = input.trim()

    let exceedDepth = false

    const baseToken = getTokenInfoBySymbol(tokenMap, base)
    const quoteToken = getTokenInfoBySymbol(tokenMap, quote)

    const coinA = ammPoolSnapshot?.pooled[0]

    const coinB = ammPoolSnapshot?.pooled[1]

    let isReverse = false

    let reserveIn = '0'
    let reserveOut = '0'

    if (baseToken?.tokenId !== undefined && quoteToken?.tokenId !== undefined 
        && coinA?.tokenId !== undefined && coinB?.tokenId !== undefined ) {
        if (baseToken?.tokenId === coinA?.tokenId) {
            reserveIn = coinA.volume
            reserveOut = coinB.volume
        } else {
            reserveIn = coinB.volume
            reserveOut = coinA.volume
            isReverse = true
        }
    }

    console.log('reserveIn:', reserveIn, ' reserveOut:', reserveOut)

    if (isAtoB) {

        // bids_amtTotal -> bidsSizeShown
        // asks_volTotal -> asksQuoteSizeShown
        const amountInWei = toWEI(tokenMap, base, input)

        console.log(`a2b(${base}) amountInWei:`, amountInWei)

        if (isEmpty(depth.bids_amtTotal) || isEmpty(depth.asks_volTotal)) {
            exceedDepth = true
            console.log('2')
        } else {

            if (!isReverse) {
                exceedDepth = fm.toBig(amountInWei).gt(fm.toBig(depth.bids_amtTotal))
                console.log('3 amountInWei:', amountInWei, ' bids_amtTotal:', depth.bids_amtTotal)
            } else {
                exceedDepth = fm.toBig(amountInWei).gt(fm.toBig(depth.asks_volTotal))
                console.log('4 amountInWei:', amountInWei, ' asks_volTotal:', depth.asks_volTotal)
            }

        }

        let amountB = BIG0
        console.log('5 exceedDepth:', exceedDepth, ' isSwapEnabled:', marketInfo.isSwapEnabled)

        if (exceedDepth) {
            if (marketInfo.isSwapEnabled) {
                amountB = getAmountOutWithFeeBips(amountInWei, feeBips, reserveIn, reserveOut)
                console.log('5.1 amountB:', amountB.toString())
            }
        } else {
            const outputOB = getOutputOrderbook(input, feeBips, isAtoB)
            console.log('6 outputOB:', outputOB)
            amountB = fm.toBig(toWEI(tokenMap, base, outputOB))
        }

        return fromWEI(tokenMap, quote, amountB)

    } else {

        // asks_amtTotal -> asksSizeShown
        // bids_volTotal -> bidsQuoteSizeShown

        if (isEmpty(depth.bids_volTotal) || isEmpty(depth.asks_amtTotal)) {
            exceedDepth = true
        } else {
            const amountInWei = toWEI(tokenMap, quote, input)

            console.log(`b2a(${quote}) amountInWei:`, amountInWei)

            if (!isReverse) {
                exceedDepth = fm.toBig(amountInWei).gt(fm.toBig(depth.bids_volTotal))
            } else {
                exceedDepth = fm.toBig(amountInWei).gt(fm.toBig(depth.asks_amtTotal))
            }

        }

        let amountSBint = BIG0

        const amountB: string = toWEI(tokenMap, quote, input)

        console.log(`b2a(input:${input}) exceedDepth:${exceedDepth} amountB:${amountB}`)

        if (exceedDepth) {
            if (marketInfo.isSwapEnabled) {
                amountSBint = getAmountInWithFeeBips(amountB, feeBips, reserveIn, reserveOut)
            }
        } else {
            amountSBint = fm.toBig(toWEI(tokenMap, base, getOutputOrderbook(input, feeBips, isAtoB)))
        }

        console.log('got amountSBint:', amountSBint.toString(), amountSBint.gt(BIG0))

        if (amountSBint.gt(BIG0)) {
            const temp = fromWEI(tokenMap, base, amountSBint.toString())
            console.log('temp:', temp)
            return temp
        }

        return '0'

    }

}
