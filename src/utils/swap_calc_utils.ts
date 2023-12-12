import * as fm from './formatter'
import { toBig } from './formatter'

import {
  ABInfo,
  AmmPoolSnapshot,
  CalDualResult,
  BTRADE_MARKET,
  BtradeResult,
  ConnectorError,
  DefiMarketInfo,
  DepthData,
  DUAL_TYPE,
  DualBalance,
  DualIndex,
  DualProductAndPrice,
  DualRulesCoinsInfo,
  ExitAmmPoolRequest,
  JoinAmmPoolRequest,
  LoopringErrorCode,
  LoopringMap,
  MarketInfo,
  OffchainFeeInfo,
  TokenInfo,
  TokenVolumeV3,
  XOR,
  VaultMarket,
} from '../defs'

import { getExistedMarket, getTokenInfoBySymbol } from './symbol_tools'
import BigNumber from 'bignumber.js'
import { myLog } from './log_tools'

const BIG0 = fm.toBig(0)

const BIG1 = fm.toBig(1)

const BIG10 = fm.toBig(10)

const BIG10K = fm.toBig(10000)

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
    tokenInfo,
    tokenVol,
    reserve,
  }
}

export function fromWEI(tokens: any, symbol: any, valueInWEI: any, precision?: any, ceil?: any) {
  try {
    const tokenInfo = getToken(tokens, symbol)
    const precisionToFixed = precision ? precision : tokenInfo.precision
    const value = fm.toBig(valueInWEI).div('1e' + tokenInfo.decimals)
    return fm.toFixed(value, precisionToFixed, ceil)
  } catch (err) {
    return undefined
  }
  return '0'
}

export function toWEI(tokens: any, symbol: any, value: any, rm: any = undefined) {
  const tokenInfo = getToken(tokens, symbol)
  if (typeof tokenInfo === 'undefined') {
    return '0'
  }

  const bigN = fm.toBig(value).times('1e' + tokenInfo.decimals)

  return rm === undefined ? bigN.toString() : bigN.toFixed(0, rm)
}

export function isEmpty(input: any) {
  if (!input || input.trim() === '') {
    return true
  }

  return false
}

