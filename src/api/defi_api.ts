/* eslint-disable camelcase  */
import { BaseAPI } from "./base_api";
import * as fm from "../utils/formatter";

import * as loopring_defs from "../defs/loopring_defs";
import { SEP } from "../defs";
import {
  ConnectorNames,
  LOOPRING_URLs,
  ReqMethod,
  ReqParams,
  RESULT_INFO,
  SIG_FLAG,
  SigPatchField,
  SigSuffix,
  SoursURL,
} from "../defs";
import { sortObjDictionary } from "../utils";
import * as sign_tools from "./sign/sign_tools";
import { isContract } from "./contract_api";
import { AxiosResponse } from "axios";
import { DepthData } from "../defs/loopring_defs";
import { getMidPrice } from "./exchange_api";
import { dexDethRawMock } from "../tests/MockSwapData";
import { myLog } from "../utils/log_tools";

export class DefiAPI extends BaseAPI {
  /*
   * Returns the fee rate of users placing orders in specific markets
   */
  public async getDefiToken<R>(): Promise<{
    raw_data: R;
    tokensMap: loopring_defs.LoopringMap<loopring_defs.TokenInfo>;
    idIndex: loopring_defs.LoopringMap<string>;
    addressIndex: loopring_defs.LoopringMap<loopring_defs.TokenAddress>;
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_DEFI_TOKENS,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }

    const tokensMap: loopring_defs.LoopringMap<loopring_defs.TokenInfo> = {};
    const addressIndex: loopring_defs.LoopringMap<loopring_defs.TokenAddress> =
      {};
    const idIndex: loopring_defs.LoopringMap<string> = {};
    if (raw_data instanceof Array) {
      raw_data.forEach((item: loopring_defs.TokenInfo) => {
        if (item.symbol.startsWith("LP-")) {
          item.isLpToken = true;
        } else {
          item.isLpToken = false;
        }
        tokensMap[item.symbol] = item;

        const coinInfo = {
          icon: SoursURL + `ethereum/assets/${item.address}/logo.png`,
          name: item.symbol,
          simpleName: item.symbol,
          description: item.type,
          company: "",
        };
        // totalCoinMap[item.symbol] = coinInfo;
        addressIndex[item.address.toLowerCase()] = item.symbol;
        idIndex[item.tokenId] = item.symbol;
      });
    }

