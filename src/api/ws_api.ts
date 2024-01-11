import { BaseAPI } from './base_api'

import * as loopring_defs from '../defs'

export class WsAPI extends BaseAPI {
  /*
   * Get wsApiKey by access REST path "/v3/ws/key"
   */
  public async getWsKey() {
    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.GET_WS_KEY,
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
    }

    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    const wsKey = raw_data.key
    return {
      wsKey,
      raw_data,
    }
  }
}
