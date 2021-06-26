import { BaseAPI } from './base_api'
import { 
    GetAmmUserRewardsRequest,
    GetAmmPoolSnapshotRequest,
    GetAmmPoolTradesRequest,
    GetUserAmmPoolTxsRequest,
    JoinAmmPoolRequest,
    ExitAmmPoolRequest,
    VALID_UNTIL,
    AmmPoolRequestPatch,
    AmmPoolBalance,
    AmmPoolStat,
    GetAmmPoolGameRankRequest,
    GetAmmPoolGameUserRankRequest,
    TokenVolumeV3,
    GameRankInfo,
    AmmPoolSnapshot,
    AmmUserReward,
    AmmUserRewardMap,
    AmmPoolActivityRule,
    JoinAmmPoolResult,
    ExitAmmPoolResult,
    LoopringMap,
    TokenRelatedInfo,
    AmmPoolInfoV3,
    AmmPoolTrade,
    AmmPoolTx,
} from '../defs/loopring_defs'

import { ReqParams, SIG_FLAG, ReqMethod, } from '../defs/loopring_defs'

import { LOOPRING_URLs, } from '../defs/url_defs'

import * as sign_tools from './sign/sign_tools'

export class AmmpoolAPI extends BaseAPI {

    /*
    * Returns the fee rate of users placing orders in specific markets
    */
    public async getAmmPoolConf() {

        const reqParams: ReqParams = {
            url: LOOPRING_URLs.GET_AMM_POOLS_CONF,
            method: ReqMethod.GET,
            sigFlag: SIG_FLAG.NO_SIG,
        }

        const raw_data = (await this.makeReq().request(reqParams)).data
        let ammpools: LoopringMap<AmmPoolInfoV3> = {}

        let pairs: LoopringMap<TokenRelatedInfo> = {}

        raw_data.pools.forEach((item: any) => {

            const market: string = item.market
            ammpools[market] = item

            let base = ''
            let quote = ''

            const ind = market.indexOf('-')
            const ind2 = market.lastIndexOf('-')
            base = market.substring(ind + 1, ind2)
            quote = market.substring(ind2 + 1, market.length)


            if (!pairs[base]) {
                pairs[base] = {
                    tokenId: item.tokens.pooled[0],
                    tokenList: [quote],
                }
            } else {
                pairs[base].tokenList = [...pairs[base].tokenList, quote]
            }

            if (!pairs[quote]) {
                pairs[quote] = {
                    tokenId: item.tokens.pooled[1],
                    tokenList: [base],
                }
            } else {
                pairs[quote].tokenList = [...pairs[quote].tokenList, base]
            }

        })

        return {
            ammpools,
            pairs,
            raw_data,
        }

    }

    /*
    */
    public async getAmmPoolUserRewards(request: GetAmmUserRewardsRequest) {

        const reqParams: ReqParams = {
            queryParams: request,
            url: LOOPRING_URLs.GET_AMMPOOL_USER_REWARDS,
            method: ReqMethod.GET,
            sigFlag: SIG_FLAG.NO_SIG,
        }

        const raw_data: AmmUserReward[] = (await this.makeReq().request(reqParams)).data.data

        let ammUserRewardMap : AmmUserRewardMap = {}

        raw_data.forEach((item: AmmUserReward) => {
            ammUserRewardMap[item.market] = item
        })

        return {
            ammUserRewardMap,
            raw_data,
        }

    }

    /*
    */
    public async getAmmPoolGameRank(request: GetAmmPoolGameRankRequest) {

        const reqParams: ReqParams = {
            queryParams: request,
            url: LOOPRING_URLs.GET_AMMPOOL_GAME_RANK,
            method: ReqMethod.GET,
            sigFlag: SIG_FLAG.NO_SIG,
        }

        const raw_data = (await this.makeReq().request(reqParams)).data

        const totalRewards: TokenVolumeV3[] = raw_data.data?.totalRewards ? raw_data.data.totalRewards : []

        const userRankList: GameRankInfo[] = raw_data.data?.userRankList ? raw_data.data.userRankList : []

        return {
            totalRewards,
            userRankList,
            raw_data,
        }

    }

    /*
    */
    public async getAmmPoolGameUserRank(request: GetAmmPoolGameUserRankRequest, apiKey: string) {

        const reqParams: ReqParams = {
            queryParams: request,
            apiKey,
            url: LOOPRING_URLs.GET_AMMPOOL_GAME_USER_RANK,
            method: ReqMethod.GET,
            sigFlag: SIG_FLAG.NO_SIG,
        }

        const raw_data = (await this.makeReq().request(reqParams)).data

        const userRankList: GameRankInfo[] = raw_data.data?.userRankList ? raw_data.data.userRankList : []

        return {
            userRankList,
            raw_data,
        }

    }

    /*
    */
    public async getAmmPoolActivityRules() {

        const reqParams: ReqParams = {
            url: LOOPRING_URLs.GET_AMM_ACTIVITY_RULES,
            method: ReqMethod.GET,
            sigFlag: SIG_FLAG.NO_SIG,
        }

        const raw_data = (await this.makeReq().request(reqParams)).data

        let activityRules: LoopringMap<AmmPoolActivityRule> = {}
        raw_data.data.forEach((item: AmmPoolActivityRule) => {
            activityRules[item.market] = item
        })

        return {
            activityRules,
            raw_data,
        }

    }

