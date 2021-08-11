import { ChainId, dumpError400, ExchangeAPI } from ".."
import fs from 'fs'
import axios from 'axios'
import path from 'path'

import {web3} from './utils'

const TIMEOUT = 30000
let exchangeApi: ExchangeAPI

function _imageEncode (arrayBuffer: any) {
    let u8 = new Uint8Array(arrayBuffer)
    // @ts-ignore
    let b64encoded = btoa([].reduce.call(new Uint8Array(arrayBuffer),function(p,c){return p+String.fromCharCode(c)},''))
    let mimetype="image/png"
    return "data:"+mimetype+";base64,"+b64encoded
}

const baseOptions = {
    timeout: 30000,
    
    headers: {
        'Accept': '*/*',
        'Content-Type': 'image/png',
        'responseType': 'arraybuffer',
    },

    validateStatus: function (status: any) {
        if (status >=200 && status < 300) {
            return true
        }
        return false
        // return true // always true, handle exception in each bussiness logic
    },

    insecure: true,
}

describe('get_imgs', function () {

    beforeEach(async () => {
        exchangeApi = new ExchangeAPI({ chainId: ChainId.MAINNET })
    }, TIMEOUT)

    it('get_imgs', async () => {
        try {
            const tokens = await exchangeApi.getTokens()
            // console.log(tokens.tokenSymbolMap)
            var dirPath = path.join(__dirname, "output");
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath);
                console.log("create ok.");
            } else {
                console.log("already existed.");
            }

            tokens.tokenSymbolArr.forEach(async(item: string | symbol) => {
                item = item as string
                const tokenInfo = tokens.tokenSymbolMap[item]

                if (tokenInfo.symbol.startsWith('LRC')) {
                //if (!tokenInfo.symbol.startsWith('LP-')) {

                    const fileName = tokenInfo.symbol + '.png'
    
                    console.log('handling ' + fileName)

                    const addr = web3.utils.toChecksumAddress(tokenInfo.address)
    
                    let url = `https://exchange.loopring.io/assets/images/ethereum/assets/${addr}/logo.png`

                    try {
    
                        console.log('url: ' + url)

                        const response = await axios.get(url, baseOptions)
        
                        console.log('response: ' + response)
        
                        if (response.status === 200) {
                            console.log('try to write:', fileName)
                            fs.writeFileSync(path.join(dirPath, fileName), _imageEncode(response.data))
                        } else {
                            console.log('got error:', response.status)
                        }

                    } catch (reason) {
                        dumpError400(reason)
                    }
                    

                }

            })

        } catch (reason) {
            dumpError400(reason)
        }
    }, TIMEOUT)

})
