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
let amm_market: string = 'AMM-LRC-ETH'
let isAtoB: boolean

const AMM_LRC_ETH_poolAddress = '0x18920d6e6fb7ebe057a4dd9260d6d95845c95036'

let tokenMap: LoopringMap<TokenInfo>

let marketMap: LoopringMap<MarketInfo>

let depth: DepthData

let ammpools: LoopringMap<AmmPoolInfoV3>

let ammPoolSnapshot: AmmPoolSnapshot

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

const initAll = async(_base: string, _quote: string, _isAtoB: boolean = true) => {
    base = _base
    quote = _quote
    isAtoB = _isAtoB

    await init()
}

describe('swap_calc_utils', function () {

    beforeEach(async() => {
        userApi = new UserAPI(chainId)
        exchangeApi = new ExchangeAPI(chainId)
        ammApi = new AmmpoolAPI(chainId)
    }, TIMEOUT)

    it('LRC_ETH_a2b_exceedDepth', async () => {

        try {

            await initAll('LRC', 'ETH')

            let input = '1000000'

            const feeBips = ammpools[amm_market].feeBips
    
            const output = getOutputAmount(base, quote, marketArr, input, isAtoB, feeBips.toString(), 
                tokenMap, marketMap, depth, ammPoolSnapshot)

            console.log('LRC_ETH_a2b_exceedDepth output:', output)

        } catch (reason) {
            dumpError400(reason)
        }
    }, TIMEOUT)

    it('LRC_ETH_b2a_exceedDepth', async () => {

        try {

            await initAll('LRC', 'ETH', false)

            let input = '1000000'

            const feeBips = ammpools[amm_market].feeBips
    
            const output = getOutputAmount(base, quote, marketArr, input, isAtoB, feeBips.toString(), 
                tokenMap, marketMap, depth, ammPoolSnapshot)

            console.log('LRC_ETH_a2b_exceedDepth output:', output)

        } catch (reason) {
            dumpError400(reason)
        }
    }, TIMEOUT)

    it('LRC_ETH_a2b_not_exceedDepth', async () => {

        try {

            await initAll('LRC', 'ETH')

            let input = '100'

            const feeBips = ammpools[amm_market].feeBips
    
            const output = getOutputAmount(base, quote, marketArr, input, isAtoB, feeBips.toString(), 
                tokenMap, marketMap, depth, ammPoolSnapshot)

            console.log('LRC_ETH_a2b_not_exceedDepth output:', output)

        } catch (reason) {
            dumpError400(reason)
        }
    }, TIMEOUT)

    it('LRC_ETH_b2a_not_exceedDepth', async () => {

        try {

            await initAll('LRC', 'ETH', false)

            let input = '1'

            const feeBips = ammpools[amm_market].feeBips
    
            const output = getOutputAmount(base, quote, marketArr, input, isAtoB, feeBips.toString(), 
                tokenMap, marketMap, depth, ammPoolSnapshot)

            console.log('LRC_ETH_a2b_not_exceedDepth output:', output)

        } catch (reason) {
            dumpError400(reason)
        }
    }, TIMEOUT)

    it('ETH_LRC_a2b_exceedDepth', async () => {

        try {

            await initAll('ETH', 'LRC')

            let input = '1000000'

            const feeBips = ammpools[amm_market].feeBips
    
            const output = getOutputAmount(base, quote, marketArr, input, isAtoB, feeBips.toString(), 
                tokenMap, marketMap, depth, ammPoolSnapshot)

            console.log('ETH_LRC_a2b_exceedDepth output:', output)

        } catch (reason) {
            dumpError400(reason)
        }
    }, TIMEOUT)

    it('ETH_LRC_b2a_exceedDepth', async () => {

        try {

            await initAll('ETH', 'LRC', false)

            let input = '1000000'

            const feeBips = ammpools[amm_market].feeBips
    
            const output = getOutputAmount(base, quote, marketArr, input, isAtoB, feeBips.toString(), 
                tokenMap, marketMap, depth, ammPoolSnapshot)

            console.log('ETH_LRC_a2b_exceedDepth output:', output)

        } catch (reason) {
            dumpError400(reason)
        }
    }, TIMEOUT)

    it('ETH_LRC_a2b_not_exceedDepth', async () => {

        try {

            await initAll('ETH', 'LRC')

            let input = '1'

            const feeBips = ammpools[amm_market].feeBips
    
            const output = getOutputAmount(base, quote, marketArr, input, isAtoB, feeBips.toString(), 
                tokenMap, marketMap, depth, ammPoolSnapshot)

            console.log('ETH_LRC_a2b_exceedDepth output:', output)

        } catch (reason) {
            dumpError400(reason)
        }
    }, TIMEOUT)

    it('ETH_LRC_b2a_not_exceedDepth', async () => {

        try {

            await initAll('ETH', 'LRC', false)

            let input = '1'

            const feeBips = ammpools[amm_market].feeBips
    
            const output = getOutputAmount(base, quote, marketArr, input, isAtoB, feeBips.toString(), 
                tokenMap, marketMap, depth, ammPoolSnapshot)

            console.log('ETH_LRC_a2b_exceedDepth output:', output)

        } catch (reason) {
            dumpError400(reason)
        }
    }, TIMEOUT)

})

export default {}