import {
  ChainId,
  ConnectorError,
  ConnectorNames,
  CounterFactualInfo,
  GetAvailableBrokerRequest,
  GetCounterFactualInfoRequest,
  LoopringErrorCode,
  ReqMethod,
  ReqParams,
  RESULT_INFO,
  SIG_FLAG,
  TX_HASH_API,
} from "../defs";
import { Request } from "./request";
import {
  ecrecover,
  fromRpcSig,
  hashPersonalMessage,
  keccak,
  keccak256,
  pubToAddress,
  toRpcSig,
} from "ethereumjs-util";
import { addHexPrefix, toBuffer, toHex } from "../utils";
import Web3 from "web3";
import { myLog } from "../utils/log_tools";
import ABI from "./ethereum/contracts";
import { LOOPRING_URLs } from "../defs/url_defs";

export const KEY_MESSAGE =
  "Sign this message to access Loopring Exchange: " +
  "${exchangeAddress}" +
  " with key nonce: " +
  "${nonce}";
export class BaseAPI {
  static KEY_MESSAGE: string = KEY_MESSAGE;
  protected baseUrl = "";
  protected chainId: ChainId = ChainId.MAINNET;
  public genErr(err: Error): RESULT_INFO {
    if (!err || !err?.message) {
      return {
        ...err,
        message: "unKnown",
        code: LoopringErrorCode.SKD_UNKNOW,
      };
    }
    const key = Reflect.ownKeys(ConnectorError).find(
      (key) =>
        err?.message.search(
          ConnectorError[key as keyof typeof ConnectorError]
        ) !== -1
    );
    if (key) {
      return {
        ...err,
        message: key as keyof typeof ConnectorError,
        code: LoopringErrorCode[key as keyof typeof ConnectorError],
      };
    }

    return {
      ...err,
      code: LoopringErrorCode.SKD_UNKNOW,
    };
  }
  protected returnTxHash<T extends TX_HASH_API>(
    raw_data: T
  ):
    | (Omit<T, "resultInfo"> & { raw_data: Omit<T, "resultInfo"> })
    | RESULT_INFO {
    if (raw_data?.resultInfo) {
      return {
        ...raw_data.resultInfo,
        message: raw_data.resultInfo?.msg
          ? raw_data.resultInfo?.msg
          : raw_data?.resultInfo.message,
      };
    }
    return {
      ...raw_data,
      raw_data,
    };
  }
  private timeout: number;

  public constructor(param: InitParam, timeout: number = 6000) {
    if (param.baseUrl) {
      this.baseUrl = param.baseUrl;
    } else if (param.chainId !== undefined) {
      this.setChainId(param.chainId);
    } else {
      this.setChainId(ChainId.GOERLI);
    }
    this.timeout = timeout;
  }

  public async getAvailableBroker(
    request: GetAvailableBrokerRequest
  ): Promise<{ broker: string }> {
    const reqParams: ReqParams = {
      sigFlag: SIG_FLAG.NO_SIG,
      queryParams: request,
      url: LOOPRING_URLs.GET_AVAILABLE_BROKER,
      method: ReqMethod.GET,
    };
    const result = (await this.makeReq().request(reqParams)).data;
    return result;
  }

  public async getCounterFactualInfo<T extends any>(
    request: GetCounterFactualInfoRequest
  ): Promise<{
    raw_data: T;
    counterFactualInfo: CounterFactualInfo | undefined;
    error?: RESULT_INFO;
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.COUNTER_FACTUAL_INFO,
      queryParams: request,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;

    let counterFactualInfo: CounterFactualInfo | undefined;
    let error: RESULT_INFO | undefined = undefined;

    if (raw_data && raw_data?.resultInfo) {
      error = raw_data?.resultInfo;
    } else {
      counterFactualInfo = {
        ...raw_data,
      } as CounterFactualInfo;
    }

    return {
      counterFactualInfo,
      error,
      raw_data,
    };
  }

  public setChainId(chainId: ChainId) {
    this.baseUrl = getBaseUrlByChainId(chainId);
    this.chainId = chainId;
  }

