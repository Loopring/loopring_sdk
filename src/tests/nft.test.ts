import { ChainId } from '../defs/web3_defs'
import * as contract from '../api/contract_api'

import { DEFAULT_TIMEOUT, } from '../defs/loopring_constants'

import { loopring_exported_account, web3 } from './utils'

import { ExchangeAPI } from '../api/exchange_api'
import { NFTAPI, NFTType } from '../api/nft_api';

// start ganache-cli before
// ganache-cli --debug --chainId=5 --account="0xadc22517f2de0093429e5365b042da0ec9299353943db0f0cc104743c69104cf,1000e+18" --secure --unlock "0xfF7d59D9316EBA168837E3eF924BCDFd64b237D8"

//const url = 'http://127.0.0.1:8545'

//const web3 = new Web3(new Web3.providers.HttpProvider(url))

let api: ExchangeAPI
let nft: NFTAPI
const gasPrice = 30

const gasLimit = 200000

let nftTokenAddress = '0x662168Dc15F4D516bE7741f3BBC3592Ea9A6eDB5'
//test should change the id number
let nftId = '0x000000000000000000000000000000000000000000000000000000000000008c'

describe('nft test', function () {
    beforeEach(() => {
        api = new ExchangeAPI({chainId: ChainId.GOERLI})
        nft = new NFTAPI({chainId: ChainId.GOERLI})
    })

    it('approveNFT test', async () => {

        const nonce = await contract.getNonce(web3, loopring_exported_account.address)

        const response = await nft.approveNFT({
            web3,
            from:loopring_exported_account.address,
            depositAddress:loopring_exported_account.depositAddr,
            tokenAddress:nftTokenAddress,
            tokenId:nftId,
            nftType:NFTType.ERC1155,
            gasPrice,
            gasLimit,
            chainId:ChainId.GOERLI,
            nonce,
            sendByMetaMask:true
        })
        console.log(`nonce: ${nonce} approveNFT: ${response?.result}`)
    }, DEFAULT_TIMEOUT)
    it('getContractNFTMeta test', async () => {

        const nonce = await contract.getNonce(web3, loopring_exported_account.address)

        const response = await nft.getContractNFTMeta({
                web3: web3,
                tokenAddress: '0x1197d20d12bc9f80a4902c04c5a4b88371d32b0c14adce746eeea564850f47a5',
                _id: '0x000000000000000000000000000000000000000000000000000000000000007b',
                nftType: NFTType.ERC1155
            }
        )
        console.log(`nonce: ${nonce} getContractNFTMeta: ${response?.result}`)
    }, DEFAULT_TIMEOUT)
    it('getInfoForNFTTokens test', async () => {
        const response = await nft.getInfoForNFTTokens({
            nftDatas:['0x1197d20d12bc9f80a4902c04c5a4b88371d32b0c14adce746eeea564850f47a5','0x10e7f3b7ff37e4ebffabedb9fa19c66c63482b4b642d176068517c505edcd123']
        })
        console.log(`getInfoForNFTTokens: response: `, JSON.stringify(response))

    }, DEFAULT_TIMEOUT)
    it('deposit NFT ERC1155', async () => {

        const nonce = await contract.getNonce(web3, loopring_exported_account.address)
        const response = await nft.depositNFT({
            web3,
            from: loopring_exported_account.address,
            exchangeAddress: loopring_exported_account.exchangeAddr,
            nftType:NFTType.ERC1155,
            tokenAddress:nftTokenAddress,
            nftID:nftId,
            amount:1,
            gasPrice, gasLimit, chainId:ChainId.GOERLI, nonce, sendByMetaMask:true
        })

        console.log(`nonce: ${nonce} deposit NFT ERC1155: `, response)
    }, DEFAULT_TIMEOUT)

    it('check is approveNFT', async () => {
        const response = await nft.isApprovedForAll({web3,
            from:loopring_exported_account.address,
            exchangeAddress:loopring_exported_account.exchangeAddr,
            nftType: NFTType.ERC1155,
            tokenAddress:nftTokenAddress})
        console.log(`check is approveNFT`, response)
    }, DEFAULT_TIMEOUT)

})
