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
        baseSymbol: "LRC",
      });
      expect(response.infos).toHaveLength
      expect(response.totalNum).toBeGreaterThan(0)
      console.log(response);
    },
    DEFAULT_TIMEOUT
  );
  it(
    "get dual signature",
    async () => {
      const response = await LoopringAPI.mainnetAPI.defiDualSignature({
        user:"0xa09a702f08a218c038a7e5bd1e6be483499a9828",
        optionHash:"0x11f445839312a45c980ff35c0c2ea1e60e93bd4c9a31c9993d5bacf78bf7cd80",
        profit:"0.00045",
        investAmount:"500000000"
      });
      expect(response.ecdsaSig ? true : false).toBe(true)
      expect(response.optionHash ? true : false).toBe(true)
      expect(response.profitRatio ? true : false).toBe(true)
      expect(response.deadline ? true : false).toBe(true)
      expect(response.investAmount ? true : false).toBe(true)
      expect(response.salt ? true : false).toBe(true)
      console.log(response);
    },
    DEFAULT_TIMEOUT
  );

  
});
