import { BaseAPI, personalSign } from "./base_api";
import { isContract, sendRawTx } from "./contract_api";
import * as loopring_defs from "../defs/loopring_defs";
import {
  ContractType,
  GetUserTradesRequest,
  Guardian,
  HebaoOperationLog,
  LockHebaoHebaoParam,
  ModuleType,
  NetworkWallet,
  Protector,
  ReqParams,
  WalletType,
} from "../defs/loopring_defs";

import { ReqMethod, SIG_FLAG } from "../defs/loopring_enums";
import api from "./ethereum/contracts";

import { LOOPRING_URLs } from "../defs/url_defs";
import {
  ChainId,
  ConnectorNames,
  HEBAO_META_TYPE,
  RESULT_INFO,
  SigSuffix,
} from "../defs";
import {
  creatEdDSASigHasH,
  getEcDSASig,
  GetEcDSASigType,
} from "./sign/sign_tools";
import * as ethUtil from "ethereumjs-util";
import { sortObjDictionary, toHex } from "../utils";
import Web3 from "web3";
import { myLog } from "../utils/log_tools";
import { AxiosResponse } from "axios";

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
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      };
    }

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

  // 1.x

  // 2.0
  // const TYPE_STR =
  //   "recover(address wallet,uint256 validUntil,address newOwner,address[] newGuardians)";
  // const RECOVER_TYPEHASH = ethUtil.keccak(Buffer.from(TYPE_STR));
  //
  // const guardiansBs = encodeAddressesPacked(guardians);
  // const guardiansHash = ethUtil.keccak(guardiansBs);
  //
  // const encodedRequest = ethAbi.encodeParameters(
  //   ["bytes32", "address", "uint256", "address", "bytes32"],
  //   [RECOVER_TYPEHASH, walletAddress, validUntil, newOwner, guardiansHash]
  // );
  //
  //   const encodedRequest = web3.eth.abi.encodeParameters(
  //     ["bytes32", "address", "uint256", "address"],
  //     [RECOVER_TYPEHASH, request.wallet, request.validUntil, newOwner]
  //   );
  private getApproveRecoverTypedData(
    chainId: ChainId,
    guardiaContractAddress: any,
    wallet: any,
    validUntil: any,
    newOwner: any
  ) {
    const typedData = {
      types: {
        EIP712Domain: [
          { name: "name", type: "string" },
          { name: "version", type: "string" },
          { name: "chainId", type: "uint256" },
          { name: "verifyingContract", type: "address" },
        ],
        recover: [
          { name: "wallet", type: "address" },
          { name: "validUntil", type: "uint256" },
          { name: "newOwner", type: "address" },
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

  public getApproveRecoverV2TypedData(
    chainId: ChainId,
    guardiaContractAddress: any,
    wallet: any,
    validUntil: any,
    newOwner: any,
    newGuardians: Buffer | any
  ) {
    const typedData = {
      types: {
        EIP712Domain: [
          { name: "name", type: "string" },
          { name: "version", type: "string" },
          { name: "chainId", type: "uint256" },
          { name: "verifyingContract", type: "address" },
        ],
        recover: [
          { name: "wallet", type: "address" },
          { name: "validUntil", type: "uint256" },
          { name: "newOwner", type: "address" },
          { name: "newGuardians", type: "string" },
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
        newGuardians: newGuardians,
      },
    };
    return typedData;
  }

  /**
   *
   * @param approveRecordId  request.id
   */
  public async rejectHebao(req: loopring_defs.RejectHebaoRequestV3WithPatch) {
    const { web3, address, request, chainId } = req;
    const dataToSig = sortObjDictionary(request);
    const { hashRaw } = creatEdDSASigHasH({
      method: ReqMethod.POST,
      basePath: this.baseUrl,
      api_url: LOOPRING_URLs.REJECT_APPROVE_SIGNATURE,
      requestInfo: dataToSig,
    });
    myLog("signHash", hashRaw);
    const result: any = await personalSign(
      web3,
      address,
      "",
      toHex(hashRaw),
      ConnectorNames.Unknown,
      chainId
    );

    const reqParams: ReqParams = {
      url: LOOPRING_URLs.REJECT_APPROVE_SIGNATURE,
      queryParams: {},
      method: ReqMethod.POST,
      bodyParams: request,
      apiKey: "",
      sigFlag: SIG_FLAG.NO_SIG,
      sigObj: {
        sig: result?.sig.slice(0, 132),
      },
    };

    let hash: string | undefined = undefined;
    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      };
    } else {
      hash = raw_data.data;
    }
    return {
      hash,
      raw_data,
    };
  }

  public async signHebaoApproveWithoutDataStructure(
    web3: Web3,
    owner: string,
    guardian: Guardian,
    chainId: ChainId,
    walletType: ConnectorNames
  ) {
    const result = await personalSign(
      web3,
      owner,
      "",
      guardian.messageHash,
      walletType,
      chainId
    );
    return result;
  }

  public async signHebaoApproveWithDataStructureForContract(
    web3: Web3,
    owner: string,
    guardian: Guardian,
    chainId: ChainId,
    newOwner = "",
    newGuardians: undefined | Buffer | any = undefined,
    masterCopy: undefined | string = undefined,
    forwarderModuleAddress: undefined | string = undefined
  ) {
    let typedData;
    myLog("forwarderModuleAddress", forwarderModuleAddress);

    if (forwarderModuleAddress) {
      typedData = this.getApproveRecoverTypedData(
        chainId,
        forwarderModuleAddress,
        guardian.signedRequest.wallet,
        guardian.signedRequest.validUntil,
        newOwner
      );
      myLog("typedData", typedData);
    } else {
      typedData = this.getApproveRecoverV2TypedData(
        chainId,
        masterCopy,
        guardian.signedRequest.wallet,
        guardian.signedRequest.validUntil,
        newOwner,
        newGuardians
      );
      myLog("typedData", typedData);
    }

    const result = await getEcDSASig(
      web3,
      typedData,
      owner,
      GetEcDSASigType.Contract,
      chainId,
      undefined,
      "",
      ConnectorNames.Unknown
      // counterFactualInfo
    );
    return { sig: result.ecdsaSig };
  }

  public encodeAddressesPacked(addrs: string[]) {
    const addrsBs = Buffer.concat(
      addrs.map((a) => {
        return Buffer.from("00".repeat(12) + a.slice(2), "hex");
      })
    );
    myLog("addrsBs", addrsBs.toString());
    return addrsBs;
  }

  public async submitApproveSignature<T extends loopring_defs.TX_HASH_API>(
    req: loopring_defs.SubmitApproveSignatureRequestWithPatch,
    guardians: string[] = [],
    isContract1XAddress?: boolean,
    masterCopy?: string,
    forwarderModuleAddress: string = ""
  ): Promise<loopring_defs.TX_HASH_RESULT<T> | RESULT_INFO> {
    const {
      request,
      web3,
      chainId,
      walletType,
      guardian,
      apiKey,
      isHWAddr: isHWAddrOld,
    } = req;
    const isHWAddr = !!isHWAddrOld;
    let ecdsaSignature = undefined;

    const sigHW = async () => {
      const result: any = await this.signHebaoApproveWithoutDataStructure(
        web3,
        request.signer,
        guardian,
        chainId,
        walletType
      );
      ecdsaSignature = result?.sig + SigSuffix.Suffix03;
    };
    // metamask not import hw appWallet.
    if (
      walletType === ConnectorNames.MetaMask ||
      walletType === ConnectorNames.Gamestop ||
      walletType === ConnectorNames.Coinbase ||
      walletType === ConnectorNames.OtherExtension
    ) {
      try {
        if (isHWAddr) {
          await sigHW();
        } else {
          const result: any = await this.signHebaoApproveWithoutDataStructure(
            web3,
            request.signer,
            guardian,
            chainId,
            walletType
          );
          ecdsaSignature = result?.sig + SigSuffix.Suffix03;
        }
      } catch (err) {
        throw {
          ...this.genErr(err as any),
        };
      }
    } else {
      const isContractCheck = await isContract(web3, request.signer);
      try {
        if (isContractCheck) {
          let newOwner = undefined,
            newGuardians = [];

          guardian.businessDataJson.value.value.newOwner
            ? guardian.businessDataJson.value.value.newOwner
            : 0;
          if (
            guardian.businessDataJson &&
            guardian.businessDataJson.value &&
            guardian.businessDataJson.value.value
          ) {
            newOwner = guardian.businessDataJson.value.value.newOwner;
            newGuardians = guardian.businessDataJson.value.value.newGuardians;
          }
          const guardiansBs = this.encodeAddressesPacked(newGuardians);
          const guardiansHash = ethUtil.keccak(guardiansBs);
          // const guardiansBs =
          //   LoopringAPI.walletAPI.encodeAddressesPacked(guardian.businessDataJson.value.value.newGuardians);
          const result =
            await this.signHebaoApproveWithDataStructureForContract(
              web3,
              request.signer,
              guardian,
              chainId,
              newOwner,
              isContract1XAddress ? undefined : guardiansHash,
              isContract1XAddress ? undefined : masterCopy,
              forwarderModuleAddress ? undefined : forwarderModuleAddress
            );
          ecdsaSignature = result.sig;
        } else {
          await sigHW();
        }
      } catch (err) {
        throw {
          ...this.genErr(err as any),
        };
      }
    }
    request.signature = ecdsaSignature;
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.SUBMIT_APPROVE_SIGNATURE,
      bodyParams: request,
      apiKey,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    let raw_data;
    try {
      raw_data = (await this.makeReq().request(reqParams)).data;
    } catch (error) {
      throw error as AxiosResponse;
    }
    return this.returnTxHash(raw_data) as loopring_defs.TX_HASH_RESULT<T>;
  }

  public async getAddressByENS<R extends any, T extends string>(
    request: loopring_defs.GetEnsAddressRequest
  ): Promise<{
    address: string | undefined;
    raw_data: R;
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.RESOLVE_ENS,
      queryParams: request,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };
    let address: T | undefined;
    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      };
    } else {
      address = raw_data.data as T;
    }
    return {
      address,
      raw_data,
    };
  }

  public async getWalletType<T extends any>(
    request: loopring_defs.GET_WALLET_TYPE
  ): Promise<{
    walletType: WalletType | undefined;
    raw_data: T;
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_WALLET_TYPE,
      queryParams: request,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };
    let walletType: WalletType | undefined;
    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      };
    } else {
      walletType = raw_data.data;
    }
    return {
      walletType,
      raw_data,
    };
  }

  public async getContractType<T = ContractType>(
    request: loopring_defs.GET_WALLET_TYPE
  ): Promise<{
    contractType: T | undefined;
    raw_data: T;
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_WALLET_CONTRACTVERSION,
      queryParams: request,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };
    const raw_data = (await this.makeReq().request(reqParams)).data;
    let contractType: T | undefined;
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      };
    } else {
      contractType = raw_data.data[0];
    }
    return {
      contractType,
      raw_data,
    };
  }

  public async getWalletModules<T = ModuleType>(
    request: loopring_defs.GET_WALLET_TYPE
  ): Promise<{
    walletModule: T | undefined;
    raw_data: T;
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_WALLET_MODULES,
      queryParams: request,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };
    const raw_data = (await this.makeReq().request(reqParams)).data;
    let walletModule: T | undefined;
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      };
    } else {
      walletModule = raw_data.data[0];
    }
    return {
      walletModule,
      raw_data,
    };
  }

  public async getEnsByAddress<R extends any, T extends string>(
    request: loopring_defs.GetEnsNameRequest
  ): Promise<{
    ensName: string | undefined;
    raw_data: R;
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.RESOLVE_NAME,
      queryParams: request,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };
    let ensName: T | undefined;
    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      };
    } else {
      ensName = raw_data.data as T;
    }
    return {
      ensName,
      raw_data,
    };
  }

  public async lockHebaoWallet({
    web3,
    from,
    contractAddress,
    gasPrice,
    gasLimit = 150000,
    chainId = 1,
    wallet,
    nonce,
    isVersion1,
  }: // sendByMetaMask = true,
  LockHebaoHebaoParam) {
    if (isVersion1) {
      const data = api.Contracts.HeBao.encodeInputs("lock", {
        wallet,
      });

      return await sendRawTx(
        web3,
        from,
        contractAddress,
        0,
        data,
        chainId as ChainId,
        nonce,
        gasPrice,
        Number(gasLimit),
        true
      );
    } else {
      // const data = api.Contracts.HeBao.encodeInputs("lock", {});
      return await sendRawTx(
        web3,
        from,
        contractAddress,
        0,
        "0xf83d08ba",
        chainId as ChainId,
        nonce,
        gasPrice,
        Number(gasLimit),
        true
      );
    }
  }

  public async getHebaoConfig(request: { network?: NetworkWallet }) {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_HEBAO_CONFIG,
      queryParams: request,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };
    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    return { raw_data: raw_data.data };
  }

  public async sendMetaTx<R extends any, T extends any>(
    request: loopring_defs.SendMetaTxRequest,
    apiKey: string
  ): Promise<{
    raw_data: R;
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.SEND_META_TX,
      apiKey,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.NO_SIG,
      bodyParams: request,
    };
    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    return { raw_data };
  }

  public async getGuardianApproveList<R extends any, T extends Guardian>(
    request: loopring_defs.GetGuardianApproveListRequest
  ): Promise<{
    guardiansArray: Array<T>;
    raw_data: R;
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_GUARDIAN_APPROVE_LIST,
      queryParams: request,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };
    let guardiansArray: Array<T> = [];
    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      };
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
      raw_data,
    };
  }

  // /api/appWallet/v3/operationLogs?from=0x189a3c44a39c5ab22712543c0f62a9833bbe8df9&fromTime=0&to=&offset=0&network=ETHEREUM&statues=&hebaoTxType=&limit=20

  /**
   * getProtectors
   * @param {GetUserTradesRequest} request
   * @param apiKey
   */
  public async getProtectors<R extends any, T extends Protector>(
    request: loopring_defs.GetProtectorRequest,
    apiKey: string
  ): Promise<{
    protectorArray: Array<T>;

    raw_data: R;
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_PROTECTORS,
      apiKey: apiKey,
      queryParams: request,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };
    let protectorArray: Array<T> = [];
    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      };
    } else {
      protectorArray = raw_data?.data.map((p: any) => ({
        ens: p.protectEns,
        address: p.protectAddress,
        lockStatus: p.walletStatus?.toUpperCase(),
      }));
    }
    return {
      protectorArray,
      raw_data,
    };
  }

  /*
   * Get user trade amount
   */
  public async getHebaoOperationLogs<
    R extends any,
    T extends HebaoOperationLog
  >(
    request: loopring_defs.HebaoOperationLogs
  ): Promise<{
    operationArray: Array<T>;
    raw_data: R;
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_OPERATION_LOGS,
      queryParams: request,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };
    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    return {
      operationArray: raw_data.data as T[],
      raw_data,
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
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      };
    }
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
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      };
    }
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
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      };
    }
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
