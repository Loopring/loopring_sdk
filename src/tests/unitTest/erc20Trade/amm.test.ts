import {
  DEFAULT_TIMEOUT,
  LOOPRING_EXPORTED_ACCOUNT,
  LoopringAPI,
  web3,
  TOKEN_INFO,
  signatureKeyPairMock,
} from "../../MockData";
import * as sdk from "../../../index";

describe("AmmpoolAPI test", function () {
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
      // Step 1. getAccount
      const { accInfo } = await LoopringAPI.exchangeAPI.getAccount({
        owner: LOOPRING_EXPORTED_ACCOUNT.address,
      });
      console.log("accInfo:", accInfo);

      // Step 2. eddsaKey
      const eddsaKey = await signatureKeyPairMock(accInfo);
      console.log("eddsaKey:", eddsaKey.sk);

      // Step 3. apiKey
      const { apiKey } = await LoopringAPI.userAPI.getUserApiKey(
        {
          accountId: accInfo.accountId,
        },
        eddsaKey.sk
      );
      console.log("apiKey:", apiKey);

      // Step 4. getAmmPoolGameUserRank
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
      const response = await LoopringAPI.ammpoolAPI.getAmmPoolSnapshot<any>({
        poolAddress: TOKEN_INFO.tokenMap["LP-LRC-ETH"].address,
      });
      console.log(response);
      console.log(response.raw_data.pooled);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getLiquidityMining",
    async () => {
      // Step 1. get account info
      const { accInfo } = await LoopringAPI.exchangeAPI.getAccount({
        owner: LOOPRING_EXPORTED_ACCOUNT.address,
      });
      console.log("accInfo:", accInfo);

      // Step 2. eddsaKey
      const eddsaKey = await signatureKeyPairMock(accInfo);
      console.log("eddsaKey:", eddsaKey.sk);

      // Step 3. get apikey
      const { apiKey } = await LoopringAPI.userAPI.getUserApiKey(
        {
          accountId: accInfo.accountId,
        },
        eddsaKey.sk
      );
      console.log("apiKey:", apiKey);

      const response = await LoopringAPI.ammpoolAPI.getLiquidityMining(
        {
          accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
          market: "LRC-ETH",
          size: 120,
        },
        apiKey
      );
      console.log(response);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getLiquidityMiningUserHistory",
    async () => {
      const response =
        await LoopringAPI.ammpoolAPI.getLiquidityMiningUserHistory({
          accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
          start: 0,
          end: new Date().getTime(),
        });
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
      const response = await LoopringAPI.ammpoolAPI.getAmmPoolSnapshot<any>({
        poolAddress: TOKEN_INFO.tokenMap["LP-LRC-ETH"].address,
      });
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
      const response = await LoopringAPI.ammpoolAPI.getAmmPoolTrades<any>({
        ammPoolAddress: TOKEN_INFO.tokenMap["LP-LRC-ETH"].address,
      });
      console.log(response);
      console.log(response.raw_data.trades[0]);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getAmmPoolTxs",
    async () => {
      const response = await LoopringAPI.ammpoolAPI.getAmmPoolTxs({
        poolAddress: TOKEN_INFO.tokenMap["LP-LRC-ETH"].address,
      });
      console.log(
        "getAmmPoolTxs",
        response.transactions[0]?.lpToken,
        response.transactions[0]?.poolTokens
      );
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getUserAmmPoolTxs",
    async () => {
      // Step 1. getAccount
      const { accInfo } = await LoopringAPI.exchangeAPI.getAccount({
        owner: LOOPRING_EXPORTED_ACCOUNT.address,
      });
      console.log("accInfo:", accInfo);

      // Step 2. eddsaKey
      const eddsaKey = await signatureKeyPairMock(accInfo);
      console.log("eddsaKey:", eddsaKey.sk);

      // Step 3. apiKey
      const { apiKey } = await LoopringAPI.userAPI.getUserApiKey(
        {
          accountId: accInfo.accountId,
        },
        eddsaKey.sk
      );
      console.log("apiKey:", apiKey);

      // Step 4. getUserAmmPoolTxs
      const response = await LoopringAPI.ammpoolAPI.getUserAmmPoolTxs<any>(
        {
          accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
        },
        apiKey
      );
      console.log(response);
      console.log(response.raw_data.transactions[0]);
    },
    DEFAULT_TIMEOUT
  );

  // it(
  //   "joinAmmPool",
  //   async () => {
  //     const { ammpools } = await LoopringAPI.ammpoolAPI.getAmmPoolConf();
  //     const tokenSymbol = "AMM-LRC-ETH";
  //     const ammInfo = ammpools[tokenSymbol];
  //     const { ammPoolSnapshot } =
  //       await LoopringAPI.ammpoolAPI.getAmmPoolSnapshot({
  //         poolAddress: TOKEN_INFO.tokenMap["LP-LRC-ETH"].address,
  //       });
  //     // Step 1. getAccount
  //     const { accInfo } = await LoopringAPI.exchangeAPI.getAccount({
  //       owner: LOOPRING_EXPORTED_ACCOUNT.address,
  //     });
  //     console.log("accInfo:", accInfo);
  //
  //     // Step 2. eddsaKey
  //     const eddsaKey = await signatureKeyPairMock(accInfo);
  //     console.log("eddsaKey:", eddsaKey.sk);
  //
  //     // Step 3. apiKey
  //     const { apiKey } = await LoopringAPI.userAPI.getUserApiKey(
  //       {
  //         accountId: accInfo.accountId,
  //       },
  //       eddsaKey.sk
  //     );
  //     // Step 4. storageId
  //     const storageId = await LoopringAPI.userAPI.getNextStorageId(
  //       {
  //         accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
  //         sellTokenId: TOKEN_INFO.tokenMap["ETH"].tokenId,
  //       },
  //       apiKey
  //     );
  //     const storageId_1 = await LoopringAPI.userAPI.getNextStorageId(
  //       {
  //         accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
  //         sellTokenId: TOKEN_INFO.tokenMap["LRC"].tokenId,
  //       },
  //       apiKey
  //     );
  //
  //     // Step 5. fee
  //     const fee = await LoopringAPI.userAPI.getOffchainFeeAmt(
  //       {
  //         requestType: sdk.OffchainFeeReqType.AMM_JOIN,
  //         accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
  //         tokenSymbol: TOKEN_INFO.tokenMap["ETH"].symbol,
  //       },
  //       apiKey
  //     );
  //     console.log("fee:", fee);
  //
  //     const { tokensMap, idIndex } = await LoopringAPI.exchangeAPI.getTokens();
  //
  //     const { request: res3 } = sdk.makeJoinAmmPoolRequest(
  //       "500",
  //       true,
  //       "0.001",
  //       LOOPRING_EXPORTED_ACCOUNT.address,
  //       fee.fees,
  //       ammPoolSnapshot as sdk.AmmPoolSnapshot,
  //       tokensMap,
  //       idIndex,
  //       storageId_1.offchainId,
  //       storageId.offchainId
  //     );
  //
  //     console.log("res3:", res3);
  //     console.log("res3 pooled:", res3.joinTokens.pooled);
  //
  //     const response = await LoopringAPI.ammpoolAPI.joinAmmPool(
  //       res3,
  //       {
  //         chainId: sdk.ChainId.GOERLI,
  //         ammName: ammInfo.name,
  //         poolAddress: TOKEN_INFO.tokenMap["LP-LRC-ETH"].address,
  //         eddsaKey: eddsaKey.sk,
  //       },
  //       apiKey
  //     );
  //     console.log(response);
  //   },
  //   DEFAULT_TIMEOUT
  // );

  // it(
  //   "exitAmmPool",
  //   async () => {
  //     const { ammPoolSnapshot } =
  //       await LoopringAPI.ammpoolAPI.getAmmPoolSnapshot({
  //         poolAddress: TOKEN_INFO.tokenMap["LP-LRC-ETH"].address,
  //       });
  //     // Step 1. getAccount
  //     const { accInfo } = await LoopringAPI.exchangeAPI.getAccount({
  //       owner: LOOPRING_EXPORTED_ACCOUNT.address,
  //     });
  //     console.log("accInfo:", accInfo);
  //
  //     // Step 2. eddsaKey
  //     const eddsaKey = await signatureKeyPairMock(accInfo);
  //     console.log("eddsaKey:", eddsaKey.sk);
  //
  //     // Step 3. apiKey
  //     const { apiKey } = await LoopringAPI.userAPI.getUserApiKey(
  //       {
  //         accountId: accInfo.accountId,
  //       },
  //       eddsaKey.sk
  //     );
  //     // Step 4. fees
  //     const { fees } = await LoopringAPI.userAPI.getOffchainFeeAmt(
  //       {
  //         tokenSymbol: "LP-LRC-ETH",
  //         requestType: sdk.OffchainFeeReqType.AMM_EXIT,
  //         accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
  //       },
  //       apiKey
  //     );
  //
  //     const storageId = await LoopringAPI.userAPI.getNextStorageId(
  //       {
  //         accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
  //         sellTokenId: TOKEN_INFO.tokenMap["LP-LRC-ETH"].tokenId,
  //       },
  //       apiKey
  //     );
  //
  //     const { tokensMap, idIndex } = await LoopringAPI.exchangeAPI.getTokens();
  //
  //     const { request: req3 } = sdk.makeExitAmmPoolRequest2(
  //       "10",
  //       "0.001",
  //       LOOPRING_EXPORTED_ACCOUNT.address,
  //       fees,
  //       ammPoolSnapshot as sdk.AmmPoolSnapshot,
  //       tokensMap,
  //       idIndex,
  //       storageId.offchainId
  //     );
  //     console.log("res3 unPooled:", req3.exitTokens.unPooled);
  //
  //     const response = await LoopringAPI.ammpoolAPI.exitAmmPool(
  //       req3,
  //       {
  //         chainId: sdk.ChainId.GOERLI,
  //         ammName: "LRCETH-Pool",
  //         poolAddress: TOKEN_INFO.tokenMap["LP-LRC-ETH"].address,
  //         eddsaKey: eddsaKey.sk,
  //       },
  //       apiKey
  //     );
  //     console.log(response);
  //   },
  //   DEFAULT_TIMEOUT
  // );
});
