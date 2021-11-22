import { BaseAPI } from './base_api'
import { LOOPRING_URLs, } from '../defs/url_defs'
import { ChainId, NftData, NFTTokenInfo, ReqMethod, ReqParams, SIG_FLAG } from '../defs';
import { myLog } from '../utils/log_tools';
import Web3 from 'web3';
import { genExchangeData, sendRawTx } from './contract_api';
import contracts from './ethereum/contracts';

export enum NFTType {
    ERC1155 = 0,
    ERC721
}

export enum NFTMethod {
    setApprovalForAll = 'setApprovalForAll',
    isApprovedForAll = 'isApprovedForAll',
    uri = 'uri',
    depositNFT = 'depositNFT'
    // Deposit = 'deposit',
    // ForceWithdraw = 'forceWithdraw'
}


export class NFTAPI extends BaseAPI {
    private async callContractMethod(web3: any, method: string, data: any[], contractAddress: string, type: NFTType = NFTType.ERC1155) {
        // return _genContractData(Contracts.ERC20Token, method, data)
        const contract = this._genContract(web3, contractAddress, type)
        return contract.methods[ method ](...data).call();
    }

    private _genContractData(Contract: any, method: string, data: any) {
        return Contract.encodeInputs(method, data)
    }

    private _genERC1155Data(method: string, data: any) {
        return this._genContractData(contracts.Contracts.ERC1155, method, data)
    }

    private _genERC721Data(method: string, data: any) {
        return this._genContractData(contracts.Contracts.ERC721, method, data)
    }

    private _genContract(web3: any, contractAddress: string, type: NFTType = NFTType.ERC1155) {
        return new web3.eth.Contract(
            type === NFTType.ERC1155 ? contracts.Contracts.erc1155Abi : contracts.Contracts.erc721Abi,
            contractAddress
        );

        // new Contract(
        //     type === NFTType.ERC1155 ? erc1155Abi : erc721Abi,
        //     contractAddress
        // );
    }

    public async getInfoForNFTTokens({nftDatas}: { nftDatas: NftData[] }): Promise<{ [ key: string ]: NFTTokenInfo } | undefined> {
        try {
            const reqParams: ReqParams = {
                sigFlag: SIG_FLAG.NO_SIG,
                url: LOOPRING_URLs.GET_NFTs_INFO,
                method: ReqMethod.GET,
                queryParams: {nftDatas: nftDatas.join(',')}
            }
            const raw_data = (await this.makeReq().request(reqParams)).data
            const result = raw_data.reduce((prev: { [ key: string ]: NFTTokenInfo }, item: any) => {
                prev[ item.nftData ] = item;
                return prev
            }, {});
            return {
                ...result,
                raw_data
            }
        } catch (error) {
            return undefined
        }
    }

    public async getContractNFTMeta({
                                        web3,
                                        tokenAddress,
                                        _id,
                                        nftType = NFTType.ERC1155,
                                    }: { web3: any, tokenAddress: string, _id: string, nftType?: NFTType }) {
        try {
            const result = await this.callContractMethod(web3, NFTMethod.uri, [_id],
                tokenAddress,
                nftType)
            myLog(tokenAddress, '_id', _id, result);
            return await (fetch(result.replace('{id}', _id)).then(response => response.json()))

        } catch (error) {
            return undefined
        }

    }

    /**
     *
     * @param web3
     * @param from  The address that deposits the funds to the exchange
     * @param to  The address  deposits to
     * @param loopringAddress loopring exchange Address
     * @param tokenId: the tokenId
     * @param chainId
     * @param nftType The type of NFT contract address (ERC721/ERC1155/...)
     * @param nonce
     * @param gasPrice
     * @param gasLimit
     * @param sendByMetaMask
     */
    public async approveNFT({
                                web3,
                                from,
                                depositAddress,
                                tokenAddress,
                                tokenId,
                                nftType = NFTType.ERC1155,
                                gasPrice,
                                gasLimit,
                                chainId,
                                nonce,
                                sendByMetaMask = true
                            }: {
        web3: Web3,
        from: string,
        depositAddress: string,
        tokenAddress: string,
        tokenId: string,
        nftType: NFTType,
        gasPrice: number,
        gasLimit: number,
        chainId: ChainId,
        nonce: number,
        sendByMetaMask?: boolean
    }) {
        let data: any;

        if (nftType === NFTType.ERC1155) {
            data = this._genERC1155Data(NFTMethod.setApprovalForAll, {
                operator: depositAddress,
                approved: true,
            })
        } else if (nftType === NFTType.ERC721) {
            //TODO list not support now
            data = this._genERC721Data(NFTMethod.setApprovalForAll, {
                operator: depositAddress,
                approved: true,
            })
        }
        return await sendRawTx(web3, from, tokenAddress, '0', data, chainId, nonce, gasPrice, gasLimit, sendByMetaMask)

    }

    public async isApprovedForAll({
                                      web3,
                                      from,
                                      exchangeAddress,
                                      nftType = NFTType.ERC1155,
                                      tokenAddress,
                                  }: {
                                      web3: Web3,
                                      from: string,
                                      exchangeAddress: string,
                                      nftType: NFTType,
                                      tokenAddress: string
                                  }                                  // chainId: ChainId,
    ) {

        try {
            const result = await this.callContractMethod(web3, NFTMethod.isApprovedForAll,
                [from, exchangeAddress],
                tokenAddress,
                nftType);
            return result
        } catch (error) {
            return undefined
        }
    }

    public async depositNFT(
        {
            web3,
            from,
            exchangeAddress,
            nftType = NFTType.ERC1155,
            tokenAddress,
            nftID,
            amount,
            gasPrice,
            gasLimit,
            chainId = ChainId.MAINNET,
            nonce,
            extraData,
            sendByMetaMask = true
        }: {
            web3: Web3,
            from: string,
            exchangeAddress: string,
            nftType?: NFTType,
            tokenAddress: string,
            nftID: string,
            amount: number,
            gasPrice: number,
            gasLimit: number,
            chainId?: ChainId,
            nonce: number,
            extraData?: any,
            sendByMetaMask?: boolean
        }
    ) {
        const data = genExchangeData(NFTMethod.depositNFT, {
            from,
            to: from,
            nftType,
            tokenAddress,
            nftID,
            amount,
            extraData: extraData ? extraData : '',
        })
        // myLog('depositNFT data',data)
        return await sendRawTx(web3, from, exchangeAddress, amount.toString(), data, chainId,
            nonce, gasPrice, gasLimit, sendByMetaMask)

    }


}


/**
 * @description Deposits an NFT to the specified account.
 * @param web3
 * @param from The address that deposits the funds to the exchange
 * @param to The account owner's address receiving the funds
 * @param nftType The type of NFT contract address (ERC721/ERC1155/...)
 * @param tokenAddress The address of the token
 * @param nftID The token type 'id`.
 * @param amount The amount of tokens to deposit.
 * @param nonce: number,
 * @param gasPrice: number,
 * @param gasLimit: number,
 * @param extraData Optional extra data used by the deposit contract.
 * @param chainId  0|5
 * @param sendByMetaMask boolean
 */

