import { ChainId, ConnectorNames } from "../../defs/web3_defs";
import { dumpError400 } from "../../utils/network_tools";

import {
  GetNextStorageIdRequest,
  GetUserApiKeyRequest,
  NFTOrderRequestV3,
} from "../../defs/loopring_defs";

import { VALID_UNTIL } from "../../defs/loopring_constants";
import * as sign_tools from "../../api/sign/sign_tools";
import Web3 from "web3";
import {
  DEFAULT_TIMEOUT,
  LOOPRING_EXPORTED_ACCOUNT,
  LoopringAPI,
} from "../data";
import { BaseAPI } from "../../api/base_api";

const PrivateKeyProvider = require("truffle-privatekey-provider");

describe("NFTAction Validate Order Test", function () {
  beforeEach(async () => {
    LoopringAPI.InitApi(ChainId.GOERLI);
  });

  it(
    "validateNftOrder",
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

        const { exchangeInfo } =
          await LoopringAPI.exchangeAPI.getExchangeInfo();

        console.log("accInfo:", accInfo);

        const eddsakey = await sign_tools.generateKeyPair({
          web3,
          address: accInfo.owner,
          keySeed:
            accInfo.keySeed ??
            BaseAPI.KEY_MESSAGE.replace(
              "${exchangeAddress}",
              exchangeInfo.exchangeAddress
            ).replace("${nonce}", (accInfo.nonce - 1).toString()),
          // exchangeAddress: exchangeInfo.exchangeAddress,
          // keyNonce: accInfo.nonce - 1,
          walletType: ConnectorNames.MetaMask,
          chainId: ChainId.GOERLI,
        });

        console.log("eddsakey:", accInfo.keySeed, eddsakey.sk);

        // step 3 get apikey
        const request: GetUserApiKeyRequest = {
          accountId: accInfo.accountId,
        };

        let { apiKey } = await LoopringAPI.userAPI.getUserApiKey(
          request,
          eddsakey.sk
        );

        console.log(apiKey);
        // step 4 get storageId
        const request2: GetNextStorageIdRequest = {
          accountId: accInfo.accountId,
          sellTokenId: 1,
        };

        const storageId = await LoopringAPI.userAPI.getNextStorageId(
          request2,
          apiKey
        );
        // let hash: any = new BN(nftId,'hex')
        // hash = toHex(hash);//new BigInteger(sha256(nftId.toString()).toString(), 16)

        const request3: NFTOrderRequestV3 = {
          exchange: exchangeInfo.exchangeAddress,
          accountId: accInfo.accountId,
          storageId: storageId.orderId,
          sellToken: {
            tokenId: LOOPRING_EXPORTED_ACCOUNT.nftTokenId,
            nftData: LOOPRING_EXPORTED_ACCOUNT.nftData,
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
        console.log("sellNFT NFTOrderRequestV3", request3);
        const response = await LoopringAPI.userAPI.submitNFTValidateOrder({
          request: request3,
          web3,
          chainId: ChainId.GOERLI,
          walletType: ConnectorNames.Unknown,
          eddsaKey: eddsakey.sk,
          apiKey: apiKey,
        });

        console.log(response);
        const request4 = {
          ...request3,
          sellToken: {
            tokenId: 1,
            amount: "10000000000000",
          },
          buyToken: {
            tokenId: LOOPRING_EXPORTED_ACCOUNT.nftTokenId,
            nftData: LOOPRING_EXPORTED_ACCOUNT.nftData,
            amount: "1",
          },
          fillAmountBOrS: true,
        };
        console.log("buyNFT NFTOrderRequestV3", request4);
        const response2 = await LoopringAPI.userAPI.submitNFTValidateOrder({
          request: request4,
          web3,
          chainId: ChainId.GOERLI,
          walletType: ConnectorNames.Unknown,
          eddsaKey: eddsakey.sk,
          apiKey: apiKey,
        });
        console.log(response2);
      } catch (err) {
        dumpError400(err as any);
      }
    },
    DEFAULT_TIMEOUT * 2
  );
});
