import { ChainId, ConnectorNames } from '../defs/web3_defs'
import { UserAPI } from '../api/user_api'
import { ExchangeAPI } from '../api/exchange_api'

import { DEFAULT_TIMEOUT, GetAccountRequest, GetOrdersRequest } from '../defs/loopring_defs'

import { loopring_exported_account as acc, web3, local_web3, } from './utils'
import { dumpError400 } from '../utils/network_tools'

import {
    UpdateAccountRequestV3,
    UpdateUserApiKeyRequest,
    GetNextStorageIdRequest,
    GetUserOrderFeeRateRequest,
    GetUserFeeRateRequest,
    GetUserBalancesRequest,
    GetUserApiKeyRequest,
    GetOrderDetailsRequest,
    GetUserTradesRequest,
    OffchainFeeReqType,
    OffChainWithdrawalRequestV3,
    VALID_UNTIL,
    GetOffchainFeeAmtRequest,
    OriginTransferRequestV3,
    FilledType,
    GetUserTransferListRequest,
} from '../defs/loopring_defs'

import * as sign_tools from '../api/sign/sign_tools'

let api: UserAPI

let exchange: ExchangeAPI

let orderHash = process.env.ORDER_HASH ? process.env.ORDER_HASH : ''

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
                    accInfo.nonce - 1,
                    ConnectorNames.Injected,
                )

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
                    accInfo.nonce - 1,
                    ConnectorNames.Injected,
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

    it('getUserTranferList', async () => {
        const request: GetUserTransferListRequest = {
            accountId: acc.accountId,
        }
        const response = await api.getUserTranferList(request, acc.apiKey)
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

    it('getOffchainFeeAmt1', async () => {
        try {
            const request: GetOffchainFeeAmtRequest = {
                accountId: acc.accountId,
                requestType: OffchainFeeReqType.OFFCHAIN_WITHDRAWAL,
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

    it('getOffchainFeeAmt2', async () => {
        try {
            const request: GetOffchainFeeAmtRequest = {
                accountId: acc.accountId,
                tokenSymbol: 'ETH',
                requestType: OffchainFeeReqType.OFFCHAIN_WITHDRAWAL,
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

    it('getUserBalances', async () => {
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

    it('submitOffchainWithdraw', async () => {
        const request: GetNextStorageIdRequest = {
            accountId: acc.accountId,
            sellTokenId: 1
        }
        const storageId = await api.getNextStorageId(request, acc.apiKey)

        const { accInfo } = await exchange.getAccount({
            owner: acc.address
        })

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
                    tokenId: '1',
                    volume: '100000000000000000000',
                },
                maxFee: {
                    tokenId: '1',
                    volume: '9400000000000000000',
                },
                extraData: '',
                minGas: 0,
                validUntil: VALID_UNTIL,
            }

            // const eddsa = sign_tools.get_EddsaSig_OffChainWithdraw(request, acc.eddsaKey)

            // console.log('request:', JSON.stringify(request))
            // console.log('eddsa:', eddsa)

            const response = await api.submitOffchainWithdraw(request, web3, ChainId.GORLI, ConnectorNames.Injected,
                acc.eddsaKey, acc.apiKey, false)

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
                    tokenId: '1',
                    volume: '100000000000000000000',
                },
                maxFee: {
                    tokenId: '1',
                    volume: '9400000000000000000',
                },
                validUntil: VALID_UNTIL,
            }

            const response = await api.submitInternalTransfer(request, web3, 
                ChainId.GORLI, ConnectorNames.Injected,
                acc.eddsaKey, acc.apiKey, true)

            console.log(response)

        } catch (reason) {
            dumpError400(reason)
        }

    }, DEFAULT_TIMEOUT)

    it('updateAccount', async () => {
        try {
            const req: GetAccountRequest = {
                owner: acc.address
            }
            const { accInfo } = await exchange.getAccount(req)

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
            const response = await api.updateAccount(request, local_web3(), ChainId.GORLI, ConnectorNames.Injected, true)
            console.log(response)
        } catch (reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)

})
