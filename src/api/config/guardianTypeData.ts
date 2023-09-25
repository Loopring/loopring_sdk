import { ChainId, ConnectorNames, CounterFactualInfo } from '../../defs'

import { myLog } from '../../utils/log_tools'
import { getEcDSASig, GetEcDSASigType } from '../sign/sign_tools'
import { HEBAO_META_TYPE } from '../../../dist'
const EIP712Domain = [
  { name: 'name', type: 'string' },
  { name: 'version', type: 'string' },
  { name: 'chainId', type: 'uint256' },
  { name: 'verifyingContract', type: 'address' },
]
const domain = (chainId: ChainId, guardiaContractAddress: any) => {
  return {
    name: 'GuardianModule',
    version: '1.2.0',
    chainId: chainId,
    verifyingContract: guardiaContractAddress,
  }
}
function getApproveRecoverTypedData(
  chainId: ChainId,
  guardiaContractAddress: any,
  wallet: any,
  validUntil: any,
  newOwner: any,
  newGuardians?: Buffer | any,
) {
  const typedData = {
    types: {
      EIP712Domain,
      recover: [
        { name: 'wallet', type: 'address' },
        { name: 'validUntil', type: 'uint256' },
        { name: 'newOwner', type: 'address' },
        ...(newGuardians ? [{ name: 'newGuardians', type: 'string' }] : []),
      ],
    },
    domain: domain(chainId, guardiaContractAddress),
    primaryType: 'recover',
    message: {
      wallet: wallet,
      validUntil: validUntil,
      newOwner: newOwner,
    },
  }
  return typedData
}
function getApproveTransferTypedData(
  chainId: ChainId,
  guardiaContractAddress: any,
  wallet: any,
  validUntil: any,
  // newOwner: any,
  newGuardians?: Buffer | any,
  message?: {
    [key: string]: any
  },
) {
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
    domain: domain(chainId, guardiaContractAddress),
    primaryType: 'approveToken',
    message: {
      wallet: wallet,
      validUntil: validUntil,
      // newOwner: newOwner,
      ...(newGuardians ? [{ name: 'newGuardians', type: 'string' }] : []),
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
  } & (
    | { messageHash: string }
    | ({
        counterFactualInfo?: CounterFactualInfo
        wallet: string
        validUntil: number
        newOwner: string
      } & (
        | { forwarderModuleAddress?: undefined | string }
        | { newGuardians?: any; masterCopy?: string }
      ))
  ),
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
      newOwner,
      masterCopy,
      newGuardians,
      messageHash,
    } = props as any
    let typedData
    switch (type) {
      case HEBAO_META_TYPE.recovery:
        typedData = getApproveRecoverTypedData(
          chainId,
          newGuardians ? forwarderModuleAddress : masterCopy,
          wallet, // guardian.signedRequest.wallet,
          validUntil, // guardian.signedRequest.validUntil,
          newOwner,
          newGuardians ? newGuardians : undefined,
        )
        break
      case HEBAO_META_TYPE.transfer:
      case HEBAO_META_TYPE.add_guardian:
      case HEBAO_META_TYPE.remove_guardian:

      case HEBAO_META_TYPE.unlock_wallet:
      case HEBAO_META_TYPE.deposit_wallet:
      case HEBAO_META_TYPE.add_guardian:
    }

    myLog('typedData', typedData)

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
    return result.ecdsaSig
    // }
  } catch (error) {
    // console.log('EcDSASig error try sign WithoutDataStruct')
    throw error
  }
}

// export async function getApproveRecoverTypedData(
//   chainId: ChainId,
//   guardiaContractAddress: any,
//   wallet: any,
//   validUntil: any,
//   newOwner: any,
//   newGuardians?: Buffer | any,
// ) {
//   const typedData = {
//     types: {
//       EIP712Domain,
//       recover: [
//         { name: 'wallet', type: 'address' },
//         { name: 'validUntil', type: 'uint256' },
//         { name: 'newOwner', type: 'address' },
//         ...(newGuardians ? [{ name: 'newGuardians', type: 'string' }] : []),
//       ],
//     },
//     domain: domain(chainId, guardiaContractAddress),
//     primaryType: 'recover',
//     message: {
//       wallet: wallet,
//       validUntil: validUntil,
//       newOwner: newOwner,
//     },
//   }
//   return typedData
// }
// export async function getApproveRecoverV2TypedData(
//   chainId: ChainId,
//   guardiaContractAddress: any,
//   wallet: any,
//   validUntil: any,
//   newOwner: any,
//   newGuardians?: Buffer | any,
// ) {
//   const typedData = {
//     types: {
//       EIP712Domain,
//       recover: [
//         { name: 'wallet', type: 'address' },
//         { name: 'validUntil', type: 'uint256' },
//         { name: 'newOwner', type: 'address' },
//         { name: 'newGuardians', type: 'string' },
//       ],
//     },
//     domain: domain(chainId, guardiaContractAddress),
//     primaryType: 'recover',
//     message: {
//       wallet: wallet,
//       validUntil: validUntil,
//       newOwner: newOwner,
//       newGuardians: newGuardians,
//     },
//   }
//   return typedData
// }
