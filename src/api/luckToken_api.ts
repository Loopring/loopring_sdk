/* eslint-disable camelcase  */
import { BaseAPI } from "./base_api";
import {
  ReqParams,
  ReqMethod,
  SIG_FLAG,
  LOOPRING_URLs,
  RESULT_INFO,
  ChainId,
  ConnectorNames,
  SigSuffix,
} from "../defs";
import * as loopring_defs from "../defs/loopring_defs";
import { sortObjDictionary } from "../utils";
import * as sign_tools from "./sign/sign_tools";
import { isContract } from "./contract_api";
import { AxiosResponse } from "axios";

export class LuckTokenAPI extends BaseAPI {
  public async getLuckTokenAgents<R>(): Promise<{
    raw_data: R;
    luckTokenAgents: { [key: string]: loopring_defs.LuckyTokenInfo };
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_LUCK_TOKEN_AGENTS,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    const luckTokenAgents = raw_data.reduce(
      (
        prev: { [key: string]: loopring_defs.LuckyTokenInfo },
        item: { owner: string; infos: any[] }
      ) => {
        prev[item.owner] = {
          signer: item.infos[0],
          signerUrl: item.infos[1],
          logoUrl: item.infos[2],
          memo: item.infos[3],
        };
        return prev;
        // return {
        //   ...item,
        //   infos: {
        //     signer: item[0],
        //     signerUrl: item[1],
        //     logoUrl: item[2],
        //     memo: item[3],
        //   },
        // };
      },
      {} as { [key: string]: loopring_defs.LuckyTokenInfo }
    );
    return {
      raw_data,
      luckTokenAgents,
    };
  }

  public async getLuckTokenAuthorizedSigners<R>(): Promise<{
    raw_data: R;
    luckTokenAgents: { [key: string]: loopring_defs.LuckyTokenInfo };
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_LUCK_TOKEN_AUTHORIZEDSIGNERS,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    const luckTokenAgents = raw_data.reduce(
      (
        prev: { [key: string]: loopring_defs.LuckyTokenInfo },
        item: { owner: string; infos: any[] }
      ) => {
        prev[item.owner] = {
          signer: item.infos[0],
          signerUrl: item.infos[1],
          logoUrl: item.infos[2],
          memo: item.infos[3],
        };
        return prev;
      },
      {} as { [key: string]: loopring_defs.LuckyTokenInfo }
    );
    return {
      raw_data,
      luckTokenAgents,
    };
  }
  public async getLuckTokenClaimHistory<R>(
    request: { fromId: number; limit?: number },
    apiKey: string
  ): Promise<{
    totalNum: number;
    list: loopring_defs.LuckTokenHistory[];
    raw_data: R;
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_LUCK_TOKEN_CLAIMHISTORY,
      queryParams: request,
      apiKey,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };
    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    const totalNum: number = raw_data.totalNum;
    const list: loopring_defs.LuckTokenHistory[] = raw_data.list;

