import { BaseAPI } from './base_api'
import * as loopring_defs from '../defs'
import { get_EddsaSig_NFT_Order, getMidPrice, sortObjDictionary } from '../index'
import * as sign_tools from './sign/sign_tools'
import { AxiosResponse } from 'axios'

export class VaultAPI extends BaseAPI {
  public async getVaultTokens<R = loopring_defs.VaultToken[]>(apiVersion?: string): Promise<{
    raw_data: R
    tokens: R
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.GET_VAULT_TOKENS,
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
      extraHeaders: apiVersion
        ? {
            'X-API-VERSION': apiVersion,
          }
        : undefined,
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    return { raw_data, tokens: raw_data }
  }
  public async getVaultBalance<R = loopring_defs.UserBalanceInfo>(
    request: loopring_defs.GetUserBalancesRequest,
    apiKey: string,
    apiVersion?: string
  ): Promise<{
    raw_data: R[]
    userBalances: loopring_defs.LoopringMap<R>
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.GET_VAULT_BALANCE,
      queryParams: request,
      apiKey,
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
      extraHeaders: apiVersion
        ? {
            'X-API-VERSION': apiVersion,
          }
        : undefined,
    }

    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    const userBalances: loopring_defs.LoopringMap<R> = {}

    if (raw_data instanceof Array) {
      raw_data.forEach((item) => {
        userBalances[item.tokenId] = item
      })
    }

