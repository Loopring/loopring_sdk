import {
  DEFAULT_TIMEOUT,
  LOOPRING_EXPORTED_ACCOUNT,
  LoopringAPI,
  web3,
  TOKEN_INFO,
  signatureKeyPairMock,
} from "../../MockData";
import * as sdk from "../../../index";
describe("deployNFT", function () {
  it(
    "submitDeployNFT",
    async () => {
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

      // Step 5. fee
      const fee = await LoopringAPI.userAPI.getNFTOffchainFeeAmt(
        {
          accountId: accInfo.accountId,
          requestType: sdk.OffchainNFTFeeReqType.NFT_DEPLOY,
          amount: "0",
        },
        apiKey
      );
      console.log(fee);

      // Step 6. broker
      const { broker } = await LoopringAPI.exchangeAPI.getAvailableBroker();

      // OriginDeployNFTRequestV3WithPatch
      const transfer = {
        exchange: LOOPRING_EXPORTED_ACCOUNT.exchangeAddress,
        payerAddr: LOOPRING_EXPORTED_ACCOUNT.address,
        payerId: LOOPRING_EXPORTED_ACCOUNT.accountId,
        payeeAddr: broker,
        // payeeAddr: LOOPRING_EXPORTED_ACCOUNT.address2,
        storageId: storageId.offchainId,
        token: {
          tokenId: TOKEN_INFO.tokenMap["LRC"].tokenId,
          volume: fee.fees["LRC"].fee ?? "9400000000000000000",
        },
        validUntil: LOOPRING_EXPORTED_ACCOUNT.validUntil,
      };

      const response = await LoopringAPI.userAPI.submitDeployNFT({
        request: {
          transfer,
          tokenAddress: LOOPRING_EXPORTED_ACCOUNT.nftTokenAddress,
          nftData: LOOPRING_EXPORTED_ACCOUNT.nftData,
        },
        web3,
        chainId: sdk.ChainId.GOERLI,
        walletType: sdk.ConnectorNames.Unknown,
        eddsaKey: eddsaKey.sk,
        apiKey: apiKey,
      });

      console.log(response);
    },
    DEFAULT_TIMEOUT
  );
});
