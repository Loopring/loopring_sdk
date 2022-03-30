import {
  ChainId,
  AmmPoolSnapshot,
  GetAmmPoolSnapshotRequest,
  GetOffchainFeeAmtRequest,
  OffchainFeeReqType,
  TokenVolumeV3,
  ConnectorNames,
  GetUserApiKeyRequest,
} from "../../defs";

import { AmmpoolAPI, UserAPI, ExchangeAPI } from "../../api";

import { dumpError400 } from "../../utils/network_tools";

import {
  makeExitAmmPoolRequest,
  makeExitAmmPoolRequest2,
  makeJoinAmmPoolRequest,
} from "../../utils/swap_calc_utils";

import * as sdk from "../../index";

import {
  DEFAULT_TIMEOUT,
  LOOPRING_EXPORTED_ACCOUNT,
  LOOPRING_EXPORTED_ACCOUNT as acc,
  LoopringAPI,
  TOKEN_INFO,
  web3,
} from "../data";
import * as sign_tools from "../../api/sign/sign_tools";
import { BaseAPI } from "../../api/base_api";

let apiKey: string;
let eddsaKey: string;
describe("amm_calc", function () {
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
  }, DEFAULT_TIMEOUT);

  it(
    "amm_calc_test",
    async () => {
      try {
        const request: GetAmmPoolSnapshotRequest = {
          poolAddress: TOKEN_INFO.tokenMap["LP-LRC-ETH"].address,
        };
        const response = await LoopringAPI.ammpoolAPI.getAmmPoolSnapshot<any>(
          request
        );
        console.log(response.raw_data.pooled);

        const covertVal = sdk.toBig("1e+20").toFixed(0, 0);

        const coinA_TV = response.ammPoolSnapshot?.pooled[0];
        const coinB_TV = response.ammPoolSnapshot?.pooled[1];

        const output = sdk.ammPoolCalc(
          covertVal,
          true,
          coinA_TV as TokenVolumeV3,
          coinB_TV as TokenVolumeV3
        );

        console.log("covertVal:", covertVal);
        console.log("output:", output);
        console.log("ratio:", output.ratio.toString());
      } catch (reason) {
        dumpError400(reason);
      }
    },
    DEFAULT_TIMEOUT
  );

  it(
    "make_join_request",
    async () => {
      try {
        const request: GetAmmPoolSnapshotRequest = {
          poolAddress: TOKEN_INFO.tokenMap["LP-LRC-ETH"].address,
        };

        const response = await LoopringAPI.ammpoolAPI.getAmmPoolSnapshot<any>(
          request
        );
        console.log(response.raw_data.pooled);

        const request2: GetOffchainFeeAmtRequest = {
          accountId: acc.accountId,
          requestType: OffchainFeeReqType.AMM_JOIN,
          tokenSymbol: "ETH",
        };

        const { fees } = await LoopringAPI.userAPI.getOffchainFeeAmt(
          request2,
          apiKey
        );

        console.log("---fees:", fees);

        const { tokenSymbolMap, tokenIdIndex } =
          await LoopringAPI.exchangeAPI.getTokens();

        const { request: res } = makeJoinAmmPoolRequest(
          "100",
          true,
          "0.001",
          acc.address,
          fees,
          response.ammPoolSnapshot as AmmPoolSnapshot,
          tokenSymbolMap,
          tokenIdIndex,
          0,
          0
        );

        console.log("res:", res);
      } catch (reason) {
        dumpError400(reason);
      }
    },
    DEFAULT_TIMEOUT
  );

  it(
    "make_exit_request",
    async () => {
      try {
        const request: GetAmmPoolSnapshotRequest = {
          poolAddress: TOKEN_INFO.tokenMap["LP-LRC-ETH"].address,
        };

        const response = await LoopringAPI.ammpoolAPI.getAmmPoolSnapshot<any>(
          request
        );
        console.log(response.raw_data.pooled);

        const request2: GetOffchainFeeAmtRequest = {
          accountId: acc.accountId,
          requestType: OffchainFeeReqType.AMM_JOIN,
          tokenSymbol: "ETH",
        };

        const { fees } = await LoopringAPI.userAPI.getOffchainFeeAmt(
          request2,
          apiKey
        );

        console.log("---fees:", fees);

        const { tokenSymbolMap, tokenIdIndex } =
          await LoopringAPI.exchangeAPI.getTokens();

        const { request: res } = makeExitAmmPoolRequest2(
          "100",
          "0.001",
          acc.address,
          fees,
          response.ammPoolSnapshot as AmmPoolSnapshot,
          tokenSymbolMap,
          tokenIdIndex,
          0
        );

        console.log("res:", res);
      } catch (reason) {
        dumpError400(reason);
      }
    },
    DEFAULT_TIMEOUT
  );

  it(
    "make_new_exit_request",
    async () => {
      try {
        const request: GetAmmPoolSnapshotRequest = {
          poolAddress: TOKEN_INFO.tokenMap["LP-LRC-ETH"].address,
        };

        const response = await LoopringAPI.ammpoolAPI.getAmmPoolSnapshot<any>(
          request
        );
        console.log(response.raw_data.pooled);

        const request2: GetOffchainFeeAmtRequest = {
          accountId: acc.accountId,
          requestType: OffchainFeeReqType.AMM_JOIN,
          tokenSymbol: "ETH",
        };

        const { fees } = await LoopringAPI.userAPI.getOffchainFeeAmt(
          request2,
          apiKey
        );

        console.log("---fees:", fees);

        const { tokenSymbolMap, tokenIdIndex } =
          await LoopringAPI.exchangeAPI.getTokens();

        const { request: res } = makeExitAmmPoolRequest(
          "100",
          true,
          "0.001",
          acc.address,
          fees,
          response.ammPoolSnapshot as AmmPoolSnapshot,
          tokenSymbolMap,
          tokenIdIndex,
          0
        );

        console.log("res:", res);
        console.log("res:", res.exitTokens);
      } catch (reason) {
        dumpError400(reason);
      }
    },
    DEFAULT_TIMEOUT
  );
});

export default {};