    return {
      totalNum,
      list,
      raw_data,
    };
  }

  public async getLuckTokenLuckyTokens<R>(
    request: {
      senderId: number;
      hash: string;
      partitions: string;
      modes: string;
      scopes: string;
      statuses: string;
      startTime: number;
      endTime: number;
      fromId: number;
      limit?: number; // 默认50
      official: boolean;
    },
    apiKey: string
  ): Promise<{
    raw_data: R;
    totalNum: number;
    list: loopring_defs.LuckyTokenItemForReceive[];
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_LUCK_TOKEN_LUCKYTOKENS,
      queryParams: request,
      apiKey,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    const totalNum: number = raw_data.totalNum;
    const list: loopring_defs.LuckyTokenItemForReceive[] = raw_data.list;

    return {
      totalNum,
      list,
      raw_data,
    };
  }
  public async getLuckTokenDetail<R>(
    request: {
      limit?: number; // 默认50
      hash: string; // 必传，红包hash
      fromId: number;
      showHelper: boolean;
    },
    apiKey: string
  ): Promise<{
    raw_data: R;
    detail: loopring_defs.LuckTokenHistory;
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_LUCK_TOKEN_LUCKYTOKENDETAIL,
      queryParams: request,
      apiKey,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    return { raw_data, detail: raw_data };
  }

  public async getLuckTokenWithdrawals<R>(
    request: {
      statuses: loopring_defs.LuckyTokenWithdrawStatus[];
      tokenId: number;
      startTime: number;
      endTime: number;
      fromId: number;
      limit?: number;
    },
    apiKey: string
  ): Promise<{
    raw_data: R;
    totalNum: number;
    luckTokenWithdraw: loopring_defs.LuckTokenWithdraw[];
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_LUCK_TOKEN_WITHDRAWALS,
      queryParams: { ...request, statuses: request.statuses.join(",") },
      apiKey,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    return {
      raw_data,
      totalNum: raw_data?.totalNum,
      luckTokenWithdraw: raw_data.list,
    };
  }
  public async getLuckTokenBalances<R>(
    request: {
      accountId: number;
      tokens: number[]; // tokenId
    },
    apiKey: string
  ): Promise<{
    raw_data: R;
    totalNum: number;
    tokenBalance: loopring_defs.UserBalanceInfo[];
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_LUCK_TOKEN_BALANCES,
      queryParams: { ...request, statuses: request.tokens.join(",") },
      apiKey,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    return {
      raw_data,
      totalNum: raw_data?.totalNum,
      tokenBalance: raw_data.list,
    };
  }
  public async getLuckTokenClaimedLuckyTokens<R>(
    request: {
      fromId: number;
      limit?: number;
      hashes?: string[];
    },
    apiKey: string
  ): Promise<{
    raw_data: R;
    totalNum: number;
    claimedHistory: Array<loopring_defs.LuckTokenClaim & { id: number }>;
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_LUCK_TOKEN_CLAIMEDLUCKYTOKENS,
      queryParams: { ...request, hashes: request?.hashes?.join(",") },
      apiKey,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    return {
      raw_data,
      totalNum: raw_data?.totalNum,
      claimedHistory: raw_data.list,
    };
  }

  public async getLuckTokenSummary<R>(apiKey: string): Promise<{
    raw_data: R;
    tokenSummaryList: { tokenId: number; amount: string }[];
    totalNum: number;
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_LUCK_TOKEN_SUMMARY,
      apiKey,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    return {
      raw_data,
      totalNum: raw_data.count,
      tokenSummaryList: raw_data.tokenSummaryList,
    };
  }

  public async sendLuckTokenClaimLuckyToken<R>({
    request,
    apiKey,
    eddsaKey,
  }: {
    request: {
      hash: string;
      claimer: string;
      referrer: string;
    };
    // chainId: ChainId;
    // walletType: ConnectorNames;
    eddsaKey: string;
    apiKey: string;
    // isHWAddr?: boolean;
  }): Promise<{
    raw_data: R;
  }> {
    const dataToSig: Map<string, any> = sortObjDictionary(request);

    const reqParams: ReqParams = {
      url: LOOPRING_URLs.POST_LUCK_TOKEN_CLAIMLUCKYTOKEN,
      apiKey,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.EDDSA_SIG,
      sigObj: {
        dataToSig,
        PrivateKey: eddsaKey,
      },
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    return { raw_data, ...raw_data };
  }
  public async sendLuckTokenWithdraws<T>(
    req: loopring_defs.OriginLuckTokenWithdrawsRequestV3WithPatch,
    options?: { accountId?: number; counterFactualInfo?: any }
  ): Promise<loopring_defs.TX_HASH_RESULT<T> | RESULT_INFO> {
    let {
      request,
      web3,
      chainId,
      walletType,
      eddsaKey,
      apiKey,
      isHWAddr: isHWAddrOld,
    } = req;
    const { accountId, counterFactualInfo }: any = options;

    const isHWAddr = !!isHWAddrOld;
    let ecdsaSignature = undefined;
    let { transfer } = request;
    transfer = {
      ...transfer,
      payeeId: 0,
      memo: `LuckTokenWithdrawalBy${request.claimer}`,
    };
    request = {
      ...request,
      transfer,
    };

    const sigHW = async () => {
      const result = await sign_tools.signTransferWithoutDataStructure(
        web3,
        transfer.payerAddr,
        transfer as loopring_defs.OriginTransferRequestV3,
        chainId,
        walletType,
        accountId,
        counterFactualInfo
      );
      ecdsaSignature = result.ecdsaSig + SigSuffix.Suffix03;
    };
    if (
      walletType === ConnectorNames.MetaMask ||
      walletType === ConnectorNames.Gamestop ||
      walletType === ConnectorNames.OtherExtension
    ) {
      // myLog("submitDeployNFT iConnectorNames.MetaMask:", walletType);
      try {
        if (isHWAddr) {
          await sigHW();
        } else {
          // myLog("submitDeployNFT notHWAddr:", isHWAddr);
          const result = await sign_tools.signTransferWithDataStructure(
            web3,
            transfer.payerAddr,
            transfer as loopring_defs.OriginTransferRequestV3,
            chainId,
            walletType,
            accountId,
            counterFactualInfo
          );
          ecdsaSignature = result.ecdsaSig + SigSuffix.Suffix02;
        }
      } catch (err) {
        throw {
          ...this.genErr(err as any),
        };
      }
    } else {
      const isContractCheck = await isContract(web3, transfer.payerAddr);
      try {
        if (isContractCheck) {
          const result =
            await sign_tools.signTransferWithDataStructureForContract(
              web3,
              transfer.payerAddr,
              transfer as loopring_defs.OriginTransferRequestV3,
              chainId,
              accountId
            );
          ecdsaSignature = result.ecdsaSig;
        } else if (counterFactualInfo) {
          const result =
            await sign_tools.signTransferWithDataStructureForContract(
              web3,
              transfer.payerAddr,
              transfer as loopring_defs.OriginTransferRequestV3,
              chainId,
              accountId,
              counterFactualInfo
            );
          ecdsaSignature = result.ecdsaSig;
          // myLog("Transfer ecdsaSignature:", ecdsaSignature);
        } else {
          await sigHW();
        }
      } catch (err) {
        throw {
          ...this.genErr(err as any),
        };
      }
    }

    if (counterFactualInfo) {
      transfer.counterFactualInfo = counterFactualInfo;
    }
    transfer.eddsaSignature = sign_tools.get_EddsaSig_Transfer(
      transfer as loopring_defs.OriginTransferRequestV3,
      eddsaKey
    ).result;
    transfer.ecdsaSignature = ecdsaSignature;
    // const dataToSig: Map<string, any> = new Map();
    const dataToSig: Map<string, any> = sortObjDictionary(request);
    dataToSig.set("transfer", request.transfer);
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.POST_LUCK_TOKEN_WITHDRAWS,
      apiKey,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.EDDSA_SIG,
      sigObj: {
        dataToSig,
        PrivateKey: eddsaKey,
      },
    };
    let raw_data;
    try {
      raw_data = (await this.makeReq().request(reqParams)).data;
    } catch (error) {
      throw error as AxiosResponse;
    }
    return this.returnTxHash(raw_data);
  }

  public async sendLuckTokenSend<
    R = {
      hash: string;
      status: string;
      isIdempotent: boolean; // 幂等
      accountId: number;
      tokenId: number;
      storageId: number;
    }
  >(
    req: loopring_defs.OriginLuckTokenSendRequestV3WithPatch,
    options?: { accountId?: number; counterFactualInfo?: any }
  ): Promise<loopring_defs.TX_HASH_RESULT<R> | RESULT_INFO> {
    let {
      request,
      web3,
      chainId,
      walletType,
      eddsaKey,
      apiKey,
      isHWAddr: isHWAddrOld,
    } = req;

    const { accountId, counterFactualInfo }: any = options;

    const isHWAddr = !!isHWAddrOld;
    let ecdsaSignature = undefined;
    const {
      luckyToken: { maxFeeAmount, token, amount, feeToken, ...rest },
    } = request;

    let transfer = {
      ...rest,
      maxFee: {
        tokenId: feeToken,
        volume: maxFeeAmount,
      },
      payeeId: 0,
      memo: `LuckTokenSendBy${accountId}`,
      token: {
        tokenId: token,
        volume: amount,
      },
    } as loopring_defs.OriginTransferRequestV3;

    const sigHW = async () => {
      const result = await sign_tools.signTransferWithoutDataStructure(
        web3,
        transfer.payerAddr,
        transfer as loopring_defs.OriginTransferRequestV3,
        chainId,
        walletType,
        accountId,
        counterFactualInfo
      );
      ecdsaSignature = result.ecdsaSig + SigSuffix.Suffix03;
    };
    if (
      walletType === ConnectorNames.MetaMask ||
      walletType === ConnectorNames.Gamestop ||
      walletType === ConnectorNames.OtherExtension
    ) {
      // myLog("submitDeployNFT iConnectorNames.MetaMask:", walletType);
      try {
        if (isHWAddr) {
          await sigHW();
        } else {
          // myLog("submitDeployNFT notHWAddr:", isHWAddr);
          const result = await sign_tools.signTransferWithDataStructure(
            web3,
            transfer.payerAddr,
            transfer as loopring_defs.OriginTransferRequestV3,
            chainId,
            walletType,
            accountId,
            counterFactualInfo
          );
          ecdsaSignature = result.ecdsaSig + SigSuffix.Suffix02;
        }
      } catch (err) {
        throw {
          ...this.genErr(err as any),
        };
      }
    } else {
      const isContractCheck = await isContract(web3, transfer.payerAddr);
      try {
        if (isContractCheck) {
          const result =
            await sign_tools.signTransferWithDataStructureForContract(
              web3,
              transfer.payerAddr,
              transfer as loopring_defs.OriginTransferRequestV3,
              chainId,
              accountId
            );
          ecdsaSignature = result.ecdsaSig;
        } else if (counterFactualInfo) {
          const result =
            await sign_tools.signTransferWithDataStructureForContract(
              web3,
              transfer.payerAddr,
              transfer as loopring_defs.OriginTransferRequestV3,
              chainId,
              accountId,
              counterFactualInfo
            );
          ecdsaSignature = result.ecdsaSig;
          // myLog("Transfer ecdsaSignature:", ecdsaSignature);
        } else {
          await sigHW();
        }
      } catch (err) {
        throw {
          ...this.genErr(err as any),
        };
      }
    }

    if (counterFactualInfo) {
      transfer.counterFactualInfo = counterFactualInfo;
    }
    transfer.eddsaSignature = sign_tools.get_EddsaSig_Transfer(
      transfer as loopring_defs.OriginTransferRequestV3,
      eddsaKey
    ).result;

    request = {
      ...request,
      luckyToken: {
        ...request.luckyToken,
        payeeId: 0,
        memo: `LuckTokenSendBy${accountId}`,
        eddsaSig: sign_tools.get_EddsaSig_Transfer(
          transfer as loopring_defs.OriginTransferRequestV3,
          eddsaKey
        ).result,
      },
    };
    // ecdsaSig: ecdsaSignature,

    // const dataToSig: Map<string, any> = sortObjDictionary(request);

    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.POST_LUCK_TOKEN_SENDLUCKYTOKEN,
      bodyParams: { ...request },
      apiKey,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.NO_SIG,
      ecdsaSignature,
    };

    let raw_data;
    try {
      raw_data = (await this.makeReq().request(reqParams)).data;
    } catch (error) {
      throw error as AxiosResponse;
    }
    return this.returnTxHash(raw_data);
  }
}

// GET_LUCK_TOKEN_AGENTS
// GET_LUCK_TOKEN_AUTHORIZEDSIGNERS
// GET_LUCK_TOKEN_CLAIMHISTORY
// GET_LUCK_TOKEN_LUCKYTOKENS
// GET_LUCK_TOKEN_LUCKYTOKENDETAIL
// GET_LUCK_TOKEN_WITHDRAWALS
// GET_LUCK_TOKEN_BALANCES
// GET_LUCK_TOKEN_CLAIMEDLUCKYTOKENS
// GET_LUCK_TOKEN_SUMMARY
// POST_LUCK_TOKEN_SENDLUCKYTOKEN
// POST_LUCK_TOKEN_CLAIMLUCKYTOKEN
// POST_LUCK_TOKEN_WITHDRAWS
