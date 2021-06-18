import { BaseAPI } from './base_api'

import { ReqParams, SIG_FLAG, ReqMethod, SigPatchField, } from '../defs/loopring_defs'

import { LOOPRING_URLs, } from '../defs/url_defs'

import { ChainId, SigSuffix } from '../defs/web3_defs'

import * as loopring_defs from '../defs/loopring_defs'

import { ConnectorNames } from '../defs/web3_defs'

import { sleep } from '../utils/network_tools'
import { isContract } from './ethereum/metaMask'
import Web3 from 'web3'

import * as sign_tools from './sign/sign_tools'

export class UserAPI extends BaseAPI {

    /*
    * Get the ApiKey associated with the user's account.
    */
    public async getUserApiKey(request: loopring_defs.GetUserApiKeyRequest, PrivateKey: string) {

        const dataToSig: Map<string, any> = new Map()

        dataToSig.set('accountId', request.accountId)

        const reqParams: ReqParams = {
            url: LOOPRING_URLs.API_KEY_ACTION,
            queryParams: request,
            bodyParams: request,
            method: ReqMethod.GET,
            sigFlag: SIG_FLAG.EDDSA_SIG,
            sigObj:
            {
                dataToSig,
                PrivateKey,
            }
        }

        const raw_data = (await this.makeReq().request(reqParams)).data
        return raw_data

    }

    /*
    * Change the ApiKey associated with the user's account. 
    * The current ApiKey must be provided as the value of the X-API-KEY HTTP header.
    */
    public async updateUserApiKey(request: loopring_defs.UpdateUserApiKeyRequest, apiKey: string) {

        const reqParams: ReqParams = {
            url: LOOPRING_URLs.API_KEY_ACTION,
            bodyParams: request,
            apiKey,
            method: ReqMethod.POST,
            sigFlag: SIG_FLAG.NO_SIG,
        }

        const raw_data = (await this.makeReq().request(reqParams)).data
        return raw_data

    }

    /*
    * Fetches the next order id for a given sold token. 
    * If the need arises to repeatedly place orders in a short span of time, 
    * the order id can be initially fetched through the API and then managed locally. 
    * Each new order id can be derived from adding 2 to the last one
    */
    public async getNextStorageId(request: loopring_defs.GetNextStorageIdRequest, apiKey: string) {

        const reqParams: ReqParams = {
            url: LOOPRING_URLs.GET_NEXT_STORAGE_ID,
            queryParams: request,
            apiKey,
            method: ReqMethod.GET,
            sigFlag: SIG_FLAG.NO_SIG,
        }

        const raw_data = (await this.makeReq().request(reqParams)).data
        return raw_data

    }

    /*
    * Get the details of an order based on order hash.
    */
    public async getOrderDetails(request: loopring_defs.GetOrderDetailsRequest, apiKey: string) {

        const reqParams: ReqParams = {
            url: LOOPRING_URLs.ORDER_ACTION,
            queryParams: request,
            apiKey,
            method: ReqMethod.GET,
            sigFlag: SIG_FLAG.NO_SIG,
        }

        const raw_data = (await this.makeReq().request(reqParams)).data
        return raw_data

    }

    /*
    * Submit an order
    */
    public async submitOrder(orderRequest: loopring_defs.SubmitOrderRequestV3, PrivateKey: string, apiKey: string) {

        const dataToSig = [
            orderRequest.exchange,
            orderRequest.storageId,
            orderRequest.accountId,
            orderRequest.sellToken.tokenId,
            orderRequest.buyToken.tokenId,
            orderRequest.sellToken.volume,
            orderRequest.buyToken.volume,
            orderRequest.validUntil,
            orderRequest.maxFeeBips,
            orderRequest.fillAmountBOrS ? 1 : 0,
        ]

        const reqParams: ReqParams = {
            url: LOOPRING_URLs.ORDER_ACTION,
            bodyParams: orderRequest,
            apiKey,
            method: ReqMethod.POST,
            sigFlag: SIG_FLAG.EDDSA_SIG_POSEIDON,
            sigObj: {
                dataToSig,
                sigPatch: SigPatchField.EddsaSignature,
                PrivateKey,
            }
        }

        const raw_data = (await this.makeReq().request(reqParams)).data
        return raw_data

    }