function getAmountOutWithFeeBips(
  amountIn: string,
  feeBips: string,
  reserveIn: string,
  reserveOut: string,
) {
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

function getAmountInWithFeeBips(
  amountOut: string,
  feeBips: string,
  reserveIn: string,
  reserveOut: string,
) {
  const amountOutBig = fm.toBig(amountOut)
  const reserveInBig = fm.toBig(reserveIn)
  const reserveOutBig = fm.toBig(reserveOut)

  if (amountOutBig.lt(BIG0) || reserveInBig.lt(BIG0) || reserveOutBig.lt(BIG0)) {
    return BIG0
  }

  const feeBipsBig = fm.toBig(feeBips)

  const numerator = reserveInBig.times(amountOutBig).times(BIG10K)
  const denominator = reserveOutBig.minus(amountOutBig).times(BIG10K.minus(feeBipsBig))

  return numerator.div(denominator).plus(BIG1)
}

function getOutputOrderbook(
  input: string,
  baseToken: TokenInfo | undefined,
  quoteToken: TokenInfo | undefined,
  feeBips: string,
  isAtoB: boolean,
  isReverse: boolean,
  depth: DepthData,
) {
  let output = '0'
  let remain: string = input

  const bids = depth.bids // .reverse()

  // console.log('bids:', bids[0])
  // console.log('bids last:', bids[bids.length - 1])
  // console.log('asks:', depth.asks[0])
  // console.log('asks last:', depth.asks[depth.asks.length - 1])

  // console.log(`isAtoB:${isAtoB} isReverse:${isReverse}`)

  if (!baseToken || !quoteToken) {
    return output
  }
  // myLog(baseToken, ' ', quoteToken)

  //amt is size(base ETH). vol is volume(quote USDT)

  if (isAtoB) {
    if (!isReverse) {
      //ETH -> USDT

      remain = fm
        .toBig(remain)
        .times('1e' + baseToken.decimals)
        .toString()

      for (let i = bids.length - 1; i >= 0; i--) {
        const abInfo: ABInfo = bids[i]
        if (fm.toBig(abInfo.amt).lte(BIG0)) {
          continue
        }
        // console.log(`i:${i} abInfo:`, abInfo, `decimals:${baseToken.decimals} ${quoteToken.decimals}`)

        const consume: string = fm.toBig(remain).gte(fm.toBig(abInfo.amt)) ? abInfo.amt : remain

        if (fm.toBig(consume).lte(BIG0)) {
          break
        }

        const volValue = fm.toBig(abInfo.vol).div('1e' + quoteToken.decimals)

        if (fm.toBig(consume).eq(fm.toBig(abInfo.amt))) {
          output = fm.toBig(output).plus(volValue).toString()
        } else {
          const ratio = fm.toBig(consume).div(fm.toBig(abInfo.amt))
          // myLog('got ratio:', ratio.toString(), consume, abInfo.amt)
          output = fm.toBig(output).plus(ratio.times(volValue)).toString()
        }

        // myLog('1__ ', i, ' output:', output, ' remain:', remain, ' abInfo.amt:', abInfo.amt, ' abInfo.vol:', abInfo.vol, ' volValue:', volValue.toString())

        remain = fm.toBig(remain).minus(fm.toBig(consume)).toString()
      }
    } else {
      // USDT -> ETH
      // isAtoB = true, isReverse = false

      remain = fm.toBig(remain).times(BIG10.pow(baseToken.decimals)).toString()

      for (let i = 0; i < depth.asks.length; i++) {
        const abInfo: ABInfo = depth.asks[i]
        if (fm.toBig(abInfo.amt).lte(BIG0)) {
          continue
        }
        // const placed: string = fm.toBig(abInfo.vol).div(BIG10.pow(quoteToken.decimals)).toString()
        const consume: string = fm.toBig(remain).gte(fm.toBig(abInfo.vol)) ? abInfo.vol : remain

        if (fm.toBig(consume).lte(BIG0)) {
          // console.log('return 22222')
          break
        }

        // console.log(`i:${i} abInfo:`, abInfo, `decimals:${baseToken.decimals} ${quoteToken.decimals}`)

        // console.log('remain:', remain, ' abInfo.vol:', abInfo.vol, ' consume:', consume)

        const amtValue = fm.toBig(abInfo.amt).div('1e' + quoteToken.decimals)

        if (fm.toBig(consume).eq(fm.toBig(abInfo.vol))) {
          output = fm.toBig(output).plus(amtValue).toString()
        } else {
          const ratio = fm.toBig(consume).div(fm.toBig(abInfo.vol))
          output = fm.toBig(output).plus(ratio.times(amtValue)).toString()
        }

        remain = fm.toBig(remain).minus(fm.toBig(consume)).toString()

        // myLog('2__ ', i, ' output:', output, ' abInfo.vol:', abInfo.vol, ' remain:', remain)
      }
    }
  } else {
    if (!isReverse) {
      // ETH <- USDT

      remain = fm.toBig(remain).times(BIG10.pow(quoteToken.decimals)).toString()

      for (let i = bids.length - 1; i >= 0; i--) {
        const abInfo: ABInfo = bids[i]
        // const placed: string = fm.toBig(abInfo.vol).div(BIG10.pow(quoteToken.decimals)).toString()

        const consume: string = fm.toBig(remain).gte(fm.toBig(abInfo.vol)) ? abInfo.vol : remain

        if (fm.toBig(consume).lte(BIG0)) {
          break
        }

        // myLog(`i:${i} abInfo:`, abInfo, `decimals:${baseToken.decimals} ${quoteToken.decimals}`)

        // myLog('remain:', remain, 'abInfo.vol:', abInfo.vol, ' consume:', consume)

        const amtValue = fm.toBig(abInfo.amt).div(BIG10.pow(baseToken.decimals))

        if (fm.toBig(consume).eq(abInfo.vol)) {
          output = fm.toBig(output).plus(fm.toBig(amtValue)).toString()
        } else {
          const ratio = fm.toBig(consume).div(fm.toBig(abInfo.vol))
          output = fm.toBig(output).plus(ratio.times(amtValue)).toString()
        }

        remain = fm.toBig(remain).minus(fm.toBig(consume)).toString()

        // myLog('3__', i, ' output:', output, ' abInfo.vol:', abInfo.vol, ' remain:', remain)
      }
    } else {
      // USDT <- ETH

      remain = fm.toBig(remain).times(BIG10.pow(quoteToken.decimals)).toString()

      for (let i = 0; i < depth.asks.length; i++) {
        const abInfo: ABInfo = depth.asks[i]

        // myLog(`i:${i} abInfo:`, abInfo, `decimals:${baseToken.decimals} ${quoteToken.decimals}`)

        const consume: string = fm.toBig(remain).gte(fm.toBig(abInfo.amt)) ? abInfo.amt : remain

        if (fm.toBig(consume).lte(BIG0)) {
          break
        }

        const volValue = fm.toBig(abInfo.vol).div(BIG10.pow(baseToken.decimals))

        if (fm.toBig(consume).eq(fm.toBig(abInfo.amt))) {
          output = fm.toBig(output).plus(volValue).toString()
        } else {
          const ratio = fm.toBig(consume).div(fm.toBig(abInfo.amt))
          output = fm.toBig(output).plus(ratio.times(volValue)).toString()
        }

        // myLog('4__', i, ' output:', output, ' abInfo.vol:', abInfo.vol, ' volValue:', volValue.toString())

        remain = fm.toBig(remain).minus(fm.toBig(consume)).toString()
      }
    }
  }

  return output
}

export function getReserveInfo(
  sell: string,
  buy: string,
  marketArr: string[],
  tokenMap: LoopringMap<TokenInfo>,
  marketMap: LoopringMap<MarketInfo>,
  ammPoolSnapshot: AmmPoolSnapshot | undefined = undefined,
) {
  const { market, amm, baseShow, quoteShow } = getExistedMarket(marketArr, sell, buy)

  if (isEmpty(market) || isEmpty(amm) || Object.keys(marketMap).indexOf(market) < 0) {
    return undefined
  }

  const marketInfo: MarketInfo = marketMap[market]

  const sellToken = getTokenInfoBySymbol(tokenMap, sell)
  const buyToken = getTokenInfoBySymbol(tokenMap, buy)

  let isReverse = false

  const coinA = ammPoolSnapshot?.pooled[0]

  const coinB = ammPoolSnapshot?.pooled[1]

  let reserveIn = '0'
  let reserveOut = '0'

  if (
    sellToken?.tokenId !== undefined &&
    buyToken?.tokenId !== undefined &&
    coinA?.tokenId !== undefined &&
    coinB?.tokenId !== undefined
  ) {
    if (sellToken?.tokenId === coinA?.tokenId) {
      reserveIn = coinA.volume
      reserveOut = coinB.volume
    } else {
      reserveIn = coinB.volume
      reserveOut = coinA.volume
      isReverse = true
    }
  } else {
    if (market === `${buy}-${sell}`) {
      isReverse = true
    }
  }

  return {
    reserveIn,
    reserveOut,
    sellToken,
    buyToken,
    coinA,
    coinB,
    isReverse,
    marketInfo,
  }
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

  return BIG1.minus(percent).abs().toString()
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

export function getPriceImpact(
  reserveIn: string,
  reserveOut: string,
  amountS: string,
  feeBips: string,
  takerFee: string,
) {
  let amountB: BigNumber = getAmountOutWithFeeBips(amountS, feeBips, reserveIn, reserveOut)
  amountB = amountB.times(BIG10K.minus(fm.toBig(takerFee))).div(BIG10K)
  const curPrice = getCurPrice(reserveIn, reserveOut)
  const toPrice = getToPrice(amountS, amountB.toString())

  return getPriceImpactStr(curPrice, toPrice)
}

export function updatePriceImpact_new(
  reverseIn: string,
  reverseOut: string,
  amountS: string,
  sellDecimal: number,
  amountBOut: string,
  buyDecimal: number,
  feeBips: string,
  takerFee: string,
  isAtoB: boolean,
  isReversed: boolean,
  exceedDepth: boolean,
  depth: DepthData,
) {
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
    const coinADecimal = !isReversed ? sellDecimal : buyDecimal
    const coinBDecimal = !isReversed ? buyDecimal : sellDecimal
    const curPrice = fm
      .toBig(depth.mid_price)
      .times('1e' + coinBDecimal)
      .div('1e' + coinADecimal)
      .toString()
    const toPrice = !isReversed ? getToPrice(amountS, amountBOut) : getToPrice(amountBOut, amountS)
    // console.log('updatePriceImpact_new isReversed:', isReversed, ' amountS:', amountS, ' amountBOut:', amountBOut)
    // console.log('updatePriceImpact_new toPrice:', toPrice, ' curPrice:', curPrice)

    priceImpact = getPriceImpactStr(curPrice, toPrice)
  }

  return priceImpact
}

export function getMinReceived(amountBOut: string, minimumDecimal: number, slipBips: string) {
  const minReceived = fm
    .toBig(amountBOut)
    .times(BIG10K.minus(fm.toBig(slipBips)))
    .div(BIG10K)
  return {
    minReceived: minReceived.toFixed(0, 0),
    minReceivedVal: minReceived.div('1e' + minimumDecimal).toString(),
    minimumDecimal,
  }
}

export function getOutputAmount({
  input,
  sell,
  buy,
  isAtoB,
  marketArr,
  tokenMap,
  marketMap,
  depth,
  ammPoolSnapshot,
  feeBips,
  takerRate,
  slipBips,
}: {
  input: string
  sell: string
  buy: string
  isAtoB: boolean
  marketArr: string[]
  tokenMap: LoopringMap<TokenInfo>
  marketMap: LoopringMap<MarketInfo>
  depth: DepthData
  ammPoolSnapshot: AmmPoolSnapshot | undefined
  feeBips: string
  takerRate: string
  slipBips: string
}):
  | {
      exceedDepth: boolean
      isReverse: boolean
      isAtoB: boolean
      slipBips: string
      takerRate: string
      feeBips: string
      output: any
      sellAmt: string
      buyAmt: string
      amountS: string
      amountBOut: string
      amountBOutWithoutFee: string
      amountBOutSlip: {
        minReceived: string
        minReceivedVal: string
        minimumDecimal: number
      }
      priceImpact: string
    }
  | undefined {
  // console.log('enter getOutputAmount:', input, base, quote, isAtoB, marketArr, tokenMap, marketMap, depth, ammPoolSnapshot, feeBips, takerRate, slipBips)

  // console.log(`getOutputAmount market: ${base} / ${quote}`)

  // console.log('ammPoolSnapshot:', ammPoolSnapshot)

  const reserveInfo = getReserveInfo(sell, buy, marketArr, tokenMap, marketMap, ammPoolSnapshot)

  if (!reserveInfo) {
    return undefined
  }

  const { reserveIn, reserveOut, sellToken, buyToken, isReverse, marketInfo } = reserveInfo

  if (!sellToken || !buyToken) {
    return undefined
  }

  input = input.trim()

  let exceedDepth = false

  let output: any = '0'

  let amountS = '0'

  let amountBOutWithoutFee = '0'

  let amountBOut = '0'

  let sellAmt = '0'
  let buyAmt = '0'

  let minimumDecimal = 0

  if (isAtoB) {
    // bids_amtTotal -> bidsSizeShown
    // asks_volTotal -> asksQuoteSizeShown
    const amountInWei = toWEI(tokenMap, sell, input, 0)

    // console.log('isAtoB amountInWei:', amountInWei)

    if (isEmpty(depth.bids_amtTotal) || isEmpty(depth.asks_volTotal)) {
      exceedDepth = true
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
        output = fromWEI(tokenMap, buy, amountB.toFixed(0, 0))
      }
    } else {
      output = getOutputOrderbook(input, sellToken, buyToken, feeBips, isAtoB, isReverse, depth)
    }

    amountBOutWithoutFee = toWEI(tokenMap, buy, output, 0)

    const leftRatio = BIG10K.minus(fm.toBig(takerRate)).div(BIG10K)

    // console.log('amountBOutWithoutFee:', amountBOutWithoutFee, ' leftRatio:', leftRatio.toString())

    amountBOut = toWEI(tokenMap, buy, fm.toBig(output).times(leftRatio).toString(), 0)

    amountS = toWEI(tokenMap, sell, input, 0)

    sellAmt = input
    buyAmt = output
  } else {
    // asks_amtTotal -> asksSizeShown
    // bids_volTotal -> bidsQuoteSizeShown

    if (isEmpty(depth.bids_volTotal) || isEmpty(depth.asks_amtTotal)) {
      exceedDepth = true
    } else {
      const amountInWei = toWEI(tokenMap, buy, input, 0)

      if (!isReverse) {
        exceedDepth = fm.toBig(amountInWei).gt(fm.toBig(depth.bids_volTotal))
      } else {
        exceedDepth = fm.toBig(amountInWei).gt(fm.toBig(depth.asks_amtTotal))
      }
    }

    let amountSBint = BIG0

    const amountB: string = toWEI(tokenMap, buy, input, 0)

    // console.log(`b2a(input:${input}) exceedDepth:${exceedDepth} amountB:${amountB}`)

    if (exceedDepth) {
      if (marketInfo.isSwapEnabled) {
        amountSBint = getAmountInWithFeeBips(amountB, feeBips, reserveIn, reserveOut)
      }
    } else {
      const outputOrderbook = getOutputOrderbook(
        input,
        sellToken,
        buyToken,
        feeBips,
        isAtoB,
        isReverse,
        depth,
      )
      amountSBint = fm.toBig(toWEI(tokenMap, sell, outputOrderbook))
    }

    if (amountSBint.gt(BIG0)) {
      output = fromWEI(tokenMap, sell, amountSBint.toString())

      amountBOutWithoutFee = fm.toBig(amountB).toFixed(0, 0)
      // amountBOutWithoutFee = amountB
      const leftRatio = BIG10K.minus(fm.toBig(takerRate)).div(BIG10K)
      amountBOut = fm.toBig(amountB).times(leftRatio).toFixed(0, 0)
    }

    amountS = amountSBint.toFixed(0, 0)

    // console.log('got amountSBint:', amountSBint.toString(), amountSBint.gt(BIG0), ' amountBOut:', amountBOut.toString())

    sellAmt = output
    buyAmt = input
  }

  minimumDecimal = buyToken.decimals

  const amountBOutSlip = getMinReceived(amountBOut, minimumDecimal, slipBips)

  const priceImpact = updatePriceImpact_new(
    reserveIn,
    reserveOut,
    amountS,
    sellToken.decimals,
    amountBOut,
    buyToken.decimals,
    feeBips,
    takerRate,
    isAtoB,
    isReverse,
    exceedDepth,
    depth,
  )

  return {
    exceedDepth,
    isReverse,
    isAtoB,

    slipBips,
    takerRate,
    feeBips,

    output,

    sellAmt,
    buyAmt,

    amountS,

    amountBOut,
    amountBOutWithoutFee,

    amountBOutSlip,

    priceImpact,
  }
}

