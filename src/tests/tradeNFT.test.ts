import { ChainId, ConnectorNames, NFTFactory } from "../defs/web3_defs";
import { ExchangeAPI, NFTAPI, UserAPI, WhitelistedUserAPI } from "../api";

import { dumpError400 } from "../utils/network_tools";

import {
  GetNextStorageIdRequest,
  GetUserApiKeyRequest,
  NFTOrderRequestV3,
  NFTTradeRequestV3,
} from "../defs/loopring_defs";

import { DEFAULT_TIMEOUT, VALID_UNTIL } from "../defs/loopring_constants";

import * as sign_tools from "../api/sign/sign_tools";
import Web3 from "web3";
import { loopring_exported_account } from "./utils";
import { BaseAPI } from "../api/base_api";

const PrivateKeyProvider = require("truffle-privatekey-provider");

let userApi: UserAPI;
let nftAPI: NFTAPI;
let provider: any;
let provider2: any;
let exchange: ExchangeAPI;
// Need fill test data before test
const nftTokenId = 2;
const nftData = "";

// prepare: account need minted some NFT before test
describe("NFT Trade Test", function () {
  beforeEach(async () => {
    userApi = new UserAPI({ chainId: ChainId.GOERLI });
    exchange = new ExchangeAPI({ chainId: ChainId.GOERLI });
    nftAPI = new NFTAPI({ chainId: ChainId.GOERLI });
    provider = new PrivateKeyProvider(
      loopring_exported_account.privateKey,
      "https://goerli.infura.io/v3/a06ed9c6b5424b61beafff27ecc3abf3"
    );
    provider2 = new PrivateKeyProvider(
      loopring_exported_account.privateKey2,
      "https://goerli.infura.io/v3/a06ed9c6b5424b61beafff27ecc3abf3"
    );
  });

  it(
    "NFTTrade",
    async () => {
      try {
        // step 0. init web3
        const web3 = new Web3(provider);
        const web3_2 = new Web3(provider2);

        // step 1. get account info
        const { accInfo } = await exchange.getAccount({
          owner: loopring_exported_account.address,
        });

        if (!accInfo) {
          return;
        }

        const { accInfo: accInfo2 } = await exchange.getAccount({
          owner: loopring_exported_account.address2,
        });

        if (!accInfo2) {
          return;
        }
        console.log("accInfo2:", accInfo2);

        const { exchangeInfo } = await exchange.getExchangeInfo();

        const eddsakey_1 = await sign_tools.generateKeyPair({
          web3,
          address: accInfo.owner,
          keySeed: BaseAPI.KEY_MESSAGE.replace(
            "${exchangeAddress}",
            exchangeInfo.exchangeAddress
          ).replace("${nonce}", (accInfo.nonce - 1).toString()),
          walletType: ConnectorNames.MetaMask,
          chainId: ChainId.GOERLI,
        });

        console.log("eddsakey:", eddsakey_1.sk);
        const eddsakey_2 = await sign_tools.generateKeyPair({
          web3: web3_2,
          address: accInfo2.owner,
          keySeed: BaseAPI.KEY_MESSAGE.replace(
            "${exchangeAddress}",
            exchangeInfo.exchangeAddress
          ).replace("${nonce}", (accInfo.nonce - 1).toString()),
          walletType: ConnectorNames.MetaMask,
          chainId: ChainId.GOERLI,
        });

        console.log("eddsakey2:", eddsakey_2.sk);

        // step 3 get apikey
        const request: GetUserApiKeyRequest = {
          accountId: accInfo.accountId,
        };

        const { apiKey } = await userApi.getUserApiKey(request, eddsakey_1.sk);
        console.log("apiKey1:", apiKey);

        const requestApikey2: GetUserApiKeyRequest = {
          accountId: accInfo2.accountId,
        };

        const apiKey2 = await userApi.getUserApiKey(
          requestApikey2,
          eddsakey_2.sk
        );
        console.log("apiKey2:", apiKey2);

        // step 4 get storageId
        const request2: GetNextStorageIdRequest = {
          accountId: accInfo.accountId,
          sellTokenId: 1,
        };

        const storageId = await userApi.getNextStorageId(request2, apiKey);

        const requestSid2: GetNextStorageIdRequest = {
          accountId: accInfo2.accountId,
          sellTokenId: 1,
        };

        const storageId2 = await userApi.getNextStorageId(requestSid2, apiKey);

        const makerOrder: NFTOrderRequestV3 = {
          exchange: exchangeInfo.exchangeAddress,
          accountId: accInfo.accountId,
          storageId: storageId.orderId,
          sellToken: {
            tokenId: nftTokenId,
            nftData: nftData,
            amount: "1",
          },
          buyToken: {
            tokenId: 1,
            amount: "10000000000000",
          },
          allOrNone: false,
          fillAmountBOrS: false,
          validUntil: VALID_UNTIL,
          maxFeeBips: 80,
        };

        makerOrder.eddsaSignature = sign_tools.get_EddsaSig_NFT_Order(
          makerOrder,
          eddsakey_1.sk
        );

        const takerOrder: NFTOrderRequestV3 = {
          exchange: exchangeInfo.exchangeAddress,
          accountId: accInfo2.accountId,
          storageId: storageId2.orderId,
          sellToken: {
            tokenId: 1,
            amount: "10000000000000",
          },
          buyToken: {
            tokenId: nftTokenId,
            nftData: nftData,
            amount: "1",
          },
          allOrNone: false,
          fillAmountBOrS: false,
          validUntil: VALID_UNTIL,
          maxFeeBips: 80,
        };

        takerOrder.eddsaSignature = sign_tools.get_EddsaSig_NFT_Order(
          takerOrder,
          eddsakey_2.sk
        );

        const tradeRequest: NFTTradeRequestV3 = {
          maker: makerOrder,
          makerFeeBips: 80,
          taker: takerOrder,
          takerFeeBips: 80,
        };

        const response = await userApi.submitNFTTrade({
          request: tradeRequest,
          web3,
          chainId: ChainId.GOERLI,
          walletType: ConnectorNames.Unknown,
          eddsaKey: eddsakey_1.sk,
          apiKey: apiKey,
        });

        console.log(response);
      } catch (reason) {
        dumpError400(reason);
      }
    },
    DEFAULT_TIMEOUT + DEFAULT_TIMEOUT
  );
});
