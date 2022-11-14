import {
  DEFAULT_TIMEOUT,
  LOOPRING_EXPORTED_ACCOUNT,
  LoopringAPI,
  TOKEN_INFO,
  signatureKeyPairMock,
  web3,
} from "../../MockData";
import * as sdk from "../../../index";
import * as sign_tools from "../../../api/sign/sign_tools";
import { myLog } from "../../../utils/log_tools";
describe("Transfer", function () {
  it(
    "submitInternalTransfer",
    async () => {
      /*
       * @replace LOOPRING_EXPORTED_ACCOUNT.exchangeAddress =  exchangeInfo.exchangeAddress
       * const { exchangeInfo } = await LoopringAPI.exchangeAPI.getExchangeInfo();
       */
      // Step 1. get account info
      const { accInfo } = await LoopringAPI.exchangeAPI.getAccount({
        owner: LOOPRING_EXPORTED_ACCOUNT.address,
      });
      console.log("accInfo:", accInfo);

      // Step 2. eddsaKey
      const eddsaKey = await signatureKeyPairMock(accInfo);
      console.log("eddsaKey:", eddsaKey.sk);

      // Step 3. get apikey
      const { apiKey } = await LoopringAPI.userAPI.getUserApiKey(
        {
          accountId: accInfo.accountId,
        },
        eddsaKey.sk
      );
      console.log("apiKey:", apiKey);

      // Step 4. get storageId
      const storageId = await LoopringAPI.userAPI.getNextStorageId(
        {
          accountId: accInfo.accountId,
          sellTokenId: TOKEN_INFO.tokenMap["LRC"].tokenId,
        },
        apiKey
      );
      console.log("storageId:", storageId);

      // Step 5. get fee
      const fee = await LoopringAPI.userAPI.getOffchainFeeAmt(
        {
          accountId: accInfo.accountId,
          requestType: sdk.OffchainFeeReqType.TRANSFER,
        },
        apiKey
      );
      console.log("fee:", fee);
      const request = {
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
          tokenId: TOKEN_INFO.tokenMap["LRC"].tokenId,
          volume: fee.fees["LRC"].fee ?? "9400000000000000000",
        },
        validUntil: LOOPRING_EXPORTED_ACCOUNT.validUntil,
        /*
         * when payPayeeUpdateAccount = ture, will help payee active account,
         * maxFee from should:
         * const fee = await LoopringAPI.userAPI.getOffchainFeeAmt(
         *  {
         *     accountId: accInfo.accountId,
         *     requestType: sdk.OffchainFeeReqType.TRANSFER_AND_UPDATE_ACCOUNT,
         *   },
         *   apiKey
         * );
         */
        payPayeeUpdateAccount: false,
      };
      const hash = sign_tools.get_EddsaSig_Transfer(request, "").hash;
      myLog("hash", hash);
      // Step 6. transfer
      const transferResult = await LoopringAPI.userAPI.submitInternalTransfer({
        request,
        web3,
        chainId: sdk.ChainId.GOERLI,
        walletType: sdk.ConnectorNames.Unknown,
        eddsaKey: eddsaKey.sk,
        apiKey: apiKey,
      });
      console.log("transferResult:", transferResult);
    },
    DEFAULT_TIMEOUT
  );
});
