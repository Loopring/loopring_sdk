// import {
//   DEFAULT_TIMEOUT,
//   LOOPRING_EXPORTED_ACCOUNT,
//   LoopringAPI,
//   web3,
//   TOKEN_INFO,
//   signatureKeyPairMock,
// } from "../../MockData";
import { ChainId } from "../../defs";
import { getApproveChangeMasterCopy, getApproveRecoverTypedData, getApproveTokenCopy, getApproveTransferTypedData, getRemoveGuardianTypedData } from "../../api/config";
import { DEFAULT_TIMEOUT } from "../MockData";


describe("skr", function () {
  it(
    "getDefiMarkets",
    async () => {
      getApproveRecoverTypedData({
        chainId: ChainId.SEPOLIA,
        guardiaContractAddress: "0x8abE988eBAF2300C67b81D739D4cd47A459d96A3",
        wallet: "0xb2dceb35c677d68905f515823013e17398ccec42",
        validUntil: "1000000000000",
        // newOwner: any,
        // newGuardians?: Buffer | any
        message: {
          newGuardians: [
            "0x8abE988eBAF2300C67b81D739D4cd47A459d96A3",
            "0xC8F94119421Df72F0AAc045eF6F2867e08D69Fc5"
          ],
          newOwner: "0x41fbdc3ee1f2dcee90aac987ac9fd9bc0ee39624"

        },
        walletVersion: 2
      })
      getApproveTransferTypedData({
        chainId: ChainId.SEPOLIA,
        guardiaContractAddress: "0x8abE988eBAF2300C67b81D739D4cd47A459d96A3",
        wallet: "0xb2dceb35c677d68905f515823013e17398ccec42",
        validUntil: "1000000000000",
        // newOwner: any,
        // newGuardians?: Buffer | any
        message: {
          token: '0x0000000000000000000000000000000000000000',
         to: "0x8abE988eBAF2300C67b81D739D4cd47A459d96A3",
         amount: '100000000000000000',
         logdata: '0x'
        },
        walletVersion: 2
      })
      getApproveTokenCopy({
        chainId: ChainId.SEPOLIA,
        guardiaContractAddress: "0x8abE988eBAF2300C67b81D739D4cd47A459d96A3",
        wallet: "0xb2dceb35c677d68905f515823013e17398ccec42",
        validUntil: "1000000000000",
        // newOwner: any,
        // newGuardians?: Buffer | any
        message: {
          token: '0x0000000000000000000000000000000000000000',
         to: "0x8abE988eBAF2300C67b81D739D4cd47A459d96A3",
         amount: '100000000000000000',
         logdata: '0x'
        },
        walletVersion: 2
      })
      getRemoveGuardianTypedData({
        chainId: ChainId.SEPOLIA,
        guardiaContractAddress: "0x8abE988eBAF2300C67b81D739D4cd47A459d96A3",
        wallet: "0xb2dceb35c677d68905f515823013e17398ccec42",
        validUntil: "1000000000000",
        // newOwner: any,
        // newGuardians?: Buffer | any
        message: {
          guardian: "0x8abE988eBAF2300C67b81D739D4cd47A459d96A3"
        //   token: '0x0000000000000000000000000000000000000000',
        //  to: "0x8abE988eBAF2300C67b81D739D4cd47A459d96A3",
        //  amount: '100000000000000000',
        //  logdata: '0x'
        },
        walletVersion: 2
      })
      getApproveChangeMasterCopy({
        chainId: ChainId.SEPOLIA,
        guardiaContractAddress: "0x8abE988eBAF2300C67b81D739D4cd47A459d96A3",
        wallet: "0xb2dceb35c677d68905f515823013e17398ccec42",
        validUntil: "1000000000000",
        // newOwner: any,
        // newGuardians?: Buffer | any
        message: {
          masterCopy: "0x41fbdc3ee1f2dcee90aac987ac9fd9bc0ee39624"
        //   token: '0x0000000000000000000000000000000000000000',
        //  to: "0x8abE988eBAF2300C67b81D739D4cd47A459d96A3",
        //  amount: '100000000000000000',
        //  logdata: '0x'
        },
        walletVersion: 2
      })
    },
    DEFAULT_TIMEOUT
  );

  
});
