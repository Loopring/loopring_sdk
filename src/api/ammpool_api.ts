import {BaseAPI} from "./base_api";
import {
  AmmPoolActivityRule,
  AmmPoolBalance,
  AmmPoolInfoV3,
  AmmPoolInProgressActivityRule,
  AmmPoolRequestPatch,
  AmmPoolSnapshot,
  AmmPoolStat,
  AmmPoolTrade,
  AmmPoolTx,
  AmmUserReward,
  AmmUserRewardMap,
  ExitAmmPoolRequest,
  ExitAmmPoolResult,
  GameRankInfo,
  GetAmmAssetRequest,
  GetAmmPoolGameRankRequest,
  GetAmmPoolGameUserRankRequest,
  GetAmmPoolSnapshotRequest,
  GetAmmPoolTradesRequest,
  GetAmmPoolTxsRequest,
  GetAmmUserRewardsRequest,
  GetLiquidityMiningRequest,
  GetLiquidityMiningUserHistoryRequest,
  GetUserAmmPoolTxsRequest,
  JoinAmmPoolRequest,
  JoinAmmPoolResult,
  LoopringMap,
  ReqParams,
  RewardItem,
  TokenRelatedInfo,
  TokenVolumeV3,
  UserAmmPoolTx,
  UserMiningInfo,
} from "../defs/loopring_defs";

import {VALID_UNTIL} from "../defs/loopring_constants";

import {AmmPoolActivityStatus, ReqMethod, SIG_FLAG, SortOrder,} from "../defs/loopring_enums";

import {LOOPRING_URLs} from "../defs/url_defs";

import * as sign_tools from "./sign/sign_tools";

export class AmmpoolAPI extends BaseAPI {
  /*
   * Returns the fee rate of users placing orders in specific markets
   */
  public async getAmmPoolConf() {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_AMM_POOLS_CONF,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    const ammpools: LoopringMap<AmmPoolInfoV3> = {};

    const pairs: LoopringMap<TokenRelatedInfo> = {};

    if (raw_data?.pools instanceof Array) {
      raw_data.pools.forEach((item: any) => {
        const market: string = item.market;
        ammpools[market] = item;

        let base = "";
        let quote = "";

        const ind = market.indexOf("-");
        const ind2 = market.lastIndexOf("-");
        base = market.substring(ind + 1, ind2);
        quote = market.substring(ind2 + 1, market.length);

        if (!pairs[base]) {
          pairs[base] = {
            tokenId: item.tokens.pooled[0],
            tokenList: [quote],
          };
        } else {
          pairs[base].tokenList = [...pairs[base].tokenList, quote];
        }

        if (!pairs[quote]) {
          pairs[quote] = {
            tokenId: item.tokens.pooled[1],
            tokenList: [base],
          };
        } else {
          pairs[quote].tokenList = [...pairs[quote].tokenList, base];
        }
      });
    }

    return {
      ammpools,
      pairs,
      raw_data,
    };
  }

