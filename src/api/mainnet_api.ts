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
    luckTokenAgents: { [key: string]: loopring_defs.LuckyTokenInfo }
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_MAINNET_DEFI_DUAL_PRODUCTLIST,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
      queryParams: req
    }
    debugger

    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    const luckTokenAgents = raw_data.reduce(
      (
        prev: { [key: string]: loopring_defs.LuckyTokenInfo },
        item: { owner: string; infos: any[] },
      ) => {
        prev[item.owner] = {
          signer: item.infos[0],
          signerUrl: item.infos[1],
          logoUrl: item.infos[2],
          memo: item.infos[3],
        }
        return prev
      },
      {} as { [key: string]: loopring_defs.LuckyTokenInfo },
    )
    return {
      raw_data,
      luckTokenAgents,
    }
  }

}