export function ammPoolCalc(
  rawVal: string,
  isAtoB: boolean,
  coinA: TokenVolumeV3,
  coinB: TokenVolumeV3,
) {
  const coinA_Vol_BIG = fm.toBig(coinA.volume)
  const coinB_Vol_BIG = fm.toBig(coinB.volume)

  let output = BIG0

  let ratio = BIG0

  if (isAtoB) {
    if (!coinA_Vol_BIG.eq(BIG0)) {
      ratio = fm.toBig(rawVal).div(coinA_Vol_BIG)
      output = ratio.times(coinB_Vol_BIG)
    }
  } else {
    if (!coinB_Vol_BIG.eq(BIG0)) {
      ratio = fm.toBig(rawVal).div(coinB_Vol_BIG)
      output = ratio.times(coinA_Vol_BIG)
    }
  }

  return {
    output: output.toFixed(0, 0),
    ratio,
  }
}

/**
 *
 * @param rawVal
 * @param isAtoB
 * @param slippageTolerance
 * @param owner
 * @param fees
 * @param ammPoolSnapshot
 * @param tokenMap
 * @param idIdx
 * @param coinAOffchainId
 * @param coinBOffchainId
 * @param rawValMatchForRawVal first time add to pool
 */
export function makeJoinAmmPoolRequest(
  rawVal: string,
  isAtoB: boolean,
  slippageTolerance: string,
  owner: string,
  fees: LoopringMap<OffchainFeeInfo>,
  ammPoolSnapshot: AmmPoolSnapshot,
  tokenMap: LoopringMap<TokenInfo>,
  idIdx: LoopringMap<string>,
  coinAOffchainId = 0,
  coinBOffchainId = 0,
  rawValMatchForRawVal?: string,
) {
  const coinA: TokenVolumeV3 = ammPoolSnapshot.pooled[0]
  const coinB: TokenVolumeV3 = ammPoolSnapshot.pooled[1]

  const baseToken: TokenInfo = tokenMap[idIdx[coinA.tokenId]]
  const quoteToken: TokenInfo = tokenMap[idIdx[coinB.tokenId]]

  const fee =
    fees && fees[quoteToken.symbol] && fees[quoteToken.symbol].fee
      ? fees[quoteToken.symbol].fee
      : '0'

  rawVal = fm
    .toBig(rawVal)
    .times(BIG10.pow(isAtoB ? baseToken.decimals : quoteToken.decimals))
    .toFixed(0, 0)

  // eslint-disable-next-line prefer-const
  let { output, ratio } = ammPoolCalc(rawVal, isAtoB, coinA, coinB)
  let volLp
  if (output === '0' && rawValMatchForRawVal) {
    output = fm
      .toBig(rawValMatchForRawVal)
      .times(BIG10.pow(isAtoB ? quoteToken.decimals : baseToken.decimals))
      .toFixed(0, 0)
    // ratio = fm.toBig("1");
    volLp = '1'
  } else {
    const rest = BIG1.minus(fm.toBig(slippageTolerance))
    volLp = fm.toBig(ammPoolSnapshot.lp.volume).times(ratio).times(rest).toFixed(0, 0)
  }
  const volA = isAtoB ? rawVal : output
  const volB = isAtoB ? output : rawVal

  const request: JoinAmmPoolRequest = {
    owner,
    poolAddress: ammPoolSnapshot.poolAddress,
    joinTokens: {
      pooled: [
        { tokenId: coinA.tokenId, volume: volA },
        { tokenId: coinB.tokenId, volume: volB },
      ],
      minimumLp: { tokenId: ammPoolSnapshot.lp.tokenId, volume: volLp },
    },
    storageIds: [coinAOffchainId, coinBOffchainId],
    fee,
  }

  return {
    request,
  }
}
export function makeExitAmmPoolMini(
  rawVal: string,
  ammPoolSnapshot: AmmPoolSnapshot,
  tokenMap: LoopringMap<TokenInfo>,
  idIdx: LoopringMap<string>,
  RatioDecimal = 10,
) {
  const lpTokenVol: TokenVolumeV3 = ammPoolSnapshot.lp
  const lpToken: TokenInfo = tokenMap[idIdx[lpTokenVol.tokenId]]
  const miniLpVol = fm //minLP Volume big number
    .toBig(lpTokenVol.volume)
    .times(2)
    .div('1e' + RatioDecimal)
  return {
    miniLpVol: miniLpVol.toString(),
    miniLpVal: fm
      .toBig(miniLpVol)
      .div('1e' + lpToken.decimals)
      .toString(),
  }
}
export function makeExitAmmCoverFeeLP(
  fees: LoopringMap<OffchainFeeInfo>,
  ammPoolSnapshot: AmmPoolSnapshot,
  tokenMap: LoopringMap<TokenInfo>,
  idIdx: LoopringMap<string>,
  slippageTolerance = '0.001',
) {
  const lpTokenVol: TokenVolumeV3 = ammPoolSnapshot.lp
  const lpToken: TokenInfo = tokenMap[idIdx[lpTokenVol.tokenId]]
  const quote: TokenVolumeV3 = ammPoolSnapshot.pooled[1]
  const quoteToken: TokenInfo = tokenMap[idIdx[quote.tokenId]]
  const quoteVolume = quote.volume

  const maxFee = fees && fees[quoteToken.symbol] ? fees[quoteToken.symbol].fee : '0'
  // feeLp = fee /snap.quote*snap.lp
  const feeLp = fm.toBig(maxFee).times(lpTokenVol.volume).div(quoteVolume).plus(1)
  // feeLp = feeLp / (1-slippageTolerance)  slippageTolerance default is 0.001
  const feeLpWithSlippage = feeLp.div(BIG1.minus(fm.toBig(slippageTolerance)))
  return {
    feeLp: feeLp.toString(),
    feeLpWithSlippage: feeLpWithSlippage.toString(),
    miniFeeLpWithSlippageVal: fm
      .toBig(feeLpWithSlippage)
      .div('1e' + lpToken.decimals)
      .toString(),
    feeLpVal: fm
      .toBig(feeLp)
      .div('1e' + lpToken.decimals)
      .toString(),
  }
}

