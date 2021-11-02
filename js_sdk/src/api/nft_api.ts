import { BaseAPI } from './base_api'

import { LOOPRING_URLs, } from '../defs/url_defs'
import { NftData, NFTTokenInfo, ReqMethod, ReqParams, SIG_FLAG } from '../defs';
import { myLog } from '../utils/log_tools';


const abiStr: any[] = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "uri",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

export class NFTAPI extends BaseAPI {
    public async getInfoForNFTTokens({nftDatas}: { nftDatas: NftData[] }): Promise<{ [ key: string ]: NFTTokenInfo } | undefined> {
        try {
            const reqParams: ReqParams = {
                sigFlag: SIG_FLAG.NO_SIG,
                url: LOOPRING_URLs.GET_NFTs_INFO,
                method: ReqMethod.GET,
                queryParams: {nftDatas: nftDatas.join(',')}
            }
            const raw_data = (await this.makeReq().request(reqParams)).data
            // const url = baseUrl + '/api/v3/nft/info/nfts?' +  'nftDatas=' +  nftDatas.join(',')
            // const arrayResult = await(fetch(url).then(response => response.json()))
            // arrayResult.reducer((prev:object,item:any)=>{
            //     return  prev [item.nftId]= item
            // },{});
            // console.log(arrayResult)
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
                                        contractAddress,
                                        web3,
                                        _id
                                    }: { web3: any, contractAddress: string, _id: string }) {
        try {
            const contract = new web3.eth.Contract(
                abiStr,
                contractAddress
            );

            // const methodName='uri';
            const result = await contract.methods[ 'uri' ](_id).call();
            myLog(contractAddress,'_id', _id, result);
            return await (fetch(result.replace('{id}', _id)).then(response => response.json()))
            // if (result && chainId === ChainId.GOERLI) {
            //     return await (fetch(result.replace('{id}', _id) + '.json').then(response => response.json()))
            // } else {
            //
            // }
            // return undefined
        } catch (error) {
            return undefined
        }

    }
}

