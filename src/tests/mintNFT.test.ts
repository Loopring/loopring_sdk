import { ChainId, ConnectorNames, NFTFactory } from "../defs/web3_defs";
import { ExchangeAPI, NFTAPI, UserAPI, WhitelistedUserAPI } from "../api";

import { dumpError400 } from "../utils/network_tools";

import {
  GetNextStorageIdRequest,
  GetNFTOffchainFeeAmtRequest,
  GetUserApiKeyRequest,
  NFTMintRequestV3,
} from "../defs/loopring_defs";

import { DEFAULT_TIMEOUT, VALID_UNTIL } from "../defs/loopring_constants";

import * as sign_tools from "../api/sign/sign_tools";
import Web3 from "web3";
import { loopring_exported_account, TOKEN_INFO } from "./utils";
import { BaseAPI } from "../api/base_api";
import { myLog } from "../utils/log_tools";
import { OffchainNFTFeeReqType } from "../defs";

const PrivateKeyProvider = require("truffle-privatekey-provider");

let userApi: UserAPI;
let nftAPI: NFTAPI;

let whitelistedUserApi: WhitelistedUserAPI;

let exchange: ExchangeAPI;

const nftId =
  "0x0000000000000000000000000000000000000000000000000000000000000096";
describe("Mint test", function () {
  beforeEach(async () => {
    userApi = new UserAPI({ chainId: ChainId.GOERLI });
    exchange = new ExchangeAPI({ chainId: ChainId.GOERLI });
    nftAPI = new NFTAPI({ chainId: ChainId.GOERLI });
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
        const counterFactualNftInfo = {
          nftOwner: accInfo.owner,
          nftFactory: NFTFactory[ChainId.GOERLI],
          nftBaseUri: "",
        };

        const nftTokenAddress =
          nftAPI?.computeNFTAddress(counterFactualNftInfo).tokenAddress || "";
        myLog("nftTokenAddress", nftTokenAddress);

        const storageId = await userApi.getNextStorageId(request2, apiKey);

        // step 5 get fee
        const requestFee: GetNFTOffchainFeeAmtRequest = {
          accountId: accInfo.accountId,
          tokenAddress: loopring_exported_account.nftTokenAddress,
          requestType: OffchainNFTFeeReqType.NFT_MINT,
        };

        const responseFee = await userApi.getNFTOffchainFeeAmt(
          requestFee,
          apiKey
        );

        const {
          raw_data: { fees },
        } = await userApi.getNFTOffchainFeeAmt(requestFee, apiKey);
        console.log(fees);

        const request3: NFTMintRequestV3 = {
          exchange: exchangeInfo.exchangeAddress,
          minterId: accInfo.accountId,
          minterAddress: accInfo.owner,
          toAccountId: accInfo.accountId,
          toAddress: accInfo.owner,
          nftType: 0,
          tokenAddress: nftTokenAddress,
          nftId: nftId, //nftId.toString(16),
          amount: "10",
          validUntil: VALID_UNTIL,
          storageId: storageId.offchainId ?? 9,
          maxFee: {
            tokenId:
              // @ts-ignore
              TOKEN_INFO.tokenMap[
                responseFee.fees[1]?.token?.toString() ?? "LRC"
              ].tokenId,
            amount: responseFee.fees[1]?.fee ?? "3260000000000000",
          },
          royaltyPercentage: 5,
          counterFactualNftInfo,
          forceToMint: true,
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
    DEFAULT_TIMEOUT + DEFAULT_TIMEOUT
  );
});
