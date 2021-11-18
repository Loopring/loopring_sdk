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
  JoinAmmPoolRequest, NFTMintRequestV3, NFTWithdrawRequestV3,
  OffChainWithdrawalRequestV3, OriginNFTTransferRequestV3,
  OriginTransferRequestV3,
  PublicKey,
  UpdateAccountRequestV3,
} from '../../defs/loopring_defs'

import Web3 from 'web3'

import { EIP712TypedData } from 'eth-sig-util'

import { toHex, toBig, zeroPad, } from '../../utils/formatter'
import { myLog } from '../../utils/log_tools';

export enum GetEcDSASigType {
  HasDataStruct,
  WithoutDataStruct,
  Contract,
}

const keyMessage = 'Sign this message to access Loopring Exchange: '

const transferMessage = 'Sign this message to authorize Loopring Pay: '

const SNARK_SCALAR_FIELD = new BigInteger('21888242871839275222246405745257275088548364400416034343698204186575808495617', 10)

export interface KeyPairParams {
  web3: any,
  address: string,
  exchangeAddress: string,
  keyNonce: number,
  walletType: ConnectorNames,
  keySeed?: string,
}

export async function generateKeyPair({
  web3,
  address,
  exchangeAddress,
  keyNonce,
  walletType,
  keySeed,
}: KeyPairParams) {

  const result: any = await personalSign(
    web3,
    address, '',
    keySeed ? keySeed : (keyMessage + exchangeAddress + ' with key nonce: ' + keyNonce),
    walletType
  )

  if (!result.error) {

    const keyPair = EdDSA.generateKeyPair(ethUtil.sha256(fm.toBuffer((result.sig))))
    const formatedPx = fm.formatEddsaKey(toHex(toBig(keyPair.publicKeyX)))
    const formatedPy = fm.formatEddsaKey(toHex(toBig(keyPair.publicKeyY)))
    const sk = toHex(toBig(keyPair.secretKey))

    return {
      keyPair,
      formatedPx,
      formatedPy,
      sk,
    }

  } else {
    throw Error(result.error)
  }
}

const makeRequestParamStr = (request: Map<string, any>) => {

  // @ts-ignore
  // const mapAsc = new Map([...request].sort())

  let arrObj = Array.from(request)
  arrObj.sort(function (a, b) { return a[0].localeCompare(b[0]) })
  const orderedMap = new Map(arrObj.map(i => [i[0], i[1]]))

  var paramlist: Array<string> = new Array()

  const keys = Object.keys(Object.fromEntries(orderedMap))

  if (keys) {

    keys.forEach((key: string) => {
      const value = request.get(key)
      if (value !== undefined && value !== '')
        paramlist.push(`${key}=${value}`)
    })

  }

  // force to change encode ',' due to different encode rules between server and client
  return encodeURIComponent(paramlist.join('&')).replace('%2C', '%252C')

}