    /*
    * Cancel order using order hash or client-side ID.
    */
    public async cancelOrder(request: loopring_defs.CancelOrderRequest, PrivateKey: string, apiKey: string) {

        const dataToSig: Map<string, any> = new Map()

        dataToSig.set('accountId', request.accountId)
        if (request.orderHash)
            dataToSig.set('orderHash', request.orderHash)
        if (request.clientOrderId)
            dataToSig.set('clientOrderId', request.clientOrderId)

        const reqParams: ReqParams = {
            url: LOOPRING_URLs.ORDER_ACTION,
            queryParams: request,
            apiKey,
            method: ReqMethod.DELETE,
            sigFlag: SIG_FLAG.EDDSA_SIG,
            sigObj: {
                dataToSig,
                PrivateKey,
            }
        }

        const raw_data = (await this.makeReq().request(reqParams)).data
        return raw_data

    }

    public async getOrders(request: loopring_defs.GetOrdersRequest, apiKey: string) {

        const reqParams: ReqParams = {
            url: LOOPRING_URLs.GET_MULTI_ORDERS,
            queryParams: request,
            apiKey,
            method: ReqMethod.GET,
            sigFlag: SIG_FLAG.NO_SIG,
        }

        const raw_data = (await this.makeReq().request(reqParams)).data
        return raw_data

    }

    /*
    * Updates the EDDSA key associated with the specified account, making the previous one invalid in the process.
    */
    public async updateAccount(request: loopring_defs.UpdateAccountRequestV3, web3: any) {

        const reqParams: ReqParams = {
            url: LOOPRING_URLs.ACCOUNT_ACTION,
            bodyParams: request,
            method: ReqMethod.POST,
            sigFlag: SIG_FLAG.ECDSA_SIG,
            sigObj: {
                dataToSig: request,
                web3,
            }
        }

        const raw_data = (await this.makeReq().request(reqParams)).data
        return raw_data

    }

    /*
    * Returns a list Ethereum transactions from users for exchange account registration.
    */
    public async getUserRegTxs(request: loopring_defs.GetUserRegTxsRequest, apiKey: string) {

        const reqParams: ReqParams = {
            url: LOOPRING_URLs.GET_USER_REG_TXS,
            queryParams: request,
            apiKey,
            method: ReqMethod.GET,
            sigFlag: SIG_FLAG.NO_SIG,
        }

        const raw_data = (await this.makeReq().request(reqParams)).data
        return raw_data

    }

    /*
    * Returns a list Ethereum transactions from users for resetting exchange passwords.
    */
    public async getUserPwdResetTxs(request: loopring_defs.GetUserPwdResetTxsRequest, apiKey: string) {

        const reqParams: ReqParams = {
            url: LOOPRING_URLs.GET_PWD_RESET_TXS,
            queryParams: request,
            apiKey,
            method: ReqMethod.GET,
            sigFlag: SIG_FLAG.NO_SIG,
        }

        const raw_data = (await this.makeReq().request(reqParams)).data
        return raw_data

    }

    /*
    * Returns user's Ether and token balances on exchange.
    */
    public async getUserBalances(request: loopring_defs.GetUserBalancesRequest, apiKey: string) {

        const reqParams: ReqParams = {
            url: LOOPRING_URLs.GET_USER_EXCHANGE_BALANCES,
            queryParams: request,
            apiKey,
            method: ReqMethod.GET,
            sigFlag: SIG_FLAG.NO_SIG,
        }

        const raw_data = (await this.makeReq().request(reqParams)).data
        return raw_data

    }

    /*
    * Returns user's Ether and token balances on exchange.
    */
    public async getUserDepositHistory(request: loopring_defs.GetUserDepositHistoryRequest, apiKey: string) {

        const reqParams: ReqParams = {
            url: LOOPRING_URLs.GET_USER_DEPOSITS_HISTORY,
            queryParams: request,
            apiKey,
            method: ReqMethod.GET,
            sigFlag: SIG_FLAG.NO_SIG,
        }

        const raw_data = (await this.makeReq().request(reqParams)).data
        return raw_data

    }

