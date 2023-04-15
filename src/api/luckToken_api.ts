/* eslint-disable camelcase  */
import { BaseAPI } from "./base_api";
import {
  ReqParams,
  ReqMethod,
  SIG_FLAG,
  LOOPRING_URLs,
  RESULT_INFO,
  ConnectorNames,
  SigSuffix,
  NFTTokenInfo,
  UserNFTBalanceInfo,
} from "../defs";
import * as loopring_defs from "../defs/loopring_defs";
import { sortObjDictionary } from "../utils";
import * as sign_tools from "./sign/sign_tools";
import { isContract } from "./contract_api";
import { AxiosResponse } from "axios";
import { get_EddsaSig_NFT_Transfer } from "./sign/sign_tools";

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
    request: { fromId: number; limit?: number; isNft?: boolean },
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
      limit?: number;
      official: boolean;
      isNft?: boolean;
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
      limit?: number;
      hash: string;
      fromId?: number;
      accountId?: number;
    },
    apiKey: string
  ): Promise<{
    raw_data: R;
    detail: loopring_defs.LuckTokenClaimDetail;
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
  
  public async getBlindBoxDetail<R>(
    request: {
      limit?: number;
      hash: string;
      fromId?: number;
      showHelper: boolean;
      accountId?: number;
    },
    apiKey: string
  ): Promise<{
    raw_data: R;
    // detail: loopring_defs.LuckTokenClaimDetail;
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_LUCK_TOKEN_BLINDBOXDETAIL,
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
    return { raw_data };
  }

  

  public async getLuckTokenWithdrawals<R>(
    request: {
      statuses: loopring_defs.LuckyTokenWithdrawStatus[];
      tokenId?: number;
      startTime?: number;
      endTime?: number;
      fromId?: number;
      offset?: number;
      limit?: number;
      isNft?: boolean;
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
      tokens?: number[];
      isNft?: boolean;
      offset?: number;
      limit?: number;
    },
    apiKey: string
  ): Promise<{
    raw_data: R;
    totalNum: number;
    tokenBalance: Array<
      loopring_defs.UserBalanceInfo & {
        isNft?: boolean;
        nftTokenInfo?: loopring_defs.NFTTokenInfo;
      }
    >;
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_LUCK_TOKEN_BALANCES,
      queryParams: { 
        ...request, 
        // statuses: request.tokens?.join(",") 
      },
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
      totalNum: raw_data?.length,
      tokenBalance: raw_data,
    };
  }
  public async getLuckTokenClaimedLuckyTokens<R>(
    request: {
      fromId: number;
      limit?: number;
      hashes?: string[];
      isNft?: boolean;
    },
    apiKey: string
  ): Promise<{
    raw_data: R;
    totalNum: number;
    claimedHistory: Array<
      loopring_defs.LuckyTokenItemForReceive & { id: number }
    >;
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
    tokenSummaryList: {
      tokenId: number;
      amount: string;
      isNft?: Boolean;
      nftTokenInfo?: NFTTokenInfo & Partial<UserNFTBalanceInfo>;
    }[];
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
  public async getLuckTokenNFTBalances<R>(request: {
    accountId: number,
  }, apiKey: string): Promise<{
    raw_data: R;
    amount: number;
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_LUCK_TOKEN_NFTBALANCES,
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
    return {
      raw_data,
      amount: raw_data.amount as number
      // totalNum: raw_data.count,
      // tokenSummaryList: raw_data.tokenSummaryList,
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
    eddsaKey: string;
    apiKey: string;
  }): Promise<{
    raw_data: R;
  }> {
    const dataToSig: Map<string, any> = sortObjDictionary(request);

    const reqParams: ReqParams = {
      url: LOOPRING_URLs.POST_LUCK_TOKEN_CLAIMLUCKYTOKEN,
      bodyParams: request,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.EDDSA_SIG,
      sigObj: {
        dataToSig,
        PrivateKey: eddsaKey,
      },
      apiKey,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    return { raw_data, ...raw_data };
  }
  public async sendLuckTokenClaimBlindBox<R>({
    request,
    apiKey,
    eddsaKey,
  }: {
    request: {
      hash: string;
      claimer: string;
      referrer: string;
    };
    eddsaKey: string;
    apiKey: string;
  }): Promise<{
    raw_data: R;
  }> {
    const dataToSig: Map<string, any> = sortObjDictionary(request);

    const reqParams: ReqParams = {
      url: LOOPRING_URLs.POST_LUCK_TOKEN_CLAIMBLINDBOX,
      bodyParams: request,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.EDDSA_SIG,
      sigObj: {
        dataToSig,
        PrivateKey: eddsaKey,
      },
      apiKey,
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
    transfer.payeeId = 0;
    transfer.memo = `LuckTokenWithdrawalBy${request.claimer}`;
    transfer.maxFee = {
      volume: "0",
      tokenId: 0,
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
    let { maxFee, token, ..._transfer } = transfer;
    // @ts-ignore
    _transfer = {
      ..._transfer,
      maxFeeAmount: maxFee.volume,
      feeToken: maxFee.tokenId,
      amount: token.volume,
      token: token.tokenId,
      ecdsaAuth: ecdsaSignature,
      eddsaSig: sign_tools.get_EddsaSig_Transfer(
        transfer as loopring_defs.OriginTransferRequestV3,
        eddsaKey
      ).result,
    } as any;

    request = {
      ...request,
      transfer: JSON.stringify(_transfer) as any,
    };

    const reqParams: ReqParams = {
      url: LOOPRING_URLs.POST_LUCK_TOKEN_WITHDRAWALS,
      apiKey,
      method: ReqMethod.POST,
      bodyParams: { ...request },
      sigFlag: SIG_FLAG.NO_SIG,
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
      isIdempotent: boolean;
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
      // @ts-ignore
      nftData,
    } = request;

    try {
      let transfer: any, eddsaSig;
      if (nftData) {
        transfer = {
          ...rest,
          fromAccountId: rest.payerId,
          fromAddress: rest.payerAddr,
          toAccountId: 0,
          toAddress: rest.payeeAddr,
          maxFee: {
            tokenId: feeToken,
            amount: maxFeeAmount,
          },
          payeeId: 0,
          memo: `LuckTokenSendBy${accountId}`,
          token: {
            nftData,
            tokenId: token,
            amount: amount,
          },
        } as loopring_defs.OriginNFTTransferRequestV3;
        const sigHW = async () => {
          const result = await sign_tools.signNFTTransferWithoutDataStructure(
            web3,
            transfer.payerAddr,
            transfer,
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
          try {
            if (isHWAddr) {
              await sigHW();
            } else {
              const result = await sign_tools.signTNFTransferWithDataStructure(
                web3,
                transfer.payerAddr,
                transfer,
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
              // signOffchainWithdrawWithDataStructureForContract
              const result =
                await sign_tools.signNFTTransferWithDataStructureForContract(
                  web3,
                  transfer.payerAddr,
                  transfer,
                  chainId,
                  accountId
                );
              ecdsaSignature = result.ecdsaSig;
            } else if (counterFactualInfo) {
              const result =
                await sign_tools.signNFTTransferWithDataStructureForContract(
                  web3,
                  transfer.payerAddr,
                  transfer,
                  chainId,
                  accountId,
                  counterFactualInfo
                );
              ecdsaSignature = result.ecdsaSig;
              // myLog("NFTransfer ecdsaSignature:", ecdsaSignature);
            } else {
              await sigHW();
            }
          } catch (err) {
            throw {
              ...this.genErr(err as any),
            };
          }
        }
        eddsaSig = get_EddsaSig_NFT_Transfer(transfer, eddsaKey).result;
      } else {
        transfer = {
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
        eddsaSig = sign_tools.get_EddsaSig_Transfer(transfer, eddsaKey).result;
      }

      request = {
        ...request,
        nftData,
        luckyToken: {
          ...request.luckyToken,
          payeeId: 0,
          memo: `LuckTokenSendBy${accountId}`,
          eddsaSig,
        },
      };
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
    } catch (error) {
      throw error;
    }
  }

  public async getLuckTokenClaimedBlindBox<R>(
    request: {
      fromId: number;
      limit?: number;
      isNft?: boolean;
      offset?: number;
      statuses?: number[]
    },
    apiKey: string
  ): Promise<{
    raw_data: R;
    totalNum: number;
    list: Array<
      loopring_defs.LuckyTokenBlindBoxItemReceive & { id: number }
    >;
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_LUCK_TOKEN_CLAIMEDBLINDBOX,
      queryParams: { ...request, statuses: request?.statuses?.join(",") },
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
      list: raw_data.list,
    };
  }
}
