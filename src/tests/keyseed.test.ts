import { ChainId, ConnectorNames } from "../defs/web3_defs";
import { UserAPI, ExchangeAPI, WhitelistedUserAPI } from "../api";

import { dumpError400 } from "../utils/network_tools";

import {
  GetAccountRequest,
  GetNextStorageIdRequest,
  GetUserApiKeyRequest,
  OriginTransferRequestV3,
} from "../defs/loopring_defs";

import { VALID_UNTIL, DEFAULT_TIMEOUT } from "../defs/loopring_constants";

import * as sign_tools from "../api/sign/sign_tools";
import { getTokenInfoBySymbol } from "../utils";

const PrivateKeyProvider = require("truffle-privatekey-provider");

import Web3 from "web3";
import { loopring_exported_account } from "./utils";
import { BaseAPI } from "../api/base_api";

let userApi: UserAPI;

let exchange: ExchangeAPI;

const keySeedAddress = "0x35405E1349658BcA12810d0f879Bf6c5d89B512C";

const keySeedPrivateKey =
  "ada29a473e2b777403e7d2dc3876c5be03ca6b60d97e37e9bd335b1ce05a2680";

describe("KeySeed test", function () {
  beforeEach(async () => {
    userApi = new UserAPI({ chainId: ChainId.GOERLI });
    exchange = new ExchangeAPI({ chainId: ChainId.GOERLI });
  });

  // make sure the address open account before
  it(
    "Set KeySeed with default string",
    async () => {
      try {
        // step 0. init web3
        const provider = new PrivateKeyProvider(
          keySeedPrivateKey,
          "https://goerli.infura.io/v3/a06ed9c6b5424b61beafff27ecc3abf3"
        );
        const web3 = new Web3(provider);

        const { accInfo } = await exchange.getAccount({
          owner: keySeedAddress,
        });

        if (!accInfo) {
          return;
        }

        // reset account use the nonce in account response
        let nonce = accInfo.nonce;

        console.log("accountInfo: ", accInfo);

        let keySeed = BaseAPI.KEY_MESSAGE.replace(
          "${exchangeAddress}",
          loopring_exported_account.exchangeAddr
        ).replace("${nonce}", (nonce).toString());

        console.log("keySeed is: ", keySeed);

        const eddsakey = await sign_tools.generateKeyPair({
          web3,
          address: keySeedAddress,
          keySeed: keySeed,
          walletType: ConnectorNames.MetaMask,
          chainId: ChainId.GOERLI,
        });

        console.log("generated post account eddsakey: ", eddsakey.sk);

        const request = {
          exchange: loopring_exported_account.exchangeAddr,
          owner: keySeedAddress,
          accountId: accInfo.accountId,
          publicKey: { x: eddsakey.formatedPx, y: eddsakey.formatedPy },
          // TODO: fixed fee here, need get fee by /api/v3/user/offchainFee with requestType = 2
          maxFee: {
            tokenId: 0,
            volume: "100000000000000000",
          },
          validUntil: VALID_UNTIL,
          nonce: nonce as number,
          keySeed: keySeed
        };
        const result = await userApi.updateAccount({
          request,
          web3,
          chainId: ChainId.GOERLI,
          walletType: ConnectorNames.Unknown,
          isHWAddr: false,
        });
        console.log("updateAccount result: ", JSON.stringify(result));
      } catch (reason) {
        dumpError400(reason);
      }
    },
    DEFAULT_TIMEOUT
  );

  it(
    "Set KeySeed with custom string",
    async () => {
      try {
        // step 0. init web3
        const provider = new PrivateKeyProvider(
          keySeedPrivateKey,
          "https://goerli.infura.io/v3/a06ed9c6b5424b61beafff27ecc3abf3"
        );
        const web3 = new Web3(provider);

        const { accInfo } = await exchange.getAccount({
          owner: keySeedAddress,
        });

        if (!accInfo) {
          return;
        }

        // reset account use the nonce in account response
        let nonce = accInfo.nonce;

        console.log("accountInfo: ", accInfo);

        // use custom msg to generate keyseed, must ends with 'with key nonce: {nonce}'
        let keySeed = BaseAPI.CUSTOM_KEY_MESSAGE.replace(
          "${customMessage}",
          "Sign this message to access XXX Website"
        ).replace("${nonce}", (nonce).toString());

        console.log("keySeed is: ", keySeed);

        const eddsakey = await sign_tools.generateKeyPair({
          web3,
          address: keySeedAddress,
          keySeed: keySeed,
          walletType: ConnectorNames.MetaMask,
          chainId: ChainId.GOERLI,
        });

        console.log("generated post account eddsakey: ", eddsakey.sk);

        const request = {
          exchange: loopring_exported_account.exchangeAddr,
          owner: keySeedAddress,
          accountId: accInfo.accountId,
          publicKey: { x: eddsakey.formatedPx, y: eddsakey.formatedPy },
          // TODO: fixed fee here, need get fee by /api/v3/user/offchainFee with requestType = 2
          maxFee: {
            tokenId: 0,
            volume: "100000000000000000",
          },
          validUntil: VALID_UNTIL,
          nonce: nonce as number,
          keySeed: keySeed
        };
        const result = await userApi.updateAccount({
          request,
          web3,
          chainId: ChainId.GOERLI,
          walletType: ConnectorNames.Unknown,
          isHWAddr: false,
        });
        console.log("updateAccount result: ", JSON.stringify(result));
      } catch (reason) {
        dumpError400(reason);
      }
    },
    DEFAULT_TIMEOUT
  );

  it(
    "Get KeySeed",
    async () => {
      try {
        // step 0. init web3
        const provider = new PrivateKeyProvider(
          keySeedPrivateKey,
          "https://goerli.infura.io/v3/a06ed9c6b5424b61beafff27ecc3abf3"
        );
        const web3 = new Web3(provider);

        const { accInfo } = await exchange.getAccount({
          owner: keySeedAddress,
        });

        if (!accInfo) {
          console.log("get account error");
          return;
        }

        console.log("get account: ", accInfo);

        const apiKeyRequest: GetUserApiKeyRequest = {
          accountId: accInfo.accountId,
        };
      
        let keySeed = accInfo.keySeed;
        // if keySeed is empty use default keyseed string
        if (!keySeed) {
          let nonce = 0;
          // generate local eddsaKey use server nonce - 1
          if (accInfo && accInfo.nonce >= 1) {
            nonce = accInfo.nonce - 1
          }
          keySeed = BaseAPI.KEY_MESSAGE.replace(
            "${exchangeAddress}",
            loopring_exported_account.exchangeAddr
          ).replace("${nonce}", (nonce).toString())
        }

        const eddsakey2 = await sign_tools.generateKeyPair({
          web3,
          address: keySeedAddress,
          keySeed: keySeed,
          walletType: ConnectorNames.MetaMask,
          chainId: ChainId.GOERLI,
        });

        const response = await userApi.getUserApiKey(apiKeyRequest, eddsakey2.sk);
        console.log("get apiKey result: ", response);
      } catch (reason) {
        dumpError400(reason);
      }
    },
    DEFAULT_TIMEOUT
  );
});
