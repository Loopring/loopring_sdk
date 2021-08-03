import { 
    LoopringMap, 
    MarketInfo, 
    TokenInfo, 
    DepthData, 
    ChainId,
    AmmPoolInfoV3,
    AmmPoolSnapshot,
} from '../defs'

import {
    AmmpoolAPI, 
    UserAPI, 
    ExchangeAPI, 
} from '../api'

import { dumpError400 } from '../utils/network_tools'

import { getMinReceived, getOutputAmount } from '../utils/swap_calc_utils'
import { getExistedMarket } from '../utils'

const chainId = ChainId.GORLI

const TIMEOUT = 60000

let slipBips = '100'

let exchangeApi:ExchangeAPI
let ammApi: AmmpoolAPI

let base: string
let quote: string
let marketArr: string[]

let isAtoB: boolean

const AMM_LRC_ETH_poolAddress = '0x18920d6e6fb7ebe057a4dd9260d6d95845c95036'

let tokenMap: LoopringMap<TokenInfo>

let marketMap: LoopringMap<MarketInfo>

let depth: DepthData

let ammpools: LoopringMap<AmmPoolInfoV3>

let ammPoolSnapshot: AmmPoolSnapshot

let input: string

const init = async(chainId: ChainId = ChainId.MAINNET) => {

    try {

        exchangeApi = new ExchangeAPI(chainId)
        ammApi = new AmmpoolAPI(chainId)

        tokenMap = (await exchangeApi.getTokens()).tokenSymbolMap
    
        const marketAll = (await exchangeApi.getMixMarkets())

        marketMap = marketAll.markets

        marketArr = marketAll.marketArr as string[]

        let { amm } = getExistedMarket(marketArr, base, quote)

        const market = amm as string
    
        depth = (await exchangeApi.getMixDepth({ market })).depth
    
        ammpools = (await ammApi.getAmmPoolConf()).ammpools

        const ammPoolInfo = ammpools[market]
    
        ammPoolSnapshot = (await ammApi.getAmmPoolSnapshot({poolAddress: ammPoolInfo.address})).ammPoolSnapshot as AmmPoolSnapshot
    
    } catch (reason) {
        dumpError400(reason)
    }
}

const initAll = async(_input: string, _base: string, _quote: string, _isAtoB: boolean = true, chainId = ChainId.MAINNET) => {
    input = _input
    base = _base
    quote = _quote

    isAtoB = _isAtoB

    await init(chainId)
}

const checkResult = (takerRate = '8', slipBips = '100') => {

    if (input !== '0' && input !== '0.') {
        let { amm } = getExistedMarket(marketArr, base, quote)

        console.log(input, '*', base, quote, isAtoB, depth.mid_price, 
        ammpools[ amm as string].tokens.pooled, ammPoolSnapshot?.pooled, takerRate, slipBips)

    }
    
    const output: any = getOutputAmount(input, base, quote, isAtoB, marketArr, 
        tokenMap, marketMap, depth, ammpools, ammPoolSnapshot, takerRate, slipBips)

    console.log('base:', base, ' quote:', quote, ' output:', output)

}

describe('swap_calc_utils', function () {

    beforeEach(async() => {
    }, TIMEOUT)

    it('LRC_ETH_a2b_exceedDepth', async () => {

        try {

            await initAll('1000000', 'LRC', 'ETH')
            
            checkResult()

        } catch (reason) {
            dumpError400(reason)
        }
    }, TIMEOUT)

    it('LRC_ETH_b2a_exceedDepth', async () => {

        try {

            await initAll('100', 'LRC', 'ETH', false)
            
            checkResult()

        } catch (reason) {
            dumpError400(reason)
        }
    }, TIMEOUT)

    it('ETH_LRC_a2b_exceedDepth', async () => {

        try {

            await initAll('1000', 'ETH', 'LRC')
            
            checkResult()

        } catch (reason) {
            dumpError400(reason)
        }
    }, TIMEOUT)

    it('ETH_LRC_b2a_exceedDepth', async () => {

        try {

            await initAll('5000000', 'ETH', 'LRC', false)
            
            checkResult()

        } catch (reason) {
            dumpError400(reason)
        }
    }, TIMEOUT)

    // --------------------------------------------------

    it('LRC_ETH_a2b_not_ExceedDepth200', async () => {

        try {

            await initAll('200', 'LRC', 'ETH')
            
            checkResult()

        } catch (reason) {
            dumpError400(reason)
        }
    }, TIMEOUT)

    it('LRC_ETH_a2b_not_ExceedDepth15000', async () => {

        try {

            await initAll('15000', 'LRC', 'ETH')
            
            checkResult()

        } catch (reason) {
            dumpError400(reason)
        }
    }, TIMEOUT)

    it('LRC_ETH_a2b_not_ExceedDepth3', async () => {

        try {

            await initAll('3', 'LRC', 'ETH')
            
            checkResult()

        } catch (reason) {
            dumpError400(reason)
        }
    }, TIMEOUT)

    it('ETH_LRC_a2b_not_ExceedDepth0_1', async () => {

        try {

            await initAll('0.1', 'ETH', 'LRC')
            
            checkResult()

        } catch (reason) {
            dumpError400(reason)
        }
    }, TIMEOUT)

    it('ETH_LRC_a2b_not_ExceedDepth5', async () => {

        try {

            await initAll('5', 'ETH', 'LRC')
            
            checkResult()

        } catch (reason) {
            dumpError400(reason)
        }
    }, TIMEOUT)

    it('LRC_ETH_b2a_not_ExceedDepth1', async () => {

        try {

            await initAll('1', 'LRC', 'ETH', false)
            
            checkResult()

        } catch (reason) {
            dumpError400(reason)
        }
    }, TIMEOUT)

    it('ETH_LRC_b2a_not_ExceedDepth_10000', async () => {

        try {

            await initAll('10000', 'ETH', 'LRC', false)
            
            checkResult()

        } catch (reason) {
            dumpError400(reason)
        }
    }, TIMEOUT)

    //-------

    it('ETH_USDT_a2b', async () => {

        try {

            await initAll('0.2', 'ETH', 'USDT', true, ChainId.GORLI)
            
            checkResult('8', '50')

        } catch (reason) {
            dumpError400(reason)
        }
    }, TIMEOUT)

    it('ETH_USDT_b2a', async () => {

        try {

            await initAll('1000', 'ETH', 'USDT', false, ChainId.GORLI)
            
            checkResult('8', '10')

        } catch (reason) {
            dumpError400(reason)
        }
    }, TIMEOUT)

    it('USDT_ETH_a2b', async () => {

        try {

            await initAll('1000', 'USDT', 'ETH', true, ChainId.GORLI)
            
            checkResult('10', '10')

        } catch (reason) {
            dumpError400(reason)
        }
    }, TIMEOUT)

    it('USDT_ETH_b2a', async () => {

        try {

            await initAll('0.2', 'USDT', 'ETH', false, ChainId.GORLI)
            
            checkResult('10', '10')

        } catch (reason) {
            dumpError400(reason)
        }
    }, TIMEOUT)

})

export default {}