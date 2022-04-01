import {
  DEFAULT_TIMEOUT,
  LOOPRING_EXPORTED_ACCOUNT,
  LoopringAPI,
  web3,
  TOKEN_INFO,
  signatureKeyPairMock,
} from "../../MockData";
import * as sdk from "../../../index";
describe("Mint test", function () {
  it(
    "submitNFTMint",
    async () => {
      // step 1. getAccount
      const { accInfo } = await LoopringAPI.exchangeAPI.getAccount({
        owner: LOOPRING_EXPORTED_ACCOUNT.address,
      });
      console.log("accInfo:", accInfo);

      // step 2. eddsaKey
      const eddsaKey = await signatureKeyPairMock(accInfo);
      console.log("eddsaKey:", eddsaKey.sk);

      // step 3. apiKey
      const { apiKey } = await LoopringAPI.userAPI.getUserApiKey(
        {
          accountId: accInfo.accountId,
        },
        eddsaKey.sk
      );
      console.log("apiKey:", apiKey);

      // step 4. storageId
      const storageId = await LoopringAPI.userAPI.getNextStorageId(
        {
          accountId: accInfo.accountId,
          sellTokenId: 1,
        },
        apiKey
      );
      const counterFactualNftInfo = {
        nftOwner: accInfo.owner,
        nftFactory: sdk.NFTFactory[sdk.ChainId.GOERLI],
        nftBaseUri: "",
      };

      // step 5. fee
      const fee = await LoopringAPI.userAPI.getNFTOffchainFeeAmt(
        {
          accountId: accInfo.accountId,
          tokenAddress: LOOPRING_EXPORTED_ACCOUNT.nftTokenAddress,
          requestType: sdk.OffchainNFTFeeReqType.NFT_MINT,
        },
        apiKey
      );

      const nftTokenAddress =
        LoopringAPI.nftAPI.computeNFTAddress(counterFactualNftInfo)
          .tokenAddress || "";
      console.log("nftTokenAddress", nftTokenAddress);

      const response = await LoopringAPI.userAPI.submitNFTMint({
        request: {
          exchange: LOOPRING_EXPORTED_ACCOUNT.exchangeAddress,
          minterId: accInfo.accountId,
          minterAddress: accInfo.owner,
          toAccountId: accInfo.accountId,
          toAddress: accInfo.owner,
          nftType: 0,
          tokenAddress: nftTokenAddress,
          nftId: LOOPRING_EXPORTED_ACCOUNT.nftId, //nftId.toString(16),
          amount: "1",
          validUntil: Date.now(),
          storageId: storageId.offchainId ?? 9,
          maxFee: {
            tokenId:
              // @ts-ignore
              TOKEN_INFO.tokenMap[fee.fees[1]?.token?.toString() ?? "LRC"]
                .tokenId,
            amount: fee.fees[1]?.fee ?? "3260000000000000",
          },
          royaltyPercentage: 5,
          counterFactualNftInfo,
          forceToMint: true,
        },
        web3,
        chainId: sdk.ChainId.GOERLI,
        walletType: sdk.ConnectorNames.Unknown,
        eddsaKey: eddsaKey.sk,
        apiKey: apiKey,
      });

      console.log(response);
    },
    DEFAULT_TIMEOUT * 3
  );
});
