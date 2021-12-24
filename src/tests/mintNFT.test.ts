import { ChainId, ConnectorNames } from "../defs/web3_defs";
import { ExchangeAPI, UserAPI, WhitelistedUserAPI } from "../api";

import { dumpError400 } from "../utils/network_tools";

import {
  GetNextStorageIdRequest,
  GetUserApiKeyRequest,
  NFTMintRequestV3,
} from "../defs/loopring_defs";

import { DEFAULT_TIMEOUT, VALID_UNTIL } from "../defs/loopring_constants";

import * as sign_tools from "../api/sign/sign_tools";
import Web3 from "web3";
import { loopring_exported_account } from "./utils";

const PrivateKeyProvider = require("truffle-privatekey-provider");

let userApi: UserAPI;

let whitelistedUserApi: WhitelistedUserAPI;

let exchange: ExchangeAPI;

const nftId =
  "0x0000000000000000000000000000000000000000000000000000000000000096";
describe("Mint test", function () {
  beforeEach(async () => {
    userApi = new UserAPI({ chainId: ChainId.GOERLI });
    exchange = new ExchangeAPI({ chainId: ChainId.GOERLI });
    whitelistedUserApi = new WhitelistedUserAPI({ chainId: ChainId.GOERLI });
  });

  it(
    "submitNFTMint",
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
          exchangeAddress: exchangeInfo.exchangeAddress,
          keyNonce: accInfo.nonce - 1,
          walletType: ConnectorNames.MetaMask,
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

        const request3: NFTMintRequestV3 = {
          exchange: exchangeInfo.exchangeAddress,
          minterId: accInfo.accountId,
          minterAddress: accInfo.owner,
          toAccountId: accInfo.accountId,
          toAddress: accInfo.owner,
          nftType: 0,
          tokenAddress: loopring_exported_account.nftTokenAddress,
          nftId: nftId, //nftId.toString(16),
          amount: "500",
          validUntil: VALID_UNTIL,
          storageId: storageId.offchainId ?? 9,
          maxFee: {
            tokenId: 1,
            amount: "9400000000000000000",
          },
          forceToMint: false,
        };

        const response = await userApi.submitNFTMint({
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
    DEFAULT_TIMEOUT
  );
});