    /*
    * Get user onchain withdrawal history.
    */
    public async getUserOnchainWithdrawalHistory(request: loopring_defs.GetUserOnchainWithdrawalHistoryRequest, apiKey: string) {

        const reqParams: ReqParams = {
            url: LOOPRING_URLs.GET_USER_DEPOSITS_HISTORY,
            queryParams: request,
            apiKey,
            method: ReqMethod.GET,
            sigFlag: SIG_FLAG.NO_SIG,
        }

        const raw_data = (await this.makeReq().request(reqParams)).data
        return raw_data

    }

    /*
    * Get user transfer list.
    */
    public async getUserTranferList(request: loopring_defs.GetUserTransferListRequest, apiKey: string) {

        const reqParams: ReqParams = {
            url: LOOPRING_URLs.GET_USER_TRANFERS_LIST,
            queryParams: request,
            apiKey,
            method: ReqMethod.GET,
            sigFlag: SIG_FLAG.NO_SIG,
        }

        const raw_data = (await this.makeReq().request(reqParams)).data
        return raw_data

    }

    /*
    * Get user trade history
    */
    public async getUserTrades(request: loopring_defs.GetUserTradesRequest, apiKey: string) {

        const reqParams: ReqParams = {
            url: LOOPRING_URLs.GET_USER_TRADE_HISTORY,
            queryParams: request,
            apiKey,
            method: ReqMethod.GET,
            sigFlag: SIG_FLAG.NO_SIG,
        }

        const raw_data = (await this.makeReq().request(reqParams)).data
        return raw_data

    }

    /*
    * Returns the fee rate of users placing orders in specific markets
    */
    public async getUserFeeRate(request: loopring_defs.GetUserFeeRateRequest, apiKey: string) {

        const reqParams: ReqParams = {
            url: LOOPRING_URLs.GET_USER_FEE_RATE,
            queryParams: request,
            apiKey,
            method: ReqMethod.GET,
            sigFlag: SIG_FLAG.NO_SIG,
        }

        const raw_data = (await this.makeReq().request(reqParams)).data
        return raw_data

    }

    /*
    * Returns the fee rate of users placing orders in specific markets
    */
    public async getUserOrderFeeRate(request: loopring_defs.GetUserOrderFeeRateRequest, apiKey: string) {

        const reqParams: ReqParams = {
            url: LOOPRING_URLs.GET_USER_ORDER_FEE_RATE,
            queryParams: request,
            apiKey,
            method: ReqMethod.GET,
            sigFlag: SIG_FLAG.NO_SIG,
        }

        const rawData = (await this.makeReq().request(reqParams)).data
        return rawData

    }

    /*
    * Query current fee amount
    */
    public async getOffchainFeeAmt(request: loopring_defs.GetOffchainFeeAmtRequest, apiKey: string) {

        const reqParams: ReqParams = {
            url: LOOPRING_URLs.GET_OFFCHAIN_FEE_AMT,
            queryParams: request,
            apiKey,
            method: ReqMethod.GET,
            sigFlag: SIG_FLAG.NO_SIG,
        }

        const rawData = (await this.makeReq().request(reqParams)).data
        return rawData

    }

    /*
    * Submit offchain withdraw request
    */

