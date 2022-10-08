import { BaseAPI } from "./base_api";

import { LOOPRING_URLs } from "../defs";
import { ChainId, ReqMethod, ReqParams, SIG_FLAG } from "../defs";

export class DelegateAPI extends BaseAPI {
  public async getCode(address: string): Promise<string> {
    const reqParams: ReqParams = {
      sigFlag: SIG_FLAG.NO_SIG,
      url: LOOPRING_URLs.GET_DELEGATE_GET_CODE,
      method: ReqMethod.POST,
      bodyParams: {address},
    };


    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    return raw_data;
  }

  public async getIPFS(path: string): Promise<string> {
    const reqParams: ReqParams = {
      sigFlag: SIG_FLAG.NO_SIG,
      url: LOOPRING_URLs.GET_DELEGATE_GET_IPFS,
      method: ReqMethod.GET,
      queryParams: {path},
    };


    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    return raw_data;
  }

  public getCollectionDomain() {
    return this.chainId === ChainId.GOERLI ? "https://uatnftinfos.loopring.io" : "https://nftinfos.loopring.io"
  }
}
