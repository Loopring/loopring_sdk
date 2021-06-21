import { ChainId } from '../defs/web3_defs'
import { AmmpoolAPI } from '../api/ammpool_api'

import { 
    GetNextStorageIdRequest,

    GetAmmPoolSnapshotRequest, 
    GetAmmPoolTradesRequest,
    GetUserAmmPoolTxsRequest,
    JoinAmmPoolRequest,
    ExitAmmPoolRequest,
    VALID_UNTIL,
    AmmPoolRequestPatch,
} from '../defs/loopring_defs'

import { DEFAULT_TIMEOUT } from '..'

import { loopring_exported_account as acc } from './utils'
import { dumpError400 } from '../utils/network_tools'
import { UserAPI } from '../api/user_api'

let userApi: UserAPI
let api: AmmpoolAPI

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

    it('getAmmPoolUserRewards', async () => {
        const response: any = await api.getAmmPoolUserRewards({ owner: acc.accountId.toString() })
        console.log('getAmmPoolUserRewards:', response.raw_data.data)
        console.log('getAmmPoolUserRewards:', response.raw_data.data[0].extraRewards)
        console.log('getAmmPoolUserRewards:', response.raw_data.data[0].currentRewards)
        
    }, DEFAULT_TIMEOUT)

    it('getAmmPoolActivityRules', async () => {
        const response: any = await api.getAmmPoolActivityRules()
        console.log('getAmmPoolActivityRules:', response)
    }, DEFAULT_TIMEOUT)

    it('getAmmPoolStats', async () => {
        const response: any = await api.getAmmPoolStats()
        console.log('ammPoolStats:', response.ammPoolStats)
    }, DEFAULT_TIMEOUT)

    it('getAmmPoolSnapshot', async () => {
        const request: GetAmmPoolSnapshotRequest = {
            poolAddress
        }
        const response = await api.getAmmPoolSnapshot(request, acc.apiKey)
        console.log(response)
        // console.log(response.data.pools[0])
    }, DEFAULT_TIMEOUT)

    it('getAmmPoolBalances', async () => {
        const response = await api.getAmmPoolBalances()
        console.log(response)
        console.log(response.ammpoolsbalances['AMM-LRC-ETH'].pooled)
        console.log(response.ammpoolsbalances['AMM-LRC-ETH'].lp)
        console.log(response.ammpoolsbalances['AMM-LRC-ETH'].pooledMap)
        // console.log(response.data.pools[0])
    }, DEFAULT_TIMEOUT)

    it('getAmmPoolTrades', async () => {
        const request: GetAmmPoolTradesRequest = {
            ammPoolAddress: poolAddress
        }
        const response = await api.getAmmPoolTrades(request)
        console.log(response)
    }, DEFAULT_TIMEOUT)

    it('getUserAmmPoolTxs', async () => {
        try {
            const request: GetUserAmmPoolTxsRequest = {
                accountId: acc.accountId
            }
            const response = await api.getUserAmmPoolTxs(request, acc.apiKey)
            console.log(response)
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

            console.log('1111111')

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
            
            const request_1: GetNextStorageIdRequest = {
                accountId: acc.accountId, 
                sellTokenId: 1
            }
            const storageId_1 = await userApi.getNextStorageId(request_1, acc.apiKey)

            const request2: ExitAmmPoolRequest = {
                owner: acc.address,
                poolAddress,
                exitTokens: {
                    unPooled: [{tokenId:"1", volume: "1000000000000000000000"}, {tokenId: "0", volume: "1000000000000000000"}, ],
                    burned: {tokenId: "4", volume: "100000"}
                },
                storageId: storageId_1.offchainId,
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
