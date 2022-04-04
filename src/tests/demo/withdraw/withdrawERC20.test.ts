import {
  DEFAULT_TIMEOUT,
  LOOPRING_EXPORTED_ACCOUNT,
  LoopringAPI,
  web3,
  TOKEN_INFO,
  signatureKeyPairMock,
} from "../../MockData";
import * as sdk from "../../../index";

describe("Withdraw", function () {
  beforeEach(async () => {
    jest.setTimeout(DEFAULT_TIMEOUT * 3);
  }, DEFAULT_TIMEOUT);

  it(
    "submitWithdraw",
    async () => {
      /*
       * @replace LOOPRING_EXPORTED_ACCOUNT.exchangeAddress =  exchangeInfo.exchangeAddress
       * const { exchangeInfo } = await LoopringAPI.exchangeAPI.getExchangeInfo();
       */
      // Step 1. getAccount
      const { accInfo } = await LoopringAPI.exchangeAPI.getAccount({
        owner: LOOPRING_EXPORTED_ACCOUNT.address,
      });
      console.log("accInfo:", accInfo);

      // Step 2. eddsaKey
      const eddsaKey = await signatureKeyPairMock(accInfo);
      console.log("eddsaKey:", eddsaKey.sk);

      // Step 3. apiKey
      const { apiKey } = await LoopringAPI.userAPI.getUserApiKey(
        {
          accountId: accInfo.accountId,
        },
        eddsaKey.sk
      );
      console.log("apiKey:", apiKey);

      // Step 4. storageId
      const storageId = await LoopringAPI.userAPI.getNextStorageId(
        {
          accountId: accInfo.accountId,
          sellTokenId: TOKEN_INFO.tokenMap["LRC"].tokenId,
        },
        apiKey
      );
      console.log("storageId:", storageId);

      // Step 5. fee
      const fee = await LoopringAPI.userAPI.getOffchainFeeAmt(
        {
          accountId: accInfo.accountId,
          requestType: sdk.OffchainFeeReqType.OFFCHAIN_WITHDRAWAL,
          tokenSymbol: TOKEN_INFO.tokenMap["LRC"].symbol,
        },
        apiKey
      );
      console.log("fee:", fee);

      // Step 6. withdraw
      const response = await LoopringAPI.userAPI.submitOffchainWithdraw({
        request: {
          exchange: LOOPRING_EXPORTED_ACCOUNT.exchangeAddress,
          accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
          counterFactualInfo: undefined,
          fastWithdrawalMode: false,
          hashApproved: "",
          maxFee: {
            tokenId: TOKEN_INFO.tokenMap["LRC"].tokenId,
            volume: fee.fees["LRC"].fee ?? "9400000000000000000",
          },
          minGas: 0,
          owner: LOOPRING_EXPORTED_ACCOUNT.address,
          to: LOOPRING_EXPORTED_ACCOUNT.address,
          storageId: 0,
          token: {
            tokenId: TOKEN_INFO.tokenMap.LRC.tokenId,
            volume: LOOPRING_EXPORTED_ACCOUNT.tradeLRCValue.toString(),
          },
          validUntil: 0,
        },
        web3,
        chainId: sdk.ChainId.GOERLI,
        walletType: sdk.ConnectorNames.MetaMask,
        eddsaKey: eddsaKey.sk,
        apiKey,
      });
      console.log("response:", response);
    },
    DEFAULT_TIMEOUT * 3
  );
});
