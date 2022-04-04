import {
  DEFAULT_TIMEOUT,
  LOOPRING_EXPORTED_ACCOUNT,
  LoopringAPI,
  web3,
  TOKEN_INFO,
} from "../../MockData";
import * as sdk from "../../../index";
import { toBig } from "../../../index";

describe("deposit", function () {
  beforeEach(async () => {
    jest.setTimeout(DEFAULT_TIMEOUT * 3);

    LOOPRING_EXPORTED_ACCOUNT.gasPrice = (
      await LoopringAPI.exchangeAPI.getGasPrice()
    ).gasPrice;
  }, DEFAULT_TIMEOUT);

  it(
    "approveMax_LRC",
    async () => {
      const nonce = await sdk.getNonce(web3, LOOPRING_EXPORTED_ACCOUNT.address);
      const response = await sdk.approveMax(
        web3,
        LOOPRING_EXPORTED_ACCOUNT.address,
        TOKEN_INFO.tokenMap.LRC.address,
        LOOPRING_EXPORTED_ACCOUNT.depositAddress,
        LOOPRING_EXPORTED_ACCOUNT.gasPrice,
        LOOPRING_EXPORTED_ACCOUNT.gasLimit,
        sdk.ChainId.GOERLI,
        nonce,
        true
      );

      console.log(`nonce: ${nonce} approveMax: ${JSON.stringify(response)}`);
    },
    DEFAULT_TIMEOUT * 2
  );

  it(
    "approveZero_LRC",
    async () => {
      const nonce = await sdk.getNonce(web3, LOOPRING_EXPORTED_ACCOUNT.address);
      const response = await sdk.approveZero(
        web3,
        LOOPRING_EXPORTED_ACCOUNT.address,
        TOKEN_INFO.tokenMap.LRC.address,
        LOOPRING_EXPORTED_ACCOUNT.depositAddress,
        LOOPRING_EXPORTED_ACCOUNT.gasPrice,
        LOOPRING_EXPORTED_ACCOUNT.gasLimit,
        sdk.ChainId.GOERLI,
        nonce,
        true
      );

      console.log(`nonce: ${nonce} approveZero: ${response}`);
    },
    DEFAULT_TIMEOUT * 2
  );

  it(
    "deposit_LRC",
    async () => {
      // step1: getAllowances
      const { tokenAllowances } = await LoopringAPI.exchangeAPI.getAllowances({
        owner: LOOPRING_EXPORTED_ACCOUNT.address,
        token: [TOKEN_INFO.tokenMap.LRC.address],
      });
      if (
        tokenAllowances.has(TOKEN_INFO.tokenMap.LRC.address) &&
        Number(tokenAllowances.get(TOKEN_INFO.tokenMap.LRC.address)) <
          LOOPRING_EXPORTED_ACCOUNT.tradeLRCValue
      ) {
        const nonce = await web3.eth.getTransactionCount(
          LOOPRING_EXPORTED_ACCOUNT.address
        );
        await sdk.approveMax(
          web3,
          LOOPRING_EXPORTED_ACCOUNT.address,
          TOKEN_INFO.tokenMap.LRC.address, // LRC address  {tokenIdMap} = getTokens();  tokenIdMap['LRC']
          LOOPRING_EXPORTED_ACCOUNT.depositAddress, //{exchangeInfo} = getExchangeInfo()  exchangeInfo.depositAddress
          LOOPRING_EXPORTED_ACCOUNT.gasPrice,
          LOOPRING_EXPORTED_ACCOUNT.gasLimit,
          sdk.ChainId.GOERLI,
          nonce,
          true
        );
      }

      const nonce = await sdk.getNonce(web3, LOOPRING_EXPORTED_ACCOUNT.address);
      console.log(
        `deposit: ${TOKEN_INFO.tokenMap.LRC.symbol}-${LOOPRING_EXPORTED_ACCOUNT.tradeLRCValue}, gasPrice: ${LOOPRING_EXPORTED_ACCOUNT.gasPrice}, `
      );
      const response = await sdk.deposit(
        web3,
        LOOPRING_EXPORTED_ACCOUNT.address,
        LOOPRING_EXPORTED_ACCOUNT.exchangeAddress,
        TOKEN_INFO.tokenMap.LRC,
        sdk
          .toBig(LOOPRING_EXPORTED_ACCOUNT.tradeLRCValue)
          .div("1e" + TOKEN_INFO.tokenMap.LRC.decimals)
          .toNumber(),
        0,
        LOOPRING_EXPORTED_ACCOUNT.gasPrice,
        LOOPRING_EXPORTED_ACCOUNT.gasLimit,
        sdk.ChainId.GOERLI,
        nonce,
        true
      );

      console.log(`nonce: ${nonce}  deposit_LRC: `, response);
    },
    DEFAULT_TIMEOUT * 3
  );

  it(
    "deposit_ETH",
    async () => {
      const nonce = await sdk.getNonce(web3, LOOPRING_EXPORTED_ACCOUNT.address);
      console.log(
        `deposit: ${TOKEN_INFO.tokenMap.ETH.symbol}-${LOOPRING_EXPORTED_ACCOUNT.tradeETHValue}, gasPrice: ${LOOPRING_EXPORTED_ACCOUNT.gasPrice}, `
      );
      const response = await sdk.deposit(
        web3,
        LOOPRING_EXPORTED_ACCOUNT.address,
        LOOPRING_EXPORTED_ACCOUNT.exchangeAddress,
        TOKEN_INFO.tokenMap.ETH,
        LOOPRING_EXPORTED_ACCOUNT.tradeETHValue,
        0,
        LOOPRING_EXPORTED_ACCOUNT.gasPrice,
        LOOPRING_EXPORTED_ACCOUNT.gasLimit,
        sdk.ChainId.GOERLI,
        nonce,
        true
      );

      console.log(`nonce: ${nonce} deposit_ETH: `, response);
    },
    DEFAULT_TIMEOUT * 3
  );
});
