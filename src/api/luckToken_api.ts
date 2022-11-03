/* eslint-disable camelcase  */
import { BaseAPI } from "./base_api";
import {
  ReqParams,
  ReqMethod,
  SIG_FLAG,
  LOOPRING_URLs,
  RESULT_INFO,
  ChainId,
  ConnectorNames,
  LuckTokenHistory,
  LuckTokenWithdraw,
  LuckTokenClaim,
} from "../defs";
import * as loopring_defs from "../defs/loopring_defs";
import { sortObjDictionary } from "../utils";

export class LuckTokenAPI extends BaseAPI {
  public async getLuckTokenAgents<R>(): Promise<{
    raw_data: R;
    luckTokenAgents: R & { infos: loopring_defs.LuckyTokenInfo[] };
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
    const luckTokenAgents = raw_data.map((item: string[]) => {
      return {
        ...item,
        infos: {
          signer: item[0],
          signerUrl: item[1],
          logoUrl: item[2],
          memo: item[3],
        },
      };
    });
    return {
      raw_data,
      luckTokenAgents,
    };
  }

  public async getLuckTokenAuthorizedSigners<R>(): Promise<{
    raw_data: R;
    luckTokenAgents: R & { infos: loopring_defs.LuckyTokenInfo[] };
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
    const luckTokenAgents = raw_data.map((item: string[]) => {
      return {
        ...item,
        infos: {
          signer: item[0],
          signerUrl: item[1],
          logoUrl: item[2],
          memo: item[3],
        },
      };
    });
    return {
      raw_data,
      luckTokenAgents,
    };
  }
  public async getLuckTokenClaimHistory<R>(
    request: { fromId: number; limit?: number },
    apiKey: string
  ): Promise<{
    totalNum: number;
    list: LuckTokenHistory[];
    raw_data: R;
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_LUCK_TOKEN_CLAIMHISTORY,
      queryParams: request,
      apiKey,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };
    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    const totalNum: number = raw_data.totalNum;
    const list: loopring_defs.LuckTokenHistory[] = raw_data.list;

