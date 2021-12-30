import {
  ChainId,
  ConnectorNames,
  CounterFactualInfo, GetCounterFactualInfoRequest, ReqMethod, ReqParams, RESULT_INFO, SIG_FLAG,
} from "../defs";
import { Request } from "./request";
import { DEFAULT_TIMEOUT } from "../defs/loopring_constants";
import {ecrecover, fromRpcSig, hashPersonalMessage, keccak, keccak256, pubToAddress, toRpcSig} from "ethereumjs-util";
import {addHexPrefix, toBuffer, toHex, toNumber} from "../utils";
import Web3 from "web3";
import {myLog} from "../utils/log_tools";
import Transaction from "@ethereumjs/tx";
import ABI from "./ethereum/contracts";
import {LOOPRING_URLs} from "../defs/url_defs";


export class BaseAPI {
  protected baseUrl = "";
  private timeout: number;

  public constructor(param: InitParam, timeout: number = DEFAULT_TIMEOUT) {
    if (param.baseUrl) {
      this.baseUrl = param.baseUrl;
    } else if (param.chainId !== undefined) {
      this.setChainId(param.chainId);
    } else {
      this.setChainId(ChainId.GOERLI);
    }

    this.timeout = timeout;
  }

  public async getCounterFactualInfo<T extends any>(request: GetCounterFactualInfoRequest):Promise<{
    raw_data: T,
    counterFactualInfo: CounterFactualInfo | undefined
    error?: RESULT_INFO
  }> {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.COUNTER_FACTUAL_INFO,
      queryParams: request,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    };

    const raw_data = (await this.makeReq().request(reqParams)).data;

    let counterFactualInfo: CounterFactualInfo | undefined;
    let error:RESULT_INFO| undefined = undefined;

    if (raw_data && raw_data?.resultInfo) {
      error = raw_data?.resultInfo;
    }else{
      counterFactualInfo = {
        ...raw_data
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
  }

  public setBaseUrl(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  protected makeReq(): Request {
    return new Request(this.baseUrl, this.timeout);
  }
}

export async function walletLinkValid(account: string, msg: string, sig: any) {
  return new Promise((resolve) => {
    const signature = fromRpcSig(sig);
    const hash = hashPersonalMessage(toBuffer(msg));
    const recAddress = toHex(
      pubToAddress(ecrecover(hash, signature.v, signature.r, signature.s))
    );
    resolve({
      result: recAddress.toLowerCase() === account.toLowerCase(),
    });
  });
}

export async function ecRecover(
  web3: Web3,
  account: string,
  msg: string,
  sig: any,
) {
  return new Promise((resolve) => {
    try {
      web3.eth.personal.ecRecover(
        msg,
        sig,
        function (err: any, address: string) {
          if (!err)
            resolve({
              result: address.toLowerCase() === account.toLowerCase(),
            });
          else {
            resolve({ error: "ecRecover 1:" + err });
          }
        }
      );
    } catch (reason) {
      resolve({ error: "ecRecover 2:" + reason });
    }
  });
}

// Authereum account contract hashes the data in the validation function,
// so we must send the data plain text.
export async function authereumValid(
  web3: any,
  account: string,
  msg: string,
  sig: any
) {
  return new Promise((resolve) => {
    const hash = toBuffer(msg);
    const data = ABI.Contracts.ContractWallet.encodeInputs(
      "isValidSignature(bytes,bytes)",
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
            "isValidSignature(bytes,bytes)",
            result
          );
          resolve({
            result: toHex(toBuffer(valid[0])) === data.slice(0, 10),
          });
        } else resolve({ error: "authereumValid:" + err });
      }
    );
  });
}

