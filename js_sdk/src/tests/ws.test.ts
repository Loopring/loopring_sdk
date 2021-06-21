import { ChainId } from '../defs/web3_defs'
import { WsAPI } from '../api/ws_api'

import { DEFAULT_TIMEOUT } from '..'

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
