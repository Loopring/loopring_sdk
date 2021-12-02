import { ChainId, ConnectorNames } from '../defs/web3_defs'
import { ExchangeAPI, UserAPI, WhitelistedUserAPI, } from '../api'

import { dumpError400 } from '../utils/network_tools'

import { GetNextStorageIdRequest, GetUserApiKeyRequest, NFTMintRequestV3, } from '../defs/loopring_defs'

import { DEFAULT_TIMEOUT, VALID_UNTIL, } from '../defs/loopring_constants'

import * as sign_tools from '../api/sign/sign_tools'
import Web3 from 'web3'
import { loopring_exported_account } from './utils';
// import { getTokenInfoBySymbol, toBuffer, zeroPad } from '../utils'

const PrivateKeyProvider = require("truffle-privatekey-provider")

let userApi: UserAPI

let whitelistedUserApi: WhitelistedUserAPI

let exchange: ExchangeAPI

// let address = '0xff7d59d9316eba168837e3ef924bcdfd64b237d8'

// const privateKey = "adc22517f2de0093429e5365b042da0ec9299353943db0f0cc104743c69104cf"

///-----------------

// let addressWhitlisted = '0x35405E1349658BcA12810d0f879Bf6c5d89B512C'
//
// let privateKey2 = 'ada29a473e2b777403e7d2dc3876c5be03ca6b60d97e37e9bd335b1ce05a2680'
//
// let eddkeyWhitelisted = '0x27a5b716c7309a30703ede3f1a218cdec857e424a31543f8a658e7d2208db33'

// let nftTokenAddress = '0x662168Dc15F4D516bE7741f3BBC3592Ea9A6eDB5'
//test should change the id number
let nftId = '0x0000000000000000000000000000000000000000000000000000000000000094'
describe('Mint test', function () {

    beforeEach(async () => {
        userApi = new UserAPI({chainId: ChainId.GOERLI})
        exchange = new ExchangeAPI({chainId: ChainId.GOERLI})
        whitelistedUserApi = new WhitelistedUserAPI({chainId: ChainId.GOERLI})
    })


    it('submitNFTMint', async () => {
        try {

            // step 0. init web3
            const provider = new PrivateKeyProvider(
                loopring_exported_account.privateKey,
                "https://goerli.infura.io/v3/a06ed9c6b5424b61beafff27ecc3abf3"
            );
            const web3 = new Web3(provider)

            // step 1. get account info
            const {accInfo} = await exchange.getAccount({owner: loopring_exported_account.address})

            if (!accInfo) {
                return
            }

            const {exchangeInfo} = await exchange.getExchangeInfo()

            console.log('accInfo:', accInfo)

            const eddsakey = await sign_tools
                .generateKeyPair({
                        web3,
                        address: accInfo.owner,
                        exchangeAddress: exchangeInfo.exchangeAddress,
                        keyNonce: accInfo.nonce - 1,
                        walletType: ConnectorNames.MetaMask,
                    }
                )

            console.log('eddsakey:', eddsakey.sk)

            // step 3 get apikey
            const request: GetUserApiKeyRequest = {
                accountId: accInfo.accountId,
            }

            let {apiKey} = await userApi.getUserApiKey(request, eddsakey.sk)
            apiKey = apiKey?? loopring_exported_account.apiKey;

            console.log(apiKey)
            // step 4 get storageId
            const request2: GetNextStorageIdRequest = {
                accountId: accInfo.accountId,
                sellTokenId: 1
            }
            const storageId = await userApi.getNextStorageId(request2, apiKey)
            // let hash: any = new BN(nftId,'hex')
            // hash = toHex(hash);//new BigInteger(sha256(nftId.toString()).toString(), 16)

            const request3: NFTMintRequestV3 = {
                exchange: exchangeInfo.exchangeAddress,
                minterId: accInfo.accountId,
                minterAddress: accInfo.owner,
                toAccountId: accInfo.accountId,
                toAddress: accInfo.owner,
                nftType: 0,
                tokenAddress: loopring_exported_account.nftTokenAddress,
                nftId: nftId,  //nftId.toString(16),
                amount: '500',
                validUntil: VALID_UNTIL,
                storageId: storageId.offchainId??9,
                maxFee: {
                    tokenId: 1,
                    amount: '9400000000000000000',
                },
                forceToMint: false
            }

            const response = await userApi.submitNFTMint({
                request: request3, web3, chainId: ChainId.GOERLI, walletType: ConnectorNames.Unknown,
                eddsaKey: eddsakey.sk, apiKey: apiKey
            })

            console.log(response)


        } catch (reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)

    // it('whitelistedAccMint', async () => {
    //     try {
    //
    //         // step 1. get account info
    //         const { accInfo } = await exchange.getAccount({owner: addressWhitlisted})
    //
    //         if (!accInfo) {
    //             return
    //         }
    //
    //         console.log('accInfo:', accInfo)
    //
    //         const { exchangeInfo } = await exchange.getExchangeInfo()
    //
    //         // step 2 get apikey
    //         const request: GetUserApiKeyRequest = {
    //             accountId: accInfo.accountId,
    //         }
    //
    //         const { apiKey } = await userApi.getUserApiKey(request, eddkeyWhitelisted)
    //
    //         console.log('apiKey:', apiKey)
    //
    //         // step 3 get storageId
    //         const request2: GetNextStorageIdRequest = {
    //             accountId: accInfo.accountId,
    //             sellTokenId: 1
    //         }
    //         const storageId = await userApi.getNextStorageId(request2, apiKey)
    //
    //         // step 4 Mint
    //         const request3: NFTMintRequestV3 = {
    //             exchange: exchangeInfo.exchangeAddress,
    //             minterId: accInfo.accountId,
    //             minterAddress: address,
    //             toAccountId: accInfo.accountId,
    //             toAddress: address,
    //             nftType: 0,
    //             tokenAddress: nftTokenAddress,
    //             nftId:  nftId.toString(),
    //             amount: '30',
    //             validUntil: VALID_UNTIL,
    //             storageId: storageId.offchainId,
    //             maxFee: {
    //                 tokenId: 1,
    //                 amount: '9400000000000000000',
    //             },
    //             forceToMint: false
    //         }
    //
    //
    //         console.log('request3:', request3)
    //
    //         const response = await userApi.(request3, eddkeyWhitelisted, apiKey)
    //
    //         console.log(response)
    //
    //
    //     } catch (reason) {
    //         dumpError400(reason)
    //     }
    // }, DEFAULT_TIMEOUT)

})
