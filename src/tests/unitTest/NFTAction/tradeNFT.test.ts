import {
  DEFAULT_TIMEOUT,
  LOOPRING_EXPORTED_ACCOUNT,
  LoopringAPI,
  web3,
  web3_2,
  TOKEN_INFO,
  signatureKeyPairMock,
} from "../../MockData";
import * as sdk from "../../../index";
// prepare: account need minted some NFTAction before test
describe("NFTAction Trade Test", function () {
  it(
    "NFTAction",
    async () => {
      // step 1. getAccount
      const { accInfo } = await LoopringAPI.exchangeAPI.getAccount({
        owner: LOOPRING_EXPORTED_ACCOUNT.address,
      });
      const { accInfo: accInfo2 } = await LoopringAPI.exchangeAPI.getAccount({
        owner: LOOPRING_EXPORTED_ACCOUNT.address2,
      });
      console.log("accInfo:", accInfo);

      // step 2. eddsaKey
      const eddsaKey = await signatureKeyPairMock(accInfo);
      console.log("eddsaKey:", eddsaKey.sk);
      const eddsaKey2 = await signatureKeyPairMock(accInfo2, web3_2);
      console.log("eddsaKey:", eddsaKey.sk);

      // step 3. apiKey
      const { apiKey } = await LoopringAPI.userAPI.getUserApiKey(
        {
          accountId: accInfo.accountId,
        },
        eddsaKey.sk
      );
      const { apiKey: apiKey2 } = await LoopringAPI.userAPI.getUserApiKey(
        {
          accountId: accInfo2.accountId,
        },
        eddsaKey2.sk
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
      const storageId2 = await LoopringAPI.userAPI.getNextStorageId(
        {
          accountId: accInfo2.accountId,
          sellTokenId: 1,
        },
        apiKey2
      );
      console.log("storageId:", storageId);

      const { userNFTBalances } = await LoopringAPI.userAPI.getUserNFTBalances(
        { accountId: accInfo.accountId, limit: 20 },
        apiKey
      );
      console.log("NFTAction-INFO", userNFTBalances[0]);

      // step 4 get storageId

      const makerOrder: sdk.NFTOrderRequestV3 = {
        exchange: LOOPRING_EXPORTED_ACCOUNT.exchangeAddress,
        accountId: accInfo.accountId,
        storageId: storageId.orderId,
        sellToken: {
          tokenId: userNFTBalances[0]?.tokenId,
          nftData: userNFTBalances[0]?.nftData,
          amount: "1",
        },
        buyToken: {
          tokenId: 1,
          amount: "10000000000000",
        },
        allOrNone: false,
        fillAmountBOrS: false,
        validUntil: LOOPRING_EXPORTED_ACCOUNT.validUntil,
        maxFeeBips: 80,
      };
      makerOrder.eddsaSignature = sdk.get_EddsaSig_NFT_Order(
        makerOrder,
        eddsaKey.sk
      );

      const nftValidateMakerOrder =
        await LoopringAPI.userAPI.submitNFTValidateOrder({
          request: makerOrder,
          web3,
          chainId: sdk.ChainId.GOERLI,
          walletType: sdk.ConnectorNames.Unknown,
          eddsaKey: eddsaKey.sk,
          apiKey: apiKey,
        });
      console.log("submitNFTValidateOrder MakerOrder", nftValidateMakerOrder);

      const takerOrder: sdk.NFTOrderRequestV3 = {
        exchange: LOOPRING_EXPORTED_ACCOUNT.exchangeAddress,
        accountId: accInfo2.accountId,
        storageId: storageId2.orderId,
        sellToken: {
          tokenId: 1,
          amount: "10000000000000",
        },
        buyToken: {
          tokenId: userNFTBalances[0]?.tokenId,
          nftData: userNFTBalances[0]?.nftData,
          amount: "1",
        },
        allOrNone: false,
        fillAmountBOrS: true,
        validUntil: LOOPRING_EXPORTED_ACCOUNT.validUntil,
        maxFeeBips: 80,
      };

      takerOrder.eddsaSignature = sdk.get_EddsaSig_NFT_Order(
        takerOrder,
        eddsaKey2.sk
      );

      const nftValidateTakerOrder =
        await LoopringAPI.userAPI.submitNFTValidateOrder({
          request: takerOrder,
          web3,
          chainId: sdk.ChainId.GOERLI,
          walletType: sdk.ConnectorNames.Unknown,
          eddsaKey: eddsaKey2.sk,
          apiKey: apiKey2,
        });
      console.log("submitNFTValidateOrder takerOrder", nftValidateTakerOrder);

      const response = await LoopringAPI.userAPI.submitNFTTrade({
        request: {
          maker: makerOrder,
          makerFeeBips: 80,
          taker: takerOrder,
          takerFeeBips: 80,
        },
        web3,
        chainId: sdk.ChainId.GOERLI,
        walletType: sdk.ConnectorNames.Unknown,
        apiKey: apiKey,
        eddsaKey: eddsaKey.sk,
      });

      console.log(response);
    },
    DEFAULT_TIMEOUT * 2
  );
});
