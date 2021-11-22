import { ChainId } from '../defs'
import { Request, } from './request'
import { DEFAULT_TIMEOUT, } from '../defs/loopring_constants'

const getBaseUrlByChainId = (id: ChainId) => {
    let baseUrl = ''

    switch (id) {
        case ChainId.MAINNET:
            baseUrl = 'https://api.loopring.network'
            break
        default:
            baseUrl = 'https://api.uat.loopring.pro'
    }

    return baseUrl
}

export interface InitParam {
    chainId?: ChainId
    baseUrl?: string
}

export class BaseAPI {

    protected baseUrl: string = ''
    private timeout: number

    public constructor(param: InitParam, timeout: number = DEFAULT_TIMEOUT) {
        if (param.baseUrl) {
            this.baseUrl = param.baseUrl
        } else if (param.chainId !== undefined) {
            this.setChainId(param.chainId)
        } else {
            this.setChainId(ChainId.GOERLI)
        }

        this.timeout = timeout
    }

    public setChainId(chainId: ChainId) {
        this.baseUrl = getBaseUrlByChainId(chainId)
    }

    public setBaseUrl(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    protected makeReq(): Request {
        return new Request(this.baseUrl, this.timeout)
    }

}
