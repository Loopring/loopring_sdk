import { ChainId } from '../src/defs/web3_defs'
import { WsAPI } from '../src/api/ws_api'

import { DEFAULT_TIMEOUT } from '../src/api/request'

let api: WsAPI

describe('WsAPI test', function () {

    beforeEach(() => {
        api = new WsAPI(ChainId.GORLI)
    })

    it('getWsKey get', async () => {
        const response = await api.getWsKey()
        console.log(response)
    }, DEFAULT_TIMEOUT)

})
