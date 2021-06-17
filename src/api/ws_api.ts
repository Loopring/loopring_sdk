import { BaseAPI } from './base_api'

import { ReqParams, SIG_FLAG, } from './request'

import { LOOPRING_URLs, ReqMethod } from '../defs/url_defs'

export class WsAPI extends BaseAPI {

    /*
    * Get wsApiKey by access REST path "/v3/ws/key"
    */
    public async getWsKey() {

        const reqParams: ReqParams = {
            url: LOOPRING_URLs.GET_WS_KEY,
            method: ReqMethod.GET,
            sigFlag: SIG_FLAG.NO_SIG,
        }

        const raw_data = (await this.makeReq().request(reqParams)).data
        return raw_data['key']
    }

}
