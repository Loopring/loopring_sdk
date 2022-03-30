import { TradingInterval, VipCatergory } from "../../defs/loopring_enums";

import { ChainId } from "../../defs/web3_defs";
import { ExchangeAPI } from "../../api";

import {
  DEFAULT_TIMEOUT,
  LOOPRING_EXPORTED_ACCOUNT,
  LoopringAPI,
} from "../data";

import { hasMarket, getExistedMarket } from "../../utils/symbol_tools";
import {
  GetAccountServicesRequest,
  GetCandlestickRequest,
  GetDepthRequest,
  GetMarketTradesRequest,
  GetTickerRequest,
  GetWithdrawalAgentsRequest,
} from "../../defs";
import { dumpError400 } from "../../utils";

describe("ExchangeAPI test", function () {
  beforeEach(() => {
    LoopringAPI.InitApi(ChainId.GOERLI);
  });
  // it("getCode", async () => {
  //   const response = await LoopringAPI.delegate.getCode(
  //     LOOPRING_EXPORTED_ACCOUNT.address
  //   );
  //   console.log(response);
  // });
  it(
    "getProtocolPortrait",
    async () => {
      const response = await LoopringAPI.exchangeAPI.getProtocolPortrait();
      console.log(response);
    },
    DEFAULT_TIMEOUT
  );
  it(
    "getExchangeFeeInfo",
    async () => {
      const response = await LoopringAPI.exchangeAPI.getExchangeFeeInfo<any>();
      console.log(response);
      console.log(
        response.raw_data[VipCatergory.ORDERBOOK_TRADING_FEES_STABLECOIN]
      );
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getRecommendedMarkets",
    async () => {
      const response = await LoopringAPI.exchangeAPI.getRecommendedMarkets();
      console.log(response);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getGasPrice",
    async () => {
      const response = await LoopringAPI.exchangeAPI.getGasPrice();
      console.log(response);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getGasPriceRange",
    async () => {
      const response = await LoopringAPI.exchangeAPI.getGasPriceRange();
      console.log(response);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getMarketTrades_err",
    async () => {
      const req: GetMarketTradesRequest = {
        market: "LRC-ETH_Not_Existed",
      };
      const response = await LoopringAPI.exchangeAPI.getMarketTrades<any>(req);
      console.log(response);
      console.log(response.raw_data.trades);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getMarketTrades_have",
    async () => {
      const req: GetMarketTradesRequest = {
        market: "ETH-USDT",
      };
      const response = await LoopringAPI.exchangeAPI.getMarketTrades<any>(req);
      console.log(response.raw_data.trades);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getRelayerCurrentTime",
    async () => {
      const response = await LoopringAPI.exchangeAPI.getRelayerCurrentTime();
      console.log(response);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getFiatPriceUSD",
    async () => {
      const response = await LoopringAPI.exchangeAPI.getFiatPrice({
        legal: "USD",
      });
      console.log(response);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getFiatPriceCNY",
    async () => {
      const response = await LoopringAPI.exchangeAPI.getFiatPrice({
        legal: "CNY",
      });
      console.log(response);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getMarkets",
    async () => {
      const response = await LoopringAPI.exchangeAPI.getMarkets();
      console.log(response);
      console.log(response.pairs.LRC.tokenList);

      console.log(
        "hasMarket LRC-ETH:",
        hasMarket(response.marketArr, "LRC-ETH")
      );
      console.log(
        "market 1:",
        getExistedMarket(response.marketArr, "LRC", "ETH")
      );
      console.log(
        "market 2:",
        getExistedMarket(response.marketArr, "ETH", "LRC")
      );
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getMixMarkets",
    async () => {
      const response = await LoopringAPI.exchangeAPI.getMixMarkets();
      console.log(response);
      console.log(response.pairs.LRC.tokenList);

      console.log(
        "hasMarket LRC-ETH:",
        hasMarket(response.marketArr, "LRC-ETH")
      );
      console.log(
        "market 1:",
        getExistedMarket(response.marketArr, "LRC", "ETH")
      );
      console.log(
        "market 2:",
        getExistedMarket(response.marketArr, "ETH", "LRC")
      );
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getWithdrawalAgents",
    async () => {
      const req: GetWithdrawalAgentsRequest = {
        tokenId: 1,
        amount: "10000000000",
      };

      const response = await LoopringAPI.exchangeAPI.getWithdrawalAgents(req);
      console.log(response);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getTokens",
    async () => {
      const response = await LoopringAPI.exchangeAPI.getTokens<any>();
      console.log(response);
      console.log(response.raw_data[0]);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getDepth",
    async () => {
      const request: GetDepthRequest = {
        market: "LRC-ETH",
      };

      const response = await LoopringAPI.exchangeAPI.getDepth(request);
      console.log(response);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getMixDepth",
    async () => {
      const request: GetDepthRequest = {
        market: "LRC-ETH",
      };

      const response = await LoopringAPI.exchangeAPI.getMixDepth(request);
      console.log(response);
      console.log(response.depth.bids);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getExchangeInfo",
    async () => {
      const response = await LoopringAPI.exchangeAPI.getExchangeInfo();
      console.log(response);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getMixTicker",
    async () => {
      const request: GetTickerRequest = {
        market: ["LRC-ETH", "ETH-USDC", "DAI-USDT"].join(","),
      };
      const response = await LoopringAPI.exchangeAPI.getMixTicker(request);
      console.log(response.tickMap["DAI-USDT"]);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getTicker",
    async () => {
      const request: GetTickerRequest = {
        market: "LRC-ETH",
      };
      const response = await LoopringAPI.exchangeAPI.getTicker(request);
      console.log(response);
    },
    DEFAULT_TIMEOUT
  );
  it(
    "getLatestTokenPrices1",
    async () => {
      try {
        const response = await LoopringAPI.walletAPI.getLatestTokenPrices();
        console.log(response);
      } catch (reason) {
        dumpError400(reason);
      }
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getAllMixTickers0",
    async () => {
      const response: any = await LoopringAPI.exchangeAPI.getAllMixTickers();
      console.log(response?.tickMap);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getAllMixTickers1",
    async () => {
      const response: any = await LoopringAPI.exchangeAPI.getAllMixTickers(
        "AMM-LRC-ETH"
      );
      console.log(response.tickMap);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getAllMixTickers2",
    async () => {
      const response: any = await LoopringAPI.exchangeAPI.getAllMixTickers(
        "AMM-LRC-ETH,LRC-ETH"
      );
      console.log(response.tickMap);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getAllTickers",
    async () => {
      const response = await LoopringAPI.exchangeAPI.getAllTickers();
      console.log(response);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getMixCandlestickAMM",
    async () => {
      const request: GetCandlestickRequest = {
        market: "AMM-LRC-ETH",
        interval: TradingInterval.min15,
        limit: 96,
      };
      const response = await LoopringAPI.exchangeAPI.getMixCandlestick(request);
      console.log(response);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getMixCandlestickNORMAL",
    async () => {
      const request: GetCandlestickRequest = {
        market: "LRC-ETH",
        interval: TradingInterval.min15,
        limit: 96,
      };
      const response = await LoopringAPI.exchangeAPI.getMixCandlestick<any>(
        request
      );
      console.log(response);
      console.log(response.raw_data.candlesticks.length);
      console.log(response.candlesticks.length);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getCandlestick",
    async () => {
      const request: GetCandlestickRequest = {
        market: "LRC-ETH",
        interval: TradingInterval.min15,
        limit: 96,
      };
      const response = await LoopringAPI.exchangeAPI.getCandlestick(request);
      console.log(response);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getAccountServices",
    async () => {
      const response = await LoopringAPI.exchangeAPI.getAccountServices({});
      console.log(response);
    },
    DEFAULT_TIMEOUT
  );
});
