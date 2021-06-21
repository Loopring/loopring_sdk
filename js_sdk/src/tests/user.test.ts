import { ChainId, ConnectorNames } from '../defs/web3_defs'
import { UserAPI } from '../api/user_api'
import { ExchangeAPI } from '../api/exchange_api'

import { DEFAULT_TIMEOUT } from '..'

import { loopring_exported_account as acc, web3, } from 'tests/utils'
import { dumpError400 } from '../utils/network_tools'

import { 
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
    GetUserTransferListRequest, } from '../defs/loopring_defs'

let api: UserAPI

let exchange: ExchangeAPI

let orderHash = process.env.ORDER_HASH ? process.env.ORDER_HASH : ''

describe('UserAPI test', function () {

    beforeEach(() => {
        api = new UserAPI(ChainId.GORLI)
        exchange = new ExchangeAPI(ChainId.GORLI)
    })

    it('getUserApiKey', async () => {
        const request: GetUserApiKeyRequest = {
            accountId: acc.accountId, 
        }
        const response = await api.getUserApiKey(request, acc.eddsaKey)
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
                markets: 'AMM-LRC-ETH',
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

    it('getOffchainFeeAmt', async () => {
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
        
        const accInfo = await exchange.getAccount({
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

        } catch(reason) {

            dumpError400(reason)

        }
    }, DEFAULT_TIMEOUT)

    it('submitInternalTransfer', async () => {
        const request: GetNextStorageIdRequest = {
            accountId: acc.accountId, 
            sellTokenId: 1
        }
        const storageId = await api.getNextStorageId(request, acc.apiKey)
        
        const accInfo = await exchange.getAccount({
            owner: acc.address
        })

        const { nonce } = accInfo
        console.log(`nonce:${nonce}`)
        console.log(`storageId:${storageId}`)

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

            const response = await api.submitInternalTransfer(request, web3, ChainId.GORLI, ConnectorNames.Injected, 
                acc.eddsaKey, acc.apiKey, true)
    
            console.log(response)

        } catch(reason) {

            dumpError400(reason)

        }
    }, DEFAULT_TIMEOUT)

})
