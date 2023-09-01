import {
  ChainId,
  ConnectorError,
  ConnectorNames,
  CounterFactualInfo,
  GetAvailableBrokerRequest,
  GetCounterFactualInfoRequest,
  LOOPRING_URLs,
  LoopringErrorCode,
  ReqMethod,
  ReqParams,
  RESULT_INFO,
  SIG_FLAG,
  TX_HASH_API,
} from '../defs'
import { Request } from './request'
import { addHexPrefix, toBuffer, toHex } from '../utils'
import { myLog } from '../utils/log_tools'
import ABI from './ethereum/contracts'
import { AxiosResponse } from 'axios'
import * as ethUtil from 'ethereumjs-util'
import { isContract } from './contract_api'

export const KEY_MESSAGE =
  'Sign this message to access Loopring Exchange: ' +
  '${exchangeAddress}' +
  ' with key nonce: ' +
  '${nonce}'
export class BaseAPI {
  static KEY_MESSAGE: string = KEY_MESSAGE
  protected baseUrl = ''
  protected chainId: ChainId = ChainId.MAINNET
  public genErr(err: Error | (AxiosResponse & Error)): RESULT_INFO {
    if (err.hasOwnProperty('request')) {
      // const axiosError = errorInfo as AxiosResponse;
      return {
        // @ts-ignore;
        message: ConnectorError.HTTP_ERROR,
        ...err,
        msg: ConnectorError.HTTP_ERROR,
        code: LoopringErrorCode.HTTP_ERROR,
      } as RESULT_INFO
      err?.message
    } else if (!err || !err?.message) {
      return {
        message: 'unKnown',
        code: LoopringErrorCode.SKD_UNKNOW,
      }
    } else {
      const key = Reflect.ownKeys(ConnectorError).find(
        (key) => err?.message.search(ConnectorError[key as keyof typeof ConnectorError]) !== -1,
      )
      if (key) {
        return {
          ...err,
          message: key as keyof typeof ConnectorError,
          code: LoopringErrorCode[key as keyof typeof ConnectorError],
        } as RESULT_INFO
      }
      return {
        ...(err instanceof Error
          ? Reflect.ownKeys(err).reduce((prev, item) => {
              // @ts-ignore
              return { ...prev, [item]: err[item.toString()] }
            }, {})
          : err),
        code: LoopringErrorCode.SKD_UNKNOW,
      }
    }
  }
  protected returnTxHash<T extends TX_HASH_API>(
    raw_data: T,
  ): (Omit<T, 'resultInfo'> & { raw_data: Omit<T, 'resultInfo'> }) | RESULT_INFO {
    if (raw_data?.resultInfo) {
      return {
        ...raw_data.resultInfo,
        message: raw_data.resultInfo?.msg ? raw_data.resultInfo?.msg : raw_data?.resultInfo.message,
      }
    }
    return {
      ...raw_data,
      raw_data,
    }
  }

  private timeout: number
  private baseUrlMap: { [key: number]: string } | undefined

  public constructor(
    param: InitParam,
    timeout: number = 6000,
    baseUrlMap = {
      [ChainId.MAINNET]: 'https://api3.loopring.io',
      [ChainId.GOERLI]: 'https://uat2.loopring.io',
    },
  ) {
    if (param.baseUrl) {
      this.baseUrl = param.baseUrl
    } else if (param.chainId !== undefined) {
      this.setChainId(param.chainId)
    } else {
      this.setChainId(ChainId.GOERLI)
    }
    this.baseUrlMap = baseUrlMap
    this.timeout = timeout
  }

  public async getAvailableBroker(request: GetAvailableBrokerRequest): Promise<{ broker: string }> {
    const reqParams: ReqParams = {
      sigFlag: SIG_FLAG.NO_SIG,
      queryParams: request,
      url: LOOPRING_URLs.GET_AVAILABLE_BROKER,
      method: ReqMethod.GET,
    }
    const result = (await this.makeReq().request(reqParams)).data
    return result
  }

  public async getCounterFactualInfo<T extends any>(
    request: GetCounterFactualInfoRequest,
  ): Promise<{
    raw_data: T
    counterFactualInfo: CounterFactualInfo | undefined
    error?: RESULT_INFO
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.COUNTER_FACTUAL_INFO,
      queryParams: request,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    }

    const raw_data = (await this.makeReq().request(reqParams)).data

    let counterFactualInfo: CounterFactualInfo | undefined
    let error: RESULT_INFO | undefined = undefined

    if (raw_data && raw_data?.resultInfo) {
      error = raw_data?.resultInfo
    } else {
      counterFactualInfo = {
        ...raw_data,
      } as CounterFactualInfo
    }

    return {
      counterFactualInfo,
      error,
      raw_data,
    }
  }

  public setChainId(chainId: ChainId) {
    this.baseUrl =
      this.baseUrlMap && this.baseUrlMap[0]
        ? getBaseUrlByChainId(chainId, this.baseUrlMap as any)
        : getBaseUrlByChainId(chainId)
    this.chainId = chainId
  }

  public setBaseUrl(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  protected makeReq(): Request {
    return new Request(this.baseUrl, this.timeout)
  }
}