/*
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
  const jsonTxt = JSON.stringify(Object.fromEntries(request))
  return encodeURIComponent(jsonTxt)
}

export function getEdDSASig(method: string, basePath: string, api_url: string, requestInfo: any, PrivateKey: string | undefined) {

  let params = undefined

  method = method.toUpperCase().trim()

  if (method === 'GET' || method === 'DELETE') {
    params = makeRequestParamStr(requestInfo)
  } else if (method === 'POST' || method === 'PUT') {
    params = makeObjectStr(requestInfo)
  } else {
    throw new Error(`${method} is not supported yet!`)
  }

  const uri = encodeURIComponent(`${basePath}${api_url}`)

  const message = `${method}&${uri}&${params}`

  let hash: any = new BigInteger(sha256(message).toString(), 16)

  // console.log('message:', message, ' hash:', hash.toFormat(0, 0, {}))

  hash = (hash.mod(SNARK_SCALAR_FIELD)).toFormat(0, 0, {})

  const sig = genSigWithPadding(PrivateKey, hash)

  return sig

}

export const getEdDSASigWithPoseidon = (inputs: any, PrivateKey: string | undefined) => {

  const hasher = Poseidon.createHash(inputs.length + 1, 6, 53)
  // myLog('getEdDSASigWithPoseidon *16 hash:', hasher(inputs).toString(16))
  const hash = hasher(inputs).toString(10)

  // myLog('getEdDSASigWithPoseidon hash:', hash)

  return genSigWithPadding(PrivateKey, hash)

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
    // console.log('web3.currentProvider:', web3.currentProvider)
    // console.log('typedData:', typedData)
    // console.log('account:', account)

    let response: any = await web3.currentProvider?.send('eth_signTypedData', [
      account,
      typedData,
    ]);

    return response;
  } catch (err) {
    console.log('err:', err)
    return { error: err }
  }
}

export async function getEcDSASig(web3: any, typedData: any, address: string | undefined,
  type: GetEcDSASigType, pwd: string = '', walletType?: ConnectorNames) {

  const msgParams = JSON.stringify(typedData)
  const params = [address, msgParams]

  // console.log('typedData:', typedData)
  // console.log('address:', address, ' type:', type)

  // console.log('getEcDSASig params:', JSON.stringify(params))

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

      let hash: any = sigUtil.TypedDataUtils.sign(typedData)
      hash = fm.toHex(hash)

      // console.log('WithoutDataStruct hash:', hash)

      if (!walletType) {
        throw Error('no walletType set!')
      }

      const signature: any = await personalSign(web3, address, pwd, hash, walletType)

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

      if (signEip712Result.error) {
        throw Error('Contract sig error')
      }

      return {
        ecdsaSig: signEip712Result,
      }
    default:
      break
  }
  throw Error('getEcDSASig unsupported switch case:' + type)
}

export function convertPublicKey2(pk: PublicKey) {
  return new BN(EdDSA.pack(pk.x, pk.y), 16)
}

export function convertPublicKey(pk: PublicKey) {
  const publicKeyX = fm.formatEddsaKey(fm.toHex(fm.toBig(pk.x)))
  const publicKeyY = fm.formatEddsaKey(fm.toHex(fm.toBig(pk.y)))

  return new BN(EdDSA.pack(publicKeyX, publicKeyY), 16)
}

// update account
export function getUpdateAccountEcdsaTypedData(data: UpdateAccountRequestV3, chainId: ChainId) {

  let message: any = {
    owner: data.owner,
    accountID: data.accountId,
    feeTokenID: data.maxFee.tokenId,
    maxFee: data.maxFee.volume,
    publicKey: fm.addHexPrefix(convertPublicKey2(data.publicKey).toString(16)),
    validUntil: data.validUntil,
    nonce: data.nonce,
  }

  const typedData: EIP712TypedData = {
    types: {
      EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' },
      ],
      AccountUpdate: [
        { name: 'owner', type: 'address' },
        { name: 'accountID', type: 'uint32' },
        { name: 'feeTokenID', type: 'uint16' },
        { name: 'maxFee', type: 'uint96' },
        { name: 'publicKey', type: 'uint256' },
        { name: 'validUntil', type: 'uint32' },
        { name: 'nonce', type: 'uint32' },
      ],
    },
    primaryType: 'AccountUpdate',
    domain: {
      name: 'Loopring Protocol',
      version: '3.6.0',
      chainId,
      verifyingContract: data.exchange,
    },
    message: message,
  }

  return typedData
}

export async function signUpdateAccountWithDataStructure(web3: Web3, bodyParams: UpdateAccountRequestV3, chainId: ChainId) {
  const typedData = getUpdateAccountEcdsaTypedData(bodyParams, chainId)
  // console.log('typedData:', typedData)
  const result = await getEcDSASig(web3, typedData, bodyParams.owner, GetEcDSASigType.HasDataStruct)
  return result
}

export async function signUpdateAccountWithoutDataStructure(web3: Web3, bodyParams: UpdateAccountRequestV3,
  chainId: ChainId, walletType: ConnectorNames) {
  const typedData: any = getUpdateAccountEcdsaTypedData(bodyParams, chainId)
  const result = await getEcDSASig(web3, typedData, bodyParams.owner, GetEcDSASigType.WithoutDataStruct, '', walletType)
  return result
}

export async function signUpdateAccountWithDataStructureForContract(web3: Web3, bodyParams: UpdateAccountRequestV3, chainId: ChainId) {
  const typedData = getUpdateAccountEcdsaTypedData(bodyParams, chainId)
  const result = await getEcDSASig(web3, typedData, bodyParams.owner, GetEcDSASigType.Contract)
  return result
}

// withdraw
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

export function getWithdrawTypedData(data: OffChainWithdrawalRequestV3, chainId: ChainId): EIP712TypedData {

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
  }

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

export async function signOffchainWithdrawWithDataStructure(web3: Web3, owner: string, bodyParams: OffChainWithdrawalRequestV3, chainId: ChainId) {
  const typedData = getWithdrawTypedData(bodyParams, chainId)
  const result = await getEcDSASig(web3, typedData, owner, GetEcDSASigType.HasDataStruct)
  return result
}

export async function signOffchainWithdrawWithoutDataStructure(web3: Web3, owner: string, bodyParams: OffChainWithdrawalRequestV3,
  chainId: ChainId, walletType: ConnectorNames) {
  const typedData: any = getWithdrawTypedData(bodyParams, chainId)
  const result = await getEcDSASig(web3, typedData, owner, GetEcDSASigType.WithoutDataStruct, '', walletType)
  return result
}

export async function signOffchainWithdrawWithDataStructureForContract(web3: Web3, owner: string, bodyParams: OffChainWithdrawalRequestV3, chainId: ChainId) {
  const typedData = getWithdrawTypedData(bodyParams, chainId)
  const result = await getEcDSASig(web3, typedData, owner, GetEcDSASigType.Contract)
  return result
}

//NFT Withdraw
export function get_EddsaSig_NFT_Withdraw(request: NFTWithdrawRequestV3, eddsaKey: string) {

  const onchainDataHash = abi.soliditySHA3(
      ['uint256', 'address', 'bytes'],
      [
        request.minGas,
        new BN(fm.clearHexPrefix(request.to), 16),
        ethUtil.toBuffer(request.extraData),
      ]
  ).slice(0, 20)

  const orderHashStr = fm.addHexPrefix(onchainDataHash.toString('hex'))

  const inputs = [
    new BN(ethUtil.toBuffer(request.exchange)).toString(),
    request.accountId,
    request.token.tokenId,
    request.token.amount,
    request.maxFee.tokenId,
    request.maxFee.amount,
    orderHashStr,
    request.validUntil,
    request.storageId,
  ]

  return getEdDSASigWithPoseidon(inputs, eddsaKey)

}

export function getNFTWithdrawTypedData(data: NFTWithdrawRequestV3, chainId: ChainId): EIP712TypedData {

  let message = {
    owner: data.owner,
    accountID: data.accountId,
    tokenID: data.token.tokenId,
    amount: data.token.amount,
    feeTokenID: data.maxFee.tokenId,
    maxFee: data.maxFee.amount,
    to: data.to,
    extraData: data.extraData,
    minGas: data.minGas,
    validUntil: data.validUntil,
    storageID: data.storageId,
  }

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

export async function signNFTWithdrawWithDataStructure(web3: Web3, owner: string, bodyParams: NFTWithdrawRequestV3, chainId: ChainId) {
  const typedData = getNFTWithdrawTypedData(bodyParams, chainId)
  const result = await getEcDSASig(web3, typedData, owner, GetEcDSASigType.HasDataStruct)
  return result
}

export async function signNFTWithdrawWithoutDataStructure(web3: Web3, owner: string, bodyParams: NFTWithdrawRequestV3,
                                                               chainId: ChainId, walletType: ConnectorNames) {
  const typedData: any = getNFTWithdrawTypedData(bodyParams, chainId)
  const result = await getEcDSASig(web3, typedData, owner, GetEcDSASigType.WithoutDataStruct, '', walletType)
  return result
}

export async function signNFTWithdrawWithDataStructureForContract(web3: Web3, owner: string, bodyParams: NFTWithdrawRequestV3, chainId: ChainId) {
  const typedData = getNFTWithdrawTypedData(bodyParams, chainId)
  const result = await getEcDSASig(web3, typedData, owner, GetEcDSASigType.Contract)
  return result
}

//NFT Mint
export function get_EddsaSig_NFT_Mint(request: NFTMintRequestV3, eddsaKey: string) {
  const inputs = [
    new BN(ethUtil.toBuffer(request.exchange)).toString(),
    request.minterId,
    request.toAccountId,
    getNftData(request),
    request.amount,
    request.maxFee.tokenId,
    request.maxFee.amount,
    request.validUntil,
    request.storageId,
  ];
  return getEdDSASigWithPoseidon(inputs, eddsaKey)
}

export function getNftData(request: NFTMintRequestV3) {
  const hasher = Poseidon.createHash(7, 6, 52);
  const nftIDHi = new BN(request.nftId.substr(2, 32), 16).toString(10);
  const nftIDLo = new BN(request.nftId.substr(2 + 32, 32), 16).toString(10);
  // debugger
  const inputs = [
    request.minterAddress,
    request.nftType,
    request.tokenAddress,
    nftIDLo,
    nftIDHi,
    request.creatorFeeBips
  ];
  myLog('get hasher *16 hash:', hasher(inputs).toString(16))
  return hasher(inputs).toString(10);
}

export function getNFTMintTypedData(data: NFTMintRequestV3, chainId: ChainId): EIP712TypedData {

  let message = {
    minterAddress: data.minterAddress,
    toAccountId: data.toAccountId,
    nftType: data.nftType,
    amount: data.amount,
    nftId: data.nftId,
    nftAddress: data.tokenAddress,
    feeTokenID: data.maxFee.tokenId,
    maxFee: data.maxFee.amount,
    validUntil: data.validUntil,
    storageID: data.storageId,
  }

  const typedData: EIP712TypedData = {
    types: {
      EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' },
      ],
      Mint: [
        { name: 'minterAddress', type: 'address' },
        { name: 'toAccountId', type: 'uint32' },
        { name: 'nftType', type: 'string'} ,
        { name: 'amount', type: 'uint96' },
        { name: 'nftId', type: 'uint16' },
        { name: 'nftAddress', type: 'address' },
        { name: 'feeTokenID', type: 'uint16' },
        { name: 'maxFee', type: 'uint96' },
        { name: 'validUntil', type: 'uint32' },
        { name: 'storageID', type: 'uint32' },
      ],
    },
    primaryType: 'Mint',
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

export async function signNFTMintWithDataStructure(web3: Web3, owner: string, bodyParams: NFTMintRequestV3, chainId: ChainId) {
  const typedData = getNFTMintTypedData(bodyParams, chainId)
  const result = await getEcDSASig(web3, typedData, owner, GetEcDSASigType.HasDataStruct)
  return result
}

export async function signNFTMintWithoutDataStructure(web3: Web3, owner: string, bodyParams: NFTMintRequestV3,
                                                          chainId: ChainId, walletType: ConnectorNames) {
  const typedData: any = getNFTMintTypedData(bodyParams, chainId)
  const result = await getEcDSASig(web3, typedData, owner, GetEcDSASigType.WithoutDataStruct, '', walletType)
  return result
}

export async function signNFTMintWithDataStructureForContract(web3: Web3, owner: string, bodyParams: NFTMintRequestV3, chainId: ChainId) {
  const typedData = getNFTMintTypedData(bodyParams, chainId)
  const result = await getEcDSASig(web3, typedData, owner, GetEcDSASigType.Contract)
  return result
}

// transfer
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


export function getTransferTypedData(data: OriginTransferRequestV3, chainId: ChainId): EIP712TypedData {

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


export async function signTransferWithDataStructure(web3: Web3, owner: string, bodyParams: OriginTransferRequestV3, chainId: ChainId,) {
  const typedData = getTransferTypedData(bodyParams, chainId)
  const result = await getEcDSASig(web3, typedData, owner, GetEcDSASigType.HasDataStruct)
  return result
}

export async function signTransferWithoutDataStructure(web3: Web3, owner: string, bodyParams: OriginTransferRequestV3,
  chainId: ChainId, walletType: ConnectorNames) {
  const typedData: any = getTransferTypedData(bodyParams, chainId)
  const result = await getEcDSASig(web3, typedData, owner, GetEcDSASigType.WithoutDataStruct, '', walletType)
  return result
}

export async function signTransferWithDataStructureForContract(web3: Web3, owner: string, bodyParams: OriginTransferRequestV3, chainId: ChainId) {
  const typedData = getTransferTypedData(bodyParams, chainId)
  const result = await getEcDSASig(web3, typedData, owner, GetEcDSASigType.Contract)
  return result
}

export function get_EddsaSig_NFT_Transfer(request: OriginNFTTransferRequestV3, eddsaKey: string) {
  const inputs = [
    new BN(ethUtil.toBuffer(request.exchange)).toString(),
    request.fromAccountId,
    request.toAccountId,
    request.token.tokenId,
    request.token.amount,
    request.maxFee.tokenId,
    request.maxFee.amount,
    new BN(ethUtil.toBuffer(request.toAddress)).toString(),
    0,
    0,
    request.validUntil,
    request.storageId,
  ];
  return getEdDSASigWithPoseidon(inputs, eddsaKey)

}

export function getNFTTransferTypedData(data: OriginNFTTransferRequestV3, chainId: ChainId): EIP712TypedData {

  let message = {
    from: data.fromAddress,
    to: data.toAddress,
    tokenID: data.token.tokenId,
    amount: data.token.amount,
    feeTokenID: data.maxFee.tokenId,
    maxFee: data.maxFee.amount,
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

export async function signTNFTransferWithDataStructure(web3: Web3, owner: string, bodyParams: OriginNFTTransferRequestV3, chainId: ChainId,) {
  const typedData = getNFTTransferTypedData(bodyParams, chainId)
  const result = await getEcDSASig(web3, typedData, owner, GetEcDSASigType.HasDataStruct)
  return result
}

export async function signNFTTransferWithoutDataStructure(web3: Web3, owner: string, bodyParams: OriginNFTTransferRequestV3,
                                                       chainId: ChainId, walletType: ConnectorNames) {
  const typedData: any = getNFTTransferTypedData(bodyParams, chainId)
  const result = await getEcDSASig(web3, typedData, owner, GetEcDSASigType.WithoutDataStruct, '', walletType)
  return result
}
// export async function signNFTTransferWithoutDataStructure(web3: Web3, owner: string, bodyParams: OriginTransferRequestV3,
//                                                        chainId: ChainId, walletType: ConnectorNames) {
//   const typedData: any = getTransferTypedData(bodyParams, chainId)
//   const result = await getEcDSASig(web3, typedData, owner, GetEcDSASigType.WithoutDataStruct, '', walletType)
//   return result
// }

export async function signNFTTransferWithDataStructureForContract(web3: Web3, owner: string, bodyParams: OriginNFTTransferRequestV3, chainId: ChainId) {
  const typedData = getNFTTransferTypedData(bodyParams, chainId)
  const result = await getEcDSASig(web3, typedData, owner, GetEcDSASigType.Contract)
  return result
}


export function eddsaSign(typedData: any, eddsaKey: string) {
  const hash = fm.toHex(sigUtil.TypedDataUtils.sign(typedData))

  const sigHash = fm.toHex(new BigInteger(hash, 16).idiv(8))

  const signature = EdDSA.sign(eddsaKey, sigHash)

  // console.log('sigHash:', sigHash, ' signature:', signature)
  return {
    eddsaSig:
      fm.formatEddsaKey(fm.toHex(fm.toBig(signature.Rx))) +
      fm.clearHexPrefix(fm.formatEddsaKey(fm.toHex(fm.toBig(signature.Ry)))) +
      fm.clearHexPrefix(fm.formatEddsaKey(fm.toHex(fm.toBig(signature.s)))),
  }
}

// ammpool join
export function get_EddsaSig_JoinAmmPool(data: JoinAmmPoolRequest, patch: AmmPoolRequestPatch) {
  const typedData = getAmmJoinEcdsaTypedData(data, patch)
  return eddsaSign(typedData, patch.eddsaKey)
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

  // console.log('message:', message)
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

// ammpool exit
export function get_EddsaSig_ExitAmmPool(data: ExitAmmPoolRequest, patch: AmmPoolRequestPatch) {
  const typedData = getAmmExitEcdsaTypedData(data, patch)
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
  return typedData
}
