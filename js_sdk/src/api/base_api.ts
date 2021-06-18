import { ChainId } from '../defs/web3_defs'
import { Request, } from './request'
import { DEFAULT_TIMEOUT, } from '../defs/loopring_defs'

const getBaseUrlByChainId = (id: ChainId) => {
    let baseUrl = ''

    switch (id) {
        case ChainId.MAINNET:
            baseUrl = 'https://api3.loopring.io'
            break
        default:
            baseUrl = 'https://uat2.loopring.io'
    }

    return baseUrl
}

export class BaseAPI {

    private baseUrl: string
    private timeout: number

    public constructor(chainId: ChainId, timeout: number = DEFAULT_TIMEOUT) {
        /*
        if (!chainId) {   
            const { ethereum } = window as any
            if (ethereum && (ethereum.networkVersion === ChainId.MAINNET 
                || ethereum.networkVersion === ChainId.GORLI)) {
                    chainId = ethereum.networkVersion as ChainId
            } else {
                chainId = ChainId.GORLI
                console.log('no ethereum!')
            }
        } else {
            chainId = ChainId.GORLI
        }
        */
        this.baseUrl = getBaseUrlByChainId(chainId)
        this.timeout = timeout
    }

    protected makeReq(): Request {
        return new Request(this.baseUrl, this.timeout)
    }

}
