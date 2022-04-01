import { BaseAPI } from "./base_api";

import { LOOPRING_URLs } from "../defs/url_defs";

import {
  OffchainFeeReqType,
  ReqMethod,
  SIG_FLAG,
} from "../defs/loopring_enums";

import { ReqParams } from "../defs/loopring_defs";
import { ChainId } from "../defs";
import * as loopring_defs from "../defs/loopring_defs";

const GLOBAL_KEY = {
  GOERLI: {
    key: "6ZNfPWXa88yUKLUakKzr8CkzmEb2frzXKkWq6MC85V1QTxPdsp2w1bAaGxAg8CLw",
    id: 10373,
  },
  MAIN: {
    key: "re356TcrQ6KhlpkvWxP4UN0C4EqxQVV7ZjvLjunwTjaQPZ20ue2ZgClFeT7okpDQ",
    id: 22638,
  },
};

export class GlobalAPI extends BaseAPI {
  public async getActiveFeeInfo(request: { accountId?: number }) {
    const _request: loopring_defs.GetOffchainFeeAmtRequest = {
      accountId: request.accountId
        ? request.accountId
        : this.chainId === ChainId.MAINNET
        ? GLOBAL_KEY.MAIN.id
        : GLOBAL_KEY.GOERLI.id,
      requestType: OffchainFeeReqType.UPDATE_ACCOUNT,
    };
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_OFFCHAIN_FEE_AMT,
      queryParams: _request,
      apiKey:
        this.chainId === ChainId.MAINNET
          ? GLOBAL_KEY.MAIN.key
          : GLOBAL_KEY.GOERLI.key,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };
    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    const gasPrice = parseInt(raw_data.gasPrice);
    const fees: loopring_defs.LoopringMap<loopring_defs.OffchainFeeInfo> = {};
    if (raw_data?.fees instanceof Array) {
      raw_data.fees.forEach((item: loopring_defs.OffchainFeeInfo) => {
        fees[item.token] = item;
      });
    }

    return {
      fees,
      gasPrice,
      raw_data,
    };
  }
  public async getUserBalanceForFee(request: {
    accountId: number;
    tokens: string;
  }) {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_USER_EXCHANGE_BALANCES,
      queryParams: request,
      apiKey:
        this.chainId === ChainId.MAINNET
          ? GLOBAL_KEY.MAIN.key
          : GLOBAL_KEY.GOERLI.key,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    const userBalances: loopring_defs.LoopringMap<loopring_defs.UserBalanceInfo> =
      {};

    if (raw_data instanceof Array) {
      raw_data.forEach((item: loopring_defs.UserBalanceInfo) => {
        userBalances[item.tokenId] = item;
      });
    }

    return {
      userBalances,
      raw_data,
    };
  }
}
