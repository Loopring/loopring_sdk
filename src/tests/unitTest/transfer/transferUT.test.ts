import {
  DEFAULT_TIMEOUT,
  LOOPRING_EXPORTED_ACCOUNT,
  LoopringAPI,
  TOKEN_INFO,
  signatureKeyPairMock,
  web3,
} from "../../MockData";
import * as sdk from "../../../index";

describe("Transfer UT", function () {
  it(
    "getAccountWhitelisted",
    async () => {
      const response = LoopringAPI.exchangeAPI.getAccount({
        owner: LOOPRING_EXPORTED_ACCOUNT.whitelistedAddress,
      });
      console.log(response);
    },
    DEFAULT_TIMEOUT
  );
  it(
    "get_EddsaSig_NFT_Transfer",
    async () => {
      const request: sdk.OriginNFTTransferRequestV3 = {
        exchange: LOOPRING_EXPORTED_ACCOUNT.exchangeAddress,
        fromAccountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
        fromAddress: LOOPRING_EXPORTED_ACCOUNT.address,
        toAccountId: LOOPRING_EXPORTED_ACCOUNT.accountId2,
        toAddress: LOOPRING_EXPORTED_ACCOUNT.address2,
        token: {
          tokenId: LOOPRING_EXPORTED_ACCOUNT.nftTokenId,
          nftData: LOOPRING_EXPORTED_ACCOUNT.nftData,
          amount: "1",
        },
        maxFee: {
          tokenId: 2,
          amount: "311000000000000000000",
        },
        storageId: 9,
        validUntil: LOOPRING_EXPORTED_ACCOUNT.validUntil,
        // memo: '',
      };
      const result = sdk.get_EddsaSig_NFT_Transfer(request, "");
      console.log(`resultHash:`, result);
    },
    DEFAULT_TIMEOUT
  );
  // it(
  //   "getUserApiKeyWhitelisted",
  //   async () => {
  //     // Step 1. get account info
  //     const { accInfo } = await LoopringAPI.exchangeAPI.getAccount({
  //       owner: LOOPRING_EXPORTED_ACCOUNT.whitelistedAddress,
  //     });
  //     console.log("accInfo:", accInfo);
  //
  //     // Step 2. eddsaKey
  //     const eddsaKey = await signatureKeyPairMock(accInfo);
  //     console.log("eddsaKey:", eddsaKey.sk);
  //
  //     // Step 3. get apikey
  //     const { apiKey } = await LoopringAPI.userAPI.getUserApiKey(
  //       {
  //         accountId: accInfo.accountId,
  //       },
  //       eddsaKey.sk
  //     );
  //     console.log("apiKey:", apiKey);
  //   },
  //   DEFAULT_TIMEOUT
  // );
  // it(
  //   "whitelistedAccTransfer",
  //   async () => {
  //     // Step 1. get account info
  //     const { accInfo } = await LoopringAPI.exchangeAPI.getAccount({
  //       owner: LOOPRING_EXPORTED_ACCOUNT.whitelistedAddress,
  //     });
  //     console.log("accInfo:", accInfo);
  //
  //     // Step 2. eddsaKey
  //     // const eddsaKey = await signatureKeyPairMock(accInfo);
  //     // console.log("eddsaKey:", eddsaKey.sk);
  //
  //     // Step 3. get apikey
  //     const { apiKey } = await LoopringAPI.userAPI.getUserApiKey(
  //       {
  //         accountId: accInfo.accountId,
  //       },
  //       LOOPRING_EXPORTED_ACCOUNT.whitelistedEddkey
  //     );
  //     console.log("apiKey:", apiKey);
  //
  //     // Step 4. get storageId
  //     const storageId = await LoopringAPI.userAPI.getNextStorageId(
  //       {
  //         accountId: accInfo.accountId,
  //         sellTokenId: TOKEN_INFO.tokenMap["LRC"].tokenId,
  //       },
  //       apiKey
  //     );
  //
  //     // Step 5. get fee
  //     const fee = await LoopringAPI.userAPI.getOffchainFeeAmt(
  //       {
  //         accountId: accInfo.accountId,
  //         requestType: sdk.OffchainFeeReqType.TRANSFER,
  //       },
  //       apiKey
  //     );
  //     console.log("fee:", fee);
  //
  //     // Step 6. transfer
  //     const response =
  //       await LoopringAPI.whitelistedUserAPI.submitInternalTransfer(
  //         {
  //           exchange: LOOPRING_EXPORTED_ACCOUNT.exchangeAddress, //exchangeInfo.exchangeAddress,
  //           payerAddr: LOOPRING_EXPORTED_ACCOUNT.whitelistedAddress,
  //           payerId: accInfo.accountId,
  //           payeeAddr: LOOPRING_EXPORTED_ACCOUNT.address2,
  //           payeeId: 0,
  //           storageId: storageId.offchainId,
  //           token: {
  //             tokenId: TOKEN_INFO.tokenMap.LRC.tokenId,
  //             volume: LOOPRING_EXPORTED_ACCOUNT.tradeLRCValue.toString(),
  //           },
  //           maxFee: {
  //             tokenId: TOKEN_INFO.tokenMap["LRC"].tokenId,
  //             volume: fee.fees["LRC"].fee ?? "9400000000000000000",
  //           },
  //           validUntil: LOOPRING_EXPORTED_ACCOUNT.validUntil,
  //         },
  //         LOOPRING_EXPORTED_ACCOUNT.whitelistedEddkey,
  //         apiKey
  //       );
  //
  //     console.log(response);
  //   },
  //   DEFAULT_TIMEOUT
  // );
});
