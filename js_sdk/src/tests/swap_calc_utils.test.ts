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

import { getOutputAmount } from '../utils/swap_calc_utils'

const chainId = ChainId.MAINNET

const TIMEOUT = 60000

let userApi: UserAPI
let exchangeApi:ExchangeAPI
let ammApi: AmmpoolAPI

let base: string
let quote: string
let marketArr: string[]
let market: string = 'LRC-ETH'
let isAtoB: boolean

const AMM_LRC_ETH_poolAddress = '0x18920d6e6fb7ebe057a4dd9260d6d95845c95036'

let tokenMap: LoopringMap<TokenInfo>

let marketMap: LoopringMap<MarketInfo>

let depth: DepthData

let ammpools: LoopringMap<AmmPoolInfoV3>

let ammPoolSnapshot: AmmPoolSnapshot

let input: string

const init = async() => {

    try {

        tokenMap = (await exchangeApi.getTokens()).tokenSymbolMap
    
        const marketAll = (await exchangeApi.getMixMarkets())

        marketMap = marketAll.markets

        marketArr = marketAll.marketArr as string[]
    
        depth = (await exchangeApi.getMixDepth({ market })).depth
    
        ammpools = (await ammApi.getAmmPoolConf()).ammpools
    
        ammPoolSnapshot = (await ammApi.getAmmPoolSnapshot({poolAddress: AMM_LRC_ETH_poolAddress})).ammPoolSnapshot
    
    } catch (reason) {
        dumpError400(reason)
    }
}

const initAll = async(_input: string, _base: string, _quote: string, _isAtoB: boolean = true) => {
    input = _input
    base = _base
    quote = _quote
    isAtoB = _isAtoB

    await init()
}

const checkResult = () => {
    
    const output = getOutputAmount(input, base, quote, isAtoB, marketArr, 
        tokenMap, marketMap, depth, ammpools, ammPoolSnapshot)

    console.log(' output:', output)

}

describe('swap_calc_utils', function () {

    beforeEach(async() => {
        userApi = new UserAPI(chainId)
        exchangeApi = new ExchangeAPI(chainId)
        ammApi = new AmmpoolAPI(chainId)
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

    it('LRC_ETH_a2b_not_ExceedDepth', async () => {

        try {

            await initAll('200', 'LRC', 'ETH')
            
            checkResult()

        } catch (reason) {
            dumpError400(reason)
        }
    }, TIMEOUT)

    it('ETH_LRC_a2b_not_ExceedDepth', async () => {

        try {

            await initAll('0.1', 'ETH', 'LRC')
            
            checkResult()

        } catch (reason) {
            dumpError400(reason)
        }
    }, TIMEOUT)

    it('LRC_ETH_b2a_not_ExceedDepth', async () => {

        try {

            await initAll('1', 'LRC', 'ETH', false)
            
            checkResult()

        } catch (reason) {
            dumpError400(reason)
        }
    }, TIMEOUT)

    it('ETH_LRC_b2a_not_ExceedDepth', async () => {

        try {

            await initAll('1', 'ETH', 'LRC', false)
            
            checkResult()

        } catch (reason) {
            dumpError400(reason)
        }
    }, TIMEOUT)

})

export default {}