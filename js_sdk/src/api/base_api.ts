import { ChainId } from '../defs'
import { Request, } from './request'
import { DEFAULT_TIMEOUT, } from '../defs/loopring_constants'

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
        this.baseUrl = ''
        this.setChainId(chainId)
        this.timeout = timeout
    }

    public setChainId(chainId: ChainId) {
        this.baseUrl = getBaseUrlByChainId(chainId)
    }

    protected makeReq(): Request {
        return new Request(this.baseUrl, this.timeout)
    }

}
