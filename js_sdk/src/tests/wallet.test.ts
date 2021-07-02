import { ChainId, } from '../defs/web3_defs'

import { 
    GetTokenPricesRequest, 
    GetUserAssetsRequest, 
} from '../defs/loopring_defs'

import {
    DEFAULT_TIMEOUT,
} from '../defs/loopring_constants'

import { dumpError400 } from '../utils/network_tools'

import { WalletAPI } from '../api/wallet_api'

let api: WalletAPI

describe('WalletApi', function () {

    beforeEach(async() => {
        api = new WalletAPI(ChainId.MAINNET)
    })

    it('getUserAssets', async () => {
        try {
            const request: GetUserAssetsRequest = {
                wallet: '0xeF041462825bFdF79b2f1f02A70b2753cB5b1516'
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

    it('getLatestTokenPrices', async () => {
        try {

            const response = await api.getLatestTokenPrices()
            console.log(response)
        } catch (reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)

})
