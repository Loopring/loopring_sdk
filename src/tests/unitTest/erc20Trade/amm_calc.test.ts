import {
  DEFAULT_TIMEOUT,
  LOOPRING_EXPORTED_ACCOUNT,
  LoopringAPI,
  web3,
  TOKEN_INFO,
  signatureKeyPairMock,
} from "../../MockData";
import * as sdk from "../../../index";

describe("amm_calc", function () {
  it(
    "amm_calc_test",
    async () => {
      const response = await LoopringAPI.ammpoolAPI.getAmmPoolSnapshot<any>({
        poolAddress: TOKEN_INFO.tokenMap["LP-LRC-ETH"].address,
      });
      console.log(response.raw_data.pooled);

      const covertVal = sdk.toBig("1e+20").toFixed(0, 0);

      const coinA_TV = response.ammPoolSnapshot?.pooled[0];
      const coinB_TV = response.ammPoolSnapshot?.pooled[1];

      const output = sdk.ammPoolCalc(
        covertVal,
        true,
        coinA_TV as sdk.TokenVolumeV3,
        coinB_TV as sdk.TokenVolumeV3
      );

      console.log(
        "covertVal:",
        covertVal,
        "output:",
        output,
        "ratio:",
        output.ratio.toString()
      );
    },
    DEFAULT_TIMEOUT
  );

  it(
    "make_join_request",
    async () => {
      const response = await LoopringAPI.ammpoolAPI.getAmmPoolSnapshot<any>({
        poolAddress: TOKEN_INFO.tokenMap["LP-LRC-ETH"].address,
      });
      console.log(response.raw_data.pooled);
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
      // Step 4. fees
      const { fees } = await LoopringAPI.userAPI.getOffchainFeeAmt(
        {
          accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
          requestType: sdk.OffchainFeeReqType.AMM_JOIN,
          tokenSymbol: "ETH",
        },
        apiKey
      );

      console.log("---fees:", fees);

      const { tokensMap, idIndex } = await LoopringAPI.exchangeAPI.getTokens();

      const { request: res } = sdk.makeJoinAmmPoolRequest(
        "100",
        true,
        "0.001",
        LOOPRING_EXPORTED_ACCOUNT.address,
        fees,
        response.ammPoolSnapshot as sdk.AmmPoolSnapshot,
        tokensMap,
        idIndex,
        0,
        0
      );

      console.log("res:", res);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "make_exit_request",
    async () => {
      const response = await LoopringAPI.ammpoolAPI.getAmmPoolSnapshot<any>({
        poolAddress: TOKEN_INFO.tokenMap["LP-LRC-ETH"].address,
      });
      console.log(response.raw_data.pooled);
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
      // Step 4. fees
      const { fees } = await LoopringAPI.userAPI.getOffchainFeeAmt(
        {
          accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
          requestType: sdk.OffchainFeeReqType.AMM_JOIN,
          tokenSymbol: "ETH",
        },
        apiKey
      );

      console.log("---fees:", fees);

      const { tokensMap, idIndex } = await LoopringAPI.exchangeAPI.getTokens();

      const { request: res } = sdk.makeExitAmmPoolRequest2(
        "100",
        "0.001",
        LOOPRING_EXPORTED_ACCOUNT.address,
        fees,
        response.ammPoolSnapshot as sdk.AmmPoolSnapshot,
        tokensMap,
        idIndex,
        0
      );

      console.log("res:", res);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "make_new_exit_request",
    async () => {
      const response = await LoopringAPI.ammpoolAPI.getAmmPoolSnapshot<any>({
        poolAddress: TOKEN_INFO.tokenMap["LP-LRC-ETH"].address,
      });
      console.log(response.raw_data.pooled);
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
      // Step 4. fees
      const { fees } = await LoopringAPI.userAPI.getOffchainFeeAmt(
        {
          accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
          requestType: sdk.OffchainFeeReqType.AMM_JOIN,
          tokenSymbol: "ETH",
        },
        apiKey
      );

      console.log("---fees:", fees);

      const { tokensMap, idIndex } = await LoopringAPI.exchangeAPI.getTokens();

      const { request: res } = sdk.makeExitAmmPoolRequest(
        "100",
        true,
        "0.001",
        LOOPRING_EXPORTED_ACCOUNT.address,
        fees,
        response.ammPoolSnapshot as sdk.AmmPoolSnapshot,
        tokensMap,
        idIndex,
        0
      );

      console.log("res:", res.exitTokens);
    },
    DEFAULT_TIMEOUT
  );
});

export default {};