    return {
      totalNum,
      list,
      raw_data,
    };
  }

  public async getLuckTokenLuckyTokens<R>(
    request: {
      senderId: number;
      hash: string;
      partitions: string;
      modes: string;
      scopes: string;
      statuses: string;
      startTime: number;
      endTime: number;
      fromId: number;
      limit?: number; // 默认50
      official: boolean;
    },
    apiKey: string
  ): Promise<{
    raw_data: R;
    totalNum: number;
    list: loopring_defs.LuckyTokenItemForReceive[];
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_LUCK_TOKEN_LUCKYTOKENS,
      queryParams: request,
      apiKey,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    const totalNum: number = raw_data.totalNum;
    const list: loopring_defs.LuckyTokenItemForReceive[] = raw_data.list;

    return {
      totalNum,
      list,
      raw_data,
    };
  }
  public async getLuckTokenDetail<R>(
    request: {
      limit?: number; // 默认50
      hash: string; // 必传，红包hash
      fromId: number;
      showHelper: boolean;
    },
    apiKey: string
  ): Promise<{
    raw_data: R;
    detail: loopring_defs.LuckTokenHistory;
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_LUCK_TOKEN_LUCKYTOKENDETAIL,
      queryParams: request,
      apiKey,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    return { raw_data, detail: raw_data };
  }

  public async getLuckTokenWithdrawals<R>(
    request: {
      statuses: loopring_defs.LuckyTokenWithdrawStatus[];
      tokenId: number;
      startTime: number;
      endTime: number;
      fromId: number;
      limit?: number;
    },
    apiKey: string
  ): Promise<{
    raw_data: R;
    totalNum: number;
    luckTokenWithdraw: LuckTokenWithdraw[];
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_LUCK_TOKEN_WITHDRAWALS,
      queryParams: { ...request, statuses: request.statuses.join(",") },
      apiKey,
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
      raw_data,
      totalNum: raw_data?.totalNum,
      luckTokenWithdraw: raw_data.list,
    };
  }
  public async getLuckTokenBalances<R>(
    request: {
      accountId: number;
      tokens: number[]; // tokenId
    },
    apiKey: string
  ): Promise<{
    raw_data: R;
    totalNum: number;
    tokenBalance: loopring_defs.UserBalanceInfo[];
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_LUCK_TOKEN_BALANCES,
      queryParams: { ...request, statuses: request.tokens.join(",") },
      apiKey,
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
      raw_data,
      totalNum: raw_data?.totalNum,
      tokenBalance: raw_data.list,
    };
  }
  public async getLuckTokenClaimedLuckyTokens<R>(
    request: {
      fromId: number;
      limit?: number;
      hashes?: string[];
    },
    apiKey: string
  ): Promise<{
    raw_data: R;
    totalNum: number;
    claimedHistory: Array<LuckTokenClaim & { id: number }>;
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_LUCK_TOKEN_CLAIMEDLUCKYTOKENS,
      queryParams: { ...request, hashes: request?.hashes?.join(",") },
      apiKey,
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
      raw_data,
      totalNum: raw_data?.totalNum,
      claimedHistory: raw_data.list,
    };
  }

  public async getLuckTokenSummary<R>(apiKey: string): Promise<{
    raw_data: R;
    tokenSummaryList: { tokenId: number; amount: string }[];
    totalNum: number;
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_LUCK_TOKEN_SUMMARY,
      apiKey,
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
      raw_data,
      totalNum: raw_data.count,
      tokenSummaryList: raw_data.tokenSummaryList,
    };
  }
  public async sendLuckTokenSend<
    R = {
      hash: string;
      status: string;
      isIdempotent: boolean; // 幂等
      accountId: number;
      tokenId: number;
      storageId: number;
    }
  >(
    {
      request,
      apiKey,
      eddsaKey,
    }: {
      request: {
        type: loopring_defs.LuckyTokenType;
        numbers: number;
        memo: string;
        signerFlag: loopring_defs.LuckyTokenSignerFlag; //是否使用签名信息，是的话后续红包返回的签名信息包含签名信息
        templateID: number;
        validSince: number; // 秒
        luckyToken: loopring_defs.LuckyTokenInfo;
      };
      chainId: ChainId;
      walletType: ConnectorNames;
      eddsaKey: string;
      apiKey: string;
      isHWAddr?: boolean;
    } // {},
  ): // apikey
  Promise<loopring_defs.TX_HASH_RESULT<R> | RESULT_INFO> {
    const dataToSig: Map<string, any> = sortObjDictionary(request);

    const reqParams: ReqParams = {
      url: LOOPRING_URLs.POST_LUCK_TOKEN_SENDLUCKYTOKEN,
      bodyParams: request,
      apiKey,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.EDDSA_SIG,
      sigObj: {
        dataToSig,
        PrivateKey: eddsaKey,
      },
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    return this.returnTxHash(raw_data);
  }
  public async sendLuckTokenClaimLuckyToken<R>({
    request,
    apiKey,
    eddsaKey,
  }: {
    request: {
      hash: string;
      claimer: string;
      referrer: string;
    };
    chainId: ChainId;
    walletType: ConnectorNames;
    eddsaKey: string;
    apiKey: string;
    isHWAddr?: boolean;
  }): Promise<{
    raw_data: R;
  }> {
    const dataToSig: Map<string, any> = sortObjDictionary(request);

    const reqParams: ReqParams = {
      url: LOOPRING_URLs.POST_LUCK_TOKEN_CLAIMLUCKYTOKEN,
      apiKey,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.EDDSA_SIG,
      sigObj: {
        dataToSig,
        PrivateKey: eddsaKey,
      },
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    return { raw_data, ...raw_data };
  }
  public async sendLuckTokenWithdraws<R>(
    request: {
      tokenId: number;
      feeTokenId: number;
      amount: string;
      claimer: number;
      layer2Transfer: string;
    },
    chainId: ChainId,
    walletType: ConnectorNames,
    eddsaKey: string,
    apiKey: string,
    isHWAddr?: boolean
  ): Promise<loopring_defs.TX_HASH_RESULT<R> | RESULT_INFO> {
    const dataToSig: Map<string, any> = sortObjDictionary(request);

    const reqParams: ReqParams = {
      url: LOOPRING_URLs.POST_LUCK_TOKEN_WITHDRAWS,
      apiKey,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.EDDSA_SIG,
      sigObj: {
        dataToSig,
        PrivateKey: eddsaKey,
      },
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    return this.returnTxHash(raw_data);
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
