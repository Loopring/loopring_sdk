import {
  TOKEN_INFO,
  LOOPRING_EXPORTED_ACCOUNT,
  LoopringAPI,
  DEFAULT_TIMEOUT,
} from "../../MockData";
import * as sdk from "../../../index";

describe("WalletApi", function () {
  it(
    "getUserAssets",
    async () => {
      const request: sdk.GetUserAssetsRequest = {
        wallet: LOOPRING_EXPORTED_ACCOUNT.addressContractWallet,
        offset: 10,
        limit: 10,
      };

      const response = await LoopringAPI.walletAPI.getUserAssets(request);
      console.log(response);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getTokenPrices",
    async () => {
      const response = await LoopringAPI.walletAPI.getTokenPrices({
        token: TOKEN_INFO.tokenMap.LRC.address,
      });
      console.log(response);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getLatestTokenPrices",
    async () => {
      const response = await LoopringAPI.walletAPI.getLatestTokenPrices();
      console.log(response);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getLatestTokenPrices_cny",
    async () => {
      const response = await LoopringAPI.walletAPI.getLatestTokenPrices({
        currency: sdk.Currency.cny,
      });
      console.log(response);
    },
    DEFAULT_TIMEOUT
  );
});
