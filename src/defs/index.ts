import { getNavigatorSafely, getWindowSafely } from 'utils/window_utils'

export * from './loopring_enums'
export * from './url_defs'
export * from './account_defs'
export * from './web3_defs'
export * from './ws_defs'
export * from './loopring_constants'
export * from './loopring_defs'
export * from './error_codes'
export * from './nft_defs'
export * from './hebao_def'


export const IsMobile = {
  Android: function () {
    return getNavigatorSafely()?.userAgent.match(/Android/i)
  },
  BlackBerry: function () {
    return getNavigatorSafely()?.userAgent.match(/BlackBerry/i)
  },
  iOS: function () {
    return getNavigatorSafely()?.userAgent.match(/iPhone|iPad|iPod/i)
  },
  Opera: function () {
    return getNavigatorSafely()?.userAgent.match(/Opera Mini/i)
  },
  Windows: function () {
    return getNavigatorSafely()?.userAgent.match(/IEMobile/i) || getNavigatorSafely()?.userAgent.match(/WPDesktop/i)
  },
  Ethereum: function () {
    return getWindowSafely()?.ethereum && getWindowSafely()?.ethereum.isImToken
  },

  any: function () {
    if (typeof global.navigator === 'undefined' || typeof navigator === 'undefined') {
      console.log('IsMobile any navigator is undefined')
      return false
    }
    return (
      IsMobile.Android() ||
      IsMobile.BlackBerry() ||
      IsMobile.iOS() ||
      IsMobile.Opera() ||
      IsMobile.Windows() ||
      IsMobile.Ethereum()
    )
  },
}

type Ethereum = any
declare global {
  interface Window {
    ethereum?: Ethereum & { [key: string]: boolean; isLoopring: boolean }

    // socketEventMap: {[key:string]:any
    // imageConfig:{[key:string]:any}|undefined
  }
  interface Global {
    ethereum?: Ethereum & { [key: string]: boolean; isLoopring: boolean }
  }
}
