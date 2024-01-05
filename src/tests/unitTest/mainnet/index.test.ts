import {
  DEFAULT_TIMEOUT,
  LOOPRING_EXPORTED_ACCOUNT,
  LoopringAPI,
  web3,
  signatureKeyPairMock,
  TOKEN_INFO,
} from "../../MockData";
import * as sdk from "../../../index";


describe("mainnet api", function () {
  it(
    "get dual product list",
    async () => {
      const response = await LoopringAPI.mainnetAPI.getDefiDualProductlist({
        // owner: LOOPRING_EXPORTED_ACCOUNT.address,
      });
      console.log(response);
    },
    DEFAULT_TIMEOUT
  );

  
});
