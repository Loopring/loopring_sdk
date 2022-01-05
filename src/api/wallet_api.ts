import {BaseAPI, isContract, signMessage} from "./base_api";

import * as loopring_defs from "../defs/loopring_defs";
import {
  GetUserTradesRequest,
  Guardian,
  HebaoOperationLog,
  LockHebaoHebaoParam,
  Protector,
  ReqParams,
} from "../defs/loopring_defs";

import {ReqMethod, SIG_FLAG} from "../defs/loopring_enums";
import api from "./ethereum/contracts";

import {LOOPRING_URLs} from "../defs/url_defs";
import {ChainId, HEBAO_META_TYPE, RESULT_INFO} from "../defs";
import {signHebaoApproveContract} from "./sign/sign_tools";
import {myLog} from "../utils/log_tools";
import {sha256} from "ethereumjs-util";
import {toHex} from "../utils";
import {sendRawTx} from "./contract_api";


export class WalletAPI extends BaseAPI {
  /*
   * Get user assets
   */
  public async getUserAssets(request: loopring_defs.GetUserAssetsRequest) {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_USER_ASSETS,
      queryParams: request,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;

    const assetSeries: string[] = [];
    const timestampSeries: number[] = [];
    const dateSeries: string[] = [];

    if (raw_data?.data instanceof Array) {
      raw_data.data.forEach((item: loopring_defs.UserAssetInfo) => {
        assetSeries.push(item.amount);
        timestampSeries.push(item.createdAt);
        dateSeries.push(item.createdAtStr);
      });
    }

    return {
      assetSeries,
      timestampSeries,
      dateSeries,
      userAssets: raw_data.data as loopring_defs.UserAssetInfo[],
      raw_data,
    };
  }


  private getApproveTypedData(chainId: ChainId,
                              guardiaContractAddress: any, wallet: any, validUntil: any, newOwner: any) {
    const typedData = {
      types: {
        EIP712Domain: [
          {name: "name", type: "string"},
          {name: "version", type: "string"},
          {name: "chainId", type: "uint256"},
          {name: "verifyingContract", type: "address"},
        ],
        recover: [
          {name: "wallet", type: "address"},
          {
            name: "validUntil",
            type: "uint256",
          },
          {
            name: "newOwner",
            type: "address",
          },
        ],
      },
      domain: {
        name: "GuardianModule",
        version: "1.2.0",
        chainId: chainId,
        verifyingContract: guardiaContractAddress,
      },
      primaryType: "recover",
      message: {
        wallet: wallet,
        validUntil: validUntil,
        newOwner: newOwner,
      },
    };
    return typedData;
  }

  public rejectApproveHash(request: { approveRecordId: any, signer: any }) {
    const uri = encodeURIComponent(
      `${this.baseUrl}/api/wallet/v3/rejectApproveSignature`
    );
    const params = encodeURIComponent(
      JSON.stringify({
        approveRecordId: request.approveRecordId,
        signer: request.signer,
      })
    );
    const message = `${ReqMethod.POST}&${uri}&${params}`;
    return toHex(sha256(Buffer.from(message)).toString());
  }

  /**
   *
   * @param approveRecordId  request.id
   */
  public async rejectHebao(req: loopring_defs.RejectHebaoRequestV3WithPatch) {
    const {web3, address, request} = req;
    const hash = this.rejectApproveHash({
      approveRecordId: request.approveRecordId,
      signer: address,
    });

    return await signMessage(web3, address, '', hash);
  }

