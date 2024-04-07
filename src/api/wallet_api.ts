import { BaseAPI, personalSign } from './base_api'
import { sendRawTx } from './contract_api'
import * as loopring_defs from '../defs'
import { contracts as abi } from './ethereum/contracts'
import * as sign_tools from './sign/sign_tools'
import { sortObjDictionary, toHex } from '../utils'
import { myLog } from '../utils/log_tools'
import { AxiosResponse } from 'axios'
import { signHebaoApproveWrap } from './config'

export class WalletAPI extends BaseAPI {
  /*
   * Get user assets
   */
  public async getUserAssets(request: loopring_defs.GetUserAssetsRequest) {
    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.GET_USER_ASSETS,
      queryParams: request,
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
    }

    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      }
    }

    const assetSeries: string[] = []
    const timestampSeries: number[] = []
    const dateSeries: string[] = []

    if (raw_data?.data instanceof Array) {
      raw_data.data.forEach((item: loopring_defs.UserAssetInfo) => {
        assetSeries.push(item.amount)
        timestampSeries.push(item.createdAt)
        dateSeries.push(item.createdAtStr)
      })
    }

    return {
      assetSeries,
      timestampSeries,
      dateSeries,
      userAssets: raw_data.data as loopring_defs.UserAssetInfo[],
      raw_data,
    }
  }

  /**
   *
   * @param approveRecordId  request.id
   */
  public async rejectHebao(req: loopring_defs.RejectHebaoRequestV3WithPatch) {
    const { web3, address, request, chainId } = req
    const dataToSig = sortObjDictionary(request)
    const { hashRaw } = sign_tools.creatEdDSASigHasH({
      method: loopring_defs.ReqMethod.POST,
      basePath: this.baseUrl,
      api_url: loopring_defs.LOOPRING_URLs.REJECT_APPROVE_SIGNATURE,
      requestInfo: dataToSig,
    })
    myLog('signHash', hashRaw)
    const result: any = await personalSign(
      web3,
      address,
      '',
      toHex(hashRaw),
      loopring_defs.ConnectorNames.Unknown,
      chainId,
    )

    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.REJECT_APPROVE_SIGNATURE,
      queryParams: {},
      method: loopring_defs.ReqMethod.POST,
      bodyParams: request,
      apiKey: '',
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
      sigObj: {
        sig: result?.sig.slice(0, 132),
      },
    }

    let hash: string | undefined = undefined
    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      }
    } else {
      hash = raw_data.data
    }
    return {
      hash,
      raw_data,
    }
  }

  public async submitApproveSignature<T extends loopring_defs.TX_HASH_API>(
    req: loopring_defs.SubmitApproveSignatureRequestWithPatch,
    guardians: string[] = [],
    isContract1XAddress?: boolean,
    masterCopy?: string,
    forwarderModuleAddress: string = '',
  ): Promise<loopring_defs.TX_HASH_RESULT<T> | loopring_defs.RESULT_INFO> {
    const {
      request,
      web3,
      chainId,
      // walletType,
      guardian,
      apiKey,
      isHWAddr: isHWAddrOld,
    } = req
    const isHWAddr = !!isHWAddrOld
    let ecdsaSignature = undefined
    ecdsaSignature = await signHebaoApproveWrap({
      chainId,
      web3,
      owner: request.signer,
      isHWAddr,
      wallet: guardian.signedRequest.wallet,
      validUntil: guardian.signedRequest.validUntil,
      messageData: guardian?.businessDataJson?.value?.value ?? {},
      masterCopy: isContract1XAddress ? undefined : masterCopy,
      forwarderModuleAddress,
      type: guardian.type,
      guardian,
      walletVersion: isContract1XAddress ? 1 : 2,
    })
    request.signature = ecdsaSignature?.toString()
    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.SUBMIT_APPROVE_SIGNATURE,
      bodyParams: request,
      apiKey,
      method: loopring_defs.ReqMethod.POST,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
    }

    let raw_data
    try {
      raw_data = (await this.makeReq().request(reqParams)).data
    } catch (error) {
      throw error as AxiosResponse
    }
    return this.returnTxHash(raw_data) as loopring_defs.TX_HASH_RESULT<T>
  }

  public async getAddressByENS<R extends any, T extends string>(
    request: loopring_defs.GetEnsAddressRequest,
  ): Promise<{
    address: string | undefined
    raw_data: R
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.RESOLVE_ENS,
      queryParams: request,
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
    }
    let address: T | undefined
    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      }
    } else {
      address = raw_data.data as T
    }
    return {
      address,
      raw_data,
    }
  }

  public async getWalletType<T extends any>(
    request: loopring_defs.GET_WALLET_TYPE,
  ): Promise<{
    walletType: loopring_defs.WalletType | undefined
    raw_data: T
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.GET_WALLET_TYPE,
      queryParams: request,
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
    }
    let walletType: loopring_defs.WalletType | undefined
    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      }
    } else {
      walletType = raw_data.data
    }
    return {
      walletType,
      raw_data,
    }
  }

  public async getContractType<T = loopring_defs.ContractType>(
    request: loopring_defs.GET_WALLET_TYPE,
  ): Promise<{
    contractType: T | undefined
    raw_data: T
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.GET_WALLET_CONTRACTVERSION,
      queryParams: request,
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    let contractType: T | undefined
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      }
    } else {
      contractType = raw_data.data[0]
    }
    return {
      contractType,
      raw_data,
    }
  }

  public async getWalletModules<T = loopring_defs.ModuleType>(
    request: loopring_defs.GET_WALLET_TYPE,
  ): Promise<{
    walletModule: T | undefined
    raw_data: T
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.GET_WALLET_MODULES,
      queryParams: request,
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    let walletModule: T | undefined
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      }
    } else {
      walletModule = raw_data.data[0]
    }
    return {
      walletModule,
      raw_data,
    }
  }

  public async getEnsByAddress<R extends any, T extends string>(
    request: loopring_defs.GetEnsNameRequest,
  ): Promise<{
    ensName: string | undefined
    raw_data: R
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.RESOLVE_NAME,
      queryParams: request,
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
    }
    let ensName: T | undefined
    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      }
    } else {
      ensName = raw_data.data as T
    }
    return {
      ensName,
      raw_data,
    }
  }

  public async lockHebaoWallet({
    web3,
    from,
    contractAddress,
    gasPrice,
    gasLimit = '0x' + Number(150000).toString(16),
    chainId = 1,
    wallet,
    nonce,
    isVersion1,
  }: // sendByMetaMask = true,
  loopring_defs.LockHebaoHebaoParam) {
    if (isVersion1) {
      const data = abi.Contracts.HeBao.encodeInputs('lock', {
        wallet,
      })

      return await sendRawTx(
        web3,
        from,
        contractAddress,
        0,
        data,
        chainId as loopring_defs.ChainId,
        nonce,
        gasPrice,
        gasLimit,
        true,
      )
    } else {
      return await sendRawTx(
        web3,
        from,
        contractAddress,
        0,
        '0xf83d08ba',
        chainId as loopring_defs.ChainId,
        nonce,
        gasPrice,
        gasLimit,
        true,
      )
    }
  }

  public async getHebaoConfig(request: { network?: loopring_defs.NetworkWallet }) {
    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.GET_HEBAO_CONFIG,
      queryParams: request,
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    return { raw_data: raw_data.data }
  }

  public async sendMetaTx<R extends any, T extends any>(
    request: loopring_defs.SendMetaTxRequest,
    apiKey: string,
  ): Promise<{
    raw_data: R
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.SEND_META_TX,
      apiKey,
      method: loopring_defs.ReqMethod.POST,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
      bodyParams: request,
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    return { raw_data }
  }

  public async getGuardianApproveList<R extends any, T extends loopring_defs.Guardian>(
    request: loopring_defs.GetGuardianApproveListRequest,
  ): Promise<{
    guardiansArray: Array<T>
    raw_data: R
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.GET_GUARDIAN_APPROVE_LIST,
      queryParams: request,
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
    }
    let guardiansArray: Array<T> = []
    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      }
    } else {
      guardiansArray =
        raw_data?.data?.guardians?.map((r: any) => ({
          ens: r.ens ? r.ens : '',
          address: r.wallet,
          type: loopring_defs.HEBAO_META_TYPE[r.metaTxType],
          id: r.approveId,
          messageHash: r.txAwareHash,
          businessDataJson: r.businessDataJson,
          signedRequest: r.signedRequest,
          ...r,
        })) ?? []
    }
    return {
      guardiansArray,
      raw_data,
    }
  }

  // /api/appWallet/v3/operationLogs?from=0x189a3c44a39c5ab22712543c0f62a9833bbe8df9&fromTime=0&to=&offset=0&network=ETHEREUM&statues=&hebaoTxType=&limit=20

  /**
   * getProtectors
   * @param {GetUserTradesRequest} request
   * @param apiKey
   */
  public async getProtectors<R extends any, T extends loopring_defs.Protector>(
    request: loopring_defs.GetProtectorRequest,
    apiKey: string,
  ): Promise<{
    protectorArray: Array<T>

    raw_data: R
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.GET_PROTECTORS,
      apiKey: apiKey,
      queryParams: request,
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
    }
    let protectorArray: Array<T> = []
    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      }
    } else {
      protectorArray =
        raw_data?.data?.map((p: any) => ({
          ens: p.protectEns,
          address: p.protectAddress,
          lockStatus: p.walletStatus?.toUpperCase(),
        })) ?? []
    }
    return {
      protectorArray,
      raw_data,
    }
  }

  /*
   * Get user trade amount
   */
  public async getHebaoOperationLogs<R extends any, T extends loopring_defs.HebaoOperationLog>(
    request: loopring_defs.HebaoOperationLogs,
  ): Promise<{
    operationArray: Array<T>
    raw_data: R
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.GET_OPERATION_LOGS,
      queryParams: request,
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    return {
      operationArray: raw_data?.data ?? ([] as T[]),
      raw_data,
    }
  }

  /*
   * Get user trade amount
   */
  public async getUserTradeAmount(request: loopring_defs.GetUserTradeAmount) {
    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.GET_USER_TRADE_AMOUNT,
      queryParams: request,
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    return {
      raw_data,
    }
  }

  /*
   * Get token prices
   * e.g. http://api3.loopring.io/api/wallet/v3/tokenPrices?token=0xdac17f958d2ee523a2206206994597c13d831ec7&intervalType=1&limit=30&currency=CNY
   */
  public async getTokenPrices(request: loopring_defs.GetTokenPricesRequest) {
    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.GET_TOKEN_PRICES,
      queryParams: request,
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
    }

    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    const priceSeries: string[] = []
    const timestampSeries: number[] = []

    if (raw_data?.data instanceof Array) {
      raw_data.data.forEach((item: loopring_defs.TokenPriceInfo) => {
        priceSeries.push(item.price)
        timestampSeries.push(item.createdAt)
      })
    }

    return {
      tokenPrices: raw_data.data as loopring_defs.TokenPriceInfo[],
      priceSeries,
      timestampSeries,
      raw_data,
    }
  }

  /*
   * Fetches, for all the tokens supported by Loopring, their fiat price.
   * response: { [key: string]: <price> }  key is token address
   */
  public async getLatestTokenPrices(request?: loopring_defs.getLatestTokenPricesRequest) {
    const reqParams: loopring_defs.ReqParams = {
      queryParams: request,
      url: loopring_defs.LOOPRING_URLs.GET_LATEST_TOKEN_PRICES,
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
    }

    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    const tokenPrices: loopring_defs.LoopringMap<number> = {}

    if (raw_data?.data instanceof Array) {
      raw_data.data.forEach((item: any) => {
        tokenPrices[item.token.toLowerCase()] = parseFloat(item.price)
      })
    }

    return {
      tokenPrices,
      raw_data,
    }
  }
}
