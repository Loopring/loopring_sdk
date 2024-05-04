# Order ERC20

*** 
## mini-order
To support small quantity trading, we introduce an additional concept "tradeCost", which is the minimum gas fee when a trade transaction is uplink to Ethereum. 

Let's take LRC-ETH trading as an example.

Below are the steps - 

**1) Query  api/v3/exchange/tokens to get the dust value of orderAmounts for both LRC and ETH.** 

The dust value is the minimum value to pass Relayer check. Any amount less than "dust" can't be traded. In this case, we will get both minTOkenLRC and minTokenETH after getting dust value. If user wants to convert LRC to ETH, the set LRC amount can't be less than minTokenLRC and the converted ETH amount can't be less than minTokenETH.   

**2) Query api/v3/user/orderUserRateAmount to get the tradeCost value.**

The parameters to call this interface are "accountId" and "market=LRC-ETH". In this example, we will get two tradeCost values for LRC and ETH as tradeCostLRC and tradeCostETH.

**3) Set maxAllowBips = 50% as the maxFeeBips can't exceed 50%**

**4) Set slippage as the slippage value user configured in UI (for example 0.1%)**

**5）Caculate minCostLRC and minCostETH as below**

    minCostLRC = max(minTokenLRC, tradeCostLRC/maxAllowBips)
    minCostETH = max(minTokenETH, tradeCostETH/maxAllowBips)
 
**6) Caculate the cost by considering slippage**

    minCostLRCSlip = minCostLRC/(1-slippage)
    minCostETHSlip = minCostETH/(1-slippage)
    

**7) Cacluate the minimum quantity user has to set**

    tradeCostSellLRC = max(tradeCostSellLRC, minTokenLRC) * 1.1
    tradeCostSellETH = max(tradeCostSellETH, minTokenETH) * 1.1
Here we add additonally 10% tolerance.

**8) Caculate the previous minimum token amount per calling api/v3/user/orderUserRateAmount (existing logic)**

This is the threshold to distinguish small quantity trading and normal trading  
We will get two values (configSellLRC and configSellETH) which are used for previous trading quantity limit (Per USD 100) caculation

**9) Caculate the new maxFeeBips and start trading**

Let's take LRC->ETH as the example
User inputs the amount of LRC to convert, amount = sellLRC

    if sellLRC >= configSellLRC then 
    	// Normal trading case, stay with previous logic
    	maxFeeBips=63 (the default value for maxFeeBips)
    	Trade 
    else if sellLRC < tradeCostSellLRC then 
    	// Really too small to support
    	Prompt user the amount is too small to support
    	Exit
    else 
    	// This is what we call as small quantity 
    	costRate = Ceil(tradeCostETH/minbuyETH) 
    	maxFeeBips = max(costRate, takerRate)
    	Trade 
    End If 
    

### price impact update

**1）sellTokenMinAmount  =  baseOrderInfo.minAmount from  LoopringAPI.userAPI.getMinimumTokenAmt({accountId,marke}, apiKey);**

**2）{output} from  sdk.getOutputAmount(input: sellTokenMinAmount, isAtoB: isAtoB,…}).output**

**3）PriceBase = output / sellTokenMinAmount**

**4）tradePrice = calcTradeParams.minReceive / userInputSell**

**5）priceImpact = 1 - tradePrice/PriceBase - 0.005**

**6）If priceImpact < 0 priceImpact = 0  Else priceImpact**