    public async submitOffchainWithdraw(request: loopring_defs.OffChainWithdrawalRequestV3, 
        web3: Web3, chainId: ChainId, walletType: ConnectorNames,
        privateKey: string, apiKey: string, isHardwareAddress: boolean) {

        let shouldSaveHWAddr = false

        let ecdsaSignature = undefined

        // metamask not import hw wallet.
        if (walletType === ConnectorNames.Injected && !isHardwareAddress) {
            try {
                // signOffchainWithdrawWithDataStructure
                console.log('1. signOffchainWithdrawWithDataStructure')
                const result = (await sign_tools.signOffchainWithdrawWithDataStructure(web3, request.owner, request, chainId))
                ecdsaSignature = result.ecdsaSig + SigSuffix.Suffix02
            } catch (err) {

                if (err.message.indexOf('Not supported on this device') !== -1) {
                    console.log('catch err', err)
                    await sleep(1500)
                    shouldSaveHWAddr = true
                    // signOffchainWithdrawWithoutDataStructure
                    console.log('2. signOffchainWithdrawWithoutDataStructure')
                    const result = (await sign_tools.signOffchainWithdrawWithoutDataStructure(web3, request.owner, request, chainId))
                    ecdsaSignature = result.ecdsaSig + SigSuffix.Suffix03
                }
                
                throw err
            }
        } else {

            const isContractCheck = await isContract(web3, request.owner)

            if (isContractCheck) {
                // signOffchainWithdrawWithDataStructureForContract
                console.log('3. signOffchainWithdrawWithDataStructureForContract')
                const result = (await sign_tools.signOffchainWithdrawWithDataStructureForContract(web3, request.owner, request, chainId))
                ecdsaSignature = result.ecdsaSig
            } else {
                // signOffchainWithdrawWithoutDataStructure
                console.log('4. signOffchainWithdrawWithoutDataStructure 2')
                const result = (await sign_tools.signOffchainWithdrawWithoutDataStructure(web3, request.owner, request, chainId))
                ecdsaSignature = result.ecdsaSig + SigSuffix.Suffix03
            }

        }

        console.log('submitOffchainWithdraw ecdsaSignature:', ecdsaSignature)

        request.eddsaSignature = sign_tools.get_EddsaSig_OffChainWithdraw(request, privateKey)
        
        console.log('submitOffchainWithdraw .eddsaSignature:', request.eddsaSignature)

        const reqParams: ReqParams = {
            url: LOOPRING_URLs.WITHDRAWALS_ACTION,
            bodyParams: request,
            apiKey,
            method: ReqMethod.POST,
            sigFlag: SIG_FLAG.NO_SIG,
            ecdsaSignature,
        }

        const raw_data = (await this.makeReq().request(reqParams)).data

        return {
            raw_data,
            shouldSaveHWAddr,
        }

    }

    /*
    * Submit offchain withdraw request
    */
    public async submitInternalTransfer(request: loopring_defs.OriginTransferRequestV3, 
        web3: Web3, chainId: ChainId, walletType: ConnectorNames,
        privateKey: string, apiKey: string, isHardwareAddress: boolean) {

        let shouldSaveHWAddr = false

        let ecdsaSignature = undefined

        if (walletType === ConnectorNames.Injected && !isHardwareAddress) {
            try {
                // signOffchainWithdrawWithDataStructure
                console.log('1. signTransferWithDataStructure')
                const result = (await sign_tools.signTransferWithDataStructure(web3, request.payerAddr, request, chainId))
                ecdsaSignature = result.ecdsaSig + SigSuffix.Suffix02
            } catch (err) {

                if (err.message.indexOf('Not supported on this device') !== -1) {
                    console.log('catch err', err)
                    await sleep(1500)
                    shouldSaveHWAddr = true
                    // signOffchainWithdrawWithoutDataStructure
                    console.log('2. signTransferWithoutDataStructure')
                    const result = (await sign_tools.signTransferWithoutDataStructure(web3, request.payerAddr, request, chainId))
                    ecdsaSignature = result.ecdsaSig + SigSuffix.Suffix03
                }
                throw err
            }
        } else {

            const isContractCheck = await isContract(web3, request.payerAddr)

            if (isContractCheck) {
                // signOffchainWithdrawWithDataStructureForContract
                console.log('3. signTransferWithDataStructureForContract')
                const result = (await sign_tools.signTransferWithDataStructureForContract(web3, request.payerAddr, request, chainId))
                ecdsaSignature = result.ecdsaSig
            } else {
                // signOffchainWithdrawWithoutDataStructure
                console.log('4. signTransferWithoutDataStructure 2')
                const result = (await sign_tools.signTransferWithoutDataStructure(web3, request.payerAddr, request, chainId))
                ecdsaSignature = result.ecdsaSig + SigSuffix.Suffix03
            }

        }

        console.log('submitInternalTransfer ecdsaSignature:', ecdsaSignature)

        request.eddsaSignature = sign_tools.get_EddsaSig_Transfer(request, privateKey)

        const reqParams: ReqParams = {
            url: LOOPRING_URLs.POST_INTERNAL_TRANSFER,
            bodyParams: request,
            apiKey,
            method: ReqMethod.POST,
            sigFlag: SIG_FLAG.NO_SIG,
            ecdsaSignature,
        }

        const raw_data = (await this.makeReq().request(reqParams)).data
        return {
            raw_data,
            shouldSaveHWAddr,
        }

    }

}