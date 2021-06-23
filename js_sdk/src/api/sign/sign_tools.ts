import sha256 from 'crypto-js/sha256'
import * as abi from 'ethereumjs-abi'
import * as sigUtil from 'eth-sig-util'
import * as ethUtil from 'ethereumjs-util'

import BN from 'bn.js'

import * as Poseidon from './poseidon'

import EdDSA from './eddsa'

import BigInteger from 'bignumber.js'

import * as fm from '../../utils/formatter'

import { personalSign } from '../ethereum/metaMask'

import { ChainId, ConnectorNames } from '../../defs/web3_defs'

import { 
  AmmPoolRequestPatch,
  ExitAmmPoolRequest,
  JoinAmmPoolRequest,
  OffChainWithdrawalRequestV3,
  OriginTransferRequestV3,
  PublicKey,
  UpdateAccountRequestV3, 
} from '../../defs/loopring_defs'

import Web3 from 'web3'

import { EIP712TypedData } from 'eth-sig-util'

import { toHex, toBig, } from '../../utils/formatter'

const keyMessage = 'Sign this message to access Loopring Exchange: '
const transferMessage = 'Sign this message to authorize Loopring Pay: '

const SNARK_SCALAR_FIELD = new BigInteger('21888242871839275222246405745257275088548364400416034343698204186575808495617', 10)

export async function generateKeyPair(web3: any, address: string, exchangeAddress: string, keyNonce: number, walletType: ConnectorNames) {

  const result = await personalSign(
    web3,
    address, '',
    keyMessage + exchangeAddress + ' with key nonce: ' + keyNonce,
    walletType
  )

  if (!result.error) {
    const keyPair = EdDSA.generateKeyPair(ethUtil.sha256(fm.toBuffer((result.sig))))
    const sk = toHex(toBig(keyPair.secretKey))
    return {
      keyPair,
      sk,
    }
  } else {
    throw Error(result.error)
  }
}

export function convertPublicKey(pk: PublicKey) {
  
}

export function getUpdateAccountEcdsaTypedData(data: UpdateAccountRequestV3, patch: AmmPoolRequestPatch) {
  let message: any = {
    owner: data.owner,
    accountID: data.accountId,
    feeTokenID: data.maxFee.tokenId,
    maxFee: data.maxFee.volume,
    publicKey: data.publicKey,
    validUntil: data.validUntil,
  };
  const typedData: EIP712TypedData = {
    types: {
      EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' },
      ],
      PoolExit: [
        { name: 'owner', type: 'address' },
        { name: 'burnAmount', type: 'uint96' },
        { name: 'burnStorageID', type: 'uint32' },
        { name: 'exitMinAmounts', type: 'uint96[]' },
        { name: 'fee', type: 'uint96' },
        { name: 'validUntil', type: 'uint32' },
      ],
    },
    primaryType: 'PoolExit',
    domain: {
      name: patch.ammName,
      version: '1.0.0',
      chainId: patch.chainId,
      verifyingContract: patch.poolAddress,
    },
    message: message,
  };
  return typedData;
}

const makeRequestParamStr = (request: Map<string, any>) => {

  // @ts-ignore
  // var mapAsc = new Map([...request.entries()].sort())
  const mapAsc = new Map([...request].sort())

  var paramlist: Array<string> = new Array()

  const keys = Object.keys(Object.fromEntries(request))

  keys.forEach((key: string) => {
    const value = request.get(key)
    if (value !== undefined && value !== '')
      paramlist.push(encodeURIComponent(`${key}=${value}`))
  })

  return paramlist.join('&')

}

/*
const makeObjectStr = (request: any) => {
  return JSON.stringify(request)
}

const genSig = (PrivateKey: string, hash: any) => {

  const signature = EdDSA.sign(PrivateKey, hash)

  return (
    fm.formatEddsaKey(fm.toHex(fm.toBig(signature.Rx))) +
    fm.clearHexPrefix(fm.formatEddsaKey(fm.toHex(fm.toBig(signature.Ry)))) +
    fm.clearHexPrefix(fm.formatEddsaKey(fm.toHex(fm.toBig(signature.s))))
  )

}
*/