  /*
   */
  public async getAmmPoolUserRewards(request: GetAmmUserRewardsRequest) {
    const reqParams: ReqParams = {
      queryParams: request,
      url: LOOPRING_URLs.GET_AMMPOOL_USER_REWARDS,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data: AmmUserReward[] = (await this.makeReq().request(reqParams))
      .data.data;

    const ammUserRewardMap: AmmUserRewardMap = {};

    if (raw_data instanceof Array) {
      raw_data.forEach((item: AmmUserReward) => {
        ammUserRewardMap[item.market] = item;
      });
    }

    return {
      ammUserRewardMap,
      raw_data,
    };
  }

  /*
   */
  public async getAmmPoolGameRank(request: GetAmmPoolGameRankRequest) {
    const reqParams: ReqParams = {
      queryParams: request,
      url: LOOPRING_URLs.GET_AMMPOOL_GAME_RANK,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;

    const totalRewards: TokenVolumeV3[] = raw_data.data?.totalRewards
      ? raw_data.data.totalRewards
      : [];

    const userRankList: GameRankInfo[] = raw_data.data?.userRankList
      ? raw_data.data.userRankList
      : [];

    return {
      totalRewards,
      userRankList,
      raw_data,
    };
  }

  /*
   */
  public async getAmmPoolGameUserRank(
    request: GetAmmPoolGameUserRankRequest,
    apiKey: string
  ) {
    const reqParams: ReqParams = {
      queryParams: request,
      apiKey,
      url: LOOPRING_URLs.GET_AMMPOOL_GAME_USER_RANK,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;

    const userRank: GameRankInfo = raw_data.data;

    return {
      userRank,
      raw_data,
    };
  }

  private getOrderList(lst: AmmPoolActivityRule[], order: SortOrder) {
    return lst.sort((a: AmmPoolActivityRule, b: AmmPoolActivityRule) => {
      if (order === SortOrder.ASC) {
        return a.rangeFrom < b.rangeFrom ? 1 : 0;
      }

      return a.rangeFrom > b.rangeFrom ? 1 : 0;
    });
  }

  /*
   */
  public async getAmmPoolActivityRules() {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_AMM_ACTIVITY_RULES,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;

    let activityInProgressRules: LoopringMap<AmmPoolInProgressActivityRule> = {};
    const activityDateMap: {
      [key: number]: {
        AMM_MINING?: LoopringMap<AmmPoolActivityRule>;
        ORDERBOOK_MINING?: LoopringMap<AmmPoolActivityRule>;
        SWAP_VOLUME_RANKING?: LoopringMap<AmmPoolActivityRule>;
      }
    } = {}
    //{AMM_MINING:{},ORDERBOOK_MINING:{},SWAP_VOLUME_RANKING:{}}

    const groupByRuleType: LoopringMap<AmmPoolActivityRule[]> = {};

    let groupByRuleTypeAndStatus: LoopringMap<LoopringMap<AmmPoolActivityRule[]>> = {};

    const groupByActivityStatus: LoopringMap<AmmPoolActivityRule[]> = {};

    const currentTs = new Date().getTime();

    if (raw_data instanceof Array) {
      raw_data.forEach((item: AmmPoolActivityRule) => {
        const status =
          currentTs < item.rangeFrom
            ? AmmPoolActivityStatus.NotStarted
            : currentTs >= item.rangeFrom && currentTs <= item.rangeTo
              ? AmmPoolActivityStatus.InProgress
              : AmmPoolActivityStatus.EndOfGame;

        item.status = status;
        if (status === AmmPoolActivityStatus.InProgress) {
          const ruleType = activityInProgressRules[item.market] ?
            [...activityInProgressRules[item.market].ruleType, item.ruleType]
            : [item.ruleType]
          activityInProgressRules = {
            ...activityInProgressRules,
            [item.market]: {...item, ruleType}
          };
        }
        groupByRuleType[item.ruleType] = [...(groupByRuleType[item.ruleType]
          ? groupByRuleType[item.ruleType] : []), item];
        groupByActivityStatus[status] = [...(groupByActivityStatus[status]
          ? groupByActivityStatus[status] : []), item];
        activityDateMap[item.rangeFrom] = {
          ...activityDateMap[item.rangeFrom] ? activityDateMap[item.rangeFrom] : {},
          [item.ruleType]: {
            ...(activityDateMap[item.rangeFrom] ?
              (activityDateMap[item.rangeFrom][item.ruleType] ?
                activityDateMap[item.rangeFrom][item.ruleType] : {}) : {}),
            [item.market]: item
          }
        }
        groupByRuleTypeAndStatus = {
          ...groupByRuleTypeAndStatus,
          [item.ruleType]: {
            ...(groupByRuleTypeAndStatus[item.ruleType] ? groupByRuleTypeAndStatus[item.ruleType] : {}),
            [status]: [
              ...(groupByRuleTypeAndStatus[item.ruleType] ?
                (groupByRuleTypeAndStatus[item.ruleType][status] ? groupByRuleTypeAndStatus[item.ruleType][status] : []) : []),
              item
            ]
          }
        };

      });
    }

    return {
      activityInProgressRules,
      activityDateMap,
      groupByRuleType,
      groupByActivityStatus,
      groupByRuleTypeAndStatus,
      raw_data,
    };
  }

  /*
   */
  public async getAmmAssetHistory(request: GetAmmAssetRequest) {
    const reqParams: ReqParams = {
      queryParams: request,
      url: LOOPRING_URLs.GET_AMM_ASSET_HISTORY,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;

    const poolAddress = raw_data.poolAddress;
    const market = raw_data.market;
    const dataSeries = raw_data.data;

    return {
      poolAddress,
      market,
      dataSeries,
      raw_data,
    };
  }

  /*
   */
  public async getAmmPoolStats() {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_AMM_POOL_STATS,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;

    const ammPoolStats: LoopringMap<AmmPoolStat> = {};

    if (raw_data?.data instanceof Array) {
      raw_data.data.forEach((item: AmmPoolStat) => {
        ammPoolStats[item.market] = item;
      });
    }

    return {
      ammPoolStats,
      raw_data,
    };
  }

  /*
   */
  public async getAmmPoolSnapshot(request: GetAmmPoolSnapshotRequest) {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_AMM_POOLS_SNAPSHOT,
      queryParams: request,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;

    let ammPoolSnapshot: AmmPoolSnapshot | undefined = undefined;
    let error: any;

    if (raw_data?.resultInfo) {
      error = raw_data?.resultInfo;
    } else {
      ammPoolSnapshot = raw_data;
    }

    return {
      ammPoolSnapshot,
      error,
      raw_data,
    };
  }

  /*
   */
  public async getAmmPoolBalances() {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_AMM_POOLS_BALANCES,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;

    const ammpoolsbalances: LoopringMap<AmmPoolBalance> = {};

    if (raw_data instanceof Array) {
      raw_data.forEach((item: any) => {
        const tempPooled: any = {};

        if (item?.pooled instanceof Array) {
          item.pooled.forEach((item2: any) => {
            tempPooled[item2.tokenId] = item2;
          });
        }

        item.pooledMap = tempPooled;

        let poolName = item.poolName;
        if (poolName.indexOf("LRCETH") >= 0) {
          poolName = "AMM-LRC-ETH";
        }

        ammpoolsbalances[poolName] = item;
      });
    }

    return {
      ammpoolsbalances,
      raw_data,
    };
  }

  /*
   */
  public async getLiquidityMining(
    request: GetLiquidityMiningRequest,
    apiKey: string
  ) {
    const reqParams: ReqParams = {
      queryParams: request,
      apiKey,
      url: LOOPRING_URLs.GET_LIQUIDITY_MINING,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;

    return {
      rewards: raw_data?.data ? (raw_data.data as RewardItem[]) : [],
      resultInfo: raw_data.resultInfo,
      raw_data,
    };
  }

  /*
   */
  public async getLiquidityMiningUserHistory(
    request: GetLiquidityMiningUserHistoryRequest
  ) {
    const reqParams: ReqParams = {
      queryParams: request,
      url: LOOPRING_URLs.GET_LIQUIDITY_MINING_USER_HISTORY,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;

    return {
      userMiningInfos: raw_data.data as UserMiningInfo[],
      raw_data,
    };
  }

  /*
   */
  public async getUserAmmPoolTxs(
    request: GetUserAmmPoolTxsRequest,
    apiKey: string
  ) {
    const reqParams: ReqParams = {
      queryParams: request,
      apiKey,
      url: LOOPRING_URLs.GET_USER_AMM_POOL_TXS,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;

    return {
      totalNum: raw_data.totalNum,
      userAmmPoolTxs: raw_data.transactions as UserAmmPoolTx[],
      raw_data,
    };
  }

  /*
   */
  public async getAmmPoolTxs(request: GetAmmPoolTxsRequest) {
    const reqParams: ReqParams = {
      queryParams: request,
      url: LOOPRING_URLs.GET_AMM_POOL_TXS,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;

    let transactions = undefined;

    if (raw_data?.data?.transactions) {
      transactions = raw_data?.data?.transactions;
    }

    return {
      totalNum: raw_data.data.totalNum,
      transactions: transactions as AmmPoolTx[],
      raw_data,
    };
  }

  /*
   */
  public async getAmmPoolTrades(request: GetAmmPoolTradesRequest) {
    const reqParams: ReqParams = {
      queryParams: request,
      url: LOOPRING_URLs.GET_AMM_POOL_TRADE_TXS,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;

    return {
      totalNum: raw_data.totalNum,
      ammPoolTrades: raw_data.transactions as AmmPoolTrade[],
      raw_data,
    };
  }

  /*
   */
  public async joinAmmPool(
    request: JoinAmmPoolRequest,
    patch: AmmPoolRequestPatch,
    apiKey: string
  ) {
    if (!request?.validUntil) request.validUntil = VALID_UNTIL;

    const reqParams: ReqParams = {
      bodyParams: request,
      apiKey,
      url: LOOPRING_URLs.POST_JOIN_AMM_POOL,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const {eddsaSig} = sign_tools.get_EddsaSig_JoinAmmPool(request, patch);

    request.eddsaSignature = eddsaSig;

    const raw_data = (await this.makeReq().request(reqParams)).data;

    return {
      joinAmmPoolResult: raw_data as JoinAmmPoolResult,
      raw_data,
    };
  }

  /*
   */
  public async exitAmmPool(
    request: ExitAmmPoolRequest,
    patch: AmmPoolRequestPatch,
    apiKey: string
  ) {
    if (!request?.validUntil) request.validUntil = VALID_UNTIL;

    const reqParams: ReqParams = {
      bodyParams: request,
      apiKey,
      url: LOOPRING_URLs.POST_EXIT_AMM_POOL,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const {eddsaSig} = sign_tools.get_EddsaSig_ExitAmmPool(request, patch);

    request.eddsaSignature = eddsaSig;

    const raw_data = (await this.makeReq().request(reqParams)).data;

    return {
      exitAmmPoolResult: raw_data as ExitAmmPoolResult,
      raw_data,
    };
  }
}
