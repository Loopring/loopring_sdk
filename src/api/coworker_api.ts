/* eslint-disable camelcase  */
import { BaseAPI } from './base_api'
import * as loopring_defs from '../defs'

import { AxiosResponse } from 'axios'
export enum Layer1DualInvestmentStatus {
  DUAL_RECEIVED = 0,
  DUAL_CONFIRMED = 1,
  DUAL_CANCELED_L2 = 2,
  DUAL_CANCELED_L1 = 3,
  DUAL_SETTLED = 4,
}
export type ProductType = {
  base: string
  quote: string
  settlementTime: number
  strike: number
  deliveryPrice: number
  expireTime: number
  isSwap: boolean
  investedBase: boolean
  investToken: string
  investAmount: string
  toBeSettledToken: string
  toBeSettledAmount: string
  optionHash: string
}

export enum TransactionType {
  DEPOSIT = 1,
  ONCHAIN_WITHDRAWAL = 2,
}
export type Layer1DualTxData = {
  id: string
  txHash: string
  user?: string
  amount: string
  txType: TransactionType
  tokenAddress: number
  createdAt?: number
  updatedAt?: number
}

export enum Layer1DualSettlementStatus {
  L1_UNSETTLED = 'L1_UNSETTLED',
  L1_SETTLING = 'L1_SETTLING',
  L1_SETTLED = 'L1_SETTLED',
  L1_PAID = 'L1_PAID',
}

export enum Layer1DualOrderMapStatus {
  DUAL_ORDER_SUBMITTED = 'DUAL_ORDER_SUBMITTED',
  DUAL_ORDER_CONFIRMED = 'DUAL_ORDER_CONFIRMED',
  DUAL_ORDER_FILLED = 'DUAL_ORDER_FILLED',
  DUAL_ORDER_PARTIAL_FILLED = 'DUAL_ORDER_PARTIAL_FILLED',
  DUAL_ORDER_CANCELLED = 'DUAL_ORDER_CANCELLED',
  DUAL_ORDER_REJECTED = 'DUAL_ORDER_REJECTED',
}

//申购订单状态
export enum Layer1DualOrderStatus {
  DUAL_ORDER_SUBMITTED,
  DUAL_ORDER_CONFIRMED,
  DUAL_ORDER_FILLED,
  DUAL_ORDER_PARTIAL_FILLED,
  DUAL_ORDER_CANCELLED,
  DUAL_ORDER_REJECTED,
}

export type TransactionHistory = {
  id: number
  hash: string
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
  dualOrderStatus: Layer1DualOrderMapStatus
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
    settlementStatus: Layer1DualSettlementStatus
  }
  createdAt: number
  updatedAt: number
}
export class CoworkerAPI extends BaseAPI {
  public async getProducts<R = ProductType>(
    request: {
      offset?: number
      limit?: number
      start?: number
      end?: number
      network?: loopring_defs.NetworkWallet
      investmentStatuses?: string | Layer1DualInvestmentStatus[]
    },
    apiKey?: string,
    url = '/api/v3/mainnet/defi/dual/products',
  ): Promise<{
    raw_data: { totalNum: number; products: R[] }
    totalNum: number
    products: R[]
    indexes: []
  }> {
    const reqParams = {
      url,
      queryParams: {
        ...request,
        txTypes:
          typeof request?.investmentStatuses === 'string'
            ? request?.investmentStatuses
            : request?.investmentStatuses?.join(','),
      },
      apiKey,
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
    }
    let raw_data
    try {
      raw_data = (await this.makeReq().request(reqParams)).data
    } catch (error) {
      throw error as AxiosResponse
    }

    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data.resultInfo,
      }
    }

    return {
      raw_data,
      totalNum: raw_data.totalNum,
      products: raw_data.products,
      indexes: raw_data?.indexes,
    }
  }

  public async getTransactions<R = Layer1DualTxData>(
    request: {
      user?: string
      offset?: number
      limit?: number
      start?: number
      end?: number
      txTypes: TransactionType[] | string
      network?: loopring_defs.NetworkWallet
    },
    url = '/api/v3/mainnet/defi/dual/transactions',
  ): Promise<{
    raw_data: { totalNum: number; transactions: R[] }
    totalNum: number
    transactions: R[]
  }> {
    const reqParams = {
      url,
      queryParams: {
        ...request,
        txTypes:
          typeof request?.txTypes === 'string' ? request?.txTypes : request?.txTypes?.join(','),
      },
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
    }
    let raw_data
    try {
      raw_data = (await this.makeReq().request(reqParams)).data
    } catch (error) {
      throw error as AxiosResponse
    }

    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data.resultInfo,
      }
    }

    return {
      raw_data,
      totalNum: raw_data.totalNum,
      transactions: raw_data.transactions,
    }
  }

  public async getUserTransactions<R = TransactionHistory>(
    request: {
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
    },
    url = '/api/v3/mainnet/defi/dual/user/transactions',
  ): Promise<{
    raw_data: { totalNum: number; transactions: R[] }
    totalNum: number
    transactions: R[]
  }> {
    const reqParams = {
      url,
      queryParams: {
        ...request,
      },
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
    }
    let raw_data
    try {
      raw_data = (await this.makeReq().request(reqParams)).data
    } catch (error) {
      throw error as AxiosResponse
    }

    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data.resultInfo,
      }
    }

    return {
      raw_data,
      totalNum: raw_data.totalNum,
      transactions: raw_data.transactions,
    }
  }
}
