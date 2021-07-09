import { ChainId, ConnectorNames } from '../defs/web3_defs'
import { UserAPI, ExchangeAPI, WhitelistedUserAPI, } from '../api'

import { local_web3, } from './utils'
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
import { getTokenInfoBySymbol } from '../utils'

const PrivateKeyProvider = require("truffle-privatekey-provider")

import Web3 from 'web3'

let userApi: UserAPI

let whitelistedUserApi: WhitelistedUserAPI

let exchange: ExchangeAPI

let address = '0xff7d59d9316eba168837e3ef924bcdfd64b237d8'

const privKey = "adc22517f2de0093429e5365b042da0ec9299353943db0f0cc104743c69104cf"

///-----------------

let addressWhitlisted = '0x35405E1349658BcA12810d0f879Bf6c5d89B512C'

let privKey2 = 'ada29a473e2b777403e7d2dc3876c5be03ca6b60d97e37e9bd335b1ce05a2680'

let eddkeyWhitelisted = '0x27a5b716c7309a30703ede3f1a218cdec857e424a31543f8a658e7d2208db33'

describe('Transfer test', function () {

    beforeEach(async() => {
        userApi = new UserAPI(ChainId.GORLI)
        exchange = new ExchangeAPI(ChainId.GORLI)
        whitelistedUserApi = new WhitelistedUserAPI(ChainId.GORLI)
    })

    it('getAccountWhitelisted', async () => {
        const request: GetAccountRequest = {
            owner: addressWhitlisted
        }
        const response = await exchange.getAccount(request)
        console.log(response)
    }, DEFAULT_TIMEOUT)

    it('getUserApiKeyWhitelisted', async () => {
        try {

            // step 0. init web3
            const provider = new PrivateKeyProvider(
                privKey2,
                "https://goerli.infura.io/v3/a06ed9c6b5424b61beafff27ecc3abf3"
            );
            const web3 = new Web3(provider)

            const { accInfo } = await exchange.getAccount({owner: addressWhitlisted})

            const { exchangeInfo } = await exchange.getExchangeInfo()

            console.log('accInfo:', accInfo)

            const eddsakey = await sign_tools
                .generateKeyPair(
                    web3,
                    addressWhitlisted,
                    exchangeInfo.exchangeAddress,
                    accInfo.nonce - 1,
                    ConnectorNames.Injected,
                )

            console.log('eddsakey:', eddsakey.sk)

            const request: GetUserApiKeyRequest = {
                accountId: accInfo.accountId,
            }

            const response = await userApi.getUserApiKey(request, eddsakey.sk)
            console.log(response)
        } catch (reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)

    it('full_transfer_case', async () => {
        try {

            // step 0. init web3
            const provider = new PrivateKeyProvider(
                privKey,
                "https://goerli.infura.io/v3/a06ed9c6b5424b61beafff27ecc3abf3"
            );
            const web3 = new Web3(provider)

            // step 1. get account info
            const { accInfo } = await exchange.getAccount({owner: address})

            const { exchangeInfo } = await exchange.getExchangeInfo()

            console.log('accInfo:', accInfo)

            // step 2. generate eddsakey
            const eddsakey = await sign_tools
                .generateKeyPair(
                    web3,
                    address,
                    exchangeInfo.exchangeAddress,
                    accInfo.nonce - 1,
                    ConnectorNames.Injected,
                )

            console.log('eddsakey:', eddsakey.sk)

            // step 3 get apikey
            const request: GetUserApiKeyRequest = {
                accountId: accInfo.accountId,
            }

            const { apiKey } = await userApi.getUserApiKey(request, eddsakey.sk)

            // step 4 get storageId
            const request2: GetNextStorageIdRequest = {
                accountId: accInfo.accountId,
                sellTokenId: 1
            }
            const storageId = await userApi.getNextStorageId(request2, apiKey)

            // step 5 transfer
            const request3: OriginTransferRequestV3 = {
                exchange: exchangeInfo.exchangeAddress,
                payerAddr: address,
                payerId: accInfo.accountId,
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

            const response = await userApi.submitInternalTransfer(request3, web3, 
                ChainId.GORLI, ConnectorNames.Injected,
                eddsakey.sk, apiKey, true)
            
            console.log(response)


        } catch (reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)

    it('whitelistedAccTransfer', async () => {
        try {

            // step 1. get account info
            const { accInfo } = await exchange.getAccount({owner: addressWhitlisted})

            console.log('accInfo:', accInfo)

            const { exchangeInfo } = await exchange.getExchangeInfo()

            // step 2 get apikey
            const request: GetUserApiKeyRequest = {
                accountId: accInfo.accountId,
            }

            const { apiKey } = await userApi.getUserApiKey(request, eddkeyWhitelisted)

            // step 4 get storageId
            const request2: GetNextStorageIdRequest = {
                accountId: accInfo.accountId,
                sellTokenId: 1
            }
            const storageId = await userApi.getNextStorageId(request2, apiKey)

            // step 5 transfer
            const request3: OriginTransferRequestV3 = {
                exchange: exchangeInfo.exchangeAddress,
                payerAddr: addressWhitlisted,
                payerId: accInfo.accountId,
                payeeAddr: '0xb6AdaC3e924B4985Ad74646FEa3610f14cDFB79c',
                payeeId: 0,
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

            console.log('request3:', request3)

            const response = await whitelistedUserApi.submitInternalTransfer(request3, eddkeyWhitelisted, apiKey)
            
            console.log(response)


        } catch (reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)

})
