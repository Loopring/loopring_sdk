import { ChainId, ConnectorNames } from "../../defs/web3_defs";
import { dumpError400 } from "../../utils/network_tools";
import {
  GetAccountRequest,
  GetNextStorageIdRequest,
  GetOffchainFeeAmtRequest,
  GetUserApiKeyRequest,
  OriginTransferRequestV3,
} from "../../defs/loopring_defs";

import { VALID_UNTIL } from "../../defs/loopring_constants";

import * as sign_tools from "../../api/sign/sign_tools";

const PrivateKeyProvider = require("truffle-privatekey-provider");

import Web3 from "web3";
import {
  DEFAULT_TIMEOUT,
  LOOPRING_EXPORTED_ACCOUNT,
  LoopringAPI,
  TOKEN_INFO,
} from "../data";
import { BaseAPI } from "../../api/base_api";
import { OffchainFeeReqType } from "../../defs";

describe("Transfer test", function () {
  beforeEach(async () => {
    LoopringAPI.InitApi(ChainId.GOERLI);
  });

  it(
    "getAccountWhitelisted",
    async () => {
      const request: GetAccountRequest = {
        owner: LOOPRING_EXPORTED_ACCOUNT.whitelistedAddress,
      };
      const response = await LoopringAPI.exchangeAPI.getAccount(request);
      console.log(response);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getUserApiKeyWhitelisted",
    async () => {
      try {
        // step 0. init web3
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
         * @replace LOOPRING_EXPORTED_ACCOUNT.exchangeAddr  exchangeInfo.exchangeAddress
         */
        // const { exchangeInfo } = await LoopringAPI.exchangeAPI.getExchangeInfo();

        console.log("accInfo:", accInfo);

        const eddsakey = await sign_tools.generateKeyPair({
          web3,
          address: accInfo.owner,
          keySeed: BaseAPI.KEY_MESSAGE.replace(
            "${exchangeAddress}",
            LOOPRING_EXPORTED_ACCOUNT.exchangeAddr
          ).replace("${nonce}", (accInfo.nonce - 1).toString()),
          walletType: ConnectorNames.MetaMask,
          chainId: ChainId.GOERLI,
        });

        console.log("eddsakey:", eddsakey.sk);

        const request: GetUserApiKeyRequest = {
          accountId: accInfo.accountId,
        };

        const response = await LoopringAPI.userAPI.getUserApiKey(
          request,
          eddsakey.sk
        );
        console.log(response);
      } catch (err) {
        dumpError400(err as any);
      }
    },
    DEFAULT_TIMEOUT
  );

  it(
    "submitInternalTransfer",
    async () => {
      try {
        // step 0. init web3
        const provider = new PrivateKeyProvider(
          LOOPRING_EXPORTED_ACCOUNT.privateKey,
          "https://goerli.infura.io/v3/a06ed9c6b5424b61beafff27ecc3abf3"
        );
        const web3 = new Web3(provider);

        // step 1. get account info
        const { accInfo } = await LoopringAPI.exchangeAPI.getAccount({
          owner: LOOPRING_EXPORTED_ACCOUNT.address,
        });

        if (!accInfo) {
          return;
        }

        /*
         * @replace LOOPRING_EXPORTED_ACCOUNT.exchangeAddr =  exchangeInfo.exchangeAddress
         */
        // const { exchangeInfo } = await LoopringAPI.exchangeAPI.getExchangeInfo();

        console.log("accInfo:", accInfo);

        const eddsakey = await sign_tools.generateKeyPair({
          web3,
          address: accInfo.owner,
          keySeed: BaseAPI.KEY_MESSAGE.replace(
            "${exchangeAddress}",
            LOOPRING_EXPORTED_ACCOUNT.exchangeAddr
          ).replace("${nonce}", (accInfo.nonce - 1).toString()),
          walletType: ConnectorNames.Unknown,
          chainId: ChainId.GOERLI,
        });

        console.log("eddsakey:", eddsakey.sk);

        // step 3 get apikey
        const request: GetUserApiKeyRequest = {
          accountId: accInfo.accountId,
        };

        const { apiKey } = await LoopringAPI.userAPI.getUserApiKey(
          request,
          eddsakey.sk
        );

        // step 4 get storageId
        const request2: GetNextStorageIdRequest = {
          accountId: accInfo.accountId,
          sellTokenId: 1,
        };
        const storageId = await LoopringAPI.userAPI.getNextStorageId(
          request2,
          apiKey
        );

        // step 5 get fee
        const requestFee: GetOffchainFeeAmtRequest = {
          accountId: accInfo.accountId,
          requestType: OffchainFeeReqType.TRANSFER,
        };

        const responseFee = await LoopringAPI.userAPI.getOffchainFeeAmt(
          requestFee,
          apiKey
        );

        // step 6 transfer
        const request3: OriginTransferRequestV3 = {
          exchange: LOOPRING_EXPORTED_ACCOUNT.exchangeAddr,
          payerAddr: accInfo.owner,
          payerId: accInfo.accountId,
          payeeAddr: LOOPRING_EXPORTED_ACCOUNT.address2,
          payeeId: LOOPRING_EXPORTED_ACCOUNT.accountId2,
          storageId: storageId.offchainId,
          token: {
            tokenId: 1,
            volume: "100000000000000000000",
          },
          maxFee: {
            tokenId:
              // @ts-ignore
              TOKEN_INFO.tokenMap[
                responseFee.fees[1]?.token?.toString() ?? "LRC"
              ].tokenId,
            volume: responseFee.fees[1]?.fee ?? "9400000000000000000",
          },
          validUntil: VALID_UNTIL,
        };

        const response = await LoopringAPI.userAPI.submitInternalTransfer({
          request: request3,
          web3,
          chainId: ChainId.GOERLI,
          walletType: ConnectorNames.Trezor,
          eddsaKey: eddsakey.sk,
          apiKey: apiKey,
        });

        console.log(response);
      } catch (err) {
        dumpError400(err as any);
      }
    },
    DEFAULT_TIMEOUT
  );

  it(
    "whitelistedAccTransfer",
    async () => {
      try {
        // step 1. get account info
        const { accInfo } = await LoopringAPI.exchangeAPI.getAccount({
          owner: LOOPRING_EXPORTED_ACCOUNT.whitelistedAddress,
        });

        if (!accInfo) {
          return;
        }

        console.log("accInfo:", accInfo);

        /*
         * @replace LOOPRING_EXPORTED_ACCOUNT.exchangeAddr =  exchangeInfo.exchangeAddress
         */
        // const { exchangeInfo } = await LoopringAPI.exchangeAPI.getExchangeInfo();

        // step 2 get apikey
        const request: GetUserApiKeyRequest = {
          accountId: accInfo.accountId,
        };

        const { apiKey } = await LoopringAPI.userAPI.getUserApiKey(
          request,
          LOOPRING_EXPORTED_ACCOUNT.whitelistedEddkey
        );

        console.log("apiKey:", apiKey);

        // step 3 get storageId
        const request2: GetNextStorageIdRequest = {
          accountId: accInfo.accountId,
          sellTokenId: 1,
        };
        const storageId = await LoopringAPI.userAPI.getNextStorageId(
          request2,
          apiKey
        );

        // step 4 transfer
        const request3: OriginTransferRequestV3 = {
          exchange: LOOPRING_EXPORTED_ACCOUNT.exchangeAddr, //exchangeInfo.exchangeAddress,
          payerAddr: LOOPRING_EXPORTED_ACCOUNT.whitelistedAddress,
          payerId: accInfo.accountId,
          payeeAddr: LOOPRING_EXPORTED_ACCOUNT.address2,
          payeeId: 0,
          storageId: storageId.offchainId,
          token: {
            tokenId: 1,
            volume: "100000000000000000000",
          },
          maxFee: {
            tokenId: 1,
            volume: "9400000000000000000",
          },
          validUntil: VALID_UNTIL,
        };

        console.log("request3:", request3);

        const response =
          await LoopringAPI.WhitelistedUserAPI.submitInternalTransfer(
            request3,
            LOOPRING_EXPORTED_ACCOUNT.whitelistedEddkey,
            apiKey
          );

        console.log(response);
      } catch (err) {
        dumpError400(err as any);
      }
    },
    DEFAULT_TIMEOUT
  );
});
