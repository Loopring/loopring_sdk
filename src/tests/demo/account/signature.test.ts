import {
  DEFAULT_TIMEOUT,
  LOOPRING_EXPORTED_ACCOUNT,
  LoopringAPI,
  testTypedData,
  web3,
  signatureKeyPairMock,
} from "../../MockData";
import * as sdk from "../../../index";

describe("signature", function () {
  it(
    "generateKeyPair",
    async () => {
      const { accInfo } = await LoopringAPI.exchangeAPI.getAccount({
        owner: LOOPRING_EXPORTED_ACCOUNT.address,
      });
      const result = await signatureKeyPairMock(accInfo);
      console.log(result.sk);
    },
    DEFAULT_TIMEOUT
  );
  /**
   * test case is not allow brock by Mock provider
   */
  // it(
  //   "getEcDSASig:eth_signTypedData_v4",
  //   async () => {
  //     // test case is not allow brock by Mock provider
  //     const result = await sdk.getEcDSASig(
  //       web3,
  //       testTypedData,
  //       LOOPRING_EXPORTED_ACCOUNT.address,
  //       sdk.GetEcDSASigType.HasDataStruct,
  //       sdk.ChainId.GOERLI,
  //       LOOPRING_EXPORTED_ACCOUNT.accountId,
  //       "",
  //       sdk.ConnectorNames.Unknown
  //     );
  //     console.log(
  //       "getEcDSASig:eth_signTypedData_v4",
  //       result,
  //       "ecdsaSig+sdk.SigSuffix.Suffix02",
  //       result.ecdsaSig + sdk.SigSuffix.Suffix02
  //     );
  //   },
  //   DEFAULT_TIMEOUT
  // );

  it("getEcDSASig:WithoutDataStruct(personalSign)", async () => {
    const result = await sdk.getEcDSASig(
      web3,
      testTypedData,
      LOOPRING_EXPORTED_ACCOUNT.address,
      sdk.GetEcDSASigType.WithoutDataStruct,
      sdk.ChainId.GOERLI,
      LOOPRING_EXPORTED_ACCOUNT.accountId,
      "",
      sdk.ConnectorNames.Unknown
    );
    console.log(
      "getEcDSASig:WithoutDataStruct(personalSign)",
      result,
      "ecdsaSig+sdk.SigSuffix.Suffix03",
      result.ecdsaSig + sdk.SigSuffix.Suffix03
    );
  });
  /**
   * test case is not allow brock by Mock provider
   */
  // it("personalSign Contract", async () => {
  //   await sdk.getEcDSASig(
  //     web3,
  //     testTypedData,
  //     LOOPRING_EXPORTED_ACCOUNT.address,
  //     sdk.GetEcDSASigType.Contract,
  //     sdk.ChainId.GOERLI,
  //     LOOPRING_EXPORTED_ACCOUNT.accountId,
  //     "",
  //     sdk.ConnectorNames.Unknown
  //   );
  // });
});

export default {};
