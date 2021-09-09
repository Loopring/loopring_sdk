import { 
    ChainId,
    GetTokenPricesRequest, 
    GetUserAssetsRequest, 
    Currency,
} from '../defs'

import {
    DEFAULT_TIMEOUT,
} from '../defs/loopring_constants'

import { dumpError400 } from '../utils/network_tools'

import { WalletAPI, ExchangeAPI, } from '../api'

let api: WalletAPI

describe('WalletApi', function () {

    beforeEach(async() => {
        api = new WalletAPI({chainId: ChainId.MAINNET})
    })

    it('getUserAssets', async () => {
        try {
            const request: GetUserAssetsRequest = {
                wallet: '0xeF041462825bFdF79b2f1f02A70b2753cB5b1516',
                offset: 10,
                limit: 10,
            }

            const response = await api.getUserAssets(request)
            console.log(response)
        } catch (reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)

    it('getUserAssets_TESTNET', async () => {
        try {
            api = new WalletAPI({ chainId: ChainId.GOERLI })
            const request: GetUserAssetsRequest = {
                wallet: ''
            }

            const response = await api.getUserAssets(request)
            console.log(response)
        } catch (reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)

    it('getTokenPrices', async () => {
        try {
            const request: GetTokenPricesRequest = {
                token: '0xdac17f958d2ee523a2206206994597c13d831ec7'
            }

            const response = await api.getTokenPrices(request)
            console.log(response)
            console.log(response.raw_data.data)
        } catch (reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)

    it('getLatestTokenPrices1', async () => {
        try {

            const response = await api.getLatestTokenPrices()
            console.log(response)
        } catch (reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)

    it('getUniPrice', async () => {
        const chainId = ChainId.MAINNET
        const api = new ExchangeAPI({ chainId, })
        const walletApi = new WalletAPI({ chainId, })

        const tokens = await api.getTokens()
        const response = await walletApi.getLatestTokenPrices()

        if (tokens && response) {
            const addr = tokens.tokenSymbolMap['UNI'].address
            console.log(response.tokenPrices[addr])
        }

        const response2 = await walletApi.getLatestTokenPrices( { currency: Currency.CNY })

        if (tokens && response2) {
            const addr = tokens.tokenSymbolMap['UNI'].address
            console.log(response2.tokenPrices[addr])
        }

    }, DEFAULT_TIMEOUT)

    it('getLatestTokenPrices_cny', async () => {
        try {

            const response = await api.getLatestTokenPrices({ currency: Currency.CNY, })
            console.log(response)
        } catch (reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)

    it('getLatestTokenPrices_2', async () => {
        try {

            const response = await api.getLatestTokenPrices({ tokens: '0x7b854d37e502771b1647f5917efcf065ce1c0677,0x6ff8a397f7a04b41c58c00ab8e70aca7cbc0adba', })
            console.log(response)
        } catch (reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)

})
