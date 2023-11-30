import { BaseAPI } from './base_api'
import * as loopring_defs from '../defs'
import { sortObjDictionary } from '../utils'

const GLOBAL_KEY = {
  GOERLI: {
    key: '685xvATlBCsvzyiTxaS02vu0b1xN0DAFpNpslKUNCuSxDhx8gyyz8VmvUqqe5HSQ',
    id: 10013,
  },
  MAIN: {
    key: 're356TcrQ6KhlpkvWxP4UN0C4EqxQVV7ZjvLjunwTjaQPZ20ue2ZgClFeT7okpDQ',
    id: 22638,
  },
}

export class GlobalAPI extends BaseAPI {
  public async getActiveFeeInfo(request: { accountId?: number }) {
    const _request: loopring_defs.GetOffchainFeeAmtRequest = {
      accountId: request.accountId
        ? request.accountId
        : this.chainId === loopring_defs.ChainId.MAINNET
        ? GLOBAL_KEY.MAIN.id
        : GLOBAL_KEY.GOERLI.id,
      requestType: loopring_defs.OffchainFeeReqType.UPDATE_ACCOUNT,
    }
    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.GET_OFFCHAIN_FEE_AMT,
      queryParams: _request,
      apiKey:
        this.chainId === loopring_defs.ChainId.MAINNET
          ? GLOBAL_KEY.MAIN.key
          : GLOBAL_KEY.GOERLI.key,
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    const gasPrice = parseInt(raw_data.gasPrice)
    const fees: loopring_defs.LoopringMap<loopring_defs.OffchainFeeInfo> = {}
    if (raw_data?.fees instanceof Array) {
      raw_data.fees.forEach((item: loopring_defs.OffchainFeeInfo) => {
        fees[item.token] = item
      })
    }

    return {
      fees,
      gasPrice,
      raw_data,
    }
  }
  public async getUserBalanceForFee(request: { accountId: number; tokens: string }) {
    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.GET_USER_EXCHANGE_BALANCES,
      queryParams: request,
      apiKey:
        this.chainId === loopring_defs.ChainId.MAINNET
          ? GLOBAL_KEY.MAIN.key
          : GLOBAL_KEY.GOERLI.key,
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
    }

    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    const userBalances: loopring_defs.LoopringMap<loopring_defs.UserBalanceInfo> = {}

    if (raw_data instanceof Array) {
      raw_data.forEach((item: loopring_defs.UserBalanceInfo) => {
        userBalances[item.tokenId] = item
      })
    }

    return {
      userBalances,
      raw_data,
    }
  }
  public async getAmmPoolGameUserRank<R>(
    request: loopring_defs.GetAmmPoolGameUserRankRequest,
  ): Promise<{
    raw_data: R
    userRank: loopring_defs.GameRankInfo
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.GET_AMMPOOL_GAME_USER_RANK,
      queryParams: request,
      apiKey:
        this.chainId === loopring_defs.ChainId.MAINNET
          ? GLOBAL_KEY.MAIN.key
          : GLOBAL_KEY.GOERLI.key,
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data.resultInfo,
      }
    }
    const userRank: loopring_defs.GameRankInfo = raw_data.data
    return {
      userRank,
      raw_data: raw_data.data,
    }
  }
  public async getBanxaAPI<R>(
    {
      method,
      query,
      payload,
      url,
      accountId,
    }: {
      method: loopring_defs.ReqMethod
      query: string
      payload: string
      url: string
      accountId: number
    },
    eddsaKey: string,
    apiKey: string,
  ): Promise<{
    result: R
    raw_data: R
  }> {
    const queryParams = {
      accountId,
      url,
      method: method.toString(),
      query: query,
      payload: payload ? payload : '',
    }
    const dataToSig = sortObjDictionary({
      ...queryParams,
      url: encodeURIComponent(queryParams.url),
      query: encodeURIComponent(queryParams.query),
      payload: encodeURIComponent(queryParams.payload),
    })
    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.GET_BANXA_API_KEY,
      method: loopring_defs.ReqMethod.GET,
      queryParams,
      apiKey,
      sigFlag: loopring_defs.SIG_FLAG.EDDSA_SIG,
      sigObj: {
        PrivateKey: eddsaKey,
        dataToSig: dataToSig,
      },
    }

    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data.resultInfo,
      }
    }
    return {
      result: raw_data.result,
      raw_data: raw_data,
    }
  }
  // public async getBanxaAPIRequest<R>({}) {}
  // http://dev.loopring.io?method=GET&query=/api/coins&payload
}
