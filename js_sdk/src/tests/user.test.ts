import { ChainId, ConnectorNames } from '../defs/web3_defs'
import { UserAPI } from '../api/user_api'
import { ExchangeAPI } from '../api/exchange_api'

import { loopring_exported_account as acc, web3, } from './utils'
import { dumpError400 } from '../utils/network_tools'

import {
    GetAccountRequest, GetOrdersRequest, SubmitOrderRequestV3,
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
    GetUserTxsRequest,
    SetReferrerRequest,
} from '../defs/loopring_defs'

import { 
    OffchainFeeReqType,
    OrderType,
    TradingInterval,
    FilledType,
} from '../defs/loopring_enums'

import Web3 from 'web3'
const PrivateKeyProvider = require("truffle-privatekey-provider")

import { 
    VALID_UNTIL,
    DEFAULT_TIMEOUT,
} from '../defs/loopring_constants'

import * as sign_tools from '../api/sign/sign_tools'
import { getTokenInfoBySymbol, toBig } from '../utils'

import { generateKeyPair }  from '../api/sign/sign_tools'

let api: UserAPI

let exchange: ExchangeAPI

let orderHash = process.env.ORDER_HASH ? process.env.ORDER_HASH : ''

let mainAcc = parseInt(process.env.MAINNET_ACC ? process.env.MAINNET_ACC: '')
let mainApiKey = process.env.MAINNET_APIKEY ? process.env.MAINNET_APIKEY: ''

