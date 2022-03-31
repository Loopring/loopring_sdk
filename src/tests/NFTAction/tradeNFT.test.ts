import { ChainId, ConnectorNames } from "../../defs/web3_defs";

import { dumpError400 } from "../../utils/network_tools";

import { NFTOrderRequestV3, NFTTradeRequestV3 } from "../../defs/loopring_defs";

import { VALID_UNTIL } from "../../defs/loopring_constants";

import * as sign_tools from "../../api/sign/sign_tools";
import {
  DEFAULT_TIMEOUT,
  LOOPRING_EXPORTED_ACCOUNT,
  LoopringAPI,
  web3,
  web3_2,
} from "../data";
import { BaseAPI } from "../../api/base_api";
import { myLog } from "../../utils/log_tools";

// prepare: account need minted some NFTAction before test
describe("NFTAction Trade Test", function () {
  beforeEach(async () => {
    LoopringAPI.InitApi(ChainId.GOERLI);
  });

  it(
    "NFTAction",
    async () => {
      try {
        // step 1. get account info
        const { accInfo } = await LoopringAPI.exchangeAPI.getAccount({
          owner: LOOPRING_EXPORTED_ACCOUNT.address,
        });

        if (!accInfo) {
          return;
        }

        const { accInfo: accInfo2 } = await LoopringAPI.exchangeAPI.getAccount({
          owner: LOOPRING_EXPORTED_ACCOUNT.address2,
        });

        if (!accInfo2) {
          return;
        }
        console.log("accInfo2:", accInfo2);

        const { exchangeInfo } =
          await LoopringAPI.exchangeAPI.getExchangeInfo();

        const eddsakey_1 = await sign_tools.generateKeyPair({
          web3,
          address: accInfo.owner,
          keySeed:
            accInfo.keySeed ??
            BaseAPI.KEY_MESSAGE.replace(
              "${exchangeAddress}",
              exchangeInfo.exchangeAddress
            ).replace("${nonce}", (accInfo.nonce - 1).toString()),
          walletType: ConnectorNames.MetaMask,
          chainId: ChainId.GOERLI,
        });

        console.log("eddsakey:", accInfo.keySeed, eddsakey_1.sk);
        const eddsakey_2 = await sign_tools.generateKeyPair({
          web3: web3_2,
          address: accInfo2.owner,
          keySeed:
            accInfo2.keySeed ??
            BaseAPI.KEY_MESSAGE.replace(
              "${exchangeAddress}",
              exchangeInfo.exchangeAddress
            ).replace("${nonce}", (accInfo.nonce - 1).toString()),
          walletType: ConnectorNames.MetaMask,
          chainId: ChainId.GOERLI,
        });

        console.log("eddsakey2:", eddsakey_2.sk);

        // step 3 get apikey

        const { apiKey: apiKey1 } = await LoopringAPI.userAPI.getUserApiKey(
          {
            accountId: accInfo.accountId,
          },
          eddsakey_1.sk
        );
        console.log("apiKey1:", apiKey1);

        const { userNFTBalances } =
          await LoopringAPI.userAPI.getUserNFTBalances(
            { accountId: accInfo.accountId, limit: 20 },
            apiKey1
          );
        console.log("NFTAction-INFO", userNFTBalances[0]);

        const { apiKey: apiKey2 } = await LoopringAPI.userAPI.getUserApiKey(
          {
            accountId: accInfo2.accountId,
          },
          eddsakey_2.sk
        );
        console.log("apiKey2:", apiKey2);

        // step 4 get storageId

        const storageId = await LoopringAPI.userAPI.getNextStorageId(
          {
            accountId: accInfo.accountId,
            sellTokenId: 1,
          },
          apiKey1
        );

        const storageId2 = await LoopringAPI.userAPI.getNextStorageId(
          {
            accountId: accInfo2.accountId,
            sellTokenId: 1,
          },
          apiKey2
        );

        const makerOrder: NFTOrderRequestV3 = {
          exchange: exchangeInfo.exchangeAddress,
          accountId: accInfo.accountId,
          storageId: storageId.orderId,
          sellToken: {
            tokenId: userNFTBalances[0]?.tokenId,
            nftData: userNFTBalances[0]?.nftData,
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

        const nftValidateMakerOrder =
          await LoopringAPI.userAPI.submitNFTValidateOrder({
            request: makerOrder,
            web3,
            chainId: ChainId.GOERLI,
            walletType: ConnectorNames.Unknown,
            eddsaKey: eddsakey_1.sk,
            apiKey: apiKey1,
          });
        myLog("submitNFTValidateOrder MakerOrder", nftValidateMakerOrder);

        const takerOrder: NFTOrderRequestV3 = {
          exchange: exchangeInfo.exchangeAddress,
          accountId: accInfo2.accountId,
          storageId: storageId2.orderId,
          sellToken: {
            tokenId: 1,
            amount: "10000000000000",
          },
          buyToken: {
            tokenId: userNFTBalances[0]?.tokenId,
            nftData: userNFTBalances[0]?.nftData,
            amount: "1",
          },
          allOrNone: false,
          fillAmountBOrS: true,
          validUntil: VALID_UNTIL,
          maxFeeBips: 80,
        };

        takerOrder.eddsaSignature = sign_tools.get_EddsaSig_NFT_Order(
          takerOrder,
          eddsakey_2.sk
        );

        const nftValidateTakerOrder =
          await LoopringAPI.userAPI.submitNFTValidateOrder({
            request: takerOrder,
            web3,
            chainId: ChainId.GOERLI,
            walletType: ConnectorNames.Unknown,
            eddsaKey: eddsakey_2.sk,
            apiKey: apiKey2,
          });
        myLog("submitNFTValidateOrder takerOrder", nftValidateTakerOrder);

        const tradeRequest: NFTTradeRequestV3 = {
          maker: makerOrder,
          makerFeeBips: 80,
          taker: takerOrder,
          takerFeeBips: 80,
        };

        const response = await LoopringAPI.userAPI.submitNFTTrade({
          request: tradeRequest,
          web3,
          chainId: ChainId.GOERLI,
          walletType: ConnectorNames.Unknown,
          apiKey: apiKey1,
          eddsaKey: eddsakey_1.sk,
        });

        console.log(response);
      } catch (err) {
        dumpError400(err as any);
      }
    },
    DEFAULT_TIMEOUT * 2
  );
});
