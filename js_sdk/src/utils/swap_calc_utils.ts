import * as fm from './formatter'

import { ABInfo, AmmPoolInfoV3, AmmPoolSnapshot, DepthData, LoopringMap, MarketInfo, TokenInfo, } from '../defs/loopring_defs'

import { getExistedMarket, getTokenInfoBySymbol } from './symbol_tools'
import BigNumber from 'bignumber.js'

const BIG0 = fm.toBig(0)

const BIG1 = fm.toBig(1)

const BIG10 = fm.toBig(10)

const BIG10K = fm.toBig(10000)

const MULTI_FACTOR = 10000

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


export function toWEI(tokens: any, symbol: any, value: any, rm: any = undefined) {
    const tokenInfo = getToken(tokens, symbol)
    if (typeof tokenInfo === 'undefined') {
        console.log('symbol got: undefined info')
        return '0'
    }

    const bigN = fm.toBig(value)
        .times('1e' + tokenInfo.decimals)

    return rm === undefined ? bigN.toString() : bigN.toFixed(0, rm)
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

function getOutputOrderbook(input: string, baseToken: TokenInfo | undefined, quoteToken: TokenInfo | undefined, 
    feeBips: string, isAtoB: boolean, isReverse: boolean, depth: DepthData) {

    let output: string  = "0"
    let remain: string  = input

    const bids = depth.bids.reverse()

    console.log('bids:', bids[0])
    console.log('bids last:', bids[bids.length - 1])
    console.log('asks:', depth.asks[0])
    console.log('asks last:', depth.asks[depth.asks.length - 1])

    console.log(`isAtoB:${isAtoB} isReverse:${isReverse}`)

    if (!baseToken || !quoteToken) {
        return output
    }

    //amt is size. vol is volume

    if (isAtoB) {
        if (!isReverse) {
            remain = fm.toBig(remain).times(BIG10.pow(baseToken.decimals)).toString()

            for (let i = 0; i < bids.length; i++) {
                const abInfo: ABInfo = bids[i]

                // console.log(`i:${i} abInfo:`, abInfo, `decimals:${baseToken.decimals} ${quoteToken.decimals}`)

                const consume: string = fm.toBig(remain).gte(fm.toBig(abInfo.amt)) ? abInfo.amt : remain

                if (fm.toBig(consume).lte(BIG0)) {
                    break
                }
                
                const volValue = fm.toBig(abInfo.vol).div(BIG10.pow(quoteToken.decimals))

                if (fm.toBig(consume).eq(fm.toBig(abInfo.amt))) {
                    output = fm.toBig(output).plus(volValue).toString()
                } else {
                    output = fm.toBig(output).plus(fm.toBig(consume).div(fm.toBig(abInfo.amt)).times(volValue)).toString()
                }

                // console.log('1__', i, ' output:', output, ' abInfo.amt:', abInfo.amt, ' abInfo.vol:', abInfo.vol, ' volValue:', volValue.toString())

                remain = fm.toBig(remain).minus(fm.toBig(consume)).toString()
            }

        } else {
            remain = fm.toBig(remain).times(BIG10.pow(quoteToken.decimals)).toString()

            for (let i = 0; i < depth.asks.length; i++) {
                const abInfo: ABInfo = depth.asks[i]
                // const placed: string = fm.toBig(abInfo.vol).div(BIG10.pow(quoteToken.decimals)).toString()
                const placed: string = abInfo.vol
                const consume: string = fm.toBig(remain).gte(fm.toBig(placed)) ? placed : remain

                if (fm.toBig(consume).lte(BIG0)) {
                    break
                }

                // console.log(`i:${i} abInfo:`, abInfo, `decimals:${baseToken.decimals} ${quoteToken.decimals}`)

                // console.log('remain:', remain, 'placed:', placed, ' consume:', consume)
                
                const amtValue = fm.toBig(abInfo.amt).div(BIG10.pow(baseToken.decimals))

                if (fm.toBig(consume).eq(fm.toBig(abInfo.vol))) {
                    output = fm.toBig(output).plus(amtValue).toString()
                } else {
                    output = fm.toBig(output).plus(fm.toBig(consume).div(fm.toBig(abInfo.vol)).times(amtValue)).toString()
                }

                remain = fm.toBig(remain).minus(fm.toBig(consume)).toString()

                // console.log('2__ ', i, ' output:', output, ' abInfo.vol:', abInfo.vol, ' remain:', remain)

            }

        }

    } else {
        if (!isReverse) {
            remain = fm.toBig(remain).times(BIG10.pow(baseToken.decimals)).toString()
            
            for (let i = 0; i < bids.length; i++) {
                const abInfo: ABInfo = bids[i]
                // const placed: string = fm.toBig(abInfo.vol).div(BIG10.pow(quoteToken.decimals)).toString()
                const placed: string = abInfo.vol
                const consume: string = fm.toBig(remain).gte(fm.toBig(placed)) ? placed : remain

                if (fm.toBig(consume).lte(BIG0)) {
                    break
                }

                // console.log(`i:${i} abInfo:`, abInfo, `decimals:${baseToken.decimals} ${quoteToken.decimals}`)

                // console.log('remain:', remain, 'placed:', placed, ' consume:', consume)
                
                const amtValue = fm.toBig(abInfo.amt).div(BIG10.pow(baseToken.decimals))

                if (fm.toBig(consume).eq(abInfo.vol)) {
                    output = fm.toBig(output).plus(fm.toBig(amtValue)).toString()
                } else {
                    output = fm.toBig(output).plus(fm.toBig(consume).div(fm.toBig(abInfo.vol)).times(amtValue)).toString()
                }

                remain = fm.toBig(remain).minus(fm.toBig(consume)).toString()

                // console.log('3__', i, ' output:', output, ' abInfo.vol:', abInfo.vol, ' remain:', remain)

            }

        } else {
            remain = fm.toBig(remain).times(BIG10.pow(quoteToken.decimals)).toString()

            for (let i = 0; i < depth.asks.length; i++) {
                const abInfo: ABInfo = depth.asks[i]

                // console.log(`i:${i} abInfo:`, abInfo, `decimals:${baseToken.decimals} ${quoteToken.decimals}`)

                const consume: string = fm.toBig(remain).gte(fm.toBig(abInfo.amt)) ? abInfo.amt : remain

                if (fm.toBig(consume).lte(BIG0)) {
                    break
                }
                
                const volValue = fm.toBig(abInfo.vol).div(BIG10.pow(quoteToken.decimals))

                if (fm.toBig(consume).eq(fm.toBig(abInfo.amt))) {
                    output = fm.toBig(output).plus(volValue).toString()
                } else {
                    output = fm.toBig(output).plus(fm.toBig(consume).div(fm.toBig(abInfo.amt)).times(volValue)).toString()
                }

                // console.log('4__', i, ' output:', output, ' abInfo.vol:', abInfo.vol, ' volValue:', volValue.toString())

                remain = fm.toBig(remain).minus(fm.toBig(consume)).toString()
            }
            
        }

    }

    return output
}

export function getReserveInfo(base: string, quote: string,
    marketArr: string[], tokenMap: LoopringMap<TokenInfo>, marketMap: LoopringMap<MarketInfo>, 
    ammpools: LoopringMap<AmmPoolInfoV3>, ammPoolSnapshot: AmmPoolSnapshot | undefined = undefined) {

    const { market, amm, } = getExistedMarket(marketArr, base, quote)

    if (isEmpty(market) || isEmpty(amm)
        || (Object.keys(marketMap).indexOf(market) < 0)) {
        
        return undefined
    }

    const feeBips = ammpools[amm as string].feeBips.toString()

    const marketInfo: MarketInfo = marketMap[market]

    const baseToken = getTokenInfoBySymbol(tokenMap, base)
    const quoteToken = getTokenInfoBySymbol(tokenMap, quote)

    let isReverse = false

    const coinA = ammPoolSnapshot?.pooled[0]

    const coinB = ammPoolSnapshot?.pooled[1]

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

    return {
        reserveIn,
        reserveOut,
        baseToken,
        quoteToken,
        coinA,
        coinB,
        isReverse,
        feeBips,
        marketInfo,
    }

}

export function getOutputAmount(input: string, base: string, quote: string, isAtoB: boolean, 
    marketArr: string[], tokenMap: LoopringMap<TokenInfo>, marketMap: LoopringMap<MarketInfo>, depth: DepthData, 
    ammpools: LoopringMap<AmmPoolInfoV3>, ammPoolSnapshot: AmmPoolSnapshot | undefined = undefined, 
    takerFee: string = '6', slipBips: string = '200') {

        // console.log(`getOutputAmount market: ${base} / ${quote}`)

        // console.log('ammPoolSnapshot:', ammPoolSnapshot)

        const reserveInfo = getReserveInfo(base, quote, marketArr, tokenMap, marketMap, ammpools, ammPoolSnapshot)

        if (!reserveInfo) {
            return undefined
        }

        const {
            reserveIn,
            reserveOut,
            baseToken,
            quoteToken,
            isReverse,
            feeBips,
            marketInfo,
        } = reserveInfo

    input = input.trim()

    let exceedDepth = false

    // console.log('input:', input, 'reserveIn:', reserveIn, ' reserveOut:', reserveOut)

    let output = '0'

    let amountS = '0'

    let amountBOutWithoutFee = '0'

    let amountBOut = '0'

    let baseAmt = '0'
    let quoteAmt = '0'

    if (isAtoB) {

        // bids_amtTotal -> bidsSizeShown
        // asks_volTotal -> asksQuoteSizeShown
        const amountInWei = toWEI(tokenMap, base, input, 0)

        // console.log('isAtoB amountInWei:', amountInWei)

        if (isEmpty(depth.bids_amtTotal) || isEmpty(depth.asks_volTotal)) {
            exceedDepth = true
            console.log('2')
        } else {

            if (!isReverse) {
                exceedDepth = fm.toBig(amountInWei).gt(fm.toBig(depth.bids_amtTotal))
                // console.log('3 amountInWei:', amountInWei, ' bids_amtTotal:', depth.bids_amtTotal)
            } else {
                exceedDepth = fm.toBig(amountInWei).gt(fm.toBig(depth.asks_volTotal))
                // console.log('4 amountInWei:', amountInWei, ' asks_volTotal:', depth.asks_volTotal)
            }

        }

        // console.log(`a2b(input:${input})  exceedDepth:`, exceedDepth, ' isSwapEnabled:', marketInfo.isSwapEnabled)

        if (exceedDepth) {
            if (marketInfo.isSwapEnabled) {
                const amountB = getAmountOutWithFeeBips(amountInWei, feeBips, reserveIn, reserveOut)
                output = fromWEI(tokenMap, quote, amountB.toFixed(0, 0))
            }
        } else {
            output = getOutputOrderbook(input, baseToken, quoteToken, feeBips, isAtoB, isReverse, depth)
        }

        amountBOutWithoutFee = toWEI(tokenMap, quote, output, 0)
        amountBOut = toWEI(tokenMap, quote, fm.toBig(output).times(BIG10K.minus(fm.toBig(takerFee))).div(BIG10K).toString(), 0)

        amountS = toWEI(tokenMap, base, input, 0)

        baseAmt = input
        quoteAmt = output

    } else {

        // asks_amtTotal -> asksSizeShown
        // bids_volTotal -> bidsQuoteSizeShown

        if (isEmpty(depth.bids_volTotal) || isEmpty(depth.asks_amtTotal)) {
            exceedDepth = true
        } else {
            const amountInWei = toWEI(tokenMap, quote, input, 0)

            if (!isReverse) {
                exceedDepth = fm.toBig(amountInWei).gt(fm.toBig(depth.bids_volTotal))
            } else {
                exceedDepth = fm.toBig(amountInWei).gt(fm.toBig(depth.asks_amtTotal))
            }

        }

        let amountSBint = BIG0

        const amountB: string = toWEI(tokenMap, quote, input, 0)

        // console.log(`b2a(input:${input}) exceedDepth:${exceedDepth} amountB:${amountB}`)

        if (exceedDepth) {
            if (marketInfo.isSwapEnabled) {
                amountSBint = getAmountInWithFeeBips(amountB, feeBips, reserveIn, reserveOut)
            }
        } else {
            const outputOrderbook = getOutputOrderbook(input, baseToken, quoteToken, feeBips, 
                isAtoB, isReverse, depth)
            amountSBint = fm.toBig(toWEI(tokenMap, base, outputOrderbook))
        }

        if (amountSBint.gt(BIG0)) {
            output = fromWEI(tokenMap, base, amountSBint.toString())

            amountBOutWithoutFee = fm.toBig(amountB).toFixed(0, 0)
            // amountBOutWithoutFee = amountB
            amountBOut = fm.toBig(amountB).times(BIG10K.minus(fm.toBig(takerFee))).div(BIG10K).toFixed(0, 0)
        }

        //  LRC / ETH b -> a

        amountS = amountSBint.toFixed(0, 0)

        // console.log('got amountSBint:', amountSBint.toString(), amountSBint.gt(BIG0), ' amountBOut:', amountBOut.toString())

        baseAmt = output
        quoteAmt = input

    }

    const amountBOutSlip = getMinReceived(amountBOut, slipBips)

    const priceImpact = updatePriceImpact_new(reserveIn, reserveOut, amountS, amountBOut,
        feeBips, takerFee, isAtoB, isReverse, exceedDepth, depth)

    // const priceImpact = updatePriceImpact(baseAmt, quoteAmt, reserveIn, reserveOut, amountS, 
    //      feeBips, takerFee, isReverse, exceedDepth, depth)

    return {
        isAtoB,
        isReverse,
        output,

        baseAmt,
        quoteAmt,

        amountS,

        amountBOut,
        amountBOutWithoutFee,
        amountBOutSlip,

        priceImpact,

    }

}

export function getMinReceived(amountBOut: string, slipBips: string) {
    return fm.toBig(amountBOut).times(BIG10K.minus(fm.toBig(slipBips))).div(BIG10K).toFixed(0, 0)
}

function getPriceImpactStr(curPrice: string, toPrice: string) {

    if (!curPrice || !toPrice) {
        return '0'
    }

    const toPriceBig = fm.toBig(toPrice)

    if (toPriceBig.eq(BIG0)) {
        return '0'
    }

    const percent = fm.toBig(toPriceBig).div(curPrice)

    return BIG1.minus(percent).abs().times(100).toString()

}

export function getCurPrice(reserveIn: string, reserveOut: string) {
    if (!reserveIn || !reserveOut) {
        return '0'
    }

    reserveIn = reserveIn.trim()
    reserveOut = reserveOut.trim()

    const reserveInBig = fm.toBig(reserveIn)
    const reserveOutBig = fm.toBig(reserveOut)

    if (reserveInBig.eq(BIG0)) {
        return '0'
    }

    return reserveOutBig.div(reserveInBig).toString()

}

export function getToPrice(amountS: string, amountB: string) {
    if (!amountS || !amountB) {
        return '0'
    }

    amountS = amountS.trim()
    amountB = amountB.trim()

    const amountSBig = fm.toBig(amountS)
    const amountBBig = fm.toBig(amountB)

    if (amountSBig.eq(BIG0)) {
        return '0'
    }

    return amountBBig.div(amountSBig).toString()
}

export function getPriceImpact(reserveIn: string, reserveOut: string, amountS: string, feeBips: string, takerFee: string) {
    let amountB: BigNumber = getAmountOutWithFeeBips(amountS, feeBips, reserveIn, reserveOut)
    amountB = amountB.times(BIG10K.minus(fm.toBig(takerFee))).div(BIG10K)
    const curPrice = getCurPrice(reserveIn, reserveOut)
    const toPrice = getToPrice(amountS, amountB.toString())

    // console.log('curPrice:', curPrice, ' toPrice:', toPrice)

    return getPriceImpactStr(curPrice, toPrice)
}

export function updatePriceImpact_new(reverseIn: string, reverseOut: string, amountS: string, amountBOut: string,
    feeBips: string, takerFee: string, isAtoB: boolean, isReversed: boolean, exceedDepth: boolean, depth: DepthData) {

    // console.debug('asks_prices:', depth.asks_prices)
    // console.debug('bids_prices:', depth.bids_prices)
    // console.debug('mid_price:', depth.mid_price)

    // console.debug('updatePriceImpact_new: \n reverseIn:', reverseIn, 
    // ' reverseOut:', reverseOut, ' amountS:', amountS, '\n feeBips:', feeBips, ' takerFee:', takerFee, 
    // ' isReversed:', isReversed, ' exceedDepth:', exceedDepth)

    let priceImpact = '0'

    if (isEmpty(reverseIn) || isEmpty(reverseOut) || isEmpty(feeBips)) {
        return '0'
    }

    if (exceedDepth) {
        priceImpact = getPriceImpact(reverseIn, reverseOut, amountS, feeBips, '0')
    } else {
        if (!depth.mid_price) {
            return '0'
        }

        // LRC / ETH !isReversed isAtoB 
        const toPrice = !isReversed ? getToPrice(amountS, amountBOut) : getToPrice(amountBOut, amountS)
        // console.log('updatePriceImpact_new toPrice:', toPrice)
        priceImpact = getPriceImpactStr(depth.mid_price.toString(), toPrice);

    }

    return priceImpact

}

export function updatePriceImpact(baseAmt: string, quoteAmt: string, reverseIn: string, reverseOut: string, amountS: string, 
    feeBips: string, takerFee: string, isReversed: boolean, exceedDepth: boolean, depth: DepthData) {

    // console.debug('asks_prices:', depth.asks_prices)
    // console.debug('bids_prices:', depth.bids_prices)
    // console.debug('mid_price:', depth.mid_price)

    // console.debug('updatePriceImpact:', ' baseAmt:', baseAmt, ' quoteAmt:', quoteAmt, '\n reverseIn:', reverseIn, 
    // ' reverseOut:', reverseOut, ' amountS:', amountS, '\n feeBips:', feeBips, ' takerFee:', takerFee, 
    // ' isReversed:', isReversed, ' exceedDepth:', exceedDepth)

    let priceImpact = '0'

    if (isEmpty(reverseIn) || isEmpty(reverseOut) || isEmpty(feeBips)) {
        return '0'
    }

    if (exceedDepth) {
        priceImpact = getPriceImpact(reverseIn, reverseOut, amountS, feeBips, '0')
    } else {
        if (!depth.mid_price) {
            return '0'
        }

        const toPrice = getToPrice(baseAmt, quoteAmt)
        // console.log('toPrice:', toPrice)
        priceImpact = getPriceImpactStr(depth.mid_price.toString(), toPrice);

    }

    return priceImpact

}

export function updateAmountOutSlip(amountBOut: string, slipBips: string) {
    const amountBOutSlip = getMinReceived(amountBOut, slipBips)
}
