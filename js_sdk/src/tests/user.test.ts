import { ChainId, ConnectorNames } from '../defs/web3_defs'
import { UserAPI } from '../api/user_api'
import { ExchangeAPI } from '../api/exchange_api'

import { loopring_exported_account as acc, web3, local_web3, } from './utils'
import { dumpError400 } from '../utils/network_tools'

import {
    GetAccountRequest, GetOrdersRequest, GetUserAssetsRequest, SubmitOrderRequestV3,
    GetMinimumTokenAmtRequest,
    UpdateAccountRequestV3,
    UpdateUserApiKeyRequest,
    GetNextStorageIdRequest,
    GetUserOrderFeeRateRequest,
    GetUserFeeRateRequest,
    GetUserBalancesRequest,
    GetUserDepositHistoryRequest,
    GetUserOnchainWithdrawalHistoryRequest,
    GetUserApiKeyRequest,
    GetOrderDetailsRequest,
    GetUserTradesRequest,
    OffChainWithdrawalRequestV3,
    GetOffchainFeeAmtRequest,
    OriginTransferRequestV3,
    GetUserTransferListRequest,
} from '../defs/loopring_defs'

import { 
    OffchainFeeReqType,
    OrderType,
    TradingInterval,
    FilledType,
} from '../defs/loopring_enums'

import { 
    VALID_UNTIL,
    DEFAULT_TIMEOUT,
} from '../defs/loopring_constants'

import * as sign_tools from '../api/sign/sign_tools'
import { getTokenInfoBySymbol, toBig } from '../utils'

let api: UserAPI

let exchange: ExchangeAPI

let orderHash = process.env.ORDER_HASH ? process.env.ORDER_HASH : ''

let mainAcc = parseInt(process.env.MAINNET_ACC ? process.env.MAINNET_ACC: '')
let mainApiKey = process.env.MAINNET_APIKEY ? process.env.MAINNET_APIKEY: ''

