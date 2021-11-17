import { ChainId, ConnectorNames } from '../defs/web3_defs'
import { UserAPI, ExchangeAPI, WhitelistedUserAPI, } from '../api'

import { dumpError400 } from '../utils/network_tools'

import {
    GetAccountRequest,
    GetNextStorageIdRequest,
    GetUserApiKeyRequest,
    NFTMintRequestV3, TokenVolumeV3,
} from '../defs/loopring_defs'

import { 
    VALID_UNTIL,
    DEFAULT_TIMEOUT,
} from '../defs/loopring_constants'

import * as sign_tools from '../api/sign/sign_tools'
import { getTokenInfoBySymbol, toBuffer, zeroPad } from '../utils'

const PrivateKeyProvider = require("truffle-privatekey-provider")

import Web3 from 'web3'
import BigInteger from 'bignumber.js';
import sha256 from 'crypto-js/sha256';
import { toHex } from '../../dist';
import BN from 'bn.js'

let userApi: UserAPI

let whitelistedUserApi: WhitelistedUserAPI

let exchange: ExchangeAPI

let address = '0xff7d59d9316eba168837e3ef924bcdfd64b237d8'

const privKey = "adc22517f2de0093429e5365b042da0ec9299353943db0f0cc104743c69104cf"

///-----------------

// let addressWhitlisted = '0x35405E1349658BcA12810d0f879Bf6c5d89B512C'
//
// let privKey2 = 'ada29a473e2b777403e7d2dc3876c5be03ca6b60d97e37e9bd335b1ce05a2680'
//
// let eddkeyWhitelisted = '0x27a5b716c7309a30703ede3f1a218cdec857e424a31543f8a658e7d2208db33'

let nftTokenAddress = '0x662168Dc15F4D516bE7741f3BBC3592Ea9A6eDB5'
let nftId = '0x000000000000000000000000000000000000000000000000000000000000007b'
describe('Mint test', function () {

    beforeEach(async() => {
        userApi = new UserAPI({ chainId: ChainId.GOERLI })
        exchange = new ExchangeAPI({ chainId: ChainId.GOERLI })
        whitelistedUserApi = new WhitelistedUserAPI({ chainId: ChainId.GOERLI })
    })


    it('Mint NFT case', async () => {
        try {

            // step 0. init web3
            const provider = new PrivateKeyProvider(
                privKey,
                "https://goerli.infura.io/v3/a06ed9c6b5424b61beafff27ecc3abf3"
            );
            const web3 = new Web3(provider)

            // step 1. get account info
            const { accInfo } = await exchange.getAccount({owner: address})

            if (!accInfo) {
                return
            }

            const { exchangeInfo } = await exchange.getExchangeInfo()

            console.log('accInfo:', accInfo)

            const eddsakey = await sign_tools
                .generateKeyPair({
                    web3,
                    address: address,
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

            const { apiKey } = await userApi.getUserApiKey(request, eddsakey.sk)

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
                minterAddress: address,
                toAccountId: accInfo.accountId,
                toAddress: address,
                nftType: 0,
                tokenAddress: nftTokenAddress,
                nftId: nftId ,  //nftId.toString(16),
                amount: '30',
                validUntil: VALID_UNTIL,
                storageId: storageId.offchainId,
                maxFee: {
                    tokenId: 1,
                    amount: '9400000000000000000',
                },
                forceToMint: false
            }

            const response = await userApi.submitNFTMint({ request: request3, web3, chainId: ChainId.GOERLI, walletType: ConnectorNames.Trezor,
                eddsaKey: eddsakey.sk, apiKey: apiKey})
            
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
