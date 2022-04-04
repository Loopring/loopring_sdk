import {
  AMM_MAP,
  DEFAULT_TIMEOUT,
  LOOPRING_EXPORTED_ACCOUNT,
  LoopringAPI,
  signatureKeyPairMock,
  TOKEN_INFO,
} from "../../MockData";
import * as sdk from "../../../index";
let apiKey = "";
describe("orderERC20", function () {
  it(
    "LRC-ETH_AtoB",
    async () => {
      try {
        // MOCK Data
        const buy = "LRC",
          sell = "ETH",
          MARKET = "LRC-ETH",
          AMM_MARKET = "AMM-LRC-ETH",
          isAtoB = true,
          slippage = "50";

        // step1: get apikey & eddsaKey
        const { accInfo } = await LoopringAPI.exchangeAPI.getAccount({
          owner: LOOPRING_EXPORTED_ACCOUNT.address,
        });
        const eddsaKey = await signatureKeyPairMock(accInfo);
        apiKey = (
          await LoopringAPI.userAPI.getUserApiKey(
            {
              accountId: accInfo.accountId,
            },
            eddsaKey.sk
          )
        ).apiKey;

        // Step 2. storageId
        const storageId = await LoopringAPI.userAPI.getNextStorageId(
          {
            accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
            sellTokenId: TOKEN_INFO.tokenMap[sell].tokenId,
          },
          apiKey
        );

        // step3: get user AmountMap, which decided user minimum order
        const amountMap = {
          [AMM_MARKET]: (
            await LoopringAPI.userAPI.getMinimumTokenAmt(
              {
                accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
                market: AMM_MAP[AMM_MARKET].market,
              },
              apiKey
            )
          ).amountMap,
          [MARKET]: (
            await LoopringAPI.userAPI.getMinimumTokenAmt(
              {
                accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
                market: MARKET,
              },
              apiKey
            )
          ).amountMap,
        };

        // step4:  depth,  ammPoolSnapshot ,tickMap
        const [{ depth }, { ammPoolSnapshot }] = await Promise.all([
          LoopringAPI.exchangeAPI.getMixDepth({
            market: AMM_MAP["AMM-LRC-ETH"].market,
          }),
          LoopringAPI.ammpoolAPI.getAmmPoolSnapshot({
            poolAddress: AMM_MAP["AMM-LRC-ETH"].address,
          }),
        ]);

        // step5: check MinAmt
        let buyMinAmtInfo = (amountMap[AMM_MARKET] ?? amountMap[MARKET])[buy];
        let takerRate = buyMinAmtInfo
          ? buyMinAmtInfo.userOrderInfo.takerRate
          : 0;
        const minAmountInput = buyMinAmtInfo.userOrderInfo.minAmount;

        // step6: calcTradeParams
        const calcTradeParams = sdk.getOutputAmount({
          input: LOOPRING_EXPORTED_ACCOUNT.tradeLRCValue.toString(),
          sell,
          buy,
          isAtoB,
          marketArr: ["LRC-ETH", "ETH-USDT", "DAI-USDT", "USDC-ETH"],
          tokenMap: TOKEN_INFO.tokenMap,
          marketMap: TOKEN_INFO.marketMap,
          depth,
          ammPoolSnapshot: ammPoolSnapshot,
          feeBips: AMM_MAP["AMM-LRC-ETH"].feeBips.toString(),
          takerRate: takerRate ? takerRate.toString() : "0",
          slipBips: slippage,
        });
        console.log(
          "Buy",
          ",LRC:",
          LOOPRING_EXPORTED_ACCOUNT.tradeLRCValue.toString(),
          ",minAmountInput LRC:",
          minAmountInput,
          ",ETH:",
          calcTradeParams?.amountBOutSlip?.minReceivedVal
        );

        const response: { hash: string } | any =
          await LoopringAPI.userAPI.submitOrder(
            {
              exchange: LOOPRING_EXPORTED_ACCOUNT.exchangeAddress,
              accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
              storageId: storageId.orderId,
              sellToken: {
                tokenId: TOKEN_INFO.tokenMap[sell].tokenId,
                volume: calcTradeParams?.amountS as string,
              },
              buyToken: {
                tokenId: TOKEN_INFO.tokenMap[buy].tokenId,
                volume: calcTradeParams?.amountBOutSlip.minReceived as string,
              },
              allOrNone: false,
              validUntil: LOOPRING_EXPORTED_ACCOUNT.validUntil,
              maxFeeBips: 63,
              fillAmountBOrS: false, // amm only false
              tradeChannel: calcTradeParams?.exceedDepth
                ? sdk.TradeChannel.BLANK
                : sdk.TradeChannel.MIXED,
              orderType: calcTradeParams?.exceedDepth
                ? sdk.OrderType.ClassAmm
                : sdk.OrderType.TakerOnly,
              eddsaSignature: "",
            },
            eddsaKey.sk,
            apiKey
          );
        console.log("submitOrder", response);
      } catch (err) {
        console.log(err);
      }
    },
    DEFAULT_TIMEOUT
  );

  it(
    "ETH-LRC_BtoA",
    async () => {
      try {
        // before user should have apikey, please check get apikey
        const buy = "ETH",
          sell = "LRC",
          MARKET = "LRC-ETH",
          AMM_MARKET = "AMM-LRC-ETH",
          slippage = "50";
        const isAtoB = false;

        // step1: get apikey & eddsaKey
        const { accInfo } = await LoopringAPI.exchangeAPI.getAccount({
          owner: LOOPRING_EXPORTED_ACCOUNT.address,
        });
        const eddsaKey = await signatureKeyPairMock(accInfo);
        apiKey = (
          await LoopringAPI.userAPI.getUserApiKey(
            {
              accountId: accInfo.accountId,
            },
            eddsaKey.sk
          )
        ).apiKey;

        // Step 2. storageId
        const storageId = await LoopringAPI.userAPI.getNextStorageId(
          {
            accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
            sellTokenId: TOKEN_INFO.tokenMap[sell].tokenId,
          },
          apiKey
        );

        // step3: get user AmountMap, which decided user minimum order
        const amountMap = {
          [AMM_MARKET]: (
            await LoopringAPI.userAPI.getMinimumTokenAmt(
              {
                accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
                market: AMM_MAP[AMM_MARKET].market,
              },
              apiKey
            )
          ).amountMap,
          [MARKET]: (
            await LoopringAPI.userAPI.getMinimumTokenAmt(
              {
                accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
                market: MARKET,
              },
              apiKey
            )
          ).amountMap,
        };

        // step4:  depth,  ammPoolSnapshot ,tickMap
        const [{ depth }, { ammPoolSnapshot }] = await Promise.all([
          LoopringAPI.exchangeAPI.getMixDepth({
            market: AMM_MAP["AMM-LRC-ETH"].market,
          }),
          LoopringAPI.ammpoolAPI.getAmmPoolSnapshot({
            poolAddress: AMM_MAP["AMM-LRC-ETH"].address,
          }),
        ]);

        // step5: check  MinAmt
        const amount: sdk.LoopringMap<sdk.TokenAmount> =
          amountMap[AMM_MARKET] ?? amountMap[MARKET];

        let buyMinAmtInfo = amount[buy];
        // let sellMinAmtInfo = amount[sell];

        let takerRate = buyMinAmtInfo
          ? buyMinAmtInfo.userOrderInfo.takerRate
          : 0;

        const minAmountInput = buyMinAmtInfo.userOrderInfo.minAmount;

        // step6: calcTradeParams
        const calcTradeParams = sdk.getOutputAmount({
          input: LOOPRING_EXPORTED_ACCOUNT.tradeETHValue.toString(),
          sell,
          buy,
          isAtoB,
          marketArr: ["LRC-ETH", "ETH-USDT", "DAI-USDT", "USDC-ETH"],
          tokenMap: TOKEN_INFO.tokenMap,
          marketMap: TOKEN_INFO.marketMap,
          depth,
          ammPoolSnapshot: ammPoolSnapshot,
          feeBips: AMM_MAP["AMM-LRC-ETH"].feeBips.toString(),
          takerRate: takerRate ? takerRate.toString() : "0",
          slipBips: slippage,
        });
        console.log(
          "Buy",
          ",ETH:",
          LOOPRING_EXPORTED_ACCOUNT.tradeLRCValue.toString(),
          ",minAmountInput ETH:",
          minAmountInput,
          ",LRC:",
          calcTradeParams?.amountBOutSlip?.minReceivedVal
        );

        const response: { hash: string } | any =
          await LoopringAPI.userAPI.submitOrder(
            {
              exchange: LOOPRING_EXPORTED_ACCOUNT.exchangeAddress,
              accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
              storageId: storageId.orderId,
              sellToken: {
                tokenId: TOKEN_INFO.tokenMap[sell].tokenId,
                volume: calcTradeParams?.amountS as string,
              },
              buyToken: {
                tokenId: TOKEN_INFO.tokenMap[buy].tokenId,
                volume: calcTradeParams?.amountBOutSlip.minReceived as string,
              },
              allOrNone: false,
              validUntil: LOOPRING_EXPORTED_ACCOUNT.validUntil,
              maxFeeBips: 63,
              fillAmountBOrS: false, // amm only false
              tradeChannel: calcTradeParams?.exceedDepth
                ? sdk.TradeChannel.BLANK
                : sdk.TradeChannel.MIXED,
              orderType: calcTradeParams?.exceedDepth
                ? sdk.OrderType.ClassAmm
                : sdk.OrderType.TakerOnly,
              eddsaSignature: "",
            },
            eddsaKey.sk,
            apiKey
          );
        console.log("submitOrder", response);
      } catch (err) {
        console.log(err);
      }
    },
    DEFAULT_TIMEOUT
  );
});

export default {};