    return {
      userBalances,
      raw_data,
    }
  }
  public async getVaultMarkets<R = loopring_defs.VaultMarket[]>(apiVersion?: string): Promise<{
    raw_data: R
    markets: R
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.GET_VAULT_MARKETS,
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
      extraHeaders: apiVersion
        ? {
            'X-API-VERSION': apiVersion,
          }
        : undefined,
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    return { raw_data, markets: raw_data }
  }
  public async getVaultGetAvailableNFT<R = loopring_defs.VaultAvaiableNFT>(
    request: {
      accountId: number
    },
    apiKey: string,
    apiVersion?: string
  ): Promise<{ raw_data: R }> {
    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.GET_VAULT_GETAVAILABLENFT,
      queryParams: request,
      apiKey,
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
      extraHeaders: apiVersion
        ? {
            'X-API-VERSION': apiVersion,
          }
        : undefined,
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    return { raw_data, ...raw_data }
  }
  public async getVaultInfoAndBalance<R = loopring_defs.VaultAccountInfo>(
    request: {
      accountId: number
    },
    apiKey: string,
    apiVersion?: string
  ): Promise<{ raw_data: R } & R> {
    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.GET_VAULT_ACCOUNT,
      queryParams: request,
      apiKey,
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
      extraHeaders: apiVersion
        ? {
            'X-API-VERSION': apiVersion,
          }
        : undefined,
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    return { raw_data, ...raw_data }
  }

  public async getVaultGetOperationHistory<
    R = Array<{
      operation: loopring_defs.VaultOperation
      order: loopring_defs.VaultOrder
    }>,
  >(
    request: {
      accountId: number
      operateTypes: loopring_defs.VaultOperationEnum[] | string //  VaultOperationType seperate by ',',
      offset: number
      start?: number
      end?: number
      limit: number
    },
    apiKey: string,
    apiVersion?: string
  ): Promise<{ raw_data: { data: R[]; total: number } } & { list: R[]; totalNum: number }> {
    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.GET_VAULT_GETOPERATIONS,
      queryParams: {
        ...request,
        operateTypes:
          typeof request.operateTypes === 'string'
            ? request.operateTypes
            : request.operateTypes.join(','),
      },
      method: loopring_defs.ReqMethod.GET,
      apiKey,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
      extraHeaders: apiVersion
        ? {
            'X-API-VERSION': apiVersion,
          }
        : undefined,
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    return { raw_data, list: raw_data.data as R[], totalNum: raw_data.total }
  }
  public async getVaultGetOperationByHash<
    R = {
      operation: loopring_defs.VaultOperation
      order: loopring_defs.VaultOrder
    },
  >(
    request: {
      accountId: string
      hash: string // OperationHash
    },
    apiKey: string,
    apiVersion?: string
  ): Promise<R & { raw_data: R }> {
    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.GET_VAULT_GETOPERATIONBY_HASH,
      queryParams: request,
      method: loopring_defs.ReqMethod.GET,
      apiKey,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
      extraHeaders: apiVersion
        ? {
            'X-API-VERSION': apiVersion,
          }
        : undefined,
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    return { raw_data, ...raw_data }
  }

  public async getVaultDepth<R>({
    request,
  }: // tokenMap,
  {
    request: {
      market: string
      level: number
      limit?: number
    }
    tokenMap?: any
  }, apiVersion?: string): Promise<{
    depth: loopring_defs.DepthData
    raw_data: R
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.GET_VAULT_DEPTH,
      queryParams: { ...request },
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
      extraHeaders: apiVersion
        ? {
            'X-API-VERSION': apiVersion,
          }
        : undefined,
    }
    const raw_data = (await this.makeReq().request(reqParams)).data

    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
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

    const depth: loopring_defs.DepthData = {
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
  public async submitVaultJoin<R = loopring_defs.VaultOrderResult>({
    request,
    eddsaKey,
    apiKey,
  }: loopring_defs.VaultOrderNFTRequestV3WithPatch, apiVersion?: string) {
    const takerOrderEddsaSignature = get_EddsaSig_NFT_Order(request, eddsaKey).result
    const _request = {
      ...request,
      eddsaSignature: takerOrderEddsaSignature,
    }
    const dataToSig: Map<string, any> = sortObjDictionary(_request)
    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.POST_VAULT_JOIN,
      bodyParams: _request,
      method: loopring_defs.ReqMethod.POST,
      sigFlag: loopring_defs.SIG_FLAG.EDDSA_SIG,
      sigObj: {
        dataToSig,
        PrivateKey: eddsaKey,
      },
      apiKey,
      extraHeaders: apiVersion
        ? {
            'X-API-VERSION': apiVersion,
          }
        : undefined,
    }
    try {
      const raw_data = (await this.makeReq().request(reqParams)).data
      return this.returnTxHash(raw_data)
    } catch (error) {
      throw error as AxiosResponse
    }
  }
  public async submitVaultOrder<R>({
    request,
    privateKey,
    apiKey,
  }: {
    request: loopring_defs.VaultOrderRequest
    privateKey: string
    apiKey: string
  }, apiVersion?: string) {
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
      url: loopring_defs.LOOPRING_URLs.POST_VAULT_ORDER,
      bodyParams: request,
      apiKey,
      method: loopring_defs.ReqMethod.POST,
      sigFlag: loopring_defs.SIG_FLAG.EDDSA_SIG_POSEIDON,
      sigObj: {
        dataToSig,
        sigPatch: loopring_defs.SigPatchField.EddsaSignature,
        PrivateKey: privateKey,
      },
      extraHeaders: apiVersion
        ? {
            'X-API-VERSION': apiVersion,
          }
        : undefined,
    }
    try {
      const raw_data = (await this.makeReq().request(reqParams)).data
      return this.returnTxHash(raw_data)
    } catch (error) {
      throw error as AxiosResponse
    }
  }
  
  public async submitVaultExit<R>({
    request,
    privateKey,
    apiKey,
  }: {
    request: loopring_defs.VaultExitRequest
    privateKey: string
    apiKey: string
  }, apiVersion?: string) {
    const dataToSig: Map<string, any> = sortObjDictionary(request)
    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.POST_VAULT_EXIT,
      bodyParams: request,
      apiKey,
      method: loopring_defs.ReqMethod.POST,
      sigFlag: loopring_defs.SIG_FLAG.EDDSA_SIG,
      sigObj: {
        dataToSig,
        PrivateKey: privateKey,
      },
      extraHeaders: apiVersion
        ? {
            'X-API-VERSION': apiVersion,
          }
        : undefined,
    }
    try {
      const raw_data = (await this.makeReq().request(reqParams)).data
      return this.returnTxHash(raw_data)
    } catch (error) {
      throw error as AxiosResponse
    }
  }

  public async submitVaultTransfer<R>(apiVersion?: string) {
    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.POST_VAULT_TRANSFER,
      method: loopring_defs.ReqMethod.POST,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
      extraHeaders: apiVersion
        ? {
            'X-API-VERSION': apiVersion,
          }
        : undefined,
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    return { raw_data }
  }
  public async submitVaultBorrow<R>({
    request,
    privateKey,
    apiKey,
  }: {
    request: loopring_defs.VaultBorrowRequest
    privateKey: string
    apiKey: string
  }, apiVersion?: string) {
    const dataToSig: Map<string, any> = sortObjDictionary(request)
    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.POST_VAULT_LOAN,
      bodyParams: request,
      apiKey,
      method: loopring_defs.ReqMethod.POST,
      sigFlag: loopring_defs.SIG_FLAG.EDDSA_SIG,
      sigObj: {
        dataToSig,
        PrivateKey: privateKey,
      },
      extraHeaders: apiVersion
        ? {
            'X-API-VERSION': apiVersion,
          }
        : undefined,
    }
    try {
      const raw_data = (await this.makeReq().request(reqParams)).data
      return this.returnTxHash(raw_data)
    } catch (error) {
      throw error as AxiosResponse
    }
  }

  public async submitVaultRepay<R>(
    req: loopring_defs.VaultRepayRequestV3WithPatch,
    options?: { accountId?: number; counterFactualInfo?: any },
    apiVersion?: string
  ) {
    let { request, eddsaKey, apiKey } = req
    const { counterFactualInfo }: any = options ? options : { accountId: 0 }
    let eddsaSignature = sign_tools.get_EddsaSig_Transfer(request, eddsaKey)?.result
    request = {
      ...request,
      eddsaSignature,
    }
    if (counterFactualInfo) {
      request.counterFactualInfo = counterFactualInfo
    }
    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.POST_VAULT_REPAY,
      bodyParams: request,
      apiKey,
      method: loopring_defs.ReqMethod.POST,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
      ecdsaSignature: undefined,
      extraHeaders: apiVersion
        ? {
            'X-API-VERSION': apiVersion,
          }
        : undefined,
    }

    try {
      const raw_data = (await this.makeReq().request(reqParams)).data
      return this.returnTxHash(raw_data)
    } catch (error) {
      throw error as AxiosResponse
    }
  }

  public async getVaultConfig(apiKey: string, apiVersion?: string): Promise<{ data: {penaltyFeeBips: number} }> {
    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.GET_VAULT_CONFIG,
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
      apiKey,
      extraHeaders: apiVersion
        ? {
            'X-API-VERSION': apiVersion,
          }
        : undefined,
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    return { data: raw_data }
  }

  public async getVaultInfos<R>(): Promise<{ raw_data: R }> {
    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.GET_VAULT_INFOS,
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    return { raw_data }
  }

  public async sendVaultResetToken(
    req: loopring_defs.OriginTransferRequestV3WithPatch,
    options?: { accountId?: number; counterFactualInfo?: any },
    apiVersion?: string
  ) {
    let { request, eddsaKey, apiKey } = req
    const { counterFactualInfo }: any = options ? options : { accountId: 0 }
    let eddsaSignature = sign_tools.get_EddsaSig_Transfer(request, eddsaKey)?.result
    request = {
      ...request,
      eddsaSignature,
    }
    if (counterFactualInfo) {
      request.counterFactualInfo = counterFactualInfo
    }
    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.POST_INTERNAL_TRANSFER,
      bodyParams: request,
      apiKey,
      method: loopring_defs.ReqMethod.POST,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
      ecdsaSignature: undefined,
      extraHeaders: apiVersion
        ? {
            'X-API-VERSION': apiVersion,
          }
        : undefined,
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
  }

  public async getVaultPrice(request: { tokenIds: string | number[] }, apiVersion?: string) {
    // let { request, eddsaKey, apiKey } = req
    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.GET_VAULT_PRICE,
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
      queryParams: {
        ...request,
        tokenIds:
          typeof request.tokenIds === 'string' ? request?.tokenIds : request.tokenIds?.join(','),
      },
      extraHeaders: apiVersion
        ? {
            'X-API-VERSION': apiVersion,
          }
        : undefined,
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      }
    } else {
      return {
        list: [...raw_data],
        raw_data,
      }
    }
  }

  public async getCredit(request: { accountId: number }, apiKey: string, apiVersion?: string) {
    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.GET_VAULT_CREDIT,
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
      queryParams: {
        ...request
      },
      apiKey,
      extraHeaders: apiVersion
        ? {
            'X-API-VERSION': apiVersion,
          }
        : undefined,
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      throw {
        ...raw_data?.resultInfo,
      }
    } else {
      return {
        tokenFactors: raw_data.tokenFactors as {
          symbol: string
          factor: string
        }[],
        maxLeverage: raw_data.maxLeverage as string
      }
    }
  }
  public async getCollaterals(request: { accountId: number }, apiKey: string, apiVersion?: string) {
    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.GET_VAULT_COLLATERALS,
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
      queryParams: {
        ...request
      },
      apiKey,
      extraHeaders: apiVersion
        ? {
            'X-API-VERSION': apiVersion,
          }
        : undefined,
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      throw {
        ...raw_data?.resultInfo,
      }
    } else {
      return {
        collateralTokens: raw_data.data as {
          orderHash: string
          collateralTokenId: number
          collateralTokenAmount: string
          nftTokenId: number
          nftData: string
        }[]
      }
    }
  }
  public async submitLeverage<R>({
    request,
    // privateKey,
    apiKey,
  }: {
    request: {
      accountId: string
      leverage: string
    }
    apiKey: string
  }, apiVersion?: string) {
    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.GET_VAULT_SUBMIT_LEVERAGE,
      bodyParams: request,
      apiKey,
      method: loopring_defs.ReqMethod.POST,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
      extraHeaders: apiVersion
        ? {
            'X-API-VERSION': apiVersion,
          }
        : undefined,
    }
    try {
      const raw_data = (await this.makeReq().request(reqParams)).data
      return raw_data
    } catch (error) {
      throw error as AxiosResponse
    }
  }
  public async submitDustCollector(
    req: loopring_defs.VaultDustCollectorRequest, apiVersion?: string
  ) {
    let { dustTransfers, eddsaKey, apiKey, accountId } = req
    const signedDustTransfers = dustTransfers.map(dustTransfer => {
      const eddsaSignature= sign_tools.get_EddsaSig_Transfer(dustTransfer, eddsaKey)?.result
      return {
        ...dustTransfer,
        eddsaSignature
      }
    })
    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.GET_VAULT_SUBMIT_DUST_COLLECTOR,
      bodyParams: {
        dustTransfers: signedDustTransfers,
        accountId
      },
      apiKey,
      method: loopring_defs.ReqMethod.POST,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
      extraHeaders: apiVersion
        ? {
            'X-API-VERSION': apiVersion,
          }
        : undefined,
    }
    try {
      const raw_data = (await this.makeReq().request(reqParams)).data
      return {
        hash: raw_data.hash as string
      }
    } catch (error) {
      throw error as AxiosResponse
    }
  }
  
  public async getMaxBorrowable(request: { accountId: number, symbol: string }, apiKey: string, apiVersion?: string) {
    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.GET_VAULT_GEMAX_BORROWABLE,
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
      queryParams: {
        ...request
      },
      apiKey,
      extraHeaders: apiVersion
        ? {
            'X-API-VERSION': apiVersion,
          }
        : undefined,
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      throw {
        ...raw_data?.resultInfo,
      }
    } else {
      return raw_data as {
        accountId: number
        maxBorrowableOfUsdt: string
      }
    }
  }

  public async closeShort<R>(
    {
      request,
    }: {
      request: {
        accountId: number
        tokenId: number
        timestamp: number
      }
    },
    apiKey: string,
    eddsaKey: string,
  ) {
    const dataToSig: Map<string, any> = sortObjDictionary(request)
    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.GET_VAULT_CLOSE_SHORT,
      bodyParams: request,
      apiKey,
      method: loopring_defs.ReqMethod.POST,
      sigFlag: loopring_defs.SIG_FLAG.EDDSA_SIG,
      sigObj: {
        dataToSig,
        PrivateKey: eddsaKey,
      },
    }
    try {
      const raw_data = (await this.makeReq().request(reqParams)).data
      return raw_data
    } catch (error) {
      throw error as AxiosResponse
    }
  }
}
