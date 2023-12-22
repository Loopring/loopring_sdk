import './wasm_exec'

export class WebAssemblySign {
  private go
  static wasm: WebAssembly.Instance
  constructor() {
    //@ts-ignore
    this.go = new (window || globalThis).Go()
    this.init()
  }
  async init() {
    const memory = new WebAssembly.Memory({ initial: 10, maximum: 100 })
    const wasmModule = new WebAssembly.Module(
      await fetch('./wasm-release.wasm').then((response) => response.arrayBuffer()),
    )
    const wasmInstance = new WebAssembly.Instance(wasmModule, this.go.importObject)
    WebAssemblySign.wasm = wasmInstance
  }
}

if (!WebAssemblySign.wasm) {
  new WebAssemblySign()
}
