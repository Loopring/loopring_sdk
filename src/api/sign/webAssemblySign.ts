import { WebAssemblySign } from './sign_tools'
import { type } from '../../utils'
import { Go } from './wasm_exec'
// @ts-ignore
// import * as wasm from './wasm-release.wasm?url'
// const wasmUrl = 'https://static.loopring.io/events/testEvents/wasm-release.wasm'
const wasmUrl = './wasm-release.wasm'
export class WebAssemblyHandler {
  #go
  #obj

  #wasm: WebAssembly.Instance | undefined
  static wasm: WebAssembly.Instance | undefined
  constructor(_obj: any) {
    this.#obj = _obj
    //@ts-ignore
    this.#go = new Go()
    this.init()
  }

  async init() {
    try {
      const memory = new WebAssembly.Memory({ initial: 10, maximum: 100 })
      let wasmInstance: WebAssembly.Instance
      //@ts-ignore
      if (typeof process === 'object' && !process?.browser) {
        const fs = require('fs')
        const path = require('path')
        // const { WASI } = require('wasi')
        // const wasi = new WASI()
        // const importObject = { wasi_unstable: wasi.wasiImport }
        // const buffer = new Uint8Array(fs.readFileSync(path.resolve(__dirname, wasmUrl)))
        // console.log(path.resolve(wasmUrl))
        const wasm = await WebAssembly.compile(fs.readFileSync(path.resolve(wasmUrl)))
        wasmInstance = await WebAssembly.instantiate(wasm, this.#go.importObject)
        //@ts-ignore
      } else {
        const wasmModule = new WebAssembly.Module(
          await fetch(wasmUrl).then((response) => response.arrayBuffer()),
        )
        wasmInstance = new WebAssembly.Instance(wasmModule, this.#go.importObject)
      }
      //@ts-ignore
      this.#go.run(wasmInstance, globalThis)
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
    if (WebAssemblyHandler.wasm) {
      // @ts-ignore
      const func = this.#wasm[property]
      if (typeof func == 'function')
        try {
          return async function (...args: any) {
            switch (property) {
              case 'signRequest':
                if (args && args[4] !== undefined) {
                  if (args[3] === 'GET' || args[3] === 'DELETE') {
                    args[4] = new URLSearchParams(Object.fromEntries(args[4].toString()))
                  } else if (args[3] === 'POST' || args[3] === 'PUT') {
                    args[4] = JSON.stringify(Object.fromEntries(args[4]))
                  }
                }
                break
              case 'getEdDSASigWithPoseidon':
                if (args && args[0] !== undefined && type(args[0]) === 'array') {
                  debugger
                  let _args = [args[1] ?? '', ...args[0]]
                  return await func.bind(_args)
                } else {
                  throw 'wrong args'
                }
              default:
            }
            return await func.bind(args)
          }
        } catch (error) {
          // @ts-ignore
          return Reflect.get(...arguments)
        }
    } else {
      // @ts-ignore
      return Reflect.get(...arguments)
    }
  }
}

export const webAssemblySign = new Proxy(
  WebAssemblySign,
  // @ts-ignore
  new WebAssemblyHandler(WebAssemblySign),
) as unknown as WebAssemblySign

// export function getEdDSASig(
//   method: string,
//   basePath: string,
//   api_url: string,
//   requestInfo: any,
//   PrivateKey: string | undefined,
// )

// export class WebAssemblySign implements WebAssemblySignFun{
//   #go
//   static wasm: WebAssembly.Instance
//   static new Proxy(signRequest, {
// //     get(target, prop, receiver) {
// //   // By default, it looks like Reflect.get(target, prop, receiver)
// //   // which has a different value of `this`
// //   return target[prop];
// // },
// // })
//
//   constructor() {
//     //@ts-ignore
//   this.#go = new (window || globalThis).Go()
//     this.init()
//   }
//
// }

// Object.setPrototypeOf(WebAssemblySign, new Proxy({}, new Handler(User)))
