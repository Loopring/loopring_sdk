import {
  DEFAULT_TIMEOUT,
  LOOPRING_EXPORTED_ACCOUNT,
  LoopringAPI,
  web3,
  TOKEN_INFO,
  signatureKeyPairMock,
} from "../../MockData";
import * as sdk from "../../../index";
import { calcDefi, DefiAction } from "../../../index";

describe("DefiAPI test", function () {
  it(
    "getDefiMarkets",
    async () => {
      const response = await LoopringAPI.defiAPI.getDefiMarkets({defiType: undefined});
      console.log(
        "getDefiMarkets",
        response.marketArr,
        response.markets,
        response.pairs
      );
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getDefiToken",
    async () => {
      const response = await LoopringAPI.defiAPI.getDefiToken();
      console.log(
        "getDefiToken:",
        response.tokensMap,
        response.idIndex,
        response.addressIndex
      );
    },
    DEFAULT_TIMEOUT
  );
  it(
    "getDefiTransaction",
    async () => {
      const { apiKey } = await LoopringAPI.userAPI.getUserApiKey(
        {
          accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
        },
        LOOPRING_EXPORTED_ACCOUNT.privateKey
      );
      const response = await LoopringAPI.defiAPI.getDefiTransaction(
        {
          limit: 20, offset: 0,
          accountId: LOOPRING_EXPORTED_ACCOUNT.accountId
        },
        apiKey
      );
      console.log("getDefiTransaction:", response);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "orderDefi",
    async () => {
      // Step 1. get account info
      const { accInfo } = await LoopringAPI.exchangeAPI.getAccount({
        owner: LOOPRING_EXPORTED_ACCOUNT.address,
      });
      console.log("accInfo:", accInfo);

      // Step 2. eddsaKey
      const eddsaKey = await signatureKeyPairMock(accInfo);
      console.log("eddsaKey:", eddsaKey.sk);

      // Step 3. get apikey
      const { apiKey } = await LoopringAPI.userAPI.getUserApiKey(
        {
          accountId: accInfo.accountId,
        },
        eddsaKey.sk
      );
      console.log("apiKey:", apiKey);

      const sellSymbol = "ETH",
        buySymbol = "WSTETH",
        sellValue = "0.00005",
        isJoin = true,
        isInputSell = true;
      const testMarket = "WSTETH-ETH";
      const {markets} = await LoopringAPI.defiAPI.getDefiMarkets({defiType: undefined});
      const {tokensMap} = await LoopringAPI.defiAPI.getDefiToken();
      const marketInfo = markets[ testMarket ];
      const buyTokenBalanceVol = marketInfo.baseVolume;

      const {fees} = await LoopringAPI.userAPI.getOffchainFeeAmt(
        {
          accountId: accInfo.accountId,
          requestType: isJoin
            ? sdk.OffchainFeeReqType.DEFI_JOIN
            : sdk.OffchainFeeReqType.DEFI_EXIT,
          market: testMarket,
        },
        apiKey
      );

      const calcVol = calcDefi({
        isJoin,
        isInputSell,
        sellAmount: sellValue,
        feeVol: fees[buySymbol].fee,
        marketInfo,
        tokenSell: TOKEN_INFO.tokenMap[sellSymbol],
        tokenBuy: tokensMap[buySymbol],
        buyTokenBalanceVol,
      });

      console.log(
        "calcVol",
        calcVol,
        calcVol.miniSellVol,
        calcVol.maxSellVol,
        calcVol.maxFeeBips
      );

      const storageId = await LoopringAPI.userAPI.getNextStorageId(
        {
          accountId: accInfo.accountId,
          sellTokenId: TOKEN_INFO.tokenMap[sellSymbol].tokenId,
        },
        apiKey
      );
      const request = {
        exchange: LOOPRING_EXPORTED_ACCOUNT.exchangeAddress,
        storageId: storageId.orderId,
        accountId: accInfo.accountId,
        sellToken: {
          tokenId: TOKEN_INFO.tokenMap[sellSymbol].tokenId,
          volume: calcVol.sellVol,
        },
        buyToken: {
          tokenId: tokensMap[buySymbol].tokenId,
          volume: calcVol.buyVol,
        },
        action: DefiAction.Deposit,
        validUntil: LOOPRING_EXPORTED_ACCOUNT.validUntil,
        fee: fees[buySymbol].fee,
        maxFeeBips: calcVol.maxFeeBips,
        type: marketInfo.type,
        fillAmountBOrS: false,
      };
      // @output calcVol UI use to validation data

      const response = await LoopringAPI.defiAPI.orderDefi(
        request,
        eddsaKey.sk,
        apiKey
      );
      console.log("orderDefi:", response);
    },
    DEFAULT_TIMEOUT
  );
});
