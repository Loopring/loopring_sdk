/* eslint-disable camelcase  */
import { BaseAPI } from './base_api'
import * as loopring_defs from '../defs'

import { LOOPRING_URLs } from '../defs'

import * as sign_tools from './sign/sign_tools'
import { makeAmmPool } from '../utils'

export class AmmpoolAPI extends BaseAPI {
  /*
   * Returns the fee rate of users placing orders in specific markets
   */
  public async getAmmPoolConf<R>(): Promise<{
    raw_data: R
    ammpools: loopring_defs.LoopringMap<loopring_defs.AmmPoolInfoV3>
    pairs: loopring_defs.LoopringMap<loopring_defs.TokenRelatedInfo>
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_AMM_POOLS_CONF,
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
    }

    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      }
    }

    const { ammpools, pairs } = makeAmmPool(raw_data)
    // if (raw_data.code) {
    //   return {
    //     ...raw_data,
    //   };
    // }

    return {
      ammpools,
      pairs,
      raw_data,
    }
  }

  /*
   */
  public async getAmmPoolUserRewards<R>(request: loopring_defs.GetAmmUserRewardsRequest): Promise<{
    raw_data: R
    ammUserRewardMap: loopring_defs.AmmUserRewardMap
  }> {
    const reqParams: loopring_defs.ReqParams = {
      queryParams: request,
      url: LOOPRING_URLs.GET_AMMPOOL_REWARDS,
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
    }

    const raw_data = (await this.makeReq().request(reqParams)).data

    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      }
    }

    const ammUserRewardMap: loopring_defs.AmmUserRewardMap = {}

    if (raw_data?.current) {
      raw_data?.current.forEach((item: loopring_defs.AmmUserReward) => {
        ammUserRewardMap[item.market] = {
          current: item,
          lastDay: undefined,
        }
      })
    }
    if (raw_data?.lastDay) {
      raw_data?.lastDay.forEach((item: loopring_defs.AmmUserReward) => {
        ammUserRewardMap[item.market] = {
          ...ammUserRewardMap[item.market],
          lastDay: item,
        }
      })
    }

    return {
      ammUserRewardMap,
      raw_data,
    }
  }

  /*
   */
  public async getAmmPoolGameRank<R>(request: loopring_defs.GetAmmPoolGameRankRequest): Promise<{
    raw_data: R
    totalRewards: loopring_defs.TokenVolumeV3[]
    userRankList: loopring_defs.GameRankInfo[]
  }> {
    const reqParams: loopring_defs.ReqParams = {
      queryParams: request,
      url: LOOPRING_URLs.GET_AMMPOOL_GAME_RANK,
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
    }

    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    const totalRewards: loopring_defs.TokenVolumeV3[] = raw_data?.totalRewards
      ? raw_data.totalRewards
      : []

    const userRankList: loopring_defs.GameRankInfo[] = raw_data?.userRankList
      ? raw_data.userRankList
      : []

    return {
      totalRewards,
      userRankList,
      raw_data,
    }
  }

  /*
   */
  public async getAmmPoolGameUserRank<R>(
    request: loopring_defs.GetAmmPoolGameUserRankRequest,
    apiKey: string,
  ): Promise<{
    raw_data: R
    userRank: loopring_defs.GameRankInfo
  }> {
    const reqParams: loopring_defs.ReqParams = {
      queryParams: request,
      apiKey,
      url: LOOPRING_URLs.GET_AMMPOOL_GAME_USER_RANK,
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
    }

    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data.resultInfo,
      }
    }
    const userRank: loopring_defs.GameRankInfo = raw_data.data

    return {
      userRank,
      raw_data: raw_data.data,
    }
  }

  private getOrderList(lst: loopring_defs.AmmPoolActivityRule[], order: loopring_defs.SortOrder) {
    return lst.sort(
      (a: loopring_defs.AmmPoolActivityRule, b: loopring_defs.AmmPoolActivityRule) => {
        if (order === loopring_defs.SortOrder.ASC) {
          return a.rangeFrom < b.rangeFrom ? 1 : 0
        }

        return a.rangeFrom > b.rangeFrom ? 1 : 0
      },
    )
  }

  /*
   */
  public async getAmmPoolActivityRules<R>(): Promise<{
    raw_data: R
    activityInProgressRules: loopring_defs.LoopringMap<loopring_defs.AmmPoolInProgressActivityRule>
    activityDateMap: loopring_defs.LoopringMap<{
      AMM_MINING?: loopring_defs.LoopringMap<loopring_defs.AmmPoolActivityRule>
      ORDERBOOK_MINING?: loopring_defs.LoopringMap<loopring_defs.AmmPoolActivityRule>
      SWAP_VOLUME_RANKING?: loopring_defs.LoopringMap<loopring_defs.AmmPoolActivityRule>
    }>
    groupByRuleType: loopring_defs.LoopringMap<loopring_defs.AmmPoolActivityRule[]>
    groupByActivityStatus: loopring_defs.LoopringMap<loopring_defs.AmmPoolActivityRule[]>
    groupByRuleTypeAndStatus: loopring_defs.LoopringMap<
      loopring_defs.LoopringMap<loopring_defs.AmmPoolActivityRule[]>
    >
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_AMM_ACTIVITY_RULES,
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
    }

    const raw_data = (await this.makeReq().request(reqParams)).data

    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      }
    }

    let activityInProgressRules: loopring_defs.LoopringMap<loopring_defs.AmmPoolInProgressActivityRule> =
      {}
    const activityDateMap: loopring_defs.LoopringMap<{
      AMM_MINING?: loopring_defs.LoopringMap<loopring_defs.AmmPoolActivityRule>
      ORDERBOOK_MINING?: loopring_defs.LoopringMap<loopring_defs.AmmPoolActivityRule>
      SWAP_VOLUME_RANKING?: loopring_defs.LoopringMap<loopring_defs.AmmPoolActivityRule>
    }> = {}
    //{AMM_MINING:{},ORDERBOOK_MINING:{},SWAP_VOLUME_RANKING:{}}

    const groupByRuleType: loopring_defs.LoopringMap<loopring_defs.AmmPoolActivityRule[]> = {}

    let groupByRuleTypeAndStatus: loopring_defs.LoopringMap<
      loopring_defs.LoopringMap<loopring_defs.AmmPoolActivityRule[]>
    > = {}

    const groupByActivityStatus: loopring_defs.LoopringMap<loopring_defs.AmmPoolActivityRule[]> = {}

    const currentTs = new Date().getTime()

    if (raw_data instanceof Array) {
      raw_data.forEach((item: loopring_defs.AmmPoolActivityRule) => {
        const status =
          currentTs < item.rangeFrom
            ? loopring_defs.AmmPoolActivityStatus.NotStarted
            : currentTs >= item.rangeFrom && currentTs <= item.rangeTo
            ? loopring_defs.AmmPoolActivityStatus.InProgress
            : loopring_defs.AmmPoolActivityStatus.EndOfGame

        item.status = status
        if (status === loopring_defs.AmmPoolActivityStatus.InProgress) {
          const ruleType = activityInProgressRules[item.market]
            ? [...activityInProgressRules[item.market].ruleType, item.ruleType]
            : [item.ruleType]
          activityInProgressRules = {
            ...activityInProgressRules,
            [item.market]: { ...item, ruleType },
          }
        }
        groupByRuleType[item.ruleType] = [
          ...(groupByRuleType[item.ruleType] ? groupByRuleType[item.ruleType] : []),
          item,
        ]
        groupByActivityStatus[status] = [
          ...(groupByActivityStatus[status] ? groupByActivityStatus[status] : []),
          item,
        ]
        activityDateMap[item.rangeFrom] = {
          ...(activityDateMap[item.rangeFrom] ? activityDateMap[item.rangeFrom] : {}),
          [item.ruleType]: {
            ...(activityDateMap[item.rangeFrom]
              ? activityDateMap[item.rangeFrom][item.ruleType]
                ? activityDateMap[item.rangeFrom][item.ruleType]
                : {}
              : {}),
            [item.market]: item,
          },
        }
        groupByRuleTypeAndStatus = {
          ...groupByRuleTypeAndStatus,
          [item.ruleType]: {
            ...(groupByRuleTypeAndStatus[item.ruleType]
              ? groupByRuleTypeAndStatus[item.ruleType]
              : {}),
            [status]: [
              ...(groupByRuleTypeAndStatus[item.ruleType]
                ? groupByRuleTypeAndStatus[item.ruleType][status]
                  ? groupByRuleTypeAndStatus[item.ruleType][status]
                  : []
                : []),
              item,
            ],
          },
        }
      })
    }

    return {
      activityInProgressRules,
      activityDateMap,
      groupByRuleType,
      groupByActivityStatus,
      groupByRuleTypeAndStatus,
      raw_data,
    }
  }

  /*
   */
  public async getAmmAssetHistory<R>(request: loopring_defs.GetAmmAssetRequest): Promise<{
    raw_data: R
    poolAddress: string
    market: string
    dataSeries: any
  }> {
    const reqParams: loopring_defs.ReqParams = {
      queryParams: request,
      url: LOOPRING_URLs.GET_AMM_ASSET_HISTORY,
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
    }

    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    const poolAddress = raw_data.poolAddress
    const market = raw_data.market
    const dataSeries = raw_data.data

    return {
      poolAddress,
      market,
      dataSeries,
      raw_data,
    }
  }

  /*
   */
  public async getAmmPoolStats<R>(): Promise<{
    raw_data: R
    ammPoolStats: loopring_defs.LoopringMap<loopring_defs.AmmPoolStat>
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_AMM_POOL_STATS,
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
    }

    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data.resultInfo,
      }
    }
    const ammPoolStats: loopring_defs.LoopringMap<loopring_defs.AmmPoolStat> = {}

    if (raw_data instanceof Array) {
      raw_data.forEach((item: loopring_defs.AmmPoolStat) => {
        ammPoolStats[item.market] = item
      })
    }

    return {
      ammPoolStats,
      raw_data,
    }
  }

  /*
   */
  public async getAmmPoolSnapshot<R>(request: loopring_defs.GetAmmPoolSnapshotRequest): Promise<{
    raw_data: R
    ammPoolSnapshot: loopring_defs.AmmPoolSnapshot
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_AMM_POOLS_SNAPSHOT,
      queryParams: request,
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
    }

    const raw_data = (await this.makeReq().request(reqParams)).data

    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    const ammPoolSnapshot: loopring_defs.AmmPoolSnapshot = raw_data

    return {
      ammPoolSnapshot,
      raw_data,
    }
  }

  /*
   */
  public async getAmmPoolBalances<R>(): Promise<{
    raw_data: R
    ammpoolsbalances: loopring_defs.LoopringMap<loopring_defs.AmmPoolBalance>
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_AMM_POOLS_BALANCES,
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
    }

    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    const ammpoolsbalances: loopring_defs.LoopringMap<loopring_defs.AmmPoolBalance> = {}

    if (raw_data instanceof Array) {
      raw_data.forEach((item: any) => {
        const tempPooled: any = {}

        if (item?.pooled instanceof Array) {
          item.pooled.forEach((item2: any) => {
            tempPooled[item2.tokenId] = item2
          })
        }

        item.pooledMap = tempPooled

        let poolName = item.poolName
        if (poolName.indexOf('LRCETH') >= 0) {
          poolName = 'AMM-LRC-ETH'
        }

        ammpoolsbalances[poolName] = item
      })
    }

    return {
      ammpoolsbalances,
      raw_data,
    }
  }

  /*
   */
  public async getLiquidityMining<R>(
    request: loopring_defs.GetLiquidityMiningRequest,
    apiKey: string,
  ): Promise<{
    raw_data: R
    rewards: loopring_defs.RewardItem[]
  }> {
    const reqParams: loopring_defs.ReqParams = {
      queryParams: request,
      apiKey,
      url: LOOPRING_URLs.GET_LIQUIDITY_MINING,
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
    }

    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    return {
      rewards: raw_data?.data ? (raw_data.data as loopring_defs.RewardItem[]) : [],

      raw_data,
    }
  }

  /*
   */
  public async getLiquidityMiningUserHistory<R>(
    request: loopring_defs.GetLiquidityMiningUserHistoryRequest,
  ): Promise<{
    raw_data: R
    userMiningInfos: loopring_defs.UserMiningInfo[]
  }> {
    const reqParams: loopring_defs.ReqParams = {
      queryParams: request,

      url: LOOPRING_URLs.GET_LIQUIDITY_MINING_USER_HISTORY,
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
    }

    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      }
    }

    return {
      userMiningInfos: raw_data.data as loopring_defs.UserMiningInfo[],
      raw_data,
    }
  }

  /*
   */
  public async getUserAmmPoolTxs<R>(
    request: loopring_defs.GetUserAmmPoolTxsRequest,
    apiKey: string,
  ): Promise<{
    raw_data: R
    totalNum: number
    userAmmPoolTxs: loopring_defs.UserAmmPoolTx[]
  }> {
    const reqParams: loopring_defs.ReqParams = {
      queryParams: request,
      apiKey,
      url: LOOPRING_URLs.GET_USER_AMM_POOL_TXS,
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
    }

    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      }
    }

    return {
      totalNum: raw_data.totalNum,
      userAmmPoolTxs: raw_data.transactions as loopring_defs.UserAmmPoolTx[],
      raw_data,
    }
  }

  /*
   */
  public async getAmmPoolTxs<R>(request: loopring_defs.GetAmmPoolTxsRequest): Promise<{
    raw_data: R
    totalNum: number
    transactions: loopring_defs.AmmPoolTx[]
  }> {
    const reqParams: loopring_defs.ReqParams = {
      queryParams: request,
      url: LOOPRING_URLs.GET_AMM_POOL_TXS,
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
    }

    const raw_data = (await this.makeReq().request(reqParams)).data

    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      }
    }

    let transactions = undefined

    if (raw_data?.transactions) {
      transactions = raw_data?.transactions
    }

    return {
      totalNum: raw_data.totalNum,
      transactions: transactions as loopring_defs.AmmPoolTx[],
      raw_data,
    }
  }

  /*
   */
  public async getAmmPoolTrades<R>(request: loopring_defs.GetAmmPoolTradesRequest): Promise<{
    raw_data: R
    totalNum: number
    ammPoolTrades: loopring_defs.AmmPoolTrade[]
  }> {
    const reqParams: loopring_defs.ReqParams = {
      queryParams: request,
      url: LOOPRING_URLs.GET_AMM_POOL_TRADE_TXS,
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
    }

    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    return {
      totalNum: raw_data.totalNum,
      ammPoolTrades: raw_data.transactions as loopring_defs.AmmPoolTrade[],
      raw_data,
    }
  }

  /*
   */
  public async joinAmmPool<R>(
    request: loopring_defs.JoinAmmPoolRequest,
    patch: loopring_defs.AmmPoolRequestPatch,
    apiKey: string,
  ): Promise<{
    raw_data: R
    joinAmmPoolResult: loopring_defs.JoinAmmPoolResult
  }> {
    if (!request?.validUntil) request.validUntil = Date.now()

    const reqParams: loopring_defs.ReqParams = {
      bodyParams: request,
      apiKey,
      url: LOOPRING_URLs.POST_JOIN_AMM_POOL,
      method: loopring_defs.ReqMethod.POST,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
    }

    const { eddsaSig } = sign_tools.get_EddsaSig_JoinAmmPool(request, patch)

    request.eddsaSignature = eddsaSig

    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    return {
      joinAmmPoolResult: raw_data as loopring_defs.JoinAmmPoolResult,
      raw_data,
    }
  }

  /*
   */
  public async exitAmmPool<R>(
    request: loopring_defs.ExitAmmPoolRequest,
    patch: loopring_defs.AmmPoolRequestPatch,
    apiKey: string,
  ): Promise<{
    raw_data: R
    exitAmmPoolResult: loopring_defs.ExitAmmPoolResult
  }> {
    if (!request?.validUntil) request.validUntil = Date.now()

    const reqParams: loopring_defs.ReqParams = {
      bodyParams: request,
      apiKey,
      url: LOOPRING_URLs.POST_EXIT_AMM_POOL,
      method: loopring_defs.ReqMethod.POST,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
    }

    const { eddsaSig } = sign_tools.get_EddsaSig_ExitAmmPool(request, patch)

    request.eddsaSignature = eddsaSig

    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    return {
      exitAmmPoolResult: raw_data as loopring_defs.ExitAmmPoolResult,
      raw_data,
    }
  }
}
