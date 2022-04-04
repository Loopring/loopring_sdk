import {
  DEFAULT_TIMEOUT,
  LOOPRING_EXPORTED_ACCOUNT,
  LoopringAPI,
  web3,
  TOKEN_INFO,
  signatureKeyPairMock,
} from "../../MockData";
import * as sdk from "../../../index";
import { DEPLOYMENT_STATUS } from "../../../index";

describe("WithdrawNFT", function () {
  it(
    "submitNFTWithdraw",
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

      //Step 5. getUserNFTBalances
      const { userNFTBalances } = await LoopringAPI.userAPI.getUserNFTBalances(
        { accountId: LOOPRING_EXPORTED_ACCOUNT.accountId },
        apiKey
      );
      const tokenInfo = userNFTBalances.find(
        (item) =>
          item.tokenAddress?.toLowerCase() ===
            LOOPRING_EXPORTED_ACCOUNT.nftTokenAddress.toLowerCase() &&
          item.nftId &&
          web3.utils.hexToNumberString(item.nftId) ===
            LOOPRING_EXPORTED_ACCOUNT.nftTokenId.toString()
      );

      // Step 6. fee
      const fee = await LoopringAPI.userAPI.getNFTOffchainFeeAmt(
        {
          accountId: accInfo.accountId,
          requestType: sdk.OffchainNFTFeeReqType.NFT_WITHDRAWAL,
          deployInWithdraw:
            tokenInfo?.deploymentStatus === DEPLOYMENT_STATUS.NOT_DEPLOYED, // when token is not deploy the fee is diff
        },
        apiKey
      );
      console.log("fee:", fee);

      // Step 6. withdraw
      const response = await LoopringAPI.userAPI.submitNFTWithdraw({
        request: {
          exchange: LOOPRING_EXPORTED_ACCOUNT.exchangeAddress,
          accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
          counterFactualInfo: undefined,
          hashApproved: "",
          maxFee: {
            tokenId: TOKEN_INFO.tokenMap["LRC"].tokenId,
            amount: fee.fees["LRC"].fee ?? "9400000000000000000",
          },
          minGas: 0,
          owner: LOOPRING_EXPORTED_ACCOUNT.address,
          to: LOOPRING_EXPORTED_ACCOUNT.address,
          storageId: 0,
          token: {
            tokenId: LOOPRING_EXPORTED_ACCOUNT.nftTokenId,
            nftData: LOOPRING_EXPORTED_ACCOUNT.nftData,
            amount: "1",
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
