import { BaseAPI } from './base_api'
import { ReqParams } from '../defs/loopring_defs'
import { LOOPRING_URLs, ReqMethod, SIG_FLAG } from '../defs'

export class VaultAPI extends BaseAPI {
  public async getVaultTokens<R>(): Promise<{ raw_data: R }> {
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
    return { raw_data }
  }
  public async getVaultMarkets<R>(): Promise<{ raw_data: R }> {
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
    return { raw_data }
  }
  public async getVaultGetAvailableNFT<R>(): Promise<{ raw_data: R }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_VAULT_GETAVAILABLENFT,
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
  public async getVaultInfoAndBalance<R>(): Promise<{ raw_data: R }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_VAULT_ACCOUNT,
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
  public async getVaultGetOperations<R>(): Promise<{ raw_data: R }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_VAULT_GETOPERATIONS,
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
  public async getVaultGetOperationByHash<R>(): Promise<{ raw_data: R }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_VAULT_GETOPERATIONBY_HASH,
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
  public async submitVaultJoin<R>(): Promise<{ raw_data: R }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.POST_VAULT_JOIN,
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
  public async submitVaultOrder<R>(): Promise<{ raw_data: R }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.POST_VAULT_ORDER,
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
  public async submitVaultExit<R>(): Promise<{ raw_data: R }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.POST_VAULT_EXIT,
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
}
