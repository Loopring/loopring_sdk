import {
  ChainId,
  GetTokenPricesRequest,
  GetUserAssetsRequest,
  Currency,
} from "../../defs";

import { dumpError400 } from "../../utils";

import {
  DEFAULT_TIMEOUT,
  LOOPRING_EXPORTED_ACCOUNT,
  LoopringAPI,
} from "../data";

describe("WalletApi", function () {
  beforeEach(async () => {
    LoopringAPI.InitApi(ChainId.GOERLI);
  });

  it(
    "getUserAssets",
    async () => {
      try {
        const request: GetUserAssetsRequest = {
          wallet: LOOPRING_EXPORTED_ACCOUNT.addressContractWallet,
          offset: 10,
          limit: 10,
        };

        const response = await LoopringAPI.walletAPI.getUserAssets(request);
        console.log(response);
      } catch (err) {
        dumpError400(err);
      }
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getTokenPrices",
    async () => {
      try {
        const request: GetTokenPricesRequest = {
          token: "0xdac17f958d2ee523a2206206994597c13d831ec7",
        };

        const response = await LoopringAPI.walletAPI.getTokenPrices(request);
        console.log(response);
        console.log(response.raw_data.data);
      } catch (err) {
        dumpError400(err);
      }
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getLatestTokenPrices1",
    async () => {
      try {
        const response = await LoopringAPI.walletAPI.getLatestTokenPrices();
        console.log(response);
      } catch (err) {
        dumpError400(err);
      }
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getUniPrice",
    async () => {
      const tokens = await LoopringAPI.exchangeAPI.getTokens();
      const response = await LoopringAPI.walletAPI.getLatestTokenPrices();

      if (tokens && response) {
        const addr = tokens.tokenSymbolMap["UNI"].address;
        console.log(response.tokenPrices[addr]);
      }

      const response2 = await LoopringAPI.walletAPI.getLatestTokenPrices({
        currency: Currency.cny,
      });

      if (tokens && response2) {
        const addr = tokens.tokenSymbolMap["UNI"].address;
        console.log(response2.tokenPrices[addr]);
      }
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getLatestTokenPrices_cny",
    async () => {
      try {
        const response = await LoopringAPI.walletAPI.getLatestTokenPrices({
          currency: Currency.cny,
        });
        console.log(response);
      } catch (err) {
        dumpError400(err);
      }
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getLatestTokenPrices_Identify_Token",
    async () => {
      try {
        const response = await LoopringAPI.walletAPI.getLatestTokenPrices({
          tokens:
            "0x7b854d37e502771b1647f5917efcf065ce1c0677,0x6ff8a397f7a04b41c58c00ab8e70aca7cbc0adba",
        });
        console.log(response);
      } catch (err) {
        dumpError400(err);
      }
    },
    DEFAULT_TIMEOUT
  );
  it(
    "getWalletType",
    async () => {
      try {
        const response = await LoopringAPI.walletAPI.getWalletType({
          wallet: "0x3f87bc7b8f06322f19dfdc51adf2acc73a92200b",
        });
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    },
    DEFAULT_TIMEOUT
  );
});
