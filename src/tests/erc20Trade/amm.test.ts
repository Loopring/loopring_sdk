import { ChainId, ConnectorNames } from "../../defs/web3_defs";

import {
  GetNextStorageIdRequest,
  GetAmmPoolSnapshotRequest,
  GetAmmPoolTradesRequest,
  GetUserAmmPoolTxsRequest,
  AmmPoolRequestPatch,
  GetAmmPoolTxsRequest,
  OffchainFeeReqType,
  AmmPoolSnapshot,
  GetLiquidityMiningRequest,
  GetLiquidityMiningUserHistoryRequest,
  GetUserApiKeyRequest,
} from "../../defs";

import {
  DEFAULT_TIMEOUT,
  LOOPRING_EXPORTED_ACCOUNT,
  LoopringAPI,
  TOKEN_INFO,
  web3,
} from "../data";
import { dumpError400 } from "../../utils/network_tools";
import { makeExitAmmPoolRequest2, makeJoinAmmPoolRequest } from "../../utils";
import * as sign_tools from "../../api/sign/sign_tools";
import { BaseAPI } from "../../api/base_api";
//
// const testAddress = "0xd4bd7c71b6d4a09217ccc713f740d6ed8f4ea0cd";
//
let apiKey: string;
let eddsaKey: string;
describe("AmmpoolAPI test", function () {
  beforeEach(async () => {
    LoopringAPI.InitApi(ChainId.GOERLI);
    const { accInfo } = await LoopringAPI.exchangeAPI.getAccount({
      owner: LOOPRING_EXPORTED_ACCOUNT.address,
    });

    const _eddsaKey = await sign_tools.generateKeyPair({
      web3,
      address: accInfo.owner,
      keySeed: BaseAPI.KEY_MESSAGE.replace(
        "${exchangeAddress}",
        LOOPRING_EXPORTED_ACCOUNT.exchangeAddr
      ).replace("${nonce}", (accInfo.nonce - 1).toString()),
      walletType: ConnectorNames.MetaMask,
      chainId: ChainId.GOERLI,
    });
    eddsaKey = _eddsaKey.sk;

    const request: GetUserApiKeyRequest = {
      accountId: accInfo.accountId,
    };

    apiKey = (await LoopringAPI.userAPI.getUserApiKey(request, eddsaKey))
      .apiKey;
  });

  it(
    "getAmmPoolConf",
    async () => {
      const response = await LoopringAPI.ammpoolAPI.getAmmPoolConf();
      console.log(response.ammpools);
      console.log(response.pairs);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getAmmPoolUserRewards",
    async () => {
      const response = await LoopringAPI.ammpoolAPI.getAmmPoolUserRewards<
        any[]
      >({
        owner: LOOPRING_EXPORTED_ACCOUNT.accountId,
      });
      console.log("getAmmPoolUserRewards:", response);
      console.log(
        "getAmmPoolUserRewards feeRewards:",
        response.ammUserRewardMap
      );
      console.log(
        "getAmmPoolUserRewards feeRewards,extraRewards,currentRewards:",
        response.raw_data[0].feeRewards,
        response.raw_data[0].extraRewards,
        response.raw_data[0].currentRewards
      );
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getAmmPoolUserRewards-LRC-ETH",
    async () => {
      const response = await LoopringAPI.ammpoolAPI.getAmmPoolUserRewards<
        any[]
      >({
        owner: LOOPRING_EXPORTED_ACCOUNT.accountId,
        ammPoolMarkets: "AMM-LRC-ETH",
      });
      console.log("getAmmPoolUserRewards:", response);
      console.log(
        "getAmmPoolUserRewards feeRewards:",
        response.ammUserRewardMap
      );
      console.log(
        "getAmmPoolUserRewards feeRewards,extraRewards,currentRewards:",
        response.raw_data[0].feeRewards,
        response.raw_data[0].extraRewards,
        response.raw_data[0].currentRewards
      );
    },
    DEFAULT_TIMEOUT
  );

  it(
    'getAmmPoolUserRewards-LRC-ETH_ETH-USDT"',
    async () => {
      const response = await LoopringAPI.ammpoolAPI.getAmmPoolUserRewards<
        any[]
      >({
        owner: LOOPRING_EXPORTED_ACCOUNT.accountId,
        ammPoolMarkets: "AMM-LRC-ETH,AMM-ETH-USDT",
      });
      console.log("getAmmPoolUserRewards:", response);
      console.log(
        "getAmmPoolUserRewards feeRewards:",
        response.ammUserRewardMap
      );
      console.log(
        "getAmmPoolUserRewards feeRewards,extraRewards,currentRewards:",
        response.raw_data[0].feeRewards,
        response.raw_data[0].extraRewards,
        response.raw_data[0].currentRewards
      );
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getAmmPoolGameRank",
    async () => {
      const response: any = await LoopringAPI.ammpoolAPI.getAmmPoolGameRank({
        ammPoolMarket: "UNI-ETH",
      });
      console.log("getAmmPoolGameRank:", response.raw_data);
      console.log("totalRewards:", response.totalRewards);
      console.log("userRankList 1:", response.userRankList[0]);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getAmmAssetHistory",
    async () => {
      const response = await LoopringAPI.ammpoolAPI.getAmmAssetHistory({
        poolAddress: TOKEN_INFO.tokenMap["LP-LRC-ETH"].address,
      });
      console.log("getAmmAssetHistory dataSeries:", response);
      // console.log('getAmmAssetHistory:', response.raw_data.data[0].tokens)
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getAmmPoolGameUserRank",
    async () => {
      const response = await LoopringAPI.ammpoolAPI.getAmmPoolGameUserRank(
        { owner: LOOPRING_EXPORTED_ACCOUNT.address, ammPoolMarket: "LRC-ETH" },
        apiKey
      );
      console.log("getAmmPoolGameUserRank:", response.raw_data);
      console.log("userRank:", response.userRank);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getAmmPoolActivityRules",
    async () => {
      const {
        activityInProgressRules,
        activityDateMap,
        groupByRuleType,
        groupByActivityStatus,
        groupByRuleTypeAndStatus,
        raw_data,
      } = await LoopringAPI.ammpoolAPI.getAmmPoolActivityRules();
      console.log("activityInProgressRules", activityInProgressRules);
      console.log("activityDateMap", activityDateMap);
      console.log("groupByRuleType", groupByRuleType);
      console.log("groupByActivityStatus", groupByActivityStatus);
      console.log(
        "groupByRuleTypeAndStatus",
        groupByRuleTypeAndStatus,
        JSON.stringify(groupByRuleTypeAndStatus)
      );
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getAmmPoolStats",
    async () => {
      const response = await LoopringAPI.ammpoolAPI.getAmmPoolStats();
      console.log("ammPoolStats:", response.ammPoolStats);
      console.log("rewards:", response.ammPoolStats["AMM-BCDT-ETH"]?.rewards);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getAmmPoolSnapshot",
    async () => {
      const request: GetAmmPoolSnapshotRequest = {
        poolAddress: TOKEN_INFO.tokenMap["LP-LRC-ETH"].address,
      };
      const response = await LoopringAPI.ammpoolAPI.getAmmPoolSnapshot<any>(
        request
      );
      console.log(response);
      console.log(response.raw_data.pooled);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getLiquidityMining",
    async () => {
      const request: GetLiquidityMiningRequest = {
        accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
        market: "LRC-ETH",
        size: 120,
      };
      const response = await LoopringAPI.ammpoolAPI.getLiquidityMining(
        request,
        apiKey
      );
      console.log(response);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getLiquidityMiningUserHistory",
    async () => {
      const request: GetLiquidityMiningUserHistoryRequest = {
        accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
        start: 0,
        end: new Date().getTime(),
      };
      const response =
        await LoopringAPI.ammpoolAPI.getLiquidityMiningUserHistory(request);
      console.log(response);
    },
    DEFAULT_TIMEOUT
  );

  // it(
  //   "getLiquidityMiningUserHistory_No_data",
  //   async () => {
  //     const request: GetLiquidityMiningUserHistoryRequest = {
  //       accountId: 10084,
  //       start: 0,
  //       end: new Date().getTime(),
  //     };
  //     const response =
  //       await LoopringAPI.ammpoolAPI.getLiquidityMiningUserHistory(request);
  //     console.log(response);
  //   },
  //   DEFAULT_TIMEOUT
  // );

  it(
    "getAmmPoolSnapshot",
    async () => {
      const request: GetAmmPoolSnapshotRequest = {
        poolAddress: TOKEN_INFO.tokenMap["LP-LRC-ETH"].address,
      };
      const response = await LoopringAPI.ammpoolAPI.getAmmPoolSnapshot<any>(
        request
      );
      console.log(response);
      console.log(response.raw_data.pooled);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getAmmPoolBalances",
    async () => {
      const response = await LoopringAPI.ammpoolAPI.getAmmPoolBalances();
      console.log(response.ammpoolsbalances);
      console.log(response.ammpoolsbalances["AMM-LRC-ETH"].poolAddress);
      console.log(response.ammpoolsbalances["AMM-LRC-ETH"].pooled);
      console.log(response.ammpoolsbalances["AMM-LRC-ETH"].lp);
      console.log(response.ammpoolsbalances["AMM-LRC-ETH"].pooledMap);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getAmmPoolTrades",
    async () => {
      const request: GetAmmPoolTradesRequest = {
        ammPoolAddress: TOKEN_INFO.tokenMap["LP-LRC-ETH"].address,
      };
      const response = await LoopringAPI.ammpoolAPI.getAmmPoolTrades<any>(
        request
      );
      console.log(response);
      console.log(response.raw_data.trades[0]);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getAmmPoolTxs",
    async () => {
      try {
        const request: GetAmmPoolTxsRequest = {
          poolAddress: TOKEN_INFO.tokenMap["LP-LRC-ETH"].address,
        };
        const response = await LoopringAPI.ammpoolAPI.getAmmPoolTxs(request);
        console.log(response);
        console.log(response.transactions[0].lpToken);
        console.log(response.transactions[0].poolTokens);
      } catch (reason) {
        dumpError400(reason);
      }
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getUserAmmPoolTxs",
    async () => {
      try {
        const request: GetUserAmmPoolTxsRequest = {
          accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
        };
        const response = await LoopringAPI.ammpoolAPI.getUserAmmPoolTxs<any>(
          request,
          apiKey
        );
        console.log(response);
        console.log(response.raw_data.transactions[0]);
      } catch (reason) {
        dumpError400(reason);
      }
    },
    DEFAULT_TIMEOUT
  );

  it(
    "joinAmmPool",
    async () => {
      try {
        const { ammpools } = await LoopringAPI.ammpoolAPI.getAmmPoolConf();

        const tokenSymbol = "AMM-LRC-ETH";

        const ammInfo = ammpools[tokenSymbol];

        const request1: GetAmmPoolSnapshotRequest = {
          poolAddress: TOKEN_INFO.tokenMap["LP-LRC-ETH"].address,
        };
        const { ammPoolSnapshot } =
          await LoopringAPI.ammpoolAPI.getAmmPoolSnapshot(request1);

        const request: GetNextStorageIdRequest = {
          accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
          sellTokenId: 0,
        };
        const storageId = await LoopringAPI.userAPI.getNextStorageId(
          request,
          apiKey
        );

        const request_1: GetNextStorageIdRequest = {
          accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
          sellTokenId: 1,
        };
        const storageId_1 = await LoopringAPI.userAPI.getNextStorageId(
          request_1,
          apiKey
        );

        console.log("getOffchainFeeAmt 1");

        const { fees } = await LoopringAPI.userAPI.getOffchainFeeAmt(
          {
            tokenSymbol: "ETH",
            requestType: OffchainFeeReqType.AMM_JOIN,
            accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
          },
          apiKey
        );

        const fee = fees["ETH"];
        console.log("getOffchainFeeAmt 2", fee);

        const { tokenSymbolMap, tokenIdIndex } =
          await LoopringAPI.exchangeAPI.getTokens();

        const { request: res3 } = makeJoinAmmPoolRequest(
          "500",
          true,
          "0.001",
          LOOPRING_EXPORTED_ACCOUNT.address,
          fees,
          ammPoolSnapshot as AmmPoolSnapshot,
          tokenSymbolMap,
          tokenIdIndex,
          storageId_1.offchainId,
          storageId.offchainId
        );

        const patch: AmmPoolRequestPatch = {
          chainId: ChainId.GOERLI,
          ammName: ammInfo.name,
          poolAddress: TOKEN_INFO.tokenMap["LP-LRC-ETH"].address,
          eddsaKey,
        };

        console.log("res3:", res3);
        console.log("res3 pooled:", res3.joinTokens.pooled);

        const response = await LoopringAPI.ammpoolAPI.joinAmmPool(
          res3,
          patch,
          apiKey
        );
        console.log(response);
      } catch (reason) {
        dumpError400(reason);
      }
    },
    DEFAULT_TIMEOUT
  );

  // it(
  //   "exitAmmPool1",
  //   async () => {
  //     try {
  //       const request1: GetAmmPoolSnapshotRequest = {
  //         poolAddress: TOKEN_INFO.tokenMap["LP-LRC-ETH"].address,
  //       };
  //       const { ammPoolSnapshot } =
  //         await LoopringAPI.ammpoolAPI.getAmmPoolSnapshot(request1);
  //
  //       const { fees } = await LoopringAPI.userAPI.getOffchainFeeAmt(
  //         {
  //           tokenSymbol: "LP-LRC-ETH",
  //           requestType: OffchainFeeReqType.AMM_EXIT,
  //           accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
  //         },
  //         apiKey
  //       );
  //
  //       const request: GetNextStorageIdRequest = {
  //         accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
  //         sellTokenId: 4,
  //       };
  //       const storageId = await LoopringAPI.userAPI.getNextStorageId(
  //         request,
  //         apiKey
  //       );
  //
  //       const { tokenSymbolMap, tokenIdIndex } =
  //         await LoopringAPI.exchangeAPI.getTokens();
  //
  //       const { request: req3 } = makeExitAmmPoolRequest(
  //         "200",
  //         true,
  //         "0.001",
  //         LOOPRING_EXPORTED_ACCOUNT.address,
  //         fees,
  //         ammPoolSnapshot as AmmPoolSnapshot,
  //         tokenSymbolMap,
  //         tokenIdIndex,
  //         storageId.offchainId
  //       );
  //
  //       const patch: AmmPoolRequestPatch = {
  //         chainId: ChainId.GOERLI,
  //         ammName: "LRCETH-Pool",
  //         poolAddress: TOKEN_INFO.tokenMap["LP-LRC-ETH"].address,
  //
  //         eddsaKey
  //       };
  //
  //       console.log("req3:", req3);
  //       console.log("res3 unPooled:", req3.exitTokens.unPooled);
  //
  //       const response = await LoopringAPI.ammpoolAPI.exitAmmPool(
  //         req3,
  //         patch,
  //         apiKey
  //       );
  //       console.log(response);
  //     } catch (reason) {
  //       dumpError400(reason);
  //     }
  //   },
  //   DEFAULT_TIMEOUT
  // );

  it(
    "exitAmmPool",
    async () => {
      try {
        const request1: GetAmmPoolSnapshotRequest = {
          poolAddress: TOKEN_INFO.tokenMap["LP-LRC-ETH"].address,
        };
        const { ammPoolSnapshot } =
          await LoopringAPI.ammpoolAPI.getAmmPoolSnapshot(request1);

        const { fees } = await LoopringAPI.userAPI.getOffchainFeeAmt(
          {
            tokenSymbol: "LP-LRC-ETH",
            requestType: OffchainFeeReqType.AMM_EXIT,
            accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
          },
          apiKey
        );

        const request: GetNextStorageIdRequest = {
          accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
          sellTokenId: 4,
        };
        const storageId = await LoopringAPI.userAPI.getNextStorageId(
          request,
          apiKey
        );

        const { tokenSymbolMap, tokenIdIndex } =
          await LoopringAPI.exchangeAPI.getTokens();

        const { request: req3 } = makeExitAmmPoolRequest2(
          "10",
          "0.001",
          LOOPRING_EXPORTED_ACCOUNT.address,
          fees,
          ammPoolSnapshot as AmmPoolSnapshot,
          tokenSymbolMap,
          tokenIdIndex,
          storageId.offchainId
        );

        const patch: AmmPoolRequestPatch = {
          chainId: ChainId.GOERLI,
          ammName: "LRCETH-Pool",
          poolAddress: TOKEN_INFO.tokenMap["LP-LRC-ETH"].address,
          eddsaKey,
        };

        console.log("req3:", req3);
        console.log("res3 unPooled:", req3.exitTokens.unPooled);

        const response = await LoopringAPI.ammpoolAPI.exitAmmPool(
          req3,
          patch,
          apiKey
        );
        console.log(response);
      } catch (reason) {
        dumpError400(reason);
      }
    },
    DEFAULT_TIMEOUT
  );
});