##  
```ts
const calculateSwap = (
  sellSymbol = "LRC",
  buySymbol = "ETH",
  isInputSellToBuy: boolean,
  inputValue: number, // user Input value no decimal,
  _slippage = 0.1,
  // MOCK value
  amountMap: { [key: string]: any } = userAmount,
  market: string = deepMock.symbol,
  // close = ticker.tickers[7],
  depth: any = deepMock,
  ammPoolSnapshot: sdk.AmmPoolSnapshot = ammPoolSnapshotMock,
  tokenMap: sdk.LoopringMap<sdk.TokenInfo> = TokenMapMockSwap,
  ammMap: { [key: string]: any } = AMM_MAP
) => {
  let calcFor100USDAmount, calcForMinCost, calcForPriceImpact;
  if (depth && market && tokenMap) {
    const sellToken = tokenMap[sellSymbol];
    const buyToken = tokenMap[buySymbol];
    const isInputSellOutputBuy = isInputSellToBuy;
    let input: any = inputValue;

    console.log(
      "sellToken: Symbol ",
      sellSymbol,
      "buyToken: Symbol",
      buySymbol,
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
    let minAmt = undefined;

    if (amountMap && amountMap[market] && ammMap) {
      console.log(`amountMap[${market}]:`, amountMap[market]);

      const ammMarket = `AMM-${market}`;

      const amountMarket = amountMap[market]; // userAmount from  LRC-ETH(Market)

      buyMinAmtInfo = amountMarket[buySymbol];
      sellMinAmtInfo = amountMarket[sellSymbol];
      console.log(
        `buyMinAmtInfo: ${market}, ${buySymbol}`,
        buyMinAmtInfo,
        `sellMinAmtInfo: ${market}, ${sellSymbol}`,
        sellMinAmtInfo
      );

      feeBips = ammMap[ammMarket] ? ammMap[ammMarket].feeBips : 1;

      feeTakerRate =
        amountMarket[buySymbol] &&
        amountMarket[buySymbol].userOrderInfo.takerRate;
      tradeCost = amountMarket[buySymbol].tradeCost;

      /** @description for charge fee calc, calcFor100USDAmount
       *  Loopring market consider buyToken value small then  max(buyMinAmtInfo.userOrderInfo.minAmount,buyToken.orderAmounts.dust) is a small order,
       * the fee will take the Max(tradeCost,userTakeRate)
       * use the buyMinAmount Input calc the selltoken value,
       * please read Line:321
       * **/
      const minAmountInput = BigNumber.max(
        buyMinAmtInfo.userOrderInfo.minAmount,
        buyToken.orderAmounts.dust
      )
        .div(sdk.toBig(1).minus(sdk.toBig(slippage).div(10000)))
        .div("1e" + buyToken.decimals)
        .toString();
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
        `tradeCost: ${tradeCost}*2:`,
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
      /**
       * @output: minAmt for UI
       * this value mini-order Sell token amount (show on the UI for available order check)
       * setSellMinAmt(minAmt.toString());
       */
      minAmt = BigNumber.max(
        sellToken.orderAmounts.dust,
        calcForMinCost?.amountS ?? 0
      ).times(1.1);

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

      /**
       * totalFee
       */
      totalFee = totalFeeRaw
        .div("1e" + tokenMap[minSymbol].decimals)
        .toString();
      /** @output: UI
       *   getValuePrecisionThousand(
       *   totalFeeRaw.div("1e" + tokenMap[minSymbol].decimals).toString(),
       *   tokenMap[minSymbol].precision,
       *   tokenMap[minSymbol].precision,
       *   tokenMap[minSymbol].precision,
       *   false,
       *   { floor: true }
       * );
       */

      tradeCost = sdk
        .toBig(tradeCost)
        // @ts-ignore
        .div("1e" + tokenMap[minSymbol].decimals)
        .toString();

      /** @output:  UI code with precision
       *   getValuePrecisionThousand(
       *   sdk
       *     .toBig(tradeCost)
       *     .div("1e" + tokenMap[minSymbol].decimals)
       *     .toString(),
       *   tokenMap[minSymbol].precision,
       *   tokenMap[minSymbol].precision,
       *   tokenMap[minSymbol].precision,
       *   false,
       *   { floor: true }
       * );
       */

      console.log("totalFee view value:", totalFee + " " + minSymbol);
      console.log("tradeCost view value:", tradeCost + " " + minSymbol);
    }

    const minimumReceived = sdk
      .toBig(calcTradeParams?.amountBOutSlip?.minReceivedVal ?? 0)
      .minus(totalFee ?? 0)
      .toString();
    console.log("minimumReceived:", minimumReceived);

    /** @output:   UI code with precision
     *   getValuePrecisionThousand(
     *   toBig(calcTradeParams?.amountBOutSlip?.minReceivedVal ?? 0)
     *     .minus(totalFee)
     *     .toString(),
     *   tokenMap[minSymbol].precision,
     *   tokenMap[minSymbol].precision,
     *   tokenMap[minSymbol].precision,
     *   false,
     *   { floor: true }
     * );
     */

    let priceImpactView: any = calcTradeParams?.priceImpact
      ? parseFloat(calcTradeParams?.priceImpact) * 100
      : undefined;
    console.log("priceImpact view:", priceImpactView + "%");
    //  @output:   UI code with color alert
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
      minAmt,
    };
  }
};
```

### Step 1. get apikey & eddsaKey

```ts
const {accInfo} = await LoopringAPI.exchangeAPI.getAccount({
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
```

### Step 2. storageId

```ts

const storageId = await LoopringAPI.userAPI.getNextStorageId(
  {
    accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
    sellTokenId: TOKEN_INFO.tokenMap[sell].tokenId,
  },
  apiKey
);
```

### Step 3. get user AmountMap, which decided user minimum order

```ts
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
```

### Step 4. depth, ammPoolSnapshot ,tickMap

```ts
const [{depth}, {ammPoolSnapshot}] = await Promise.all([
  LoopringAPI.exchangeAPI.getMixDepth({
    market: AMM_MAP["AMM-LRC-ETH"].market,
  }),
  LoopringAPI.ammpoolAPI.getAmmPoolSnapshot({
    poolAddress: AMM_MAP["AMM-LRC-ETH"].address,
  }),
]);
```

### Step 5. Check MinAmt see log and calc mini receive and output value & maxfeeBips & priceImpact & swap output

```ts
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
        TOKEN_INFO.tokenMap,
        AMM_MAP
      );
```

### Step 6. Submit

```ts
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
```   

***

## ETH-LRC : for Quote to Base

### MOCK Data

> user should had apikey, please check get apikey

```ts
const buy = "ETH",
  sell = "LRC",
  MARKET = "LRC-ETH",
  AMM_MARKET = "AMM-LRC-ETH",
  slippage = "50";
const isAtoB = false;
```

### Step 1. get apikey & eddsaKey

```ts
const {accInfo} = await LoopringAPI.exchangeAPI.getAccount({
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
```

### Step  2. storageId

```ts
const storageId = await LoopringAPI.userAPI.getNextStorageId(
  {
    accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
    sellTokenId: TOKEN_INFO.tokenMap[sell].tokenId,
  },
  apiKey
);
```

### Step 3. get user AmountMap, which decided user minimum order

```ts
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
```

### Step 4. depth, ammPoolSnapshot ,tickMap

```ts
const [{depth}, {ammPoolSnapshot}] = await Promise.all([
  LoopringAPI.exchangeAPI.getMixDepth({
    market: AMM_MAP["AMM-LRC-ETH"].market,
  }),
  LoopringAPI.ammpoolAPI.getAmmPoolSnapshot({
    poolAddress: AMM_MAP["AMM-LRC-ETH"].address,
  }),
]);
```

