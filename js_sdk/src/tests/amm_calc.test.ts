import { 
    LoopringMap, 
    MarketInfo, 
    TokenInfo, 
    DepthData, 
    ChainId,
    AmmPoolInfoV3,
    AmmPoolSnapshot,
    GetAmmPoolSnapshotRequest,
    GetOffchainFeeAmtRequest,
    OffchainFeeReqType,
} from '../defs'

import {
    AmmpoolAPI, 
    UserAPI, 
    ExchangeAPI, 
} from '../api'

import { dumpError400 } from '../utils/network_tools'

import { ammPoolCalc, getOutputAmount, makeExitAmmPoolRequest, makeJoinAmmPoolRequest } from '../utils/swap_calc_utils'

import * as sdk from '..'

import {loopring_exported_account as acc} from './utils'

const TIMEOUT = 30000

const testAddress = '0xd4bd7c71b6d4a09217ccc713f740d6ed8f4ea0cd'

const poolAddress = '0xfEB069407df0e1e4B365C10992F1bc16c078E34b'

describe('amm_calc', function () {

    beforeEach(async() => {
    }, TIMEOUT)

    it('amm_calc_test', async () => {
        const api = new AmmpoolAPI(ChainId.GORLI)
        try {
            const request: GetAmmPoolSnapshotRequest = {
                poolAddress
            }
            const response = await api.getAmmPoolSnapshot(request)
            console.log(response.raw_data.pooled)

            const covertVal = sdk.toBig('1e+20').toFixed(0, 0)

            const coinA_TV = response.ammPoolSnapshot.pooled[0]
            const coinB_TV = response.ammPoolSnapshot.pooled[1]

            const output = sdk.ammPoolCalc(covertVal, true, coinA_TV, coinB_TV)

            console.log('covertVal:', covertVal)
            console.log('output:', output)
            console.log('ratio:', output.ratio.toString())

        } catch (reason) {
            dumpError400(reason)
        }
    }, TIMEOUT)

    it('make_join_request', async () => {
        const api = new AmmpoolAPI(ChainId.GORLI)
        const userApi = new UserAPI(ChainId.GORLI)
        const exchangeApi = new ExchangeAPI(ChainId.GORLI)
        try {

            const { ammpools } = await api.getAmmPoolConf()

            const request: GetAmmPoolSnapshotRequest = {
                poolAddress
            }

            const response = await api.getAmmPoolSnapshot(request)
            console.log(response.raw_data.pooled)

            const request2: GetOffchainFeeAmtRequest = {
                accountId: acc.accountId,
                requestType: OffchainFeeReqType.AMM_JOIN,
                tokenSymbol: 'ETH',
            }

            const { fees } = await userApi.getOffchainFeeAmt(request2, acc.apiKey)

            console.log('---fees:', fees)

            const { tokenSymbolMap , tokenIdIndex, } = await exchangeApi.getTokens()

            const { request: res } = makeJoinAmmPoolRequest('100', true, '0.001', acc.address, fees, 
                ammpools['AMM-LRC-ETH'], response.ammPoolSnapshot, tokenSymbolMap, tokenIdIndex, 0, 0)

            console.log('res:', res)

        } catch (reason) {
            dumpError400(reason)
        }
    }, TIMEOUT)

    it('make_exit_request', async () => {
        const api = new AmmpoolAPI(ChainId.GORLI)
        const userApi = new UserAPI(ChainId.GORLI)
        const exchangeApi = new ExchangeAPI(ChainId.GORLI)
        try {

            const { ammpools } = await api.getAmmPoolConf()

            const request: GetAmmPoolSnapshotRequest = {
                poolAddress
            }
            
            const response = await api.getAmmPoolSnapshot(request)
            console.log(response.raw_data.pooled)

            const request2: GetOffchainFeeAmtRequest = {
                accountId: acc.accountId,
                requestType: OffchainFeeReqType.AMM_JOIN,
                tokenSymbol: 'ETH',
            }

            const { fees } = await userApi.getOffchainFeeAmt(request2, acc.apiKey)

            console.log('---fees:', fees)

            const { tokenSymbolMap , tokenIdIndex, } = await exchangeApi.getTokens()

            const { request: res } = makeExitAmmPoolRequest('100', '0.001', acc.address, fees, 
                ammpools['AMM-LRC-ETH'], response.ammPoolSnapshot, tokenSymbolMap, tokenIdIndex, 0)

            console.log('res:', res)

        } catch (reason) {
            dumpError400(reason)
        }
    }, TIMEOUT)

})

export default {}