import { useMemo, } from "react"

import { useActiveWeb3React } from "../web3/useWeb3"

import { WsAPI } from '../../api/ws_api'
import { ExchangeAPI } from '../../api/exchange_api'
import { AmmpoolAPI } from '../../api/ammpool_api'
import { UserAPI } from '../../api/user_api'
import { DEFAULT_TIMEOUT } from '../../api/request'

function useApi(ApiClass: any, timeout = DEFAULT_TIMEOUT) {

  const { chainId, active, } = useActiveWeb3React()

    const genApi = () => {
        if (!active || !chainId) {
            return undefined
        }

        return new ApiClass(chainId, timeout)
    }

    const api = useMemo(genApi, [ApiClass, chainId, active])

    return api
}

export function useWsAPI() {
    return useApi(WsAPI) as WsAPI
}

export function useExchangeAPI() {
    return useApi(ExchangeAPI) as ExchangeAPI
}

export function useAmmpoolAPI() {
    return useApi(AmmpoolAPI) as AmmpoolAPI
}

export function useUserAPI() {
    return useApi(UserAPI) as UserAPI
}
