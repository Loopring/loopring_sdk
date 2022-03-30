import { ChainId, ConnectorNames } from "../../defs/web3_defs";
import { get_EddsaSig_NFT_Transfer } from "../../api";

import {
  GetNextStorageIdRequest,
  GetNFTOffchainFeeAmtRequest,
  GetUserApiKeyRequest,
  OriginNFTTransferRequestV3,
} from "../../defs/loopring_defs";

const PrivateKeyProvider = require("truffle-privatekey-provider");

import Web3 from "web3";
import {
  DEFAULT_TIMEOUT,
  LOOPRING_EXPORTED_ACCOUNT,
  LoopringAPI,
  TOKEN_INFO,
} from "../data";
import * as sign_tools from "../../api/sign/sign_tools";
import { OffchainNFTFeeReqType } from "../../defs";
import { BaseAPI } from "../../api/base_api";

describe("Transfer NFTAction test", function () {
  beforeEach(async () => {
    LoopringAPI.InitApi(ChainId.GOERLI);
  });

  it(
    "get_EddsaSig_NFT_Transfer",
    async () => {
      const request: OriginNFTTransferRequestV3 = {
        exchange: LOOPRING_EXPORTED_ACCOUNT.exchangeAddr,
        fromAccountId: 10503,
        fromAddress: LOOPRING_EXPORTED_ACCOUNT.address,
        toAccountId: 10758,
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
        validUntil: 1667396982,
        // memo: '',
      };
      const result = get_EddsaSig_NFT_Transfer(request, "");
      console.log(`resultHash:`, result);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "submitNFTInTransfer",
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
      const eddsaKey = await sign_tools.generateKeyPair({
        web3,
        address: accInfo.owner,
        keySeed: BaseAPI.KEY_MESSAGE.replace(
          "${exchangeAddress}",
          LOOPRING_EXPORTED_ACCOUNT.exchangeAddr
        ).replace("${nonce}", (accInfo.nonce - 1).toString()),
        walletType: ConnectorNames.MetaMask,
        chainId: ChainId.GOERLI,
      });

      const request: GetUserApiKeyRequest = {
        accountId: accInfo.accountId,
      };

      const { apiKey } = await LoopringAPI.userAPI.getUserApiKey(
        request,
        eddsaKey.sk
      );
      console.log(apiKey);

      const request2: GetNextStorageIdRequest = {
        accountId: accInfo.accountId,
        sellTokenId: 1,
      };

      const storageId = await LoopringAPI.userAPI.getNextStorageId(
        request2,
        apiKey
      );

      const requestFee: GetNFTOffchainFeeAmtRequest = {
        accountId: accInfo.accountId,
        // tokenAddress: LOOPRING_EXPORTED_ACCOUNT.nftTokenAddress,
        requestType: OffchainNFTFeeReqType.NFT_TRANSFER,
        amount: "0",
      };
      const responseFee = await LoopringAPI.userAPI.getNFTOffchainFeeAmt(
        requestFee,
        apiKey
      );

      const request3: OriginNFTTransferRequestV3 = {
        exchange: LOOPRING_EXPORTED_ACCOUNT.exchangeAddr,
        fromAccountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
        fromAddress: LOOPRING_EXPORTED_ACCOUNT.address,
        toAccountId: 0, // toAccountId is not required, input 0 as default
        toAddress: LOOPRING_EXPORTED_ACCOUNT.address2,
        token: {
          tokenId: LOOPRING_EXPORTED_ACCOUNT.nftTokenId,
          nftData: LOOPRING_EXPORTED_ACCOUNT.nftData,
          amount: "1",
        },
        maxFee: {
          tokenId:
            // @ts-ignore
            TOKEN_INFO.tokenMap[responseFee.fees[1]?.token?.toString() ?? "LRC"]
              .tokenId,
          amount: responseFee.fees[1]?.fee ?? "9400000000000000000",
        },
        storageId: storageId.offchainId,
        validUntil: 1667396982,
        // memo: '',
      };

      const response = await LoopringAPI.userAPI.submitNFTInTransfer({
        request: request3,
        web3,
        chainId: ChainId.GOERLI,
        walletType: ConnectorNames.Unknown,
        eddsaKey: eddsaKey.sk,
        apiKey,
      });
      console.log("response:", response);
    },
    DEFAULT_TIMEOUT
  );
});
