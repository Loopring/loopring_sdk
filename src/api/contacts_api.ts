/* eslint-disable camelcase  */
import { BaseAPI } from "./base_api";

import {
  LOOPRING_URLs,
  ReqMethod,
  ReqParams,
  SIG_FLAG,
} from "../defs";

export class ContactAPI extends BaseAPI {
  /*
   * Returns the fee rate of users placing orders in specific markets
   */

  public async getContacts<R>(
    // request: loopring_defs.GetDefiMarketRequest,
    url: string = LOOPRING_URLs.GET_CONTACTS
  ): Promise<any> {
    
    
    
    const reqParams: ReqParams = {
      url,
      queryParams: {}, //request
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    debugger
    // if (raw_data?.resultInfo) {
    //   return {
    //     ...raw_data?.resultInfo,
    //   };
    // }
    // const markets: loopring_defs.LoopringMap<loopring_defs.DefiMarketInfo> = {};

    // const pairs: loopring_defs.LoopringMap<loopring_defs.TokenRelatedInfo> = {};

    // // const isMix = url === LOOPRING_URLs.GET_MIX_MARKETS;

    // if (raw_data?.markets instanceof Array) {
    //   const types = request?.defiType?.split(",");
    //   let _markets = [];
    //   if (types) {
    //     _markets = raw_data.markets.filter(
    //       (item: loopring_defs.DefiMarketInfo) =>
    //         types.includes(item.type?.toUpperCase())
    //     );
    //   } else {
    //     _markets = raw_data.markets;
    //   }
    //   _markets.forEach((item: any) => {
    //     const marketInfo: loopring_defs.DefiMarketInfo = {
    //       ...item,
    //     };

    //     markets[item.market] = marketInfo;

    //     if (item.enabled) {
    //       const [_markets, type, base, quote] =
    //         item.market.match(/^(\w+-)?(\w+)-(\w+)$/i);
    //       if (type === "DUAL-" && base && quote) {
    //         if (!pairs[base]) {
    //           pairs[base] = {
    //             tokenId: item.baseTokenId,
    //             tokenList: [quote],
    //           };
    //         } else {
    //           pairs[base].tokenList = [...pairs[base].tokenList, quote];
    //         }
    //         if (!pairs[quote]) {
    //           pairs[quote] = {
    //             tokenId: item.baseTokenId,
    //             tokenList: [base],
    //           };
    //         } else {
    //           pairs[quote].tokenList = [...pairs[quote].tokenList, base];
    //         }
    //       } else if (base && quote) {
    //         const market: string = item.market;
    //         // const ind = market.indexOf("-");
    //         // const base = market.substring(0, ind);
    //         // const quote = market.substring(ind + 1, market.length);

    //         if (!pairs[base]) {
    //           pairs[base] = {
    //             tokenId: item.baseTokenId,
    //             tokenList: [quote],
    //           };
    //         } else {
    //           pairs[base].tokenList = [...pairs[base].tokenList, quote];
    //         }
    //       }
    //     }
    //   });
    // }
    // const marketArr: string[] = Reflect.ownKeys(markets) as string[];
    // const tokenArr: string[] = Reflect.ownKeys(pairs) as string[];
    // return {
    //   markets,
    //   pairs,
    //   tokenArr,
    //   tokenArrStr: tokenArr.join(SEP),
    //   marketArr,
    //   marketArrStr: marketArr.join(SEP),
    //   raw_data,
    // };
  }

}

// ContactAPI.get