export function makeExitAmmPoolRequest2(
  rawVal: string,
  slippageTolerance: string,
  owner: string,
  fees: LoopringMap<OffchainFeeInfo>,
  ammPoolSnapshot: AmmPoolSnapshot,
  tokenMap: LoopringMap<TokenInfo>,
  idIdx: LoopringMap<string>,
  offchainId = 0,
  minDecimal = 10,
) {
  const lpTokenVol: TokenVolumeV3 = ammPoolSnapshot.lp
  const lpToken: TokenInfo = tokenMap[idIdx[lpTokenVol.tokenId]]

  const burnedVol = fm
    .toBig(rawVal)
    .times('1e' + lpToken.decimals)
    .toFixed(0, 0)

  const ratio = fm
    .toBig(burnedVol)
    .times('1e' + minDecimal)
    .div(lpTokenVol.volume)
    .toFixed(0, 1)

  const coinA: TokenVolumeV3 = ammPoolSnapshot.pooled[0]
  const coinB: TokenVolumeV3 = ammPoolSnapshot.pooled[1]

  const rest = BIG1.minus(fm.toBig(slippageTolerance))

  const volA = toBig(ratio)
    .times(coinA.volume)
    .div('1e' + minDecimal)
    .times(rest)
    .toFixed(0, 0)

  const volB = toBig(ratio)
    .times(coinB.volume)
    .div('1e' + minDecimal)
    .times(rest)
    .toFixed(0, 0)

  const baseToken: TokenInfo = tokenMap[idIdx[coinA.tokenId]]
  const quoteToken: TokenInfo = tokenMap[idIdx[coinB.tokenId]]

  const maxFee = fees && fees[quoteToken.symbol] ? fees[quoteToken.symbol].fee : '0'

  const request: ExitAmmPoolRequest = {
    owner,
    poolAddress: ammPoolSnapshot.poolAddress,
    exitTokens: {
      unPooled: [
        { tokenId: coinA.tokenId, volume: volA },
        { tokenId: coinB.tokenId, volume: volB },
      ],
      burned: { tokenId: ammPoolSnapshot.lp.tokenId, volume: burnedVol },
    },
    storageId: offchainId,
    maxFee,
  }

  return {
    ratio,
    volA,
    volB,
    volA_show: fm
      .toBig(volA)
      .div('1e' + baseToken.decimals)
      .toString(),
    volB_show: fm
      .toBig(volB)
      .div('1e' + quoteToken.decimals)
      .toString(),
    request,
  }
}

