import {
  DEFAULT_TIMEOUT,
  LOOPRING_EXPORTED_ACCOUNT,
  LoopringAPI,
  TOKEN_INFO,
  web3,
  CUSTOMER_KEY_SEED,
} from "../../MockData";
import * as sdk from "../../../index";

/*
 * @replace LOOPRING_EXPORTED_ACCOUNT.exchangeAddress =  exchangeInfo.exchangeAddressess
 * const { exchangeInfo } = await LoopringAPI.exchangeAPI.getExchangeInfo();
 */
describe("ActiveAccount", function () {
  it(
    "updateAccount",
    async () => {
      // Step 1. get account info
      const { accInfo } = await LoopringAPI.exchangeAPI.getAccount({
        owner: LOOPRING_EXPORTED_ACCOUNT.address,
      });

      // Step 2. use keySeed generateKeyPair
      const keySeed =
        accInfo.keySeed && accInfo.keySeed !== ""
          ? accInfo.keySeed
          : sdk.BaseAPI.KEY_MESSAGE.replace(
              "${exchangeAddress}",
              LOOPRING_EXPORTED_ACCOUNT.exchangeAddress
            ).replace("${nonce}", accInfo.nonce.toString());
      const eddsaKey = await sdk.generateKeyPair({
        web3,
        address: accInfo.owner,
        keySeed,
        walletType: sdk.ConnectorNames.MetaMask,
        chainId: sdk.ChainId.GOERLI,
      });
      console.log("eddsakey:", eddsaKey.sk);

      // Step 3. fee
      const fee = await LoopringAPI.globalAPI.getActiveFeeInfo({
        accountId: accInfo.accountId,
      });
      console.log("fee:", fee);

      // Step 4. updateAccount (active or rest）
      const result = await LoopringAPI.userAPI.updateAccount({
        request: {
          exchange: LOOPRING_EXPORTED_ACCOUNT.exchangeAddress,
          owner: accInfo.owner,
          accountId: accInfo.accountId,
          publicKey: { x: eddsaKey.formatedPx, y: eddsaKey.formatedPy },
          maxFee: {
            tokenId: TOKEN_INFO.tokenMap["LRC"].tokenId,
            volume: fee.fees["LRC"].fee ?? "9400000000000000000",
          },
          keySeed,
          validUntil: LOOPRING_EXPORTED_ACCOUNT.validUntil,
          nonce: accInfo.nonce as number,
        },
        web3,
        chainId: sdk.ChainId.GOERLI,
        walletType: sdk.ConnectorNames.Unknown,
        isHWAddr: false,
      });
      const { accInfo: updateAccountInfo } =
        await LoopringAPI.exchangeAPI.getAccount({
          owner: LOOPRING_EXPORTED_ACCOUNT.address,
        });
      console.log(
        "updateAccount Result: ",
        result,
        "updateAccountInfo:",
        updateAccountInfo
      );
    },
    DEFAULT_TIMEOUT * 2
  );

  it(
    "customer_keySeed",
    async () => {
      // Step 1. get account info
      const { accInfo } = await LoopringAPI.exchangeAPI.getAccount({
        owner: LOOPRING_EXPORTED_ACCOUNT.address,
      });

      // Step 2. use keySeed generateKeyPair
      const keySeed = CUSTOMER_KEY_SEED.replace(
        "${nonce}",
        accInfo.nonce.toString()
      );
      const eddsaKey = await sdk.generateKeyPair({
        web3,
        address: accInfo.owner,
        keySeed,
        walletType: sdk.ConnectorNames.MetaMask,
        chainId: sdk.ChainId.GOERLI,
      });
      console.log("eddsakey:", eddsaKey.sk);

      // Step 3. fee
      const fee = await LoopringAPI.globalAPI.getActiveFeeInfo({
        accountId: accInfo.accountId,
      });
      console.log("fee:", fee);

      // Step 4. updateAccount (active or rest）
      const result = await LoopringAPI.userAPI.updateAccount({
        request: {
          exchange: LOOPRING_EXPORTED_ACCOUNT.exchangeAddress,
          owner: accInfo.owner,
          accountId: accInfo.accountId,
          publicKey: { x: eddsaKey.formatedPx, y: eddsaKey.formatedPy },
          maxFee: {
            tokenId: TOKEN_INFO.tokenMap["LRC"].tokenId,
            volume: fee.fees["LRC"].fee ?? "9400000000000000000",
          },
          keySeed,
          validUntil: LOOPRING_EXPORTED_ACCOUNT.validUntil,
          nonce: accInfo.nonce as number,
        },
        web3,
        chainId: sdk.ChainId.GOERLI,
        walletType: sdk.ConnectorNames.Unknown,
        isHWAddr: false,
      });

      const { accInfo: updateAccountInfo } =
        await LoopringAPI.exchangeAPI.getAccount({
          owner: LOOPRING_EXPORTED_ACCOUNT.address,
        });
      console.log(
        "updateAccount Result: ",
        result,
        "updateAccountInfo:",
        updateAccountInfo,
        "keySeed:",
        updateAccountInfo.keySeed
      );
    },
    DEFAULT_TIMEOUT * 2
  );
});
