import {
  DEFAULT_TIMEOUT,
  LOOPRING_EXPORTED_ACCOUNT,
  LoopringAPI,
  web3,
  TOKEN_INFO,
  signatureKeyPairMock,
} from "../../MockData";
import * as sdk from "../../../index";

const PrivateKeyProvider = require("truffle-privatekey-provider");

describe("NFTAction Validate Order Test", function () {
  it(
    "validateNftOrder",
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
      console.log("storageId:", storageId);
      // let hash: any = new BN(nftId,'hex')
      // hash = toHex(hash);//new BigInteger(sha256(nftId.toString()).toString(), 16)

      const request3: sdk.NFTOrderRequestV3 = {
        exchange: LOOPRING_EXPORTED_ACCOUNT.exchangeAddress,
        accountId: accInfo.accountId,
        storageId: storageId.orderId,
        sellToken: {
          tokenId: LOOPRING_EXPORTED_ACCOUNT.nftTokenId,
          nftData: LOOPRING_EXPORTED_ACCOUNT.nftData,
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
      console.log("sellNFT NFTOrderRequestV3", request3);
      const response = await LoopringAPI.userAPI.submitNFTValidateOrder({
        request: request3,
        web3,
        chainId: sdk.ChainId.GOERLI,
        walletType: sdk.ConnectorNames.Unknown,
        eddsaKey: eddsaKey.sk,
        apiKey: apiKey,
      });

      console.log(response);
      const request4 = {
        ...request3,
        sellToken: {
          tokenId: 1,
          amount: "10000000000000",
        },
        buyToken: {
          tokenId: LOOPRING_EXPORTED_ACCOUNT.nftTokenId,
          nftData: LOOPRING_EXPORTED_ACCOUNT.nftData,
          amount: "1",
        },
        fillAmountBOrS: true,
      };
      console.log("buyNFT NFTOrderRequestV3", request4);
      const response2 = await LoopringAPI.userAPI.submitNFTValidateOrder({
        request: request4,
        web3,
        chainId: sdk.ChainId.GOERLI,
        walletType: sdk.ConnectorNames.Unknown,
        eddsaKey: eddsaKey.sk,
        apiKey: apiKey,
      });
      console.log(response2);
    },
    DEFAULT_TIMEOUT * 2
  );
});
