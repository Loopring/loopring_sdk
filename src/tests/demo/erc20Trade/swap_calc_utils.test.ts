import {
  DEFAULT_TIMEOUT,
  LOOPRING_EXPORTED_ACCOUNT,
  LoopringAPI,
  web3,
  TOKEN_INFO,
  signatureKeyPairMock,
} from "../../MockData";
import * as sdk from "../../../index";

const init = async (
  chainId: sdk.ChainId = sdk.ChainId.GOERLI,
  sell: string,
  buy: string
) => {
  // exchangeApi = new ExchangeAPI({ chainId });
  // ammApi = new AmmpoolAPI({ chainId });

  const tokenMap = (await LoopringAPI.exchangeAPI.getTokens()).tokenSymbolMap;

  const marketAll = await LoopringAPI.exchangeAPI.getMixMarkets();

  const marketMap = marketAll.markets;

  const marketArr = marketAll.marketArr as string[];

  const { amm, market: marketTmp } = sdk.getExistedMarket(marketArr, sell, buy);

  const market = amm as string;

  const depth = (
    await LoopringAPI.exchangeAPI.getMixDepth({ market: marketTmp })
  ).depth;

  // console.log(market, marketTmp, 'depth2:', depth2)

  const ammpools = (await LoopringAPI.ammpoolAPI.getAmmPoolConf()).ammpools;

  const ammPoolInfo = ammpools[market];

  if (ammPoolInfo) {
    const ammPoolSnapshot = (
      await LoopringAPI.ammpoolAPI.getAmmPoolSnapshot({
        poolAddress: ammPoolInfo.address,
      })
    ).ammPoolSnapshot as sdk.AmmPoolSnapshot;
  }
};

const initAll = async (
  _input: string,
  _base: string,
  _quote: string,
  _isAtoB = true,
  chainId = sdk.ChainId.MAINNET
) => {
  // input = _input;
  // isAtoB = _isAtoB;

  await init(chainId, _base, _quote);
  // return
};
submitOrder;
cancelOrder;
getOrderDetails;
cancelMultiOrdersByHash;
// cancelMultiOrdersByCreditOrderId

getUserRegTxs;
getUserPwdResetTxs;
getUserBalances;
getUserDepositHistory;
getUserTransferList;
getUserOnchainWithdrawalHistory;

getNFTOffchainFeeAmt;
getOffchainFeeAmt;

// getUserFeeRate
// getUserOrderFeeRate
// getMinimumTokenAmt

// submitOffchainWithdraw
// submitInternalTransfer
// submitDeployNFT
// submitNFTInTransfer
// submitNFTWithdraw
// submitNFTMint
// submitNFTValidateOrder
// submitNFTTrade
// getUserNFTDepositHistory
// getUserNFTWithdrawalHistory
// getUserNFTTransferHistory
// getUserNFTMintHistory

// updateAccount
// SetReferrer
// getUserNFTBalances
// getUserVIPAssets
// getUserVIPInfo

//
// const checkResult = (
//   takerRate = "10",
//   slipBips: string = _slipBips,
//   feeBips = "20"
// ) => {
//   if (input !== "0" && input !== "0.") {
//     const { amm, market } = getExistedMarket(marketArr, sell, buy);
//
//     const hasMarket = !!marketMap[market as string];
//
//     console.log("marketMap hasMarket:", hasMarket);
//
//     const marketItem = marketMap[market as string];
//
//     console.log("marketMap:", marketItem);
//
//     const hasMarket2 = !!ammpools[amm as string];
//
//     console.log("ammpools hasMarket2:", hasMarket2);
//
//     console.log("ammPoolSnapshot:", ammPoolSnapshot);
//
//     console.log(
//       input,
//       "*",
//       sell,
//       buy,
//       isAtoB,
//       depth.mid_price,
//       ammPoolSnapshot?.pooled,
//       takerRate,
//       slipBips
//     );
//   }
//
//   const output: any = getOutputAmount({
//     input,
//     sell,
//     buy,
//     isAtoB,
//     marketArr,
//     tokenMap,
//     marketMap,
//     depth,
//     feeBips,
//     ammPoolSnapshot,
//     takerRate,
//     slipBips,
//   });
//
//   console.log("sell:", sell, " buy:", buy, " output:", output);
// };

