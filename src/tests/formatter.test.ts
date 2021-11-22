import { LoopringErrorCode } from '../defs'
import { convertPublicKey, convertPublicKey2, PublicKey, } from '..'

import * as fm from '../utils/formatter'

const TIMEOUT = 30000

describe('formatter test', function () {

    beforeEach(async() => {
    }, TIMEOUT)

    it('enum_test', async () => {
        
        console.log(LoopringErrorCode[100000])
        console.log(LoopringErrorCode[200000])

    }, TIMEOUT)

    

    it('formatter1', async () => {
        const px = fm.formatEddsaKey('4966334643155205117396087046889763297010019574817548934733242435404623801022')
        const py = fm.formatEddsaKey('12336121800785994591019936445923899190012791232373302800087997800255990054103')

        const pk: PublicKey = {
            x: px,
            y: py,
        }

        console.log(px)
        console.log('px.length:', px.length)

        console.log(py)
        console.log('py.length:', py.length)

        console.log(convertPublicKey(pk))

    }, TIMEOUT)

    it('formatter2', async () => {
        const px = fm.formatEddsaKey(fm.toHex(fm.toBig('4966334643155205117396087046889763297010019574817548934733242435404623801022')))
        const py = fm.formatEddsaKey(fm.toHex(fm.toBig('12336121800785994591019936445923899190012791232373302800087997800255990054103')))

        const pk: PublicKey = {
            x: px,
            y: py,
        }

        console.log(px)
        console.log('px.length:', px.length)

        console.log(py)
        console.log('py.length:', py.length)

        const bn = convertPublicKey(pk)

        console.log(bn)
        console.log(bn.toString(10))
        console.log(fm.addHexPrefix(bn.toString(16)))

    }, TIMEOUT)

    it('formatter3', async () => {
        const px = '4966334643155205117396087046889763297010019574817548934733242435404623801022'
        const py = '12336121800785994591019936445923899190012791232373302800087997800255990054103'

        const pk: PublicKey = {
            x: px,
            y: py,
        }

        console.log(px)
        console.log('px.length:', px.length)

        console.log(py)
        console.log('py.length:', py.length)

        const bn = convertPublicKey2(pk)

        console.log(bn)
        console.log(bn.toString(10))
        console.log(fm.addHexPrefix(bn.toString(16)))

    }, TIMEOUT)

})

export default {}