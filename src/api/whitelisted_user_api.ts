import { BaseAPI } from "./base_api";

import { ReqParams } from "../defs/loopring_defs";

import { SIG_FLAG, ReqMethod } from "../defs/loopring_enums";

import { LOOPRING_URLs } from "../defs/url_defs";

import * as loopring_defs from "../defs/loopring_defs";

import * as sign_tools from "./sign/sign_tools";

export class WhitelistedUserAPI extends BaseAPI {
  /*
   * Submit offchain withdraw request
   * not supported for now.
   */
  private async submitOffchainWithdraw(
    request: loopring_defs.OffChainWithdrawalRequestV3,
    eddsaKey: string,
    apiKey: string
  ) {
    request.eddsaSignature = sign_tools.get_EddsaSig_OffChainWithdraw(
      request,
      eddsaKey
    );

    const reqParams: ReqParams = {
      url: LOOPRING_URLs.WITHDRAWALS_ACTION,
      bodyParams: request,
      apiKey,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    return {
      raw_data,
    };
  }

  /*
   * Submit offchain withdraw request
   */
  public async submitInternalTransfer(
    request: loopring_defs.OriginTransferRequestV3,
    eddsaKey: string,
    apiKey: string
  ) {
    request.eddsaSignature = sign_tools.get_EddsaSig_Transfer(
      request,
      eddsaKey
    );

    const reqParams: ReqParams = {
      url: LOOPRING_URLs.POST_INTERNAL_TRANSFER,
      bodyParams: request,
      apiKey,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    return {
      raw_data,
    };
  }
}
