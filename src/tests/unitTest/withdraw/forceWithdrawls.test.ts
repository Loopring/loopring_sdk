import {
  DEFAULT_TIMEOUT,
  LOOPRING_EXPORTED_ACCOUNT,
  LoopringAPI,
  signatureKeyPairMock,
  TOKEN_INFO,
  web3,
} from "../../MockData";
import * as sdk from "../../../index";

it(
  "submitForceWithdrawals",
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
    const fee = await LoopringAPI.userAPI.getOffchainFeeAmt(
      {
        accountId: accInfo.accountId,
        requestType: sdk.OffchainFeeReqType.FORCE_WITHDRAWAL,
        amount: "0",
      },
      apiKey
    );
    console.log(fee);

    // Step 5. storageId
    const storageId = await LoopringAPI.userAPI.getNextStorageId(
      {
        accountId: accInfo.accountId,
        sellTokenId: TOKEN_INFO.tokenMap["LRC"].tokenId, // same as Step 7. transfer->token->tokenId
      },
      apiKey
    );

    // Step 6. broker
    const { broker } = await LoopringAPI.exchangeAPI.getAvailableBroker();

    // Step 7. Build transfer & Deploy
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

    const response = await LoopringAPI.userAPI.submitForceWithdrawals({
      request: {
        transfer,
        withdrawAddress: "0x7dF81E6683029011bBfefb5D57A1A364C3819110", //test for withdraw
        requesterAddress: accInfo.owner,
        tokenId: TOKEN_INFO.tokenMap["LRC"].tokenId,
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