//submitOrderV3
const genSigWithPadding = (PrivateKey: string | undefined, hash: any) => {

  const signature = EdDSA.sign(PrivateKey, hash)

  let signatureRx_Hex = fm.clearHexPrefix(
    fm.toHex(fm.toBN(signature.Rx.toString('hex')))
  );
  if (signatureRx_Hex.length < 64) {
    const padding = new Array(64 - signatureRx_Hex.length).fill(0);
    signatureRx_Hex = padding.join('').toString() + signatureRx_Hex;
  }

  let signatureRy_Hex = fm.clearHexPrefix(
    fm.toHex(fm.toBN(signature.Ry.toString('hex')))
  );
  if (signatureRy_Hex.length < 64) {
    const padding = new Array(64 - signatureRy_Hex.length).fill(0);
    signatureRy_Hex = padding.join('').toString() + signatureRy_Hex;
  }

  let signatureS_Hex = fm.clearHexPrefix(
    fm.toHex(fm.toBN(signature.s.toString('hex')))
  );
  if (signatureS_Hex.length < 64) {
    const padding = new Array(64 - signatureS_Hex.length).fill(0);
    signatureS_Hex = padding.join('').toString() + signatureS_Hex;
  }

  return ('0x' + signatureRx_Hex + signatureRy_Hex + signatureS_Hex)

}

const makeObjectStr = (request: Map<string, any>) => {
  return encodeURIComponent(JSON.stringify(Object.fromEntries(request)))
}

export function getEdDSASig(method: string, basePath: string, api_url: string, requestInfo: any, PrivateKey: string | undefined) {

  let params = makeRequestParamStr(requestInfo)

  if (method === 'GET' || method === 'DELETE') {
    params = makeRequestParamStr(requestInfo)
  } else if (method === 'POST' || method === 'PUT')  {
    params = makeObjectStr(requestInfo)
  } else {
    throw new Error(`${method} is not supported yet!`)
  }

  const uri = encodeURIComponent(`${basePath}${api_url}`)

  const message = `${method}&${uri}&${params}`

  const hash = (new BigInteger(sha256(message).toString(), 16).mod(SNARK_SCALAR_FIELD)).toFormat(0, 0, {})

  console.log('message:', message, ' hash:', hash)

  const sig = genSigWithPadding(PrivateKey, hash)

  return sig

}

export const getEdDSASigWithPoseidon = (inputs: any, PrivateKey: string | undefined) => {

  const hasher = Poseidon.createHash(inputs.length + 1, 6, 53)
  const hash = hasher(inputs).toString(10)

  console.log('getEdDSASigWithPoseidon hash:', hash)

  return genSigWithPadding(PrivateKey, hash)

}

export enum GetEcDSASigType {
  HasDataStruct,
  WithoutDataStruct,
  Contract,
}

/**
 * @description sign EIP712
 * @param web3
 * @param account
 * @param method
 * @param params
 * @returns {Promise.<*>}
 */
export async function signEip712(web3: any, account: string, method: string, params: any) {
  const response: any = await new Promise((resolve) => {
    web3.currentProvider?.sendAsync(
      {
        method,
        params,
        account,
      },
      function (err: any, result: any) {
        if (err) {
          resolve({ error: { message: err.message } });
          return;
        }

        if (result.error) {
          resolve({ error: { message: result.error.message } });
          return;
        }

        resolve({ result: result.result });
      }
    );
  });

  if (response['result']) {
    return response;
  } else {
    throw new Error(response['error']['message']);
  }
}

export async function signEip712WalletConnect(web3: any, account: string, typedData: any) {
  try {
    const response = await web3.currentProvider?.send('eth_signTypedData', [
      typedData,
      account,
    ]);
    console.log('eth_signTypedData response hash', response);
    return response;
  } catch (err) {
    console.log('err', err);
  }
}