export async function contractWalletValidate(
  web3: any,
  account: string,
  msg: string,
  sig: any
) {
  return new Promise((resolve) => {
    const hash = hashPersonalMessage(toBuffer(msg));
    const data = ABI.Contracts.ContractWallet.encodeInputs(
      "isValidSignature(bytes,bytes)",
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
            "isValidSignature(bytes,bytes)",
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

export async function contractWalletValidate2(
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
/**
 * @description sign hash
 * @param web3
 * @param account
 * @param hash
 * @returns {Promise.<*>}
 */
export async function sign(
  web3: any,
  account: string,
  pwd: string,
  hash: string,
) {
  return new Promise((resolve) => {
    web3.eth.sign(hash, account, pwd, function (err: any, result: any) {
      if (!err) {
        const r = result.slice(0, 66);
        const s = addHexPrefix(result.slice(66, 130));
        let v = toNumber(addHexPrefix(result.slice(130, 132)));
        if (v === 0 || v === 1) v = v + 27; // 修复ledger的签名
        resolve({ result: { r, s, v } });
      } else {
        const errorMsg = err.message.substring(0, err.message.indexOf(" at "));
        resolve({ error: { message: errorMsg } });
      }
    });
  });
}

/**
 * @description sign EIP217
 * @param web3
 * @param account
 * @param method
 * @param params
 * @returns {Promise.<*>}
 */
export async function signEip712(
  web3: any,
  account: string,
  method: string,
  params: any
) {
  const response: any = await new Promise((resolve) => {
    web3.currentProvider.sendAsync(
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

  if (response["result"]) {
    return response;
  } else {
    throw new Error(response["error"]["message"]);
  }
}

/**
 * @description sign message
 * @param web3
 * @param account
 * @param message
 * @returns {Promise}
 */
export async function signMessage(
  web3: any,
  account: string,
  pwd: string,
  message: string
) {
  const hash = toHex(hashPersonalMessage(keccak256(message)));
  return await sign(web3, account, pwd, hash);
}


export async function ecRecover2(
  account: string,
  message: string,
  signature: any
) {
  const messageBuffer = Buffer.from(message, "utf8");

  // console.log('message:', message)
  // console.log('signature raw:', signature)

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

/**
 * @description Signs ethereum tx
 * @param web3
 * @param account
 * @param rawTx
 * @returns {Promise.<*>}
 */
export async function signEthereumTx(
  web3: any,
  account: string,
  rawTx: any,
  chainId: ChainId
) {
  const ethTx = Transaction.Transaction.fromSerializedTx(rawTx);
  const hash = toHex(ethTx.hash());
  const response: any = await sign(web3, account, "", hash);
  if (!response["error"]) {
    const signature = response["result"];
    signature.v += chainId * 2 + 8;
    Object.assign(ethTx, signature);
    return { result: toHex(ethTx.serialize()) };
  } else {
    throw new Error(response["error"]["message"]);
  }
}

/**
 * @description Sends ethereum tx through MetaMask
 * @param web3
 * @param tx
 * @returns {*}
 */
export async function sendTransaction(web3: any, tx: any) {
  delete tx.gasPrice;
  // delete tx.gas;
  const response: any = await new Promise((resolve) => {
    web3.eth.sendTransaction(tx, function (err: any, transactionHash: string) {
      if (!err) {
        resolve({ result: transactionHash });
      } else {
        resolve({ error: { message: err.message } });
      }
    });
  });

  if (response["result"]) {
    return response;
  } else {
    throw new Error(response["error"]["message"]);
  }
}


const getBaseUrlByChainId = (id: ChainId) => {
  let baseUrl = "";

  switch (id) {
    case ChainId.MAINNET:
      baseUrl = "https://api.loopring.network";
      break;
    default:
      // baseUrl = 'https://api.uat.loopring.pro'
      baseUrl = "https://uat2.loopring.io";
  }

  return baseUrl;
};

export interface InitParam {
  chainId?: ChainId;
  baseUrl?: string;
}

export async function isContract(web3: any, address: string) {
  const code = await web3.eth.getCode(address);
  return code && code.length > 2;
}

export function formatSig(rpcSig:string) {
  const sig = fromRpcSig(rpcSig);
  return toRpcSig(sig.v, sig.r, sig.s);
}
export function recoverSignType(web3:any,account:string, msg: string, sig:string) {
  const ethRecover:any = ecRecover(web3,account, msg, sig);

  if (ethRecover.result){
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
  chainId:ChainId,
  accountId?:number,
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
            if (walletType === ConnectorNames.WalletLink) {
              const valid: any = await walletLinkValid(account, msg, result);
              if (valid.result) {
                resolve({ sig: result });
              } else {
                resolve({ error: "Failed to valid using WalletLink/Trezor" });
              }
              return;
            } else if (walletType === ConnectorNames.Authereum) {
              const valid: any = await authereumValid(
                web3,
                account,
                msg,
                result
              );
              if (valid.result) {
                resolve({ sig: result });
              } else {
                resolve({ error: "invalid sig using Authereum" });
              }
              return;
            }

            // console.log('try to exc ecRecover !!!')

            const valid: any = await ecRecover(web3, account, msg, result);

            if (valid.result) {
              resolve({ sig: result });
              return
            }

            const walletValid: any = await contractWalletValidate(
              web3,
              account,
              msg,
              result
            );

            if (walletValid.result) {
              resolve({ sig: result });
              return
            }

            const walletValid2: any = await contractWalletValidate2(
              web3,
              account,
              msg,
              result
            );

            if (walletValid2.result) {
              resolve({ sig: result });
              return
            }

            if(accountId){
              myLog("before fcWalletValid accountId:", valid);
              const fcValid = await fcWalletValid( web3,
                account,
                msg,
                result,accountId,chainId)
              if (fcValid.result){
                resolve({ sig: result ,counterFactualInfo:fcValid.counterFactualInfo});
                return
              }
            }
            
            const myKeyValid: any = await mykeyWalletValid(
              web3,
              account,
              msg,
              result
            );

            if (myKeyValid.result) {
              resolve({ sig: result });
            } else {
              resolve({ error: "myKeyValid sig at last!" });
            }

          } else {
            resolve({ error: "personalSign last:" + err });
          }
        }
      );
    } catch (reason) {
      resolve({ error: reason });
    }
  });
}


export async function fcWalletValid(web3: any,
                                    account: string,
                                    msg: string,
                                    result: any,
                                    accountId:number, chainId:ChainId): Promise<{
  counterFactualInfo?:CounterFactualInfo,error?:any,result?:boolean }> {
  const api = new BaseAPI({ chainId });
  const {counterFactualInfo} = await api.getCounterFactualInfo({ accountId })
  if(counterFactualInfo && counterFactualInfo.walletOwner){
    let _result:string;
    if(result.startsWith("0x")) {
       _result = result.slice(0,132);
    }else{
      _result = result;
    }
    const valid: any = await ecRecover(web3, counterFactualInfo.walletOwner, msg, _result);
    if (valid.result) {
      myLog("fcWalletValid e:", result,counterFactualInfo);
      return  {result, counterFactualInfo}
    }else{
      return { error:'valid walletOwner failed' }
    }
  }else{
    return { error:'valid walletOwner failed' }
  }

}
