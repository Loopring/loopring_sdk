import { ChainId, ConnectorNames, HEBAO_META_TYPE, SigSuffix } from '../../defs'
import { myLog } from '../../utils/log_tools'
import { getEcDSASig, GetEcDSASigType } from '../sign/sign_tools'
import { personalSign } from '../base_api'
import * as fm from '../../utils/formatter'
import * as sigUtil from 'eth-sig-util'
// import { toBuffer } from '../../utils'

const EIP712Domain = [
  { name: 'name', type: 'string' },
  { name: 'version', type: 'string' },
  { name: 'chainId', type: 'uint256' },
  { name: 'verifyingContract', type: 'address' },
]

function encodeAddressesPacked(addrs: string[]) {
  const addrsBs = Buffer.concat(
    addrs.map((a) => {
      return Buffer.from('00'.repeat(12) + a.slice(2), 'hex')
    }),
  )
  myLog('addrsBs', addrsBs.toString())
  return addrsBs
}

const domain = (chainId: ChainId, guardiaContractAddress: any, name: string, version: string) => {
  return {
    name,
    version: version,
    chainId: chainId,
    verifyingContract: guardiaContractAddress,
  }
}

function getApproveRecoverTypedData({
  chainId,
  guardiaContractAddress,
  wallet,
  validUntil,
  message,
  walletVersion,
}: {
  chainId: ChainId
  guardiaContractAddress: any
  wallet: any
  validUntil: any
  // newOwner: any,
  newGuardians?: Buffer | any
  message?: {
    [key: string]: any
  }
  walletVersion: 2 | 1
}) {
  const typedData = {
    types: {
      EIP712Domain,
      recover: [
        { name: 'wallet', type: 'address' },
        { name: 'validUntil', type: 'uint256' },
        { name: 'newOwner', type: 'address' },
        ...(walletVersion == 1 ? [] : [{ name: 'newGuardians', type: 'address[]' }]),
      ],
    },
    domain: domain(
      chainId,
      guardiaContractAddress,
      walletVersion == 1 ? 'GuardianModule' : 'LoopringWallet',
      walletVersion == 1 ? '1.2.0' : '2.0.0',
    ),
    primaryType: 'recover',
    message: {
      wallet: wallet,
      validUntil: validUntil,
      ...message,
      // newOwner: newOwner,
    },
  }
  // myLog('typedData message', ethUtil.keccak256(toBuffer(typedData.message)))
  return typedData
}

function getApproveTransferTypedData({
  chainId,
  guardiaContractAddress,
  wallet,
  validUntil,
  newGuardians,
  message,
  walletVersion,
}: {
  chainId: ChainId
  guardiaContractAddress: any
  wallet: any
  validUntil: any
  newGuardians?: Buffer | any
  message?: { [key: string]: any }
  walletVersion: 2 | 1
}) {
  const typedData = {
    types: {
      EIP712Domain,
      transferToken: [
        { name: 'wallet', type: 'address' },
        { name: 'validUntil', type: 'uint256' },
        { name: 'token', type: 'address' },
        { name: 'to', type: 'address' },
        { name: 'amount', type: 'uint256' },
        { name: 'logdata', type: 'bytes' },
      ],
    },
    domain: domain(
      chainId,
      guardiaContractAddress,
      walletVersion == 1 ? 'TransferModule' : 'LoopringWallet',
      walletVersion == 1 ? '1.2.0' : '2.0.0',
    ),
    primaryType: 'transferToken',
    message: {
      wallet: wallet,
      validUntil: validUntil,
      ...message,
    },
  }
  return typedData
}

// function getAddGuardianTypedData({
//   chainId,
//   guardiaContractAddress,
//   wallet,
//   validUntil,
//   message,
// }: {
//   chainId: ChainId
//   guardiaContractAddress: any
//   wallet: any
//   validUntil: any
//   message?: { [key: string]: any }
// }) {
//   const typedData = {
//     types: {
//       EIP712Domain,
//       addGuardian: [
//         { name: 'wallet', type: 'address' },
//         { name: 'validUntil', type: 'uint256' },
//         { name: 'guardian', type: 'address' },
//       ],
//     },
//     domain: domain(chainId, guardiaContractAddress),
//     primaryType: 'addGuardian',
//     message: {
//       wallet: wallet,
//       validUntil: validUntil,
//       ...message,
//     },
//   }
//   return typedData
// }