/**
 * calcDefi
 * @param isJoin {boolean} true is join, false is exit
 * @param isInputSell {boolean} user input sell of buy
 * @param XOR<sellAmount,buyAmount> user input sell amount number (without decimals)
 * @param feeVol fee Volume from server-side (decimals)
 * @param marketInfo {DefiMarketInfo} DefiMarketInfo from sever-side
 * @param tokenSell {TokenInfo} token Config information
 * @param tokenBuy {TokenInfo} token Config information
 * @param buyTokenBalanceVol   buy Token Balance server-side (decimals)
 * @return {sellVol} sell Volume (decimals);
 * @return {buyVol} buy Volume (decimals);
 * @return {maxSellVol} max Sell Volume (decimals); please use ceil for view
 * @return {miniSellVol} min Sell Volume (decimals); please use round for view
 * @return {maxFeeBips} number maxFeeBips;
 * @return {isJoin} boolean;
 * @return {isInputSell} boolean;
 */
export function calcDefi({
  isJoin,
  isInputSell,
  sellAmount,
  buyAmount,
  defaultFee,
  maxFeeBips,
  marketInfo,
  tokenSell,
  tokenBuy,
  buyTokenBalanceVol,
  withdrawFeeBips,
}: {
  isJoin: boolean
  isInputSell: boolean
  maxFeeBips: number
  defaultFee: string
  marketInfo: DefiMarketInfo
  tokenSell: TokenInfo
  tokenBuy: TokenInfo
  buyTokenBalanceVol: string
  withdrawFeeBips?: string | undefined
  // feeVol
} & XOR<{ sellAmount: string }, { buyAmount: string }>): {
  sellVol: string
  buyVol: string
  maxSellVol: string
  feeVol: string
  maxFeeBips: number
  miniSellVol: string
  isJoin: boolean
  isInputSell: boolean
} {
  /** isDeposit calc sellPrice & buyPrice */
  const [sellPrice] = isJoin ? [marketInfo.depositPrice] : [marketInfo.withdrawPrice]
  /** calc MiniSellVol & MaxSellVol**/
  const dustToken = tokenBuy
  const maxSellVol = fm.toBig(buyTokenBalanceVol).div(sellPrice)
  /** calc MiniSellVol & MaxSellVol END**/
  // debugger;
  /** View input calc sellVol & buyVol */
  let sellVol, buyVol
  if (isInputSell) {
    sellVol = fm.toBig(sellAmount ? sellAmount : 0).times('1e' + tokenSell.decimals)
    buyVol = sellVol.times(sellPrice)
  } else {
    buyVol = fm.toBig(buyAmount ? buyAmount : 0).times('1e' + tokenBuy.decimals)
    sellVol = buyVol.div(sellPrice)
  }
  /** View input calc sellVol & buyVol END */
  let feeVol

  /** calc current maxFeeBips **/
  let cosFeeBips: any = buyVol.gt(0)
    ? fm.toBig(defaultFee).times(10000).div(buyVol).toFixed(0, BigNumber.ROUND_CEIL)
    : 0
  let _maxFeeBips: any = BigNumber.max(cosFeeBips, 5, maxFeeBips)
  if (!isJoin && withdrawFeeBips) {
    _maxFeeBips = fm
      .toBig(_maxFeeBips)
      .plus(withdrawFeeBips ?? 0)
      .toString()
  }
  feeVol = fm.toBig(_maxFeeBips).div(10000).times(buyVol).toString()
  // defaultFee
  const minVolBuy = BigNumber.max(fm.toBig(feeVol).times(2), dustToken.orderAmounts.dust)
  const miniSellVol = BigNumber.max(minVolBuy.div(sellPrice), tokenSell.orderAmounts.dust)
  return {
    sellVol: sellVol.toString(),
    buyVol: buyVol.toString(),
    maxSellVol: maxSellVol.toString(),
    feeVol,
    isJoin,
    isInputSell,
    maxFeeBips: Number(_maxFeeBips),
    miniSellVol: miniSellVol.toString(),
  }
}

