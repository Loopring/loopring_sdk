import { 
    LoopringMap, 
    MarketInfo, 
    TokenInfo, 
    DepthData, 
    ChainId,
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

let base = 'LRC'
let quote = 'ETH'
let market = `${base}-${quote}`
let amm_market = `AMM-${base}-${quote}`
let isAtoB = true

const AMM_LRC_ETH_poolAddress = '0x18920d6e6fb7ebe057a4dd9260d6d95845c95036'

describe('swap_calc_utils', function () {

    beforeEach(() => {
        userApi = new UserAPI(chainId)
        exchangeApi = new ExchangeAPI(chainId)
        ammApi = new AmmpoolAPI(chainId)
    })

    it('getOutputAmount', async () => {

        try {
        
            const tokenMap = await exchangeApi.getTokens()

            const marketMap = await exchangeApi.getMixMarkets()

            const depth = (await exchangeApi.getMixDepth({ market })).depth

            const ammConf = (await ammApi.getAmmPoolConf()).ammpools

            let input = '1000000'

            const ammPoolSnapshot = (await ammApi.getAmmPoolSnapshot({poolAddress: AMM_LRC_ETH_poolAddress})).ammPoolSnapshot
            
            // console.log(tokenMap.tokenSymbolMap)
            // console.log(marketMap.markets)

            const feeBips = ammConf[amm_market].feeBips

            console.log(depth)
            console.log(ammPoolSnapshot)
    
            const output = getOutputAmount(base, quote, market, input, isAtoB, feeBips.toString(), 
                tokenMap.tokenSymbolMap, marketMap.markets, depth, ammPoolSnapshot)

            console.log('getOutputAmount output:', output)

        } catch (reason) {
            dumpError400(reason)
        }
    }, TIMEOUT)

})

export default {}