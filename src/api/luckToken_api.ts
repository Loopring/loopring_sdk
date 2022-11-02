/* eslint-disable camelcase  */
import { BaseAPI } from "./base_api";
import {
  DefiMarketInfo,
  LoopringMap,
  ReqParams,
  SEP,
  SoursURL,
  TokenAddress,
  TokenInfo,
  TokenRelatedInfo,
  ReqMethod,
  SIG_FLAG,
  LOOPRING_URLs,
  SigPatchField,
  RESULT_INFO,
  DUAL_TYPE,
} from "../defs";
import * as loopring_defs from "../defs/loopring_defs";

export class LuckTokenAPI extends BaseAPI {
  public async getLuckTokenAgents<R>(): Promise<{
    raw_data: R;
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_LUCK_TOKEN_AGENTS,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    return { raw_data };
  }
  public async getLuckTokenAuthorizedsigners<R>(): Promise<{
    raw_data: R;
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_LUCK_TOKEN_AUTHORIZEDSIGNERS,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    return { raw_data };
  }
  public async getLuckTokenAlaimhistory<R>(): Promise<{
    raw_data: R;
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_LUCK_TOKEN_CLAIMHISTORY,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    return { raw_data };
  }
  public async getLuckTokenLuckytokens<R>(): Promise<{
    raw_data: R;
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_LUCK_TOKEN_LUCKYTOKENS,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    return { raw_data };
  }
  public async getLuckTokenLuckytokendetail<R>(): Promise<{
    raw_data: R;
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_LUCK_TOKEN_LUCKYTOKENDETAIL,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    return { raw_data };
  }
  public async getLuckTokenWithdrawals<R>(): Promise<{
    raw_data: R;
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_LUCK_TOKEN_WITHDRAWALS,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    return { raw_data };
  }
  public async getLuckTokenBalances<R>(): Promise<{
    raw_data: R;
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_LUCK_TOKEN_BALANCES,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    return { raw_data };
  }
  public async getLuckTokenClaimedluckytokens<R>(): Promise<{
    raw_data: R;
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_LUCK_TOKEN_CLAIMEDLUCKYTOKENS,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    return { raw_data };
  }
  public async getLuckTokenSummary<R>(): Promise<{
    raw_data: R;
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_LUCK_TOKEN_SUMMARY,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    return { raw_data };
  }
  public async sendLuckTokenSend<R>(): Promise<{
    raw_data: R;
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.POST_LUCK_TOKEN_SENDLUCKYTOKEN,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    return { raw_data };
  }
  public async sendLuckTokenClaimLuckyToken<R>(): Promise<{
    raw_data: R;
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.POST_LUCK_TOKEN_CLAIMLUCKYTOKEN,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    return { raw_data };
  }
  public async sendLuckTokenWithdraws<R>(): Promise<{
    raw_data: R;
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.POST_LUCK_TOKEN_WITHDRAWS,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    return { raw_data };
  }
}

// GET_LUCK_TOKEN_AGENTS
// GET_LUCK_TOKEN_AUTHORIZEDSIGNERS
// GET_LUCK_TOKEN_CLAIMHISTORY
// GET_LUCK_TOKEN_LUCKYTOKENS
// GET_LUCK_TOKEN_LUCKYTOKENDETAIL
// GET_LUCK_TOKEN_WITHDRAWALS
// GET_LUCK_TOKEN_BALANCES
// GET_LUCK_TOKEN_CLAIMEDLUCKYTOKENS
// GET_LUCK_TOKEN_SUMMARY
// POST_LUCK_TOKEN_SENDLUCKYTOKEN
// POST_LUCK_TOKEN_CLAIMLUCKYTOKEN
// POST_LUCK_TOKEN_WITHDRAWS
