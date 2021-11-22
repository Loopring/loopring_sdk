import { ChainId, ConnectorNames } from '../defs/web3_defs'
import { UserAPI, ExchangeAPI, WhitelistedUserAPI, get_EddsaSig_NFT_Transfer, } from '../api'

import { dumpError400 } from '../utils/network_tools'

import {
    GetAccountRequest,
    GetNextStorageIdRequest,
    GetUserApiKeyRequest, OriginNFTTransferRequestV3,
    OriginTransferRequestV3,
} from '../defs/loopring_defs'

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
        userApi = new UserAPI({ chainId: ChainId.GOERLI })
        exchange = new ExchangeAPI({ chainId: ChainId.GOERLI })
        whitelistedUserApi = new WhitelistedUserAPI({ chainId: ChainId.GOERLI })
    })

    it('get_EddsaSig_NFT_Transfer', async () => {
        const request:OriginNFTTransferRequestV3 = {
            exchange: '0x2e76EBd1c7c0C8e7c2B875b6d505a260C525d25e',
            fromAccountId: 10503,
            fromAddress: '0x34fb65f671f832da2078d0ad4ab1efe29bc42a5b',
            toAccountId: 10758,
            toAddress: '0x56f577f9677c8212c7079fcebfa7db5052bd1b1f',
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
            validUntil: 1667396982,
            // memo: '',
        }
       const result =  get_EddsaSig_NFT_Transfer(request,'')
        //0x0f48775268077434670bdba4e64c93dcbf83d8cabee98928a0791390b2a9809b
       console.log(`resultHash:`,result);// 0x0f48775268077434670bdba4e64c93dcbf83d8cabee98928a0791390b2a9809b
        // const request: GetAccountRequest = {
        //     owner: addressWhitlisted
        // }
        // const response = await exchange.getAccount(request)
        // console.log(response)
    }, DEFAULT_TIMEOUT)


})