  public setBaseUrl(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  protected makeReq(): Request {
    return new Request(this.baseUrl, this.timeout);
  }
}

export async function ecRecover(
  web3: Web3,
  account: string,
  msg: string,
  sig: any
) {
  return new Promise((resolve) => {
    try {
      web3.eth.personal.ecRecover(
        msg,
        sig,
        function (err: any, address: string) {
          if (!err && address) {
            resolve({
              result: address.toLowerCase() === account.toLowerCase(),
            });
          } else {
            resolve({
              error: "ecRecover 1:" + err + "or no address:" + address,
            });
            myLog("ecRecover error", err);
          }
        }
      );
    } catch (err) {
      myLog("ecRecover error", err);
      resolve({ error: ("ecRecover 2:" + err) as any });
    }
  });
}

export async function contractWalletValidate32(
  web3: any,
  account: string,
  msg: string,
  sig: any
) {
  return new Promise((resolve) => {
    const hash = hashPersonalMessage(toBuffer(msg));
    const data = ABI.Contracts.ContractWallet.encodeInputs(
      "isValidSignature(bytes32,bytes)",
      {
        _data: hash,
        _signature: toBuffer(sig),
      }
    );

    web3.eth.call(
      {
        to: account, // contract addr
        data: data,
      },
      function (err: any, result: any) {
        if (!err) {
          const valid = ABI.Contracts.ContractWallet.decodeOutputs(
            "isValidSignature(bytes32,bytes)",
            result
          );
          resolve({
            result: toHex(toBuffer(valid[0])) === data.slice(0, 10),
          });
        } else resolve({ error: err });
      }
    );
  });
}

export async function mykeyWalletValid(
  web3: any,
  account: string,
  msg: string,
  sig: any
) {
  const myKeyContract = "0xADc92d1fD878580579716d944eF3460E241604b7";
  return new Promise((resolve) => {
    web3.eth.call(
      {
        to: myKeyContract,
        data: ABI.Contracts.ContractWallet.encodeInputs("getKeyData", {
          _account: account,
          _index: 3,
        }),
      },
      function (err: any, res: any) {
        if (!err) {
          const signature = fromRpcSig(sig);
          const hash = hashPersonalMessage(keccak256(toBuffer(msg)));
          const address = addHexPrefix(
            ABI.Contracts.ContractWallet.decodeOutputs("getKeyData", res)[0]
          );
          const recAddress = toHex(
            pubToAddress(ecrecover(hash, signature.v, signature.r, signature.s))
          );
          resolve({
            result: recAddress.toLowerCase() === address.toLowerCase(),
          });
        } else {
          resolve({ error: err });
        }
      }
    );
  });
}

export async function ecRecover2(
  account: string,
  message: string,
  signature: any
) {
  const messageBuffer = Buffer.from(message, "utf8");

  // myLog('message:', message)
  // myLog('signature raw:', signature)

  signature = signature.split("x")[1];

  const parts = [
    Buffer.from(
      `\x19Ethereum Signed Message:\n${messageBuffer.length}`,
      "utf8"
    ),
    messageBuffer,
  ];

  const totalHash = keccak(Buffer.concat(parts));

  const r = Buffer.from(signature.substring(0, 64), "hex");
  const s = Buffer.from(signature.substring(64, 128), "hex");

  const old_v = Number(addHexPrefix(signature.substring(128, 130)));

  let v = old_v;

  if (v <= 1) v += 27;

  const pub = ecrecover(totalHash, v, r, s);

  const recoveredAddress = "0x" + pubToAddress(pub).toString("hex");

  if (account.toLowerCase() !== recoveredAddress.toLowerCase()) {
    myLog("v:", v, "old_v:", old_v, " recoveredAddress:", recoveredAddress);
  }

  return new Promise((resolve) =>
    resolve({
      result: account.toLowerCase() === recoveredAddress.toLowerCase(),
    })
  );
}

const getBaseUrlByChainId = (id: ChainId) => {
  let baseUrl = "";

  switch (id) {
    case ChainId.MAINNET:
      baseUrl = "https://api.loopring.network";
      break;
    default:
      baseUrl = "https://uat2.loopring.io";
      break;
  }

  return baseUrl;
};

/**
 * @default chainId 1
 * @default keySeed `Sign this message to access Loopring exchange: ${exchangeAddress} with key nonce: ${nonce}`
 */
export interface InitParam {
  chainId?: ChainId;
  baseUrl?: string;
}

export function formatSig(rpcSig: string) {
  const sig = fromRpcSig(rpcSig);
  return toRpcSig(sig.v, sig.r, sig.s);
}
export function recoverSignType(
  web3: any,
  account: string,
  msg: string,
  sig: string
) {
  const ethRecover: any = ecRecover(web3, account, msg, sig);

  if (ethRecover.result) {
    return "03";
  } else {
    return "";
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
  isMobile?: boolean
) {
  if (!account) {
    return { error: "personalSign got no account" };
  }
  return new Promise((resolve) => {
    try {
      web3.eth.personal.sign(
        msg,
        account,
        pwd,
        async function (err: any, result: any) {
          if (!err) {
            // Valid:1. counter Factual signature Valid
            if (counterFactualInfo && accountId) {
              myLog("fcWalletValid counterFactualInfo accountId:");
              const fcValid = await fcWalletValid(
                web3,
                account,
                msg,
                result,
                accountId,
                chainId,
                counterFactualInfo
              );
              if (fcValid.result) {
                resolve({
                  sig: result,
                  counterFactualInfo: fcValid.counterFactualInfo,
                });
                return;
              }
            }

            // Valid: 2. webview directory signature Valid
            if (
              typeof window !== "undefined" &&
              (window?.ethereum?.isImToken || window?.ethereum?.isMetaMask) &&
              isMobile &&
              // Mobile directory connect will sign ConnectorNames as MetaMask only
              walletType === ConnectorNames.MetaMask
            ) {
              const address: string[] = await window.ethereum?.request({
                method: "eth_requestAccounts",
              });
              if (
                address?.find(
                  (item) => item.toLowerCase() === account.toLowerCase()
                )
              ) {
                return resolve({ sig: result });
              }
            }
            myLog("ecRecover before", msg, result);
            // Valid: 3. EOA signature Valid by ecRecover
            const valid: any = await ecRecover(web3, account, msg, result);
            myLog("ecRecover after", valid.result);
            if (valid.result) {
              return resolve({ sig: result });
            }

            // // Valid: 4. contractWallet signature Valid `isValidSignature(bytes32,bytes)`
            // const walletValid: any = await contractWalletValidate(
            //   web3,
            //   account,
            //   msg,
            //   result
            // );
            //
            // if (walletValid.result) {
            //   return resolve({ sig: result });
            // }

            // Valid: 5. contractWallet signature Valid `isValidSignature(bytes32,bytes)`
            const walletValid2: any = await contractWalletValidate32(
              web3,
              account,
              msg,
              result
            );

            if (walletValid2.result) {
              return resolve({ sig: result });
            }

            // Valid: 6. counter Factual signature Valid when no counterFactualInfo
            if (accountId) {
              const fcValid = await fcWalletValid(
                web3,
                account,
                msg,
                result,
                accountId,
                chainId
              );
              if (fcValid.result) {
                return resolve({
                  sig: result,
                  counterFactualInfo: fcValid.counterFactualInfo,
                });
              }
            }

            // Valid: 7. myKeyValid Valid again
            const myKeyValid: any = await mykeyWalletValid(
              web3,
              account,
              msg,
              result
            );

            if (myKeyValid.result) {
              return resolve({ sig: result });
            }

            // Valid: Error cannot pass personalSign Valid
            // eslint-disable-next-line no-console
            console.log(
              "web3.eth.personal.sign Valid, valid 5 ways, all failed!"
            );
            return resolve({
              error: "web3.eth.personal.sign Valid, valid 5 ways, all failed!",
            });
          } else {
            return resolve({
              error: "personalSign err before Validate:" + err,
            });
          }
        }
      );
    } catch (err) {
      resolve({ error: err as any });
    }
  });
}

export async function fcWalletValid(
  web3: any,
  account: string,
  msg: string,
  result: any,
  accountId: number,
  chainId: ChainId,
  counterFactualInfo?: CounterFactualInfo
): Promise<{
  counterFactualInfo?: CounterFactualInfo;
  error?: any;
  result?: boolean;
}> {
  const api = new BaseAPI({ chainId });
  if (counterFactualInfo === undefined || !counterFactualInfo.walletOwner) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    counterFactualInfo = (await api.getCounterFactualInfo({ accountId }))
      .counterFactualInfo;
  }

  if (counterFactualInfo && counterFactualInfo.walletOwner) {
    let _result: string;
    if (result.startsWith("0x")) {
      _result = result.slice(0, 132);
    } else {
      _result = result;
    }
    const valid: any = await ecRecover(
      web3,
      counterFactualInfo.walletOwner,
      msg,
      _result
    );
    if (valid.result) {
      myLog("fcWalletValid e:", result, counterFactualInfo);
      return { result, counterFactualInfo };
    } else {
      return { error: "valid walletOwner failed" };
    }
  } else {
    return { error: "valid walletOwner failed" };
  }
}
