import {
  DEFAULT_TIMEOUT,
  LOOPRING_EXPORTED_ACCOUNT,
  LoopringAPI,
  web3,
  TOKEN_INFO,
  signatureKeyPairMock,
} from "../../MockData";
import * as sdk from "../../../index";

describe("TransferNFT", function () {
  it(
    "submitNFTInTransfer",
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
          sellTokenId: LOOPRING_EXPORTED_ACCOUNT.nftTokenId,
        },
        apiKey
      );
      console.log("storageId:", storageId);

      // Step 5. fee
      const fee = await LoopringAPI.userAPI.getNFTOffchainFeeAmt(
        {
          accountId: accInfo.accountId,
          requestType: sdk.OffchainNFTFeeReqType.NFT_TRANSFER,
          amount: "0",
        },
        apiKey
      );
      console.log("fee:", fee);

      const transferResult = await LoopringAPI.userAPI.submitNFTInTransfer({
        request: {
          exchange: LOOPRING_EXPORTED_ACCOUNT.exchangeAddress,
          fromAccountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
          fromAddress: LOOPRING_EXPORTED_ACCOUNT.address,
          toAccountId: 0, // toAccountId is not required, input 0 as default
          toAddress: LOOPRING_EXPORTED_ACCOUNT.address2,
          token: {
            tokenId: LOOPRING_EXPORTED_ACCOUNT.nftTokenId,
            nftData: LOOPRING_EXPORTED_ACCOUNT.nftData,
            amount: "1",
          },
          maxFee: {
            tokenId: TOKEN_INFO.tokenMap["LRC"].tokenId,
            amount: fee.fees["LRC"].fee ?? "9400000000000000000",
          },
          storageId: storageId.offchainId,
          validUntil: LOOPRING_EXPORTED_ACCOUNT.validUntil,
          // memo: '',
        },
        web3,
        chainId: sdk.ChainId.GOERLI,
        walletType: sdk.ConnectorNames.Unknown,
        eddsaKey: eddsaKey.sk,
        apiKey,
      });
      console.log("transfer Result:", transferResult);
    },
    DEFAULT_TIMEOUT
  );
});
