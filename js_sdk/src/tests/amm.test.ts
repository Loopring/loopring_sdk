import { ChainId } from '../defs/web3_defs'
import { AmmpoolAPI, ExchangeAPI, UserAPI, } from '../api'

import { 
    GetNextStorageIdRequest,

    GetAmmPoolSnapshotRequest, 
    GetAmmPoolTradesRequest,
    GetUserAmmPoolTxsRequest,
    AmmPoolRequestPatch,
    GetAmmPoolTxsRequest,
    OffchainFeeReqType,

    DEFAULT_TIMEOUT,
    AmmPoolSnapshot,
    GetLiquidityMiningUserHistoryRequest,
} from '../defs'

import { loopring_exported_account as acc } from './utils'
import { dumpError400 } from '../utils/network_tools'
import { makeExitAmmPoolRequest, makeExitAmmPoolRequest2, makeJoinAmmPoolRequest } from '../utils'

let userApi: UserAPI
let api: AmmpoolAPI
let exchangeApi: ExchangeAPI

const testAddress = '0xd4bd7c71b6d4a09217ccc713f740d6ed8f4ea0cd'

const poolAddress = '0xfEB069407df0e1e4B365C10992F1bc16c078E34b'

describe('AmmpoolAPI test', function () {

    beforeEach(() => {
        api = new AmmpoolAPI({ chainId: ChainId.GOERLI })
        userApi = new UserAPI({ chainId: ChainId.GOERLI })
        exchangeApi = new ExchangeAPI({ chainId: ChainId.GOERLI })
    })

    it('getAmmPoolConf', async () => {
        const { ammpools, pairs } = await api.getAmmPoolConf()
        console.log(ammpools)
        console.log(pairs)
    }, DEFAULT_TIMEOUT)

    it('getAmmPoolUserRewards1', async () => {
        const response = await api.getAmmPoolUserRewards({ owner: acc.accountId })
        console.log('getAmmPoolUserRewards:', response)
        console.log('getAmmPoolUserRewards feeRewards:', response.raw_data[0].feeRewards)
        console.log('getAmmPoolUserRewards extraRewards:', response.raw_data[0].extraRewards)
        console.log('getAmmPoolUserRewards currentRewards:', response.raw_data[0].currentRewards)
    }, DEFAULT_TIMEOUT)

    it('getAmmPoolUserRewards2', async () => {
        const response = await api.getAmmPoolUserRewards({ owner: acc.accountId, ammPoolMarkets: 'AMM-LRC-ETH' })
        console.log('getAmmPoolUserRewards:', response)
        console.log('getAmmPoolUserRewards feeRewards:', response.raw_data[0].feeRewards)
        console.log('getAmmPoolUserRewards extraRewards:', response.raw_data[0].extraRewards)
        console.log('getAmmPoolUserRewards currentRewards:', response.raw_data[0].currentRewards)
    }, DEFAULT_TIMEOUT)

    it('getAmmPoolUserRewards3', async () => {
        const response = await api.getAmmPoolUserRewards({ owner: acc.accountId, ammPoolMarkets: 'AMM-LRC-ETH,AMM-ETH-USDT' })
        console.log('getAmmPoolUserRewards:', response)
        console.log('getAmmPoolUserRewards feeRewards:', response.raw_data[0].feeRewards)
        console.log('getAmmPoolUserRewards extraRewards:', response.raw_data[0].extraRewards)
        console.log('getAmmPoolUserRewards currentRewards:', response.raw_data[0].currentRewards)
    }, DEFAULT_TIMEOUT)

    it('getAmmPoolGameRank', async () => {
        api = new AmmpoolAPI({ chainId: ChainId.MAINNET })
        const response: any = await api.getAmmPoolGameRank({ ammPoolMarket: 'AMM-VSP-ETH' })
        console.log('getAmmPoolGameRank:', response.raw_data)
        console.log('totalRewards:', response.totalRewards)
        console.log('userRankList 1:', response.userRankList[0])
        console.log('userRankList:', response.userRankList[0].rewards)
    }, DEFAULT_TIMEOUT)

    it('getAmmAssetHistory', async () => {
        const response = await api.getAmmAssetHistory({ poolAddress, })
        console.log('getAmmAssetHistory dataSeries:', response)
        // console.log('getAmmAssetHistory:', response.raw_data.data[0].tokens)
    }, DEFAULT_TIMEOUT)

    it('getAmmPoolGameUserRank', async () => {
        const response = await api.getAmmPoolGameUserRank({ owner: testAddress, 
            ammPoolMarket: 'LRC-ETH' }, acc.apiKey)
        console.log('getAmmPoolGameUserRank:', response.raw_data)
        console.log('userRank:', response.userRank)
    }, DEFAULT_TIMEOUT)

    it('getAmmPoolActivityRules_Mainnet', async () => {
        api = new AmmpoolAPI({ chainId: ChainId.MAINNET })
        const response = await api.getAmmPoolActivityRules()
        console.log('getAmmPoolActivityRules:', response)
    }, DEFAULT_TIMEOUT)

    it('getAmmPoolActivityRules', async () => {
        const response = await api.getAmmPoolActivityRules()
        console.log('getAmmPoolActivityRules:', response)
        console.log(response.activityRules['AMM-LRC-ETH'].awardRules)
    }, DEFAULT_TIMEOUT)

    it('getAmmPoolStats', async () => {
        api = new AmmpoolAPI({ chainId: ChainId.MAINNET })
        
        const response = await api.getAmmPoolStats()
        console.log('ammPoolStats:', response.ammPoolStats)
        console.log('rewards:', response.ammPoolStats['AMM-BCDT-ETH']?.rewards)
    }, DEFAULT_TIMEOUT)

    it('getAmmPoolSnapshot_correct', async () => {
            const request: GetAmmPoolSnapshotRequest = {
                poolAddress
            }
            const response = await api.getAmmPoolSnapshot(request)
            console.log(response)
            console.log(response.raw_data.pooled)
    }, DEFAULT_TIMEOUT)

    it('getLiquidityMiningUserHistory_OK', async () => {
            const request: GetLiquidityMiningUserHistoryRequest = {
                accountId: acc.accountId,
                start: 0,
                end: new Date().getTime()
            }
            const response = await api.getLiquidityMiningUserHistory(request)
            console.log(response)
    }, DEFAULT_TIMEOUT)

    it('getLiquidityMiningUserHistory_No_data', async () => {
            const request: GetLiquidityMiningUserHistoryRequest = {
                accountId: 10084,
                start: 0,
                end: new Date().getTime()
            }
            const response = await api.getLiquidityMiningUserHistory(request)
            console.log(response)
    }, DEFAULT_TIMEOUT)

    it('getAmmPoolSnapshot_err', async () => {
        api = new AmmpoolAPI({ chainId: ChainId.MAINNET })
            const request: GetAmmPoolSnapshotRequest = {
                poolAddress
            }
            const response = await api.getAmmPoolSnapshot(request)
            console.log(response)
            console.log(response.raw_data.pooled)
    }, DEFAULT_TIMEOUT)

    it('getAmmPoolBalances', async () => {
        api = new AmmpoolAPI({ chainId: ChainId.MAINNET })
        const response = await api.getAmmPoolBalances()
        
        console.log(response.ammpoolsbalances['AMM-LRC-ETH'].poolAddress)
        console.log(response.ammpoolsbalances['AMM-LRC-ETH'].pooled)
        console.log(response.ammpoolsbalances['AMM-LRC-ETH'].lp)
        console.log(response.ammpoolsbalances['AMM-LRC-ETH'].pooledMap)
    }, DEFAULT_TIMEOUT)

    it('getAmmPoolTrades', async () => {
        const request: GetAmmPoolTradesRequest = {
            ammPoolAddress: poolAddress
        }
        const response = await api.getAmmPoolTrades(request)
        console.log(response)
        console.log(response.raw_data.trades[0])
    }, DEFAULT_TIMEOUT)

    it('getAmmPoolTxs', async () => {
        try {
            const request: GetAmmPoolTxsRequest = {
                poolAddress,
            }
            const response = await api.getAmmPoolTxs(request)
            console.log(response)
            console.log(response.transactions[0].lpToken)
            console.log(response.transactions[0].poolTokens)
        } catch (reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)

    it('getUserAmmPoolTxs', async () => {
        try {
            const request: GetUserAmmPoolTxsRequest = {
                accountId: acc.accountId
            }
            const response = await api.getUserAmmPoolTxs(request, acc.apiKey)
            console.log(response)
            console.log(response.raw_data.transactions[0])
        } catch(reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)

    it('joinAmmPool', async () => {
        try {

            const { ammpools } = await api.getAmmPoolConf()

            const tokenSymbol = 'AMM-LRC-ETH'

            const ammInfo = ammpools[tokenSymbol]

            const request1: GetAmmPoolSnapshotRequest = {
                poolAddress
            }
            const { ammPoolSnapshot } = await api.getAmmPoolSnapshot(request1)
            
            const request: GetNextStorageIdRequest = {
                accountId: acc.accountId, 
                sellTokenId: 0
            }
            const storageId = await userApi.getNextStorageId(request, acc.apiKey)
            
            const request_1: GetNextStorageIdRequest = {
                accountId: acc.accountId, 
                sellTokenId: 1
            }
            const storageId_1 = await userApi.getNextStorageId(request_1, acc.apiKey)

            console.log('getOffchainFeeAmt 1')

            const { fees } = await userApi.getOffchainFeeAmt({tokenSymbol: 'ETH', requestType: OffchainFeeReqType.AMM_JOIN, accountId: acc.accountId}, acc.apiKey)
            
            const fee = fees['ETH']
            console.log('getOffchainFeeAmt 2', fee)

            const { tokenSymbolMap, tokenIdIndex, } = await exchangeApi.getTokens()

            const { request: res3 } = makeJoinAmmPoolRequest('500', true, 
            '0.001', acc.address, fees, ammPoolSnapshot as AmmPoolSnapshot, tokenSymbolMap, tokenIdIndex,
            storageId_1.offchainId, storageId.offchainId)

            const patch: AmmPoolRequestPatch = {
                chainId: ChainId.GOERLI,
                ammName: ammInfo.name,
                poolAddress,
                eddsaKey: acc.eddsaKey
            }

            console.log('res3:', res3)
            console.log('res3 pooled:', res3.joinTokens.pooled)

            const response = await api.joinAmmPool(res3, patch, acc.apiKey)
            console.log(response)

        } catch(reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)

    it('exitAmmPool1', async () => {
        try {

            const { ammpools } = await api.getAmmPoolConf()

            const tokenSymbol = 'AMM-LRC-ETH'

            const ammInfo = ammpools[tokenSymbol]

            const request1: GetAmmPoolSnapshotRequest = {
                poolAddress
            }
            const { ammPoolSnapshot } = await api.getAmmPoolSnapshot(request1)

            const { fees } = await userApi.getOffchainFeeAmt({tokenSymbol: 'ETH', requestType: OffchainFeeReqType.AMM_EXIT, accountId: acc.accountId}, acc.apiKey)
            
            const request: GetNextStorageIdRequest = {
                accountId: acc.accountId, 
                sellTokenId: 4
            }
            const storageId = await userApi.getNextStorageId(request, acc.apiKey)

            const { tokenSymbolMap, tokenIdIndex, } = await exchangeApi.getTokens()

            const { request: req3 } = makeExitAmmPoolRequest('200', true, '0.001', acc.address,
            fees, ammPoolSnapshot as AmmPoolSnapshot, tokenSymbolMap, tokenIdIndex, storageId.offchainId, )

            const patch: AmmPoolRequestPatch = {
                chainId: ChainId.GOERLI,
                ammName: 'LRCETH-Pool',
                poolAddress,
                eddsaKey: acc.eddsaKey
            }

            console.log('req3:', req3)
            console.log('res3 unPooled:', req3.exitTokens.unPooled)

            const response = await api.exitAmmPool(req3, patch, acc.apiKey)
            console.log(response)
        } catch(reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)

    it('exitAmmPool2', async () => {
        try {

            const { ammpools } = await api.getAmmPoolConf()

            const tokenSymbol = 'AMM-LRC-ETH'

            const ammInfo = ammpools[tokenSymbol]

            const request1: GetAmmPoolSnapshotRequest = {
                poolAddress
            }
            const { ammPoolSnapshot } = await api.getAmmPoolSnapshot(request1)

            const { fees } = await userApi.getOffchainFeeAmt({tokenSymbol: 'ETH', requestType: OffchainFeeReqType.AMM_EXIT, accountId: acc.accountId}, acc.apiKey)
            
            const request: GetNextStorageIdRequest = {
                accountId: acc.accountId, 
                sellTokenId: 4
            }
            const storageId = await userApi.getNextStorageId(request, acc.apiKey)

            const { tokenSymbolMap, tokenIdIndex, } = await exchangeApi.getTokens()

            const { request: req3 } = makeExitAmmPoolRequest2('10', '0.001', acc.address,
            fees, ammPoolSnapshot as AmmPoolSnapshot, tokenSymbolMap, tokenIdIndex, storageId.offchainId, )

            const patch: AmmPoolRequestPatch = {
                chainId: ChainId.GOERLI,
                ammName: 'LRCETH-Pool',
                poolAddress,
                eddsaKey: acc.eddsaKey
            }

            console.log('req3:', req3)
            console.log('res3 unPooled:', req3.exitTokens.unPooled)

            const response = await api.exitAmmPool(req3, patch, acc.apiKey)
            console.log(response)
        } catch(reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)

})
