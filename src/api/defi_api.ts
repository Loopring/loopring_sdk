/* eslint-disable camelcase  */
import { BaseAPI } from './base_api'

import * as loopring_defs from '../defs/loopring_defs'
import { BTRADENAME, DepthData, GetOrdersRequest } from '../defs/loopring_defs'
import {
  LOOPRING_URLs,
  ReqMethod,
  ReqParams,
  RESULT_INFO,
  SEP,
  SIG_FLAG,
  SigPatchField,
  SoursURL,
} from '../defs'
import { makeInvestMarkets, makeMarkets, sortObjDictionary } from '../utils'
import * as sign_tools from './sign/sign_tools'
import { AxiosResponse } from 'axios'
import { getMidPrice } from './exchange_api'
import { getEdDSASigWithPoseidon } from './sign/sign_tools'

export class DefiAPI extends BaseAPI {
  /*
   * Returns the fee rate of users placing orders in specific markets
   */
  public async getDefiToken<R>(): Promise<{
    raw_data: R
    tokensMap: loopring_defs.LoopringMap<loopring_defs.TokenInfo>
    idIndex: loopring_defs.LoopringMap<string>
    addressIndex: loopring_defs.LoopringMap<loopring_defs.TokenAddress>
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_DEFI_TOKENS,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    }

    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      }
    }

    const tokensMap: loopring_defs.LoopringMap<loopring_defs.TokenInfo> = {}
    const addressIndex: loopring_defs.LoopringMap<loopring_defs.TokenAddress> = {}
    const idIndex: loopring_defs.LoopringMap<string> = {}
    if (raw_data instanceof Array) {
      raw_data.forEach((item: loopring_defs.TokenInfo) => {
        if (item.symbol.startsWith('LP-')) {
          item.isLpToken = true
        } else {
          item.isLpToken = false
        }
        tokensMap[item.symbol] = item

        const coinInfo = {
          icon: SoursURL + `ethereum/assets/${item.address}/logo.png`,
          name: item.symbol,
          simpleName: item.symbol,
          description: item.type,
          company: '',
        }
        // totalCoinMap[item.symbol] = coinInfo;
        addressIndex[item.address.toLowerCase()] = item.symbol
        idIndex[item.tokenId] = item.symbol
      })
    }

    return {
      tokensMap,
      idIndex,
      addressIndex,
      raw_data,
    }
  }

  public async getDefiMarkets<R>(
    request: loopring_defs.GetDefiMarketRequest,
    url: string = LOOPRING_URLs.GET_DEFI_MARKETS,
  ): Promise<{
    markets: loopring_defs.LoopringMap<loopring_defs.DefiMarketInfo>
    pairs: loopring_defs.LoopringMap<loopring_defs.TokenRelatedInfo>
    tokenArr: string[]
    tokenArrStr: string
    marketArr: string[]
    marketArrStr: string
    raw_data: R
  }> {
    const reqParams: ReqParams = {
      url,
      queryParams: {},
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    }

    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      }
    }

    const types = request?.defiType?.toString()?.split(',')
    return {
      ...makeInvestMarkets(raw_data, types),
      raw_data,
    }
  }

  public async orderDefi<R>(
    request: loopring_defs.DefiOrderRequest,
    privateKey: string,
    apiKey: string,
  ): Promise<(Omit<any, 'resultInfo'> & { raw_data: Omit<any, 'resultInfo'> }) | RESULT_INFO> {
    const dataToSig = [
      request.exchange,
      request.storageId,
      request.accountId,
      request.sellToken.tokenId,
      request.buyToken.tokenId,
      request.sellToken.volume,
      request.buyToken.volume,
      request.validUntil,
      request.maxFeeBips,
      request.fillAmountBOrS ? 1 : 0,
      0,
    ]

    const reqParams: ReqParams = {
      url: LOOPRING_URLs.POST_DEFI_ORDER,
      bodyParams: request,
      apiKey,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.EDDSA_SIG_POSEIDON,
      sigObj: {
        dataToSig,
        sigPatch: SigPatchField.EddsaSignature,
        PrivateKey: privateKey,
      },
    }

    const raw_data = (await this.makeReq().request(reqParams)).data
    return this.returnTxHash(raw_data)
  }

  public async getDefiReward<R>(
    request: loopring_defs.GetUserDefiRewardRequest,
    apiKey: string,
  ): Promise<
    | {
        raw_data: R
        totalNum: number
        totalRewards: string
        lastDayRewards: string
        rewards: []
      }
    | RESULT_INFO
  > {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_DEFI_REWARDS,
      queryParams: request,
      apiKey,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    }

    const raw_data = (await this.makeReq().request(reqParams)).data

    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      }
    }

    return {
      ...raw_data,
      raw_data,
    }
  }

  public async getDefiTransaction<R>(
    request: loopring_defs.GetUserDefiTxRequest,
    apiKey: string,
  ): Promise<
    | {
        raw_data: R
        totalNum: number
        userDefiTxs: loopring_defs.UserDefiTxsHistory[]
      }
    | RESULT_INFO
  > {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_DEFI_TRANSACTIONS,
      queryParams: request,
      apiKey,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    }

    const raw_data = (await this.makeReq().request(reqParams)).data

    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      }
    }

    return {
      totalNum: raw_data?.totalNum,
      userDefiTxs: raw_data.transactions as loopring_defs.UserDefiTxsHistory[],
      raw_data,
    }
  }

  public async getDualInfos<R>(request: loopring_defs.GetDualInfosRequest): Promise<
    | RESULT_INFO
    | {
        totalNum: number
        dualInfo: {
          infos: loopring_defs.DualProductAndPrice[]
          index: loopring_defs.DualIndex
          balance: loopring_defs.DualBalance[]
          rules: loopring_defs.DualRulesCoinsInfo[]
        }
        raw_data: R
      }
  > {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_DUAL_INFOS,
      queryParams: request,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    return {
      totalNum: raw_data?.totalNum,
      dualInfo: {
        infos: raw_data.infos as loopring_defs.DualProductAndPrice[],
        index: raw_data.index as loopring_defs.DualIndex,
        balance: raw_data.balance as loopring_defs.DualBalance[],
        rules: raw_data.rules as loopring_defs.DualRulesCoinsInfo[],
      },
      raw_data,
    }
  }

  public async getDualBalance<R>(request = undefined) {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_DUAL_BALANCE,
      queryParams: request,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      }
    }

    return {
      raw_data,
      dualBalanceMap: [...raw_data].reduce((prev, item) => {
        return { ...prev, [item.coin]: item }
      }, {} as loopring_defs.LoopringMap<loopring_defs.DualBalance>),
    }
  }

  public async getDualPrices(request: loopring_defs.GetDualPricesRequest) {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_DUAL_PRICES,
      queryParams: request,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    }
    const raw_data = (await this.makeReq().request(reqParams)).data

    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      }
    }

    return {
      raw_data,
      totalNum: raw_data?.totalNum,
      infos: raw_data.infos as loopring_defs.DualPrice[],
    }
  }

  public async getDualIndex(request: { baseSymbol: string; quoteSymbol: string }) {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_DUAL_INDEX,
      queryParams: request,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    }

    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    return {
      raw_data,
      dualPrice: raw_data as loopring_defs.DualPrice[],
    }
  }

  public async getDualTransactions(request: loopring_defs.GetUserDualTxRequest, apiKey: string) {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_DUAL_TRANSACTIONS,
      queryParams: {
        ...request,
        ...(request.retryStatuses ? { retryStatus: request.retryStatuses.join(',') } : {}),
      },
      apiKey,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      }
    }

    return {
      totalNum: raw_data?.totalNum,
      indexes: raw_data?.indexes,
      userDualTxs: raw_data.transactions as loopring_defs.UserDualTxsHistory[],
      raw_data,
    }
    return
  }

  public async orderDual(
    request: loopring_defs.DualOrderRequest,
    privateKey: string,
    apiKey: string,
  ) {
    const dataToSig = [
      request.exchange,
      request.storageId,
      request.accountId,
      request.sellToken.tokenId,
      request.buyToken.tokenId,
      request.sellToken.volume,
      request.buyToken.volume,
      request.validUntil,
      request.maxFeeBips,
      request.fillAmountBOrS ? 1 : 0,
      0,
    ]

    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.POST_DUAL_ORDER,
      bodyParams: request,
      apiKey,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.EDDSA_SIG_POSEIDON,
      sigObj: {
        dataToSig,
        sigPatch: SigPatchField.EddsaSignature,
        PrivateKey: privateKey,
      },
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    return this.returnTxHash(raw_data)
  }

  public async editDual(
    request: loopring_defs.DualEditRequest,
    privateKey: string,
    apiKey: string,
  ) {
    const { newOrder } = request
    let bodyParams = { ...request }
    if (newOrder) {
      const dataToSig = [
        newOrder.exchange,
        newOrder.storageId,
        newOrder.accountId,
        newOrder.sellToken.tokenId,
        newOrder.buyToken.tokenId,
        newOrder.sellToken.volume,
        newOrder.buyToken.volume,
        newOrder.validUntil,
        newOrder.maxFeeBips,
        newOrder.fillAmountBOrS ? 1 : 0,
        0,
      ]
      const eddsaSignature = getEdDSASigWithPoseidon(dataToSig, privateKey).result
      bodyParams = { ...bodyParams, newOrder: { ...newOrder, eddsaSignature } }
    }

    const _dataToSig: Map<string, any> = sortObjDictionary(bodyParams)
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.POST_DUAL_EDIT,
      bodyParams,
      apiKey,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.EDDSA_SIG,
      sigObj: {
        dataToSig: _dataToSig,
        PrivateKey: privateKey,
      },
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    return this.returnTxHash(raw_data)
  }

  public async getDualUserLocked(
    {
      lockTag = [loopring_defs.DUAL_TYPE.DUAL_BASE, loopring_defs.DUAL_TYPE.DUAL_CURRENCY],
      ...request
    }: loopring_defs.DualUserLockedRequest,
    apiKey: string,
  ) {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_DUAL_USER_LOCKED,
      queryParams: { ...request, lockTag: lockTag.join(',') },
      apiKey,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      }
    }

    return {
      lockRecord: raw_data.lockRecord,
      raw_data,
    }
    return
  }

  public async sendStakeClaim(
    req: loopring_defs.OriginStakeClaimRequestV3WithPatch,
    options?: { accountId?: number; counterFactualInfo?: any },
  ) {
    const { request, web3, chainId, eddsaKey, apiKey, isHWAddr: isHWAddrOld } = req
    const { accountId, counterFactualInfo }: any = options ? options : { accountId: 0 }
    const { transfer } = request

    const isHWAddr = !!isHWAddrOld
    let ecdsaSignature = undefined
    transfer.payeeId = 0
    transfer.memo = `STAKE-CLAIM->${request.accountId}`

    try {
      ecdsaSignature = await sign_tools.transferWrap({
        transfer: transfer as loopring_defs.OriginTransferRequestV3,
        chainId,
        web3,
        isHWAddr,
        accountId,
        counterFactualInfo,
      })
      // ecdsaSignature += isHWAddr ? SigSuffix.Suffix03 : SigSuffix.Suffix02
    } catch (error) {
      throw error
    }

    if (counterFactualInfo) {
      transfer.counterFactualInfo = counterFactualInfo
    }
    transfer.eddsaSignature = sign_tools.get_EddsaSig_Transfer(
      transfer as loopring_defs.OriginTransferRequestV3,
      eddsaKey,
    ).result
    transfer.ecdsaSignature = ecdsaSignature
    const dataToSig: Map<string, any> = sortObjDictionary(request)
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.POST_STAKE_CLAIM,
      bodyParams: request,
      apiKey,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.EDDSA_SIG,
      sigObj: {
        dataToSig,
        PrivateKey: eddsaKey,
      },
    }

    let raw_data
    try {
      raw_data = (await this.makeReq().request(reqParams)).data
      if (raw_data?.resultInfo) {
        return {
          ...raw_data?.resultInfo,
        }
      }
      return { raw_data, ...raw_data }
    } catch (error) {
      throw error as AxiosResponse
    }
    // return this.returnTxHash(raw_data);
    // const raw_data = (await this.makeReq().request(reqParams)).data;
  }

  public async sendStakeRedeem(
    request: {
      accountId: number
      hash: string
      token: loopring_defs.TokenVolumeV3
    },
    privateKey: string,
    apiKey: string,
  ) {
    const dataToSig: Map<string, any> = sortObjDictionary(request)
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.POST_STAKE_REDEEM,
      bodyParams: request,
      apiKey,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.EDDSA_SIG,
      sigObj: {
        dataToSig,
        PrivateKey: privateKey,
      },
    }

    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    return { raw_data, ...raw_data }
  }

  public async sendStake(
    request: {
      accountId: number
      token: loopring_defs.TokenVolumeV3
      timestamp: number
    },
    privateKey: string,
    apiKey: string,
  ) {
    const dataToSig: Map<string, any> = sortObjDictionary(request)
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.POST_STAKE,
      bodyParams: request,
      apiKey,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.EDDSA_SIG,
      sigObj: {
        dataToSig,
        PrivateKey: privateKey,
      },
    }

    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    return { raw_data, ...raw_data }
  }

  public async getStakeProducts<R>(): Promise<{
    products: loopring_defs.STACKING_PRODUCT[]
    raw_data: R
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_STAKE_PRODUCTS,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    }

    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    return { products: raw_data, raw_data }
  }

  public async getStakeSummary<R>(
    request: {
      accountId: number
      tokenId: number
      start?: number
      end?: number
      limit?: number
      offset?: number
      hashes?: string
      statuses?: string
    },
    apiKey: string,
  ): Promise<
    | {
        raw_data: R
        totalNum: number
        totalStaked: string
        totalStakedRewards: string
        totalLastDayPendingRewards: string
        totalClaimableRewards: string
        list: loopring_defs.StakeInfoOrigin[]
      }
    | RESULT_INFO
  > {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_STAKE_SUMMARY,
      queryParams: { ...request },
      apiKey,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    return { ...raw_data, list: raw_data.staking, raw_data }
  }

  public async getStakeTransactions<R>(
    request: {
      accountId: number
      tokenId: number
      start?: number
      end?: number
      limit?: number
      offset?: number
      hashes?: string
      types?: string
    },
    apiKey: string,
  ): Promise<{
    list: loopring_defs.STACKING_TRANSACTIONS[]
    totalNum: number
    raw_data: R
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_STAKE_TRANSACTIONS,
      queryParams: { ...request },
      apiKey,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    return {
      list: raw_data.transactions,
      totalNum: raw_data.totalNum,
      raw_data,
    }
  }

  public async getBtradeMarkets<R>(): Promise<{
    markets: loopring_defs.LoopringMap<loopring_defs.BTRADE_MARKET & { type: 'BTRADE' }>
    pairs: loopring_defs.LoopringMap<loopring_defs.TokenRelatedInfo>
    tokenArr: string[]
    tokenArrStr: string
    marketArr: string[]
    marketArrStr: string
    raw_data: R
  }> {
    const reqParams = {
      url: LOOPRING_URLs.GET_BTRATE_MARKETS,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    let result: any = {}

    const pairs: loopring_defs.LoopringMap<loopring_defs.TokenRelatedInfo> = {}

    // const isMix = url === LOOPRING_URLs.GET_MIX_MARKETS;

    if (raw_data instanceof Array) {
      const reformat = raw_data.reduce((prev, ele: loopring_defs.BTRADE_MARKET) => {
        if (/-/gi.test(ele.market)) {
          return [
            ...prev,
            {
              ...ele,
              btradeMarket: ele.market,
              market: ele.market.replace(BTRADENAME, ''),
              // enabled: true,
            } as loopring_defs.BTRADE_MARKET,
          ]
        } else {
          return prev
        }
      }, [] as loopring_defs.BTRADE_MARKET[])
      result = makeMarkets({ markets: reformat })
    }
    return {
      markets: result.markets,
      pairs: result.pairs,
      tokenArr: result.tokenArr,
      tokenArrStr: result.tokenArrStr,
      marketArr: result.marketArr,
      marketArrStr: result.marketArrStr,
      raw_data,
    }
  }

  public async getBtradeDepth<R>({
    request,
    tokenMap,
  }: {
    request: {
      market: string
      level: number
      limit?: number
    }
    tokenMap?: any
  }): Promise<{
    depth: loopring_defs.DepthData
    raw_data: R
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_BTRATE_DEPTH,
      queryParams: { ...request },
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      }
    }

    const symbol = raw_data.market
    const timestamp = raw_data.timestamp

    const { asks, bids, mid_price } = getMidPrice({
      _asks: raw_data.asks,
      _bids: raw_data.bids,
    })

    const depth: DepthData = {
      symbol,
      // @ts-ignore
      market: raw_data.market,
      version: raw_data.version,
      timestamp,
      mid_price,
      bids: bids.ab_arr,
      bids_prices: bids.ab_prices,
      bids_amtTotals: bids.ab_amtTotals,
      bids_volTotals: bids.ab_volTotals,
      bids_amtTotal: bids.amtTotal.toString(),
      bids_volTotal: bids.volTotal.toString(),
      asks: asks.ab_arr,
      asks_prices: asks.ab_prices,
      asks_amtTotals: asks.ab_amtTotals,
      asks_volTotals: asks.ab_volTotals,
      asks_amtTotal: asks.amtTotal.toString(),
      asks_volTotal: asks.volTotal.toString(),
    }

    return {
      depth,
      raw_data: raw_data as unknown as R,
    }
  }

  public async getBtradeOrders<R>({
    request,
    apiKey,
  }: {
    request: GetOrdersRequest
    apiKey: string
  }) {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_BTRATE_ORDERS,
      queryParams: { ...request },
      apiKey,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    return {
      //  baseSettled quoteSettled
      list: raw_data.transactions,
      totalNum: raw_data.totalNum,
      raw_data,
    }
  }

  public async sendBtradeOrder({
    request,
    privateKey,
    apiKey,
  }: {
    request: loopring_defs.OriginBTRADEV3OrderRequest
    privateKey: string
    apiKey: string
  }) {
    // const dataToSig: Map<string, any> = sortObjDictionary(request);
    const dataToSig = [
      request.exchange,
      request.storageId,
      request.accountId,
      request.sellToken.tokenId,
      request.buyToken.tokenId,
      request.sellToken.volume,
      request.buyToken.volume,
      request.validUntil,
      request.maxFeeBips,
      request.fillAmountBOrS ? 1 : 0,
      0,
    ]
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.POST_BTRATE_ORDER,
      bodyParams: request,
      apiKey,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.EDDSA_SIG_POSEIDON,
      sigObj: {
        dataToSig,
        sigPatch: SigPatchField.EddsaSignature,
        PrivateKey: privateKey,
      },
    }

    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    return { raw_data, ...raw_data }
  }
}
