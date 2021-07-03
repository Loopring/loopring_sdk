import { ChainId } from '../defs/web3_defs'
import { AmmpoolAPI } from '../api/ammpool_api'

import { 
    GetNextStorageIdRequest,

    GetAmmPoolSnapshotRequest, 
    GetAmmPoolTradesRequest,
    GetUserAmmPoolTxsRequest,
    JoinAmmPoolRequest,
    ExitAmmPoolRequest,
    AmmPoolRequestPatch,
    GetAmmPoolTxsRequest,
} from '../defs/loopring_defs'

import { 
    DEFAULT_TIMEOUT,
} from '../defs/loopring_constants'

import { loopring_exported_account as acc } from './utils'
import { dumpError400 } from '../utils/network_tools'
import { UserAPI } from '../api/user_api'

let userApi: UserAPI
let api: AmmpoolAPI

const testAddress = '0xd4bd7c71b6d4a09217ccc713f740d6ed8f4ea0cd'

const poolAddress = '0xfEB069407df0e1e4B365C10992F1bc16c078E34b'

describe('AmmpoolAPI test', function () {

    beforeEach(() => {
        api = new AmmpoolAPI(ChainId.GORLI)
        userApi = new UserAPI(ChainId.GORLI)
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
        api = new AmmpoolAPI(ChainId.MAINNET)
        const response: any = await api.getAmmPoolGameRank({ ammPoolMarket: 'AMM-VSP-ETH' })
        console.log('getAmmPoolGameRank:', response.raw_data)
        console.log('totalRewards:', response.totalRewards)
        console.log('userRankList 1:', response.userRankList[0])
        console.log('userRankList:', response.userRankList[0].rewards)
    }, DEFAULT_TIMEOUT)

    it('getAmmPoolGameUserRank', async () => {
        const response = await api.getAmmPoolGameUserRank({ owner: testAddress, 
            ammPoolMarket: 'LRC-ETH' }, acc.apiKey)
        console.log('getAmmPoolGameUserRank:', response.raw_data)
        console.log('userRank:', response.userRank)
    }, DEFAULT_TIMEOUT)

    it('getAmmPoolActivityRules', async () => {
        const response = await api.getAmmPoolActivityRules()
        console.log('getAmmPoolActivityRules:', response)
        console.log(response.activityRules['AMM-LRC-ETH'].awardRules)
    }, DEFAULT_TIMEOUT)

    it('getAmmPoolStats', async () => {
        api = new AmmpoolAPI(ChainId.MAINNET)
        
        const response = await api.getAmmPoolStats()
        console.log('ammPoolStats:', response.ammPoolStats)
        console.log('rewards:', response.ammPoolStats['AMM-BCDT-ETH'].rewards)
    }, DEFAULT_TIMEOUT)

    it('getAmmPoolSnapshot', async () => {
        api = new AmmpoolAPI(ChainId.GORLI)
        try {
            const request: GetAmmPoolSnapshotRequest = {
                poolAddress
            }
            const response = await api.getAmmPoolSnapshot(request)
            console.log(response)
            console.log(response.raw_data.pooled)
        } catch (reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)

    it('getAmmPoolBalances', async () => {
        api = new AmmpoolAPI(ChainId.MAINNET)
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
            console.log(response.raw_data.data.bills)
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

            console.log('tokens:', ammpools['AMM-LRC-ETH'].tokens)
            
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

            const request2: JoinAmmPoolRequest = {
                owner: acc.address,
                poolAddress,
                joinTokens: {
                    pooled: [{tokenId:"1", volume: "1000000000000000000000"}, {tokenId: "0", volume: "1000000000000000000"}, ],
                    minimumLp: {tokenId: "4", volume: "100000"}
                },
                storageIds: [storageId_1.offchainId, storageId.offchainId, ],
                fee: '1000000000000000000',
            }

            const patch: AmmPoolRequestPatch = {
                chainId: ChainId.GORLI,
                ammName: 'LRCETH-Pool',
                poolAddress,
                eddsaKey: acc.eddsaKey
            }

            const response = await api.joinAmmPool(request2, patch, acc.apiKey)
            console.log(response)
        } catch(reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)

    it('exitAmmPool', async () => {
        try {

            const { ammpools } = await api.getAmmPoolConf()

            console.log('tokens:', ammpools['AMM-LRC-ETH'].tokens)
            
            const request: GetNextStorageIdRequest = {
                accountId: acc.accountId, 
                sellTokenId: 4
            }
            const storageId = await userApi.getNextStorageId(request, acc.apiKey)

            const request2: ExitAmmPoolRequest = {
                owner: acc.address,
                poolAddress,
                exitTokens: {
                    unPooled: [{tokenId:"1", volume: "1000000000000000000000"}, {tokenId: "0", volume: "1000000000000000000"}, ],
                    burned: {tokenId: "4", volume: "100000"}
                },
                storageId: storageId.offchainId,
                maxFee: '1000000000000000000',
            }

            const patch: AmmPoolRequestPatch = {
                chainId: ChainId.GORLI,
                ammName: 'LRCETH-Pool',
                poolAddress,
                eddsaKey: acc.eddsaKey
            }

            const response = await api.exitAmmPool(request2, patch, acc.apiKey)
            console.log(response)
        } catch(reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)

})
