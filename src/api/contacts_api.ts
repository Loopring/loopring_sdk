/* eslint-disable camelcase  */
import { BaseAPI } from "./base_api";

import {
  CreateContactRequest,
  DeleteContactRequest,
  GetContactsRequest,
  GetContactsResponse,
  LOOPRING_URLs,
  ReqMethod,
  ReqParams,
  SIG_FLAG,
  UpdateContactRequest,
} from "../defs";

export class ContactAPI extends BaseAPI {

  public async getContacts(
    request: GetContactsRequest,
    apiKey: string,
    // url: string = LOOPRING_URLs.GET_CONTACTS
  ) {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_CONTACTS,
      queryParams: request, //request
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
      apiKey
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    console.log(raw_data)
    return raw_data as GetContactsResponse
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

  public async createContact(
    request: CreateContactRequest,
    apiKey: string,
    // url: string = LOOPRING_URLs.GET_CONTACTS
  ) {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.CREATE_CONTACT,
      bodyParams: request, //request
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.NO_SIG,
      apiKey,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    return raw_data as boolean
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
  public async updateContact(
    request: UpdateContactRequest,
    apiKey: string,
    // url: string = LOOPRING_URLs.GET_CONTACTS
  ) {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.UPDATE_CONTACT,
      bodyParams: request, //request
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.NO_SIG,
      apiKey,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    return raw_data as boolean
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
  public async deleteContact(
    request: DeleteContactRequest,
    apiKey: string,
    // url: string = LOOPRING_URLs.GET_CONTACTS
  ) {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.DELETE_CONTACT,
      bodyParams: request, //request
      method: ReqMethod.DELETE,
      sigFlag: SIG_FLAG.NO_SIG,
      apiKey,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    return raw_data as boolean
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