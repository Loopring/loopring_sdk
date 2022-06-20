import {
  AMM_MAP,
  DEFAULT_TIMEOUT,
  LOOPRING_EXPORTED_ACCOUNT,
  LoopringAPI,
  signatureKeyPairMock,
  TOKEN_INFO,
} from "../../MockData";
import {
  deepMock,
  ammPool,
  ticker,
  userAmount,
  MAPFEEBIPS,
  marketArray,
  marketMap,
  TokenMapMockSwap,
  ammPoolSnapshot as ammPoolSnapshotMock,
} from "../../MockSwapData";
import * as sdk from "../../../index";
import BigNumber from "bignumber.js";
let apiKey = "";
// const { tokenMap } = TOKEN_INFO;
const ammMap = AMM_MAP;
const calculateSwap = (
  sellSymbol = "LRC",
  buySymbol = "ETH",
  isInputSellToBuy: boolean,
  inputValue: number, // user Input value no decimal,
  _slippage = 0.1,
  //TODO MOCK value
  amountMap: any = userAmount,
  market: string = deepMock.symbol,
  // close = ticker.tickers[7],
  depth: any = deepMock,
  ammPoolSnapshot: sdk.AmmPoolSnapshot = ammPoolSnapshotMock,
  tokenMap = TokenMapMockSwap
) => {
  // const { ammPoolSnapshot, depth, tradePair, close } = pageTradeLite;
  // const { amountMap } = store.getState().amountMap;
  let calcFor100USDAmount, calcForMinCost, calcForPriceImpact;

  // @ts-ignore

  if (depth && market && tokenMap) {
    //@ts-ignore
    const sellToken = tokenMap[sellSymbol];
    //@ts-ignore
    const buyToken = tokenMap[buySymbol];

    const isInputSellOutputBuy = isInputSellToBuy;

    let input: any = inputValue;

    console.log(
      "sellToken: Symbol ",
      sellSymbol,
      "buyToken: Symbol",
      buyToken,
      "is Input Sell Output Buy:",
      isInputSellOutputBuy,
      "input value",
      input
    );
    input = input === undefined || isNaN(Number(input)) ? 0 : Number(input);
    let slippage = sdk.toBig(_slippage).times(100).toString();
    let totalFee = undefined;
    let feeTakerRate = undefined;
    let feeBips = undefined;
    let takerRate = undefined;
    let buyMinAmtInfo = undefined;
    let sellMinAmtInfo = undefined;
    let tradeCost = undefined;
    let basePrice = undefined;
    let maxFeeBips = MAPFEEBIPS;

    // @ts-ignore
    if (amountMap && amountMap[market] && ammMap) {
      // @ts-ignore
      console.log(`amountMap[${market}]:`, amountMap[market]);

      const ammMarket = `AMM-${market}`;

      // if AMM exist userAmount from AMM-LRC-ETH(AMM-Market), otherwise from LRC-ETH(Market)
      // @ts-ignore
      const amount = ammMap[ammMarket]
        ? // @ts-ignore
          amountMap[ammMarket]
        : // @ts-ignore
          amountMap[market as string];

      // @ts-ignore
      const amountMarket = amountMap[market]; // userAmount from  LRC-ETH(Market)

      buyMinAmtInfo = amount[buySymbol];
      sellMinAmtInfo = amount[sellSymbol];
      // myLog(`buyMinAmtInfo,sellMinAmtInfo: AMM-${market}, ${_tradeData[ 'buy' ].belong}`, buyMinAmtInfo, sellMinAmtInfo)

      takerRate = buyMinAmtInfo ? buyMinAmtInfo.userOrderInfo.takerRate : 0;
      // @ts-ignore
      feeBips = ammMap[ammMarket] ? ammMap[ammMarket].feeBips : 1;

      feeTakerRate =
        amountMarket[buySymbol] &&
        amountMarket[buySymbol].userOrderInfo.takerRate;
      tradeCost = amountMarket[buySymbol].tradeCost;
      // amountMarket[_tradeData["buy"].belong as string];
      //sdk.toBig(feeBips).plus(sdk.toBig(takerRate)).toString();

      const minAmountInput = BigNumber.max(
        buyMinAmtInfo.userOrderInfo.minAmount,
        buyToken.orderAmounts.dust
      )
        .div(sdk.toBig(1).minus(sdk.toBig(slippage).div(10000)))
        .div("1e" + buyToken.decimals)
        .toString();

      /*** for minimum value for ***/
      calcFor100USDAmount = sdk.getOutputAmount({
        input: minAmountInput,
        sell: sellSymbol,
        buy: buySymbol,
        isAtoB: false,
        marketArr: marketArray as string[],
        tokenMap: tokenMap as any,
        marketMap: marketMap as any,
        depth,
        ammPoolSnapshot: ammPoolSnapshot,
        feeBips: feeBips ? feeBips.toString() : 1,
        takerRate: "0",
        slipBips: slippage,
      });

      console.log(
        "buyMinAmtInfo.userOrderInfo.minAmount:",
        buyMinAmtInfo.userOrderInfo.minAmount,
        `buyMinAmtInfo.userOrderInfo.minAmount, with slippage:${slippage}`,
        sdk
          .toBig(buyMinAmtInfo.userOrderInfo.minAmount)
          .div(sdk.toBig(1).minus(sdk.toBig(slippage).div(10000)))
          .toString()
      );

      /*** calc for Price Impact ****/
      const sellMinAmtInput = sdk
        .toBig(sellMinAmtInfo.baseOrderInfo.minAmount)
        .div("1e" + sellToken.decimals)
        .toString();

      calcForPriceImpact = sdk.getOutputAmount({
        input: sellMinAmtInput,
        sell: sellSymbol,
        buy: buySymbol,
        isAtoB: true,
        marketArr: marketArray as string[],
        tokenMap: tokenMap as any,
        marketMap: marketMap as any,
        depth,
        ammPoolSnapshot: ammPoolSnapshot,
        feeBips: feeBips ? feeBips.toString() : 1,
        takerRate: "0",
        slipBips: "10",
      });

      basePrice = sdk.toBig(calcForPriceImpact?.output).div(sellMinAmtInput);

      console.log(
        "calcForPriceImpact input: ",
        sellMinAmtInput,
        ", output: ",
        sdk.toBig(calcForPriceImpact?.output).div(sellMinAmtInput).toNumber(),
        ", calcForPriceImpact:",
        calcForPriceImpact?.amountBOutSlip?.minReceivedVal,
        ", calcForPriceImpact basePrice: ",
        basePrice.toNumber()
      );

      /**** calc for mini Cost ****/

      //minCostBuyToken = max(dustBuyToken, tradeCostETH/maxAllowBips)
      const dustToken = buyToken;
      let minCostBuyTokenInput = BigNumber.max(
        sdk.toBig(tradeCost).times(2), //maxAllowBips = 50% tradeCostETH/50%
        dustToken.orderAmounts.dust
      );

      const tradeCostInput = sdk
        .toBig(minCostBuyTokenInput)
        .div(sdk.toBig(1).minus(sdk.toBig(slippage).div(10000)))
        .div("1e" + dustToken.decimals)
        .toString();

      console.log(
        "tradeCost*2:",
        sdk.toBig(tradeCost).times(2).toString(),
        "buyToken.orderAmounts.dust",
        buyToken.orderAmounts.dust,
        "minCostBuyToken:",
        minCostBuyTokenInput.toString(),
        `calcForMinCostInput, with slippage:${slippage}`,
        sdk
          .toBig(minCostBuyTokenInput ?? 0)
          .div(sdk.toBig(1).minus(sdk.toBig(slippage).div(10000)))
          .toString(),
        "calcForMinCost, Input",
        tradeCostInput
      );

      calcForMinCost = sdk.getOutputAmount({
        input: tradeCostInput,
        sell: sellSymbol,
        buy: buySymbol,
        isAtoB: false,
        marketArr: marketArray as string[],
        tokenMap: tokenMap as any,
        marketMap: marketMap as any,
        depth,
        ammPoolSnapshot: ammPoolSnapshot,
        feeBips: feeBips ? feeBips.toString() : 1,
        takerRate: "0",
        slipBips: slippage,
      });

      //add additionally 10% tolerance for minimum quantity user has to set on sell Token
      const minAmt = BigNumber.max(
        sellToken.orderAmounts.dust,
        calcForMinCost?.amountS ?? 0
      ).times(1.1);
      // TODO: this value mini-order Sell token amount (show on the UI for available check)
      // setSellMinAmt(minAmt.toString());

      console.log(
        "UI show mini-order Sell token amount:",
        minAmt.toString(),
        sdk
          .toBig(minAmt)
          .div("1e" + sellToken.decimals)
          .toString()
      );

      console.log(
        `calcFor100USDAmount.amountS`,
        sdk
          .toBig(calcFor100USDAmount?.amountS ?? 0)
          .div("1e" + sellToken.decimals)
          .toString(),
        "calcForMinCost.amountS",
        sdk
          .toBig(calcForMinCost?.amountS ?? 0)
          .div("1e" + sellToken.decimals)
          .toString()
      );
      // myLog('calcFor100USDAmount?.sellAmt:', calcFor100USDAmount?.sellAmt)
      // myLog(`${realMarket} feeBips:${feeBips} takerRate:${takerRate} totalFee: ${totalFee}`)
    }
    const calcTradeParams = sdk.getOutputAmount({
      input: input.toString(),
      sell: sellSymbol,
      buy: buySymbol,
      isAtoB: isInputSellOutputBuy,
      marketArr: marketArray as string[],
      tokenMap: tokenMap as any,
      marketMap: marketMap as any,
      depth,
      ammPoolSnapshot: ammPoolSnapshot,
      feeBips: feeBips ? feeBips.toString() : 1,
      takerRate: "0", // for new calc miniReceive will minus fee, so takeRate can fix as 0
      slipBips: slippage,
    });

    const minSymbol = buySymbol;
    const tradePrice = sdk
      .toBig(calcTradeParams?.amountBOutSlip?.minReceivedVal ?? 0)
      .div(isInputSellOutputBuy ? input.toString() : calcTradeParams?.output);
    const priceImpact = sdk
      .toBig(1)
      .minus(sdk.toBig(tradePrice).div(basePrice ?? 1))
      .minus(0.001);
    if (calcTradeParams && priceImpact.gte(0)) {
      calcTradeParams.priceImpact = priceImpact.toFixed(4, 1);
    } else {
      calcTradeParams && (calcTradeParams.priceImpact = "0");
    }

    console.log(
      "calcTradeParams input:",
      input.toString(),
      ", calcTradeParams Price: ",
      sdk
        .toBig(calcTradeParams?.amountBOutSlip?.minReceivedVal ?? 0)
        .div(input.toString())
        .toNumber(),
      `isAtoB mean isInputSellOutputBuy:${isInputSellOutputBuy}, ${
        isInputSellOutputBuy ? input.toString() : calcTradeParams?.output
      } tradePrice: `,
      tradePrice.toString(),
      "basePrice: ",
      basePrice?.toString(),
      "toBig(tradePrice).div(basePrice)",
      sdk
        .toBig(tradePrice)
        .div(basePrice ?? 1)
        .toNumber(),
      "priceImpact (1-tradePrice/basePrice) - 0.001",
      priceImpact.toNumber(),
      "priceImpact view",
      calcTradeParams?.priceImpact
    );

    if (
      tradeCost &&
      calcTradeParams &&
      calcTradeParams.amountBOutSlip?.minReceived &&
      feeTakerRate
    ) {
      let value = sdk
        .toBig(calcTradeParams.amountBOutSlip?.minReceived)
        .times(feeTakerRate)
        .div(10000);

      console.log(
        "input Accounts",
        calcTradeParams?.amountS,
        "100 U Amount Sell:",
        calcFor100USDAmount?.amountS
      );

      let validAmt = !!(
        calcTradeParams?.amountS &&
        calcFor100USDAmount?.amountS &&
        sdk.toBig(calcTradeParams?.amountS).gte(calcFor100USDAmount.amountS)
      );
      let totalFeeRaw;

      console.log(
        `${minSymbol} tradeCost:`,
        tradeCost,
        "useTakeRate Fee:",
        value.toString(),
        "calcFor100USDAmount?.amountS:",
        calcFor100USDAmount?.amountS,
        `is setup minTrade amount, ${calcFor100USDAmount?.amountS}:`,
        validAmt
      );

      if (!validAmt) {
        if (sdk.toBig(tradeCost).gte(value)) {
          totalFeeRaw = sdk.toBig(tradeCost);
        } else {
          totalFeeRaw = value;
        }
        console.log(
          "maxFeeBips update for tradeCost before value:",
          maxFeeBips,
          "totalFeeRaw",
          totalFeeRaw.toString()
        );
        maxFeeBips = Math.ceil(
          totalFeeRaw
            .times(10000)
            .div(calcTradeParams.amountBOutSlip?.minReceived)
            .toNumber()
        );
        console.log("maxFeeBips update for tradeCost after value:", maxFeeBips);
      } else {
        totalFeeRaw = sdk.toBig(value);
      }

      // @ts-ignore
      totalFee = totalFeeRaw
        // @ts-ignore
        .div("1e" + tokenMap[minSymbol].decimals)
        .toString();
      //   getValuePrecisionThousand(
      //   totalFeeRaw.div("1e" + tokenMap[minSymbol].decimals).toString(),
      //   tokenMap[minSymbol].precision,
      //   tokenMap[minSymbol].precision,
      //   tokenMap[minSymbol].precision,
      //   false,
      //   { floor: true }
      // );
      tradeCost = sdk
        .toBig(tradeCost)
        // @ts-ignore
        .div("1e" + tokenMap[minSymbol].decimals)
        .toString();
      // TODO  UI code with precision
      //   getValuePrecisionThousand(
      //   sdk
      //     .toBig(tradeCost)
      //     .div("1e" + tokenMap[minSymbol].decimals)
      //     .toString(),
      //   tokenMap[minSymbol].precision,
      //   tokenMap[minSymbol].precision,
      //   tokenMap[minSymbol].precision,
      //   false,
      //   { floor: true }
      // );

      console.log("totalFee view value:", totalFee + " " + minSymbol);
      console.log("tradeCost view value:", tradeCost + " " + minSymbol);
    }

    const minimumReceived = sdk
      .toBig(calcTradeParams?.amountBOutSlip?.minReceivedVal ?? 0)
      .minus(totalFee ?? 0)
      .toString();
    console.log("minimumReceived:", minimumReceived);

    // TODO  UI code with precision
    //   getValuePrecisionThousand(
    //   toBig(calcTradeParams?.amountBOutSlip?.minReceivedVal ?? 0)
    //     .minus(totalFee)
    //     .toString(),
    //   tokenMap[minSymbol].precision,
    //   tokenMap[minSymbol].precision,
    //   tokenMap[minSymbol].precision,
    //   false,
    //   { floor: true }
    // );

    let priceImpactView: any = calcTradeParams?.priceImpact
      ? parseFloat(calcTradeParams?.priceImpact) * 100
      : undefined;
    console.log("priceImpact view:", priceImpactView + "%");
    // TODO  UI code with color alert
    // const priceImpactObj = getPriceImpactInfo(calcTradeParams);
    // const _tradeCalcData: Partial<TradeCalcData<C>> = {
    //   priceImpact: priceImpactObj.value.toString(),
    //   priceImpactColor: priceImpactObj.priceImpactColor,
    //   minimumReceived: !minimumReceived?.toString().startsWith("-")
    //     ? minimumReceived
    //     : undefined,
    //   fee: totalFee,
    //   feeTakerRate,
    //   tradeCost,
    // };

    // myLog('calcTradeParams?.output:', calcTradeParams?.output, getShowStr(calcTradeParams?.output))
    // _tradeData[isAtoB ? "buy" : "sell"].tradeValue = getShowStr(
    //   calcTradeParams?.output
    // );
    console.log(
      `isInputSellOutputBuy:${isInputSellOutputBuy}`,
      `output ${isInputSellOutputBuy ? "Buy" : "Sell"}`,
      calcTradeParams?.output
    );

    return {
      market,
      feeBips,
      takerRate,
      sellMinAmtInfo: sellMinAmtInfo as any,
      buyMinAmtInfo: buyMinAmtInfo as any,
      totalFee,
      maxFeeBips,
      feeTakerRate,
      tradeCost,
      minimumReceived,
      calcTradeParams,
    };
  }
};
describe("orderERC20", function () {
  beforeEach(async () => {
    // deepMock, ammPool, ticker should update every 15's, useAmount should update every 15 minutes
    jest.setTimeout(DEFAULT_TIMEOUT * 3);
    LOOPRING_EXPORTED_ACCOUNT.gasPrice = (
      await LoopringAPI.exchangeAPI.getGasPrice()
    ).gasPrice;
  }, DEFAULT_TIMEOUT);
  it("Swap_SellLRC_BuyETH_USER_INPUT_LRC_miniOrder", async () => {
    const inputValue = 5.6;
    const slippage = 0.1;
    console.log(
      `output Swap_SellLRC_BuyETH_USER_INPUT_LRC_miniOrder Input value: ${inputValue},slippage: ${slippage} `,
      calculateSwap(
        "LRC", //sellSymbol
        "ETH", //buySymbol
        true, //isInputSellToBuy
        inputValue, // user Input value no decimal,
        slippage //_slippage
      )
    );
  });
  it("Swap_SellLRC_BuyETH_USER_INPUT_LRC_lessThenMiniOrder", async () => {
    const inputValue = 1;
    const slippage = 0.1;
    console.log(
      `output Swap_SellLRC_BuyETH_USER_INPUT_LRC_miniOrder Input value: ${inputValue},slippage: ${slippage} `,
      calculateSwap(
        "LRC", //sellSymbol
        "ETH", //buySymbol
        true, //isInputSellToBuy
        inputValue, // user Input value no decimal,
        slippage //_slippage
      )
    );
  });
  it("Swap_SellLRC_BuyETH_USER_INPUT_LRC_Slippage50", async () => {
    const inputValue = 5.6;
    const slippage = 50;
    console.log(
      `output Swap_SellLRC_BuyETH_USER_INPUT_LRC_miniOrder Input value: ${inputValue},slippage: ${
        slippage * 50
      } `,
      calculateSwap(
        "LRC", //sellSymbol
        "ETH", //buySymbol
        true, //isInputSellToBuy
        inputValue, // user Input value no decimal,
        slippage //_slippage
      )
    );
  });
  it("Swap_SellLRC_BuyETH_USER_INPUT_ETH_miniOrder", async () => {
    const inputValue = 0.0019;
    const slippage = 0.1;
    console.log(
      `output Swap_SellLRC_BuyETH_USER_INPUT_LRC_miniOrder Input value: ${inputValue},slippage: ${
        slippage * 50
      } `,
      calculateSwap(
        "LRC", //sellSymbol
        "ETH", //buySymbol
        false, //isInputSellToBuy
        inputValue, // user Input value no decimal,
        slippage //_slippage
      )
    );
  });
  it("Swap_SellETH_BuyLRC_USER_INPUT_ETH", async () => {
    const inputValue = 0.0017999;
    const slippage = 0.1;
    console.log(
      `output Swap_SellLRC_BuyETH_USER_INPUT_LRC_miniOrder Input value: ${inputValue},slippage: ${
        slippage * 50
      } `,
      calculateSwap(
        "ETH", //sellSymbol
        "LRC", //buySymbol
        false, //isInputSellToBuy
        inputValue, // user Input value no decimal,
        slippage //_slippage
      )
    );
  });

  it(
    "RealOrderLRC-ETH_AtoB",
    async () => {
      try {
        // MOCK Data
        const buy = "ETH",
          sell = "LRC",
          MARKET = "LRC-ETH",
          AMM_MARKET = "AMM-LRC-ETH",
          isAtoB = true,
          slippage = "50";

        // Step 1. get apikey & eddsaKey
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

        // Step 3. get user AmountMap, which decided user minimum order
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

        // Step 4.  depth,  ammPoolSnapshot ,tickMap
        const [{ depth }, { ammPoolSnapshot }] = await Promise.all([
          LoopringAPI.exchangeAPI.getMixDepth({
            market: AMM_MAP["AMM-LRC-ETH"].market,
          }),
          LoopringAPI.ammpoolAPI.getAmmPoolSnapshot({
            poolAddress: AMM_MAP["AMM-LRC-ETH"].address,
          }),
        ]);
        // Step 5. check MinAmt see log and calc mini receive and ouput value & maxfeeBips
        // @ts-ignore
        const { calcTradeParams, maxFeeBips, minimumReceived } = calculateSwap(
          sell,
          buy,
          isAtoB,
          10, // user Input value no decimal 10 lrc,
          0.1,
          //TODO MOCK value
          amountMap,
          "LRC-ETH",
          // close = ticker.tickers[7],
          depth,
          ammPoolSnapshot,
          TOKEN_INFO.tokenMap
        );

        console.log(
          "calcTradeParams",
          calcTradeParams,
          "minimumReceived",
          minimumReceived,
          "maxFeeBips",
          maxFeeBips
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
              maxFeeBips: maxFeeBips,
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
  //
  // it(
  //   "RealOrderETH-LRC_BtoA",
  //   async () => {
  //     try {
  //       // before user should have apikey, please check get apikey
  //       const buy = "ETH",
  //         sell = "LRC",
  //         MARKET = "LRC-ETH",
  //         AMM_MARKET = "AMM-LRC-ETH",
  //         slippage = "50";
  //       const isAtoB = false;
  //
  //       // Step 1. get apikey & eddsaKey
  //       const { accInfo } = await LoopringAPI.exchangeAPI.getAccount({
  //         owner: LOOPRING_EXPORTED_ACCOUNT.address,
  //       });
  //       const eddsaKey = await signatureKeyPairMock(accInfo);
  //       apiKey = (
  //         await LoopringAPI.userAPI.getUserApiKey(
  //           {
  //             accountId: accInfo.accountId,
  //           },
  //           eddsaKey.sk
  //         )
  //       ).apiKey;
  //
  //       // Step 2. storageId
  //       const storageId = await LoopringAPI.userAPI.getNextStorageId(
  //         {
  //           accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
  //           sellTokenId: TOKEN_INFO.tokenMap[sell].tokenId,
  //         },
  //         apiKey
  //       );
  //
  //       // Step 3. get user AmountMap, which decided user minimum order
  //       const amountMap = {
  //         [AMM_MARKET]: (
  //           await LoopringAPI.userAPI.getMinimumTokenAmt(
  //             {
  //               accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
  //               market: AMM_MAP[AMM_MARKET].market,
  //             },
  //             apiKey
  //           )
  //         ).amountMap,
  //         [MARKET]: (
  //           await LoopringAPI.userAPI.getMinimumTokenAmt(
  //             {
  //               accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
  //               market: MARKET,
  //             },
  //             apiKey
  //           )
  //         ).amountMap,
  //       };
  //
  //       // Step 4.  depth,  ammPoolSnapshot ,tickMap
  //       const [{ depth }, { ammPoolSnapshot }] = await Promise.all([
  //         LoopringAPI.exchangeAPI.getMixDepth({
  //           market: AMM_MAP["AMM-LRC-ETH"].market,
  //         }),
  //         LoopringAPI.ammpoolAPI.getAmmPoolSnapshot({
  //           poolAddress: AMM_MAP["AMM-LRC-ETH"].address,
  //         }),
  //       ]);
  //
  //       // Step 5. check  MinAmt
  //       const amount: sdk.LoopringMap<sdk.TokenAmount> =
  //         amountMap[AMM_MARKET] ?? amountMap[MARKET];
  //
  //       let buyMinAmtInfo = amount[buy];
  //       // let sellMinAmtInfo = amount[sell];
  //
  //       let takerRate = buyMinAmtInfo
  //         ? buyMinAmtInfo.userOrderInfo.takerRate
  //         : 0;
  //
  //       const minAmountInput = buyMinAmtInfo.userOrderInfo.minAmount;
  //
  //       // Step 6. calcTradeParams
  //       const calcTradeParams = sdk.getOutputAmount({
  //         input: LOOPRING_EXPORTED_ACCOUNT.tradeETHValue.toString(),
  //         sell,
  //         buy,
  //         isAtoB,
  //         marketArr: ["LRC-ETH", "ETH-USDT", "DAI-USDT", "USDC-ETH"],
  //         tokenMap: TOKEN_INFO.tokenMap,
  //         marketMap: TOKEN_INFO.marketMap,
  //         depth,
  //         ammPoolSnapshot: ammPoolSnapshot,
  //         feeBips: AMM_MAP["AMM-LRC-ETH"].feeBips.toString(),
  //         takerRate: takerRate ? takerRate.toString() : "0",
  //         slipBips: slippage,
  //       });
  //       console.log(
  //         "Buy",
  //         ",ETH:",
  //         LOOPRING_EXPORTED_ACCOUNT.tradeLRCValue.toString(),
  //         ",minAmountInput ETH:",
  //         minAmountInput,
  //         ",LRC:",
  //         calcTradeParams?.amountBOutSlip?.minReceivedVal
  //       );
  //
  //       const response: { hash: string } | any =
  //         await LoopringAPI.userAPI.submitOrder(
  //           {
  //             exchange: LOOPRING_EXPORTED_ACCOUNT.exchangeAddress,
  //             accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
  //             storageId: storageId.orderId,
  //             sellToken: {
  //               tokenId: TOKEN_INFO.tokenMap[sell].tokenId,
  //               volume: calcTradeParams?.amountS as string,
  //             },
  //             buyToken: {
  //               tokenId: TOKEN_INFO.tokenMap[buy].tokenId,
  //               volume: calcTradeParams?.amountBOutSlip.minReceived as string,
  //             },
  //             allOrNone: false,
  //             validUntil: LOOPRING_EXPORTED_ACCOUNT.validUntil,
  //             maxFeeBips: 63,
  //             fillAmountBOrS: false, // amm only false
  //             tradeChannel: calcTradeParams?.exceedDepth
  //               ? sdk.TradeChannel.BLANK
  //               : sdk.TradeChannel.MIXED,
  //             orderType: calcTradeParams?.exceedDepth
  //               ? sdk.OrderType.ClassAmm
  //               : sdk.OrderType.TakerOnly,
  //             eddsaSignature: "",
  //           },
  //           eddsaKey.sk,
  //           apiKey
  //         );
  //       console.log("submitOrder", response);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   },
  //   DEFAULT_TIMEOUT
  // );
});

export default {};
