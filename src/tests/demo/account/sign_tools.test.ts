import {
  DEFAULT_TIMEOUT,
  LOOPRING_EXPORTED_ACCOUNT,
  LoopringAPI,
  testTypedData,
  web3,
  signatureKeyPairMock,
} from "../../data";
import * as sdk from "../../../index";

describe("signature", function () {
  beforeEach(async () => {
    LoopringAPI.InitApi(sdk.ChainId.GOERLI);
    return;
  }, DEFAULT_TIMEOUT);
  it(
    "generateKeyPair",
    async () => {
      const { accInfo } = await LoopringAPI.exchangeAPI.getAccount({
        owner: LOOPRING_EXPORTED_ACCOUNT.address,
      });
      const result = await signatureKeyPairMock(accInfo);
      expect(
        "0x2f20e6b4534ef967de2e111e63bf7405a4acb11295f42a35230252a2c1ea7fd"
      ).toBe(result.sk);
    },
    DEFAULT_TIMEOUT
  );
  it(
    "getEcDSASig:eth_signTypedData_v4",
    async () => {
      const result = await sdk.getEcDSASig(
        web3,
        testTypedData,
        LOOPRING_EXPORTED_ACCOUNT.address,
        sdk.GetEcDSASigType.HasDataStruct,
        sdk.ChainId.GOERLI,
        LOOPRING_EXPORTED_ACCOUNT.accountId,
        "",
        sdk.ConnectorNames.Unknown
      );
      console.log(
        "getEcDSASig:eth_signTypedData_v4",
        result,
        "ecdsaSig+sdk.SigSuffix.Suffix02",
        result.ecdsaSig + sdk.SigSuffix.Suffix02
      );
    },
    DEFAULT_TIMEOUT
  );

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
      "getEcDSASig:eth_signTypedData_v4",
      result,
      "ecdsaSig+sdk.SigSuffix.Suffix02",
      result.ecdsaSig + sdk.SigSuffix.Suffix03
    );
  });

  it("personalSign Contract", async () => {
    //Test is not avaiable  simple like that
    // await sign_tools.getEcDSASig(
    //   web3,
    //   testTypedData,
    //   LOOPRING_EXPORTED_ACCOUNT.address,
    //   GetEcDSASigType.Contract,
    //   ChainId.GOERLI,
    //   LOOPRING_EXPORTED_ACCOUNT.accountId,
    //   "",
    //   ConnectorNames.Unknown,
    // );
  });
});

export default {};