export async function getEcDSASig(web3: any, typedData: any, address: string | undefined,
  type: GetEcDSASigType, pwd: string = '') {

  const msgParams = JSON.stringify(typedData)
  const params = [address, msgParams]

  console.log('typedData:', typedData)
  console.log('address:', address, ' type:', type)

  console.log('getEcDSASig params:', JSON.stringify(params))

  switch (type) {
    case GetEcDSASigType.HasDataStruct:

      const method = 'eth_signTypedData_v4'

      const response: any = await new Promise((resolve) => {
        web3.currentProvider.send(
          {
            method,
            params,
            address,
          },
          function (err: any, result: any) {
            if (err) {
              resolve({ error: { message: err.message } })
            } else if (result?.error) {
              resolve({ error: { message: result.error.message } })
            } else {
              resolve({ result: result.result })
            }
          }
        )
      })

      if (!response['result']) {
        throw new Error(response['error']['message'])
      }

      return {
        ecdsaSig: response.result,
      }

    case GetEcDSASigType.WithoutDataStruct:

      console.log('enter WithoutDataStruct--->', typedData)

      let hash: any = sigUtil.TypedDataUtils.sign(typedData)
      hash = fm.toHex(hash)

      console.log('WithoutDataStruct hash:', hash)

      const signature = await personalSign(web3, address, pwd, hash)

      if (signature?.sig) {
        return {
          ecdsaSig: signature.sig,
        }
      }
      throw new Error(signature.error)
    case GetEcDSASigType.Contract:

      const signEip712Result = await signEip712WalletConnect(
        web3,
        address as string,
        msgParams
      )
      return {
        ecdsaSig: signEip712Result,
      }
    default:
      break
  }
  throw Error('getEcDSASig unsupported switch case:' + type)
}

// 3.6
export function getWithdrawTypedData(data: OffChainWithdrawalRequestV3, chainId: ChainId): EIP712TypedData  {

  let message = {
    owner: data.owner,
    accountID: data.accountId,
    tokenID: data.token.tokenId,
    amount: data.token.volume,
    feeTokenID: data.maxFee.tokenId,
    maxFee: data.maxFee.volume,
    to: data.to,
    extraData: data.extraData,
    minGas: data.minGas,
    validUntil: data.validUntil,
    storageID: data.storageId,
  };
  const typedData: EIP712TypedData = {
    types: {
      EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' },
      ],
      Withdrawal: [
        { name: 'owner', type: 'address' },
        { name: 'accountID', type: 'uint32' },
        { name: 'tokenID', type: 'uint16' },
        { name: 'amount', type: 'uint96' },
        { name: 'feeTokenID', type: 'uint16' },
        { name: 'maxFee', type: 'uint96' },
        { name: 'to', type: 'address' },
        { name: 'extraData', type: 'bytes' },
        { name: 'minGas', type: 'uint256' },
        { name: 'validUntil', type: 'uint32' },
        { name: 'storageID', type: 'uint32' },
      ],
    },
    primaryType: 'Withdrawal',
    domain: {
      name: 'Loopring Protocol',
      version: '3.6.0',
      chainId: chainId,
      verifyingContract: data.exchange,
    },
    message: message,
  };
  return typedData
}

export function get_EddsaSig_OffChainWithdraw(request: OffChainWithdrawalRequestV3, eddsaKey: string) {
  
  const onchainDataHash = abi.soliditySHA3(
      ['uint256', 'address', 'bytes'],
      [
        request.minGas,
        new BN(fm.clearHexPrefix(request.to), 16),
        ethUtil.toBuffer(request.extraData),
      ]
    ).slice(0, 20)

  const orderHashStr = fm.addHexPrefix(onchainDataHash.toString('hex'))

  console.log('onchainDataHash:', onchainDataHash)
  console.log('orderHashStr:', orderHashStr)

  const inputs = [
    new BN(ethUtil.toBuffer(request.exchange)).toString(),
    request.accountId,
    request.token.tokenId,
    request.token.volume,
    request.maxFee.tokenId,
    request.maxFee.volume,
    orderHashStr,
    request.validUntil,
    request.storageId,
  ]

  return getEdDSASigWithPoseidon(inputs, eddsaKey)

}