  public async approveHebao(req: loopring_defs.ApproveHebaoRequestV3WithPatch) {
    // signMessage
    const {request, web3, address, chainId, guardiaContractAddress, walletType} = req
    const _isContract = await isContract(web3, address);
    let result: any;
    if (_isContract === true) {
      myLog("isContract use approveHebaoForContract");
      const wallet = request.signedRequest.wallet;
      const validUntil = request.signedRequest.validUntil;
      const obj = JSON.parse(request.businessDataJson);
      const newOwner = obj.value.value.newOwner;
      myLog("businessDataJson", obj);
      const typedData = this.getApproveTypedData(
        chainId,
        guardiaContractAddress,
        wallet,
        validUntil,
        newOwner
      );
      myLog("approveHebaoForContract typedData", typedData);
      result = await signHebaoApproveContract(web3,
        typedData,
        address,
        walletType,);
      myLog("this.signer.signTypedDataForContract response", result);
      myLog("approveHebaoForContract", result);
    } else {
      result = await signMessage(web3,
        address,
        "",
        request.messageHash as string);
      myLog("approveHebaoSignMessage", result);

    }
    const response = await this.submitApproveSignature({
      approveRecordId: request.id,
      txAwareHash: request.messageHash,
      securityNumber: request.code,
      signer: address,
      signature: result.result.sig + result.result.signType
    });
    return response
  }


  public async submitApproveSignature<R extends any, T extends string>
  (request: loopring_defs.SubmitApproveSignatureRequest): Promise<{
    address: string | undefined;
    error: RESULT_INFO | undefined,
    raw_data: R
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.SUBMIT_APPROVE_SIGNATURE,
      queryParams: request,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.EDDSA_SIG_POSEIDON,
    };
    let error: RESULT_INFO | undefined
    let address: T | undefined;
    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      error = raw_data?.resultInfo;
    } else {
      address = raw_data.data as T;
    }
    return {
      address,
      error,
      raw_data
    };
  }


  public async getAddressByENS<R extends any, T extends string>
  (request: loopring_defs.GetEnsAddressRequest): Promise<{
    address: string | undefined;
    error: RESULT_INFO | undefined,
    raw_data: R
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.RESOLVE_ENS,
      queryParams: request,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };
    let error: RESULT_INFO | undefined
    let address: T | undefined;
    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      error = raw_data?.resultInfo;
    } else {
      address = raw_data.data as T;
    }
    return {
      address,
      error,
      raw_data
    };
  }

  public async getEnsByAddress<R extends any, T extends string>
  (request: loopring_defs.GetEnsNameRequest): Promise<{
    ensName: string | undefined;
    error: RESULT_INFO | undefined,
    raw_data: R
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.RESOLVE_NAME,
      queryParams: request,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };
    let error: RESULT_INFO | undefined
    let ensName: T | undefined;
    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      error = raw_data?.resultInfo;
    } else {
      ensName = raw_data.data as T;
    }
    return {
      ensName,
      error,
      raw_data
    };
  }

  public async lockHebaoWallet({
                                 web3,
                                 from,
                                 value = 0,
                                 contractAddress,
                                 gasPrice,
                                 gasLimit=150000,
                                 chainId = 1,
                                 wallet,
                                 sendByMetaMask = true,
                               }: LockHebaoHebaoParam) {

    const data  = api.Contracts.HeBao.encodeInputs("lock", {
      wallet,
      guardian:from,
    });
    return await sendRawTx(
      web3,
      from,
      contractAddress,
      value,
      data,
      chainId,
      null,
      gasPrice,
      Number(gasLimit),
      sendByMetaMask
    );
  }

  public async getHebaoConfig() {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_HEBAO_CONFIG,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };
    const raw_data = (await this.makeReq().request(reqParams)).data;
    let error: RESULT_INFO | undefined
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      error = raw_data?.resultInfo;
    }
    return {error, raw_data: raw_data.data};
  }


  public async sendMetaTx<R extends any, T extends any>
  (request: loopring_defs.SendMetaTxRequest, apiKey: string)
    : Promise<{
    error: RESULT_INFO | undefined,
    raw_data: R
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.SEND_META_TX,
      apiKey,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.NO_SIG,
      bodyParams: request,
    };
    let error: RESULT_INFO | undefined
    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      error = raw_data?.resultInfo;
    }
    return {error, raw_data};
  }


  public async getGuardianApproveList<R extends any, T extends Guardian>
  (request: loopring_defs.GetGuardianApproveListRequest): Promise<{
    guardiansArray: Array<T>,
    error: RESULT_INFO | undefined,
    raw_data: R
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_GUARDIAN_APPROVE_LIST,
      queryParams: request,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };
    let error: RESULT_INFO | undefined
    let guardiansArray: Array<T> = [];
    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      error = raw_data?.resultInfo;
    } else {
      guardiansArray = raw_data?.data?.guardians.map((r: any) => ({
        ens: r.ens ? r.ens : "",
        address: r.wallet,
        type: HEBAO_META_TYPE[r.metaTxType],
        id: r.approveId,
        messageHash: r.txAwareHash,
        businessDataJson: r.businessDataJson,
        signedRequest: r.signedRequest,
        ...r,
      }));
    }
    return {
      guardiansArray,
      error,
      raw_data
    };
  }


