import {
  DEFAULT_TIMEOUT,
  LOOPRING_EXPORTED_ACCOUNT,
  LoopringAPI,
  web3,
  TOKEN_INFO,
  signatureKeyPairMock,
} from "../../MockData";
import * as sdk from "../../../index";
const mockData = {
  nftTokenAddress: ""
}
describe("mintNFT", function () {
  it(
    "submitNFTMint",
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

      // Step 4. fee
      const fee = await LoopringAPI.userAPI.getNFTOffchainFeeAmt(
        {
          accountId: accInfo.accountId,
          tokenAddress: LOOPRING_EXPORTED_ACCOUNT.nftTokenAddress,
          requestType: sdk.OffchainNFTFeeReqType.NFT_MINT,
        },
        apiKey
      );

      // Step 5. storageId
      const storageId = await LoopringAPI.userAPI.getNextStorageId(
        {
          accountId: accInfo.accountId,
          sellTokenId: TOKEN_INFO.tokenMap["LRC"].tokenId, // same as maxFee tokenId
        },
        apiKey
      );

      // Step 6. nftTokenAddress
      const counterFactualNftInfo = {
        nftOwner: accInfo.owner,
        nftFactory: sdk.NFTFactory[sdk.ChainId.GOERLI],
        nftBaseUri: "",
      };
      const nftTokenAddress =
        LoopringAPI.nftAPI.computeNFTAddress(counterFactualNftInfo)
          .tokenAddress || "";
      console.log("nftTokenAddress", nftTokenAddress);

      // Step 7. Mint
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
          validUntil: LOOPRING_EXPORTED_ACCOUNT.validUntil,
          storageId: storageId.offchainId ?? 9,
          maxFee: {
            tokenId: TOKEN_INFO.tokenMap["LRC"].tokenId,
            amount: fee.fees[ "LRC" ].fee ?? "9400000000000000000",
          },
          royaltyPercentage: 5,
          forceToMint: true, // suggest use as false, for here is just for run test
        },
        web3,
        chainId: sdk.ChainId.GOERLI,
        walletType: sdk.ConnectorNames.Unknown,
        eddsaKey: eddsaKey.sk,
        apiKey: apiKey,
      }, {_noEcdsa: true});

      console.log(response);
    },
    DEFAULT_TIMEOUT * 3
  );


  it(
    "submitNFTMintWithCollection",
    async () => {
      // Step 1. getAccount
      const {accInfo} = await LoopringAPI.exchangeAPI.getAccount({
        owner: LOOPRING_EXPORTED_ACCOUNT.address,
      });
      console.log("accInfo:", accInfo);

      // Step 2. eddsaKey
      const eddsaKey = await signatureKeyPairMock(accInfo);
      console.log("eddsaKey:", eddsaKey.sk);

      // Step 3. apiKey
      const {apiKey} = await LoopringAPI.userAPI.getUserApiKey(
        {
          accountId: accInfo.accountId,
        },
        eddsaKey.sk
      );
      console.log("apiKey:", apiKey);

      // Step 4. fee
      const fee = await LoopringAPI.userAPI.getNFTOffchainFeeAmt(
        {
          accountId: accInfo.accountId,
          tokenAddress: LOOPRING_EXPORTED_ACCOUNT.nftTokenAddress,
          requestType: sdk.OffchainNFTFeeReqType.NFT_MINT,
        },
        apiKey
      );

      // Step 5. storageId
      const storageId = await LoopringAPI.userAPI.getNextStorageId(
        {
          accountId: accInfo.accountId,
          sellTokenId: TOKEN_INFO.tokenMap[ "LRC" ].tokenId, // same as maxFee tokenId
        },
        apiKey
      );

      // Step 6. nftTokenAddress
      const counterFactualNftInfo = {
        nftOwner: accInfo.owner,
        nftFactory: sdk.NFTFactory[ sdk.ChainId.GOERLI ],
        nftBaseUri: "",
      };
      const nftTokenAddress =
        LoopringAPI.nftAPI.computeNFTAddress(counterFactualNftInfo)
          .tokenAddress || "";
      console.log("nftTokenAddress", nftTokenAddress);

      // Step 7. Mint
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
          validUntil: LOOPRING_EXPORTED_ACCOUNT.validUntil,
          storageId: storageId.offchainId ?? 9,
          maxFee: {
            tokenId: TOKEN_INFO.tokenMap[ "LRC" ].tokenId,
            amount: fee.fees[ "LRC" ].fee ?? "9400000000000000000",
          },
          royaltyPercentage: 5,
          forceToMint: true, // suggest use as false, for here is just for run test
        },
        web3,
        chainId: sdk.ChainId.GOERLI,
        walletType: sdk.ConnectorNames.Unknown,
        eddsaKey: eddsaKey.sk,
        apiKey: apiKey,
      }, {_noEcdsa: true});

      console.log(response);
    },
    DEFAULT_TIMEOUT * 3
  );
});
