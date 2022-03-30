import { ChainId, ConnectorNames, NFTFactory } from "../../defs/web3_defs";
import { dumpError400 } from "../../utils/network_tools";
import * as sign_tools from "../../api/sign/sign_tools";
import {
  DEFAULT_TIMEOUT,
  LOOPRING_EXPORTED_ACCOUNT,
  LoopringAPI,
  TOKEN_INFO,
  web3,
} from "../data";
import { BaseAPI } from "../../api/base_api";
import { myLog } from "../../utils/log_tools";
import {
  OffchainNFTFeeReqType,
  VALID_UNTIL,
  GetNextStorageIdRequest,
  GetNFTOffchainFeeAmtRequest,
  GetUserApiKeyRequest,
  NFTMintRequestV3,
} from "../../defs";

// const nftId = "0x0000000000000000000000000000000000000000000000000000000000000096";  // please change the ID your self
describe("Mint test", function () {
  beforeEach(async () => {
    LoopringAPI.InitApi(ChainId.GOERLI);
  });

  it(
    "submitNFTMint",
    async () => {
      try {
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

        let { apiKey } = await LoopringAPI.userAPI.getUserApiKey(
          request,
          eddsakey.sk
        );
        apiKey = apiKey;

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
          LoopringAPI.nftAPI.computeNFTAddress(counterFactualNftInfo)
            .tokenAddress || "";
        myLog("nftTokenAddress", nftTokenAddress);

        const storageId = await LoopringAPI.userAPI.getNextStorageId(
          request2,
          apiKey
        );

        // step 5 get fee
        const requestFee: GetNFTOffchainFeeAmtRequest = {
          accountId: accInfo.accountId,
          tokenAddress: LOOPRING_EXPORTED_ACCOUNT.nftTokenAddress,
          requestType: OffchainNFTFeeReqType.NFT_MINT,
        };

        const responseFee = await LoopringAPI.userAPI.getNFTOffchainFeeAmt(
          requestFee,
          apiKey
        );

        const {
          raw_data: { fees },
        } = await LoopringAPI.userAPI.getNFTOffchainFeeAmt(requestFee, apiKey);
        console.log(fees);

        const request3: NFTMintRequestV3 = {
          exchange: exchangeInfo.exchangeAddress,
          minterId: accInfo.accountId,
          minterAddress: accInfo.owner,
          toAccountId: accInfo.accountId,
          toAddress: accInfo.owner,
          nftType: 0,
          tokenAddress: nftTokenAddress,
          nftId: LOOPRING_EXPORTED_ACCOUNT.nftId, //nftId.toString(16),
          amount: "1",
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

        const response = await LoopringAPI.userAPI.submitNFTMint({
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
    DEFAULT_TIMEOUT * 2
  );
});
