import {
  DEFAULT_TIMEOUT,
  LOOPRING_EXPORTED_ACCOUNT,
  LoopringAPI,
  testTypedData,
  web3,
  signatureKeyPairMock,
} from "../../MockData";
import * as sdk from "../../../index";
import {
  NFTOrderRequestV3,
  NFTTradeRequestV3,
  SubmitOrderRequestV3,
} from "../../../index";

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
      "ecdsaSig+sdk.SigSuffix.Suffix02",
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
  it("NFTAction Trade Hash", async () => {
    try {
      const makerOrder: NFTOrderRequestV3 = {
        exchange: "0xD1221BA705B653d9Ea22569c911Bddf68264fAF4",
        accountId: 10979,
        storageId: 36,
        sellToken: {
          tokenId: 2,
          nftData: "",
          amount: "118117838",
        },
        buyToken: {
          tokenId: 32769,
          nftData:
            "0x26b32b508180c293e1a6581fd8a1ebff4734966578a008247c9f0bf9cdb5e492",
          amount: "2",
        },
        allOrNone: false,
        fillAmountBOrS: true,
        validUntil: 1680332114,
        maxFeeBips: 1000,
      };
      makerOrder.eddsaSignature =
        "0x2553b338ce18a9bc4f51412ccf2c37ba04538ef26e4897fdcf244d0bcf71fe270a0ccebe65cc4a13a3c3e6f84c3de919f7d81434df0a50b8f583e4c7b350b2a203c01b8472e3474c6b2225de41da6ae67a781986d43063ce8008d5978cab3c1f";

      const takerOrder: NFTOrderRequestV3 = {
        exchange: "0xD1221BA705B653d9Ea22569c911Bddf68264fAF4",
        accountId: 10092,
        storageId: 2,
        sellToken: {
          tokenId: 32769,
          nftData:
            "0x26b32b508180c293e1a6581fd8a1ebff4734966578a008247c9f0bf9cdb5e492",
          amount: "1",
        },
        buyToken: {
          tokenId: 2,
          nftData: "",
          amount: "59000000",
        },
        allOrNone: false,
        fillAmountBOrS: false,
        validUntil: 1680332114,
        maxFeeBips: 1000,
      };

      takerOrder.eddsaSignature =
        "0x28e1fef32e0e7d119d5f2a078bf9f0ad677f72eed18ef35d98326a389ebb5e900a92fe81cfd4fc0a2758dba3bbf55f79c073ac539490b5fc6e16a8046df946dd060025f14fc3d92ef72163639e4ec8cef629e335343c44a291aed5a6e8d646bf";

      const tradeRequest: NFTTradeRequestV3 = {
        maker: makerOrder,
        makerFeeBips: 99,
        taker: takerOrder,
        takerFeeBips: 99,
      };

      const hash = await sdk.getNftTradeHash(tradeRequest);

      // result should be 0x244b36f43e462167942bb336e180df74dcca5726742cfab9ae1b70b6dfe5f4a
      console.log("NFT Trade hash is 0x" + hash);
    } catch (err) {
      console.log(err);
    }
  });
  it("ERC20 Order Hash", async () => {
    try {
      const orderRequest: SubmitOrderRequestV3 = {
        exchange: "0x2e76EBd1c7c0C8e7c2B875b6d505a260C525d25e",
        accountId: 11040,
        storageId: 10,
        sellToken: {
          tokenId: 1,
          volume: "986000000000000000000",
        },
        buyToken: {
          tokenId: 0,
          volume: "74861064000000000",
        },
        maxFeeBips: 60,
        validUntil: 1653995768,
        fillAmountBOrS: false,
        allOrNone: false,
        eddsaSignature: "",
      };

      const hash = await sdk.getOrderHash(orderRequest);

      // result should be : 0x15b965bbf0e01697939a5cd8be6e631f6cf4a3009ee9fb8631d193e0d5218b92
      console.log("ERC20 order hash is 0x" + hash);
    } catch (err) {
      console.log(err);
    }
  });
});

export default {};
