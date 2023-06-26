/* eslint-disable camelcase  */

import { BaseAPI } from "./base_api";

import {
  RESULT_INFO,
  ReqMethod,
  SIG_FLAG,
  SigPatchField,
  TradeChannel,
  LOOPRING_URLs,
  ConnectorNames,
  SigSuffix,
  NFTFactory,
  ChainId,
  NFTFactory_Collection,
  LoopringErrorCode,
  ConnectorError,
  CounterFactualInfo,
  EXTRAORDER_TYPE,
  UserLockSummary,
} from "../defs";

import * as loopring_defs from "../defs/loopring_defs";

import * as sign_tools from "./sign/sign_tools";
import { isContract } from "./contract_api";
import BN from "bn.js";
import { RequiredPart, sortObjDictionary } from "../utils";
import {
  generateKeyPair,
  getEdDSASigWithPoseidon,
  KeyPairParams,
} from "./sign/sign_tools";
import { AxiosResponse } from "axios";

export class UserAPI extends BaseAPI {
  /*
   * Change the ApiKey associated with the user's account.
   * The current ApiKey must be provided as the value of the X-API-KEY HTTP header.
   */
  public async updateUserApiKey<R>(
    request: loopring_defs.UpdateUserApiKeyRequest,
    apiKey: string,
    eddsaKey: string
  ): Promise<{ raw_data: R }> {
    const dataToSig: Map<string, any> = new Map();

    dataToSig.set("accountId", request.accountId);

    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.API_KEY_ACTION,
      bodyParams: request,
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
    return {
      raw_data,
    };
  }

  /*
   * Fetches the next order id for a given sold token.
   * If the need arises to repeatedly place orders in a short span of time,
   * the order id can be initially fetched through the API and then managed locally.
   * Each new order id can be derived from adding 2 to the last one
   */
  public async getNextStorageId<R>(
    request: loopring_defs.GetNextStorageIdRequest,
    apiKey: string
  ): Promise<{ raw_data: R; orderId: number; offchainId: number }> {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_NEXT_STORAGE_ID,
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
    const { orderId, offchainId } = raw_data;
    return {
      orderId,
      offchainId,
      raw_data,
    };
  }

