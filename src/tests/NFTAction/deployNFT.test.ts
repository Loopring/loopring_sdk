import { ChainId, ConnectorNames, NFTFactory } from "../../defs/web3_defs";
import { dumpError400 } from "../../utils/network_tools";
import * as sign_tools from "../../api/sign/sign_tools";
import {
  DEFAULT_TIMEOUT,
  LOOPRING_EXPORTED_ACCOUNT,
  LoopringAPI,
  web3,
} from "../data";
import { BaseAPI } from "../../api/base_api";
import {
  OffchainNFTFeeReqType,
  VALID_UNTIL,
  GetNextStorageIdRequest,
  GetNFTOffchainFeeAmtRequest,
  GetUserApiKeyRequest,
  OriginDeployNFTRequestV3,
} from "../../defs";

describe("Mint test", function () {
  beforeEach(async () => {
    LoopringAPI.InitApi(ChainId.GOERLI);
  });
  it(
    "submitDeployNFT",
    async () => {
      const { accInfo } = await LoopringAPI.exchangeAPI.getAccount({
        owner: LOOPRING_EXPORTED_ACCOUNT.address,
      });
      if (!accInfo) {
        return;
      }
      const { broker: payeeAddr } =
        await LoopringAPI.userAPI.getAvailableBroker();

      const eddsaKey = await sign_tools.generateKeyPair({
        web3,
        address: accInfo.owner,
        keySeed: BaseAPI.KEY_MESSAGE.replace(
          "${exchangeAddress}",
          LOOPRING_EXPORTED_ACCOUNT.exchangeAddr
        ).replace("${nonce}", (accInfo.nonce - 1).toString()),
        walletType: ConnectorNames.MetaMask,
        chainId: ChainId.GOERLI,
      });

      const request: GetUserApiKeyRequest = {
        accountId: accInfo.accountId,
      };

      const { apiKey } = await LoopringAPI.userAPI.getUserApiKey(
        request,
        eddsaKey.sk
      );
      console.log(apiKey);
      const reStorageId: GetNextStorageIdRequest = {
        accountId: accInfo.accountId,
        sellTokenId: 1,
      };
      const storageId = await LoopringAPI.userAPI.getNextStorageId(
        reStorageId,
        apiKey
      );
      const requestFee: GetNFTOffchainFeeAmtRequest = {
        accountId: accInfo.accountId,
        tokenAddress: LOOPRING_EXPORTED_ACCOUNT.nftTokenAddress,
        requestType: OffchainNFTFeeReqType.NFT_WITHDRAWAL,
        amount: "0",
      };
      const {
        raw_data: { fees },
      } = await LoopringAPI.userAPI.getNFTOffchainFeeAmt(requestFee, apiKey);
      console.log(fees);
      // OriginDeployNFTRequestV3WithPatch
      const transfer = {
        exchange: LOOPRING_EXPORTED_ACCOUNT.exchangeAddr,
        payerAddr: LOOPRING_EXPORTED_ACCOUNT.address,
        payerId: LOOPRING_EXPORTED_ACCOUNT.accountId,
        payeeAddr,
        storageId: storageId.offchainId,
        token: {
          tokenId: 1, //LRC
          volume: fees[1].fee,
        },
        validUntil: VALID_UNTIL,
      };
      const submitDeployNFTRequest: OriginDeployNFTRequestV3 = {
        transfer,
        tokenAddress: LOOPRING_EXPORTED_ACCOUNT.nftTokenAddress,
        nftData: LOOPRING_EXPORTED_ACCOUNT.nftData,
      };
      try {
        const response = await LoopringAPI.userAPI.submitDeployNFT({
          request: submitDeployNFTRequest,
          web3,
          chainId: ChainId.GOERLI,
          walletType: ConnectorNames.Unknown,
          eddsaKey: eddsaKey.sk,
          apiKey: apiKey,
        });

        console.log(response);
      } catch (reason) {
        dumpError400(reason);
        console.log(reason);
      }
    },
    DEFAULT_TIMEOUT + 20000
  );
});