describe("swap_calc_utils", function () {
  // beforeEach(async () => {
  // }, DEFAULT_TIMEOUT);

  it(
    "USDT_DAI_a2b_100",
    async () => {
      try {
        await initAll("100", "USDT", "DAI", true, ChainId.GOERLI);
        console.log("ammPoolSnapshot:", ammPoolSnapshot);
        console.log("depth:", depth);
        checkResult("4", _slipBips, "0");
      } catch (err) {
        dumpError400(err as any);
      }
    },
    DEFAULT_TIMEOUT
  );

  it(
    "DAI_USDT_a2b_100",
    async () => {
      try {
        await initAll("100", "DAI", "USDT", true, ChainId.MAINNET);

        console.log("ammPoolSnapshot:", ammPoolSnapshot);
        console.log("depth:", depth);

        checkResult("4", _slipBips, "0");
      } catch (err) {
        dumpError400(err as any);
      }
    },
    DEFAULT_TIMEOUT
  );

  it(
    "LRC_ETH_a2b_10000",
    async () => {
      try {
        await initAll("1000", "LRC", "ETH", true, ChainId.MAINNET);

        console.log("ammPoolSnapshot:", ammPoolSnapshot);
        console.log("depth:", depth);

        checkResult("10");
      } catch (err) {
        dumpError400(err as any);
      }
    },
    DEFAULT_TIMEOUT
  );

  it(
    "ETH_USDT_a2b_1",
    async () => {
      try {
        await initAll("1", "ETH", "USDT", true);

        checkResult();
      } catch (err) {
        dumpError400(err as any);
      }
    },
    DEFAULT_TIMEOUT
  );

  it(
    "DAI_USDT_a2b_1",
    async () => {
      try {
        await initAll("100", "DAI", "USDT", true);

        checkResult();
      } catch (err) {
        dumpError400(err as any);
      }
    },
    DEFAULT_TIMEOUT
  );

  it(
    "DAI_USDT_a2b_exceedDepth_2",
    async () => {
      try {
        await initAll("100000", "DAI", "USDT", true);

        checkResult();
      } catch (err) {
        dumpError400(err as any);
      }
    },
    DEFAULT_TIMEOUT
  );

  it(
    "DAI_USDT_a2b_exceedDepth_3",
    async () => {
      try {
        await initAll("1000000", "DAI", "USDT", true);

        checkResult();
      } catch (err) {
        dumpError400(err as any);
      }
    },
    DEFAULT_TIMEOUT
  );

  it(
    "DAI_USDT_b2a_1",
    async () => {
      try {
        await initAll("50", "DAI", "USDT", false);

        checkResult();
      } catch (err) {
        dumpError400(err as any);
      }
    },
    DEFAULT_TIMEOUT
  );

  it(
    "LRC_ETH_a2b_exceedDepth",
    async () => {
      try {
        await initAll("1000000", "LRC", "ETH");

        checkResult();
      } catch (err) {
        dumpError400(err as any);
      }
    },
    DEFAULT_TIMEOUT
  );

  it(
    "LRC_ETH_test1",
    async () => {
      try {
        await initAll("1000", "LRC", "ETH", true, ChainId.MAINNET);

        checkResult();
      } catch (err) {
        dumpError400(err as any);
      }
    },
    DEFAULT_TIMEOUT
  );

  it(
    "LRC_ETH_test2",
    async () => {
      try {
        await initAll("100", "LRC", "ETH", true, ChainId.MAINNET);

        checkResult();
      } catch (err) {
        dumpError400(err as any);
      }
    },
    DEFAULT_TIMEOUT
  );

  it(
    "LRC_ETH_b2a_exceedDepth",
    async () => {
      try {
        await initAll("100", "LRC", "ETH", false);

        checkResult();
      } catch (err) {
        dumpError400(err as any);
      }
    },
    DEFAULT_TIMEOUT
  );

  it(
    "ETH_LRC_a2b_exceedDepth",
    async () => {
      try {
        await initAll("1000", "ETH", "LRC");

        checkResult();
      } catch (err) {
        dumpError400(err as any);
      }
    },
    DEFAULT_TIMEOUT
  );

  it(
    "ETH_LRC_b2a_exceedDepth",
    async () => {
      try {
        await initAll("5000000", "ETH", "LRC", false);

        checkResult();
      } catch (err) {
        dumpError400(err as any);
      }
    },
    DEFAULT_TIMEOUT
  );

  // --------------------------------------------------

  it(
    "LRC_ETH_a2b_not_ExceedDepth200",
    async () => {
      try {
        await initAll("200", "LRC", "ETH");

        checkResult();
      } catch (err) {
        dumpError400(err as any);
      }
    },
    DEFAULT_TIMEOUT
  );

  it(
    "LRC_ETH_a2b_not_ExceedDepth15000",
    async () => {
      try {
        await initAll("15000", "LRC", "ETH");

        checkResult();
      } catch (err) {
        dumpError400(err as any);
      }
    },
    DEFAULT_TIMEOUT
  );

  it(
    "LRC_ETH_a2b_not_ExceedDepth3",
    async () => {
      try {
        await initAll("3", "LRC", "ETH");

        checkResult();
      } catch (err) {
        dumpError400(err as any);
      }
    },
    DEFAULT_TIMEOUT
  );

  it(
    "ETH_LRC_a2b_not_ExceedDepth0_1",
    async () => {
      try {
        await initAll("0.1", "ETH", "LRC");

        checkResult();
      } catch (err) {
        dumpError400(err as any);
      }
    },
    DEFAULT_TIMEOUT
  );

  it(
    "ETH_LRC_a2b_not_ExceedDepth5",
    async () => {
      try {
        await initAll("5", "ETH", "LRC");

        checkResult();
      } catch (err) {
        dumpError400(err as any);
      }
    },
    DEFAULT_TIMEOUT
  );

  it(
    "LRC_ETH_b2a_not_ExceedDepth1",
    async () => {
      try {
        await initAll("1", "LRC", "ETH", false);

        checkResult();
      } catch (err) {
        dumpError400(err as any);
      }
    },
    DEFAULT_TIMEOUT
  );

  it(
    "ETH_LRC_b2a_not_ExceedDepth_10000",
    async () => {
      try {
        await initAll("10000", "ETH", "LRC", false);

        checkResult();
      } catch (err) {
        dumpError400(err as any);
      }
    },
    DEFAULT_TIMEOUT
  );

  //-------

  it(
    "ETH_USDT_a2b_test",
    async () => {
      try {
        await initAll("1", "ETH", "USDT", true, ChainId.GOERLI);

        checkResult("0", "50", "20");
      } catch (err) {
        dumpError400(err as any);
      }
    },
    DEFAULT_TIMEOUT
  );

  it(
    "ETH_USDT_b2a_test",
    async () => {
      try {
        await initAll("2800", "ETH", "USDT", false, ChainId.GOERLI);

        checkResult("10", "50", "20");
      } catch (err) {
        dumpError400(err as any);
      }
    },
    DEFAULT_TIMEOUT
  );

  it(
    "USDT_ETH_a2b_test",
    async () => {
      try {
        await initAll("2866", "USDT", "ETH", true, ChainId.GOERLI);

        checkResult("10", "50", "20");
      } catch (err) {
        dumpError400(err as any);
      }
    },
    DEFAULT_TIMEOUT
  );

  it(
    "USDT_ETH_b2a_test",
    async () => {
      try {
        await initAll("1", "USDT", "ETH", false, ChainId.GOERLI);

        checkResult("10", "50", "20");
      } catch (err) {
        dumpError400(err as any);
      }
    },
    DEFAULT_TIMEOUT
  );

  //-------

  it(
    "ETH_USDT_a2b_main",
    async () => {
      try {
        await initAll("1", "ETH", "USDT", true, ChainId.MAINNET);

        checkResult("10", "50", "20");
      } catch (err) {
        dumpError400(err as any);
      }
    },
    DEFAULT_TIMEOUT
  );

  it(
    "ETH_USDT_b2a_main",
    async () => {
      try {
        await initAll("3500", "ETH", "USDT", false, ChainId.MAINNET);

        checkResult("10", "50", "20");
      } catch (err) {
        dumpError400(err as any);
      }
    },
    DEFAULT_TIMEOUT
  );

  it(
    "USDT_ETH_a2b_main",
    async () => {
      try {
        await initAll("3500", "USDT", "ETH", true, ChainId.MAINNET);

        checkResult("10", "50", "20");
      } catch (err) {
        dumpError400(err as any);
      }
    },
    DEFAULT_TIMEOUT
  );

  it(
    "USDT_ETH_b2a_main",
    async () => {
      try {
        await initAll("1", "USDT", "ETH", false, ChainId.MAINNET);

        checkResult("10", "50", "20");
      } catch (err) {
        dumpError400(err as any);
      }
    },
    DEFAULT_TIMEOUT
  );
});

export default {};