// /api/wallet/v3/operationLogs?from=0x189a3c44a39c5ab22712543c0f62a9833bbe8df9&fromTime=0&to=&offset=0&network=ETHEREUM&statues=&hebaoTxType=&limit=20


  /**
   * getProtectors
   * @param {GetUserTradesRequest} request
   * @param apiKey
   */
  public async getProtectors<R extends any, T extends Protector>(request: loopring_defs.GetProtectorRequest, apiKey: string): Promise<{
    protectorArray: Array<T>,
    error: RESULT_INFO | undefined,
    raw_data: R
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_PROTECTORS,
      apiKey: apiKey,
      queryParams: request,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };
    let error: RESULT_INFO | undefined
    let protectorArray: Array<T> = [];
    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      error = raw_data?.resultInfo;
    } else {
      protectorArray = raw_data?.data.map((p: any) => ({
        ens: p.protectEns,
        address: p.protectAddress,
        lockStatus: p.walletStatus?.toUpperCase()
      }));
    }
    return {
      protectorArray,
      error,
      raw_data
    };
  }


  /*
    * Get user trade amount
    */
  public async getHebaoOperationLogs<R extends any, T extends HebaoOperationLog>(request: loopring_defs.HebaoOperationLogs): Promise<{
    operationArray: Array<T>,
    error: RESULT_INFO | undefined,
    raw_data: R
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_OPERATION_LOGS,
      queryParams: request,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };
    let error: RESULT_INFO | undefined
    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      error = raw_data?.resultInfo;
    }
    return {
      operationArray:raw_data.data as T[],
      raw_data,
      error,
    };
  }

  /*
   * Get user trade amount
   */
  public async getUserTradeAmount(request: loopring_defs.GetUserTradeAmount) {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_USER_TRADE_AMOUNT,
      queryParams: request,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };
    const raw_data = (await this.makeReq().request(reqParams)).data;

    // console.log({ raw_data });

    return {
      raw_data,
    };
  }

  /*
   * Get token prices
   * e.g. http://api3.loopring.io/api/wallet/v3/tokenPrices?token=0xdac17f958d2ee523a2206206994597c13d831ec7&intervalType=1&limit=30&currency=CNY
   */
  public async getTokenPrices(request: loopring_defs.GetTokenPricesRequest) {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_TOKEN_PRICES,
      queryParams: request,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;

    const priceSeries: string[] = [];
    const timestampSeries: number[] = [];

    if (raw_data?.data instanceof Array) {
      raw_data.data.forEach((item: loopring_defs.TokenPriceInfo) => {
        priceSeries.push(item.price);
        timestampSeries.push(item.createdAt);
      });
    }

    return {
      tokenPrices: raw_data.data as loopring_defs.TokenPriceInfo[],
      priceSeries,
      timestampSeries,
      raw_data,
    };
  }

  /*
   * Fetches, for all the tokens supported by Loopring, their fiat price.
   * response: { [key: string]: <price> }  key is token address
   */
  public async getLatestTokenPrices(
    request?: loopring_defs.getLatestTokenPricesRequest
  ) {
    const reqParams: ReqParams = {
      queryParams: request,
      url: LOOPRING_URLs.GET_LATEST_TOKEN_PRICES,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;

    const tokenPrices: loopring_defs.LoopringMap<number> = {};

    if (raw_data?.data instanceof Array) {
      raw_data.data.forEach((item: any) => {
        tokenPrices[item.token.toLowerCase()] = parseFloat(item.price);
      });
    }

    return {
      tokenPrices,
      raw_data,
    };
  }
}
