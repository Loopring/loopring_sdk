import { sleep } from "../utils"

describe('utils test', function () {

    beforeEach(async() => {
    })

    it('sleep_test', async() => {
        console.log(new Date().getTime())
        await sleep(5000)
        console.log(new Date().getTime())
    })

})

export default {}