  /*
   * Get the details of an order based on order hash.
   */
  public async getOrderDetails<R>(
    request: loopring_defs.GetOrderDetailsRequest,
    apiKey: string
  ): Promise<{ raw_data: R; orderDetail: loopring_defs.OrderDetail }> {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.ORDER_ACTION,
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
      orderDetail: raw_data,
      raw_data,
    };
  }

  public async getOrders<R>(
    request: loopring_defs.GetOrdersRequest,
    apiKey: string
  ): Promise<{
    raw_data: R;
    totalNum: number;
    orders: loopring_defs.OrderDetail[];
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_MULTI_ORDERS,
      queryParams: {
        ...request,
        status: request.status ? request.status.join(",") : "",
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
    const totalNum: number = raw_data.totalNum;
    const orders: loopring_defs.OrderDetail[] = raw_data.orders;

    return {
      totalNum,
      orders,
      raw_data,
    };
  }

  /*
   * Submit an order
   */
  public async submitOrder(
    {
      extraOrderType = EXTRAORDER_TYPE.TRADITIONAL_ORDER,
      ...orderRequest
    }: loopring_defs.SubmitOrderRequestV3,
    privateKey: string,
    apiKey: string
  ) {
    if (!orderRequest.tradeChannel) {
      orderRequest.tradeChannel = TradeChannel.MIXED;
    }

    const dataToSig = [
      orderRequest.exchange,
      orderRequest.storageId,
      orderRequest.accountId,
      orderRequest.sellToken.tokenId,
      orderRequest.buyToken.tokenId,
      orderRequest.sellToken.volume,
      orderRequest.buyToken.volume,
      orderRequest.validUntil,
      orderRequest.maxFeeBips,
      orderRequest.fillAmountBOrS ? 1 : 0,
      0,
    ];

    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.ORDER_ACTION,
      bodyParams: orderRequest,
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

  public async submitStopOrder(
    {
      extraOrderType = EXTRAORDER_TYPE.STOP_LIMIT,
      stopSide, // = STOP_SIDE.NO_CONDITION,
      ...orderRequest
    }: RequiredPart<
      loopring_defs.SubmitOrderRequestV3,
      "extraOrderType" | "stopSide" | "stopPrice"
    >,
    privateKey: string,
    apiKey: string
  ) {
    if (!orderRequest.tradeChannel) {
      orderRequest.tradeChannel = TradeChannel.MIXED;
    }

    const dataToSig = [
      orderRequest.exchange,
      orderRequest.storageId,
      orderRequest.accountId,
      orderRequest.sellToken.tokenId,
      orderRequest.buyToken.tokenId,
      orderRequest.sellToken.volume,
      orderRequest.buyToken.volume,
      orderRequest.validUntil,
      orderRequest.maxFeeBips,
      orderRequest.fillAmountBOrS ? 1 : 0,
      0,
    ];
    const eddsaSignature = getEdDSASigWithPoseidon(
      dataToSig,
      privateKey
    ).result;
    const bodyParams = {
      ...orderRequest,
      extraOrderType,
      stopSide,
      eddsaSignature,
    };
    const _dataToSig: Map<string, any> = sortObjDictionary(bodyParams);
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.ORDER_ACTION,
      bodyParams: bodyParams,
      apiKey,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.EDDSA_SIG,
      sigObj: {
        dataToSig: _dataToSig,
        PrivateKey: privateKey,
      },
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;

    return this.returnTxHash(raw_data);
  }

  /*
   * Cancel order using order hash or client-side ID.
   */
  public async cancelOrder<R>(
    request: loopring_defs.CancelOrderRequest,
    PrivateKey: string,
    apiKey: string
  ): Promise<{ raw_data: R }> {
    const dataToSig: Map<string, any> = new Map();

    dataToSig.set("accountId", request.accountId);
    if (request.orderHash) dataToSig.set("orderHash", request.orderHash);
    if (request.clientOrderId)
      dataToSig.set("clientOrderId", request.clientOrderId);

    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.ORDER_ACTION,
      queryParams: request,
      apiKey,
      method: ReqMethod.DELETE,
      sigFlag: SIG_FLAG.EDDSA_SIG,
      sigObj: {
        dataToSig,
        PrivateKey,
      },
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    return {
      raw_data,
    };
  }

  /*
   * Cancel multiple orders using order hashes
   */
  public async cancelMultiOrdersByHash<R>(
    request: loopring_defs.CancelMultiOrdersByHashRequest,
    PrivateKey: string,
    apiKey: string
  ): Promise<{ raw_data: R }> {
    const dataToSig: Map<string, any> = new Map();
    dataToSig.set("accountId", request.accountId);
    dataToSig.set("orderHash", request.orderHash);
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.ORDER_CANCEL_HASH_LIST,
      queryParams: request,
      apiKey,
      method: ReqMethod.DELETE,
      sigFlag: SIG_FLAG.EDDSA_SIG,
      sigObj: {
        dataToSig,
        PrivateKey,
      },
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    return {
      raw_data,
    };
  }

  /*
   * Cancel multiple orders using clientOrderIds
   */
  public async cancelMultiOrdersByCreditOrderId<R>(
    request: loopring_defs.CancelMultiOrdersByClientOrderIdRequest,
    PrivateKey: string,
    apiKey: string
  ): Promise<{ raw_data: R }> {
    const dataToSig: Map<string, any> = new Map();
    dataToSig.set("accountId", request.accountId);
    dataToSig.set("clientOrderId", request.clientOrderId);
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.ORDER_CANCEL_CLIENT_ORDER_ID_LIST,
      queryParams: request,
      apiKey,
      method: ReqMethod.DELETE,
      sigFlag: SIG_FLAG.EDDSA_SIG,
      sigObj: {
        dataToSig,
        PrivateKey,
      },
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    return {
      raw_data,
    };
  }

  /*
   * Returns a list Ethereum transactions from users for exchange account registration.
   */
  public async getUserRegTxs<R>(
    request: loopring_defs.GetUserRegTxsRequest,
    apiKey: string
  ): Promise<{
    raw_data: R;
    totalNum: number;
    userRegTxs: loopring_defs.UserRegTx[];
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_USER_REG_TXS,
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
    const userRegTxs: loopring_defs.UserRegTx[] = raw_data.transactions;
    return {
      totalNum: raw_data.totalNum,
      userRegTxs,
      raw_data,
    };
  }

  /*
   * Returns a list Ethereum transactions from users for resetting exchange passwords.
   */
  public async getUserPwdResetTxs<R>(
    request: loopring_defs.GetUserPwdResetTxsRequest,
    apiKey: string
  ): Promise<{
    raw_data: R;
    totalNum: number;
    userPwdResetTxs: loopring_defs.UserPwdResetTx[];
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_PWD_RESET_TXS,
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
    const userPwdResetTxs: loopring_defs.UserPwdResetTx[] =
      raw_data.transactions;
    return {
      totalNum: raw_data.totalNum,
      userPwdResetTxs,
      raw_data,
    };
  }

  /*
   * Returns user's Ether and token balances on exchange.
   */
  public async getUserBalances<R>(
    request: loopring_defs.GetUserBalancesRequest,
    apiKey: string
  ): Promise<{
    raw_data: R;
    userBalances: loopring_defs.LoopringMap<loopring_defs.UserBalanceInfo>;
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_USER_EXCHANGE_BALANCES,
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
    const userBalances: loopring_defs.LoopringMap<loopring_defs.UserBalanceInfo> =
      {};

    if (raw_data instanceof Array) {
      raw_data.forEach((item: loopring_defs.UserBalanceInfo) => {
        userBalances[item.tokenId] = item;
      });
    }

    return {
      userBalances,
      raw_data,
    };
  }

  public async getAssetLookRecords<R>(
    request: loopring_defs.GetUserBalancesRequest,
    apiKey: string
  ): Promise<{
    raw_data: R;
    userBalances: loopring_defs.LoopringMap<loopring_defs.UserBalanceInfo>;
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_ASSET_LOCK_RECORDS,
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
    const userBalances: loopring_defs.LoopringMap<loopring_defs.UserBalanceInfo> =
      {};

    if (raw_data instanceof Array) {
      raw_data.forEach((item: loopring_defs.UserBalanceInfo) => {
        userBalances[item.tokenId] = item;
      });
    }

    return {
      userBalances,
      raw_data,
    };
  }

  /*
   * Returns user's deposit records.
   */
  public async getUserDepositHistory<R>(
    request: loopring_defs.GetUserDepositHistoryRequest,
    apiKey: string
  ): Promise<{
    raw_data: R;
    totalNum: number;
    userDepositHistory: loopring_defs.UserDepositHistoryTx[];
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_USER_DEPOSITS_HISTORY,
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
      userDepositHistory:
        raw_data.transactions as loopring_defs.UserDepositHistoryTx[],
      raw_data,
    };
  }

  /*
   * Get user onchain withdrawal history.
   */
  public async getUserOnchainWithdrawalHistory<R>(
    request: loopring_defs.GetUserOnchainWithdrawalHistoryRequest,
    apiKey: string
  ): Promise<{
    raw_data: R;
    totalNum: number;
    userOnchainWithdrawalHistory: loopring_defs.UserOnchainWithdrawalHistoryTx[];
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.WITHDRAWALS_ACTION,
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
      userOnchainWithdrawalHistory:
        raw_data.transactions as loopring_defs.UserOnchainWithdrawalHistoryTx[],
      raw_data,
    };
  }

  /*
   * Get user transfer list.
   */
  public async getUserTransferList<R>(
    request: loopring_defs.GetUserTransferListRequest,
    apiKey: string
  ): Promise<{
    raw_data: R;
    totalNum: number;
    userTransfers: loopring_defs.UserTransferRecord[];
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_USER_TRANSFERS_LIST,
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
      userTransfers:
        raw_data.transactions as loopring_defs.UserTransferRecord[],
      raw_data,
    };
  }

  /*
   * Get user txs
   */
  public async getUserTxs<R>(
    request: loopring_defs.GetUserTxsRequest,
    apiKey: string
  ): Promise<{
    raw_data: R;
    totalNum: number;
    userTxs: loopring_defs.UserTx[];
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_USER_TXS,
      queryParams: request,
      apiKey,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    const userTxs: loopring_defs.UserTx[] = [];

    if (raw_data?.transactions instanceof Array) {
      raw_data.transactions.forEach((item: loopring_defs.UserTx) => {
        userTxs.push(item);
      });
    }

    return {
      totalNum: raw_data?.totalNum,
      userTxs,
      raw_data,
    };
  }

  /*
   * Get user trade history
   */
  public async getUserTrades<R>(
    request: loopring_defs.GetUserTradesRequest,
    apiKey: string
  ): Promise<{
    raw_data: R;
    totalNum: number;
    userTrades: loopring_defs.UserTrade[];
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_USER_TRADE_HISTORY,
      queryParams: request,
      apiKey,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    const userTrades: loopring_defs.UserTrade[] = [];

    if (raw_data?.trades instanceof Array) {
      raw_data.trades.forEach((item: any[]) => {
        userTrades.push({
          tradeTime: item[0],
          tradeId: item[1],
          side: item[2],
          volume: item[3],
          price: item[4],
          market: item[5],
          fee: item[6],
          type: item[13],
        });
      });
    }

    return {
      totalNum: raw_data.totalNum,
      userTrades,
      raw_data,
    };
  }

  /*
   * deprecated
   * Returns the fee rate of users placing orders in specific markets
   */
  public async getUserFeeRate<R>(
    request: loopring_defs.GetUserFeeRateRequest,
    apiKey: string
  ): Promise<{
    raw_data: R;
    userFreeRateMap: loopring_defs.LoopringMap<loopring_defs.UserFeeRateInfo>;
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_USER_FEE_RATE,
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

    const userFreeRateMap: loopring_defs.LoopringMap<loopring_defs.UserFeeRateInfo> =
      {};

    if (raw_data instanceof Array) {
      raw_data.forEach((item: loopring_defs.UserFeeRateInfo) => {
        userFreeRateMap[item.symbol] = item;
      });
    }

    return {
      userFreeRateMap,
      raw_data,
    };
  }

  /*
   * Returns the user order fee rate of users placing orders in specific markets
   */
  public async getUserOrderFeeRate<R>(
    request: loopring_defs.GetUserOrderFeeRateRequest,
    apiKey: string
  ): Promise<{
    raw_data: R;
    feeRate: loopring_defs.FeeRateInfo;
    gasPrice: number;
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_USER_ORDER_FEE_RATE,
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
    const gasPrice = parseInt(raw_data.gasPrice);

    return {
      feeRate: raw_data.feeRate as loopring_defs.FeeRateInfo,
      gasPrice,
      raw_data,
    };
  }

  /*
   * Query current token minimum amount to place order based on users VIP level and max fee bips
   */
  public async getMinimumTokenAmt<R>(
    request: loopring_defs.GetMinimumTokenAmtRequest,
    apiKey: string
  ): Promise<{
    raw_data: R;
    amounts: [loopring_defs.TokenAmount, loopring_defs.TokenAmount];
    amountMap: loopring_defs.LoopringMap<loopring_defs.TokenAmount>;
    gasPrice: number;
    cacheOverdueAt: any;
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_MINIMUM_TOKEN_AMT,
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
    const gasPrice = parseInt(raw_data.gasPrice);

    const amounts: [loopring_defs.TokenAmount, loopring_defs.TokenAmount] =
      raw_data?.amounts;

    const amountMap: loopring_defs.LoopringMap<loopring_defs.TokenAmount> = {};

    if (amounts instanceof Array) {
      amounts.forEach((item: loopring_defs.TokenAmount) => {
        amountMap[item.tokenSymbol] = item;
      });
    }

    return {
      amounts,
      amountMap,
      gasPrice,
      cacheOverdueAt: raw_data.cacheOverdueAt,
      raw_data,
    };
  }

  /*
   * Query current fee amount
   */
  public async getOffchainFeeAmt<R>(
    request: loopring_defs.GetOffchainFeeAmtRequest,
    apiKey: string
  ): Promise<{
    raw_data: R;
    fees: loopring_defs.LoopringMap<loopring_defs.OffchainFeeInfo>;
    gasPrice: number;
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_OFFCHAIN_FEE_AMT,
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
    const gasPrice = parseInt(raw_data.gasPrice);

    const fees: loopring_defs.LoopringMap<loopring_defs.OffchainFeeInfo> = {};

    if (raw_data?.fees instanceof Array) {
      raw_data.fees.forEach((item: loopring_defs.OffchainFeeInfo) => {
        fees[item.token] = item;
      });
    }

    return {
      fees,
      gasPrice,
      raw_data,
    };
  }

  /*
   * Query current NFTAction fee amount
   */
  public async getNFTOffchainFeeAmt<R>(
    request: loopring_defs.GetNFTOffchainFeeAmtRequest,
    apiKey: string
  ): Promise<{
    raw_data: R;
    fees: loopring_defs.LoopringMap<loopring_defs.OffchainFeeInfo>;
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_NFT_OFFCHAIN_FEE_AMT,
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

    const fees: loopring_defs.LoopringMap<loopring_defs.OffchainFeeInfo> = {};
    if (raw_data?.fees instanceof Array) {
      raw_data.fees.forEach((item: loopring_defs.OffchainFeeInfo) => {
        fees[item.token] = item;
      });
    }

    return {
      fees,
      raw_data,
    };
  }

  /*
   * Submit NFTAction Validate Order request
   */
  public async submitNFTValidateOrder<T extends loopring_defs.TX_HASH_API>(
    req: loopring_defs.OriginNFTValidateOrderRequestV3WithPatch
  ): Promise<loopring_defs.TX_HASH_RESULT<T> | RESULT_INFO> {
    const { request, eddsaKey, apiKey } = req;

    request.eddsaSignature = sign_tools.get_EddsaSig_NFT_Order(
      request,
      eddsaKey
    ).result;

    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.POST_NFT_VALIDATE_ORDER,
      bodyParams: request,
      apiKey,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.NO_SIG,
    };
    // myLog("NFTAction Validate Order request", request);
    const raw_data = (await this.makeReq().request(reqParams)).data;

    return this.returnTxHash(raw_data);
  }

  /*
   * Submit NFTAction Trade request
   */
  public async submitNFTTrade<T extends loopring_defs.TX_HASH_API>(
    req: loopring_defs.OriginNFTTradeRequestV3WithPatch
  ): Promise<loopring_defs.TX_HASH_RESULT<T> | RESULT_INFO> {
    const { request, apiKey, eddsaKey } = req;

    const dataToSig: Map<string, any> = new Map();
    dataToSig.set("maker", request.maker);
    dataToSig.set("makerFeeBips", request.makerFeeBips);
    dataToSig.set("taker", request.taker);
    dataToSig.set("takerFeeBips", request.takerFeeBips);
    // request.eddsaSignature = sign_tools.get_EddsaSig_Transfer(
    //   request,
    //   eddsaKey
    // );
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.POST_NFT_TRADE,
      bodyParams: request,
      apiKey,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.EDDSA_SIG,
      sigObj: {
        dataToSig,
        // sigPatch: SigPatchField.EddsaSignature,
        PrivateKey: eddsaKey,
      },
    };
    // myLog("NFTAction Trade request", request);
    const raw_data = (await this.makeReq().request(reqParams)).data;

    return this.returnTxHash(raw_data);
  }

  async getUserOwenCollection<R>(
    request: loopring_defs.GetUserOwnerCollectionRequest,
    apiKey: string
  ) {
    const reqParams = {
      url: LOOPRING_URLs.GET_NFT_COLLECTION,
      queryParams: request,
      apiKey,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };
    const raw_data = (await this.makeReq().request(reqParams)).data;

    if (
      raw_data != null &&
      raw_data.resultInfo &&
      raw_data != null &&
      raw_data.resultInfo.code
    ) {
      return {
        ...raw_data.resultInfo,
      };
    }

    return {
      totalNum: raw_data == null ? void 0 : raw_data.totalNum,
      collections: raw_data.collections.map(({ collection, ...rest }: any) => {
        return {
          ...collection,
          extends: {
            ...rest,
          },
        };
      }) as loopring_defs.CollectionMeta & { extends: { [a: string]: any } }[],
      raw_data,
    };
  }

  async getUserLegacyCollection<R>(
    request: loopring_defs.GetUserLegacyCollectionRequest,
    apiKey: string
  ) {
    const reqParams = {
      url: LOOPRING_URLs.GET_NFT_LEGACY_COLLECTION,
      queryParams: request,
      apiKey,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };
    const raw_data = (await this.makeReq().request(reqParams)).data;

    if (
      raw_data != null &&
      raw_data.resultInfo &&
      raw_data != null &&
      raw_data.resultInfo.code
    ) {
      return {
        ...raw_data.resultInfo,
      };
    }

    return {
      totalNum: raw_data == null ? void 0 : raw_data.totalNum,
      collections: raw_data.collections.map(({ collection, ...rest }: any) => {
        return {
          ...collection,
          extends: {
            ...rest,
          },
        };
      }) as loopring_defs.CollectionMeta & { extends: { [a: string]: any } }[],
      raw_data,
    };
  }

  async getUserNFTCollection(
    request: loopring_defs.GetUserNFTCollectionRequest,
    apiKey: string
  ) {
    const reqParams = {
      url: LOOPRING_URLs.GET_NFT_COLLECTION_HASNFT,
      queryParams: request,
      apiKey,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };
    const raw_data = (await this.makeReq().request(reqParams)).data;

    if (
      raw_data != null &&
      raw_data.resultInfo &&
      raw_data != null &&
      raw_data.resultInfo.code
    ) {
      return {
        ...raw_data.resultInfo,
      };
    }

    return {
      totalNum: raw_data == null ? void 0 : raw_data.totalNum,
      collections: raw_data.collections.map(({ collection, ...rest }: any) => {
        return {
          ...collection,
          extends: {
            ...rest,
          },
        };
      }) as loopring_defs.CollectionMeta & { extends: { [a: string]: any } }[],
      raw_data,
    };
  }

  async getUserNFTLegacyTokenAddress(
    request: { accountId: number },
    apiKey: string
  ) {
    const reqParams = {
      url: LOOPRING_URLs.GET_NFT_LEGACY_TOKENADDRESS,
      queryParams: request,
      apiKey,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };
    const raw_data = (await this.makeReq().request(reqParams)).data;

    if (
      raw_data != null &&
      raw_data.resultInfo &&
      raw_data != null &&
      raw_data.resultInfo.code
    ) {
      return {
        ...raw_data.resultInfo,
      };
    }

    return {
      result: raw_data.addresses,
      raw_data,
    };
  }

  /*
   * Returns User NFTAction deposit records.
   */
  public async getUserNFTDepositHistory<R>(
    request: loopring_defs.GetUserNFTDepositHistoryRequest,
    apiKey: string
  ): Promise<{
    raw_data: R;
    totalNum: number;
    userNFTDepositHistory: loopring_defs.UserNFTDepositHistoryTx[];
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_USER_NFT_DEPOSIT_HISTORY,
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
      userNFTDepositHistory:
        raw_data.deposits as loopring_defs.UserNFTDepositHistoryTx[],
      raw_data,
    };
  }

  /*
   * Get User NFTAction Withdrawal History.
   */
  public async getUserNFTWithdrawalHistory<R>(
    request: loopring_defs.GetUserNFTWithdrawalHistoryRequest,
    apiKey: string
  ): Promise<{
    raw_data: R;
    totalNum: number;
    userNFTWithdrawalHistory: loopring_defs.UserNFTWithdrawalHistoryTx[];
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_USER_NFT_WITHDRAW_HISTORY,
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
      userNFTWithdrawalHistory:
        raw_data.withdrawals as loopring_defs.UserNFTWithdrawalHistoryTx[],
      raw_data,
    };
  }

  /*
   * Get user NFTAction transfer list.
   */
  public async getUserNFTTransferHistory<R>(
    request: loopring_defs.GetUserNFTTransferHistoryRequest,
    apiKey: string
  ): Promise<{
    raw_data: R;
    totalNum: number;
    userNFTTransfers: loopring_defs.UserNFTTransferHistoryTx[];
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_USER_NFT_TRANSFER_HISTORY,
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
      userNFTTransfers:
        raw_data.transfers as loopring_defs.UserNFTTransferHistoryTx[],
      raw_data,
    };
  }

  /**
   * Get user NFTAction Mint list.
   * @param request
   * @param apiKey
   */
  public async getUserNFTMintHistory<R>(
    request: loopring_defs.GetUserNFTMintHistoryRequest,
    apiKey: string
  ): Promise<{
    raw_data: R;
    totalNum: number;
    userNFTMints: loopring_defs.UserNFTMintHistoryTx[];
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_USER_NFT_MINT_HISTORY,
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
      userNFTMints: raw_data.transfers as loopring_defs.UserNFTMintHistoryTx[],
      raw_data,
    };
  }

  /*
   * Get user All NFTAction Transaction list.
   *
   */
  public async getUserNFTTransactionHistory<R>(
    request: loopring_defs.GetUserNFTTxsRequest,
    apiKey: string
  ): Promise<{
    raw_data: R;
    totalNum: number;
    userNFTTxs: loopring_defs.UserNFTTxsHistory[];
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_USER_NFT_TRANSACTION_HISTORY,
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

    if (
      request.metadata === true &&
      raw_data.transactions.length
      // raw_data.transactions.metadata &&
      // raw_data.transactions.metadata.nftId &&
      // raw_data.transactions.metadata.nftId.startsWith("0x")
    ) {
      raw_data.transactions = raw_data.transactions.reduce(
        (
          prev: loopring_defs.UserNFTTxsHistory[],
          item: loopring_defs.UserNFTTxsHistory
        ) => {
          if (
            item.metadata &&
            item.metadata.nftId &&
            item.metadata.nftId.startsWith("0x")
          ) {
            const hashBN = new BN(item.metadata.nftId.replace("0x", ""), 16);
            item.metadata.nftId =
              "0x" + hashBN.toString("hex").padStart(64, "0");
          }

          return [...prev, item];
        },
        []
      );
      // const hashBN = new BN(raw_data.transactions.metadata.nftId.replace("0x", ""), 16);
      // raw_data.transactions.metadata.nftId= "0x" + hashBN.toString("hex").padStart(64, "0");
    }
    return {
      totalNum: raw_data?.totalNum,
      userNFTTxs: raw_data.transactions as loopring_defs.UserNFTTxsHistory[],
      raw_data,
    };
  }
  public async getUserNFTTradeHistory<R>(
    request: loopring_defs.GetUserNFTTradeRequest,
    apiKey: string
  ): Promise<
    | {
        raw_data: R;
        totalNum: number;
        trades: loopring_defs.UserNFTTradeHistory[];
      }
    | RESULT_INFO
  > {
    const reqParams = {
      url: LOOPRING_URLs.GET_USER_NFT_TRADE_HISTORY,
      queryParams: { ...request },
      apiKey,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };
    const raw_data = (await this.makeReq().request(reqParams)).data;

    if (raw_data != null && raw_data.resultInfo) {
      return {
        ...raw_data.resultInfo,
      };
    }

    let trades = raw_data.trades;
    return {
      totalNum: raw_data?.totalNum,
      trades,
      raw_data,
    };
  }

  public async SetReferrer<R>(
    request: loopring_defs.SetReferrerRequest,
    eddsaKey: string
  ): Promise<{ raw_data: R; result: any }> {
    const dataToSig: Map<string, any> = new Map();

    dataToSig.set("address", request.address);
    dataToSig.set("promotionCode", request.promotionCode);
    dataToSig.set("publicKeyX", request.publicKeyX);
    dataToSig.set("publicKeyY", request.publicKeyY);
    dataToSig.set("referrer", request.referrer);

    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.SET_REFERRER,
      bodyParams: request,
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
    return {
      result: raw_data?.result,
      raw_data,
    };
  }

  // Get users NFTAction balance, besides amount, it also includes tokenId and nftData

  public async getUserNFTBalances<R>(
    request: loopring_defs.GetUserNFTBalancesRequest,
    apiKey: string
  ): Promise<{
    raw_data: R;
    totalNum: number;
    userNFTBalances: loopring_defs.UserNFTBalanceInfo[];
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_USER_NFT_BALANCES,
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
    if (raw_data.data.length) {
      raw_data.data = raw_data.data.reduce(
        (
          prev: loopring_defs.UserNFTBalanceInfo[],
          item: loopring_defs.UserNFTBalanceInfo
        ) => {
          if (item.nftId && item.nftId.startsWith("0x")) {
            const hashBN = new BN(item.nftId.replace("0x", ""), 16);
            item.nftId = "0x" + hashBN.toString("hex").padStart(64, "0");
            if (
              request.metadata === true &&
              item.metadata &&
              item.metadata.nftId &&
              item.metadata.nftId.startsWith("0x")
            ) {
              // const hashBN = new BN(item.metadata.nftId.replace("0x", ""), 16);
              item.metadata.nftId =
                "0x" + hashBN.toString("hex").padStart(64, "0");
            }
          }
          return [...prev, item];
        },
        []
      );
      // const hashBN = new BN(raw_data.transactions.metadata.nftId.replace("0x", ""), 16);
      // raw_data.transactions.metadata.nftId= "0x" + hashBN.toString("hex").padStart(64, "0");
    }
    // if (raw_data.data.nftId && raw_data.data.nftId.startsWith("0x")) {
    //   const hashBN = new BN(raw_data.data.nftId.replace("0x", ""), 16);
    //   raw_data.data.nftId = "0x" + hashBN.toString("hex").padStart(64, "0");
    // }
    return {
      totalNum: raw_data?.totalNum,
      userNFTBalances: raw_data.data as loopring_defs.UserNFTBalanceInfo[],
      raw_data,
    };
  }

  public async getUserNFTBalancesByCollection<R>(
    request: loopring_defs.GetUserNFTBalancesByCollectionRequest,
    apiKey: string
  ): Promise<{
    raw_data: R;
    totalNum: number;
    userNFTBalances: loopring_defs.UserNFTBalanceInfo[];
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_USER_NFT_BALANCES_BY_COLLECTION,
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
    if (raw_data.data.length) {
      raw_data.data = raw_data.data.reduce(
        (
          prev: loopring_defs.UserNFTBalanceInfo[],
          item: loopring_defs.UserNFTBalanceInfo
        ) => {
          if (item.nftId && item.nftId.startsWith("0x")) {
            const hashBN = new BN(item.nftId.replace("0x", ""), 16);
            item.nftId = "0x" + hashBN.toString("hex").padStart(64, "0");
            if (
              request.metadata === true &&
              item.metadata &&
              item.metadata.nftId &&
              item.metadata.nftId.startsWith("0x")
            ) {
              // const hashBN = new BN(item.metadata.nftId.replace("0x", ""), 16);
              item.metadata.nftId =
                "0x" + hashBN.toString("hex").padStart(64, "0");
            }
          }
          return [...prev, item];
        },
        []
      );
      // const hashBN = new BN(raw_data.transactions.metadata.nftId.replace("0x", ""), 16);
      // raw_data.transactions.metadata.nftId= "0x" + hashBN.toString("hex").padStart(64, "0");
    }
    // if (raw_data.data.nftId && raw_data.data.nftId.startsWith("0x")) {
    //   const hashBN = new BN(raw_data.data.nftId.replace("0x", ""), 16);
    //   raw_data.data.nftId = "0x" + hashBN.toString("hex").padStart(64, "0");
    // }
    return {
      totalNum: raw_data?.totalNum,
      userNFTBalances: raw_data.data as loopring_defs.UserNFTBalanceInfo[],
      raw_data,
    };
  }

  public async getUserNFTLegacyBalance<R>(
    request: loopring_defs.GetUserNFTLegacyBalanceRequest,
    apiKey: string
  ): Promise<{
    raw_data: R;
    totalNum: number;
    userNFTBalances: loopring_defs.UserNFTBalanceInfo[];
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_NFT_LEGACY_BALANCE,
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
    if (raw_data.data.length) {
      raw_data.data = raw_data.data.reduce(
        (
          prev: loopring_defs.UserNFTBalanceInfo[],
          item: loopring_defs.UserNFTBalanceInfo
        ) => {
          if (item.nftId && item.nftId.startsWith("0x")) {
            const hashBN = new BN(item.nftId.replace("0x", ""), 16);
            item.nftId = "0x" + hashBN.toString("hex").padStart(64, "0");
            if (
              request.metadata === true &&
              item.metadata &&
              item.metadata.nftId &&
              item.metadata.nftId.startsWith("0x")
            ) {
              // const hashBN = new BN(item.metadata.nftId.replace("0x", ""), 16);
              item.metadata.nftId =
                "0x" + hashBN.toString("hex").padStart(64, "0");
            }
          }
          return [...prev, item];
        },
        []
      );
      // const hashBN = new BN(raw_data.transactions.metadata.nftId.replace("0x", ""), 16);
      // raw_data.transactions.metadata.nftId= "0x" + hashBN.toString("hex").padStart(64, "0");
    }
    // if (raw_data.data.nftId && raw_data.data.nftId.startsWith("0x")) {
    //   const hashBN = new BN(raw_data.data.nftId.replace("0x", ""), 16);
    //   raw_data.data.nftId = "0x" + hashBN.toString("hex").padStart(64, "0");
    // }
    return {
      totalNum: raw_data?.totalNum,
      userNFTBalances: raw_data.data as loopring_defs.UserNFTBalanceInfo[],
      raw_data,
    };
  }
  public async getUserVIPAssets<R>(
    request: loopring_defs.getUserVIPAssetsRequest
  ): Promise<{ raw_data: { data: R }; vipAsset: R }> {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_USER_VIP_ASSETS,
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
      vipAsset: raw_data.data ? raw_data.data : raw_data,
      raw_data,
    };
  }

  public async getUserVIPInfo<R>(
    request: loopring_defs.GetUserVIPInfoRequest,
    apiKey: string
  ): Promise<{
    raw_data: R;
    vipInfo: {
      createdAt: number;
      validTo: string;
      org: any;
      vipTag: any;
    };
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_USER_VIP_INFO,
      queryParams: request,
      method: ReqMethod.GET,
      apiKey: apiKey,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    const vipInfo = {
      createdAt: raw_data.created_at,
      validTo: raw_data.valid_to,
      org: raw_data.org,
      vipTag: raw_data.vip_tag,
    };

    return {
      vipInfo,
      raw_data,
    };
  }

  public async unLockAccount<R>(
    {
      keyPair,
      request,
    }: {
      keyPair: KeyPairParams;
      request: loopring_defs.GetUserApiKeyRequest;
    },
    publicKey: { x: string; y: string } | undefined = undefined
  ): Promise<
    | AxiosResponse
    | RESULT_INFO
    | {
        raw_data: R;
        eddsaKey: {
          keyPair: object;
          formatedPx: string;
          formatedPy: string;
          sk: string;
          counterFactualInfo: CounterFactualInfo;
        };
        apiKey: string;
      }
  > {
    let eddsaKey;
    try {
      eddsaKey = await generateKeyPair(keyPair, publicKey);
    } catch (error) {
      throw error;
    }
    if (eddsaKey) {
      const dataToSig: Map<string, any> = sortObjDictionary(request);
      const reqParams: loopring_defs.ReqParams = {
        url: LOOPRING_URLs.API_KEY_ACTION,
        queryParams: request,
        bodyParams: request,
        method: ReqMethod.GET,
        sigFlag: SIG_FLAG.EDDSA_SIG,
        sigObj: {
          dataToSig,
          PrivateKey: eddsaKey.sk,
        },
      };
      let raw_data;
      try {
        raw_data = (await this.makeReq().request(reqParams)).data;
      } catch (error) {
        throw error as AxiosResponse;
      }
      if (raw_data?.resultInfo) {
        throw {
          ...raw_data?.resultInfo,
        };
      } else {
        return {
          apiKey: raw_data.apiKey,
          raw_data,
          eddsaKey,
        };
      }
    } else {
      throw {
        code: LoopringErrorCode.NO_EDDSA_KEY,
        message: ConnectorError.NO_EDDSA_KEY,
      };
    }
  }

  /*
   * Submit offchain withdraw request
   */
  public async submitOffchainWithdraw<T extends loopring_defs.TX_HASH_API>(
    req: loopring_defs.OffChainWithdrawalRequestV3WithPatch,
    options?: { accountId?: number; counterFactualInfo?: any }
  ): Promise<loopring_defs.TX_HASH_RESULT<T> | AxiosResponse | RESULT_INFO> {
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
    const isHWAddr = !!isHWAddrOld;
    let ecdsaSignature: string | undefined = undefined;

    const sigHW = async () => {
      const result = await sign_tools.signOffchainWithdrawWithoutDataStructure(
        web3,
        request.owner,
        request,
        chainId,
        walletType,
        accountId,
        counterFactualInfo
      );
      ecdsaSignature = result.ecdsaSig + SigSuffix.Suffix03;
    };

    // metamask not import hw appWallet.
    if (
      walletType === ConnectorNames.MetaMask ||
      walletType === ConnectorNames.Gamestop ||
      walletType === ConnectorNames.OtherExtension
    ) {
      try {
        if (isHWAddr) {
          await sigHW();
        } else {
          const result = await sign_tools.signOffchainWithdrawWithDataStructure(
            web3,
            request.owner,
            request,
            chainId,
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
      const isContractCheck = await isContract(web3, request.owner);
      try {
        if (isContractCheck) {
          const result =
            await sign_tools.signOffchainWithdrawWithDataStructureForContract(
              web3,
              request.owner,
              request,
              chainId,
              accountId
            );
          ecdsaSignature = result.ecdsaSig;
        } else if (counterFactualInfo) {
          const result =
            await sign_tools.signOffchainWithdrawWithDataStructureForContract(
              web3,
              request.owner,
              request,
              chainId,
              accountId,
              counterFactualInfo
            );
          ecdsaSignature = result.ecdsaSig;
          // myLog("OffchainWithdraw ecdsaSignature:", ecdsaSignature);
        } else {
          await sigHW();
        }
      } catch (err) {
        throw {
          ...this.genErr(err as any),
        };
      }
    }

    request.eddsaSignature = sign_tools.get_EddsaSig_OffChainWithdraw(
      request,
      eddsaKey
    ).result;

    if (counterFactualInfo) {
      request.counterFactualInfo = counterFactualInfo;
    }
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.WITHDRAWALS_ACTION,
      bodyParams: request,
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

  /*
   * Submit Internal Transfer request
   */
  public async submitInternalTransfer<T extends loopring_defs.TX_HASH_API>(
    req: loopring_defs.OriginTransferRequestV3WithPatch,
    options?: { accountId?: number; counterFactualInfo?: any }
  ): Promise<loopring_defs.TX_HASH_RESULT<T> | AxiosResponse | RESULT_INFO> {
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

    const isHWAddr = !!isHWAddrOld;
    let ecdsaSignature: string | undefined = undefined;

    const sigHW = async () => {
      const result = await sign_tools.signTransferWithoutDataStructure(
        web3,
        request.payerAddr,
        request,
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
      // myLog("submitInternalTransfer iConnectorNames.MetaMask:", walletType);
      try {
        if (isHWAddr) {
          await sigHW();
        } else {
          // myLog("submitInternalTransfer notHWAddr:", isHWAddr);
          const result = await sign_tools.signTransferWithDataStructure(
            web3,
            request.payerAddr,
            request,
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
      const isContractCheck = await isContract(web3, request.payerAddr);
      try {
        if (isContractCheck) {
          const result =
            await sign_tools.signTransferWithDataStructureForContract(
              web3,
              request.payerAddr,
              request,
              chainId,
              accountId
            );
          ecdsaSignature = result.ecdsaSig;
        } else if (counterFactualInfo) {
          const result =
            await sign_tools.signTransferWithDataStructureForContract(
              web3,
              request.payerAddr,
              request,
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

    request.eddsaSignature = sign_tools.get_EddsaSig_Transfer(
      request,
      eddsaKey
    ).result;
    if (counterFactualInfo) {
      request.counterFactualInfo = counterFactualInfo;
    }
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.POST_INTERNAL_TRANSFER,
      bodyParams: request,
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

  /*
   * Submit NFTAction Deploy request
   */
  public async submitForceWithdrawals<T extends loopring_defs.TX_HASH_API>(
    req: loopring_defs.OriginForcesWithdrawalsRequestV3WithPatch,
    options?: { accountId?: number; counterFactualInfo?: any }
  ): Promise<loopring_defs.TX_HASH_RESULT<T> | RESULT_INFO> {
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
    let ecdsaSignature: string | undefined = undefined;
    transfer.payeeId = 0;
    transfer.memo = `ForceWithdrawalBy${request.requesterAddress}`;
    transfer.maxFee = {
      volume: "0",
      tokenId: transfer.token.tokenId,
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
    const dataToSig: Map<string, any> = new Map();
    dataToSig.set("requesterAddress", request.requesterAddress);
    dataToSig.set("tokenId", request.tokenId);
    dataToSig.set("transfer", request.transfer);
    dataToSig.set("withdrawAddress", request.withdrawAddress);
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.POST_FORCE_WITHDRAWALS,
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
    } catch (error) {
      throw error as AxiosResponse;
    }
    return this.returnTxHash(raw_data);
  }

  /*
   * Submit NFTAction Deploy request
   */
  public async submitDeployNFT<T extends loopring_defs.TX_HASH_API>(
    req: loopring_defs.OriginDeployNFTRequestV3WithPatch,
    options?: { accountId?: number; counterFactualInfo?: any }
  ): Promise<loopring_defs.TX_HASH_RESULT<T> | RESULT_INFO> {
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
    let ecdsaSignature: string | undefined = undefined;
    transfer.payeeId = 0;
    transfer.memo = `NFT-DEPLOY-CONTRACT->${request.tokenAddress}`;
    transfer.maxFee = {
      volume: "0",
      tokenId: transfer.token.tokenId,
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
    const dataToSig: Map<string, any> = new Map();
    dataToSig.set("nftData", request.nftData);
    dataToSig.set("tokenAddress", request.tokenAddress);
    dataToSig.set("transfer", request.transfer);
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_DEPLOY_TOKEN_ADDRESS,
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
    } catch (error) {
      throw error as AxiosResponse;
    }
    return this.returnTxHash(raw_data);
  }
  /*
   * Submit NFTAction Transfer request
   */
  public async submitNFTInTransfer<T extends loopring_defs.TX_HASH_API>(
    req: loopring_defs.OriginNFTTransferRequestV3WithPatch,
    options?: { accountId?: number; counterFactualInfo?: any }
  ): Promise<loopring_defs.TX_HASH_RESULT<T> | RESULT_INFO> {
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

    const isHWAddr = !!isHWAddrOld;
    let ecdsaSignature: string | undefined = undefined;

    const sigHW = async () => {
      const result = await sign_tools.signNFTTransferWithoutDataStructure(
        web3,
        request.fromAddress,
        request,
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
            request.fromAddress,
            request,
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
      const isContractCheck = await isContract(web3, request.fromAddress);
      try {
        if (isContractCheck) {
          // signOffchainWithdrawWithDataStructureForContract
          const result =
            await sign_tools.signNFTTransferWithDataStructureForContract(
              web3,
              request.fromAddress,
              request,
              chainId,
              accountId
            );
          ecdsaSignature = result.ecdsaSig;
        } else if (counterFactualInfo) {
          const result =
            await sign_tools.signNFTTransferWithDataStructureForContract(
              web3,
              request.fromAddress,
              request,
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

    request.eddsaSignature = sign_tools.get_EddsaSig_NFT_Transfer(
      request,
      eddsaKey
    ).result;
    if (counterFactualInfo) {
      request.counterFactualInfo = counterFactualInfo;
    }
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.POST_NFT_INTERNAL_TRANSFER,
      bodyParams: request,
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

  /*
   * Submit NFTAction Withdraw request
   */
  public async submitNFTWithdraw<T extends loopring_defs.TX_HASH_API>(
    req: loopring_defs.OriginNFTWithdrawRequestV3WithPatch,
    options?: { accountId?: number; counterFactualInfo?: any }
  ): Promise<loopring_defs.TX_HASH_RESULT<T> | RESULT_INFO> {
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

    const isHWAddr = !!isHWAddrOld;
    let ecdsaSignature: string | undefined = undefined;

    const sigHW = async () => {
      const result = await sign_tools.signNFTWithdrawWithoutDataStructure(
        web3,
        request.owner,
        request,
        chainId,
        walletType,
        accountId,
        counterFactualInfo
      );
      ecdsaSignature = result.ecdsaSig + SigSuffix.Suffix03;
    };

    // metamask not import hw appWallet.
    if (
      walletType === ConnectorNames.MetaMask ||
      walletType === ConnectorNames.Gamestop ||
      walletType === ConnectorNames.OtherExtension
    ) {
      try {
        if (isHWAddr) {
          await sigHW();
        } else {
          const result = await sign_tools.signNFTWithdrawWithDataStructure(
            web3,
            request.owner,
            request,
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
      const isContractCheck = await isContract(web3, request.owner);

      try {
        if (isContractCheck) {
          // signNFTWithdrawWithDataStructureForContract
          // myLog('signNFTWithdrawWithDataStructureForContract')
          const result =
            await sign_tools.signNFTWithdrawWithDataStructureForContract(
              web3,
              request.owner,
              request,
              chainId,
              accountId
            );
          ecdsaSignature = result.ecdsaSig;
        } else if (counterFactualInfo) {
          const result =
            await sign_tools.signNFTWithdrawWithDataStructureForContract(
              web3,
              request.owner,
              request,
              chainId,
              accountId,
              counterFactualInfo
            );
          ecdsaSignature = result.ecdsaSig;
          // myLog("NFTWithdraw ecdsaSignature:", ecdsaSignature);
        } else {
          await sigHW();
        }
      } catch (err) {
        throw {
          ...this.genErr(err as any),
        };
      }
    }

    request.eddsaSignature = sign_tools.get_EddsaSig_NFT_Withdraw(
      request,
      eddsaKey
    ).result;
    if (counterFactualInfo) {
      request.counterFactualInfo = counterFactualInfo;
    }
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.POST_NFT_WITHDRAWALS,
      bodyParams: request,
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
  /*
   * Submit NFTAction
   */
  public async submitNFTMint<T extends loopring_defs.TX_HASH_API>(
    req: loopring_defs.OriginNFTMINTRequestV3WithPatch,
    options?: {
      accountId?: number;
      counterFactualInfo?: any;
      _noEcdsa?: boolean;
    }
  ): Promise<loopring_defs.TX_HASH_RESULT<T> | RESULT_INFO> {
    const {
      request,
      web3,
      chainId,
      walletType,
      eddsaKey,
      apiKey,
      isHWAddr: isHWAddrOld,
    } = req;
    const { accountId, counterFactualInfo, _noEcdsa }: any = options
      ? options
      : { accountId: 0 };
    if (request.counterFactualNftInfo === undefined) {
      request.counterFactualNftInfo = {
        nftFactory: NFTFactory[chainId],
        nftOwner: request.minterAddress,
        nftBaseUri: "",
      };
    }

    request.royaltyPercentage = request.royaltyPercentage
      ? request.royaltyPercentage
      : 0;
    const isHWAddr = !!isHWAddrOld;
    let ecdsaSignature: string | undefined = undefined;

    const sigHW = async () => {
      const result = await sign_tools.signNFTMintWithoutDataStructure(
        web3,
        request.minterAddress,
        request,
        chainId,
        walletType,
        accountId,
        counterFactualInfo
      );
      ecdsaSignature = result.ecdsaSig + SigSuffix.Suffix03;
    };

    // metamask not import hw appWallet.
    if (!_noEcdsa) {
      if (
        walletType === ConnectorNames.MetaMask ||
        walletType === ConnectorNames.Gamestop ||
        walletType === ConnectorNames.OtherExtension
      ) {
        try {
          if (isHWAddr) {
            await sigHW();
          } else {
            const result = await sign_tools.signNFTMintWithDataStructure(
              web3,
              request.minterAddress,
              request,
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
        try {
          const isContractCheck = await isContract(web3, request.minterAddress);

          if (isContractCheck) {
            // signNFTMintWithDataStructureForContract
            // myLog('signNFTMintWithDataStructureForContract')
            const result =
              await sign_tools.signNFTMintWithDataStructureForContract(
                web3,
                request.minterAddress,
                request,
                chainId,
                accountId
              );
            ecdsaSignature = result.ecdsaSig;
          } else if (counterFactualInfo) {
            const result =
              await sign_tools.signNFTMintWithDataStructureForContract(
                web3,
                request.minterAddress,
                request,
                chainId,
                accountId,
                counterFactualInfo
              );
            ecdsaSignature = result.ecdsaSig;
            // myLog("NFTMintWithData ecdsaSignature:", ecdsaSignature);
          } else {
            await sigHW();
          }
        } catch (err) {
          throw {
            ...this.genErr(err as any),
          };
        }
      }
    }

    request.eddsaSignature = sign_tools.get_EddsaSig_NFT_Mint(
      request,
      eddsaKey
    ).result;
    if (counterFactualInfo) {
      request.counterFactualInfo = counterFactualInfo;
    }
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.POST_NFT_MINT,
      bodyParams: request,
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

  async submitNFTCollection<R>(
    req: loopring_defs.CollectionBasicMeta,
    chainId: ChainId,
    apiKey: string,
    eddsaKey: string
  ): Promise<RESULT_INFO | { raw_data: R; contractAddress: string }> {
    const _req = req.nftFactory
      ? req
      : { ...req, nftFactory: NFTFactory_Collection[chainId] };
    const dataToSig: Map<string, any> = sortObjDictionary(_req);
    const reqParams = {
      url: LOOPRING_URLs.POST_NFT_CREATE_COLLECTION,
      bodyParams: Object.fromEntries(dataToSig),
      apiKey,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.EDDSA_SIG,
      sigObj: {
        dataToSig,
        PrivateKey: eddsaKey,
      },
    };
    const raw_data = (await this.makeReq().request(reqParams)).data;

    if (
      raw_data != null &&
      raw_data.resultInfo &&
      raw_data != null &&
      raw_data.resultInfo.code
    ) {
      return {
        ...raw_data.resultInfo,
      };
    }

    return {
      raw_data,
      contractAddress: raw_data == null ? void 0 : raw_data.contractAddress,
    };
  }

  async deleteNFTCollection<R>(
    req: loopring_defs.CollectionDelete,
    chainId: ChainId,
    apiKey: string,
    eddsaKey: string
  ): Promise<{ raw_data: R }> {
    const dataToSig: Map<string, any> = sortObjDictionary(req);
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.DELETE_NFT_CREATE_COLLECTION,
      queryParams: req,
      apiKey,
      method: ReqMethod.DELETE,
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
    return {
      raw_data,
    };
  }

  async submitNFTLegacyCollection<R>(
    req: loopring_defs.CollectionLegacyMeta,
    chainId: ChainId,
    apiKey: string,
    eddsaKey: string
  ): Promise<RESULT_INFO | { raw_data: R; result: boolean }> {
    // const _req = req.nftFactory
    //   ? req
    //   : { ...req, nftFactory: NFTFactory_Collection[chainId] };
    const dataToSig: Map<string, any> = sortObjDictionary(req);
    const reqParams = {
      url: LOOPRING_URLs.POST_NFT_CREATE_LEGACY_COLLECTION,
      bodyParams: Object.fromEntries(dataToSig),
      apiKey,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.EDDSA_SIG,
      sigObj: {
        dataToSig,
        PrivateKey: eddsaKey,
      },
    };
    const raw_data = (await this.makeReq().request(reqParams)).data;

    if (
      raw_data != null &&
      raw_data.resultInfo &&
      raw_data != null &&
      raw_data.resultInfo.code
    ) {
      return {
        ...raw_data.resultInfo,
      };
    }

    return {
      raw_data,
      result: raw_data.result,
    };
  }

  async submitEditNFTCollection<R>(
    req: Omit<loopring_defs.CollectionBasicMeta, "nftFactory" | "owner"> & {
      collectionId: string;
      accountId: number;
    },
    chainId: ChainId,
    apiKey: string,
    eddsaKey: string
  ): Promise<RESULT_INFO | { raw_data: R; contractAddress: string }> {
    // const _req = req.nftFactory ? req : {...req, nftFactory: NFTFactory_Collection[ chainId ]}
    const dataToSig: Map<string, any> = sortObjDictionary(req);
    const reqParams = {
      url: LOOPRING_URLs.POST_NFT_EDIT_COLLECTION,
      bodyParams: Object.fromEntries(dataToSig),
      apiKey,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.EDDSA_SIG,
      sigObj: {
        dataToSig,
        PrivateKey: eddsaKey,
      },
    };
    const raw_data = (await this.makeReq().request(reqParams)).data;

    if (
      raw_data != null &&
      raw_data.resultInfo &&
      raw_data != null &&
      raw_data.resultInfo.code
    ) {
      return {
        ...raw_data.resultInfo,
      };
    }

    return {
      raw_data,
      contractAddress: raw_data == null ? void 0 : raw_data.contractAddress,
    };
  }

  async submitUpdateNFTLegacyCollection<R>(
    req: loopring_defs.UpdateNFTLegacyCollectionRequest,
    chainId: ChainId,
    apiKey: string,
    eddsaKey: string
  ): Promise<RESULT_INFO | { raw_data: R; result: boolean }> {
    const _req = { ...req, nftHashes: req.nftHashes.join(",") };
    const dataToSig: Map<string, any> = sortObjDictionary(_req);
    const reqParams = {
      url: LOOPRING_URLs.POST_NFT_LEGACY_UPDATE_COLLECTION,
      bodyParams: Object.fromEntries(dataToSig),
      apiKey,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.EDDSA_SIG,
      sigObj: {
        dataToSig,
        PrivateKey: eddsaKey,
      },
    };
    const raw_data = (await this.makeReq().request(reqParams)).data;

    if (
      raw_data != null &&
      raw_data.resultInfo &&
      raw_data != null &&
      raw_data.resultInfo.code
    ) {
      return {
        ...raw_data.resultInfo,
      };
    }

    return {
      raw_data,
      result: raw_data.result,
    };
  }

  async submitUpdateNFTGroup<R>(
    req: loopring_defs.UpdateNFTGroupRequest,
    chainId: ChainId,
    apiKey: string,
    eddsaKey: string
  ): Promise<RESULT_INFO | { raw_data: R; result: boolean }> {
    const _req = { ...req, nftHashes: req.nftHashes.join(",") };
    const dataToSig: Map<string, any> = sortObjDictionary(_req);
    const reqParams = {
      url: LOOPRING_URLs.POST_NFT_UPDATE_NFT_GROUP,
      bodyParams: Object.fromEntries(dataToSig),
      apiKey,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.EDDSA_SIG,
      sigObj: {
        dataToSig,
        PrivateKey: eddsaKey,
      },
    };
    const raw_data = (await this.makeReq().request(reqParams)).data;

    if (
      raw_data != null &&
      raw_data.resultInfo &&
      raw_data != null &&
      raw_data.resultInfo.code
    ) {
      return {
        ...raw_data.resultInfo,
      };
    }

    return {
      raw_data,
      result: raw_data.result,
    };
  }

  /*
   * Submit NFTAction Deploy request
   */
  public async submitDeployCollection<T extends loopring_defs.TX_HASH_API>(
    req: loopring_defs.OriginDeployCollectionRequestV3WithPatch,
    options?: { accountId?: number; counterFactualInfo?: any }
  ): Promise<loopring_defs.TX_HASH_RESULT<T> | RESULT_INFO> {
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
    let ecdsaSignature: string | undefined = undefined;
    transfer.payeeId = 0;
    transfer.memo = `NFT-DEPLOY-CONTRACT->${request.tokenAddress}`;
    transfer.maxFee = {
      volume: "0",
      tokenId: transfer.token.tokenId,
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
    const dataToSig: Map<string, any> = sortObjDictionary(request);
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.POST_DEPLOY_COLLECTION,
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
    } catch (error) {
      throw error as AxiosResponse;
    }
    return this.returnTxHash(raw_data);
  }

  /*
   * Updates the EDDSA key associated with the specified account, making the previous one invalid in the process.
   */
  public async updateAccount<T extends loopring_defs.TX_HASH_API>(
    req: loopring_defs.UpdateAccountRequestV3WithPatch,
    options?: { accountId?: number; counterFactualInfo?: any }
  ): Promise<loopring_defs.TX_HASH_RESULT<T> | RESULT_INFO> {
    const { request, web3, chainId, walletType, isHWAddr: isHWAddrOld } = req;
    const { accountId, counterFactualInfo }: any = options
      ? options
      : { accountId: 0 };

    const isHWAddr = !!isHWAddrOld;
    let ecdsaSignature: string | undefined = undefined;

    const sigHW = async () => {
      const result = await sign_tools.signUpdateAccountWithoutDataStructure(
        web3,
        request,
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
          const result = await sign_tools.signUpdateAccountWithDataStructure(
            web3,
            request,
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
      const isContractCheck = await isContract(web3, request.owner);
      try {
        if (isContractCheck) {
          // myLog('signUpdateAccountWithDataStructureForContract')
          const result =
            await sign_tools.signUpdateAccountWithDataStructureForContract(
              web3,
              request,
              chainId,
              accountId
            );
          ecdsaSignature = result.ecdsaSig;
          // myLog('ecdsaSignature:', ecdsaSignature)
        } else if (counterFactualInfo) {
          const result =
            await sign_tools.signUpdateAccountWithDataStructureForContract(
              web3,
              request,
              chainId,
              accountId,
              counterFactualInfo
            );
          ecdsaSignature = result.ecdsaSig;
          // myLog("UpdateAccount ecdsaSignature:", ecdsaSignature);
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
      request.counterFactualInfo = counterFactualInfo;
    }
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.ACCOUNT_ACTION,
      bodyParams: request,
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
  /*
   * Get the ApiKey associated with the user's account.
   */
  public async getUserApiKey<R>(
    request: loopring_defs.GetUserApiKeyRequest,
    eddsaKey: string
  ): Promise<{ raw_data: R; apiKey: string }> {
    const dataToSig: Map<string, any> = new Map();

    dataToSig.set("accountId", request.accountId);

    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.API_KEY_ACTION,
      queryParams: request,
      method: ReqMethod.GET,
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
    if (raw_data?.resultInfo) {
      throw {
        ...raw_data?.resultInfo,
      };
    } else {
      return {
        apiKey: raw_data.apiKey,
        raw_data,
      };
    }
  }

  /*
   * Get user txs
   */
  public async getUserBills<R>(
    request: loopring_defs.GetUserBillsRequest,
    apiKey: string
  ): Promise<{
    raw_data: R;
    totalNum: number;
    userTxs: loopring_defs.UserTx[];
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_USER_BILLS,
      queryParams: request,
      apiKey,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      };
    }
    const userTxs: loopring_defs.UserTx[] = [];

    if (raw_data?.transactions instanceof Array) {
      raw_data.transactions.forEach((item: loopring_defs.UserTx) => {
        userTxs.push(item);
      });
    }

    return {
      totalNum: raw_data?.totalNum,
      userTxs,
      raw_data,
    };
  }

  /*
   * Get user txs
   */
  public async getUserRewards<R>(
    request: loopring_defs.GetUserRewardRequest,
    apiKey: string
  ): Promise<{
    raw_data: R;
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_PROTOCOL_REWARDS,
      queryParams: { ...request, size: request?.size ?? 200 },
      apiKey,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };
    let raw_data;
    try {
      raw_data = (await this.makeReq().request(reqParams)).data;
    } catch (error) {
      throw error as AxiosResponse;
    }

    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data.resultInfo,
      };
    }

    return {
      ...raw_data,
      raw_data,
    };
  }

  /*
   * Get user GET_USER_LOCKSUMMAR
   */
  public async getUserLockSummary<R = loopring_defs.UserLockSummary>(
    request: loopring_defs.getUserLockSummaryRequest,
    apiKey: string
  ): Promise<
    R & {
      raw_data: R;
    }
  > {
    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.GET_USER_LOCKSUMMAR,
      queryParams: request,
      apiKey,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };
    let raw_data;
    try {
      raw_data = (await this.makeReq().request(reqParams)).data;
    } catch (error) {
      throw error as AxiosResponse;
    }

    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data.resultInfo,
      };
    }

    return {
      ...raw_data,
      raw_data,
    };
  }
}
