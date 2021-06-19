import { ChainId } from '../src/defs/web3_defs'
import { WsAPI } from '../src/api/ws_api'

import { DEFAULT_TIMEOUT } from '../src'

let api: WsAPI

describe('WsAPI test', function () {

    beforeEach(() => {
        api = new WsAPI(ChainId.GORLI)
    })

    it('getWsKey', async () => {
        const response = await api.getWsKey()
        console.log(response)
    }, DEFAULT_TIMEOUT)

})