export async function signOffchainWithdrawWithDataStructure(web3: Web3, owner: string, bodyParams: OffChainWithdrawalRequestV3, chainId: ChainId,) {
  const typedData = getWithdrawTypedData(bodyParams, chainId)
  const result = await getEcDSASig(web3, typedData, owner, GetEcDSASigType.HasDataStruct)
  return result
}

export async function signOffchainWithdrawWithoutDataStructure(web3: Web3, owner: string, bodyParams: OffChainWithdrawalRequestV3, chainId: ChainId) {
  const typedData: any = getWithdrawTypedData(bodyParams, chainId)
  const result = await getEcDSASig(web3, typedData, owner, GetEcDSASigType.WithoutDataStruct)
  return result
}

export async function signOffchainWithdrawWithDataStructureForContract(web3: Web3, owner: string, bodyParams: OffChainWithdrawalRequestV3, chainId: ChainId) {
  const typedData = getWithdrawTypedData(bodyParams, chainId)
  const result = await getEcDSASig(web3, typedData, owner, GetEcDSASigType.Contract)
  return result
}

export function getTransferTypedData(data: OriginTransferRequestV3, chainId: ChainId): EIP712TypedData  {

  let message = {
    from: data.payerAddr,
    to: data.payeeAddr,
    tokenID: data.token.tokenId,
    amount: data.token.volume,
    feeTokenID: data.maxFee.tokenId,
    maxFee: data.maxFee.volume,
    validUntil: data.validUntil,
    storageID: data.storageId,
  };
  const typedData: EIP712TypedData = {
    types: {
      EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' },
      ],
      Transfer: [
        { name: 'from', type: 'address' },
        { name: 'to', type: 'address' },
        { name: 'tokenID', type: 'uint16' },
        { name: 'amount', type: 'uint96' },
        { name: 'feeTokenID', type: 'uint16' },
        { name: 'maxFee', type: 'uint96' },
        { name: 'validUntil', type: 'uint32' },
        { name: 'storageID', type: 'uint32' },
      ],
    },
    primaryType: 'Transfer',
    domain: {
      name: 'Loopring Protocol',
      version: '3.6.0',
      chainId: chainId,
      verifyingContract: data.exchange,
    },
    message: message,
  };
  return typedData
}


export function get_EddsaSig_Transfer(request: OriginTransferRequestV3, eddsaKey: string) {
  const inputs = [
    new BN(ethUtil.toBuffer(request.exchange)).toString(),
    request.payerId,
    request.payeeId,
    request.token.tokenId,
    request.token.volume,
    request.maxFee.tokenId,
    request.maxFee.volume,
    new BN(ethUtil.toBuffer(request.payeeAddr)).toString(),
    0,
    0,
    request.validUntil,
    request.storageId,
  ];
  return getEdDSASigWithPoseidon(inputs, eddsaKey)
  
}

export async function signTransferWithDataStructure(web3: Web3, owner: string, bodyParams: OriginTransferRequestV3, chainId: ChainId,) {
  const typedData = getTransferTypedData(bodyParams, chainId)
  const result = await getEcDSASig(web3, typedData, owner, GetEcDSASigType.HasDataStruct)
  return result
}

export async function signTransferWithoutDataStructure(web3: Web3, owner: string, bodyParams: OriginTransferRequestV3, chainId: ChainId) {
  const typedData: any = getTransferTypedData(bodyParams, chainId)
  const result = await getEcDSASig(web3, typedData, owner, GetEcDSASigType.WithoutDataStruct)
  return result
}

