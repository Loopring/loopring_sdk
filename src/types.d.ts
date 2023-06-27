declare global {
  type Ethereum = any;
  interface Window {
    ethereum?: {
      [key: string]: boolean;
      isLoopring?: boolean;
      isImToken?: boolean;
      isMetaMask?: boolean;
    } & Ethereum;
    navigator: { userAgent: any } & any;
    // socketEventMap: {[key:string]:any
    // imageConfig:{[key:string]:any}|undefined
  }
}
