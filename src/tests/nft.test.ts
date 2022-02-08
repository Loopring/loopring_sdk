import { ChainId, ConnectorNames } from "../defs/web3_defs";
import * as contract from "../api/contract_api";

import { DEFAULT_TIMEOUT, VALID_UNTIL } from "../defs/loopring_constants";

import { loopring_exported_account, web3 } from "./utils";

import { ExchangeAPI } from "../api/exchange_api";
import { NFTAPI, NFTType } from "../api/nft_api";
import Web3 from "web3";
import * as sign_tools from "../api/sign/sign_tools";
import {
  GetNextStorageIdRequest,
  GetNFTOffchainFeeAmtRequest,
  GetUserApiKeyRequest,
  OffchainNFTFeeReqType,
  OriginDeployNFTRequestV3,
} from "../defs";
import { UserAPI, WhitelistedUserAPI } from "../api";
import { dumpError400 } from "../utils";
import { BaseAPI } from "../api/base_api";
const PrivateKeyProvider = require("truffle-privatekey-provider");
const { exec } = require("child_process");

let exchange: ExchangeAPI,
  userApi: UserAPI,
  whitelistedUserApi: WhitelistedUserAPI;
let nft: NFTAPI;
const gasPrice = 30;

const gasLimit = 200000;

//test should change the id number
const nftId =
  "0x000000000000000000000000000000000000000000000000000000000000007d";