describe('UserAPI test', function () {

    beforeEach(async() => {
        api = new UserAPI({ chainId: ChainId.GOERLI })
        exchange = new ExchangeAPI({ chainId: ChainId.GOERLI })
    })

    it('getUserApiKey', async () => {
        try {

            const { accInfo } = await exchange.getAccount({owner: acc.address})

            console.log('accInfo:', accInfo)

            const eddsakey = await sign_tools
                .generateKeyPair({
                    web3,
                    address: acc.address,
                    exchangeAddress: acc.exchangeAddr,
                    keyNonce: accInfo?.nonce as number - 1,
                    walletType: ConnectorNames.MetaMask,
                }
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
                .generateKeyPair({
                    web3,
                    address: acc.address,
                    exchangeAddress: acc.exchangeAddr,
                    keyNonce: accInfo?.nonce as number - 1,
                    walletType: ConnectorNames.MetaMask,
                }
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

    it('getUserTxs', async () => {
        const request: GetUserTxsRequest = {
            accountId: acc.accountId,
            tokenSymbol: 'ETH',
        }
        const response = await api.getUserTxs(request, acc.apiKey)
        console.log(response)
    }, DEFAULT_TIMEOUT)

    it('getUserTrades_both', async () => {
        const request: GetUserTradesRequest = {
            accountId: acc.accountId,
            market: 'AMM-ETH-USDT,ETH-USDT',
        }
        const response = await api.getUserTrades(request, acc.apiKey)
        console.log(response)
    }, DEFAULT_TIMEOUT)

    it('getUserTrade_t3', async () => {
        const request: GetUserTradesRequest = {
            accountId: acc.accountId,
            market: 'AMM-ETH-USDT',
        }
        console.log('AMM-ETH-USDT getUserTrade_t3')
        const response = await api.getUserTrades(request, acc.apiKey)
        console.log(response)
    }, DEFAULT_TIMEOUT)

    it('getUserTrade_t2', async () => {
        const request: GetUserTradesRequest = {
            accountId: acc.accountId,
            market: 'AMM-ETH-USDT',
            fillTypes: 'dex,amm',
        }
        console.log('AMM-ETH-USDT getUserTrade_t2')
        const response = await api.getUserTrades(request, acc.apiKey)
        console.log(response)
    }, DEFAULT_TIMEOUT)

    it('getUserTrade_t', async () => {
        const request: GetUserTradesRequest = {
            accountId: acc.accountId,
            market: 'ETH-USDT',
            fillTypes: 'dex,amm',
        }
        console.log('ETH-USDT getUserTrade_t2')
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

    it('getOffchainFeeAmt_fast1', async () => {
        try {
            const request: GetOffchainFeeAmtRequest = {
                accountId: acc.accountId,
                requestType: OffchainFeeReqType.FAST_OFFCHAIN_WITHDRAWAL,
                tokenSymbol: 'USDT',
                amount: '1e+10',
            }
            
            const response = await api.getOffchainFeeAmt(request, acc.apiKey)
            console.log(response)
            console.log('fees:', response.raw_data.fees)

        } catch (reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)

    it('getOffchainFeeAmt_fast2', async () => {
        try {
            const request: GetOffchainFeeAmtRequest = {
                accountId: acc.accountId,
                requestType: OffchainFeeReqType.FAST_OFFCHAIN_WITHDRAWAL,
                tokenSymbol: 'USDT',
                amount: '1e+6',
            }
            
            const response = await api.getOffchainFeeAmt(request, acc.apiKey)
            console.log(response)
            console.log('fees:', response.raw_data.fees)

        } catch (reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)

    it('getOffchainFeeAmt_fast3', async () => {
        try {
            const request: GetOffchainFeeAmtRequest = {
                accountId: acc.accountId,
                requestType: OffchainFeeReqType.FAST_OFFCHAIN_WITHDRAWAL,
                tokenSymbol: 'ETH',
                amount: '1e+19',
            }
            
            const response = await api.getOffchainFeeAmt(request, acc.apiKey)
            console.log(response)
            console.log('fees:', response.raw_data.fees)

        } catch (reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)

    it('getOffchainFeeAmt_with_amt', async () => {
        try {
            api = new UserAPI({ chainId: ChainId.MAINNET })
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
            api = new UserAPI({ chainId: ChainId.MAINNET })
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

            const response = await api.submitOffchainWithdraw({ request, web3, chainId: ChainId.GOERLI, walletType: ConnectorNames.Trezor,
                eddsaKey: acc.eddsaKey, apiKey: acc.apiKey})

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

            const response = await api.submitInternalTransfer({ request, web3, chainId: ChainId.GOERLI, walletType: ConnectorNames.MetaMask,
                eddsaKey: acc.eddsaKey, apiKey: acc.apiKey})

            console.log(response)

        } catch (reason) {
            dumpError400(reason)
        }

    }, DEFAULT_TIMEOUT)

    it('updateAccount', async () => {
        api = new UserAPI({ chainId: ChainId.GOERLI })
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
            const response = await api.updateAccount({ request, web3, chainId: ChainId.GOERLI, walletType: ConnectorNames.Trezor, })
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

    it('SetReferrer2', async () => {
        api = new UserAPI({ chainId: ChainId.GOERLI })
        let owner = '0xE633d724Fe7F0dADC58bE6744B887CA1f074b2C2'
        try {
            const req: GetAccountRequest = {
                owner,
            }
            const { accInfo } = await exchange.getAccount(req)

            if (!accInfo) {
                return
            }

            const provider = new PrivateKeyProvider(
              '0b54129eab0c138b059cc4a87332844d431725fc3d3c5cc53bf28a0dd76cc6a1',
              "https://goerli.infura.io/v3/a06ed9c6b5424b61beafff27ecc3abf3"
            );
            const web3 = new Web3(provider)

            const eddsakey = await sign_tools
                .generateKeyPair({
                    web3,
                    address: acc.address,
                    exchangeAddress: acc.exchangeAddr,
                    keyNonce: accInfo?.nonce as number,
                    walletType: ConnectorNames.MetaMask,
                }
                )

            console.log('accInfo:', accInfo)

            const request: SetReferrerRequest = {
                address: owner,
                referrer: 10428,
                promotionCode: 'loopring_ch',
                publicKeyX: eddsakey.formatedPx,
                publicKeyY: eddsakey.formatedPy,
            }

            const response = await api.SetReferrer(request, eddsakey.sk)
            console.log(response)
        } catch (reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)

    it('SetReferrer6', async () => {
        api = new UserAPI({ chainId: ChainId.GOERLI })
        let owner = '0xE633d724Fe7F0dADC58bE6744B887CA1f074b2C2'
        try {
            const req: GetAccountRequest = {
                owner,
            }
            const { accInfo } = await exchange.getAccount(req)

            if (!accInfo) {
                return
            }

            const provider = new PrivateKeyProvider(
              '0b54129eab0c138b059cc4a87332844d431725fc3d3c5cc53bf28a0dd76cc6a1',
              "https://goerli.infura.io/v3/a06ed9c6b5424b61beafff27ecc3abf3"
            );
            const web3 = new Web3(provider)

            const eddsaKey = await sign_tools
                .generateKeyPair({
                    web3,
                    address: acc.address,
                    exchangeAddress: acc.exchangeAddr,
                    keyNonce: accInfo?.nonce as number,
                    walletType: ConnectorNames.MetaMask,
                }
                )

            console.log('accInfo:', accInfo)

            const request: SetReferrerRequest = {
                address: owner,
                referrer: 10083,
                promotionCode: 'loopring_ch',
                publicKeyX: eddsaKey.formatedPx,
                publicKeyY: eddsaKey.formatedPy,
            }

            const response = await api.SetReferrer(request, eddsaKey.sk)
            console.log(response)
        } catch (reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)
    
    it('SetReferrer3', async () => {
        api = new UserAPI({ chainId: ChainId.GOERLI })
        let owner = '0xeEbDa810d3a2C3bBd89433390911450676DA4af1'
        try {
            const req: GetAccountRequest = {
                owner,
            }

            const provider = new PrivateKeyProvider(
              '7d894ce1007864fedce26b9a7b59c492a669c7f7922c7b404524418d333fe616',
              "https://goerli.infura.io/v3/a06ed9c6b5424b61beafff27ecc3abf3"
            );
            const web3 = new Web3(provider)


            const eddsaKey = await sign_tools
                .generateKeyPair({
                    web3,
                    address: acc.address,
                    exchangeAddress: acc.exchangeAddr,
                    keyNonce: 0,
                    walletType: ConnectorNames.MetaMask,
                }
                )
            const request: SetReferrerRequest = {
                address: owner,
                referrer: 10083,
                promotionCode: 'loopring_ch',
                publicKeyX: eddsaKey.formatedPx,
                publicKeyY: eddsaKey.formatedPy,
            }

            const response = await api.SetReferrer(request, eddsaKey.sk)
            console.log(response)
        } catch (reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)

    it('SetReferrer4', async () => {
        api = new UserAPI({ chainId: ChainId.GOERLI })
        let owner = '0x7AF03bd02c090396AcA1AFa068a4D565B5E34366'
        try {
            const req: GetAccountRequest = {
                owner,
            }

            const provider = new PrivateKeyProvider(
              '781251de9928c822ad41bd323c7bcff066a1c6c26dfd5635be372ce677b929cf',
              "https://goerli.infura.io/v3/a06ed9c6b5424b61beafff27ecc3abf3"
            );
            const web3 = new Web3(provider)


            const eddsaKey = await sign_tools
                .generateKeyPair({
                    web3,
                    address: acc.address,
                    exchangeAddress: acc.exchangeAddr,
                    keyNonce: 0,
                    walletType: ConnectorNames.MetaMask,
                }
                )
            const request: SetReferrerRequest = {
                address: owner,
                promotionCode: 'loopring_ch',
                publicKeyX: eddsaKey.formatedPx,
                publicKeyY: eddsaKey.formatedPy,
            }

            const response = await api.SetReferrer(request, eddsaKey.sk)
            console.log(response)
        } catch (reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)

    it('SetReferrer5', async () => {
        api = new UserAPI({ chainId: ChainId.GOERLI })
        let owner = '0x7AF03bd02c090396AcA1AFa068a4D565B5E34366'
        try {
            const req: GetAccountRequest = {
                owner,
            }

            const provider = new PrivateKeyProvider(
              '781251de9928c822ad41bd323c7bcff066a1c6c26dfd5635be372ce677b929cf',
              "https://goerli.infura.io/v3/a06ed9c6b5424b61beafff27ecc3abf3"
            );
            const web3 = new Web3(provider)


            const eddsaKey = await sign_tools
                .generateKeyPair({
                    web3,
                    address: acc.address,
                    exchangeAddress: acc.exchangeAddr,
                    keyNonce: 0,
                    walletType: ConnectorNames.MetaMask,
                }
                )
            const request: SetReferrerRequest = {
                address: owner,
                promotionCode: 'loopring_ch',
                publicKeyX: eddsaKey.formatedPx,
                publicKeyY: eddsaKey.formatedPy,
            }

            const response = await api.SetReferrer(request, eddsaKey.sk)
            console.log(response)
        } catch (reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)

})
