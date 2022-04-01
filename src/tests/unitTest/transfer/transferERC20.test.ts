import {
  DEFAULT_TIMEOUT,
  LOOPRING_EXPORTED_ACCOUNT,
  LoopringAPI,
  TOKEN_INFO,
  signatureKeyPairMock,
  web3,
} from "../../MockData";
import * as sdk from "../../../index";

describe("Transfer test", function () {
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
    "getUserApiKeyWhitelisted",
    async () => {
      // step 1. get account info
      const { accInfo } = await LoopringAPI.exchangeAPI.getAccount({
        owner: LOOPRING_EXPORTED_ACCOUNT.whitelistedAddress,
      });
      console.log("accInfo:", accInfo);

      // step 2. eddsaKey
      const eddsaKey = await signatureKeyPairMock(accInfo);
      console.log("eddsaKey:", eddsaKey.sk);

      // step 3 get apikey
      const { apiKey } = await LoopringAPI.userAPI.getUserApiKey(
        {
          accountId: accInfo.accountId,
        },
        eddsaKey.sk
      );
      console.log("apiKey:", apiKey);
    },
    DEFAULT_TIMEOUT
  );
  it(
    "whitelistedAccTransfer",
    async () => {
      // step 1. get account info
      const { accInfo } = await LoopringAPI.exchangeAPI.getAccount({
        owner: LOOPRING_EXPORTED_ACCOUNT.whitelistedAddress,
      });
      console.log("accInfo:", accInfo);

      // step 2. eddsaKey
      // const eddsaKey = await signatureKeyPairMock(accInfo);
      // console.log("eddsaKey:", eddsaKey.sk);

      // step 3 get apikey
      const { apiKey } = await LoopringAPI.userAPI.getUserApiKey(
        {
          accountId: accInfo.accountId,
        },
        LOOPRING_EXPORTED_ACCOUNT.whitelistedEddkey
      );
      console.log("apiKey:", apiKey);

      // step 4 get storageId
      const storageId = await LoopringAPI.userAPI.getNextStorageId(
        {
          accountId: accInfo.accountId,
          sellTokenId: 1,
        },
        apiKey
      );

      // step 5 get fee
      const fee = await LoopringAPI.userAPI.getOffchainFeeAmt(
        {
          accountId: accInfo.accountId,
          requestType: sdk.OffchainFeeReqType.TRANSFER,
        },
        apiKey
      );
      console.log("fee:", fee);

      // step 6 transfer
      const response =
        await LoopringAPI.whitelistedUserAPI.submitInternalTransfer(
          {
            exchange: LOOPRING_EXPORTED_ACCOUNT.exchangeAddress, //exchangeInfo.exchangeAddress,
            payerAddr: LOOPRING_EXPORTED_ACCOUNT.whitelistedAddress,
            payerId: accInfo.accountId,
            payeeAddr: LOOPRING_EXPORTED_ACCOUNT.address2,
            payeeId: 0,
            storageId: storageId.offchainId,
            token: {
              tokenId: TOKEN_INFO.tokenMap.LRC.tokenId,
              volume: LOOPRING_EXPORTED_ACCOUNT.tradeLRCValue.toString(),
            },
            maxFee: {
              tokenId:
                // @ts-ignore
                TOKEN_INFO.tokenMap[fee.fees[1]?.token?.toString() ?? "LRC"]
                  .tokenId,
              volume: "9400000000000000000",
            },
            validUntil: LOOPRING_EXPORTED_ACCOUNT.validUntil,
          },
          LOOPRING_EXPORTED_ACCOUNT.whitelistedEddkey,
          apiKey
        );

      console.log(response);
    },
    DEFAULT_TIMEOUT
  );
  it(
    "submitInternalTransfer",
    async () => {
      /*
       * @replace LOOPRING_EXPORTED_ACCOUNT.exchangeAddress =  exchangeInfo.exchangeAddress
       * const { exchangeInfo } = await LoopringAPI.exchangeAPI.getExchangeInfo();
       */
      // step 1. get account info
      const { accInfo } = await LoopringAPI.exchangeAPI.getAccount({
        owner: LOOPRING_EXPORTED_ACCOUNT.address,
      });
      console.log("accInfo:", accInfo);

      // step 2. eddsaKey
      const eddsaKey = await signatureKeyPairMock(accInfo);
      console.log("eddsaKey:", eddsaKey.sk);

      // step 3 get apikey
      const { apiKey } = await LoopringAPI.userAPI.getUserApiKey(
        {
          accountId: accInfo.accountId,
        },
        eddsaKey.sk
      );
      console.log("apiKey:", apiKey);

      // step 4 get storageId
      const storageId = await LoopringAPI.userAPI.getNextStorageId(
        {
          accountId: accInfo.accountId,
          sellTokenId: 1,
        },
        apiKey
      );
      console.log("storageId:", storageId);

      // step 5 get fee
      const fee = await LoopringAPI.userAPI.getOffchainFeeAmt(
        {
          accountId: accInfo.accountId,
          requestType: sdk.OffchainFeeReqType.TRANSFER,
        },
        apiKey
      );
      console.log("fee:", fee);

      // step 6 transfer
      const transferResult = await LoopringAPI.userAPI.submitInternalTransfer({
        request: {
          exchange: LOOPRING_EXPORTED_ACCOUNT.exchangeAddress,
          payerAddr: accInfo.owner,
          payerId: accInfo.accountId,
          payeeAddr: LOOPRING_EXPORTED_ACCOUNT.address2,
          payeeId: LOOPRING_EXPORTED_ACCOUNT.accountId2,
          storageId: storageId.offchainId,
          token: {
            tokenId: TOKEN_INFO.tokenMap.LRC.tokenId,
            volume: LOOPRING_EXPORTED_ACCOUNT.tradeLRCValue.toString(),
          },
          maxFee: {
            tokenId:
              // @ts-ignore
              TOKEN_INFO.tokenMap[fee.fees[1]?.token?.toString() ?? "LRC"]
                .tokenId,
            volume: fee.fees[1]?.fee ?? "9400000000000000000",
          },
          validUntil: LOOPRING_EXPORTED_ACCOUNT.validUntil,
        },
        web3,
        chainId: sdk.ChainId.GOERLI,
        walletType: sdk.ConnectorNames.Trezor,
        eddsaKey: eddsaKey.sk,
        apiKey: apiKey,
      });
      console.log("transferResult:", transferResult);
    },
    DEFAULT_TIMEOUT
  );
});
