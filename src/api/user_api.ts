/* eslint-disable camelcase  */

import { BaseAPI, isContract } from "./base_api";

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
} from "../defs";

import * as loopring_defs from "../defs/loopring_defs";

import * as sign_tools from "./sign/sign_tools";
import { myLog } from "../utils/log_tools";

export class UserAPI extends BaseAPI {
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
      bodyParams: request,
      method: ReqMethod.GET,
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
    const apiKey = raw_data["apiKey"];

    return {
      apiKey,
      raw_data,
    };
  }

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
    orderRequest: loopring_defs.SubmitOrderRequestV3,
    PrivateKey: string,
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
        PrivateKey,
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
   * Query current NFT fee amount
   */
  //TODO：UT
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
   * Submit offchain withdraw request
   */

  public async submitOffchainWithdraw<T extends loopring_defs.TX_HASH_API>(
    req: loopring_defs.OffChainWithdrawalRequestV3WithPatch,
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
    let ecdsaSignature = undefined;

    const sigHW = async () => {
      const result = await sign_tools.signOffchainWithdrawWithoutDataStructure(
        web3,
        request.owner,
        request,
        chainId,
        walletType,
        accountId
      );
      ecdsaSignature = result.ecdsaSig + SigSuffix.Suffix03;
    };

    // metamask not import hw wallet.
    if (walletType === ConnectorNames.MetaMask) {
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
        return {
          ...this.genErr(err),
        };
      }
    } else {
      const isContractCheck = await isContract(web3, request.owner);

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
    }

    request.eddsaSignature = sign_tools.get_EddsaSig_OffChainWithdraw(
      request,
      eddsaKey
    );

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

    const raw_data = (await this.makeReq().request(reqParams)).data;

    return this.returnTxHash(raw_data);
  }

  /*
   * Submit Internal Transfer request
   */
  public async submitInternalTransfer<T extends loopring_defs.TX_HASH_API>(
    req: loopring_defs.OriginTransferRequestV3WithPatch,
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
    let ecdsaSignature = undefined;

    const sigHW = async () => {
      const result = await sign_tools.signTransferWithoutDataStructure(
        web3,
        request.payerAddr,
        request,
        chainId,
        walletType,
        accountId
      );
      ecdsaSignature = result.ecdsaSig + SigSuffix.Suffix03;
    };
    if (walletType === ConnectorNames.MetaMask) {
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
            accountId
          );
          ecdsaSignature = result.ecdsaSig + SigSuffix.Suffix02;
        }
      } catch (err) {
        return {
          ...this.genErr(err),
        };
      }
    } else {
      const isContractCheck = await isContract(web3, request.payerAddr);
      // myLog(
      //   "submitInternalTransfer isContractCheck,accountId:",
      //   isContractCheck,
      //   accountId
      // );
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
    }

    request.eddsaSignature = sign_tools.get_EddsaSig_Transfer(
      request,
      eddsaKey
    );
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

    const raw_data = (await this.makeReq().request(reqParams)).data;

    return this.returnTxHash(raw_data);
  }

  /*
   * Submit NFT Deploy request
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
    let ecdsaSignature = undefined;
    transfer.payeeId = 0;
    transfer.memo = `NFT-DEPLOY-CONTRACT->${request.tokenAddress}`;
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
        accountId
      );
      ecdsaSignature = result.ecdsaSig + SigSuffix.Suffix03;
    };
    if (walletType === ConnectorNames.MetaMask) {
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
            accountId
          );
          ecdsaSignature = result.ecdsaSig + SigSuffix.Suffix02;
        }
      } catch (err) {
        return {
          ...this.genErr(err),
        };
      }
    } else {
      const isContractCheck = await isContract(web3, transfer.payerAddr);
      // myLog(
      //   "submitDeployNFT isContractCheck,accountId:",
      //   isContractCheck,
      //   accountId
      // );
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
    }

    if (counterFactualInfo) {
      transfer.counterFactualInfo = counterFactualInfo;
    }
    transfer.eddsaSignature = sign_tools.get_EddsaSig_Transfer(
      transfer as loopring_defs.OriginTransferRequestV3,
      eddsaKey
    );
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

    const raw_data = (await this.makeReq().request(reqParams)).data;

    return this.returnTxHash(raw_data);
  }

  /*
   * Submit NFT Transfer request
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
    let ecdsaSignature = undefined;

    const sigHW = async () => {
      const result = await sign_tools.signNFTTransferWithoutDataStructure(
        web3,
        request.fromAddress,
        request,
        chainId,
        walletType,
        accountId
      );
      ecdsaSignature = result.ecdsaSig + SigSuffix.Suffix03;
    };

    if (walletType === ConnectorNames.MetaMask) {
      try {
        if (isHWAddr) {
          await sigHW();
        } else {
          const result = await sign_tools.signTNFTransferWithDataStructure(
            web3,
            request.fromAddress,
            request,
            chainId,
            accountId
          );
          ecdsaSignature = result.ecdsaSig + SigSuffix.Suffix02;
        }
      } catch (err) {
        return {
          ...this.genErr(err),
        };
      }
    } else {
      const isContractCheck = await isContract(web3, request.fromAddress);

      if (isContractCheck) {
        // signOffchainWithdrawWithDataStructureForContract
        // console.log('3. signTransferWithDataStructureForContract')
        const result =
          await sign_tools.signNFTTransferWithDataStructureForContract(
            web3,
            request.fromAddress,
            request,
            chainId,
            accountId
          );
        ecdsaSignature = result.ecdsaSig;
        // console.log('3. result.ecdsaSig:', result.ecdsaSig)
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
    }

    request.eddsaSignature = sign_tools.get_EddsaSig_NFT_Transfer(
      request,
      eddsaKey
    );
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

    const raw_data = (await this.makeReq().request(reqParams)).data;

    return this.returnTxHash(raw_data);
  }

  /*
   * Submit NFT Withdraw request
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
    let ecdsaSignature = undefined;

    const sigHW = async () => {
      const result = await sign_tools.signNFTWithdrawWithoutDataStructure(
        web3,
        request.owner,
        request,
        chainId,
        walletType,
        accountId
      );
      ecdsaSignature = result.ecdsaSig + SigSuffix.Suffix03;
    };

    // metamask not import hw wallet.
    if (walletType === ConnectorNames.MetaMask) {
      try {
        if (isHWAddr) {
          await sigHW();
        } else {
          const result = await sign_tools.signNFTWithdrawWithDataStructure(
            web3,
            request.owner,
            request,
            chainId,
            accountId
          );
          ecdsaSignature = result.ecdsaSig + SigSuffix.Suffix02;
        }
      } catch (err) {
        return {
          ...this.genErr(err),
        };
      }
    } else {
      const isContractCheck = await isContract(web3, request.owner);

      if (isContractCheck) {
        // signNFTWithdrawWithDataStructureForContract
        // console.log('3. signNFTWithdrawWithDataStructureForContract')
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
    }

    request.eddsaSignature = sign_tools.get_EddsaSig_NFT_Withdraw(
      request,
      eddsaKey
    );
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

    const raw_data = (await this.makeReq().request(reqParams)).data;

    return this.returnTxHash(raw_data);
  }

  /*
   * Submit NFT 55544555555555555555555545555 request
   */
  public async submitNFTMint<T extends loopring_defs.TX_HASH_API>(
    req: loopring_defs.OriginNFTMINTRequestV3WithPatch,
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
    if (request.counterFactualNftInfo === undefined) {
      request.counterFactualNftInfo = {
        nftFactory: NFTFactory[chainId],
        nftOwner: request.minterAddress,
        nftBaseUri: "",
      };
    }

    request.creatorFeeBips = request.creatorFeeBips
      ? request.creatorFeeBips
      : 0;
    const isHWAddr = !!isHWAddrOld;
    let ecdsaSignature = undefined;
    if (request.nftId.startsWith("0x")) {
      request.nftId = web3.utils.hexToNumberString(request.nftId);
    }
    const sigHW = async () => {
      const result = await sign_tools.signNFTMintWithoutDataStructure(
        web3,
        request.minterAddress,
        request,
        chainId,
        walletType,
        accountId
      );
      ecdsaSignature = result.ecdsaSig + SigSuffix.Suffix03;
    };

    // metamask not import hw wallet.
    if (walletType === ConnectorNames.MetaMask) {
      try {
        if (isHWAddr) {
          await sigHW();
        } else {
          const result = await sign_tools.signNFTMintWithDataStructure(
            web3,
            request.minterAddress,
            request,
            chainId,
            accountId
          );
          ecdsaSignature = result.ecdsaSig + SigSuffix.Suffix02;
        }
      } catch (err) {
        return {
          ...this.genErr(err),
        };
      }
    } else {
      try {
        const isContractCheck = await isContract(web3, request.minterAddress);

        if (isContractCheck) {
          // signNFTMintWithDataStructureForContract
          // console.log('3. signNFTMintWithDataStructureForContract')
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
        return {
          ...this.genErr(err),
        };
      }
    }

    request.eddsaSignature = sign_tools.get_EddsaSig_NFT_Mint(
      request,
      eddsaKey
    );
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
    // myLog("NFTMint request", request);
    const raw_data = (await this.makeReq().request(reqParams)).data;

    return this.returnTxHash(raw_data);
  }

  /*
   * Submit NFT Validate Order request
   */
  public async submitNFTValidateOrder<T extends loopring_defs.TX_HASH_API>(
    req: loopring_defs.OriginNFTValidateOrderRequestV3WithPatch
  ): Promise<loopring_defs.TX_HASH_RESULT<T> | RESULT_INFO> {
    const { request, eddsaKey, apiKey } = req;

    request.eddsaSignature = sign_tools.get_EddsaSig_NFT_Order(
      request,
      eddsaKey
    );

    const reqParams: loopring_defs.ReqParams = {
      url: LOOPRING_URLs.POST_NFT_VALIDATE_ORDER,
      bodyParams: request,
      apiKey,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.NO_SIG,
    };
    // myLog("NFT Validate Order request", request);
    const raw_data = (await this.makeReq().request(reqParams)).data;

    return this.returnTxHash(raw_data);
  }

  /*
   * Submit NFT Trade request
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
    // myLog("NFT Trade request", request);
    const raw_data = (await this.makeReq().request(reqParams)).data;

    return this.returnTxHash(raw_data);
  }

  /*
   * Returns User NFT deposit records.
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
   * Get User NFT Withdrawal History.
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
   * Get user NFT transfer list.
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
   * Get user NFT Mint list.
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
   * Get user All NFT Transaction list.
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
    return {
      totalNum: raw_data?.totalNum,
      userNFTTxs: raw_data.transactions as loopring_defs.UserNFTTxsHistory[],
      raw_data,
    };
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
    let ecdsaSignature = undefined;

    const sigHW = async () => {
      const result = await sign_tools.signUpdateAccountWithoutDataStructure(
        web3,
        request,
        chainId,
        walletType,
        accountId
      );
      ecdsaSignature = result.ecdsaSig + SigSuffix.Suffix03;
    };

    if (walletType === ConnectorNames.MetaMask) {
      try {
        if (isHWAddr) {
          await sigHW();
        } else {
          const result = await sign_tools.signUpdateAccountWithDataStructure(
            web3,
            request,
            chainId,
            accountId
          );
          ecdsaSignature = result.ecdsaSig + SigSuffix.Suffix02;
        }
      } catch (err) {
        return {
          ...this.genErr(err),
        };
      }
    } else {
      const isContractCheck = await isContract(web3, request.owner);

      if (isContractCheck) {
        // console.log('3. signUpdateAccountWithDataStructureForContract')
        const result =
          await sign_tools.signUpdateAccountWithDataStructureForContract(
            web3,
            request,
            chainId,
            accountId
          );
        ecdsaSignature = result.ecdsaSig;
        // console.log('ecdsaSignature:', ecdsaSignature)
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

    const raw_data = (await this.makeReq().request(reqParams)).data;

    return this.returnTxHash(raw_data);
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

  // Get users NFT balance, besides amount, it also includes tokenId and nftData

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
      vipAsset: raw_data.data,
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
}
