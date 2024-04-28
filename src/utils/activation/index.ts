import { BigNumber, BigNumberish, Signer, Wallet, ethers } from 'ethers'
import {
  Interface,
  defaultAbiCoder,
  id,
  keccak256,
  parseEther,
  randomBytes,
} from 'ethers/lib/utils'
import { bufferToHex, ecsign, keccak,  } from 'ethereumjs-util'

import BN from 'bn.js'
import assert from 'assert'
import abi from 'ethereumjs-abi'
import {  HebaoAPI, InitParam, WalletAPI } from '../../api'
// import { WalletFactory as WalletFactoryABI } from '../abi'
import WalletFactoryV3ABI  from './WalletFactoryV3'
import { NetworkWallet } from '../../defs'
import { initParams } from 'request'
// WalletFactory
// WalletFactoryV3
const EIP712_DOMAIN_TYPEHASH = id(
  'EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)',
)
function eip712hash(name: string, version: string, moduleAddress: string, chainId: number) {
  // if (!hre.network.config.chainId) {
  // throw new Error(`chainId is not exist`);
  // }
  const encoded = keccak256(
    defaultAbiCoder.encode(
      ['bytes32', 'bytes32', 'bytes32', 'uint256', 'address'],
      [
        EIP712_DOMAIN_TYPEHASH,
        id(name),
        id(version),
        chainId, // chainId
        moduleAddress,
      ],
    ),
  )

  return Buffer.from(encoded.slice(2), 'hex')
}
class Bitstream {
  private data: string

  constructor(initialData: string = '') {
    this.data = initialData
    if (this.data.startsWith('0x')) {
      this.data = this.data.slice(2)
    }
  }

  public getData() {
    if (this.data.length === 0) {
      return '0x'
    } else {
      return '0x' + this.data
    }
  }

  public getBytes32Array() {
    if (this.data.length === 0) {
      return []
    } else {
      assert.equal(this.length() % 32, 0, 'Bitstream not compatible with bytes32[]')
      return this.data.match(/.{1,64}/g)!.map((element) => '0x' + element)
    }
  }

  public addBN(x: BN, numBytes = 32) {
    const formattedData = this.padString(x.toString(16), numBytes * 2)
    return this.insert(formattedData)
  }

  public addNumber(x: number, numBytes = 4) {
    // Check if we need to encode this number as negative
    if (x < 0) {
      const encoded = abi.rawEncode(['int256'], [x.toString(10)])
      const hex = encoded.toString('hex').slice(-(numBytes * 2))
      return this.addHex(hex)
    } else {
      return this.addBN(new BN(x), numBytes)
    }
  }

  public addAddress(x: string, numBytes = 20) {
    const formattedData = this.padString(x.slice(2), numBytes * 2)
    return this.insert(formattedData)
  }

  public addHex(x: string) {
    if (x.startsWith('0x')) {
      return this.insert(x.slice(2))
    } else {
      return this.insert(x)
    }
  }

  public extractUint8(offset: number) {
    return parseInt(this.extractData(offset, 1), 16)
  }

  public extractUint16(offset: number) {
    return parseInt(this.extractData(offset, 2), 16)
  }

  public extractUint24(offset: number) {
    return parseInt(this.extractData(offset, 3), 16)
  }

  public extractUint32(offset: number) {
    return parseInt(this.extractData(offset, 4), 16)
  }

  public extractUint40(offset: number) {
    return parseInt(this.extractData(offset, 5), 16)
  }

  public extractUint48(offset: number) {
    return parseInt(this.extractData(offset, 6), 16)
  }

  public extractUint56(offset: number) {
    return new BN(this.extractData(offset, 7), 16)
  }

  public extractUint64(offset: number) {
    return new BN(this.extractData(offset, 8), 16)
  }

  public extractUint(offset: number) {
    return new BN(this.extractData(offset, 32), 16)
  }

  public extractAddress(offset: number) {
    return '0x' + this.extractData(offset, 20)
  }

  public extractBytes1(offset: number) {
    return this.extractBytesX(offset, 1)
  }

  public extractBytes32(offset: number) {
    return this.extractBytesX(offset, 32)
  }

  public extractBytesX(offset: number, length: number) {
    return Buffer.from(this.extractData(offset, length), 'hex')
  }

  public extractChar(offset: number) {
    return this.extractData(offset, 1)
  }

  public extractData(offset: number, length: number) {
    const start = offset * 2
    const end = start + length * 2
    if (this.data.length < end) {
      throw new Error('substring index out of range:[' + start + ', ' + end + ']')
    }
    return this.data.slice(start, end)
  }

  // Returns the number of bytes of data
  public length() {
    return this.data.length / 2
  }

  private insert(x: string) {
    const offset = this.length()
    this.data += x
    return offset
  }