    return {
      tokensMap,
      idIndex,
      addressIndex,
      raw_data,
    };
  }

  public async getDefiMarkets<R>(
    request: loopring_defs.GetDefiMarketRequest,
    url: string = LOOPRING_URLs.GET_DEFI_MARKETS
  ): Promise<{
    markets: loopring_defs.LoopringMap<loopring_defs.DefiMarketInfo>;
    pairs: loopring_defs.LoopringMap<loopring_defs.TokenRelatedInfo>;
    tokenArr: string[];
    tokenArrStr: string;
    marketArr: string[];
    marketArrStr: string;
    raw_data: R;
  }> {
    const reqParams: ReqParams = {
      url,
      queryParams: {}, //request
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    const markets: loopring_defs.LoopringMap<loopring_defs.DefiMarketInfo> = {};

    const pairs: loopring_defs.LoopringMap<loopring_defs.TokenRelatedInfo> = {};

    // const isMix = url === LOOPRING_URLs.GET_MIX_MARKETS;

    if (raw_data?.markets instanceof Array) {
      const types = request?.defiType?.split(",");
      let _markets = [];
      if (types) {
        _markets = raw_data.markets.filter(
          (item: loopring_defs.DefiMarketInfo) =>
            types.includes(item.type?.toUpperCase())
        );
      } else {
        _markets = raw_data.markets;
      }
      _markets.forEach((item: any) => {
        const marketInfo: loopring_defs.DefiMarketInfo = {
          ...item,
        };

        markets[item.market] = marketInfo;

        if (item.enabled) {
          const [_markets, type, base, quote] =
            item.market.match(/^(\w+-)?(\w+)-(\w+)$/i);
          if (type === "DUAL-" && base && quote) {
            if (!pairs[base]) {
              pairs[base] = {
                tokenId: item.baseTokenId,
                tokenList: [quote],
              };
            } else {
              pairs[base].tokenList = [...pairs[base].tokenList, quote];
            }
            if (!pairs[quote]) {
              pairs[quote] = {
                tokenId: item.baseTokenId,
                tokenList: [base],
              };
            } else {
              pairs[quote].tokenList = [...pairs[quote].tokenList, base];
            }
          } else if (base && quote) {
            const market: string = item.market;
            // const ind = market.indexOf("-");
            // const base = market.substring(0, ind);
            // const quote = market.substring(ind + 1, market.length);

            if (!pairs[base]) {
              pairs[base] = {
                tokenId: item.baseTokenId,
                tokenList: [quote],
              };
            } else {
              pairs[base].tokenList = [...pairs[base].tokenList, quote];
            }
          }
        }
      });
    }
    const marketArr: string[] = Reflect.ownKeys(markets) as string[];
    const tokenArr: string[] = Reflect.ownKeys(pairs) as string[];
    return {
      markets,
      pairs,
      tokenArr,
      tokenArrStr: tokenArr.join(SEP),
      marketArr,
      marketArrStr: marketArr.join(SEP),
      raw_data,
    };
  }

  public async orderDefi<R>(
    request: loopring_defs.DefiOrderRequest,
    privateKey: string,
    apiKey: string
  ): Promise<
    | (Omit<any, "resultInfo"> & { raw_data: Omit<any, "resultInfo"> })
    | RESULT_INFO
  > {
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
    ];

    const reqParams: ReqParams = {
      url: LOOPRING_URLs.POST_DEFI_ORDER,
      bodyParams: request,
      apiKey,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.EDDSA_SIG_POSEIDON,
      sigObj: {
        dataToSig,
        sigPatch: SigPatchField.EddsaSignature,
        PrivateKey: privateKey,
      },
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    return this.returnTxHash(raw_data);
  }

  public async getDefiReward<R>(
    request: loopring_defs.GetUserDefiRewardRequest,
    apiKey: string
  ): Promise<
    | {
        raw_data: R;
        totalNum: number;
        totalRewards: string;
        lastDayRewards: string;
        rewards: [];
      }
    | RESULT_INFO
  > {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_DEFI_REWARDS,
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
      ...raw_data,
      raw_data,
    };
  }

  public async getDefiTransaction<R>(
    request: loopring_defs.GetUserDefiTxRequest,
    apiKey: string
  ): Promise<
    | {
        raw_data: R;
        totalNum: number;
        userDefiTxs: loopring_defs.UserDefiTxsHistory[];
      }
    | RESULT_INFO
  > {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_DEFI_TRANSACTIONS,
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
      totalNum: raw_data?.totalNum,
      userDefiTxs: raw_data.transactions as loopring_defs.UserDefiTxsHistory[],
      raw_data,
    };
  }

  public async getDualInfos<R>(
    request: loopring_defs.GetDualInfosRequest
  ): Promise<
    | RESULT_INFO
    | {
        totalNum: number;
        dualInfo: {
          infos: loopring_defs.DualProductAndPrice[];
          index: loopring_defs.DualIndex;
          balance: loopring_defs.DualBalance[];
          rules: loopring_defs.DualRulesCoinsInfo[];
        };
        raw_data: R;
      }
  > {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_DUAL_INFOS,
      queryParams: request,
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
      totalNum: raw_data?.totalNum,
      dualInfo: {
        infos: raw_data.infos as loopring_defs.DualProductAndPrice[],
        index: raw_data.index as loopring_defs.DualIndex,
        balance: raw_data.balance as loopring_defs.DualBalance[],
        rules: raw_data.rules as loopring_defs.DualRulesCoinsInfo[],
      },
      raw_data,
    };
  }

  public async getDualBalance<R>(request = undefined) {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_DUAL_BALANCE,
      queryParams: request,
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
      dualBalanceMap: [...raw_data].reduce((prev, item) => {
        return { ...prev, [item.coin]: item };
      }, {} as loopring_defs.LoopringMap<loopring_defs.DualBalance>),
    };
  }

  // public async getDualRule<R>(request :loopring_defs.GetDualRuleRequest): Promise<RESULT_INFO | {
  //
  // 	raw_data: R,
  // }> {
  // 	const reqParams: loopring_defs.ReqParams = {
  // 		url: LOOPRING_URLs.GET_DUAL_RULE,
  // 		queryParams: request,
  // 		method: ReqMethod.GET,
  // 		sigFlag: SIG_FLAG.NO_SIG,
  // 	};
  // 	const raw_data = (await this.makeReq().request(reqParams)).data;
  // 	if (raw_data?.resultInfo) {
  // 		return {
  // 			...raw_data?.resultInfo,
  // 		};
  // 	}
  //
  //
  // 	return {
  // 		raw_data,
  // 		dualBalanceMap: [...raw_data].reduce((item, prev) => {
  // 			return {...prev, [ item.coin ]: item};
  // 		}, {} as loopring_defs.loopring_defs.LoopringMap<loopring_defs.DualBalance>)
  // 	}
  // }

  public async getDualPrices(request: loopring_defs.GetDualPricesRequest) {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_DUAL_PRICES,
      queryParams: request,
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
      infos: raw_data.infos as loopring_defs.DualPrice[],
    };
  }

  public async getDualIndex(request: {
    baseSymbol: string;
    quoteSymbol: string;
  }) {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_DUAL_INDEX,
      queryParams: request,
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
      dualPrice: raw_data as loopring_defs.DualPrice[],
    };
  }

  public async getDualTransactions(
    request: loopring_defs.GetUserDualTxRequest,
    apiKey: string
  ) {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_DUAL_TRANSACTIONS,
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
      totalNum: raw_data?.totalNum,
      userDualTxs: raw_data.transactions as loopring_defs.UserDualTxsHistory[],
      raw_data,
    };
    return;
  }

  public async orderDual(
    request: loopring_defs.DualOrderRequest,
    privateKey: string,
    apiKey: string
  ) {
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
    ];

    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.POST_DUAL_ORDER,
      bodyParams: request,
      apiKey,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.EDDSA_SIG_POSEIDON,
      sigObj: {
        dataToSig,
        sigPatch: SigPatchField.EddsaSignature,
        PrivateKey: privateKey,
      },
    };
    const raw_data = (await this.makeReq().request(reqParams)).data;
    return this.returnTxHash(raw_data);
  }

  public async getDualUserLocked(
    {
      lockTag = [
        loopring_defs.DUAL_TYPE.DUAL_BASE,
        loopring_defs.DUAL_TYPE.DUAL_CURRENCY,
      ],
      ...request
    }: loopring_defs.DualUserLockedRequest,
    apiKey: string
  ) {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_DUAL_USER_LOCKED,
      queryParams: { ...request, lockTag: lockTag.join(",") },
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
      lockRecord: raw_data.lockRecord,
      raw_data,
    };
    return;
  }

  public async sendStakeClaim(
    req: loopring_defs.OriginStakeClaimRequestV3WithPatch,
    options?: { accountId?: number; counterFactualInfo?: any }
  ) {
    const {
      request,
      web3,
      chainId,
      walletType,
      eddsaKey,
      apiKey,
      isHWAddr: isHWAddrOld,
    } = req;
    const { accountId, counterFactualInfo }: any = options
      ? options
      : { accountId: 0 };
    const { transfer } = request;

    const isHWAddr = !!isHWAddrOld;
    let ecdsaSignature = undefined;
    transfer.payeeId = 0;
    transfer.memo = `STAKE-CLAIM->${request.accountId}`;

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
    const dataToSig: Map<string, any> = sortObjDictionary(request);
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.POST_STAKE_CLAIM,
      bodyParams: request,
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
      if (raw_data?.resultInfo) {
        return {
          ...raw_data?.resultInfo,
        };
      }
      return { raw_data, ...raw_data };
    } catch (error) {
      throw error as AxiosResponse;
    }
    // return this.returnTxHash(raw_data);
    // const raw_data = (await this.makeReq().request(reqParams)).data;
  }

  public async sendStakeRedeem(
    request: {
      accountId: number;
      hash: string;
      token: loopring_defs.TokenVolumeV3;
    },
    privateKey: string,
    apiKey: string
  ) {
    const dataToSig: Map<string, any> = sortObjDictionary(request);
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.POST_STAKE_REDEEM,
      bodyParams: request,
      apiKey,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.EDDSA_SIG,
      sigObj: {
        dataToSig,
        PrivateKey: privateKey,
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
  public async sendStake(
    request: {
      accountId: number;
      token: loopring_defs.TokenVolumeV3;
      timestamp: number;
    },
    privateKey: string,
    apiKey: string
  ) {
    const dataToSig: Map<string, any> = sortObjDictionary(request);
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.POST_STAKE,
      bodyParams: request,
      apiKey,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.EDDSA_SIG,
      sigObj: {
        dataToSig,
        PrivateKey: privateKey,
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

  public async getStakeProducts<R>(): Promise<{
    products: loopring_defs.STACKING_PRODUCT[];
    raw_data: R;
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_STAKE_PRODUCTS,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    return { products: raw_data, raw_data };
  }

  public async getStakeSummary<R>(
    request: {
      accountId: number;
      tokenId: number;
      start?: number;
      end?: number;
      limit?: number;
      offset?: number;
      hashes?: string;
      statuses?: string;
    },
    apiKey: string
  ): Promise<
    | {
        raw_data: R;
        totalNum: number;
        totalStaked: string;
        totalStakedRewards: string;
        totalLastDayPendingRewards: string;
        totalClaimableRewards: string;
        list: loopring_defs.StakeInfoOrigin[];
      }
    | RESULT_INFO
  > {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_STAKE_SUMMARY,
      queryParams: { ...request },
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
    return { ...raw_data, list: raw_data.staking, raw_data };
  }

  public async getStakeTransactions<R>(
    request: {
      accountId: number;
      tokenId: number;
      start?: number;
      end?: number;
      limit?: number;
      offset?: number;
      hashes?: string;
      types?: string;
    },
    apiKey: string
  ): Promise<{
    list: loopring_defs.STACKING_TRANSACTIONS[];
    totalNum: number;
    raw_data: R;
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_STAKE_TRANSACTIONS,
      queryParams: { ...request },
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
      list: raw_data,
      totalNum: raw_data.totalNum,
      raw_data,
    };
  }

  public async getCefiMarkets<R>(): Promise<{
    markets: loopring_defs.LoopringMap<
      loopring_defs.CEX_MARKET & { type: "CEX" }
    >;
    pairs: loopring_defs.LoopringMap<loopring_defs.TokenRelatedInfo>;
    tokenArr: string[];
    tokenArrStr: string;
    marketArr: string[];
    marketArrStr: string;
    raw_data: R;
  }> {
    const reqParams = {
      url: LOOPRING_URLs.GET_CEFI_MARKETS,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };
    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    const markets: loopring_defs.LoopringMap<
      loopring_defs.CEX_MARKET & { type: "CEX" }
    > = {};

    const pairs: loopring_defs.LoopringMap<loopring_defs.TokenRelatedInfo> = {};

    // const isMix = url === LOOPRING_URLs.GET_MIX_MARKETS;

    if (raw_data instanceof Array) {
      // let _markets = [];
      // if (types) {
      //   _markets = raw_data.markets.filter(
      //     (item: loopring_defs.DefiMarketInfo) =>
      //       types.includes(item.type?.toUpperCase())
      //   );
      // } else {
      //   _markets = raw_data.markets;
      // }
      raw_data.forEach((item: any) => {
        const marketInfo: loopring_defs.CEX_MARKET = {
          ...item,
        };

        markets[marketInfo.market] = { ...marketInfo, type: "CEX" };
        const { base, quote } = marketInfo?.cefiAmount ?? {
          base: "",
          quote: "",
        };
        if (marketInfo.enabled && marketInfo.cefiAmount && base && quote) {
          if (!pairs[base]) {
            pairs[base] = {
              tokenId: item.baseTokenId,
              tokenList: [quote],
            };
          } else {
            pairs[base].tokenList = [...pairs[base].tokenList, quote];
          }
          if (!pairs[quote]) {
            pairs[quote] = {
              tokenId: item.baseTokenId,
              tokenList: [base],
            };
          } else {
            pairs[quote].tokenList = [...pairs[quote].tokenList, base];
          }
        }
      });
    }
    const marketArr: string[] = Reflect.ownKeys(markets) as string[];
    const tokenArr: string[] = Reflect.ownKeys(pairs) as string[];
    return {
      markets,
      pairs,
      tokenArr,
      tokenArrStr: tokenArr.join(SEP),
      marketArr,
      marketArrStr: marketArr.join(SEP),
      raw_data,
    };
  }

  public async getCefiDepth<R>({
    request,
  }: {
    request: {
      market: string;
      level: number;
      limit?: number;
    };
  }): Promise<{
    depth: loopring_defs.DepthData;
    raw_data: R;
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_CEFI_DEPTH,
      queryParams: { ...request },
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };
    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    const symbol = raw_data.market;
    const timestamp = raw_data.timestamp;

    const { asks, bids, mid_price } = getMidPrice({
      _asks: raw_data.asks,
      _bids: raw_data.bids,
    });

    const depth: DepthData = {
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
    };

    return {
      depth,
      raw_data: raw_data as unknown as R,
    };
  }
  public async getCefiOrders<R>({
    request,
    apiKey,
  }: {
    request: {
      accountId: number;
    };
    apiKey: string;
  }) {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_CEFI_ORDERS,
      queryParams: { ...request },
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
      list: raw_data.transactions,
      totalNum: raw_data.totalNum,
      raw_data,
    };
  }

  public async sendCefiOrder({
    request,
    privateKey,
    apiKey,
  }: {
    request: loopring_defs.OriginCEXV3OrderRequest;
    privateKey: string;
    apiKey: string;
  }) {
    const dataToSig: Map<string, any> = sortObjDictionary(request);
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.POST_CEFI_ORDER,
      bodyParams: request,
      apiKey,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.EDDSA_SIG,
      sigObj: {
        dataToSig,
        PrivateKey: privateKey,
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
}
