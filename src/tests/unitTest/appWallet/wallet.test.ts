import {
  TOKEN_INFO,
  LOOPRING_EXPORTED_ACCOUNT,
  LoopringAPI,
  DEFAULT_TIMEOUT,
  web3,
} from '../../test.MockData'
import * as sdk from '../../../index'
import * as ethUtil from 'ethereumjs-util'
import { myLog } from '../../../utils/log_tools'

describe('WalletApi', function () {
  it(
    'getUserAssets',
    async () => {
      const request: sdk.GetUserAssetsRequest = {
        wallet: LOOPRING_EXPORTED_ACCOUNT.addressContractWallet,
        offset: 10,
        limit: 10,
      }

      const response = await LoopringAPI.walletAPI.getUserAssets(request)
      console.log(response)
    },
    DEFAULT_TIMEOUT,
  )

  it(
    'getTokenPrices',
    async () => {
      const response = await LoopringAPI.walletAPI.getTokenPrices({
        token: TOKEN_INFO.tokenMap.LRC.address,
      })
      console.log(response)
    },
    DEFAULT_TIMEOUT,
  )

  it(
    'getLatestTokenPrices',
    async () => {
      const response = await LoopringAPI.walletAPI.getLatestTokenPrices()
      console.log(response)
    },
    DEFAULT_TIMEOUT,
  )

  it(
    'getLatestTokenPrices_cny',
    async () => {
      const response = await LoopringAPI.walletAPI.getLatestTokenPrices({
        currency: sdk.Currency.cny,
      })
      console.log(response)
    },
    DEFAULT_TIMEOUT,
  )
  // it(
  //   'signHebaoApproveWithDataStructureForContract V1',
  //   async () => {
  //     const request: any = {
  //       approveRecordId: 2325,
  //       txAwareHash: '0x7de6db4d1eb828442404daa7a70ee10a5c7d69c3f9685a8a52dc069fd53575bb',
  //       securityNumber: '403265',
  //       signer: '0xff7d59d9316eba168837e3ef924bcdfd64b237d8',
  //       signature: '',
  //     }
  //     const guardian: any = {
  //       ens: 'testcmx1.loopring.eth',
  //       address: '0xd4bd7c71b6d4a09217ccc713f740d6ed8f4ea0cd',
  //       type: 'recovery',
  //       id: 2325,
  //       messageHash: '0x7de6db4d1eb828442404daa7a70ee10a5c7d69c3f9685a8a52dc069fd53575bb',
  //       businessDataJson: {
  //         value: {
  //           value: {
  //             wallet: '0xd4bd7c71b6d4a09217ccc713f740d6ed8f4ea0cd',
  //             newOwner: '0x696c291239931ac87f5053bcb8e621a181fb3f08',
  //             oldOwnerIsLocked: false,
  //             newGuardians: [],
  //           },
  //         },
  //       },
  //       signedRequest: {
  //         signers: '',
  //         signatures: '',
  //         validUntil: '1663646243',
  //         wallet: '0xd4bd7c71b6d4a09217ccc713f740d6ed8f4ea0cd',
  //       },
  //       approveId: 2325,
  //       wallet: '0xd4bd7c71b6d4a09217ccc713f740d6ed8f4ea0cd',
  //       guardian: '0xff7d59d9316eba168837e3ef924bcdfd64b237d8',
  //       metaTxType: 16,
  //       txAwareHash: '0x7de6db4d1eb828442404daa7a70ee10a5c7d69c3f9685a8a52dc069fd53575bb',
  //       createAt: 1658462243419,
  //     }
  //     // ("0x46d4e3d3db8fcb401e5d4020b958755a3419b84b");
  //     // const walletModule = {
  //     //   moduleName: "FORWARDER_MODULE",
  //     //   moduleAddress: "0x21e3143ef5677c465c2aba68ef7137f063933c7c",
  //     // };
  //     const forwarderModuleAddress = '0x46d4e3d3db8fcb401e5d4020b958755a3419b84b' //walletModule.moduleAddress;
  //     const newOwner = guardian.businessDataJson?.value.value.newOwner
  //     const response = await LoopringAPI.walletAPI.signHebaoApproveWithDataStructureForContract(
  //       web3,
  //       request.signer,
  //       guardian,
  //       LOOPRING_EXPORTED_ACCOUNT.chainId,
  //       newOwner,
  //       undefined,
  //       undefined,
  //       forwarderModuleAddress,
  //     )
  //     // const hash
  //     //   = ;
  //
  //     console.log(response)
  //   },
  //   DEFAULT_TIMEOUT,
  // )

  // it(
  //   'signHebaoApproveWithDataStructureForContract V2 guardians=[]',
  //   async () => {
  //     const contractType = {
  //       network: 'ETHEREUM',
  //       contractVersion: 'V2_0_0',
  //       masterCopy: '0x4b16684de50ebcc60fd54b0a5fd1ccfdc940bb27',
  //       walletFactory: '0x8c3d4e1728f77abcd220323260da4a9306fb6433',
  //       ens: '',
  //       walletStatus: 5,
  //       queueStatus: 3,
  //       walletType: 0,
  //       isCounterFactual: false,
  //     }
  //     const request: any = {
  //       approveRecordId: 2323,
  //       txAwareHash: '0xaeaf14dc427a0fbfa3e60887fd46b7263907d415ff8e392a4429279322fb97c2',
  //       securityNumber: '514038',
  //       signer: '0xff7d59d9316eba168837e3ef924bcdfd64b237d8',
  //       signature: '',
  //     }
  //     const guardian: any = {
  //       ens: '',
  //       address: '0x98ee79ce59f84b16f394cbf89413a256c94e2c1c',
  //       type: 'recovery',
  //       id: 2323,
  //       messageHash: '0xaeaf14dc427a0fbfa3e60887fd46b7263907d415ff8e392a4429279322fb97c2',
  //       businessDataJson: {
  //         value: {
  //           value: {
  //             wallet: '0x98ee79ce59f84b16f394cbf89413a256c94e2c1c',
  //             newOwner: '0xa37f4dddc2389f26d17dc2a4045e905b657a00d8',
  //             oldOwnerIsLocked: true,
  //             request: {
  //               signers: [
  //                 '0xfcc50ae865cdcbd846f2f2ce5099d31f99bc6db1',
  //                 '0xff7d59d9316eba168837e3ef924bcdfd64b237d8',
  //               ],
  //               signatures: [
  //                 '0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  //                 '0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  //               ],
  //               validUntil: '1663645929',
  //               wallet: '0x98ee79ce59f84b16f394cbf89413a256c94e2c1c',
  //             },
  //             newGuardians: [],
  //           },
  //         },
  //       },
  //       signedRequest: {
  //         signers: '',
  //         signatures: '',
  //         validUntil: '1663645929',
  //         wallet: '0x98ee79ce59f84b16f394cbf89413a256c94e2c1c',
  //       },
  //       approveId: 2323,
  //       wallet: '0x98ee79ce59f84b16f394cbf89413a256c94e2c1c',
  //       guardian: '0xff7d59d9316eba168837e3ef924bcdfd64b237d8',
  //       metaTxType: 16,
  //       txAwareHash: '0xaeaf14dc427a0fbfa3e60887fd46b7263907d415ff8e392a4429279322fb97c2',
  //       createAt: 1658461929755,
  //     }
  //     const newOwner = guardian.businessDataJson.value.value?.newOwner
  //     // const guardiansBs = LoopringAPI.walletAPI.encodeAddressesPacked(
  //     //   guardian.businessDataJson.value.value.newGuardians
  //     // );
  //     const newGuardians = ethUtil.keccak(
  //       web3.eth.abi.encodeParameter(
  //         'address[]',
  //         guardian.businessDataJson.value.value.newGuardians,
  //       ),
  //     )
  //     //   ethUtil.keccak(
  //     //
  //     // );
  //     myLog('newGuardians', newGuardians)
  //     // const guardiansHash = ethUtil.keccak(guardiansBs);
  //     const response = await LoopringAPI.walletAPI.getA(
  //       LOOPRING_EXPORTED_ACCOUNT.chainId,
  //       contractType.masterCopy,
  //       guardian.signedRequest.wallet,
  //       guardian.signedRequest.validUntil,
  //       newOwner,
  //       newGuardians,
  //     )
  //     //0x7a5b52a82fc0814bb3400e1075ea5aad34ca210497ce5c7e581eea6ee0f75650
  //     console.log(response, guardian.messageHash)
  //   },
  //   DEFAULT_TIMEOUT,
  // )
})
