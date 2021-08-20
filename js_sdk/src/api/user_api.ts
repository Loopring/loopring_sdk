import { BaseAPI } from './base_api'

import { ReqParams, } from '../defs/loopring_defs'

import { SIG_FLAG, ReqMethod, SigPatchField, TradeChannel, } from '../defs/loopring_enums'

import { LOOPRING_URLs, } from '../defs/url_defs'

import { ChainId, SigSuffix } from '../defs/web3_defs'

import * as loopring_defs from '../defs/loopring_defs'

import { ConnectorNames } from '../defs/web3_defs'

import { sleep } from '../utils/network_tools'
import { isContract } from './ethereum/metaMask'
import Web3 from 'web3'

import * as sign_tools from './sign/sign_tools'
import { type } from 'os'

const NOT_SUPPORT_ERROR = 'Not supported on this device'

const WAIT_TIME = 1500

export function checkNotSupport(message: any) {
    if (!message) {
        return false
    }

    return message.indexOf(NOT_SUPPORT_ERROR) !== -1
}

export class UserAPI extends BaseAPI {

    /*
    * Get the ApiKey associated with the user's account.
    */
    public async getUserApiKey(request: loopring_defs.GetUserApiKeyRequest, eddsaKey: string) {

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
                PrivateKey: eddsaKey,
            }
        }

        const raw_data = (await this.makeReq().request(reqParams)).data

        const apiKey = raw_data['apiKey']

        return {
            apiKey,
            raw_data,
        }

    }

    /*
    * Change the ApiKey associated with the user's account. 
    * The current ApiKey must be provided as the value of the X-API-KEY HTTP header.
    */
    public async updateUserApiKey(request: loopring_defs.UpdateUserApiKeyRequest,
        apiKey: string, eddsaKey: string) {

        const dataToSig: Map<string, any> = new Map()

        dataToSig.set('accountId', request.accountId)

        const reqParams: ReqParams = {
            url: LOOPRING_URLs.API_KEY_ACTION,
            bodyParams: request,
            apiKey,
            method: ReqMethod.POST,
            sigFlag: SIG_FLAG.EDDSA_SIG,
            sigObj:
            {
                dataToSig,
                PrivateKey: eddsaKey,
            }
        }

        const raw_data = (await this.makeReq().request(reqParams)).data

        return {
            raw_data
        }

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
        const { orderId, offchainId } = raw_data
        return {
            orderId,
            offchainId,
            raw_data,
        }
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

        const raw_data: loopring_defs.OrderDetail = (await this.makeReq().request(reqParams)).data

        return {
            orderDetail: raw_data,
            raw_data,
        }

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
        const totalNum: number = raw_data.totalNum
        const orders: loopring_defs.OrderDetail[] = raw_data.orders

        return {
            totalNum,
            orders,
            raw_data,
        }

    }

    /*
    * Submit an order
    */
    public async submitOrder(orderRequest: loopring_defs.SubmitOrderRequestV3, PrivateKey: string, apiKey: string) {

        if (!orderRequest.tradeChannel) {
            orderRequest.tradeChannel = TradeChannel.MIXED
        }

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
            0,
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

        return this.returnTxHash(raw_data)

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

        return {
            raw_data
        }

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

        const userRegTxs: loopring_defs.UserRegTx[] = raw_data.transactions

        return {
            totalNum: raw_data.totalNum,
            userRegTxs,
            raw_data,
        }

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

        const userPwdResetTxs: loopring_defs.UserPwdResetTx[] = raw_data.transactions

        return {
            totalNum: raw_data.totalNum,
            userPwdResetTxs,
            raw_data
        }

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

        let userBalances: loopring_defs.LoopringMap<loopring_defs.UserBalanceInfo> = {}

        if (raw_data instanceof Array) {

            raw_data.forEach((item: loopring_defs.UserBalanceInfo) => {
                userBalances[item.tokenId] = item
            })

        }

        return {
            userBalances,
            raw_data,
        }

    }

    /*
    * Returns user's deposit records.
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

        return {
            totalNum: raw_data?.totalNum,
            userDepositHistory: raw_data.transactions as loopring_defs.UserDepositHistoryTx[],
            raw_data,
        }

    }

    /*
    * Get user onchain withdrawal history.
    */
    public async getUserOnchainWithdrawalHistory(request: loopring_defs.GetUserOnchainWithdrawalHistoryRequest, apiKey: string) {

        const reqParams: ReqParams = {
            url: LOOPRING_URLs.WITHDRAWALS_ACTION,
            queryParams: request,
            apiKey,
            method: ReqMethod.GET,
            sigFlag: SIG_FLAG.NO_SIG,
        }

        const raw_data = (await this.makeReq().request(reqParams)).data
        return {
            totalNum: raw_data?.totalNum,
            userOnchainWithdrawalHistory: raw_data.transactions as loopring_defs.UserOnchainWithdrawalHistoryTx[],
            raw_data,
        }

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

        return {
            totalNum: raw_data?.totalNum,
            userTransfers: raw_data.transactions as loopring_defs.UserTransferRecord[],
            raw_data,
        }

    }

    /*
    * Get user txs
    */
    public async getUserTxs(request: loopring_defs.GetUserTxsRequest, apiKey: string) {

        const reqParams: ReqParams = {
            url: LOOPRING_URLs.GET_USER_TXS,
            queryParams: request,
            apiKey,
            method: ReqMethod.GET,
            sigFlag: SIG_FLAG.NO_SIG,
        }

        const raw_data = (await this.makeReq().request(reqParams)).data

        let userTxs: loopring_defs.UserTx[] = []

        if (raw_data?.transactions instanceof Array) {
            raw_data.transactions.forEach((item: loopring_defs.UserTx) => {
                userTxs.push(item)
            })
        }

        return {
            totalNum: raw_data?.totalNum,
            userTxs,
            raw_data,
        }

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

        let userTrades: loopring_defs.UserTrade[] = []

        if (raw_data?.trades instanceof Array) {
            raw_data.trades.forEach((item: any[]) => {
                userTrades.push({
                    tradeTime: item[0],
                    tradeId: item[1],
                    side: item[2],
                    volume: item[3],
                    price: item[4],
                    market: item[5],
                    fee: item[6],
                })
            })
        }

        return {
            totalNum: raw_data.totalNum,
            userTrades,
            raw_data
        }

    }

    /*
    * deprecated
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

        let userFreeRateMap: loopring_defs.LoopringMap<loopring_defs.UserFeeRateInfo> = {}

        if (raw_data instanceof Array) {

            raw_data.forEach((item: loopring_defs.UserFeeRateInfo) => {
                userFreeRateMap[item.symbol] = item
            })

        }

        return {
            userFreeRateMap,
            raw_data,
        }

    }

    /*
    * Returns the user order fee rate of users placing orders in specific markets
    */
    public async getUserOrderFeeRate(request: loopring_defs.GetUserOrderFeeRateRequest, apiKey: string) {

        const reqParams: ReqParams = {
            url: LOOPRING_URLs.GET_USER_ORDER_FEE_RATE,
            queryParams: request,
            apiKey,
            method: ReqMethod.GET,
            sigFlag: SIG_FLAG.NO_SIG,
        }

        const raw_data = (await this.makeReq().request(reqParams)).data

        const gasPrice = parseInt(raw_data.gasPrice)

        return {
            feeRate: raw_data.feeRate as loopring_defs.FeeRateInfo,
            gasPrice,
            raw_data,
        }

    }

    /*
    * Query current token minimum amount to place order based on users VIP level and max fee bips
    */
    public async getMinimumTokenAmt(request: loopring_defs.GetMinimumTokenAmtRequest, apiKey: string) {

        const reqParams: ReqParams = {
            url: LOOPRING_URLs.GET_MINIMUM_TOKEN_AMT,
            queryParams: request,
            apiKey,
            method: ReqMethod.GET,
            sigFlag: SIG_FLAG.NO_SIG,
        }

        const raw_data = (await this.makeReq().request(reqParams)).data

        const gasPrice = parseInt(raw_data.gasPrice)

        const amounts: [loopring_defs.TokenAmount, loopring_defs.TokenAmount] = raw_data?.amounts

        const amountMap: loopring_defs.LoopringMap<loopring_defs.TokenAmount> = {}

        if (amounts instanceof Array) {

            amounts.forEach((item: loopring_defs.TokenAmount) => {
                amountMap[item.tokenSymbol] = item
            })

        }

        return {
            amounts,
            amountMap,
            gasPrice,
            cacheOverdueAt: raw_data.cacheOverdueAt,
            raw_data,
        }

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

        const raw_data = (await this.makeReq().request(reqParams)).data

        const gasPrice = parseInt(raw_data.gasPrice)

        let fees: loopring_defs.LoopringMap<loopring_defs.OffchainFeeInfo> = {}

        if (raw_data?.fees instanceof Array) {
            raw_data.fees.forEach((item: loopring_defs.OffchainFeeInfo) => {
                fees[item.token] = item
            })
        }

        return {
            fees,
            gasPrice,
            raw_data,
        }

    }

    private returnTxHash(raw_data: any) {

        let hash = undefined

        let errInfo = undefined

        if (raw_data?.hash) {
            hash = raw_data.hash
        } else if (raw_data?.resultInfo) {
            errInfo = raw_data.resultInfo
        }

        return {
            hash,
            errInfo,
            raw_data,
        }

    }

    /*
    * Submit offchain withdraw request
    */

    public async submitOffchainWithdraw(req: loopring_defs.OffChainWithdrawalRequestV3WithPatch) {

        const { request, web3, chainId, walletType,
            eddsaKey, apiKey, isHWAddr: isHWAddrOld, } = req

        let isHWAddr = !!isHWAddrOld

        let ecdsaSignature = undefined

        let errorInfo = undefined

        const sigHW = async () => {
            const result = (await sign_tools.signOffchainWithdrawWithoutDataStructure(web3, request.owner, request, chainId, walletType))
            ecdsaSignature = result.ecdsaSig + SigSuffix.Suffix03
        }

        // metamask not import hw wallet.
        if (walletType === ConnectorNames.MetaMask) {
                try {
                    if (isHWAddr) {
                        await sigHW()
                    } else {
                        const result = (await sign_tools.signOffchainWithdrawWithDataStructure(web3, request.owner, request, chainId))
                        ecdsaSignature = result.ecdsaSig + SigSuffix.Suffix02
                    }

                } catch (err) {

                    errorInfo = {
                        isNotSupport: checkNotSupport(err?.message)
                    }
                }
        } else {

            const isContractCheck = await isContract(web3, request.owner)

            if (isContractCheck) {
                // signOffchainWithdrawWithDataStructureForContract
                // console.log('3. signOffchainWithdrawWithDataStructureForContract')
                const result = (await sign_tools.signOffchainWithdrawWithDataStructureForContract(web3, request.owner, request, chainId))
                ecdsaSignature = result.ecdsaSig
            } else {
                await sigHW()
            }

        }

        if (!errorInfo) {

            request.eddsaSignature = sign_tools.get_EddsaSig_OffChainWithdraw(request, eddsaKey)
    
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
                ...this.returnTxHash(raw_data),
                errorInfo,
            }

        }

        return {
            errorInfo,
        }

    }

    /*
    * Submit offchain withdraw request
    */
    public async submitInternalTransfer(req: loopring_defs.OriginTransferRequestV3WithPatch) {

        const { request, web3, chainId, walletType,
            eddsaKey, apiKey, isHWAddr: isHWAddrOld, } = req

        const isHWAddr = !!isHWAddrOld

        let ecdsaSignature = undefined

        let errorInfo = undefined

        const sigHW = async () => {
            const result = (await sign_tools.signTransferWithoutDataStructure(web3, request.payerAddr, request, chainId, walletType))
            ecdsaSignature = result.ecdsaSig + SigSuffix.Suffix03
        }

        if (walletType === ConnectorNames.MetaMask) {
            
                try {
                    if (isHWAddr) {
                        await sigHW()
                    } else {
                        const result = (await sign_tools.signTransferWithDataStructure(web3, request.payerAddr, request, chainId))
                        ecdsaSignature = result.ecdsaSig + SigSuffix.Suffix02
                    }
                } catch (err) {

                    errorInfo = {
                        isNotSupport: checkNotSupport(err?.message)
                    }

                }
                
        } else {

            const isContractCheck = await isContract(web3, request.payerAddr)

            if (isContractCheck) {
                // signOffchainWithdrawWithDataStructureForContract
                // console.log('3. signTransferWithDataStructureForContract')
                const result = (await sign_tools.signTransferWithDataStructureForContract(web3, request.payerAddr, request, chainId))
                ecdsaSignature = result.ecdsaSig
                // console.log('3. result.ecdsaSig:', result.ecdsaSig)
            } else {
                await sigHW()
            }

        }
        // console.log('ecdsaSignature:', ecdsaSignature)

        if (!errorInfo) {

            request.eddsaSignature = sign_tools.get_EddsaSig_Transfer(request, eddsaKey)
    
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
                ...this.returnTxHash(raw_data),
                errorInfo,
            }

        }

        return {
            errorInfo,
        }

    }

    /*
    * Updates the EDDSA key associated with the specified account, making the previous one invalid in the process.
    */
    public async updateAccount(req: loopring_defs.UpdateAccountRequestV3WithPatch) {

        const { request, web3, chainId, walletType, isHWAddr: isHWAddrOld, } = req

        let isHWAddr = !!isHWAddrOld

        let ecdsaSignature = undefined

        let errorInfo = undefined

        const sigHW = async () => {
            const result = (await sign_tools.signUpdateAccountWithoutDataStructure(web3, request, chainId, walletType))
            ecdsaSignature = result.ecdsaSig + SigSuffix.Suffix03
        }

        if (walletType === ConnectorNames.MetaMask) {

                try {
                    if (isHWAddr) {
                        await sigHW()
                    } else {
                        const result = (await sign_tools.signUpdateAccountWithDataStructure(web3, request, chainId))
                        ecdsaSignature = result.ecdsaSig + SigSuffix.Suffix02
                    }
                } catch (err) {

                    errorInfo = {
                        isNotSupport: checkNotSupport(err?.message)
                    }
                }

        } else {

            const isContractCheck = await isContract(web3, request.owner)

            if (isContractCheck) {
                // console.log('3. signUpdateAccountWithDataStructureForContract')
                const result = (await sign_tools.signUpdateAccountWithDataStructureForContract(web3, request, chainId))
                ecdsaSignature = result.ecdsaSig
            } else {
                await sigHW()
            }

        }

        if (!errorInfo) {

            const reqParams: ReqParams = {
                url: LOOPRING_URLs.ACCOUNT_ACTION,
                bodyParams: request,
                method: ReqMethod.POST,
                sigFlag: SIG_FLAG.NO_SIG,
                ecdsaSignature,
            }
    
            const raw_data = (await this.makeReq().request(reqParams)).data
    
            return {
                ...this.returnTxHash(raw_data),
                errorInfo,
            }
    

        }

        return {
            errorInfo,
        }

    }

    public async SetReferrer(request: loopring_defs.SetReferrerRequest) {

        const reqParams: ReqParams = {
            url: LOOPRING_URLs.SET_REFERRER,
            bodyParams: request,
            method: ReqMethod.POST,
            sigFlag: SIG_FLAG.NO_SIG,
        }

        const raw_data = (await this.makeReq().request(reqParams)).data

        return {
            raw_data,
        }

    }

}