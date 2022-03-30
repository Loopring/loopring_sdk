import { ChainId, ConnectorNames } from "../../defs/web3_defs";

import { VALID_UNTIL } from "../../defs/loopring_constants";

import {
  DEFAULT_TIMEOUT,
  LOOPRING_EXPORTED_ACCOUNT,
  LoopringAPI,
  web3,
} from "../data";

import { NFTType } from "../../api/nft_api";
import Web3 from "web3";
import * as sign_tools from "../../api/sign/sign_tools";
import {
  GetNextStorageIdRequest,
  GetNFTOffchainFeeAmtRequest,
  GetUserApiKeyRequest,
  OffchainNFTFeeReqType,
  OriginDeployNFTRequestV3,
} from "../../defs";
import { dumpError400 } from "../../utils";
import { BaseAPI } from "../../api/base_api";
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
    "getContractNFTMeta",
    async () => {
      const tokenAddress = "0x372c1a427ed867b666c99cfd6dbe7ec44c0bd6f7"; //LOOPRING_EXPORTED_ACCOUNT.nftTokenAddress;
      const _nftId = 55; // nftId;
      const provider = new PrivateKeyProvider(
        LOOPRING_EXPORTED_ACCOUNT.privateKey,
        "https://goerli.infura.io/v3/a06ed9c6b5424b61beafff27ecc3abf3"
      );
      const web3 = new Web3(provider);
      const result = await LoopringAPI.nftAPI.getContractNFTMeta({
        web3,
        tokenAddress,
        nftId: _nftId.toString(),
        nftType: NFTType.ERC1155,
      });
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getInfoForNFTTokens",
    async () => {
      const response = await LoopringAPI.nftAPI.getInfoForNFTTokens({
        nftDatas: [
          "0x1197d20d12bc9f80a4902c04c5a4b88371d32b0c14adce746eeea564850f47a5",
          "0x10e7f3b7ff37e4ebffabedb9fa19c66c63482b4b642d176068517c505edcd123",
        ],
      });
      console.log(`getInfoForNFTTokens: response: `, JSON.stringify(response));
    },
    DEFAULT_TIMEOUT
  );
  it("computeNFTAddress", async () => {
    const response = LoopringAPI.nftAPI.computeNFTAddress({
      nftOwner: "0xE20cF871f1646d8651ee9dC95AAB1d93160b3467",
      nftFactory: "0x40F2C1770E11c5bbA3A26aEeF89616D209705C5D",
    });
    console.log(
      `computeNFTAddress:`,
      response,
      "0xee354d81778a4c5a08fd9dbeb5cfd01a840a746d"
    );
  });
  it("ipfsCid0ToNftID", () => {
    const ipfs = "QmVYQaf5BP3y8Myr9m4z4FCZYx2v8NJmSHGzm2a2gqig9d";
    const nftID =
      "0x6b04cd991b972198cc63115c8abc3bf4ed73f07353c44271e940841b466a66f8";
    console.log(
      `ipfsCid0ToNftID: ipfs: `,
      ipfs,
      LoopringAPI.nftAPI.ipfsCid0ToNftID(ipfs)
    );
    expect(LoopringAPI.nftAPI.ipfsCid0ToNftID(ipfs)).toBe(nftID);
  });
  it("ipfsNftIDToCid", () => {
    const ipfs = "QmVYQaf5BP3y8Myr9m4z4FCZYx2v8NJmSHGzm2a2gqig9d";
    const nftID =
      "0x6b04cd991b972198cc63115c8abc3bf4ed73f07353c44271e940841b466a66f8";

    console.log(
      `ipfsCid0ToNftID: nftID: `,
      nftID,
      LoopringAPI.nftAPI.ipfsNftIDToCid(nftID)
    );
    expect(LoopringAPI.nftAPI.ipfsNftIDToCid(nftID)).toBe(ipfs);
  });
});
