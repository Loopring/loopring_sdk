import { BaseAPI } from "./base_api";

import { LOOPRING_URLs } from "../defs/url_defs";
import { ReqMethod, ReqParams, SIG_FLAG } from "../defs";

export class DelegateAPI extends BaseAPI {
  public async getCode(address: string): Promise<string> {
    const reqParams: ReqParams = {
      sigFlag: SIG_FLAG.NO_SIG,
      url: LOOPRING_URLs.GET_DELEGATE_GET_CODE,
      method: ReqMethod.POST,
      bodyParams: { address },
    };

    const code = (await this.makeReq().request(reqParams)).data;
    return code;
  }
}
