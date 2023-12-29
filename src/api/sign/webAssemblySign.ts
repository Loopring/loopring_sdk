import {makeRequestParamStr, WebAssemblySign} from './sign_tools'
import {sleep, type} from '../../utils'
import {Go} from './wasm_exec'
import {myLog} from "../../utils/log_tools";
// @ts-ignore
// import * as wasm from './wasm-release.wasm?url'
// const wasmUrl = 'https://static.loopring.io/events/testEvents/wasm-release.wasm'
const wasmUrl = process.env['REACT_APP_WASM_URL'] ? process.env['REACT_APP_WASM_URL'] : './wasm-release.wasm'


export class WebAssemblyHandler {
    #go
    #obj
    #bridge
    #wasm: WebAssembly.Instance | undefined
    static wasm: WebAssembly.Instance | undefined

    constructor(_obj: any) {
        this.#obj= new _obj()
        //@ts-ignore
        this.#bridge = global?.__go_wasm__;
        // this.#bridge.__wrapper__ = wrapper;
        //@ts-ignore
        this.#go = new Go()
        this.init()
    }

    async init() {
        try {
            const memory = new WebAssembly.Memory({initial: 10, maximum: 100})
            let wasmInstance: WebAssembly.Instance
            //@ts-ignore
            if (typeof process === 'object' && !process?.browser && global?.path && global?.fs) {
                const wasm = await WebAssembly.compile(
                    // @ts-ignore
                    global?.fs?.readFileSync(global?.path?.resolve(wasmUrl)))
                wasmInstance = await WebAssembly.instantiate(wasm, this.#go.importObject)
                //@ts-ignore
            } else {
                const {instance} = await fetch(wasmUrl)
                    .then((response) => response.arrayBuffer())
                    .then(buffer => WebAssembly.instantiate(buffer, this.#go.importObject))
                // .then({instance}=>instance)
                wasmInstance = instance;
            }
            //@ts-ignore
            this.#go.run(wasmInstance, global)
            WebAssemblyHandler.wasm = wasmInstance
            //@ts-ignore
            globalThis.wasm = wasmInstance
        } catch (error) {
            console.log('wasm error', error)
            //@ts-ignore
            this.#wasm = undefined
            WebAssemblyHandler.wasm = undefined
            //@ts-ignore
            globalThis.wasm = undefined
        }

        // WebAssemblySign.wasm = wasmInstance
    }

    get(target: WebAssemblySign, property: string, receiver: ThisType<any>) {
        console.log('target WebAssemblySign ', target)
        const _arguments = [...arguments] ?? []
        const _self = this;
        try {
            if (!_self.#go || _self.#go.exited) {
                throw new Error('The Go instance is not active.');
            }
            return async function (...args: any) {
                let i = 10
                while (_self.#bridge.__ready__ !== true && i) {
                    await sleep(200);
                    i--
                }
                const func = _self.#bridge[property]
                try {
                    if (typeof func == 'function') {
                        switch (property) {
                            case 'signRequest':
                                if (args && args[4] !== undefined) {
                                    if (args[1] === 'GET' || args[1] === 'DELETE') {
                                        args[4] = makeRequestParamStr(args[4])
                                    } else if (args[1] === 'POST' || args[1] === 'PUT') {
                                        args[4] = JSON.stringify(Object.fromEntries(args[4]))//makeObjectStr(args[4])

                                    }
                                }
                                myLog('makeRequestParam', 'args[4]', args[4])
                                return func.apply(_self, args)
                                break
                            case 'getEdDSASigWithPoseidon':
                                if (args && args[0] !== undefined && type(args[0]) === 'array') {
                                    args[0] = args[0].map((item: any) => {
                                        return item.toString()
                                    })
                                    let _args = [args[1].toString() ?? '', ...args[0]]
                                    // console.log('param',args[0])
                                    // const hash = await _self.#bridge['generateKeyPair']('0x1234')
                                    // const hash = await _self.#bridge['getEdDSASigWithPoseidonHash'].apply(undefined,args[0])
                                    // console.log('getEdDSASigWithPoseidonHash',hash,_args,sign)
                                    const result = await func.apply(_self, _args)
                                    return JSON.parse(result)
                                } else {
                                    throw 'wrong args'
                                }
                            default:
                        }
                    } else {
                        throw new Error('no fuc in bridge');
                    }
                } catch (error) {
                    console.log(error)
                    // @ts-ignore
                    return await  Reflect.get(_self.#obj, property, receiver )(...args)
                    // await target[property].apply(null, args)
                }

                // @ts-ignore

            }
        } catch (error) {
            // @ts-ignore
            return Reflect.get(this.#obj, property, receiver )(...arguments)
        }
    }

}

export const webAssemblySign  = new Proxy(
    WebAssemblySign,
    // @ts-ignore
    new WebAssemblyHandler(WebAssemblySign),
) as unknown as WebAssemblySign
// export const webAssemblySign = Object.create(_webAssemblySign)



