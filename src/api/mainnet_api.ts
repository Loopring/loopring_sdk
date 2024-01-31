/* eslint-disable camelcase  */
import { BaseAPI } from './base_api'
import {
  LOOPRING_URLs,
  NFTTokenInfo,
  ReqMethod,
  ReqParams,
  RESULT_INFO,
  SIG_FLAG,
  UserNFTBalanceInfo,
} from '../defs'
import * as loopring_defs from '../defs'
import { sortObjDictionary } from '../utils'
import * as sign_tools from './sign/sign_tools'
import { AxiosResponse } from 'axios'

export class MainnetAPI extends BaseAPI {
  public async getDefiDualProductlist(req: {
    optionHash?: string,
    baseSymbol?: string,
    startTime?: string,
    endTime?: string,
    limit?: number,
    offset?: number
  }): Promise<{
    raw_data: any
    totalNum: number,
    infos: { 
      optionHash: string;
      productId: string;
      base: string;
      quote: string;
      currency: string;
      createTime: number;
      expireTime: number;
      strike: string,
      expired: boolean,
      dualType: string,
      buyLow: boolean
     }[]
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_MAINNET_DEFI_DUAL_PRODUCTLIST,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
      queryParams: req
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    return {
      raw_data,
      ...raw_data
    }
  }

  public async defiDualSignature(req: {
    user: string;
    optionHash: string;
    profit: string;
    investAmount: string;
  }): Promise<{
    raw_data: any
    ecdsaSig: string
    optionHash: string
    profitRatio: string
    deadline: string
    investAmount: string
    salt: string
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.POST_MAINNET_DEFI_DUAL_SIGNATURE,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.NO_SIG,
      bodyParams: req
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    return {
      raw_data,
      ...raw_data
    }
  }

}