describe('UserAPI test', function () {

    beforeEach(async() => {
        api = new UserAPI(ChainId.GORLI)
        exchange = new ExchangeAPI(ChainId.GORLI)
    })

    it('getUserApiKey', async () => {
        try {

            const { accInfo } = await exchange.getAccount({owner: acc.address})

            console.log('accInfo:', accInfo)

            const eddsakey = await sign_tools
                .generateKeyPair(
                    web3,
                    acc.address,
                    acc.exchangeAddr,
                    accInfo?.nonce as number - 1,
                    ConnectorNames.MetaMask,
                )

            console.log('eddsakey:', eddsakey.sk)

            const request: GetUserApiKeyRequest = {
                accountId: acc.accountId,
            }

            const response = await api.getUserApiKey(request, eddsakey.sk)
            console.log(response)
        } catch (reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)

    it('updateUserApiKey', async () => {
        try {

            const { accInfo } = await exchange.getAccount({owner: acc.address})

            console.log('accInfo:', accInfo)

            const eddsakey = await sign_tools
                .generateKeyPair(
                    web3,
                    acc.address,
                    acc.exchangeAddr,
                    accInfo?.nonce as number - 1,
                    ConnectorNames.MetaMask,
                )

            const request: UpdateUserApiKeyRequest = {
                accountId: acc.accountId,
            }

            const response = await api.updateUserApiKey(request, acc.apiKey, eddsakey.sk)
            console.log(response)
        } catch (reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)

    it('getUserRegTxs', async () => {
        const response = await api.getUserRegTxs({accountId: acc.accountId}, acc.apiKey)
        console.log(response)
    }, DEFAULT_TIMEOUT)

    it('getUserPwdResetTxs', async () => {
        const response = await api.getUserPwdResetTxs({accountId: acc.accountId}, acc.apiKey)
        console.log(response)
    }, DEFAULT_TIMEOUT)

    it('getUserTrades', async () => {
        const request: GetUserTradesRequest = {
            accountId: acc.accountId,
            market: 'AMM-LRC-ETH',
            fillTypes: FilledType.amm,
        }
        const response = await api.getUserTrades(request, acc.apiKey)
        console.log(response)
    }, DEFAULT_TIMEOUT)

    it('getNextStorageId', async () => {
        const request: GetNextStorageIdRequest = {
            accountId: acc.accountId,
            sellTokenId: 1
        }
        const response = await api.getNextStorageId(request, acc.apiKey)
        console.log(response)
    }, DEFAULT_TIMEOUT)

    it('getUserFeeRate', async () => {
        try {
            const request: GetUserFeeRateRequest = {
                accountId: acc.accountId,
                markets: 'AMM-LRC-ETH,AMM-LRC-USDT',
            }
            const response = await api.getUserFeeRate(request, acc.apiKey)
            console.log(response)
        } catch (reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)

    it('getUserOrderFeeRate', async () => {
        try {
            const request: GetUserOrderFeeRateRequest = {
                accountId: acc.accountId,
                market: 'LRC-ETH',
                tokenB: 0,
                amountB: '1000000000000000000',
            }
            const response = await api.getUserOrderFeeRate(request, acc.apiKey)
            console.log(response)
        } catch (reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)

    it('getMinimumTokenAmt_AMM', async () => {
        try {
            const request: GetMinimumTokenAmtRequest = {
                accountId: acc.accountId,
                market: 'AMM-ETH-USDT',
            }
            
            const response = await api.getMinimumTokenAmt(request, acc.apiKey)
            console.log(response)
            console.log(response.raw_data.amounts)

        } catch (reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)

    it('getMinimumTokenAmt', async () => {
        try {
            const request: GetMinimumTokenAmtRequest = {
                accountId: acc.accountId,
                market: 'LRC-ETH',
            }
            
            const response = await api.getMinimumTokenAmt(request, acc.apiKey)
            console.log(response)
            console.log(response.raw_data.amounts)

        } catch (reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)

    it('getOffchainFeeAmt_up', async () => {
        try {
            const request: GetOffchainFeeAmtRequest = {
                accountId: acc.accountId,
                requestType: OffchainFeeReqType.UPDATE_ACCOUNT,
            }
            const type = OffchainFeeReqType.ORDER
            const response = await api.getOffchainFeeAmt(request, acc.apiKey)
            console.log(response)
            console.log('fees:', response.raw_data.fees)

        } catch (reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)

    it('getOffchainFeeAmt_fast', async () => {
        try {
            const request: GetOffchainFeeAmtRequest = {
                accountId: acc.accountId,
                requestType: OffchainFeeReqType.FAST_OFFCHAIN_WITHDRAWAL,
                tokenSymbol: 'LRC',
                amount: '1000000000000000000',
            }
            const type = OffchainFeeReqType.ORDER
            const response = await api.getOffchainFeeAmt(request, acc.apiKey)
            console.log(response)
            console.log('fees:', response.raw_data.fees)

        } catch (reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)

    it('getOffchainFeeAmt_with_amt', async () => {
        try {
            api = new UserAPI(ChainId.MAINNET)
            const request: GetOffchainFeeAmtRequest = {
                accountId: mainAcc,
                amount: toBig('1e+19').toString(),
                requestType: OffchainFeeReqType.OFFCHAIN_WITHDRAWAL,
                tokenSymbol: 'LRC',
            }
            const type = OffchainFeeReqType.ORDER
            const response = await api.getOffchainFeeAmt(request, mainApiKey)
            
            console.log('-----------------\nMAINNET:', request)
            console.log('fees:', response.fees)

        } catch (reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)

    it('getOffchainFeeAmt_with_amt3', async () => {
        try {
            api = new UserAPI(ChainId.MAINNET)
            const request: GetOffchainFeeAmtRequest = {
                accountId: mainAcc,
                amount: toBig('1').toString(),
                requestType: OffchainFeeReqType.OFFCHAIN_WITHDRAWAL,
                tokenSymbol: 'LRC',
            }
            const type = OffchainFeeReqType.ORDER
            const response = await api.getOffchainFeeAmt(request, mainApiKey)

            console.log('-----------------\nMAINNET:', request)
            console.log('fees:', response.fees)

        } catch (reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)

    it('getOffchainFeeAmt_with_amt2', async () => {
        try {
            const request: GetOffchainFeeAmtRequest = {
                accountId: acc.accountId,
                amount: toBig('1e+19').toString(),
                requestType: OffchainFeeReqType.OFFCHAIN_WITHDRAWAL,
                tokenSymbol: 'LRC',
            }
            const type = OffchainFeeReqType.ORDER
            const response = await api.getOffchainFeeAmt(request, acc.apiKey)

            console.log('-----------------\nGORLI:', request)
            console.log('fees:', response.fees)

        } catch (reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)

    it('getOffchainFeeAmt_std', async () => {
        try {
            const request: GetOffchainFeeAmtRequest = {
                accountId: acc.accountId,
                requestType: OffchainFeeReqType.OFFCHAIN_WITHDRAWAL,
                tokenSymbol: 'LRC',
            }
            const type = OffchainFeeReqType.ORDER
            const response = await api.getOffchainFeeAmt(request, acc.apiKey)
            console.log(response)
            console.log('fees:', response.raw_data.fees)

        } catch (reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)

    it('getOffchainFeeAmt2', async () => {
        try {
            const request: GetOffchainFeeAmtRequest = {
                accountId: acc.accountId,
                tokenSymbol: 'ETH',
                requestType: OffchainFeeReqType.TRANSFER,
            }
            const response = await api.getOffchainFeeAmt(request, acc.apiKey)
            console.log(response)
        } catch (reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)

    it('getOrders', async () => {
        try {
            const request: GetOrdersRequest = {
                accountId: acc.accountId,
            }
            const response = await api.getOrders(request, acc.apiKey)
            console.log(response)
        } catch (reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)

    it('getOrderDetails', async () => {
        try {
            console.log('orderHash:', orderHash)
            const request: GetOrderDetailsRequest = {
                accountId: acc.accountId,
                orderHash,
            }
            const response = await api.getOrderDetails(request, acc.apiKey)
            console.log(response)
        } catch (reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)

    it('getUserBalances0', async () => {
        try {
            const request: GetUserBalancesRequest = {
                accountId: acc.accountId,
                tokens: '',
            }

            const response = await api.getUserBalances(request, acc.apiKey)
            console.log(response)
        } catch (reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)

    it('getUserBalances1', async () => {
        try {
            const request: GetUserBalancesRequest = {
                accountId: acc.accountId,
                tokens: '0',
            }

            const response = await api.getUserBalances(request, acc.apiKey)
            console.log(response)
        } catch (reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)

    it('getUserBalances2', async () => {
        try {
            const request: GetUserBalancesRequest = {
                accountId: acc.accountId,
                tokens: '0,1',
            }

            const response = await api.getUserBalances(request, acc.apiKey)
            console.log(response)
        } catch (reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)

    it('getUserDepositHistory', async () => {
        try {
            const request: GetUserDepositHistoryRequest = {
                accountId: acc.accountId,
            }

            const response = await api.getUserDepositHistory(request, acc.apiKey)
            console.log(response)
        } catch (reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)

    it('getUserOnchainWithdrawalHistory', async () => {
        try {
            const request: GetUserOnchainWithdrawalHistoryRequest = {
                accountId: acc.accountId,
            }

            const response = await api.getUserOnchainWithdrawalHistory(request, acc.apiKey)
            console.log(response.userOnchainWithdrawalHistory)
        } catch (reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)

    it('getUserTranferList', async () => {
        try {
            const request: GetUserTransferListRequest = {
                accountId: acc.accountId,
            }

            const response = await api.getUserTranferList(request, acc.apiKey)
            console.log(response)
        } catch (reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)

    it('submitOffchainWithdraw', async () => {
        const request: GetNextStorageIdRequest = {
            accountId: acc.accountId,
            sellTokenId: 1
        }
        const storageId = await api.getNextStorageId(request, acc.apiKey)

        const { accInfo } = await exchange.getAccount({
            owner: acc.address
        })

        if (!accInfo) {
            return
        }

        const { nonce } = accInfo

        const extraData = Buffer.from('').toString()
        console.log(`nonce:${nonce} storageId:${JSON.stringify(storageId)} extraData: ${extraData}`)

        try {
            const request: OffChainWithdrawalRequestV3 = {
                exchange: acc.exchangeAddr,
                owner: acc.address,
                to: acc.address,
                accountId: acc.accountId,
                storageId: storageId.offchainId,
                token: {
                    tokenId: 1,
                    volume: '100000000000000000000',
                },
                maxFee: {
                    tokenId: 1,
                    volume: '11000000000000000000',
                },
                extraData: '',
                minGas: 0,
                validUntil: VALID_UNTIL,
            }

            const response = await api.submitOffchainWithdraw(request, web3, ChainId.GORLI, ConnectorNames.Trezor,
                acc.eddsaKey, acc.apiKey)

            console.log(response)

        } catch (reason) {

            dumpError400(reason)

        }
    }, DEFAULT_TIMEOUT)

    it('submitInternalTransfer', async () => {
        const request: GetNextStorageIdRequest = {
            accountId: acc.accountId,
            sellTokenId: 1
        }
        const storageId = await api.getNextStorageId(request, acc.apiKey)

        const { accInfo } = await exchange.getAccount({
            owner: acc.address
        })

        if (!accInfo) {
            return
        }

        const { nonce } = accInfo
        console.log(`nonce:${nonce}`)
        console.log(`storageId:${storageId}`)

        // api.getUserOrderFeeRate

        try {
            const request: OriginTransferRequestV3 = {
                exchange: acc.exchangeAddr,
                payerAddr: acc.address,
                payerId: acc.accountId,
                payeeAddr: '0xb6AdaC3e924B4985Ad74646FEa3610f14cDFB79c',
                payeeId: 10392,
                storageId: storageId.offchainId,
                token: {
                    tokenId: 1,
                    volume: '100000000000000000000',
                },
                maxFee: {
                    tokenId: 1,
                    volume: '9400000000000000000',
                },
                validUntil: VALID_UNTIL,
            }

            const response = await api.submitInternalTransfer(request, web3, 
                ChainId.GORLI, ConnectorNames.MetaMask,
                acc.eddsaKey, acc.apiKey)

            console.log(response)

        } catch (reason) {
            dumpError400(reason)
        }

    }, DEFAULT_TIMEOUT)

    it('updateAccount', async () => {
        api = new UserAPI(ChainId.GORLI)
        try {
            const req: GetAccountRequest = {
                owner: acc.address
            }
            const { accInfo } = await exchange.getAccount(req)

            if (!accInfo) {
                return
            }

            console.log('accInfo:', accInfo)

            const request: UpdateAccountRequestV3 = {
                exchange: acc.exchangeAddr,
                owner: accInfo.owner,
                accountId: accInfo.accountId,
                publicKey: accInfo.publicKey,
                maxFee: { tokenId: '0', volume: '10000000000' },
                validUntil: VALID_UNTIL,
                nonce: accInfo.nonce,
            }
            const response = await api.updateAccount(request, web3, ChainId.GORLI, ConnectorNames.MetaMask)
            console.log(response)
        } catch (reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)

    it('submitOrder', async () => {
        const request: GetNextStorageIdRequest = {
            accountId: acc.accountId,
            sellTokenId: 1
        }
        const storageId = await api.getNextStorageId(request, acc.apiKey)

        const { accInfo } = await exchange.getAccount({
            owner: acc.address
        })

        if (!accInfo) {
            return
        }

        const { tokenSymbolMap } = await exchange.getTokens()

        const baseToken = getTokenInfoBySymbol(tokenSymbolMap, 'LRC')

        const quoteToken = getTokenInfoBySymbol(tokenSymbolMap, 'ETH')

        if (!baseToken || !quoteToken) {
            return
        }

        console.log(`storageId:${JSON.stringify(storageId)}`)

        try {

            const request: SubmitOrderRequestV3 = {
                exchange: acc.exchangeAddr,
                accountId: accInfo.accountId,
                storageId: storageId.orderId,
                sellToken: {
                    tokenId: baseToken.tokenId,
                    volume: '100000000000000000000'
                },
                buyToken: {
                    tokenId: quoteToken.tokenId,
                    volume: '63074132800000000'
                },
                allOrNone: false,
                validUntil: VALID_UNTIL,
                maxFeeBips: 60,
                fillAmountBOrS: false, // amm only false
                orderType: OrderType.ClassAmm,
                eddsaSignature: '',
            }

            const response = await api.submitOrder(request, acc.eddsaKey, acc.apiKey)

            console.log(response)

        } catch (reason) {
            dumpError400(reason)
        }

    }, DEFAULT_TIMEOUT)

})