    /*
    */
    public async getAmmPoolStats() {

        const reqParams: ReqParams = {
            url: LOOPRING_URLs.GET_AMM_POOL_STATS,
            method: ReqMethod.GET,
            sigFlag: SIG_FLAG.NO_SIG,
        }

        const raw_data = (await this.makeReq().request(reqParams)).data

        console.log('raw_data:', raw_data)

        let ammPoolStats: LoopringMap<AmmPoolStat> = {}

        raw_data.data.forEach((item: AmmPoolStat) => {
            ammPoolStats[item.market] = item
        })

        return {
            ammPoolStats,
            raw_data,
        }

    }

    /*
    */
    public async getAmmPoolSnapshot(request: GetAmmPoolSnapshotRequest) {

        const reqParams: ReqParams = {
            url: LOOPRING_URLs.GET_AMM_POOLS_SNAPSHOT,
            queryParams: request,
            method: ReqMethod.GET,
            sigFlag: SIG_FLAG.NO_SIG,
        }

        const raw_data = (await this.makeReq().request(reqParams)).data

        return {
            ammPoolSnapshot: raw_data as AmmPoolSnapshot,
            raw_data,
        }

    }

    /*
    */
    public async getAmmPoolBalances() {

        const reqParams: ReqParams = {
            url: LOOPRING_URLs.GET_AMM_POOLS_BALANCES,
            method: ReqMethod.GET,
            sigFlag: SIG_FLAG.NO_SIG,
        }

        const raw_data = (await this.makeReq().request(reqParams)).data

        let ammpoolsbalances: LoopringMap<AmmPoolBalance> = {}

        raw_data.forEach((item: any) => {

            let tempPooled: any = {}

            item.pooled.forEach((item2: any) => {
                tempPooled[item2.tokenId] = item2
            })

            item.pooledMap = tempPooled

            let poolName = item.poolName
            if (poolName.indexOf('LRCETH') >= 0) {
                poolName = 'AMM-LRC-ETH'
            }

            ammpoolsbalances[poolName] = item
        })

        return {
            ammpoolsbalances,
            raw_data,
        }

    }

    /*
    */
    public async getUserAmmPoolTxs(request: GetUserAmmPoolTxsRequest, apiKey: string) {

        const reqParams: ReqParams = {
            queryParams: request,
            apiKey,
            url: LOOPRING_URLs.GET_USER_AMM_POOL_TXS,
            method: ReqMethod.GET,
            sigFlag: SIG_FLAG.NO_SIG,
        }

        const raw_data = (await this.makeReq().request(reqParams)).data

        return {
            totalNum: raw_data.totalNum,
            userAmmPoolTxs: raw_data.transactions as AmmPoolTx[],
            raw_data,
        }

    }

    /*
    */
    public async getAmmPoolTrades(request: GetAmmPoolTradesRequest) {

        const reqParams: ReqParams = {
            queryParams: request,
            url: LOOPRING_URLs.GET_AMM_POOL_TRADE_TXS,
            method: ReqMethod.GET,
            sigFlag: SIG_FLAG.NO_SIG,
        }

        const raw_data = (await this.makeReq().request(reqParams)).data

        return {
            totalNum: raw_data.totalNum,
            ammPoolTrades: raw_data.transactions as AmmPoolTrade[],
            raw_data
        }

    }

    /*
    */
    public async joinAmmPool(request: JoinAmmPoolRequest, patch: AmmPoolRequestPatch, apiKey: string) {

        if (!request?.validUntil)
            request.validUntil = VALID_UNTIL

        const reqParams: ReqParams = {
            bodyParams: request,
            apiKey,
            url: LOOPRING_URLs.POST_JOIN_AMM_POOL,
            method: ReqMethod.POST,
            sigFlag: SIG_FLAG.NO_SIG,
        }

        const { eddsaSig } = sign_tools.get_EddsaSig_JoinAmmPool(request, patch)

        request.eddsaSignature = eddsaSig

        const raw_data = (await this.makeReq().request(reqParams)).data

        return {
            joinAmmPoolResult: raw_data as JoinAmmPoolResult,
            raw_data,
        }

    }

    /*
    */
    public async exitAmmPool(request: ExitAmmPoolRequest, patch: AmmPoolRequestPatch, apiKey: string) {

        if (!request?.validUntil)
            request.validUntil = VALID_UNTIL

        const reqParams: ReqParams = {
            bodyParams: request,
            apiKey,
            url: LOOPRING_URLs.POST_EXIT_AMM_POOL,
            method: ReqMethod.POST,
            sigFlag: SIG_FLAG.NO_SIG,
        }

        const { eddsaSig } = sign_tools.get_EddsaSig_ExitAmmPool(request, patch)

        request.eddsaSignature = eddsaSig

        const raw_data = (await this.makeReq().request(reqParams)).data

        return {
            exitAmmPoolResult: raw_data as ExitAmmPoolResult,
            raw_data
        }

    }

}
