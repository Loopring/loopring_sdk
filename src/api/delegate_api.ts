import { BaseAPI } from './base_api'

import * as loopring_defs from '../defs'

export class DelegateAPI extends BaseAPI {
  public async getCode(address: string): Promise<string> {
    const reqParams: loopring_defs.ReqParams = {
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
      url: loopring_defs.LOOPRING_URLs.GET_DELEGATE_GET_CODE,
      method: loopring_defs.ReqMethod.POST,
      bodyParams: { address },
    }

    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    return raw_data
  }

  public async getIPFS(path: string): Promise<string> {
    const reqParams: loopring_defs.ReqParams = {
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
      url: loopring_defs.LOOPRING_URLs.GET_DELEGATE_GET_IPFS,
      method: loopring_defs.ReqMethod.GET,
      queryParams: { path },
    }

    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    return raw_data
  }

  public getCollectionDomain() {
    return this.chainId === loopring_defs.ChainId.GOERLI
      ? 'https://uatnftinfos.loopring.io'
      : 'https://nftinfos.loopring.io'
  }
}
