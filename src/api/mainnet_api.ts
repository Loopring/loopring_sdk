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
    optionHash?: string
    baseSymbol?: string
    quoteSymbol?: string
    startTime?: string
    endTime?: string
    limit?: number
    offset?: number
    dualType?: 'DUAL_BASE' | 'DUAL_CURRENCY'
  }): Promise<{
    raw_data: any
    totalNum: number
    infos: {
      optionHash: string
      productId: string
      base: string
      quote: string
      currency: string
      createTime: number
      expireTime: number
      strike: string
      expired: boolean
      dualType: string
      buyLow: boolean
    }[]
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_MAINNET_DEFI_DUAL_PRODUCTLIST,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
      queryParams: req,
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    return {
      raw_data,
      ...raw_data,
    }
  }
  
  public async getDefiDualProducts(req: {
    start?: number
    end?: number
    limit?: number
    offset?: number
    investmentStatuses?: number[]
  }): Promise<{
    raw_data: any
    totalNum: number
    products: {
      optionHash: string
      productId: string
      base: string
      quote: string
      currency: string
      createTime: number
      expireTime: number
      strike: string
      expired: boolean
      dualType: string
      buyLow: boolean
      settlementTime: number,
      deliveryPrice: number,
      isSwap: boolean
      investedBase: boolean
      investToken: string
      investAmount: string
      toBeSettledToken: string
      toBeSettledAmount: string
    }[]
    indexes: {
      index: string
      base: string
      quote: string
      indexTime: string
    }[]
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_MAINNET_DEFI_DUAL_PRODUCTS,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
      queryParams: {
        ...req,
        investmentStatuses: req.investmentStatuses ? req.investmentStatuses.join(',') : undefined
      },
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    return {
      raw_data,
      ...raw_data,
    }
  }

  public async getDefiDualUserTransactions(req: {
    user: string
    start?: number
    end?: number
    dualTypes?: string
    hashes?: string
    optionHashes?: string
    investmentStatuses?: string
    settlementStatuses?: string
    fromId?: number
    offset?: number
    limit?: number
  }): Promise<{
    raw_data: any
    totalNum: number
    transactions: {
      product: {
        productId: string
        optionHash: string
        baseToken: string
        quoteToken: string
        strike: number
      }
      profit: string
      desireAmountS: string
      amount: string
      dualType: string
      base: string
      quote: string
      currency: string
      deliveryPrice: number
      baseAmount: string
      currencyAmount: string
      baseProfit: number
      baseSettleRatio: number
      currencySettleRatio: number
      dualOrderStatus: string
      timeOrigin: {
        expireTime: number
        createTime: number
        updateTime: number
        settlementTime: number
      }
      settlementOrigin: {
        baseFilled: string
        currencyFilled: string
        dualFilled: string
        baseSettlement: string
        currencySettlement: string
        settlementStatus: string
      }
      createdAt: number
      updatedAt: number
    }[]
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_MAINNET_DEFI_DUAL_USER_TRANSACTIONS,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
      queryParams: req,
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    debugger
    return {
      raw_data,
      ...raw_data,
    }
  }

  public async defiDualSignature(req: {
    user: string
    optionHash: string
    profit: string
    investAmount: string
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
      bodyParams: req,
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    return {
      raw_data,
      ...raw_data,
    }
  }
}
