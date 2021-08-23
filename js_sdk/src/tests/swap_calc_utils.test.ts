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

const chainId = ChainId.GOERLI

const TIMEOUT = 60000

let feeBips = '20'

let _slipBips = '50'

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

        exchangeApi = new ExchangeAPI({chainId})
        ammApi = new AmmpoolAPI({chainId})

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

const checkResult = (takerRate = '10', slipBips: string = _slipBips) => {

    if (input !== '0' && input !== '0.') {
        let { amm, market } = getExistedMarket(marketArr, base, quote)

        const hasMarket = !!marketMap[market as string]

        console.log('marketMap hasMarket:', hasMarket)

        const marketItem = marketMap[market as string]

        console.log('marketMap:', marketItem)

        const hasMarket2 = !!ammpools[amm as string]

        console.log('ammpools hasMarket2:', hasMarket2)

        console.log('ammPoolSnapshot:', ammPoolSnapshot)

        console.log(input, '*', base, quote, isAtoB, depth.mid_price, 
        ammpools[ amm as string]?.tokens?.pooled, ammPoolSnapshot?.pooled, takerRate, slipBips)

    }
    
    const output: any = getOutputAmount({input, base, quote, isAtoB, marketArr, 
        tokenMap, marketMap, depth, feeBips, ammPoolSnapshot, takerRate, slipBips})

    console.log('base:', base, ' quote:', quote, ' output:', output)

}

describe('swap_calc_utils', function () {

    beforeEach(async() => {
    }, TIMEOUT)

    it('LRC_ETH_a2b_10000', async () => {

        try {

            await initAll('1', 'LRC', 'ETH', true, ChainId.MAINNET)

            console.log('ammPoolSnapshot:', ammPoolSnapshot)
            console.log('depth:', depth)
            
            checkResult('10')

        } catch (reason) {
            dumpError400(reason)
        }
    }, TIMEOUT)

    it('ETH_USDT_a2b_1', async () => {

        try {

            await initAll('1', 'ETH', 'USDT', true)
            
            checkResult()

        } catch (reason) {
            dumpError400(reason)
        }
    }, TIMEOUT)

    it('DAI_USDT_a2b_1', async () => {

        try {

            await initAll('100', 'DAI', 'USDT', true)
            
            checkResult()

        } catch (reason) {
            dumpError400(reason)
        }
    }, TIMEOUT)

    it('DAI_USDT_a2b_exceedDepth_2', async () => {

        try {

            await initAll('100000', 'DAI', 'USDT', true)
            
            checkResult()

        } catch (reason) {
            dumpError400(reason)
        }
    }, TIMEOUT)

    it('DAI_USDT_a2b_exceedDepth_3', async () => {

        try {

            await initAll('1000000', 'DAI', 'USDT', true)
            
            checkResult()

        } catch (reason) {
            dumpError400(reason)
        }
    }, TIMEOUT)

    it('DAI_USDT_b2a_1', async () => {

        try {

            await initAll('50', 'DAI', 'USDT', false)
            
            checkResult()

        } catch (reason) {
            dumpError400(reason)
        }
    }, TIMEOUT)

    it('LRC_ETH_a2b_exceedDepth', async () => {

        try {

            await initAll('1000000', 'LRC', 'ETH')
            
            checkResult()

        } catch (reason) {
            dumpError400(reason)
        }
    }, TIMEOUT)

    it('LRC_ETH_test1', async () => {

        try {

            await initAll('1000', 'LRC', 'ETH', true, ChainId.MAINNET)
            
            checkResult()

        } catch (reason) {
            dumpError400(reason)
        }
    }, TIMEOUT)

    it('LRC_ETH_test2', async () => {

        try {

            await initAll('100', 'LRC', 'ETH', true, ChainId.MAINNET)
            
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

            await initAll('0.2', 'ETH', 'USDT', true, ChainId.GOERLI)
            
            checkResult('8', '50')

        } catch (reason) {
            dumpError400(reason)
        }
    }, TIMEOUT)

    it('ETH_USDT_b2a', async () => {

        try {

            await initAll('1000', 'ETH', 'USDT', false, ChainId.GOERLI)
            
            checkResult('8', '10')

        } catch (reason) {
            dumpError400(reason)
        }
    }, TIMEOUT)

    it('USDT_ETH_a2b', async () => {

        try {

            await initAll('1000', 'USDT', 'ETH', true, ChainId.GOERLI)
            
            checkResult('10', '10')

        } catch (reason) {
            dumpError400(reason)
        }
    }, TIMEOUT)

    it('USDT_ETH_b2a', async () => {

        try {

            await initAll('0.2', 'USDT', 'ETH', false, ChainId.GOERLI)
            
            checkResult('10', '10')

        } catch (reason) {
            dumpError400(reason)
        }
    }, TIMEOUT)

})

export default {}