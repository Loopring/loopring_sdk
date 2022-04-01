import { ChainId, ConnectorNames } from "../../../defs/web3_defs";
import { get_EddsaSig_OffChainWithdraw } from "../../../api";

import {
  GetNextStorageIdRequest,
  GetOffchainFeeAmtRequest,
  GetUserApiKeyRequest,
  OffChainWithdrawalRequestV3,
} from "../../../defs/loopring_defs";

const PrivateKeyProvider = require("truffle-privatekey-provider");

import Web3 from "web3";
import {
  DEFAULT_TIMEOUT,
  LOOPRING_EXPORTED_ACCOUNT as acc,
  LOOPRING_EXPORTED_ACCOUNT,
  LoopringAPI,
  TOKEN_INFO,
  web3,
} from "../../data";
import * as sign_tools from "../../../api/sign/sign_tools";
import { OffchainFeeReqType } from "../../../defs";
import { BaseAPI } from "../../../api/base_api";

describe("Withdraw NFTAction test", function () {
  beforeEach(async () => {
    LoopringAPI.InitApi(ChainId.GOERLI);
  });

  it(
    "get_EddsaSig_Withdraw",
    async () => {
      const { accInfo } = await LoopringAPI.exchangeAPI.getAccount({
        owner: LOOPRING_EXPORTED_ACCOUNT.address,
      });
      if (!accInfo) {
        return;
      }
      /*
       * @replace LOOPRING_EXPORTED_ACCOUNT.exchangeAddress =  exchangeInfo.exchangeAddress
       */
      const { exchangeInfo } = await LoopringAPI.exchangeAPI.getExchangeInfo();

      const request: OffChainWithdrawalRequestV3 = {
        exchange: exchangeInfo.exchangeAddress,
        accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
        counterFactualInfo: undefined,
        fastWithdrawalMode: false,
        hashApproved: "",
        maxFee: {
          tokenId: 1,
          volume: "100000000000000000000",
        },
        minGas: 0,
        owner: LOOPRING_EXPORTED_ACCOUNT.address,
        to: LOOPRING_EXPORTED_ACCOUNT.address,
        storageId: 0,
        token: {
          tokenId: 1,
          volume: "100000000000000000000",
        },
        validUntil: 0,
      };

      const result = get_EddsaSig_OffChainWithdraw(request, "");
      console.log(`resultHash:`, result);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "submitNFTWithdraw",
    async () => {
      const provider = new PrivateKeyProvider(
        LOOPRING_EXPORTED_ACCOUNT.privateKey,
        "https://goerli.infura.io/v3/a06ed9c6b5424b61beafff27ecc3abf3"
      );
      const web3 = new Web3(provider);
      const { accInfo } = await LoopringAPI.exchangeAPI.getAccount({
        owner: LOOPRING_EXPORTED_ACCOUNT.address,
      });
      if (!accInfo) {
        return;
      }
      /*
       * @replace LOOPRING_EXPORTED_ACCOUNT.exchangeAddress =  exchangeInfo.exchangeAddress
       */
      const { exchangeInfo } = await LoopringAPI.exchangeAPI.getExchangeInfo();

      const eddsaKey = await sign_tools.generateKeyPair({
        web3,
        address: accInfo.owner,
        keySeed: BaseAPI.KEY_MESSAGE.replace(
          "${exchangeAddress}",
          LOOPRING_EXPORTED_ACCOUNT.exchangeAddress
        ).replace("${nonce}", (accInfo.nonce - 1).toString()),
        // exchangeAddress: exchangeInfo.exchangeAddress,
        // keyNonce: accInfo.nonce,
        walletType: ConnectorNames.MetaMask,
        chainId: ChainId.GOERLI,
      });
      console.log("eddsakey:", eddsaKey.sk);
      const request: GetUserApiKeyRequest = {
        accountId: accInfo.accountId,
      };

      let { apiKey } = await LoopringAPI.userAPI.getUserApiKey(
        request,
        eddsaKey.sk
      );
      console.log("apiKey", apiKey);

      const request2: GetNextStorageIdRequest = {
        accountId: accInfo.accountId,
        sellTokenId: 1,
      };

      const storageId = await LoopringAPI.userAPI.getNextStorageId(
        request2,
        apiKey
      );
      console.log("storageId", storageId);
      const requestFee: GetOffchainFeeAmtRequest = {
        accountId: accInfo.accountId,
        tokenSymbol: "LRC",
        // tokenAddress: LOOPRING_EXPORTED_ACCOUNT.nftTokenAddress,
        requestType: OffchainFeeReqType.OFFCHAIN_WITHDRAWAL,
        // amount: "0",
      };
      const responseFee = await LoopringAPI.userAPI.getNFTOffchainFeeAmt(
        requestFee,
        apiKey
      );

      console.log("requestFee", responseFee);

      const request3: OffChainWithdrawalRequestV3 = {
        exchange: exchangeInfo.exchangeAddress,
        accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
        counterFactualInfo: undefined,
        fastWithdrawalMode: false,
        hashApproved: "",
        maxFee: {
          tokenId:
            // @ts-ignore
            TOKEN_INFO.tokenMap[responseFee.fees[1]?.token?.toString() ?? "LRC"]
              .tokenId,
          volume: responseFee.fees[1]?.fee ?? "9400000000000000000",
        },
        minGas: 0,
        owner: LOOPRING_EXPORTED_ACCOUNT.address,
        to: LOOPRING_EXPORTED_ACCOUNT.address,
        storageId: 0,
        token: {
          tokenId: 1,
          volume: "1011000000000000000000",
        },
        validUntil: 0,
      };

      const response = await LoopringAPI.userAPI.submitOffchainWithdraw({
        request: request3,
        web3,
        chainId: ChainId.GOERLI,
        walletType: ConnectorNames.Trezor,
        eddsaKey: eddsaKey.sk,
        apiKey,
      });
      console.log("response:", response);
    },
    DEFAULT_TIMEOUT + 2000
  );
  it(
    "forceWithdrawal",
    async () => {
      const nonce = await LoopringAPI.contractAPI.getNonce(web3, acc.address);
      const response = await LoopringAPI.contractAPI.forceWithdrawal(
        web3,
        acc.address,
        acc.accountId,
        acc.exchangeAddress,
        TOKEN_INFO.tokenMap.ETH,
        0,
        LOOPRING_EXPORTED_ACCOUNT.gasPrice,
        LOOPRING_EXPORTED_ACCOUNT.gasLimit,
        ChainId.GOERLI,
        nonce,
        true
      );

      console.log(`nonce: ${nonce} deposit_ETH: ${response}`);
    },
    DEFAULT_TIMEOUT
  );
});
