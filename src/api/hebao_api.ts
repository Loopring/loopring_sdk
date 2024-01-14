/* eslint-disable camelcase  */
import { BaseAPI } from './base_api'
import { ReqMethod, ReqParams, SIG_FLAG } from '../defs'
import { sortObjDictionary } from '../utils'
import * as sign_tools from './sign/sign_tools'
import { ChallengeData } from '../defs/hebao_def'

export class HebaoAPI extends BaseAPI {
  public async lockCreateWalletGasSettings(
    request: {
      owner: string
      salt: string
      wallet: string
      ens?: string
      requestId: string
      inviteCode?: string
      network?: string
      isWaitDeposit?: boolean
      authentication?: {
        countryCode?: string
        phoneNumber?: string
        email?: string
        fromWallet?: {
          network: string
          address: string
        }
        createType?: number
        twoFactorRequest?: any // to type
      }
    },
    ecdsaPrivateKey: string,
  ) {
    const dataToSig: Map<string, any> = sortObjDictionary(request)
    const reqParams: ReqParams = {
      url: '/api/wallet/v3/lockCreateWalletGasSettings',
      bodyParams: request,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.ECDSA_SIG,
      sigObj: {
        dataToSig,
        ecdsaPrivateKey: ecdsaPrivateKey,
      },
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo.code === 0) {
      return {
        code: 0,
        data: raw_data.data as {
          orderId: number
          conditionType: number
          recommendedGasPrice: string
          base: {
            gasLimit: string
            discountPercentage: 80
            gasPrices: { [key: string]: string }
            originalPriceInUsd: string
            actualPriceInUsd: string
          }

          lockInfo: {
            from: number
            orderOverdueAt: number
            enqueueOverdueAt: number
            releaseAt: number
          }
          total: { [key: string]: string }
          ens: any
          walletAddress: any
          deposit: any
          contractData: {
            network: string
            contractVersion: string
            masterCopy: string
            walletFactory: string
          }
        },
      }
    } else {
      throw {
        code: raw_data?.resultInfo.code,
        message: raw_data?.resultInfo.message,
      }
    }
  }

  public async activateCreateWalletGasSettings(
    request: {
      owner: string
      wallet: string
      countryCode?: string
      phoneNumber?: string
      email?: string
      requestId: string
      securityId?: string // not needed when owner is not empty,
      network?: string
    },
    ecdsaPrivateKey: string,
  ) {
    const dataToSig: Map<string, any> = sortObjDictionary(request)
    const reqParams: ReqParams = {
      url: '/api/wallet/v3/activateCreateWalletGasSettings',
      bodyParams: request,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.ECDSA_SIG,
      sigObj: {
        dataToSig,
        ecdsaPrivateKey: ecdsaPrivateKey,
      },
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo.code === 0) {
      return {
        code: 0,
        data: raw_data.data as {
          orderId: number
          conditionType: number
          recommendedGasPrice: string
          base: {
            gasLimit: string
            discountPercentage: 80
            gasPrices: { [key: string]: string }
            originalPriceInUsd: string
            actualPriceInUsd: string
          }

          lockInfo: {
            from: number
            orderOverdueAt: number
            enqueueOverdueAt: number
            releaseAt: number
          }
          total: { [key: string]: string }
          ens: any
          walletAddress: any
          deposit: any
          contractData: {
            network: string
            contractVersion: string
            masterCopy: string
            walletFactory: string
          }
        },
      }
    } else {
      throw {
        code: raw_data?.resultInfo.code,
        message: raw_data?.resultInfo.message,
      }
    }
  }
  public async createWallet(
    request: {
      owner?: string
      salt?: string
      from?: string
      to?: string
      data?: string
      requestId: string
      securityId?: string
      inviteCode?: string
      network?: string
      isWaitDeposit?: boolean
      extra?: {
        captchaId: string
        lotNumber: string
        captchaOutput: string
        passToken: string
        genTime: string
      }
      authentication?: {
        countryCode?: string
        phoneNumber?: string
        email?: string
        fromWallet?: {
          network: string
          address: string
        }
        createType?: number
        twoFactorRequest?: any // to type
      }
    },
    ecdsaPrivateKey: string,
  ) {
    const dataToSig: Map<string, any> = sortObjDictionary(request)
    const reqParams: ReqParams = {
      url: '/api/wallet/v3/createWallet',
      bodyParams: request,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.ECDSA_SIG,
      sigObj: {
        dataToSig,
        ecdsaPrivateKey: ecdsaPrivateKey,
      },
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo.code === 0) {
      return {
        code: 0,
        data: raw_data.data as {
          orderId: number
          conditionType: number
          recommendedGasPrice: string
          base: {
            gasLimit: string
            discountPercentage: 80
            gasPrices: { [key: string]: string }
            originalPriceInUsd: string
            actualPriceInUsd: string
          }

          lockInfo: {
            from: number
            orderOverdueAt: number
            enqueueOverdueAt: number
            releaseAt: number
          }
          total: { [key: string]: string }
          ens: any
          walletAddress: any
          deposit: any
          contractData: {
            network: string
            contractVersion: string
            masterCopy: string
            walletFactory: string
          }
        } | ChallengeData,
      }
    } else {
      throw {
        code: raw_data?.resultInfo.code,
        message: raw_data?.resultInfo.message,
      }
    }
  }