describe("nft test", function () {
  beforeEach(() => {
    exchange = new ExchangeAPI({ chainId: ChainId.GOERLI });
    nft = new NFTAPI({ chainId: ChainId.GOERLI });
    userApi = new UserAPI({ chainId: ChainId.GOERLI });
    whitelistedUserApi = new WhitelistedUserAPI({ chainId: ChainId.GOERLI });
    exec(
      "export http_proxy=http://127.0.0.1:1087;export https_proxy=http://127.0.0.1:1087"
    );
  });

  it(
    "approveNFT",
    async () => {
      const nonce = await contract.getNonce(
        web3,
        loopring_exported_account.address
      );
      const response = await nft.approveNFT({
        web3,
        from: loopring_exported_account.address,
        depositAddress: loopring_exported_account.depositAddr,
        tokenAddress: loopring_exported_account.nftTokenAddress,
        tokenId: nftId,
        nftType: NFTType.ERC1155,
        gasPrice,
        gasLimit,
        chainId: ChainId.GOERLI,
        nonce,
        approved: true,
        sendByMetaMask: true,
      });
      console.log(`nonce: ${nonce} approveNFT: ${response?.result}`);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "approveNFT",
    async () => {
      const nonce = await contract.getNonce(
        web3,
        loopring_exported_account.address
      );
      const response = await nft.approveNFT({
        web3,
        from: loopring_exported_account.address,
        depositAddress: loopring_exported_account.depositAddr,
        tokenAddress: loopring_exported_account.nftTokenAddress,
        tokenId: nftId,
        nftType: NFTType.ERC1155,
        gasPrice,
        gasLimit,
        chainId: ChainId.GOERLI,
        nonce,
        sendByMetaMask: true,
      });
      console.log(`nonce: ${nonce} approveNFT: ${response?.result}`);
    },
    DEFAULT_TIMEOUT
  );
  it(
    "getContractNFTMeta",
    async () => {
      const tokenAddress = "0x372c1a427ed867b666c99cfd6dbe7ec44c0bd6f7"; //loopring_exported_account.nftTokenAddress;
      const _nftId = 55; // nftId;
      const provider = new PrivateKeyProvider(
        loopring_exported_account.privateKey,
        "https://goerli.infura.io/v3/a06ed9c6b5424b61beafff27ecc3abf3"
      );
      const web3 = new Web3(provider);
      const result = await nft.getContractNFTMeta({
        web3,
        tokenAddress,
        nftId: _nftId.toString(),
        nftType: NFTType.ERC1155,
      });
    },
    DEFAULT_TIMEOUT
  );
  it(
    "notApproveNFT",
    async () => {
      const nonce = await contract.getNonce(
        web3,
        loopring_exported_account.address
      );
      const response = await nft.approveNFT({
        web3,
        from: loopring_exported_account.address,
        depositAddress: loopring_exported_account.depositAddr,
        tokenAddress: loopring_exported_account.nftTokenAddress,
        tokenId: nftId,
        nftType: NFTType.ERC1155,
        gasPrice,
        gasLimit,
        chainId: ChainId.GOERLI,
        nonce,
        approved: false,
        sendByMetaMask: true,
      });
      console.log(`nonce: ${nonce} approveNFT: ${response?.result}`);
    },
    DEFAULT_TIMEOUT
  );
  it(
    "getInfoForNFTTokens test",
    async () => {
      const response = await nft.getInfoForNFTTokens({
        nftDatas: [
          "0x1197d20d12bc9f80a4902c04c5a4b88371d32b0c14adce746eeea564850f47a5",
          "0x10e7f3b7ff37e4ebffabedb9fa19c66c63482b4b642d176068517c505edcd123",
        ],
      });
      console.log(`getInfoForNFTTokens: response: `, JSON.stringify(response));
    },
    DEFAULT_TIMEOUT
  );
  it(
    "deposit NFT ERC1155",
    async () => {
      const nonce = await contract.getNonce(
        web3,
        loopring_exported_account.address
      );
      const response = await nft.depositNFT({
        web3,
        from: loopring_exported_account.address,
        exchangeAddress: loopring_exported_account.exchangeAddr,
        nftType: NFTType.ERC1155,
        tokenAddress: loopring_exported_account.nftTokenAddress,
        nftId: loopring_exported_account.nftId,
        amount: 1,
        gasPrice,
        gasLimit,
        chainId: ChainId.GOERLI,
        nonce,
        sendByMetaMask: true,
      });

      console.log(`nonce: ${nonce} deposit NFT ERC1155: `, response);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "isApprovedForAll",
    async () => {
      const response = await nft.isApprovedForAll({
        web3,
        from: loopring_exported_account.address,
        exchangeAddress: loopring_exported_account.exchangeAddr,
        nftType: NFTType.ERC1155,
        tokenAddress: loopring_exported_account.nftTokenAddress,
      });
      console.log(`check is approveNFT`, response);
    },
    DEFAULT_TIMEOUT
  );

  it("getNFTBalance", async () => {
    const response = await nft.getNFTBalance({
      web3,
      account: loopring_exported_account.address,
      tokenAddress: loopring_exported_account.nftTokenAddress,
      nftId: loopring_exported_account.nftId,
      nftType: NFTType.ERC1155,
    });
    console.log(response);
  });

  it("computeNFTAddress", async () => {
    const response = nft.computeNFTAddress({
      nftOwner: "0xE20cF871f1646d8651ee9dC95AAB1d93160b3467",
      nftFactory: "0x40F2C1770E11c5bbA3A26aEeF89616D209705C5D",
      chainId: ChainId.GOERLI,
    });
    console.log(
      `computeNFTAddress:`,
      response,
      "0xee354d81778a4c5a08fd9dbeb5cfd01a840a746d"
    );
  });
  it(
    "submitDeployNFT",
    async () => {
      const provider = new PrivateKeyProvider(
        loopring_exported_account.privateKey,
        "https://goerli.infura.io/v3/a06ed9c6b5424b61beafff27ecc3abf3"
      );
      const web3 = new Web3(provider);
      const { accInfo } = await exchange.getAccount({
        owner: loopring_exported_account.address,
      });
      if (!accInfo) {
        return;
      }
      const { broker: payeeAddr } = await userApi.getAvailableBroker();

      const eddsaKey = await sign_tools.generateKeyPair({
        web3,
        address: accInfo.owner,
        keySeed: BaseAPI.KEY_MESSAGE.replace(
          "${exchangeAddress}",
          loopring_exported_account.exchangeAddr
        ).replace("${nonce}", (accInfo.nonce - 1).toString()),
        walletType: ConnectorNames.MetaMask,
        chainId: ChainId.GOERLI,
      });

      const request: GetUserApiKeyRequest = {
        accountId: accInfo.accountId,
      };

      const { apiKey } = await userApi.getUserApiKey(request, eddsaKey.sk);
      console.log(apiKey);
      const reStorageId: GetNextStorageIdRequest = {
        accountId: accInfo.accountId,
        sellTokenId: 1,
      };
      const storageId = await userApi.getNextStorageId(reStorageId, apiKey);
      const requestFee: GetNFTOffchainFeeAmtRequest = {
        accountId: accInfo.accountId,
        tokenAddress: loopring_exported_account.nftTokenAddress,
        requestType: OffchainNFTFeeReqType.NFT_WITHDRAWAL,
        amount: "0",
      };
      const {
        raw_data: { fees },
      } = await userApi.getNFTOffchainFeeAmt(requestFee, apiKey);
      console.log(fees);
      // OriginDeployNFTRequestV3WithPatch
      const transfer = {
        exchange: loopring_exported_account.exchangeAddr,
        payerAddr: loopring_exported_account.address,
        payerId: loopring_exported_account.accountId,
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
        tokenAddress: loopring_exported_account.nftTokenAddress,
        nftData: loopring_exported_account.nftData,
      };
      try {
        const response = await userApi.submitDeployNFT({
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
