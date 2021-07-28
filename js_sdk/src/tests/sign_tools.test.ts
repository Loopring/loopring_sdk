import { ecRecover2 } from "../api/ethereum/metaMask"

const TIMEOUT = 30000

describe('sign_tools', function () {

    beforeEach(async() => {
    }, TIMEOUT)

    it('ecRecover2', async () => {

        const account = '0xff7d59d9316eba168837e3ef924bcdfd64b237d8'

        const msg = 'Sign this message to access Loopring Exchange: 0x2e76EBd1c7c0C8e7c2B875b6d505a260C525d25e with key nonce: 0'

        const sig = '0x8db7eef2cfcb79c09093f725fc5d6dba47795af03fdba700fc0f10bd744f19a913652baedb3db09a78b40f774e7da96a8ec13bb0418b5f5abf199ab32862c0c91c'

        const result = await ecRecover2(account, msg, sig)

        console.log('ecRecover2 result:', result)
        
    }, TIMEOUT)

})

export default {}