/**
 *
 * @param info
 * @param index
 * @param rule
 * @param balance
 * @param feeVol
 * @param sellToken
 * @param buyToken
 * @param sellAmount
 * @param currentPrice
 */
export function calcDual({
  info,
  index,
  rule,
  balance,
  feeVol,
  sellToken,
  // dualViewInfo,
  buyToken,
  sellAmount,
  dualMarket,
}: {
  sellAmount: string | undefined
  info: DualProductAndPrice
  index: DualIndex
  rule: DualRulesCoinsInfo
  balance: { [key: string]: DualBalance }
  sellToken: TokenInfo
  buyToken: TokenInfo

  // dualViewInfo:R
  feeVol?: string | undefined
  dualMarket: DefiMarketInfo
}): CalDualResult {
  const sellVol = fm.toBig(sellAmount ? sellAmount : 0).times('1e' + sellToken.decimals)
  let lessEarnVol,
    lessEarnTokenSymbol,
    greaterEarnVol,
    greaterEarnTokenSymbol,
    maxSellAmount,
    miniSellVol,
    feeTokenSymbol,
    quota,
    maxFeeBips
  let { base } = info
  let {
    extra: { quoteAssetSymbol },
  } = dualMarket
  const settleRatio = fm.toBig(info.profit).times(info.ratio).toFixed(6, BigNumber.ROUND_DOWN)
  if (info.dualType === DUAL_TYPE.DUAL_BASE) {
    lessEarnVol = toBig(settleRatio).plus(1).times(sellVol) //dualViewInfo.strike);
    lessEarnTokenSymbol = sellToken.symbol
    greaterEarnVol = toBig(
      toBig(settleRatio)
        .plus(1)
        .times(sellAmount ? sellAmount : 0)
        .times(info.strike)
        .toFixed(buyToken.precision, BigNumber.ROUND_CEIL),
    ).times('1e' + buyToken.decimals)
    // myLog('greaterEarnVol',toBig(settleRatio).plus(1).times(sellAmount ?sellAmount: 0)
    // 	.times(info.strike).toFixed(buyToken.precision,BigNumber.ROUND_CEIL).toString(), greaterEarnVol.toString())
    greaterEarnTokenSymbol = buyToken.symbol
    miniSellVol = BigNumber.max(
      dualMarket.baseLimitAmount,
      toBig(rule.baseMin).times('1e' + sellToken.decimals),
    ) // rule.baseMin;
    quota = BigNumber.min(info.baseSize, balance ? balance[base]?.free : 0)
    // quota = BigNumber.min(100, balance ? balance[ base ]?.free : 0)
    maxSellAmount = BigNumber.min(rule.baseMax ? rule.baseMax : 0, quota)
    feeTokenSymbol = buyToken.symbol
    maxFeeBips = 5
    //info.dualPrice.dualBid[ 0 ].baseQty;
  } else {
    lessEarnVol = toBig(
      toBig(settleRatio)
        .plus(1)
        .times(sellAmount ? sellAmount : 0)
        // .times(1 + info.ratio)
        .div(info.strike)
        .toFixed(buyToken.precision, BigNumber.ROUND_CEIL),
    ).times('1e' + buyToken.decimals)

    // sellVol.times(1 + info.ratio).div(dualViewInfo.strike); //.times(1 + dualViewInfo.settleRatio);
    lessEarnTokenSymbol = buyToken.symbol
    greaterEarnVol = toBig(settleRatio).plus(1).times(sellVol)
    //.div(dualViewInfo.strike);
    greaterEarnTokenSymbol = sellToken.symbol
    miniSellVol = BigNumber.max(
      dualMarket.quoteLimitAmount,
      toBig(rule.currencyMin).times('1e' + sellToken.decimals),
    ) // rule.baseMin;
    quota = BigNumber.min(
      toBig(info.baseSize).times(info.strike).toString(),
      balance[quoteAssetSymbol].free,
    )
    maxSellAmount = BigNumber.min(rule.currencyMax, quota)
    /** calc current maxFeeBips **/
    feeTokenSymbol = buyToken.symbol
    maxFeeBips = 5
  }
  myLog(
    'settleRatio',
    settleRatio,
    lessEarnVol.toString(),
    greaterEarnVol.toString(),
    'strike',
    info.strike,
  )
  return {
    quota: quota.toString(),
    sellVol: sellVol.toString(),
    lessEarnVol: lessEarnVol.toString(),
    lessEarnTokenSymbol,
    greaterEarnVol: greaterEarnVol.toString(),
    greaterEarnTokenSymbol,
    miniSellVol: miniSellVol.toString(),
    sellToken,
    maxSellAmount: maxSellAmount ? maxSellAmount?.toString() : '',
    maxFeeBips: maxFeeBips,
    // dualViewInfo: dualViewInfo as unknown as R,
    feeVol,
    feeTokenSymbol,
  }
}

