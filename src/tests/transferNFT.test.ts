import { ChainId, ConnectorNames } from "../defs/web3_defs";
import {
  UserAPI,
  ExchangeAPI,
  WhitelistedUserAPI,
  get_EddsaSig_NFT_Transfer,
} from "../api";

import {
  GetNextStorageIdRequest,
  GetNFTOffchainFeeAmtRequest,
  GetUserApiKeyRequest,
  OriginNFTTransferRequestV3,
} from "../defs/loopring_defs";

import { DEFAULT_TIMEOUT } from "../defs/loopring_constants";

const PrivateKeyProvider = require("truffle-privatekey-provider");

import Web3 from "web3";
import { loopring_exported_account } from "./utils";
import * as sign_tools from "../api/sign/sign_tools";
import { OffchainNFTFeeReqType } from "../defs";

let userApi: UserAPI;

let whitelistedUserApi: WhitelistedUserAPI;

let exchange: ExchangeAPI;

describe("Transfer NFT test", function () {
  beforeEach(async () => {
    userApi = new UserAPI({ chainId: ChainId.GOERLI });
    exchange = new ExchangeAPI({ chainId: ChainId.GOERLI });
    whitelistedUserApi = new WhitelistedUserAPI({ chainId: ChainId.GOERLI });
  });

  it(
    "get_EddsaSig_NFT_Transfer",
    async () => {
      const request: OriginNFTTransferRequestV3 = {
        exchange: "0x2e76EBd1c7c0C8e7c2B875b6d505a260C525d25e",
        fromAccountId: 10503,
        fromAddress: "0x34fb65f671f832da2078d0ad4ab1efe29bc42a5b",
        toAccountId: 10758,
        toAddress: "0x56f577f9677c8212c7079fcebfa7db5052bd1b1f",
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
        // memo: '',
      };
      const result = get_EddsaSig_NFT_Transfer(request, "");
      //0x0f48775268077434670bdba4e64c93dcbf83d8cabee98928a0791390b2a9809b
      console.log(`resultHash:`, result); // 0x0f48775268077434670bdba4e64c93dcbf83d8cabee98928a0791390b2a9809b
      // const request: GetAccountRequest = {
      //     owner: addressWhitlisted
      // }
      // const response = await exchange.getAccount(request)
      // console.log(response)
    },
    DEFAULT_TIMEOUT
  );

  it(
    "submitNFTInTransfer",
    async () => {
      const provider = new PrivateKeyProvider(
        loopring_exported_account.privateKey,
        "https://goerli.infura.io/v3/a06ed9c6b5424b61beafff27ecc3abf3"
      );
      const web3 = new Web3(provider);
      const { accInfo } = await exchange.getAccount({
        owner: loopring_exported_account.address,
      });
      if (!accInfo) {
        return;
      }
      const eddsaKey = await sign_tools.generateKeyPair({
        web3,
        address: accInfo.owner,
        exchangeAddress: loopring_exported_account.exchangeAddr,
        keyNonce: accInfo.nonce - 1,
        walletType: ConnectorNames.MetaMask,
        chainId: ChainId.GOERLI,
      });

      const request: GetUserApiKeyRequest = {
        accountId: accInfo.accountId,
      };

      const { apiKey } = await userApi.getUserApiKey(request, eddsaKey.sk);
      console.log(apiKey);

      const request2: GetNextStorageIdRequest = {
        accountId: accInfo.accountId,
        sellTokenId: 1,
      };

      const storageId = await userApi.getNextStorageId(request2, apiKey);

      const requestFee: GetNFTOffchainFeeAmtRequest = {
        accountId: accInfo.accountId,
        tokenAddress: loopring_exported_account.nftTokenAddress,
        requestType: OffchainNFTFeeReqType.NFT_TRANSFER,
        amount: "0",
      };
      const responseFee = await userApi.getNFTOffchainFeeAmt(
        requestFee,
        apiKey
      );

      const request3: OriginNFTTransferRequestV3 = {
        exchange: loopring_exported_account.exchangeAddr,
        fromAccountId: loopring_exported_account.accountId,
        fromAddress: loopring_exported_account.address,
        toAccountId: 0,
        toAddress: loopring_exported_account.addressWhitlisted,
        token: {
          tokenId: loopring_exported_account.nftTokenID,
          nftData: loopring_exported_account.nftData,
          amount: "1",
        },
        maxFee: {
          tokenId: 1,
          amount: responseFee.fees[0]?.fee ?? "3260000000000000",
        },
        storageId: storageId.offchainId,
        validUntil: 1667396982,
        // memo: '',
      };

      const response = await userApi.submitNFTInTransfer({
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