function getRemoveGuardianTypedData({
  chainId,
  guardiaContractAddress,
  wallet,
  validUntil,
  message,
  walletVersion,
}: {
  chainId: ChainId
  guardiaContractAddress: any
  wallet: any
  validUntil: any
  message?: { [key: string]: any }
  walletVersion: 2 | 1
}) {
  const typedData = {
    types: {
      EIP712Domain,
      removeGuardian: [
        { name: 'wallet', type: 'address' },
        { name: 'validUntil', type: 'uint256' },
        { name: 'guardian', type: 'address' },
      ],
    },
    domain: domain(
      chainId,
      guardiaContractAddress,
      walletVersion == 1 ? 'GuardianModule' : 'LoopringWallet',
      walletVersion == 1 ? '1.2.0' : '2.0.0',
    ),
    primaryType: 'removeGuardian',
    message: {
      wallet: wallet,
      validUntil: validUntil,
      ...message,
    },
  }
  return typedData
}
function getUnlockWalletTypedData({
  chainId,
  guardiaContractAddress,
  wallet,
  validUntil,
  walletVersion,
}: {
  chainId: ChainId
  guardiaContractAddress: any
  wallet: any
  validUntil: any
  walletVersion: 2 | 1
  // message?: { [key: string]: any }
}) {
  const typedData = {
    types: {
      EIP712Domain,
      unlock: [
        { name: 'wallet', type: 'address' },
        { name: 'validUntil', type: 'uint256' },
      ],
    },
    // EIP712.hash(
    //   EIP712.Domain("LoopringWallet", "2.0.0", address(this))
    // )

    domain: domain(
      chainId,
      guardiaContractAddress,
      walletVersion == 1 ? 'GuardianModule' : 'LoopringWallet',
      walletVersion == 1 ? '1.2.0' : '2.0.0',
    ),
    primaryType: 'unlock',
    message: {
      wallet: wallet,
      validUntil: validUntil,
    },
  }
  return typedData
}
function getApproveChangeMasterCopy({
  chainId,
  guardiaContractAddress,
  wallet,
  validUntil,
  newGuardians,
  message,
  walletVersion,
}: {
  chainId: ChainId
  guardiaContractAddress: any
  wallet: any
  validUntil: any
  newGuardians?: Buffer | any
  message?: { [key: string]: any }
  walletVersion: 2 | 1
}) {
  const typedData = {
    types: {
      EIP712Domain,
      changeMasterCopy: [
        { name: 'wallet', type: 'address' },
        { name: 'validUntil', type: 'uint256' },
        { name: 'masterCopy', type: 'address' },
      ],
    },
    domain: domain(
      chainId,
      guardiaContractAddress,
      walletVersion == 1 ? 'GuardianModule' : 'LoopringWallet',
      walletVersion == 1 ? '1.2.0' : '2.0.0',
    ),
    primaryType: 'changeMasterCopy',
    message: {
      wallet: wallet,
      validUntil: validUntil,
      ...message,
    },
  }
  return typedData
}
function getDepositWalletTypedData({
  chainId,
  guardiaContractAddress,
  wallet,
  validUntil,
  newGuardians,
  message,
  walletVersion,
}: {
  chainId: ChainId
  guardiaContractAddress: any
  wallet: any
  validUntil: any
  newGuardians?: Buffer | any
  message?: { [key: string]: any }
  walletVersion: 2 | 1
}) {
  const typedData = {
    types: {
      EIP712Domain,
      callContract: [
        { name: 'wallet', type: 'address' },
        { name: 'validUntil', type: 'uint256' },
        { name: 'to', type: 'address' },
        { name: 'value', type: 'uint256' },
        { name: 'data', type: 'bytes' },
      ],
    },
    domain: domain(
      chainId,
      guardiaContractAddress,
      walletVersion == 1 ? 'TransferModule' : 'LoopringWallet',
      walletVersion == 1 ? '1.2.0' : '2.0.0',
    ),
    primaryType: 'callContract',
    message: {
      wallet: wallet,
      validUntil: validUntil,
      ...message,
    },
  }
  return typedData
}

