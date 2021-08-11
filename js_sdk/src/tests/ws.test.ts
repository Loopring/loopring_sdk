import { ChainId } from '../defs/web3_defs'
import { WsAPI } from '../api/ws_api'

import { DEFAULT_TIMEOUT } from '../defs/loopring_constants'

let api: WsAPI

describe('WsAPI test', function () {

    beforeEach(() => {
        api = new WsAPI({chainId: ChainId.GOERLI})
    })

    it('getWsKey', async () => {
        const response = await api.getWsKey()
        console.log(response)
    }, DEFAULT_TIMEOUT)

})