export async function signTransferWithDataStructureForContract(web3: Web3, owner: string, bodyParams: OriginTransferRequestV3, chainId: ChainId) {
  const typedData = getTransferTypedData(bodyParams, chainId)
  const result = await getEcDSASig(web3, typedData, owner, GetEcDSASigType.Contract)
  return result
}

export function eddsaSign(typedData: any, eddsaKey: string) {
  const hash = fm.toHex(sigUtil.TypedDataUtils.sign(typedData))

  console.log('hash:', hash)

  const sigHash = fm.toHex(new BigInteger(hash, 16).idiv(8))

  const signature = EdDSA.sign(eddsaKey, sigHash)

  console.log('sigHash:', sigHash, ' signature:', signature)
  return {
    eddsaSig:
      fm.formatEddsaKey(fm.toHex(fm.toBig(signature.Rx))) +
      fm.clearHexPrefix(fm.formatEddsaKey(fm.toHex(fm.toBig(signature.Ry)))) +
      fm.clearHexPrefix(fm.formatEddsaKey(fm.toHex(fm.toBig(signature.s)))),
  }
}

export function getAmmJoinEcdsaTypedData(data: JoinAmmPoolRequest, patch: AmmPoolRequestPatch) {
  let message = {
    owner: data.owner,
    joinAmounts: [data.joinTokens.pooled[0].volume, data.joinTokens.pooled[1].volume],
    joinStorageIDs: data.storageIds,
    mintMinAmount: data.joinTokens.minimumLp.volume,
    fee: data.fee,
    validUntil: data.validUntil,
  };

  console.log('message:', message)
  const typedData = {
    types: {
      EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' },
      ],
      PoolJoin: [
        { name: 'owner', type: 'address' },
        { name: 'joinAmounts', type: 'uint96[]' },
        { name: 'joinStorageIDs', type: 'uint32[]' },
        { name: 'mintMinAmount', type: 'uint96' },
        { name: 'fee', type: 'uint96' },
        { name: 'validUntil', type: 'uint32' },
      ],
    },
    primaryType: 'PoolJoin',
    domain: {
      name: patch.ammName,
      version: '1.0.0',
      chainId: patch.chainId,
      verifyingContract: patch.poolAddress,
    },
    message: message,
  };
  return typedData;
}

export function get_EddsaSig_JoinAmmPool(data: JoinAmmPoolRequest, patch: AmmPoolRequestPatch) {
  const typedData = getAmmJoinEcdsaTypedData(data, patch)
  console.log('typedData:', typedData)
  return eddsaSign(typedData, patch.eddsaKey)
}

export function getAmmExitEcdsaTypedData(data: ExitAmmPoolRequest, patch: AmmPoolRequestPatch) {
  let message: any = {
    owner: data.owner,
    burnAmount: data.exitTokens.burned.volume,
    burnStorageID: data.storageId,
    exitMinAmounts: [data.exitTokens.unPooled[0].volume, data.exitTokens.unPooled[1].volume],
    fee: data.maxFee,
    validUntil: data.validUntil,
  };
  const typedData: EIP712TypedData = {
    types: {
      EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' },
      ],
      PoolExit: [
        { name: 'owner', type: 'address' },
        { name: 'burnAmount', type: 'uint96' },
        { name: 'burnStorageID', type: 'uint32' },
        { name: 'exitMinAmounts', type: 'uint96[]' },
        { name: 'fee', type: 'uint96' },
        { name: 'validUntil', type: 'uint32' },
      ],
    },
    primaryType: 'PoolExit',
    domain: {
      name: patch.ammName,
      version: '1.0.0',
      chainId: patch.chainId,
      verifyingContract: patch.poolAddress,
    },
    message: message,
  };
  return typedData;
}

export function get_EddsaSig_ExitAmmPool(data: ExitAmmPoolRequest, patch: AmmPoolRequestPatch) {
  const typedData = getAmmExitEcdsaTypedData(data, patch)
  console.log('typedData:', typedData)
  return eddsaSign(typedData, patch.eddsaKey)
}