function getApproveTokenCopy({
  chainId,
  guardiaContractAddress,
  wallet,
  validUntil,
  message,
  walletVersion,
}: {
  chainId: ChainId
  guardiaContractAddress: any
  wallet: any
  validUntil: any
  newGuardians?: Buffer | any
  message?: { [key: string]: any }
  walletVersion: 2 | 1
}) {
  const typedData = {
    types: {
      EIP712Domain,
      approveToken: [
        { name: 'wallet', type: 'address' },
        { name: 'validUntil', type: 'uint256' },
        { name: 'token', type: 'address' },
        { name: 'to', type: 'address' },
        { name: 'amount', type: 'uint256' },
      ],
    },
    domain: domain(
      chainId,
      guardiaContractAddress,
      walletVersion == 1 ? 'TransferModule' : 'LoopringWallet',
      walletVersion == 1 ? '1.2.0' : '2.0.0',
    ),
    primaryType: 'approveToken',
    message: {
      wallet: wallet,
      validUntil: validUntil,
      ...message,
    },
  }
  return typedData
}
export async function signHebaoApproveWrap(
  props: {
    web3: any
    chainId: ChainId
    owner: string
    isHWAddr: boolean
    type: HEBAO_META_TYPE
  } & {
    newGuardians?: any
    masterCopy?: string
    wallet: string
    validUntil: number
    forwarderModuleAddress?: string
    messageData?: {
      [key: string]: any
    }
    guardian: any
    walletVersion: 1 | 2
  },
) {
  let typedData: any
  try {
    const {
      chainId,
      web3,
      type,
      owner,
      isHWAddr,
      wallet,
      validUntil,
      forwarderModuleAddress,
      masterCopy,
      messageData,
      guardian,
      walletVersion,
    } = props as any
    let typedData, messageHash
    myLog('backend hash', guardian?.messageHash)

    switch (type) {
      case HEBAO_META_TYPE.recovery:
        let newOwner = messageData?.newOwner
        if (!newOwner) {
          throw 'no newOwner'
        }
        typedData = getApproveRecoverTypedData({
          chainId,
          guardiaContractAddress: forwarderModuleAddress ? forwarderModuleAddress : masterCopy,
          wallet, // guardian.signedRequest.wallet,
          validUntil, // guardian.signedRequest.validUntil,
          message: {
            newOwner,
            ...(walletVersion == 1
              ? {}
              : {
                  newGuardians: messageData?.newGuardians,
                  //   : ethers.utils.solidityKeccak256(
                  //   Array(messageData?.newGuardians?.length).fill('address'),
                  //   messageData?.newGuardians,
                  // ),
                  //   ethUtil.keccak256(
                  //   messageData?.newGuardians
                  //     .map((address: string) => address.toLowerCase().replace('0x', ''))
                  //     .join(''),
                  // ),
                  //   ethers.utils.solidityKeccak256(
                  //   Array(messageData?.newGuardians?.length).fill('address'),
                  //   messageData?.newGuardians,
                  // ),
                }),
          },
          walletVersion,
        })
        break
      case HEBAO_META_TYPE.remove_guardian:
        typedData = getRemoveGuardianTypedData({
          chainId,
          guardiaContractAddress: forwarderModuleAddress ? forwarderModuleAddress : masterCopy,
          wallet, // guardian.signedRequest.wallet,
          validUntil, // guardian.signedRequest.validUntil,
          message: {
            guardian: messageData?.guardianAddress,
          },
          walletVersion,
        })
        break

      case HEBAO_META_TYPE.unlock_wallet:
        typedData = getUnlockWalletTypedData({
          chainId,
          guardiaContractAddress: forwarderModuleAddress ? forwarderModuleAddress : masterCopy,
          wallet, // guardian.signedRequest.wallet,
          validUntil, // guardian.signedRequest.validUntil,
          // message: {
          //   guardian: messageData.guardian,
          // },
          walletVersion,
        })
        break
      case HEBAO_META_TYPE.transfer:
        typedData = getApproveTransferTypedData({
          chainId,
          guardiaContractAddress: forwarderModuleAddress ? forwarderModuleAddress : masterCopy,
          wallet, // guardian.signedRequest.wallet,
          validUntil, // guardian.signedRequest.validUntil,
          message: {
            token: messageData.token,
            to: messageData.to,
            amount: messageData.amount,
            logdata: messageData.logdata,
          },
          walletVersion,
        })
        break
      case HEBAO_META_TYPE.deposit_wallet:
        typedData = getDepositWalletTypedData({
          chainId,
          guardiaContractAddress: forwarderModuleAddress ? forwarderModuleAddress : masterCopy,
          wallet, // guardian.signedRequest.wallet,
          validUntil, // guardian.signedRequest.validUntil,
          message: {
            to: messageData.to,
            value: messageData.value,
            data: messageData.data,
          },
          walletVersion,
        })
        break
      case HEBAO_META_TYPE.approve_token:
        typedData = getApproveTokenCopy({
          chainId,
          guardiaContractAddress: forwarderModuleAddress ? forwarderModuleAddress : masterCopy,
          wallet, // guardian.signedRequest.wallet,
          validUntil, // guardian.signedRequest.validUntil,
          message: {
            token: messageData.token,
            to: messageData.to,
            amount: messageData.amount,
            // logdata: messageData.logdata,
            // masterCopy: messageData.newMasterCopy,
          },
          walletVersion,
        })
        break
      case HEBAO_META_TYPE.upgrade_contract:
        typedData = getApproveChangeMasterCopy({
          chainId,
          guardiaContractAddress: forwarderModuleAddress ? forwarderModuleAddress : masterCopy,
          wallet, // guardian.signedRequest.wallet,
          validUntil, // guardian.signedRequest.validUntil,
          message: {
            masterCopy: messageData.newMasterCopy,
          },
          walletVersion,
        })
        break
      default:
        messageHash = guardian?.messageHash
    }

    if (typedData) {
      const result = await getEcDSASig(
        web3,
        typedData,
        owner,
        isHWAddr ? GetEcDSASigType.WithoutDataStruct : GetEcDSASigType.HasDataStruct,
        chainId,
        undefined,
        '',
        ConnectorNames.Unknown,
        // counterFactualInfo
      )
      // ecdsaSignature
      return (result.ecdsaSig += SigSuffix.Suffix02)
    } else {
      // const messageHash =
      const signature: any = await personalSign(
        web3,
        owner,
        '',
        messageHash,
        ConnectorNames.Unknown,
        chainId,
      )
      if (signature?.sig) {
        return (signature.sig += SigSuffix.Suffix03)
      } else {
        throw 'empty'
      }
    }

    // }
  } catch (error) {
    // console.log('EcDSASig error try sign WithoutDataStruct')
    throw error
  }
}