/**
 *
 * @param info  BTRADE_MARKET
 * @param index
 * @param rule
 * @param balance
 * @param feeVol
 * @param sellToken
 * @param buyToken
 * @param sellAmount
 * @param currentPrice
 */
export function calcDex<R = BTRADE_MARKET | VaultMarket>({
  info,
  input,
  sell,
  buy,
  isAtoB,
  marketArr,
  tokenMap,
  marketMap,
  depth,
  feeBips,
  slipBips,
}: {
  info: R
  input: string
  sell: string
  buy: string
  isAtoB: boolean
  marketArr: string[]
  tokenMap: LoopringMap<TokenInfo>
  marketMap: LoopringMap<MarketInfo>
  depth: DepthData
  feeBips: string
  slipBips: string
}): BtradeResult<R> | undefined {
  const sellToken = tokenMap[sell]
  const buyToken = tokenMap[buy]
  const reserveInfo = getReserveInfo(sell, buy, marketArr, tokenMap, marketMap)
  if (!reserveInfo) {
    throw {
      message: ConnectorError.BTRADE_NO_PRODUCT,
      msg: ConnectorError.BTRADE_NO_PRODUCT,
      code: LoopringErrorCode.BTRADE_NO_PRODUCT,
    }
  }
  const { isReverse } = reserveInfo
  let sellVol, buyVol, amountB, amountS, exceedDepth, amountBSlipped
  if (isAtoB) {
    amountS = input
    sellVol = fm.toBig(input ? input : 0).times('1e' + sellToken.decimals)
    const amountInWei = sellVol
    if (isEmpty(depth.bids_amtTotal) || isEmpty(depth.asks_volTotal)) {
      throw {
        message: ConnectorError.BTRADE_NO_DEPTH_ERROR,
        msg: ConnectorError.BTRADE_NO_DEPTH_ERROR,
        code: LoopringErrorCode.BTRADE_NO_DEPTH_ERROR,
      }
    } else {
      if (!isReverse) {
        exceedDepth = fm.toBig(amountInWei).gt(fm.toBig(depth.bids_amtTotal))
      } else {
        exceedDepth = fm.toBig(amountInWei).gt(fm.toBig(depth.asks_volTotal))
      }
      let outputOrderbook
      if (exceedDepth) {
        outputOrderbook = fm
          .toBig(amountS)
          .times(!isReverse ? depth.mid_price : 1 / depth.mid_price)

        amountB = outputOrderbook.toString()
        buyVol = fm.toBig(amountB).times('1e' + buyToken.decimals)
      } else {
        outputOrderbook = getOutputOrderbook(
          input,
          sellToken,
          buyToken,
          feeBips,
          isAtoB,
          isReverse,
          depth,
        ).toString()
        amountB = outputOrderbook
        buyVol = toWEI(tokenMap, buy, outputOrderbook)
      }
    }
  } else {
    amountB = input
    buyVol = fm.toBig(input ? input : 0).times('1e' + buyToken.decimals)
    const amountInWei = buyVol

    if (isEmpty(depth.bids_volTotal) || isEmpty(depth.asks_amtTotal)) {
      throw {
        message: ConnectorError.BTRADE_NO_DEPTH_ERROR,
        msg: ConnectorError.BTRADE_NO_DEPTH_ERROR,
        code: LoopringErrorCode.BTRADE_NO_DEPTH_ERROR,
      }
    } else {
      if (!isReverse) {
        exceedDepth = fm.toBig(amountInWei).gt(fm.toBig(depth.bids_volTotal))
      } else {
        exceedDepth = fm.toBig(amountInWei).gt(fm.toBig(depth.asks_amtTotal))
      }
      let outputOrderbook
      if (exceedDepth) {
        outputOrderbook = fm.toBig(buyVol).times(!isReverse ? 1 / depth.mid_price : depth.mid_price)
        amountS = outputOrderbook.toString()
        sellVol = fm
          .toBig(amountS)
          .times('1e' + sellToken.decimals)
          .toString()
      } else {
        outputOrderbook = getOutputOrderbook(
          input,
          sellToken,
          buyToken,
          feeBips,
          isAtoB,
          isReverse,
          depth,
        )
        myLog(outputOrderbook.toString())
        // sellVol = outputOrderbook;
        sellVol = toWEI(tokenMap, sell, outputOrderbook)
        amountS = fm
          .toBig(sellVol ?? 0)
          .div('1e' + sellToken.decimals)
          .toString()
      }
    } // console.log(`b2a(input:${input}) exceedDepth:${exceedDepth} amountB:${amountB}`)
  }
  if (buyVol) {
    amountBSlipped = getMinReceived(buyVol.toString(), buyToken.decimals, slipBips)
    // amountBMiniReceiveCutFee = amountBSlipped.minReceived - feeBips
  }
  return {
    feeBips,
    info,
    isAtoB,
    isReverse,
    sellVol: sellVol.toString(),
    buyVol: buyVol.toString(),
    amountB: amountB?.toString(),
    amountS: amountS?.toString(),
    amountBSlipped,
    exceedDepth,
  }
}
