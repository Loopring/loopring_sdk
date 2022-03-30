import {
  DEFAULT_TIMEOUT,
  LOOPRING_EXPORTED_ACCOUNT as acc,
  LOOPRING_EXPORTED_ACCOUNT,
  LoopringAPI,
  TOKEN_INFO,
  web3,
} from "../data";
import { ChainId } from "../../defs";
import { sleep } from "../../utils";
import * as contract from "../../api/contract_api";

describe("contract test", function () {
  beforeEach(() => {
    LoopringAPI.InitApi(ChainId.GOERLI);
  });
  it(
    "approveMax_LRC",
    async () => {
      const nonce = await LoopringAPI.contractAPI.getNonce(web3, acc.address);
      await sleep(200);
      const response = await contract.approveMax(
        web3,
        acc.address,
        TOKEN_INFO.tokenMap.LRC.address,
        LOOPRING_EXPORTED_ACCOUNT.depositAddr,
        LOOPRING_EXPORTED_ACCOUNT.gasPrice,
        LOOPRING_EXPORTED_ACCOUNT.gasLimit,
        ChainId.GOERLI,
        nonce,
        true
      );

      console.log(`nonce: ${nonce} approveMax: ${JSON.stringify(response)}`);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "approveZero_LRC",
    async () => {
      const nonce = await LoopringAPI.contractAPI.getNonce(web3, acc.address);
      const response = await LoopringAPI.contractAPI.approveZero(
        web3,
        LOOPRING_EXPORTED_ACCOUNT.address,
        TOKEN_INFO.tokenMap.LRC.address,
        LOOPRING_EXPORTED_ACCOUNT.depositAddr,
        LOOPRING_EXPORTED_ACCOUNT.gasPrice,
        LOOPRING_EXPORTED_ACCOUNT.gasLimit,
        ChainId.GOERLI,
        nonce,
        true
      );

      console.log(`nonce: ${nonce} approveZero: ${response}`);
    },
    DEFAULT_TIMEOUT
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
        tokenAllowances[TOKEN_INFO.tokenMap.LRC.address] === undefined ||
        Number(tokenAllowances[TOKEN_INFO.tokenMap.LRC.address]) <
          LOOPRING_EXPORTED_ACCOUNT.tradeLRCValue
      ) {
        const nonce = await web3.eth.getTransactionCount(
          LOOPRING_EXPORTED_ACCOUNT.address
        );
        const response = await LoopringAPI.contractAPI.approveMax(
          web3,
          LOOPRING_EXPORTED_ACCOUNT.address,
          TOKEN_INFO.tokenMap.LRC.address, // LRC address  {tokenIdMap} = getTokens();  tokenIdMap['LRC']
          LOOPRING_EXPORTED_ACCOUNT.depositAddr, //{exchangeInfo} = getExchangeInfo()  exchangeInfo.depositAddress
          LOOPRING_EXPORTED_ACCOUNT.gasPrice,
          LOOPRING_EXPORTED_ACCOUNT.gasLimit,
          ChainId.GOERLI,
          nonce,
          true
        );
      }

      const nonce = await LoopringAPI.contractAPI.getNonce(
        web3,
        LOOPRING_EXPORTED_ACCOUNT.address
      );
      const response = await LoopringAPI.contractAPI.deposit(
        web3,
        acc.address,
        acc.exchangeAddr,
        TOKEN_INFO.tokenMap.LRC,
        LOOPRING_EXPORTED_ACCOUNT.tradeLRCValue,
        0,
        LOOPRING_EXPORTED_ACCOUNT.gasPrice,
        LOOPRING_EXPORTED_ACCOUNT.gasLimit,
        ChainId.GOERLI,
        nonce,
        true
      );

      console.log(`nonce: ${nonce} deposit_LRC: `, response);
    },
    DEFAULT_TIMEOUT * 3
  );

  it(
    "deposit_ETH",
    async () => {
      const nonce = await LoopringAPI.contractAPI.getNonce(
        web3,
        LOOPRING_EXPORTED_ACCOUNT.address
      );
      const response = await LoopringAPI.contractAPI.deposit(
        web3,
        acc.address,
        acc.exchangeAddr,
        TOKEN_INFO.tokenMap.ETH,
        LOOPRING_EXPORTED_ACCOUNT.tradeETHValue,
        0,
        LOOPRING_EXPORTED_ACCOUNT.gasPrice,
        LOOPRING_EXPORTED_ACCOUNT.gasLimit,
        ChainId.GOERLI,
        nonce,
        true
      );

      console.log(`nonce: ${nonce} deposit_LRC: `, response);
    },
    DEFAULT_TIMEOUT * 3
  );
});
