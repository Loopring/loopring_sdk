import { ChainId, ConnectorNames } from "../../defs/web3_defs";
import { get_EddsaSig_NFT_Withdraw } from "../../api";

import {
  GetNextStorageIdRequest,
  GetNFTOffchainFeeAmtRequest,
  GetUserApiKeyRequest,
  NFTWithdrawRequestV3,
} from "../../defs/loopring_defs";

import { DEFAULT_TIMEOUT } from "../../defs/loopring_constants";

const PrivateKeyProvider = require("truffle-privatekey-provider");

import Web3 from "web3";
import { LOOPRING_EXPORTED_ACCOUNT, LoopringAPI, TOKEN_INFO } from "../data";
import * as sign_tools from "../../api/sign/sign_tools";
import { OffchainNFTFeeReqType } from "../../defs";
import { BaseAPI } from "../../api/base_api";

describe("Withdraw NFTAction test", function () {
  beforeEach(async () => {
    LoopringAPI.InitApi(ChainId.GOERLI);
  });

  it(
    "get_EddsaSig_NFT_Withdraw",
    async () => {
      const { accInfo } = await LoopringAPI.exchangeAPI.getAccount({
        owner: LOOPRING_EXPORTED_ACCOUNT.address,
      });
      if (!accInfo) {
        return;
      }
      /*
       * @replace LOOPRING_EXPORTED_ACCOUNT.exchangeAddr =  exchangeInfo.exchangeAddress
       */
      const { exchangeInfo } = await LoopringAPI.exchangeAPI.getExchangeInfo();

      const request: NFTWithdrawRequestV3 = {
        minGas: 0,
        exchange: exchangeInfo.exchangeAddress,
        accountId: accInfo.accountId,
        to: accInfo.owner,
        owner: accInfo.owner,
        token: {
          tokenId: 32788,
          nftData:
            "0x05f797e055ca832ca441ff3a5de6e384af01b35ba764f9146979ff4e7f2fa832",
          amount: "1",
        },
        maxFee: {
          tokenId: 2,
          amount: "311000000000000000000",
        },
        storageId: 9,
        validUntil: 1667396982,
      };

      const result = get_EddsaSig_NFT_Withdraw(request, "");
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
       * @replace LOOPRING_EXPORTED_ACCOUNT.exchangeAddr =  exchangeInfo.exchangeAddress
       */
      const { exchangeInfo } = await LoopringAPI.exchangeAPI.getExchangeInfo();

      const eddsaKey = await sign_tools.generateKeyPair({
        web3,
        address: accInfo.owner,
        keySeed: BaseAPI.KEY_MESSAGE.replace(
          "${exchangeAddress}",
          LOOPRING_EXPORTED_ACCOUNT.exchangeAddr
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
      const requestFee: GetNFTOffchainFeeAmtRequest = {
        accountId: accInfo.accountId,
        tokenAddress: LOOPRING_EXPORTED_ACCOUNT.nftTokenAddress,
        requestType: OffchainNFTFeeReqType.NFT_WITHDRAWAL,
        amount: "0",
      };
      const responseFee = await LoopringAPI.userAPI.getNFTOffchainFeeAmt(
        requestFee,
        apiKey
      );

      console.log("requestFee", responseFee);

      const request3: NFTWithdrawRequestV3 = {
        minGas: 0,
        exchange: exchangeInfo.exchangeAddress,
        accountId: accInfo.accountId,
        to: accInfo.owner,
        owner: accInfo.owner,
        token: {
          tokenId: LOOPRING_EXPORTED_ACCOUNT.nftTokenId,
          nftData: LOOPRING_EXPORTED_ACCOUNT.nftData,
          amount: "1",
        },
        extraData: "",
        maxFee: {
          tokenId:
            // @ts-ignore
            TOKEN_INFO.tokenMap[responseFee.fees[1]?.token?.toString() ?? "LRC"]
              .tokenId,
          amount: responseFee.fees[1]?.fee ?? "9400000000000000000",
        },
        storageId: storageId?.offchainId ?? 9,
        validUntil: 1667396982,
      };

      const response = await LoopringAPI.userAPI.submitNFTWithdraw({
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
});
