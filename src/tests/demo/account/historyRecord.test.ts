import {
  DEFAULT_TIMEOUT,
  LOOPRING_EXPORTED_ACCOUNT,
  LoopringAPI,
  signatureKeyPairMock,
} from "../../MockData";
import * as sdk from "../../../index";
let apiKey = "";
describe("historyRecord", function () {
  beforeEach(async () => {
    // Step 1. getAccount
    const { accInfo } = await LoopringAPI.exchangeAPI.getAccount({
      owner: LOOPRING_EXPORTED_ACCOUNT.address,
    });
    console.log("accInfo:", accInfo);

    // Step 2. eddsaKey
    const eddsaKey = await signatureKeyPairMock(accInfo);
    console.log("eddsaKey:", eddsaKey.sk);

    // Step 3. apiKey
    apiKey = (
      await LoopringAPI.userAPI.getUserApiKey(
        {
          accountId: accInfo.accountId,
        },
        eddsaKey.sk
      )
    ).apiKey;
    console.log("apiKey:", apiKey);
  }, DEFAULT_TIMEOUT);

  it(
    "getUserTrades",
    async () => {
      const result = await LoopringAPI.userAPI.getUserTrades(
        {
          accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
          offset: 0,
          limit: 20,
          fillTypes: sdk.TradesFillTypes.dex,
        },
        apiKey
      );
      console.log("getUserTrades:", result);
    },
    DEFAULT_TIMEOUT
  );
  it(
    "getUserTxs",
    async () => {
      const result = await LoopringAPI.userAPI.getUserTxs(
        {
          accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
          types: [
            sdk.UserTxTypes.DEPOSIT,
            sdk.UserTxTypes.TRANSFER,
            sdk.UserTxTypes.OFFCHAIN_WITHDRAWAL,
          ],
        },
        apiKey
      );
      console.log("getUserTxs:", result);
    },
    DEFAULT_TIMEOUT
  );
  it(
    "getUserNFTTransactionHistory",
    async () => {
      const result = await LoopringAPI.userAPI.getUserNFTTransactionHistory(
        {
          accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
          types: [
            sdk.UserNFTTxTypes.DEPOSIT,
            sdk.UserNFTTxTypes.TRANSFER,
            sdk.UserNFTTxTypes.WITHDRAW,
            sdk.UserNFTTxTypes.MINT,
          ],
        },
        apiKey
      );
      console.log("getUserNFTTransactionHistory:", result);
    },
    DEFAULT_TIMEOUT
  );
  it(
    "getOrders",
    async () => {
      const result = await LoopringAPI.userAPI.getOrders(
        {
          accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
          orderTypes: sdk.OrderType.LimitOrder,
        },
        apiKey
      );

      console.log("getOrders:", result);
    },
    DEFAULT_TIMEOUT
  );
});
