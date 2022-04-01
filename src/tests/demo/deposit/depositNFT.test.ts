import { ChainId, ConnectorNames } from "../../../defs/web3_defs";

import { VALID_UNTIL } from "../../../defs/loopring_constants";

import {
  DEFAULT_TIMEOUT,
  LOOPRING_EXPORTED_ACCOUNT,
  LoopringAPI,
  web3,
} from "../../data";

import { ExchangeAPI } from "../../../api/exchange_api";
import { NFTAPI, NFTType } from "../../../api/nft_api";
import Web3 from "web3";
import * as sign_tools from "../../../api/sign/sign_tools";
import {
  GetNextStorageIdRequest,
  GetNFTOffchainFeeAmtRequest,
  GetUserApiKeyRequest,
  OffchainNFTFeeReqType,
  OriginDeployNFTRequestV3,
} from "../../../defs";
import { dumpError400 } from "../../../utils";
import { BaseAPI } from "../../../api/base_api";
const PrivateKeyProvider = require("truffle-privatekey-provider");
const { exec } = require("child_process");

//test should change the id number
const nftId =
  "0x000000000000000000000000000000000000000000000000000000000000007d";
describe("nft test", function () {
  beforeEach(() => {
    LoopringAPI.InitApi(ChainId.GOERLI);
  });

  it(
    "approveNFT",
    async () => {
      const nonce = await LoopringAPI.contractAPI.getNonce(
        web3,
        LOOPRING_EXPORTED_ACCOUNT.address
      );
      const response = await LoopringAPI.nftAPI.approveNFT({
        web3,
        from: LOOPRING_EXPORTED_ACCOUNT.address,
        depositAddress: LOOPRING_EXPORTED_ACCOUNT.depositAddress,
        tokenAddress: LOOPRING_EXPORTED_ACCOUNT.nftTokenAddress,
        tokenId: nftId,
        nftType: NFTType.ERC1155,
        gasPrice: LOOPRING_EXPORTED_ACCOUNT.gasPrice,
        gasLimit: LOOPRING_EXPORTED_ACCOUNT.gasLimit,
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
      const nonce = await LoopringAPI.contractAPI.getNonce(
        web3,
        LOOPRING_EXPORTED_ACCOUNT.address
      );
      const response = await LoopringAPI.nftAPI.approveNFT({
        web3,
        from: LOOPRING_EXPORTED_ACCOUNT.address,
        depositAddress: LOOPRING_EXPORTED_ACCOUNT.depositAddress,
        tokenAddress: LOOPRING_EXPORTED_ACCOUNT.nftTokenAddress,
        tokenId: nftId,
        nftType: NFTType.ERC1155,
        gasPrice: LOOPRING_EXPORTED_ACCOUNT.gasPrice,
        gasLimit: LOOPRING_EXPORTED_ACCOUNT.gasLimit,
        chainId: ChainId.GOERLI,
        nonce,
        sendByMetaMask: true,
      });
      console.log(`nonce: ${nonce} approveNFT: ${response?.result}`);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "notApproveNFT",
    async () => {
      const nonce = await LoopringAPI.contractAPI.getNonce(
        web3,
        LOOPRING_EXPORTED_ACCOUNT.address
      );
      const response = await LoopringAPI.nftAPI.approveNFT({
        web3,
        from: LOOPRING_EXPORTED_ACCOUNT.address,
        depositAddress: LOOPRING_EXPORTED_ACCOUNT.depositAddress,
        tokenAddress: LOOPRING_EXPORTED_ACCOUNT.nftTokenAddress,
        tokenId: nftId,
        nftType: NFTType.ERC1155,
        gasPrice: LOOPRING_EXPORTED_ACCOUNT.gasPrice,
        gasLimit: LOOPRING_EXPORTED_ACCOUNT.gasLimit,
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
    "deposit NFTAction ERC1155",
    async () => {
      const nonce = await LoopringAPI.contractAPI.getNonce(
        web3,
        LOOPRING_EXPORTED_ACCOUNT.address
      );
      const response = await LoopringAPI.nftAPI.depositNFT({
        web3,
        from: LOOPRING_EXPORTED_ACCOUNT.address,
        exchangeAddress: LOOPRING_EXPORTED_ACCOUNT.exchangeAddress,
        nftType: NFTType.ERC1155,
        tokenAddress: LOOPRING_EXPORTED_ACCOUNT.nftTokenAddress,
        nftId: LOOPRING_EXPORTED_ACCOUNT.nftId,
        amount: 1,
        gasPrice: LOOPRING_EXPORTED_ACCOUNT.gasPrice,
        gasLimit: LOOPRING_EXPORTED_ACCOUNT.gasLimit,
        chainId: ChainId.GOERLI,
        nonce,
        sendByMetaMask: true,
      });

      console.log(`nonce: ${nonce} deposit NFT ERC1155: `, response);
    },
    DEFAULT_TIMEOUT
  );

  // it(
  //   "deposit NFTAction ERC721",
  //   async () => {
  //     const nonce = await LoopringAPI.contractAPI.getNonce(
  //       web3,
  //       LOOPRING_EXPORTED_ACCOUNT.address
  //     );
  //     const response = await LoopringAPI.nftAPI.depositNFT({
  //       web3,
  //       from: LOOPRING_EXPORTED_ACCOUNT.address,
  //       exchangeAddress: LOOPRING_EXPORTED_ACCOUNT.exchangeAddress,
  //       nftType: NFTType.ERC721,
  //       tokenAddress: '// TODO:',
  //       nftId:  '// TODO:',
  //       amount: 1,
  //       gasPrice: LOOPRING_EXPORTED_ACCOUNT.gasPrice,
  //       gasLimit: LOOPRING_EXPORTED_ACCOUNT.gasLimit,
  //       chainId: ChainId.GOERLI,
  //       nonce,
  //       sendByMetaMask: true,
  //     });
  //
  //     console.log(`nonce: ${nonce} deposit NFT ERC1155: `, response);
  //   },
  //   DEFAULT_TIMEOUT
  // );

  it(
    "isApprovedForAll",
    async () => {
      const response = await LoopringAPI.nftAPI.isApprovedForAll({
        web3,
        from: LOOPRING_EXPORTED_ACCOUNT.address,
        exchangeAddress: LOOPRING_EXPORTED_ACCOUNT.exchangeAddress,
        nftType: NFTType.ERC1155,
        tokenAddress: LOOPRING_EXPORTED_ACCOUNT.nftTokenAddress,
      });
      console.log(`check is approveNFT`, response);
    },
    DEFAULT_TIMEOUT
  );
});
