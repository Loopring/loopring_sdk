import { BaseAPI } from './base_api'

import * as loopring_defs from '../defs'

import * as sign_tools from './sign/sign_tools'

export class WhitelistedUserAPI extends BaseAPI {
  /*
   * Submit offchain withdraw request
   * not supported for now.
   */
  private async submitOffchainWithdraw(
    request: loopring_defs.OffChainWithdrawalRequestV3,
    eddsaKey: string,
    apiKey: string,
  ) {
    request.eddsaSignature = (await sign_tools.get_EddsaSig_OffChainWithdraw(request, eddsaKey)).result

    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.WITHDRAWALS_ACTION,
      bodyParams: request,
      apiKey,
      method: loopring_defs.ReqMethod.POST,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
    }

    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    return {
      raw_data,
    }
  }

  /*
   * Submit offchain withdraw request
   */
  public async submitInternalTransfer(
    request: loopring_defs.OriginTransferRequestV3,
    eddsaKey: string,
    apiKey: string,
  ) {
    request.eddsaSignature = (await sign_tools.get_EddsaSig_Transfer(request, eddsaKey)).result

    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.POST_INTERNAL_TRANSFER,
      bodyParams: request,
      apiKey,
      method: loopring_defs.ReqMethod.POST,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
    }

    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    return {
      raw_data,
    }
  }
}
