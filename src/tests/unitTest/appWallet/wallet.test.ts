import {
  TOKEN_INFO,
  LOOPRING_EXPORTED_ACCOUNT,
  LoopringAPI,
  DEFAULT_TIMEOUT,
  web3,
} from "../../MockData";
import * as sdk from "../../../index";
import * as ethUtil from "ethereumjs-util";

describe("WalletApi", function () {
  it(
    "getUserAssets",
    async () => {
      const request: sdk.GetUserAssetsRequest = {
        wallet: LOOPRING_EXPORTED_ACCOUNT.addressContractWallet,
        offset: 10,
        limit: 10,
      };

      const response = await LoopringAPI.walletAPI.getUserAssets(request);
      console.log(response);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getTokenPrices",
    async () => {
      const response = await LoopringAPI.walletAPI.getTokenPrices({
        token: TOKEN_INFO.tokenMap.LRC.address,
      });
      console.log(response);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getLatestTokenPrices",
    async () => {
      const response = await LoopringAPI.walletAPI.getLatestTokenPrices();
      console.log(response);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getLatestTokenPrices_cny",
    async () => {
      const response = await LoopringAPI.walletAPI.getLatestTokenPrices({
        currency: sdk.Currency.cny,
      });
      console.log(response);
    },
    DEFAULT_TIMEOUT
  );
  it(
    "signHebaoApproveWithDataStructureForContract V1",
    async () => {
      const request: any = {
        approveRecordId: 2315,
        txAwareHash:
          "0x2cbc4978a9c0f308e7c2b2f697d34fde91e4ebbfa5e538d61af252818a37c5d0",
        securityNumber: "227145",
        signer: "0xff7d59d9316eba168837e3ef924bcdfd64b237d8",
        signature: "",
      };
      const guardian: any = {
        ens: "testcmx1.loopring.eth",
        address: "0xd4bd7c71b6d4a09217ccc713f740d6ed8f4ea0cd",
        type: "transfer",
        id: 2315,
        messageHash:
          "0x2cbc4978a9c0f308e7c2b2f697d34fde91e4ebbfa5e538d61af252818a37c5d0",
        businessDataJson: {
          value: {
            value: {
              request: {
                signers: [
                  "0x50a4e2501d03b54106ce7ec761d95c505e342ec0",
                  "0x99ee93fc856b4909570de66232062a80241ab7e1",
                  "0xff7d59d9316eba168837e3ef924bcdfd64b237d8",
                ],
                signatures: [
                  "0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
                  "0x181d9d1937d3d2fc514e9f2d5dac5907a4b6ebb47a0727a3c323121332cfb327611e242b13bcb1fef775aea1adc9dce846c5a5e82be53ee0da30556d270df2861c02",
                  "0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
                ],
                validUntil: 1663511168,
                wallet: "0xd4bd7c71b6d4a09217ccc713f740d6ed8f4ea0cd",
              },
              token: "0x0000000000000000000000000000000000000000",
              to: "0xccc09aa444d80a427f9bf4e1b9ad4da1f4d4194c",
              amount: "1100000000000000",
              logdata: "0x",
              memo: "",
            },
          },
        },
        signedRequest: {
          signers: "",
          signatures: "",
          validUntil: 1663511168,
          wallet: "0xd4bd7c71b6d4a09217ccc713f740d6ed8f4ea0cd",
        },
        approveId: 2315,
        wallet: "0xd4bd7c71b6d4a09217ccc713f740d6ed8f4ea0cd",
        guardian: "0xff7d59d9316eba168837e3ef924bcdfd64b237d8",
        metaTxType: 18,
        txAwareHash:
          "0x2cbc4978a9c0f308e7c2b2f697d34fde91e4ebbfa5e538d61af252818a37c5d0",
        createAt: 1658327171160,
      };
      const newOwner =
        guardian.businessDataJson && guardian.businessDataJson?.newOwner
          ? guardian.businessDataJson?.newOwner
          : "";
      const response =
        await LoopringAPI.walletAPI.signHebaoApproveWithDataStructureForContract(
          web3,
          request.signer,
          guardian,
          LOOPRING_EXPORTED_ACCOUNT.chainId,
          newOwner
        );
      // const hash
      //   = ;

      console.log(response);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "signHebaoApproveWithDataStructureForContract V2 guardians=[]",
    async () => {
      const walletType = {
        contractVersion: "V2_0_0",
        ens: "",
        isCounterFactual: false,
        masterCopy: "0x4b16684de50ebcc60fd54b0a5fd1ccfdc940bb27",
        network: "ETHEREUM",
        queueStatus: 3,
        walletFactory: "0x8c3d4e1728f77abcd220323260da4a9306fb6433",
        walletStatus: 5,
        walletType: 0,
      };
      const request: any = {
        approveRecordId: 2318,
        txAwareHash:
          "0x5e80fad049052618e5f4989f66006b03f677a67ba375b7316aac6979245fb5ca",
        securityNumber: "610104",
        signer: "0xff7d59d9316eba168837e3ef924bcdfd64b237d8",
        signature: "",
      };
      const guardian: any = {
        ens: "",
        address: "0x98ee79ce59f84b16f394cbf89413a256c94e2c1c",
        type: "unlock_wallet",
        id: 2318,
        messageHash:
          "0x5e80fad049052618e5f4989f66006b03f677a67ba375b7316aac6979245fb5ca",
        businessDataJson: {
          value: {
            value: {
              guardianAddress: "0x98ee79ce59f84b16f394cbf89413a256c94e2c1c",
              protectAddress: "0x98ee79ce59f84b16f394cbf89413a256c94e2c1c",
            },
          },
        },
        signedRequest: {
          signers: "",
          signatures: "",
          validUntil: 1663511843,
          wallet: "0x98ee79ce59f84b16f394cbf89413a256c94e2c1c",
        },
        approveId: 2318,
        wallet: "0x98ee79ce59f84b16f394cbf89413a256c94e2c1c",
        guardian: "0xff7d59d9316eba168837e3ef924bcdfd64b237d8",
        metaTxType: 37,
        txAwareHash:
          "0x5e80fad049052618e5f4989f66006b03f677a67ba375b7316aac6979245fb5ca",
        createAt: 1658327844298,
      };
      let guardians: string[] = [];
      const newOwner =
        guardian.businessDataJson && guardian.businessDataJson?.newOwner
          ? guardian.businessDataJson?.newOwner
          : "";
      const guardiansBs =
        LoopringAPI.walletAPI.encodeAddressesPacked(guardians);
      const guardiansHash = ethUtil.keccak(guardiansBs);
      const response =
        await LoopringAPI.walletAPI.signHebaoApproveWithDataStructureForContract(
          web3,
          request.signer,
          guardian,
          LOOPRING_EXPORTED_ACCOUNT.chainId,
          newOwner,
          guardiansHash,
          walletType.masterCopy
        );
      //0x7a5b52a82fc0814bb3400e1075ea5aad34ca210497ce5c7e581eea6ee0f75650
      console.log(response);
    },
    DEFAULT_TIMEOUT
  );
});