  private padString(x: string, targetLength: number) {
    if (x.length > targetLength) {
      throw Error('0x' + x + ' is too big to fit in the requested length (' + targetLength + ')')
    }
    while (x.length < targetLength) {
      x = '0' + x
    }
    return x
  }
}
function signEIP712(message: Buffer, privateKey: string) {
  // return new Wallet(privateKey).signMessage(message)
  const signature = ecsign(message, Buffer.from(privateKey, 'hex'))

  const data = new Bitstream()
  data.addHex(bufferToHex(signature.r))
  data.addHex(bufferToHex(signature.s))
  data.addNumber(signature.v, 1)
  return data.getData()
}
enum SignatureType {
  ILLEGAL,
  INVALID,
  EIP_712,
  ETH_SIGN,
  WALLET, // deprecated
}
function appendType(str: string, type: SignatureType) {
  const data = new Bitstream(str)
  data.addNumber(type, 1)
  return data.getData()
}
function sign2(
  signer: string,
  privateKey: string,
  message: Buffer,
  type: SignatureType = SignatureType.EIP_712,
) {
  ;+type
  let signature = appendType(signEIP712(message, privateKey), type)
  // switch (+type) {
  //   case SignatureType.ETH_SIGN: {
  //     signature = appendType(signEthereum(message, privateKey), type);
  //     break;
  //   }
  //   case SignatureType.EIP_712: {
  //     // console.log(`singer: ${signer}, privateKey: ${privateKey}`);
  //     signature = appendType(signEIP712(message, privateKey), type);
  //     break;
  //   }
  //   default: {
  //     // console.log("Unsupported signature type: " + type);
  //     signature = appendType("", type);
  //   }
  // }
  return signature
}
const EIP191_HEADER = '\x19\x01'
function eip712hashPacked(domainSeprator: Buffer, encodedData: string) {
  return keccak(
    Buffer.concat([
      Buffer.from(EIP191_HEADER, 'utf8'),
      domainSeprator,
      Buffer.from(keccak256(encodedData).slice(2), 'hex'),
    ]),
  )
}
function signCreateWallet(
  moduleAddress: string,
  owner: string,
  guardians: string[],
  quota: BigNumber,
  inheritor: string,
  feeRecipient: string,
  feeToken: string,
  maxFeeAmount: BigNumber,
  salt: BigNumberish,
  privateKey: string,
  chainId: number,
) {
  const domainSeprator = eip712hash('WalletFactory', '2.0.0', moduleAddress, chainId)

  const TYPE_STR =
    'createWallet(address owner,address[] guardians,uint256 quota,address inheritor,address feeRecipient,address feeToken,uint256 maxFeeAmount,uint256 salt)'
  const CREATE_WALLET_TYPEHASH = keccak(Buffer.from(TYPE_STR))

  const guardiansBs = encodeAddressesPacked(guardians)
  const guardiansHash = keccak(guardiansBs)

  const encodedRequest = defaultAbiCoder.encode(
    [
      'bytes32',
      'address',
      'bytes32',
      'uint256',
      'address',
      'address',
      'address',
      'uint256',
      'uint256',
    ],
    [
      CREATE_WALLET_TYPEHASH,
      owner,
      guardiansHash,
      quota,
      inheritor,
      feeRecipient,
      feeToken,
      maxFeeAmount,
      salt,
    ],
  )

  const hash = eip712hashPacked(domainSeprator, encodedRequest)
  // console.log(`hash: ${hash.toString("hex")}`);
  // signEIP712(hash, privateKey)
  // // signature = appendType(signEIP712(hash, privateKey), type);
  //@ts-ignore

  const txSignature = sign2(owner, privateKey, hash)
  return { txSignature, hash }
}
function encodeAddressesPacked(addrs: string[]) {
  const addrsBs = Buffer.concat(addrs.map((a) => Buffer.from('00'.repeat(12) + a.slice(2), 'hex')))
  return addrsBs
}
const getAppConfig = async (api: WalletAPI, network: NetworkWallet) => {
  // new WalletAPI({
  //   chainId: 
  // })
  const response: any = await api.getHebaoConfig({
    network: network,
  })
  const networkConfig = JSON.parse(response.data.networkConfigsJsonString)
  const GOERLIConfig = JSON.parse(networkConfig[network])
  return GOERLIConfig as any
}
const createWalletWithEmail = async (args: {
  apiInitArgs: InitParam
  sk: string
  email: string
  network: string,
  chainID: number
}) => {
  const { apiInitArgs, sk, email, network, chainID } = args
  const eoaWallet = new Wallet(sk!)
  const owner = eoaWallet.address
  const salt = BigNumber.from(randomBytes(8)).toString() // todo, make it random
  const hebaoAPI = new HebaoAPI(apiInitArgs)
  const walletAPI = new WalletAPI(apiInitArgs)
  const { address: wallet } = await hebaoAPI.computeWalletAddress({
    network,
    owner,
    salt,
  })
  const requestId = owner + new Date().getTime()
  const isWaitDeposit = false
  const response = await hebaoAPI.lockCreateWalletGasSettings(
    {
      owner,
      salt,
      wallet: wallet,
      requestId,
      authentication: {
        email,
      },
      network,
      isWaitDeposit,
    },
    sk!,
  )

  const config = await getAppConfig(walletAPI, network as NetworkWallet)
  const walletFactoryAddress = config.latestWalletFactory
  const feeAmount = response.data.base.gasPrices[ethers.constants.AddressZero]
  const guardians = [config.officialGuardian]
  const inheritor = ethers.constants.AddressZero
  const feeRecipient = config.feeRecipient
  const feeToken = ethers.constants.AddressZero
  const quota = BigNumber.from('0') // todo
  const maxFeeAmount = parseEther('0.1')

  const { txSignature } = signCreateWallet(
    walletFactoryAddress,
    owner,
    guardians,
    quota,
    inheritor,
    feeRecipient,
    feeToken,
    maxFeeAmount,
    salt,
    sk!.slice(2),
    chainID
  )

  const createWalletData = new Interface(WalletFactoryV3ABI).encodeFunctionData('createWallet', [
    {
      owner,
      guardians,
      quota,
      inheritor,
      feeRecipient,
      feeToken,
      salt,
      maxFeeAmount,
      signature: Buffer.from(txSignature.slice(2), 'hex'),
    },
    feeAmount,
  ])

  const response2 = await hebaoAPI.createWallet(
    {
      owner,
      salt,
      requestId,
      authentication: {
        email,
      },
      network,
      data: createWalletData,
      from: wallet,
      to: wallet,
      isWaitDeposit,
    },
    sk!.slice(2),
  )

  return {
    response: response2,

    wallet,
    salt,
    requestId,
    owner,
    createWalletData,
  }
}