  public async activateCreateWallet(
    request: {
      owner?: string
      from?: string
      data?: string
      countryCode?: string
      phoneNumber?: string
      email?: string
      requestId: string
      securityId?: string
      network?: string
      extra?: {
        feeCostType?: number
        layer2Transfer?: string
      }
    },
    ecdsaPrivateKey: string,
  ) {
    const dataToSig: Map<string, any> = sortObjDictionary(request)
    const reqParams: ReqParams = {
      url: '/api/wallet/v3/activateCreateWallet',
      bodyParams: request,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.ECDSA_SIG,
      sigObj: {
        dataToSig,
        ecdsaPrivateKey: ecdsaPrivateKey,
      },
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo.code === 0) {
      return {
        code: 0,
        data: raw_data.data as {
          orderId: number
          conditionType: number
          recommendedGasPrice: string
          base: {
            gasLimit: string
            discountPercentage: 80
            gasPrices: { [key: string]: string }
            originalPriceInUsd: string
            actualPriceInUsd: string
          }

          lockInfo: {
            from: number
            orderOverdueAt: number
            enqueueOverdueAt: number
            releaseAt: number
          }
          total: { [key: string]: string }
          ens: any
          walletAddress: any
          deposit: any
          contractData: {
            network: string
            contractVersion: string
            masterCopy: string
            walletFactory: string
          }
        },
      }
    } else {
      throw {
        code: raw_data?.resultInfo.code,
        message: raw_data?.resultInfo.message,
      }
    }
  }

  public async getEIP1559GasPrice<R>(request: { network: string }): Promise<{
    raw_data: R
  }> {
    const reqParams: ReqParams = {
      url: '/api/v3/eth/gasPrice/1559',
      queryParams: { network: request.network },
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
    }
  }
  public async computeWalletAddress<R>(request: {
    network?: string
    owner: string
    salt?: string
  }): Promise<{
    code: number
    message: string
    address: string
  }> {
    const reqParams: ReqParams = {
      url: '/api/wallet/v3/computeWalletAddress',
      queryParams: { network: request.network, salt: request.salt ?? '', owner: request.owner },
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    return {
      code: raw_data?.resultInfo.code as number,
      message: raw_data?.resultInfo.message as string,
      address: raw_data.data as string,
    }
  }
  public async verifyCode(request: { securityId: string; code: string }) {
    const reqParams: ReqParams = {
      url: '/api/risk/v2/verifyCode',
      queryParams: {
        sourceSystem: 'HeBao-1.1',
        securityId: request.securityId,
        code: request.code,
      },
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    }
    const res = await this.makeReq().request(reqParams)
    const raw_data = res.data
    return {
      code: raw_data?.resultInfo.code as number,
      message: raw_data?.resultInfo.message as string,
    }
    
  }
  // public async computeWalletAddress<R>(request: { network?: string, owner?: string, wallet?: string, timestamp: number }, ecdsaPrivateKey: string): Promise<{
  //   raw_data: R
  // }> {
  //   const reqParams: ReqParams = {
  //     url: '/api/wallet/v3/getWallet',
  //     queryParams: { network: request.network, owner: request.owner, wallet: request.wallet, timestamp: request.timestamp },
  //     method: ReqMethod.GET,
  //     sigFlag: SIG_FLAG.ECDSA_SIG,
  //     sigObj: {
  //       dataToSig: {},
  //       ecdsaPrivateKey: ecdsaPrivateKey,
  //     },
  //   }
  //   const raw_data = (await this.makeReq().request(reqParams)).data
  //   if (raw_data?.resultInfo) {
  //     return {
  //       ...raw_data?.resultInfo,
  //     }
  //   }
  //   return {
  //     raw_data,
  //   }
  // }
  public async getWallet(
    request: { network?: string; owner?: string; wallet?: string; timestamp: number },
    ecdsaPrivateKey: string,
  ): Promise<{
    raw_data: any
    id: number
    owner: string
    salt: string
    walletAddress: string
    ens: string
    phone: { 
      countryCode: string
      phoneNumber: string
    }
    email: string
    apiKey: string
    status: number
    lockExpiration: number
    modules: any[]
    contractData: {
      network: string
      contractVersion: string
      masterCopy: string
      walletFactoryVersion: string
      walletFactory: string
      ens: string
      walletStatus: number
      queueStatus: number
      isAvailable: boolean
      walletType: number
      isCounterFactual: boolean
      owner: string
      wallet: string
      extra: any
    }
    updatedAt: number
  }> {
    const reqParams: ReqParams = {
      url: '/api/wallet/v3/getWallet',
      queryParams: {
        network: request.network,
        owner: request.owner,
        wallet: request.wallet,
        timestamp: request.timestamp,
      },
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.ECDSA_SIG,
      sigObj: {
        dataToSig: {},
        ecdsaPrivateKey: ecdsaPrivateKey,
      },
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo.code === 0) {
      return {
        raw_data: raw_data,
        ...raw_data.data
      }
    } else {
      throw {
        code: raw_data?.resultInfo.code,
        message: raw_data?.resultInfo.message,
      }      
    }
    
  }
}
