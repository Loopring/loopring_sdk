import { ChainId } from '../../defs/web3_defs'
import { WsAPI } from '../ws_api'

import { DEFAULT_TIMEOUT } from '../request'

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