const createWalletWithEmailAndVerifyCode = async (args: {
  apiInitParam: InitParam
  sk?: string
  signer?: Signer
  email: string
  network: string
  wallet: string
  owner: string
  salt: string
  requestId: string
  securityId: string
  createWalletData: string
}) => {
  const { apiInitParam, sk, signer, email, network, wallet, owner, salt, requestId, securityId, createWalletData } =
    args

  return new HebaoAPI(apiInitParam).createWallet(
    {
      owner,
      salt,
      requestId,
      authentication: {
        email,
      },
      network,
      data: createWalletData,
      from: wallet,
      to: wallet,
      isWaitDeposit: false,
      securityId,
    },
    sk!.slice(2),
  )
}

const activeLayerOneWallet = async (args: {
  apiInitParam: InitParam
  sk: string
  network: string
  smartWalletAddress: string
  maxFeeAmount: BigNumber
  tokenAddress: string
  chainId: number
}) => {
  const {
    apiInitParam,
    sk,
    network,
    smartWalletAddress,
    maxFeeAmount,
    tokenAddress,
    chainId
  } = args
  const eoa = new Wallet(sk)
  const requestId = smartWalletAddress + Date.now()
  const feeToken = tokenAddress
  const quota = BigNumber.from('0') // todo
  const hebaoAPI = new HebaoAPI(apiInitParam)
  const walletAPI = new WalletAPI(apiInitParam)
  const config = await getAppConfig(walletAPI, network as NetworkWallet)
  const walletFactoryAddress = config.latestWalletFactory
  const guardians = [config.officialGuardian]
  const inheritor = ethers.constants.AddressZero
  const feeRecipient = config.feeRecipient
  const walletInfo = await hebaoAPI.getWallet(
    {
      network,
      owner: eoa.address,
      wallet: smartWalletAddress,
      timestamp: new Date().getTime(),
    },
    sk,
  )

  const { txSignature } = signCreateWallet(
    walletFactoryAddress,
    eoa.address,
    guardians,
    quota,
    inheritor,
    feeRecipient,
    feeToken,
    maxFeeAmount,
    walletInfo.salt,
    sk!.slice(2),
    chainId,
  )
  const createWalletData = new Interface(WalletFactoryV3ABI).encodeFunctionData('createWallet', [
    {
      owner: eoa.address,
      guardians,
      quota,
      inheritor,
      feeRecipient,
      feeToken,
      salt: walletInfo.salt,
      maxFeeAmount,
      signature: Buffer.from(txSignature.slice(2), 'hex'),
    },
    BigNumber.from(0),
  ])
  
  return hebaoAPI.activateCreateWallet(
    {
      owner: eoa.address,
      network,
      from: smartWalletAddress,
      requestId,
      data: createWalletData,
    },
    sk,
  )
}

export default {
  createWalletWithEmail,
  createWalletWithEmailAndVerifyCode,
  activeLayerOneWallet
}