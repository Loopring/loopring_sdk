import { ChainId, ConnectorNames } from '../defs/web3_defs'
import { UserAPI, ExchangeAPI, WhitelistedUserAPI, get_EddsaSig_NFT_Withdraw, } from '../api'


import {
    GetNextStorageIdRequest, GetNFTOffchainFeeAmtRequest, GetUserApiKeyRequest,
    NFTWithdrawRequestV3, TokenVolumeNFT, TokenVolumeV3,
} from '../defs/loopring_defs'

import { 
    DEFAULT_TIMEOUT,
} from '../defs/loopring_constants'


const PrivateKeyProvider = require("truffle-privatekey-provider")

import Web3 from 'web3'
import { loopring_exported_account } from './utils';
import * as sign_tools from '../api/sign/sign_tools';
import { OffchainNFTFeeReqType } from '../defs';

let userApi: UserAPI

let whitelistedUserApi: WhitelistedUserAPI

let exchange: ExchangeAPI

// let address = '0xff7d59d9316eba168837e3ef924bcdfd64b237d8'
//
// const privateKey = "adc22517f2de0093429e5365b042da0ec9299353943db0f0cc104743c69104cf"

///-----------------

// let addressWhitlisted = '0x35405E1349658BcA12810d0f879Bf6c5d89B512C'
//
// let privateKey2 = 'ada29a473e2b777403e7d2dc3876c5be03ca6b60d97e37e9bd335b1ce05a2680'
//
// let eddkeyWhitelisted = '0x27a5b716c7309a30703ede3f1a218cdec857e424a31543f8a658e7d2208db33'

describe('Withdraw NFT test', function () {

    beforeEach(async() => {
        userApi = new UserAPI({ chainId: ChainId.GOERLI })
        exchange = new ExchangeAPI({ chainId: ChainId.GOERLI })
        whitelistedUserApi = new WhitelistedUserAPI({ chainId: ChainId.GOERLI })
    })

    it('get_EddsaSig_NFT_Withdraw', async () => {
        const {accInfo} = await exchange.getAccount({owner: loopring_exported_account.address})
        if (!accInfo) {
            return
        }
        const {exchangeInfo} = await exchange.getExchangeInfo()

        const request:NFTWithdrawRequestV3 = {
            minGas: 0,
            exchange: exchangeInfo.exchangeAddress,
            accountId:accInfo.accountId,
            to:accInfo.owner,
            owner:accInfo.owner,
            token: {
                tokenId: 32788,
                nftData: '0x05f797e055ca832ca441ff3a5de6e384af01b35ba764f9146979ff4e7f2fa832',
                amount: '1',
            },
            maxFee: {
                tokenId: 2,
                amount: '311000000000000000000'
            },
            storageId: 9,
            validUntil: 1667396982
            // memo: '',
        }

        const result =  get_EddsaSig_NFT_Withdraw(request,'')
        //0x0f48775268077434670bdba4e64c93dcbf83d8cabee98928a0791390b2a9809b
        console.log(`resultHash:`,result);// 0x0f48775268077434670bdba4e64c93dcbf83d8cabee98928a0791390b2a9809b
        // const request: GetAccountRequest = {
        //     owner: addressWhitlisted
        // }
        // const response = await exchange.getAccount(request)
        // console.log(response)
    }, DEFAULT_TIMEOUT)


    it('submitNFTWithdraw', async () => {
        const provider = new PrivateKeyProvider(
            loopring_exported_account.privateKey,
            "https://goerli.infura.io/v3/a06ed9c6b5424b61beafff27ecc3abf3"
        );
        const web3 = new Web3(provider)
        const { accInfo } = await exchange.getAccount({owner: loopring_exported_account.address})
        if (!accInfo) {
            return
        }
        const {exchangeInfo} = await exchange.getExchangeInfo()
        const eddsaKey = await sign_tools
            .generateKeyPair({
                    web3,
                    address: accInfo.owner,
                    exchangeAddress: loopring_exported_account.exchangeAddr,
                    keyNonce: accInfo.nonce - 1,
                    walletType: ConnectorNames.MetaMask,
                }
            )
        console.log('eddsakey:', eddsaKey.sk)
        const request: GetUserApiKeyRequest = {
            accountId: accInfo.accountId,
        }

        let { apiKey } = await userApi.getUserApiKey(request, eddsaKey.sk)
        apiKey = apiKey?? loopring_exported_account.apiKey;
        console.log('apiKey',apiKey)

        const request2: GetNextStorageIdRequest = {
            accountId: accInfo.accountId,
            sellTokenId: 1
        }

        const storageId = await userApi.getNextStorageId(request2, apiKey);
        console.log('storageId',storageId)
        const requestFee: GetNFTOffchainFeeAmtRequest = {
            accountId:accInfo.accountId,
            tokenAddress:loopring_exported_account.nftTokenAddress,
            requestType:OffchainNFTFeeReqType.NFT_WITHDRAWAL,
            amount:'0',
        }
        const resultFee = await userApi.getNFTOffchainFeeAmt(requestFee, apiKey)

        console.log('requestFee',resultFee)

        const request3:NFTWithdrawRequestV3 = {
            minGas: 0,
            exchange: exchangeInfo.exchangeAddress,
            accountId: accInfo.accountId,
            to:accInfo.owner,
            owner:accInfo.owner,
            token: {
                tokenId: loopring_exported_account.nftTokenID,
                nftData:loopring_exported_account.nftData,
                amount: '1',
            },
            extraData:'',
            maxFee: {
                tokenId: 1,
                amount: resultFee.fees[0]?.fee??'676000000000000000'
            },
            storageId: storageId?.offchainId??9,
            validUntil: 1667396982,
        }

        const response = await userApi.submitNFTWithdraw({
            request:request3,
            web3, chainId: ChainId.GOERLI,
            walletType: ConnectorNames.Trezor,
            eddsaKey: eddsaKey.sk, apiKey})
        console.log('response:',response)

    }, DEFAULT_TIMEOUT+2000)


})
