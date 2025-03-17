import { BaseAPI } from './base_api'
import * as loopring_defs from '../defs'
import {RabbitWithdrawRequest} from '../defs'
import { ethers, utils  } from 'ethers';
import { get_EddsaSig_Transfer } from './sign/sign_tools';
import { AxiosResponse } from 'axios';

const {_TypedDataEncoder} = utils

interface CounterFactualInfo {
  walletFactory: string;
  walletOwner: string;
  walletSalt: string;
}

export class RabbitWithdrawAPI extends BaseAPI {
  public async getConfig(): Promise<{ config: string }> {
    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.GET_RABBIT_WITHDRAW_CONFIG, // You'll need to add this URL in url_defs.ts
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
    }
    const data = (await this.makeReq().request(reqParams)).data
    return data as {
      config: string
    }
  }
  public async getNetworkWithdrawalAgents(req: {
    tokenId: number
    amount: string
    network: string
  }): Promise<
    {
      address: string
      tokenId: number
      symbol: string
      totalAmount: string
      freezeAmount: string
      timestamp: number
    }[]
  > {
    const reqParams: loopring_defs.ReqParams = {
      queryParams: req,
      url: loopring_defs.LOOPRING_URLs.GET_NETWORK_WITHDRAWAL_AGENTS, // You'll need to add this URL in url_defs.ts
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
    }

    const data = (await this.makeReq().request(reqParams)).data
    return data
  }

  public async submitRabitWithdraw(
    req: RabbitWithdrawRequest,
    extra: {
      signer: ethers.providers.JsonRpcSigner
      chainId: number
      exchangeAddr: string
      eddsaSignKey: string
    },
  ): Promise<{
    hash: string
    status: string
    isIdempotent: boolean
    accountId: number
    tokenId: number
    storageId: number
  }> {
    const { signer, chainId, exchangeAddr } = extra
    const mapRequestToTypedData = (request: Record<string, any>) => {
      return {
        fromNetwork: request['fromNetwork'],
        toNetwork: request['toNetwork'],
        withdrawToAddr: request['toAddress'],
        payerId: request['transfer']['payerId'],
        payerAddr: request['transfer']['payerAddr'],
        payeeId: request['transfer']['payeeId'],
        payeeAddr: request['transfer']['payeeAddr'],
        tokenID: request['transfer']['token']['tokenId'],
        amount: request['transfer']['token']['volume'],
        feeTokenID: request['transfer']['maxFee']['tokenId'],
        maxFee: request['transfer']['maxFee']['volume'],
        validUntil: request['transfer']['validUntil'],
        storageID: request['transfer']['storageId'],
      } as Record<string, any>
    }

    const signFastWithdrawTypedData = (args: {
      signer: ethers.providers.JsonRpcSigner
      chainId: number
      exchangeAddress: string
      data: Record<string, any>
    }) => {
      const { signer, chainId, exchangeAddress } = args
      const domain = {
        name: 'Loopring Protocol',
        version: '3.6.0',
        chainId: chainId,
        verifyingContract: exchangeAddress,
      }
      const types = {
        RabbitWithdraw: [
          { type: 'uint32', name: 'payerId' },
          { type: 'address', name: 'payerAddr' },
          { type: 'uint32', name: 'payeeId' },
          { type: 'address', name: 'payeeAddr' },
          { type: 'uint16', name: 'tokenID' },
          { type: 'uint96', name: 'amount' },
          { type: 'uint16', name: 'feeTokenID' },
          { type: 'uint96', name: 'maxFee' },
          { type: 'uint32', name: 'validUntil' },
          { type: 'uint32', name: 'storageID' },
          { type: 'string', name: 'fromNetwork' },
          { type: 'string', name: 'toNetwork' },
          { type: 'address', name: 'withdrawToAddr' },
        ],
      }
      console.log('EIP712 hash', _TypedDataEncoder.hash(domain, types, args.data))
      return signer._signTypedData(domain, types, args.data)
    }
    const ecdsaSignature = await signFastWithdrawTypedData({
      signer: signer,
      chainId: chainId,
      exchangeAddress: exchangeAddr,
      data: mapRequestToTypedData(req),
    })
    const eddsaSignature = get_EddsaSig_Transfer(req.transfer, extra.eddsaSignKey).result
    const reqParams: loopring_defs.ReqParams = {
      bodyParams: {
        ...req,
        transfer: { ...req.transfer, eddsaSignature },
      },
      url: loopring_defs.LOOPRING_URLs.POST_RABBIT_WITHDRAW, // You'll need to add this URL in url_defs.ts
      method: loopring_defs.ReqMethod.POST,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
      ecdsaSignature: ecdsaSignature,
    }
    const data = (await this.makeReq().request(reqParams)).data
    return data
  }
  
  public async getUserCrossChainFee<R>(
    request: loopring_defs.GetUserCrossChainFeeRequest,
    apiKey: string,
  ): Promise<{
    gasPrice: string
    fees: {
      token: string
      tokenId: number
      fee: string
      discount: number
    }[]
  }> {
    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.GET_CROSSCHAIN_OFFCHAIN_FEE_AMT,
      queryParams: { ...request },
      apiKey,
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
    }
    let raw_data
    try {
      raw_data = (await this.makeReq().request(reqParams)).data
    } catch (error) {
      throw error as AxiosResponse
    }

    return raw_data
  }
}