export function ecRecover(
  account: string,
  msg: string,
  sig: any,
  // time = 3000
) {
  try {
    // let timer;
    const hash = ethUtil.hashPersonalMessage(toBuffer(msg))
    const signature = ethUtil.fromRpcSig(sig)
    const result = ethUtil.ecrecover(hash, signature.v, signature.r, signature.s)
    const result2 = ethUtil.pubToAddress(result)
    const recAddress = toHex(result2)
    myLog('ecRecover recAddress', result, result2, recAddress)
    return {
      result: recAddress.toLowerCase() === account.toLowerCase(),
    }
  } catch (error) {
    return { error }
  }

  // resolve();
  // return await Promise.race([
  //   new Promise((_r, rej) => (timer = setTimeout(rej, time))),
  //   new Promise((resolve) => {
  //     // web3.eth.personal.ecRecover();
  //
  //   }),
  // ])
  //   .catch((error) => {
  //     console.log("ecRecover 2:", error);
  //     return { error: ("ecRecover 2:" + error) as any };
  //   })
  //   .finally(() => {
  //     console.log("ecRecover 2: timeout");
  //     return "ecRecover 2: timeout";
  //   });
}

export async function contractWalletValidate32(web3: any, account: string, msg: string, sig: any) {
  return new Promise((resolve) => {
    const hash = ethUtil.hashPersonalMessage(toBuffer(msg))
    const data = ABI.Contracts.ContractWallet.encodeInputs('isValidSignature(bytes32,bytes)', {
      _data: hash,
      _signature: toBuffer(sig),
    })

    web3.eth.call(
      {
        to: account, // contract addr
        data: data,
      },
      function (err: any, result: any) {
        if (!err) {
          const valid = ABI.Contracts.ContractWallet.decodeOutputs(
            'isValidSignature(bytes32,bytes)',
            result,
          )
          resolve({
            result: toHex(toBuffer(valid[0])) === data.slice(0, 10),
          })
        } else resolve({ error: err })
      },
    )
  })
}

export async function mykeyWalletValid(web3: any, account: string, msg: string, sig: any) {
  const myKeyContract = '0xADc92d1fD878580579716d944eF3460E241604b7'
  return new Promise((resolve) => {
    web3.eth.call(
      {
        to: myKeyContract,
        data: ABI.Contracts.ContractWallet.encodeInputs('getKeyData', {
          _account: account,
          _index: 3,
        }),
      },
      function (err: any, res: any) {
        if (!err) {
          const signature = ethUtil.fromRpcSig(sig)
          const hash = ethUtil.hashPersonalMessage(ethUtil.keccak256(toBuffer(msg)))
          const address = addHexPrefix(
            ABI.Contracts.ContractWallet.decodeOutputs('getKeyData', res)[0],
          )
          const recAddress = toHex(
            ethUtil.pubToAddress(ethUtil.ecrecover(hash, signature.v, signature.r, signature.s)),
          )
          resolve({
            result: recAddress.toLowerCase() === address.toLowerCase(),
          })
        } else {
          resolve({ error: err })
        }
      },
    )
  })
}

export async function ecRecover2(account: string, message: string, signature: any) {
  const messageBuffer = Buffer.from(message, 'utf8')

  // myLog('message:', message)
  // myLog('signature raw:', signature)

  signature = signature.split('x')[1]

  const parts = [
    Buffer.from(`\x19Ethereum Signed Message:\n${messageBuffer.length}`, 'utf8'),
    messageBuffer,
  ]

  const totalHash = ethUtil.keccak(Buffer.concat(parts))

  const r = Buffer.from(signature.substring(0, 64), 'hex')
  const s = Buffer.from(signature.substring(64, 128), 'hex')

  const old_v = Number(addHexPrefix(signature.substring(128, 130)))

  let v = old_v

  if (v <= 1) v += 27

  const pub = ethUtil.ecrecover(totalHash, v, r, s)

  const recoveredAddress = '0x' + ethUtil.pubToAddress(pub).toString('hex')

  if (account.toLowerCase() !== recoveredAddress.toLowerCase()) {
    myLog('v:', v, 'old_v:', old_v, ' recoveredAddress:', recoveredAddress)
  }

  return new Promise((resolve) =>
    resolve({
      result: account.toLowerCase() === recoveredAddress.toLowerCase(),
    }),
  )
}

const getBaseUrlByChainId = (
  id: ChainId,
  baseUrlMap = {
    [ChainId.MAINNET]: 'https://api3.loopring.io',
    [ChainId.GOERLI]: 'https://uat2.loopring.io',
  },
) => {
  let baseUrl = ''
  switch (id) {
    case ChainId.MAINNET:
      baseUrl = baseUrlMap[ChainId.MAINNET]
      break
    default:
      baseUrl = baseUrlMap[ChainId.GOERLI]
      break
  }
  return baseUrl
}
/**
 * @default chainId 1
 * @default keySeed `Sign this message to access Loopring exchange: ${exchangeAddress} with key nonce: ${nonce}`
 */
