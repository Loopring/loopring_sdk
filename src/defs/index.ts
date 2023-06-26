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
    // @ts-ignore
    return window.navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    // @ts-ignore
    return window.navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    // @ts-ignore
    return window.navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    // @ts-ignore
    return window.navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return (
      // @ts-ignore
      window.navigator.userAgent.match(/IEMobile/i) ||
      // @ts-ignore
      window.navigator.userAgent.match(/WPDesktop/i)
    );
  },
  Ethereum: function () {
    // @ts-ignore
    return window?.ethereum && window?.ethereum.isImToken;
  },

  any: function () {
    if (
      // @ts-ignore
      typeof global.navigator === "undefined" ||
      // @ts-ignore
      typeof window.navigator === "undefined"
    ) {
      console.log("IsMobile any navigator is undefined");
      return false;
    }
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
