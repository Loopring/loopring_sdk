import { BaseAPI } from './base_api'
import {
  ReqParams,
  TokenInfo,
  VaultAccountInfo,
  VaultAvaiableNFT,
  VaultExitRequest,
  VaultMarket,
  VaultOperation,
  VaultOrder,
  VaultOrderNFTRequestV3WithPatch,
  VaultOrderRequest,
  VaultOrderResult,
  VaultToken,
} from '../defs/loopring_defs'
import { LOOPRING_URLs, ReqMethod, SIG_FLAG, SigPatchField } from '../defs'
import * as sdk from '../index'
import { sortObjDictionary } from '../index'
import * as loopring_defs from '../defs/loopring_defs'
import * as sign_tools from './sign/sign_tools'
import { AxiosResponse } from 'axios/index'

export class VaultAPI extends BaseAPI {
  public async getVaultTokens<R = VaultToken[]>(): Promise<{ raw_data: R; tokens: R }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_VAULT_TOKENS,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
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
  ): Promise<{
    raw_data: R[]
    userBalances: loopring_defs.LoopringMap<R>
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_VAULT_BALANCE,
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
  public async getVaultMarkets<R = VaultMarket[]>(): Promise<{ raw_data: R; markets: R }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_VAULT_MARKETS,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    return { raw_data, markets: raw_data }
  }
  public async getVaultGetAvailableNFT<R = VaultAvaiableNFT>(
    request: {
      accountId: number
    },
    apiKey: string,
  ): Promise<{ raw_data: R }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_VAULT_GETAVAILABLENFT,
      queryParams: request,
      apiKey,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    return { raw_data, ...raw_data }
  }
  public async getVaultInfoAndBalance<R = VaultAccountInfo>(
    request: {
      accountId: number
    },
    apiKey: string,
  ): Promise<{ raw_data: R } & R> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_VAULT_ACCOUNT,
      queryParams: request,
      apiKey,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
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
      operation: VaultOperation
      order: VaultOrder
    }>,
  >(
    request: {
      accountId: number
      operateTypes: string //  VaultOperationType seperate by ',',
      offset: number
      start?: number
      end?: number
      limit: number
    },
    apiKey: string,
  ): Promise<{ raw_data: { data: R[]; total: number; list: R[]; totalNum: number } }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_VAULT_GETOPERATIONS,
      queryParams: request,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    return { raw_data }
  }
  public async getVaultGetOperationByHash<
    R = {
      operation: VaultOperation
      order: VaultOrder
    },
  >(
    request: {
      accountId: string
      hash: string // OperationHash
    },
    apiKey: string,
  ): Promise<{ raw_data: R }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_VAULT_GETOPERATIONBY_HASH,
      queryParams: request,
      method: ReqMethod.GET,
      apiKey,
      sigFlag: SIG_FLAG.NO_SIG,
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    return { raw_data }
  }

  public async getVaultDepth<R>(): Promise<{ raw_data: R }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_VAULT_DEPTH,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    return { raw_data }
  }
  public async submitVaultJoin<R = VaultOrderResult>({
    request,
    eddsaKey,
    apiKey,
  }: VaultOrderNFTRequestV3WithPatch): Promise<{ raw_data: R }> {
    const takerOrderEddsaSignature = sdk.get_EddsaSig_NFT_Order(request, eddsaKey).result
    const _request = {
      ...request,
      eddsaSignature: takerOrderEddsaSignature,
    }
    const dataToSig: Map<string, any> = sortObjDictionary(_request)
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.POST_VAULT_JOIN,
      bodyParams: _request,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.EDDSA_SIG,
      sigObj: {
        dataToSig,
        PrivateKey: eddsaKey,
      },
      apiKey,
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    return { raw_data }
  }
  public async submitVaultOrder<R>({
    request,
    privateKey,
    apiKey,
  }: {
    request: VaultOrderRequest
    privateKey: string
    apiKey: string
  }): Promise<{ raw_data: R }> {
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
      url: LOOPRING_URLs.POST_VAULT_ORDER,
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
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    return { raw_data }
  }
  public async submitVaultExit<R>({
    request,
    privateKey,
    apiKey,
  }: {
    request: VaultExitRequest
    privateKey: string
    apiKey: string
  }): Promise<{ raw_data: R }> {
    const dataToSig: Map<string, any> = sortObjDictionary(request)
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.POST_VAULT_EXIT,
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
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    return { raw_data, ...raw_data }
  }

  public async submitVaultTransfer<R>(): Promise<{ raw_data: R }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.POST_VAULT_TRANSFER,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.NO_SIG,
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    return { raw_data }
  }

  //TODO
  public async getVaultInfos<R>(): Promise<{ raw_data: R }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_VAULT_INFOS,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
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
  ) {
    const { request, web3, chainId, eddsaKey, apiKey, isHWAddr: isHWAddrOld } = req
    const { counterFactualInfo }: any = options ? options : { accountId: 0 }
    let ecdsaSignature = undefined
    request.eddsaSignature = sign_tools.get_EddsaSig_Transfer(request, eddsaKey).result
    if (counterFactualInfo) {
      request.counterFactualInfo = counterFactualInfo
    }
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.POST_INTERNAL_TRANSFER,
      bodyParams: request,
      apiKey,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.NO_SIG,
      ecdsaSignature,
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
}