export interface InitParam {
  chainId?: ChainId
  baseUrl?: string
}

export function formatSig(rpcSig: string) {
  const sig = ethUtil.fromRpcSig(rpcSig)
  return ethUtil.toRpcSig(sig.v, sig.r, sig.s)
}
export function recoverSignType(web3: any, account: string, msg: string, sig: string) {
  const ethRecover: any = ecRecover(account, msg, sig)

  if (ethRecover.result) {
    return '03'
  } else {
    return ''
  }
}

export async function personalSign(
  web3: any,
  account: string | undefined,
  pwd: string,
  msg: string,
  walletType: ConnectorNames,
  chainId: ChainId,
  accountId?: number,
  counterFactualInfo?: CounterFactualInfo,
  isMobile?: boolean,
) {
  if (!account) {
    return { error: 'personalSign got no account' }
  }
  return new Promise((resolve) => {
    try {
      web3.eth.personal.sign(msg, account, pwd, async function (err: any, result: any) {
        if (!err) {
          // LOG: for signature
          myLog('ecRecover before', 'msg', msg, 'result', result, counterFactualInfo)
          // Valid:1. counter Factual signature Valid
          if (counterFactualInfo && accountId) {
            myLog('fcWalletValid counterFactualInfo accountId:')
            const fcValid = await fcWalletValid(
              web3,
              account,
              msg,
              result,
              accountId,
              chainId,
              counterFactualInfo,
            )
            if (fcValid.result) {
              resolve({
                sig: result,
                counterFactualInfo: fcValid.counterFactualInfo,
              })
              return
            }
          }

          // Valid: 2. webview directory signature Valid
          // @ts-ignore
          if (window?.ethereum || global?.ethereum || web3?.currentProvider?.isConnected) {
            myLog('ecRecover before', result)
            const valid: any = ecRecover(account, msg, result)
            // LOG: for signature
            myLog('ecRecover after', valid.result)
            if (valid.result) {
              return resolve({ sig: result })
            }
          }

          // Valid: 3. contractWallet no recover
          // signature Valid `isValidSignature(bytes32,bytes)`
          // LOG: for signature
          myLog('Valid: 3. contractWallet before')
          const isContractCheck = await isContract(web3, account)
          if (isContractCheck) {
            // LOG: for signature
            myLog('Valid: 5 failed isContract. no ecrecover')
            return resolve({ sig: result })
          }

          // Valid: 5. contractWallet signature Valid `isValidSignature(bytes32,bytes)`
          // const walletValid2: any = await contractWalletValidate32(
          //   web3,
          //   account,
          //   msg,
          //   result
          // );
          // if (walletValid2.result) {
          //   return resolve({ sig: result });
          // }

          // Valid: 6. counter Factual signature Valid when no counterFactualInfo
          if (accountId) {
            const fcValid = await fcWalletValid(web3, account, msg, result, accountId, chainId)
            if (fcValid.result) {
              return resolve({
                sig: result,
                counterFactualInfo: fcValid.counterFactualInfo,
              })
            }
          }

          // Valid: 7. myKeyValid Valid again
          const myKeyValid: any = await mykeyWalletValid(web3, account, msg, result)

          if (myKeyValid.result) {
            return resolve({ sig: result })
          }

          // Valid: Error cannot pass personalSign Valid
          // eslint-disable-next-line no-console
          console.log('web3.eth.personal.sign Valid, valid 5 ways, all failed!')
          return resolve({
            error: 'web3.eth.personal.sign Valid, valid 5 ways, all failed!',
          })
        } else {
          return resolve({
            error: 'personalSign err before Validate:' + err,
          })
        }
      })
    } catch (err) {
      // LOG: for signature
      myLog('personalSign callback err', (err as unknown as any)?.message)
      resolve({ error: err as any })
    }
  })
}

export async function fcWalletValid(
  web3: any,
  account: string,
  msg: string,
  result: any,
  accountId: number,
  chainId: ChainId,
  counterFactualInfo?: CounterFactualInfo,
): Promise<{
  counterFactualInfo?: CounterFactualInfo
  error?: any
  result?: boolean
}> {
  const api = new BaseAPI({ chainId })
  if (counterFactualInfo === undefined || !counterFactualInfo.walletOwner) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    counterFactualInfo = (await api.getCounterFactualInfo({ accountId })).counterFactualInfo
  }

  if (counterFactualInfo && counterFactualInfo.walletOwner) {
    let _result: string
    if (result.startsWith('0x')) {
      _result = result.slice(0, 132)
    } else {
      _result = result
    }

    const valid: any = ecRecover(counterFactualInfo.walletOwner, msg, _result)
    if (valid.result) {
      myLog('fcWalletValid e:', result, counterFactualInfo)
      return { result, counterFactualInfo }
    } else {
      return { error: 'valid walletOwner failed' }
    }
  } else {
    return { error: 'valid walletOwner failed' }
  }
}
