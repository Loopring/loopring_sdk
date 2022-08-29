/* eslint-disable camelcase  */
import { BaseAPI } from "./base_api";
import {
  DefiMarketInfo,
  LoopringMap,
  ReqParams,
  SEP,
  SoursURL,
  TokenAddress,
  TokenInfo,
  TokenRelatedInfo,
  ReqMethod,
  SIG_FLAG,
  LOOPRING_URLs,
  SigPatchField,
  RESULT_INFO, GetDefiMarketRequest,
} from "../defs";
import * as loopring_defs from "../defs/loopring_defs";

export class DefiAPI extends BaseAPI {
  /*
   * Returns the fee rate of users placing orders in specific markets
   */
  public async getDefiToken<R>(): Promise<{
    raw_data: R;
    tokensMap: LoopringMap<TokenInfo>;
    idIndex: LoopringMap<string>;
    addressIndex: LoopringMap<TokenAddress>;
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

    const tokensMap: LoopringMap<TokenInfo> = {};
    const addressIndex: LoopringMap<TokenAddress> = {};
    const idIndex: LoopringMap<string> = {};
    if (raw_data instanceof Array) {
      raw_data.forEach((item: TokenInfo) => {
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
    url: string = LOOPRING_URLs.GET_DEFI_MARKETS,
  ): Promise<{
    markets: LoopringMap<DefiMarketInfo>;
    pairs: LoopringMap<TokenRelatedInfo>;
    tokenArr: string[];
    tokenArrStr: string;
    marketArr: string[];
    marketArrStr: string;
    raw_data: R;
  }> {
    const reqParams: ReqParams = {
      url,
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
    const markets: LoopringMap<DefiMarketInfo> = {};

    const pairs: LoopringMap<TokenRelatedInfo> = {};

    // const isMix = url === LOOPRING_URLs.GET_MIX_MARKETS;

    if (raw_data?.markets instanceof Array) {
      raw_data.markets.forEach((item: any) => {
        const marketInfo: DefiMarketInfo = {
          ...item,
        };

        markets[item.market] = marketInfo;


        if (item.enabled) {
          const [_markets, type, base, quote] = item.market.match(/^(\w+-)?(\w+)-(\w+)$/i)
          if (type === 'DUAL-' && base && quote) {
            if (!pairs[ base ]) {
              pairs[ base ] = {
                tokenId: item.baseTokenId,
                tokenList: [quote],
              };
            } else {
              pairs[ base ].tokenList = [...pairs[ base ].tokenList, quote];
            }
            if (!pairs[ quote ]) {
              pairs[ quote ] = {
                tokenId: item.baseTokenId,
                tokenList: [base],
              };
            } else {
              pairs[ quote ].tokenList = [...pairs[ base ].tokenList, base];
            }
          } else if (base && quote) {
            const market: string = item.market;
            // const ind = market.indexOf("-");
            // const base = market.substring(0, ind);
            // const quote = market.substring(ind + 1, market.length);

            if (!pairs[ base ]) {
              pairs[ base ] = {
                tokenId: item.baseTokenId,
                tokenList: [quote],
              };
            } else {
              pairs[ base ].tokenList = [...pairs[ base ].tokenList, quote];
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
      url: LOOPRING_URLs.GET_DEFI_ORDER,
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
    request: loopring_defs.GetUserDefiRewardRequest,
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
}
