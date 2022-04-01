/* eslint-disable camelcase  */
import { BaseAPI } from "./base_api";
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
} from "../defs";

import { AmmPoolActivityStatus, ReqMethod, SIG_FLAG, SortOrder } from "../defs";

import { LOOPRING_URLs } from "../defs";

import * as sign_tools from "./sign/sign_tools";

export class AmmpoolAPI extends BaseAPI {
  /*
   * Returns the fee rate of users placing orders in specific markets
   */
  public async getAmmPoolConf<R>(): Promise<{
    raw_data: R;
    ammpools: LoopringMap<AmmPoolInfoV3>;
    pairs: LoopringMap<TokenRelatedInfo>;
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_AMM_POOLS_CONF,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    const ammpools: LoopringMap<AmmPoolInfoV3> = {};

    const pairs: LoopringMap<TokenRelatedInfo> = {};

    if (raw_data?.pools instanceof Array) {
      raw_data.pools.forEach((item: any) => {
        const market: string = item.market;
        ammpools[market] = item;
        let base = "",
          quote = "";
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
    // if (raw_data.code) {
    //   return {
    //     ...raw_data,
    //   };
    // }

    return {
      ammpools,
      pairs,
      raw_data,
    };
  }

  /*
   */
  public async getAmmPoolUserRewards<R>(
    request: GetAmmUserRewardsRequest
  ): Promise<{
    raw_data: R;
    ammUserRewardMap: AmmUserRewardMap;
  }> {
    const reqParams: ReqParams = {
      queryParams: request,
      url: LOOPRING_URLs.GET_AMMPOOL_USER_REWARDS,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;

    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }

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
  public async getAmmPoolGameRank<R>(
    request: GetAmmPoolGameRankRequest
  ): Promise<{
    raw_data: R;
    totalRewards: TokenVolumeV3[];
    userRankList: GameRankInfo[];
  }> {
    const reqParams: ReqParams = {
      queryParams: request,
      url: LOOPRING_URLs.GET_AMMPOOL_GAME_RANK,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    const totalRewards: TokenVolumeV3[] = raw_data?.totalRewards
      ? raw_data.totalRewards
      : [];

    const userRankList: GameRankInfo[] = raw_data?.userRankList
      ? raw_data.userRankList
      : [];

    return {
      totalRewards,
      userRankList,
      raw_data,
    };
  }

  /*
   */
  public async getAmmPoolGameUserRank<R>(
    request: GetAmmPoolGameUserRankRequest,
    apiKey: string
  ): Promise<{
    raw_data: R;
    userRank: GameRankInfo;
  }> {
    const reqParams: ReqParams = {
      queryParams: request,
      apiKey,
      url: LOOPRING_URLs.GET_AMMPOOL_GAME_USER_RANK,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data.resultInfo,
      };
    }
    const userRank: GameRankInfo = raw_data.data;

    return {
      userRank,
      raw_data: raw_data.data,
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
  public async getAmmPoolActivityRules<R>(): Promise<{
    raw_data: R;
    activityInProgressRules: LoopringMap<AmmPoolInProgressActivityRule>;
    activityDateMap: LoopringMap<{
      AMM_MINING?: LoopringMap<AmmPoolActivityRule>;
      ORDERBOOK_MINING?: LoopringMap<AmmPoolActivityRule>;
      SWAP_VOLUME_RANKING?: LoopringMap<AmmPoolActivityRule>;
    }>;
    groupByRuleType: LoopringMap<AmmPoolActivityRule[]>;
    groupByActivityStatus: LoopringMap<AmmPoolActivityRule[]>;
    groupByRuleTypeAndStatus: LoopringMap<LoopringMap<AmmPoolActivityRule[]>>;
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_AMM_ACTIVITY_RULES,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;

    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }

    let activityInProgressRules: LoopringMap<AmmPoolInProgressActivityRule> =
      {};
    const activityDateMap: LoopringMap<{
      AMM_MINING?: LoopringMap<AmmPoolActivityRule>;
      ORDERBOOK_MINING?: LoopringMap<AmmPoolActivityRule>;
      SWAP_VOLUME_RANKING?: LoopringMap<AmmPoolActivityRule>;
    }> = {};
    //{AMM_MINING:{},ORDERBOOK_MINING:{},SWAP_VOLUME_RANKING:{}}

    const groupByRuleType: LoopringMap<AmmPoolActivityRule[]> = {};

    let groupByRuleTypeAndStatus: LoopringMap<
      LoopringMap<AmmPoolActivityRule[]>
    > = {};

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
          const ruleType = activityInProgressRules[item.market]
            ? [...activityInProgressRules[item.market].ruleType, item.ruleType]
            : [item.ruleType];
          activityInProgressRules = {
            ...activityInProgressRules,
            [item.market]: { ...item, ruleType },
          };
        }
        groupByRuleType[item.ruleType] = [
          ...(groupByRuleType[item.ruleType]
            ? groupByRuleType[item.ruleType]
            : []),
          item,
        ];
        groupByActivityStatus[status] = [
          ...(groupByActivityStatus[status]
            ? groupByActivityStatus[status]
            : []),
          item,
        ];
        activityDateMap[item.rangeFrom] = {
          ...(activityDateMap[item.rangeFrom]
            ? activityDateMap[item.rangeFrom]
            : {}),
          [item.ruleType]: {
            ...(activityDateMap[item.rangeFrom]
              ? activityDateMap[item.rangeFrom][item.ruleType]
                ? activityDateMap[item.rangeFrom][item.ruleType]
                : {}
              : {}),
            [item.market]: item,
          },
        };
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
  public async getAmmAssetHistory<R>(request: GetAmmAssetRequest): Promise<{
    raw_data: R;
    poolAddress: string;
    market: string;
    dataSeries: any;
  }> {
    const reqParams: ReqParams = {
      queryParams: request,
      url: LOOPRING_URLs.GET_AMM_ASSET_HISTORY,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }
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
  public async getAmmPoolStats<R>(): Promise<{
    raw_data: R;
    ammPoolStats: LoopringMap<AmmPoolStat>;
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_AMM_POOL_STATS,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data.resultInfo,
      };
    }
    const ammPoolStats: LoopringMap<AmmPoolStat> = {};

    if (raw_data.data instanceof Array) {
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
  public async getAmmPoolSnapshot<R>(
    request: GetAmmPoolSnapshotRequest
  ): Promise<{
    raw_data: R;
    ammPoolSnapshot: AmmPoolSnapshot;
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_AMM_POOLS_SNAPSHOT,
      queryParams: request,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;

    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    const ammPoolSnapshot: AmmPoolSnapshot = raw_data;

    return {
      ammPoolSnapshot,
      raw_data,
    };
  }

  /*
   */
  public async getAmmPoolBalances<R>(): Promise<{
    raw_data: R;
    ammpoolsbalances: LoopringMap<AmmPoolBalance>;
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_AMM_POOLS_BALANCES,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }
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
  public async getLiquidityMining<R>(
    request: GetLiquidityMiningRequest,
    apiKey: string
  ): Promise<{
    raw_data: R;
    rewards: RewardItem[];
  }> {
    const reqParams: ReqParams = {
      queryParams: request,
      apiKey,
      url: LOOPRING_URLs.GET_LIQUIDITY_MINING,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    return {
      rewards: raw_data?.data ? (raw_data.data as RewardItem[]) : [],

      raw_data,
    };
  }

  /*
   */
  public async getLiquidityMiningUserHistory<R>(
    request: GetLiquidityMiningUserHistoryRequest
  ): Promise<{
    raw_data: R;
    userMiningInfos: UserMiningInfo[];
  }> {
    const reqParams: ReqParams = {
      queryParams: request,

      url: LOOPRING_URLs.GET_LIQUIDITY_MINING_USER_HISTORY,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      };
    }

    return {
      userMiningInfos: raw_data.data as UserMiningInfo[],
      raw_data,
    };
  }

  /*
   */
  public async getUserAmmPoolTxs<R>(
    request: GetUserAmmPoolTxsRequest,
    apiKey: string
  ): Promise<{
    raw_data: R;
    totalNum: number;
    userAmmPoolTxs: UserAmmPoolTx[];
  }> {
    const reqParams: ReqParams = {
      queryParams: request,
      apiKey,
      url: LOOPRING_URLs.GET_USER_AMM_POOL_TXS,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }

    return {
      totalNum: raw_data.totalNum,
      userAmmPoolTxs: raw_data.transactions as UserAmmPoolTx[],
      raw_data,
    };
  }

  /*
   */
  public async getAmmPoolTxs<R>(request: GetAmmPoolTxsRequest): Promise<{
    raw_data: R;
    totalNum: number;
    transactions: AmmPoolTx[];
  }> {
    const reqParams: ReqParams = {
      queryParams: request,
      url: LOOPRING_URLs.GET_AMM_POOL_TXS,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;

    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      };
    }

    let transactions = undefined;

    if (raw_data?.transactions) {
      transactions = raw_data?.transactions;
    }

    return {
      totalNum: raw_data.totalNum,
      transactions: transactions as AmmPoolTx[],
      raw_data,
    };
  }

  /*
   */
  public async getAmmPoolTrades<R>(request: GetAmmPoolTradesRequest): Promise<{
    raw_data: R;
    totalNum: number;
    ammPoolTrades: AmmPoolTrade[];
  }> {
    const reqParams: ReqParams = {
      queryParams: request,
      url: LOOPRING_URLs.GET_AMM_POOL_TRADE_TXS,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    return {
      totalNum: raw_data.totalNum,
      ammPoolTrades: raw_data.transactions as AmmPoolTrade[],
      raw_data,
    };
  }

  /*
   */
  public async joinAmmPool<R>(
    request: JoinAmmPoolRequest,
    patch: AmmPoolRequestPatch,
    apiKey: string
  ): Promise<{
    raw_data: R;
    joinAmmPoolResult: JoinAmmPoolResult;
  }> {
    if (!request?.validUntil) request.validUntil = Date.now();

    const reqParams: ReqParams = {
      bodyParams: request,
      apiKey,
      url: LOOPRING_URLs.POST_JOIN_AMM_POOL,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const { eddsaSig } = sign_tools.get_EddsaSig_JoinAmmPool(request, patch);

    request.eddsaSignature = eddsaSig;

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    return {
      joinAmmPoolResult: raw_data as JoinAmmPoolResult,
      raw_data,
    };
  }

  /*
   */
  public async exitAmmPool<R>(
    request: ExitAmmPoolRequest,
    patch: AmmPoolRequestPatch,
    apiKey: string
  ): Promise<{
    raw_data: R;
    exitAmmPoolResult: ExitAmmPoolResult;
  }> {
    if (!request?.validUntil) request.validUntil = Date.now();

    const reqParams: ReqParams = {
      bodyParams: request,
      apiKey,
      url: LOOPRING_URLs.POST_EXIT_AMM_POOL,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const { eddsaSig } = sign_tools.get_EddsaSig_ExitAmmPool(request, patch);

    request.eddsaSignature = eddsaSig;

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    return {
      exitAmmPoolResult: raw_data as ExitAmmPoolResult,
      raw_data,
    };
  }
}
