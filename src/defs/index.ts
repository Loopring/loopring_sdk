export * from "./account_defs";
export * from "./web3_defs";
export * from "./ws_defs";
export * from "./url_defs";
export * from "./loopring_constants";
export * from "./loopring_enums";
export * from "./loopring_defs";
export * from "./error_codes";

export const IsMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return (
      navigator.userAgent.match(/IEMobile/i) ||
      navigator.userAgent.match(/WPDesktop/i)
    );
  },
  Ethereum: function () {
    return window?.ethereum && window?.ethereum.isImToken;
  },

  any: function () {
    return (
      IsMobile.Android() ||
      IsMobile.BlackBerry() ||
      IsMobile.iOS() ||
      IsMobile.Opera() ||
      IsMobile.Windows() ||
      IsMobile.Ethereum()
    );
  },
};

type Ethereum = any;
declare global {
  interface Window {
    ethereum?: Ethereum;
    // socketEventMap: {[key:string]:any
    // imageConfig:{[key:string]:any}|undefined
  }
}