### Step  5. check MinAmt see log and calc mini receive and output value & maxfeeBips & priceImpact

```ts
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
        TOKEN_INFO.tokenMap,
        AMM_MAP
);
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
``` 


### MockSwapData
```ts
//Default config value from getTokens & getMixMarkets
import * as sdk from "../index";

export const marketArray = ["LRC-ETH"];
export const marketMap = {
  "LRC-ETH": {
    baseTokenId: 1,
    enabled: true,
    market: "LRC-ETH",
    orderbookAggLevels: 5,
    precisionForPrice: 6,
    quoteTokenId: 0,
    status: 3,
    isSwapEnabled: true,
    createdAt: 1617967800000,
  },
};
//v3/mix/depth?level=0&limit=50&market=LRC-ETH
export const deepMock = {
  symbol: "LRC-ETH",
  version: 23249677,
  timestamp: 1655719492365,
  mid_price: 0.00033248,
  bids: [
    {
      price: 0.00030689,
      amt: "12041160324514792497908",
      vol: "3695372332571085210",
      amtTotal: "618450503644320209925641",
      volTotal: "198539605794234049017",
    },
    {
      price: 0.00030752,
      amt: "12016302126785109160251",
      vol: "3695372332571085210",
      amtTotal: "606409343319805417427733",
      volTotal: "194844233461662963807",
    },
    {
      price: 0.00030816,
      amt: "11991520826895479525387",
      vol: "3695372332571085210",
      amtTotal: "594393041193020308267482",
      volTotal: "191148861129091878597",
    },
    {
      price: 0.00030881,
      amt: "12329062048917727073625",
      vol: "3807353312345966580",
      amtTotal: "582401520366124828742095",
      volTotal: "187453488796520793387",
    },
    {
      price: 0.00030945,
      amt: "11941442525358097768419",
      vol: "3695372332571085210",
      amtTotal: "570072458317207101668470",
      volTotal: "183646135484174826807",
    },
    {
      price: 0.0003102,
      amt: "3223726000000000000000",
      vol: "999999805200000000",
      amtTotal: "558131015791849003900051",
      volTotal: "179950763151603741597",
    },
    {
      price: 0.0003104,
      amt: "11904963012947201084062",
      vol: "3695372332571085210",
      amtTotal: "554907289791849003900051",
      volTotal: "178950763346403741597",
    },
    {
      price: 0.00031072,
      amt: "11892800074855146120151",
      vol: "3695372332571085210",
      amtTotal: "543002326778901802815989",
      volTotal: "175255391013832656387",
    },
    {
      price: 0.00031137,
      amt: "12227667622887455762012",
      vol: "3807353312345966580",
      amtTotal: "531109526704046656695838",
      volTotal: "171560018681261571177",
    },
    {
      price: 0.00031202,
      amt: "11843337524732768607817",
      vol: "3695372332571085210",
      amtTotal: "518881859081159200933826",
      volTotal: "167752665368915604597",
    },
    {
      price: 0.00031266,
      amt: "11819088718260537718160",
      vol: "3695372332571085210",
      amtTotal: "507038521556426432326009",
      volTotal: "164057293036344519387",
    },
    {
      price: 0.0003133,
      amt: "11794914308461194855590",
      vol: "3695372332571085210",
      amtTotal: "495219432838165894607849",
      volTotal: "160361920703773434177",
    },
    {
      price: 0.00031395,
      amt: "12127129883064173669497",
      vol: "3807353312345966580",
      amtTotal: "483424518529704699752259",
      volTotal: "156666548371202348967",
    },
    {
      price: 0.0003146,
      amt: "11746060536480763829870",
      vol: "3695372332571085210",
      amtTotal: "471297388646640526082762",
      volTotal: "152859195058856382387",
    },
    {
      price: 0.00031524,
      amt: "11722109721002274877424",
      vol: "3695372332571085210",
      amtTotal: "459551328110159762252892",
      volTotal: "149163822726285297177",
    },
    {
      price: 0.0003159,
      amt: "12052351993023897680738",
      vol: "3807353312345966580",
      amtTotal: "447829218389157487375468",
      volTotal: "145468450393714211967",
    },
    {
      price: 0.00031655,
      amt: "11673707113082743010268",
      vol: "3695372332571085210",
      amtTotal: "435776866396133589694730",
      volTotal: "141661097081368245387",
    },
    {
      price: 0.00031699,
      amt: "615000000000000000000",
      vol: "194954999999999949",
      amtTotal: "424103159283050846684462",
      volTotal: "137965724748797160177",
    },
    {
      price: 0.00031719,
      amt: "11649977142974837964110",
      vol: "3695372332571085210",
      amtTotal: "423488159283050846684462",
      volTotal: "137770769748797160228",
    },
    {
      price: 0.00031784,
      amt: "11626319455782556517212",
      vol: "3695372332571085210",
      amtTotal: "411838182140076008720352",
      volTotal: "134075397416226075018",
    },
    {
      price: 0.0003185,
      amt: "11953964321007990024755",
      vol: "3807353312345966580",
      amtTotal: "400211862684293452203140",
      volTotal: "130380025083654989808",
    },
    {
      price: 0.00031934,
      amt: "11571837200722111826863",
      vol: "3695372332571085210",
      amtTotal: "388257898363285462178385",
      volTotal: "126572671771309023228",
    },
    {
      price: 0.00031979,
      amt: "11555429099390519988949",
      vol: "3695372332571085210",
      amtTotal: "376686061162563350351522",
      volTotal: "122877299438737938018",
    },
    {
      price: 0.00032,
      amt: "300000000000000000000",
      vol: "96000000000000000",
      amtTotal: "365130632063172830362573",
      volTotal: "119181927106166852808",
    },
    {
      price: 0.00032044,
      amt: "11532058329906875386268",
      vol: "3695372332571085210",
      amtTotal: "364830632063172830362573",
      volTotal: "119085927106166852808",
    },
    {
      price: 0.0003211,
      amt: "11857145662584872212009",
      vol: "3807353312345966580",
      amtTotal: "353298573733265954976305",
      volTotal: "115390554773595767598",
    },
    {
      price: 0.00032176,
      amt: "11484826169666631095087",
      vol: "3695372332571085210",
      amtTotal: "341441428070681082764296",
      volTotal: "111583201461249801018",
    },
    {
      price: 0.00032241,
      amt: "11461669156035188891431",
      vol: "3695372332571085210",
      amtTotal: "329956601901014451669209",
      volTotal: "107887829128678715808",
    },
    {
      price: 0.00032294,
      amt: "22266286128259997368320",
      vol: "7190674442260284416",
      amtTotal: "318494932744979262777778",
      volTotal: "104192456796107630598",
    },
    {
      price: 0.00032307,
      amt: "11784846142950476791130",
      vol: "3807353312345966580",
      amtTotal: "296228646616719265409458",
      volTotal: "97001782353847346182",
    },
    {
      price: 0.00032333,
      amt: "31042151210389998665728",
      vol: "10037169172367501312",
      amtTotal: "284443800473768788618328",
      volTotal: "93194429041501379602",
    },
    {
      price: 0.00032354,
      amt: "19082720347089998446592",
      vol: "6174214168300968960",
      amtTotal: "253401649263378789952600",
      volTotal: "83157259869133878290",
    },
    {
      price: 0.00032373,
      amt: "11414868337793698506576",
      vol: "3695372332571085210",
      amtTotal: "234318928916288791506008",
      volTotal: "76983045700832909330",
    },
    {
      price: 0.00032438,
      amt: "11391922481177051106050",
      vol: "3695372332571085210",
      amtTotal: "222904060578495092999432",
      volTotal: "73287673368261824120",
    },
    {
      price: 0.00032503,
      amt: "11369045742792164433715",
      vol: "3695372332571085210",
      amtTotal: "211512138097318041893382",
      volTotal: "69592301035690738910",
    },
    {
      price: 0.00032512,
      amt: "7101984539779999465472",
      vol: "2308997213573273600",
      amtTotal: "200143092354525877459667",
      volTotal: "65896928703119653700",
    },
    {
      price: 0.0003257,
      amt: "11689707913498419991686",
      vol: "3807353312345966580",
      amtTotal: "193041107814745877994195",
      volTotal: "63587931489546380100",
    },
    {
      price: 0.00032636,
      amt: "11322810509578528739940",
      vol: "3695372332571085210",
      amtTotal: "181351399901247458002509",
      volTotal: "59780578177200413520",
    },
    {
      price: 0.00032702,
      amt: "11300141532643741902081",
      vol: "3695372332571085210",
      amtTotal: "170028589391668929262569",
      volTotal: "56085205844629328310",
    },
    {
      price: 0.00032709,
      amt: "1511898000000000000000",
      vol: "494541835799999898",
      amtTotal: "158728447859025187360488",
      volTotal: "52389833512058243100",
    },
    {
      price: 0.00032767,
      amt: "11277540564700637960582",
      vol: "3695372332571085210",
      amtTotal: "157216549859025187360488",
      volTotal: "51895291676258243202",
    },
    {
      price: 0.00032838,
      amt: "11594014901713773553177",
      vol: "3807353312345966580",
      amtTotal: "145939009294324549399906",
      volTotal: "48199919343687157992",
    },
    {
      price: 0.00032899,
      amt: "11232203228917728004878",
      vol: "3695372332571085210",
      amtTotal: "134344994392610775846729",
      volTotal: "44392566031341191412",
    },
    {
      price: 0.00032959,
      amt: "31100749000000000753664",
      vol: "10250806870400000000",
      amtTotal: "123112791163693047841851",
      volTotal: "40697193698770106202",
    },
    {
      price: 0.00032965,
      amt: "11209805337410429375102",
      vol: "3695372332571085210",
      amtTotal: "92012042163693047088187",
      volTotal: "30446386828370106202",
    },
    {
      price: 0.00033031,
      amt: "11187474373893810850495",
      vol: "3695372332571085210",
      amtTotal: "80802236826282617713085",
      volTotal: "26751014495799020992",
    },
    {
      price: 0.00033098,
      amt: "11503202913004006553102",
      vol: "3807353312345966580",
      amtTotal: "69614762452388806862590",
      volTotal: "23055642163227935782",
    },
    {
      price: 0.00033099,
      amt: "26515451000000002129920",
      vol: "8776614281000000512",
      amtTotal: "58111559539384800309488",
      volTotal: "19248288850881969202",
    },
    {
      price: 0.0003313,
      amt: "20499506300000000802816",
      vol: "6791486437190000640",
      amtTotal: "31596108539384798179568",
      volTotal: "10471674569881968690",
    },
    {
      price: 0.00033165,
      amt: "11096602239384797376752",
      vol: "3680188132691968050",
      amtTotal: "11096602239384797376752",
      volTotal: "3680188132691968050",
    },
  ],
  bids_prices: [
    0.00030689, 0.00030752, 0.00030816, 0.00030881, 0.00030945, 0.0003102,
    0.0003104, 0.00031072, 0.00031137, 0.00031202, 0.00031266, 0.0003133,
    0.00031395, 0.0003146, 0.00031524, 0.0003159, 0.00031655, 0.00031699,
    0.00031719, 0.00031784, 0.0003185, 0.00031934, 0.00031979, 0.00032,
    0.00032044, 0.0003211, 0.00032176, 0.00032241, 0.00032294, 0.00032307,
    0.00032333, 0.00032354, 0.00032373, 0.00032438, 0.00032503, 0.00032512,
    0.0003257, 0.00032636, 0.00032702, 0.00032709, 0.00032767, 0.00032838,
    0.00032899, 0.00032959, 0.00032965, 0.00033031, 0.00033098, 0.00033099,
    0.0003313, 0.00033165,
  ],
  bids_amtTotals: [
    "618450503644320209925641",
    "606409343319805417427733",
    "594393041193020308267482",
    "582401520366124828742095",
    "570072458317207101668470",
    "558131015791849003900051",
    "554907289791849003900051",
    "543002326778901802815989",
    "531109526704046656695838",
    "518881859081159200933826",
    "507038521556426432326009",
    "495219432838165894607849",
    "483424518529704699752259",
    "471297388646640526082762",
    "459551328110159762252892",
    "447829218389157487375468",
    "435776866396133589694730",
    "424103159283050846684462",
    "423488159283050846684462",
    "411838182140076008720352",
    "400211862684293452203140",
    "388257898363285462178385",
    "376686061162563350351522",
    "365130632063172830362573",
    "364830632063172830362573",
    "353298573733265954976305",
    "341441428070681082764296",
    "329956601901014451669209",
    "318494932744979262777778",
    "296228646616719265409458",
    "284443800473768788618328",
    "253401649263378789952600",
    "234318928916288791506008",
    "222904060578495092999432",
    "211512138097318041893382",
    "200143092354525877459667",
    "193041107814745877994195",
    "181351399901247458002509",
    "170028589391668929262569",
    "158728447859025187360488",
    "157216549859025187360488",
    "145939009294324549399906",
    "134344994392610775846729",
    "123112791163693047841851",
    "92012042163693047088187",
    "80802236826282617713085",
    "69614762452388806862590",
    "58111559539384800309488",
    "31596108539384798179568",
    "11096602239384797376752",
  ],
  bids_volTotals: [
    "198539605794234049017",
    "194844233461662963807",
    "191148861129091878597",
    "187453488796520793387",
    "183646135484174826807",
    "179950763151603741597",
    "178950763346403741597",
    "175255391013832656387",
    "171560018681261571177",
    "167752665368915604597",
    "164057293036344519387",
    "160361920703773434177",
    "156666548371202348967",
    "152859195058856382387",
    "149163822726285297177",
    "145468450393714211967",
    "141661097081368245387",
    "137965724748797160177",
    "137770769748797160228",
    "134075397416226075018",
    "130380025083654989808",
    "126572671771309023228",
    "122877299438737938018",
    "119181927106166852808",
    "119085927106166852808",
    "115390554773595767598",
    "111583201461249801018",
    "107887829128678715808",
    "104192456796107630598",
    "97001782353847346182",
    "93194429041501379602",
    "83157259869133878290",
    "76983045700832909330",
    "73287673368261824120",
    "69592301035690738910",
    "65896928703119653700",
    "63587931489546380100",
    "59780578177200413520",
    "56085205844629328310",
    "52389833512058243100",
    "51895291676258243202",
    "48199919343687157992",
    "44392566031341191412",
    "40697193698770106202",
    "30446386828370106202",
    "26751014495799020992",
    "23055642163227935782",
    "19248288850881969202",
    "10471674569881968690",
    "3680188132691968050",
  ],
  bids_amtTotal: "618450503644320209925641",
  bids_volTotal: "198539605794234049017",
  asks: [
    {
      price: 0.00033331,
      amt: "26466599999999999737856",
      vol: "8821317780000000000",
      amtTotal: "26466599999999999737856",
      volTotal: "8821317780000000000",
    },
    {
      price: 0.0003336,
      amt: "33880800000000001048576",
      vol: "11302634880000000000",
      amtTotal: "60347400000000000786432",
      volTotal: "20123952660000000000",
    },
    {
      price: 0.00033371,
      amt: "11142477800817399987988",
      vol: "3718356266910774549",
      amtTotal: "71489877800817400774420",
      volTotal: "23842308926910774549",
    },
    {
      price: 0.00033439,
      amt: "11410124103475892197402",
      vol: "3815340399218399705",
      amtTotal: "82900001904293292971822",
      volTotal: "27657649326129174254",
    },
    {
      price: 0.00033501,
      amt: "39334199999999992922112",
      vol: "13176957000000000000",
      amtTotal: "122234201904293285893934",
      volTotal: "40834606326129174254",
    },
    {
      price: 0.00033506,
      amt: "11052295534472154230337",
      vol: "3703108939445215718",
      amtTotal: "133286497438765440124271",
      volTotal: "44537715265574389972",
    },
    {
      price: 0.00033572,
      amt: "11030456322913363709718",
      vol: "3703093651997124565",
      amtTotal: "144316953761678803833989",
      volTotal: "48240808917571514537",
    },
    {
      price: 0.00033638,
      amt: "11008681778518069039476",
      vol: "3703078409816047858",
      amtTotal: "155325635540196872873465",
      volTotal: "51943887327387562395",
    },
    {
      price: 0.000337,
      amt: "7188173683760000139264",
      vol: "2422342649690282496",
      amtTotal: "162513809223956873012729",
      volTotal: "54366229977077844891",
    },
    {
      price: 0.00033706,
      amt: "11319571950108460741855",
      vol: "3815277012711042502",
      amtTotal: "173833381174065333754584",
      volTotal: "58181506989788887393",
    },
    {
      price: 0.00033773,
      amt: "10964670732513311387215",
      vol: "3703047602083844528",
      amtTotal: "184798051906578645141799",
      volTotal: "61884554591872731921",
    },
    {
      price: 0.00033848,
      amt: "10943090596879450870975",
      vol: "3703921209677097807",
      amtTotal: "195741142503458096012774",
      volTotal: "65588475801549829728",
    },
    {
      price: 0.00033893,
      amt: "31086310012520000126976",
      vol: "10535772189443278848",
      amtTotal: "226827452515978096139750",
      volTotal: "76124247990993108576",
    },
    {
      price: 0.00033907,
      amt: "10921574108084085072499",
      vol: "3703126650187824910",
      amtTotal: "237749026624062181212249",
      volTotal: "79827374641180933486",
    },
    {
      price: 0.00033934,
      amt: "22061773569720001232896",
      vol: "7486221625413088256",
      amtTotal: "259810800193782182445145",
      volTotal: "87313596266594021742",
    },
    {
      price: 0.00033975,
      amt: "11230093484570461106334",
      vol: "3815326678720011608",
      amtTotal: "271040893678352643551479",
      volTotal: "91128922945314033350",
    },
    {
      price: 0.00034042,
      amt: "10878083875111520592396",
      vol: "3703095772122414389",
      amtTotal: "281918977553464164143875",
      volTotal: "94832018717436447739",
    },
    {
      price: 0.00034061,
      amt: "19029641944770000453632",
      vol: "6481686342808109056",
      amtTotal: "300948619498234164597507",
      volTotal: "101313705060244556795",
    },
    {
      price: 0.00034109,
      amt: "10856758733704286197912",
      vol: "3703080631272015254",
      amtTotal: "311805378231938450795419",
      volTotal: "105016785691516572049",
    },
    {
      price: 0.00034176,
      amt: "10835496238854895014260",
      vol: "3703065534900672185",
      amtTotal: "322640874470793345809679",
      volTotal: "108719851226417244234",
    },
    {
      price: 0.00034244,
      amt: "11141671799245742102774",
      vol: "3815263899323431057",
      amtTotal: "333782546270039087912453",
      volTotal: "112535115125740675291",
    },
    {
      price: 0.00034312,
      amt: "10792518633700140402041",
      vol: "3703035020801012310",
      amtTotal: "344575064903739228314494",
      volTotal: "116238150146541687601",
    },
    {
      price: 0.00034379,
      amt: "10771444484888773263977",
      vol: "3703020058155356239",
      amtTotal: "355346509388628001578471",
      volTotal: "119941170204697043840",
    },
    {
      price: 0.00034447,
      amt: "11075875299655656611658",
      vol: "3815217183808722096",
      amtTotal: "366422384688283658190129",
      volTotal: "123756387388505765936",
    },
    {
      price: 0.00034515,
      amt: "10728847020295584791583",
      vol: "3702989813955495075",
      amtTotal: "377151231708579242981712",
      volTotal: "127459377202461261011",
    },
    {
      price: 0.00034582,
      amt: "10707958999548106661900",
      vol: "3702974983460764366",
      amtTotal: "387859190708127349643612",
      volTotal: "131162352185922025377",
    },
    {
      price: 0.00034649,
      amt: "10687131919892014508549",
      vol: "3702960196234208540",
      amtTotal: "398546322628019364152161",
      volTotal: "134865312382156233917",
    },
    {
      price: 0.00034718,
      amt: "10989265205593964126102",
      vol: "3815155690641938295",
      amtTotal: "409535587833613328278263",
      volTotal: "138680468072798172212",
    },
    {
      price: 0.00034809,
      amt: "10645033127428079147754",
      vol: "3705341637309061860",
      amtTotal: "420180620961041407426017",
      volTotal: "142385809710107234072",
    },
    {
      price: 0.00034854,
      amt: "10624389276271547157517",
      vol: "3703021892850000724",
      amtTotal: "430805010237312954583534",
      volTotal: "146088831602957234796",
    },
    {
      price: 0.00034922,
      amt: "10603805418694082174472",
      vol: "3703007072472544949",
      amtTotal: "441408815656007036758006",
      volTotal: "149791838675429779745",
    },
    {
      price: 0.00034991,
      amt: "10903667052066234563130",
      vol: "3815203952623454269",
      amtTotal: "452312482708073271321136",
      volTotal: "153607042628053234014",
    },
    {
      price: 0.00035059,
      amt: "10562197544947631702552",
      vol: "3702977114803447505",
      amtTotal: "462874680253020903023688",
      volTotal: "157310019742856681519",
    },
    {
      price: 0.00035127,
      amt: "10541794072549149477757",
      vol: "3702962424303320597",
      amtTotal: "473416474325570052501445",
      volTotal: "161012982167160002116",
    },
    {
      price: 0.00035196,
      amt: "10839964505283434387937",
      vol: "3815158086789770653",
      amtTotal: "484256438830853486889382",
      volTotal: "164828140253949772769",
    },
    {
      price: 0.00035265,
      amt: "10500550295026604907238",
      vol: "3702932728783504366",
      amtTotal: "494756989125880091796620",
      volTotal: "168531072982733277135",
    },
    {
      price: 0.00035333,
      amt: "10480325106225117837726",
      vol: "3702918166647567295",
      amtTotal: "505237314232105209634346",
      volTotal: "172233991149380844430",
    },
    {
      price: 0.00035401,
      amt: "10460158295034970667917",
      vol: "3702903646543510388",
      amtTotal: "515697472527140180302263",
      volTotal: "175936894795924354818",
    },
    {
      price: 0.0003547,
      amt: "10756101480844670483856",
      vol: "3815097705412174743",
      amtTotal: "526453574007984850786119",
      volTotal: "179751992501336529561",
    },
    {
      price: 0.000355,
      amt: "2879934000000000000000",
      vol: "1022376570000000000",
      amtTotal: "529333508007984850786119",
      volTotal: "180774369071336529561",
    },
    {
      price: 0.00035539,
      amt: "10419392212908119384882",
      vol: "3702874294964379056",
      amtTotal: "539752900220892970171001",
      volTotal: "184477243366300908617",
    },
    {
      price: 0.00035607,
      amt: "10399400937404414745812",
      vol: "3702859901246016389",
      amtTotal: "550152301158297384916813",
      volTotal: "188180103267546925006",
    },
    {
      price: 0.00035675,
      amt: "10379467141462596339294",
      vol: "3702845548912938279",
      amtTotal: "560531768299759981256107",
      volTotal: "191882948816459863285",
    },
    {
      price: 0.00035781,
      amt: "10673207910450037674513",
      vol: "3818930797471485007",
      amtTotal: "571204976210210018930620",
      volTotal: "195701879613931348292",
    },
    {
      price: 0.00035815,
      amt: "10339171406073422424770",
      vol: "3702919927697518809",
      amtTotal: "581544147616283441355390",
      volTotal: "199404799541628867101",
    },
    {
      price: 0.00035883,
      amt: "10319410450646547471681",
      vol: "3702905502200057190",
      amtTotal: "591863558066929988827071",
      volTotal: "203107705043828924291",
    },
    {
      price: 0.00035887,
      amt: "1253970999999999795200",
      vol: "449999996860000051",
      amtTotal: "593117529066929988622271",
      volTotal: "203557705040688924342",
    },
    {
      price: 0.00035952,
      amt: "10299706093934767574874",
      vol: "3702891118019657590",
      amtTotal: "603417235160864756197145",
      volTotal: "207260596158708581932",
    },
    {
      price: 0.00036,
      amt: "491031000000000000000",
      vol: "176771040000000000",
      amtTotal: "603908266160864756197145",
      volTotal: "207437367198708581932",
    },
    {
      price: 0.00036022,
      amt: "10591268908994289896668",
      vol: "3815084938649532411",
      amtTotal: "614499535069859046093813",
      volTotal: "211252452137358114343",
    },
  ],
  asks_prices: [
    0.00033331, 0.0003336, 0.00033371, 0.00033439, 0.00033501, 0.00033506,
    0.00033572, 0.00033638, 0.000337, 0.00033706, 0.00033773, 0.00033848,
    0.00033893, 0.00033907, 0.00033934, 0.00033975, 0.00034042, 0.00034061,
    0.00034109, 0.00034176, 0.00034244, 0.00034312, 0.00034379, 0.00034447,
    0.00034515, 0.00034582, 0.00034649, 0.00034718, 0.00034809, 0.00034854,
    0.00034922, 0.00034991, 0.00035059, 0.00035127, 0.00035196, 0.00035265,
    0.00035333, 0.00035401, 0.0003547, 0.000355, 0.00035539, 0.00035607,
    0.00035675, 0.00035781, 0.00035815, 0.00035883, 0.00035887, 0.00035952,
    0.00036, 0.00036022,
  ],
  asks_amtTotals: [
    "26466599999999999737856",
    "60347400000000000786432",
    "71489877800817400774420",
    "82900001904293292971822",
    "122234201904293285893934",
    "133286497438765440124271",
    "144316953761678803833989",
    "155325635540196872873465",
    "162513809223956873012729",
    "173833381174065333754584",
    "184798051906578645141799",
    "195741142503458096012774",
    "226827452515978096139750",
    "237749026624062181212249",
    "259810800193782182445145",
    "271040893678352643551479",
    "281918977553464164143875",
    "300948619498234164597507",
    "311805378231938450795419",
    "322640874470793345809679",
    "333782546270039087912453",
    "344575064903739228314494",
    "355346509388628001578471",
    "366422384688283658190129",
    "377151231708579242981712",
    "387859190708127349643612",
    "398546322628019364152161",
    "409535587833613328278263",
    "420180620961041407426017",
    "430805010237312954583534",
    "441408815656007036758006",
    "452312482708073271321136",
    "462874680253020903023688",
    "473416474325570052501445",
    "484256438830853486889382",
    "494756989125880091796620",
    "505237314232105209634346",
    "515697472527140180302263",
    "526453574007984850786119",
    "529333508007984850786119",
    "539752900220892970171001",
    "550152301158297384916813",
    "560531768299759981256107",
    "571204976210210018930620",
    "581544147616283441355390",
    "591863558066929988827071",
    "593117529066929988622271",
    "603417235160864756197145",
    "603908266160864756197145",
    "614499535069859046093813",
  ],
  asks_volTotals: [
    "8821317780000000000",
    "20123952660000000000",
    "23842308926910774549",
    "27657649326129174254",
    "40834606326129174254",
    "44537715265574389972",
    "48240808917571514537",
    "51943887327387562395",
    "54366229977077844891",
    "58181506989788887393",
    "61884554591872731921",
    "65588475801549829728",
    "76124247990993108576",
    "79827374641180933486",
    "87313596266594021742",
    "91128922945314033350",
    "94832018717436447739",
    "101313705060244556795",
    "105016785691516572049",
    "108719851226417244234",
    "112535115125740675291",
    "116238150146541687601",
    "119941170204697043840",
    "123756387388505765936",
    "127459377202461261011",
    "131162352185922025377",
    "134865312382156233917",
    "138680468072798172212",
    "142385809710107234072",
    "146088831602957234796",
    "149791838675429779745",
    "153607042628053234014",
    "157310019742856681519",
    "161012982167160002116",
    "164828140253949772769",
    "168531072982733277135",
    "172233991149380844430",
    "175936894795924354818",
    "179751992501336529561",
    "180774369071336529561",
    "184477243366300908617",
    "188180103267546925006",
    "191882948816459863285",
    "195701879613931348292",
    "199404799541628867101",
    "203107705043828924291",
    "203557705040688924342",
    "207260596158708581932",
    "207437367198708581932",
    "211252452137358114343",
  ],
  asks_amtTotal: "614499535069859046093813",
  asks_volTotal: "211252452137358114343",
};
//v3/amm/balance?poolAddress=0xfEB069407df0e1e4B365C10992F1bc16c078E34b
export const ammPoolSnapshot: sdk.AmmPoolSnapshot = {
  poolName: "AMM-LRC-ETH",
  poolAddress: "0x18920d6e6fb7ebe057a4dd9260d6d95845c95036",
  pooled: [
    {
      tokenId: 1,
      volume: "11198097977488137000000000",
    },
    {
      tokenId: 0,
      volume: "3725368050950874300000",
    },
  ],
  lp: {
    tokenId: 83,
    volume: "34138981282200",
  },
  risky: false,
};
//v3/amm/balance?poolAddress=0xfEB069407df0e1e4B365C10992F1bc16c078E34b
export const ammPool = {
  poolName: "AMM-LRC-ETH",
  poolAddress: "0x18920d6e6fb7ebe057a4dd9260d6d95845c95036",
  pooled: [
    { tokenId: 1, volume: "11215027899488137000000000" },
    { tokenId: 0, volume: "3720052711450874300000" },
  ],
  lp: { tokenId: 83, volume: "34141365482200" },
  risky: false,
};

//v3/mix/ticker?market=LRC-ETH
export const ticker = {
  tickers: [
    [
      "COMBINE-LRC-ETH",
      "1655625077879",
      "2429371927000000000000000",
      "814655525450000000000",
      "0.00035052",
      "0.00035222",
      "0.00032201",
      "0.00033367",
      "772",
      "",
      "",
      "",
      "",
    ],
  ],
};

//v3/user/orderUserRateAmount?accountId=10427&market=LRC-ETH
export const userAmount = {
  "LRC-ETH": {
    LRC: {
      tokenSymbol: "LRC",
      baseOrderInfo: {
        minAmount: "266240681576144834931",
        makerRate: 0,
        takerRate: 10,
      },
      userOrderInfo: {
        minAmount: "266240681576144834931",
        makerRate: 0,
        takerRate: 10,
      },
      tradeCost: "231046501539337141",
    },
    ETH: {
      tokenSymbol: "ETH",
      baseOrderInfo: {
        minAmount: "86598080986525339",
        makerRate: 0,
        takerRate: 10,
      },
      userOrderInfo: {
        minAmount: "86598080986525339",
        makerRate: 0,
        takerRate: 10,
      },
      tradeCost: "75150737796750",
    },
  },
  "AMM-LRC-ETH": {
    LRC: {
      tokenSymbol: "LRC",
      baseOrderInfo: {
        minAmount: "266240681576144834931",
        makerRate: 0,
        takerRate: 10,
      },
      userOrderInfo: {
        minAmount: "266240681576144834931",
        makerRate: 0,
        takerRate: 10,
      },
      tradeCost: "231046501539337141",
    },
    ETH: {
      tokenSymbol: "ETH",
      baseOrderInfo: {
        minAmount: "86598080986525339",
        makerRate: 0,
        takerRate: 10,
      },
      userOrderInfo: {
        minAmount: "86598080986525339",
        makerRate: 0,
        takerRate: 10,
      },
      tradeCost: "75150737796750",
    },
  },
};
export const TokenMapMockSwap = {
  ETH: {
    type: "ETH",
    tokenId: 0,
    symbol: "ETH",
    name: "Ethereum",
    address: "0x0000000000000000000000000000000000000000",
    decimals: 18,
    precision: 7,
    precisionForOrder: 3,
    orderAmounts: {
      minimum: "1700000000000000",
      maximum: "1000000000000000000000",
      dust: "200000000000000",
    },
    luckyTokenAmounts: {
      minimum: "50000000000000",
      maximum: "1000000000000000000000",
      dust: "50000000000000",
    },
    fastWithdrawLimit: "100000000000000000000",
    gasAmounts: {
      distribution: "85000",
      deposit: "110000",
    },
    enabled: true,
    isLpToken: false,
    tradePairs: ["LRC"],
  },
  LRC: {
    type: "ERC20",
    tokenId: 1,
    symbol: "LRC",
    name: "Loopring",
    address: "0xbbbbca6a901c926f240b89eacb641d8aec7aeafd",
    decimals: 18,
    precision: 3,
    precisionForOrder: 3,
    orderAmounts: {
      minimum: "5000000000000000000",
      maximum: "5000000000000000000000000",
      dust: "5000000000000000000",
    },
    luckyTokenAmounts: {
      minimum: "50000000000000000",
      maximum: "5000000000000000000000000",
      dust: "50000000000000000",
    },
    fastWithdrawLimit: "750000000000000000000000",
    gasAmounts: {
      distribution: "101827",
      deposit: "150000",
    },
    enabled: true,
    isLpToken: false,
    tradePairs: ["ETH"],
  },
};

export const MAPFEEBIPS = 63;


```

