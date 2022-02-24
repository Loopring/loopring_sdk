import { ChainId, ConnectorNames, NFTFactory } from "../defs/web3_defs";
import { ExchangeAPI, NFTAPI, UserAPI, WhitelistedUserAPI } from "../api";

import { dumpError400 } from "../utils/network_tools";

import {
  GetNextStorageIdRequest,
  GetUserApiKeyRequest,
  NFTOrderRequestV3
} from "../defs/loopring_defs";

import { DEFAULT_TIMEOUT, VALID_UNTIL } from "../defs/loopring_constants";

import * as sign_tools from "../api/sign/sign_tools";
import Web3 from "web3";
import { loopring_exported_account } from "./utils";
import { BaseAPI } from "../api/base_api";
import { myLog } from "../utils/log_tools";

const PrivateKeyProvider = require("truffle-privatekey-provider");

let userApi: UserAPI;
let nftAPI: NFTAPI;

let exchange: ExchangeAPI;
const nftTokenId = 2;
const nftData = "";

// prepare: account need minted some NFT before test
describe("NFT Validate Order Test", function () {
  beforeEach(async () => {
    userApi = new UserAPI({ chainId: ChainId.GOERLI });
    exchange = new ExchangeAPI({ chainId: ChainId.GOERLI });
    nftAPI = new NFTAPI({ chainId: ChainId.GOERLI });
  });

  it(
    "validateNftOrder",
    async () => {
      try {
        // step 0. init web3
        const provider = new PrivateKeyProvider(
          loopring_exported_account.privateKey,
          "https://goerli.infura.io/v3/a06ed9c6b5424b61beafff27ecc3abf3"
        );
        const web3 = new Web3(provider);

        // step 1. get account info
        const { accInfo } = await exchange.getAccount({
          owner: loopring_exported_account.address,
        });

        if (!accInfo) {
          return;
        }

        const { exchangeInfo } = await exchange.getExchangeInfo();

        console.log("accInfo:", accInfo);

        const eddsakey = await sign_tools.generateKeyPair({
          web3,
          address: accInfo.owner,
          keySeed: BaseAPI.KEY_MESSAGE.replace(
            "${exchangeAddress}",
            exchangeInfo.exchangeAddress
          ).replace("${nonce}", (accInfo.nonce - 1).toString()),
          // exchangeAddress: exchangeInfo.exchangeAddress,
          // keyNonce: accInfo.nonce - 1,
          walletType: ConnectorNames.MetaMask,
          chainId: ChainId.GOERLI,
        });

        console.log("eddsakey:", eddsakey.sk);

        // step 3 get apikey
        const request: GetUserApiKeyRequest = {
          accountId: accInfo.accountId,
        };

        let { apiKey } = await userApi.getUserApiKey(request, eddsakey.sk);
        apiKey = apiKey ?? loopring_exported_account.apiKey;

        console.log(apiKey);
        // step 4 get storageId
        const request2: GetNextStorageIdRequest = {
          accountId: accInfo.accountId,
          sellTokenId: 1,
        };

        const storageId = await userApi.getNextStorageId(request2, apiKey);
        // let hash: any = new BN(nftId,'hex')
        // hash = toHex(hash);//new BigInteger(sha256(nftId.toString()).toString(), 16)

        const request3: NFTOrderRequestV3 = {
          exchange: exchangeInfo.exchangeAddress,
          accountId: accInfo.accountId,
          storageId: storageId.orderId,
          sellToken: {
            tokenId: nftTokenId,
            nftData: nftData,
            amount: "1"
          },
          buyToken: {
            tokenId: 1,
            amount: "10000000000000"
          },
          allOrNone: false,
          fillAmountBOrS: false,
          validUntil: VALID_UNTIL,
          maxFeeBips: 80
        };

        const response = await userApi.submitNFTValidateOrder({
          request: request3,
          web3,
          chainId: ChainId.GOERLI,
          walletType: ConnectorNames.Unknown,
          eddsaKey: eddsakey.sk,
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
