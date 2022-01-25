/* eslint-disable no-console, @typescript-eslint/ban-ts-comment */
let _myLog;
// @ts-ignore
if (process.env.NODE_ENV !== "production" || window?.___OhTrustDebugger___) {
  _myLog = console.log;
} else {
  _myLog = function (message?: any, ...optionalParams: any[]) {
    return "";
  };
}
let _myError;
// @ts-ignore
if (process.env.NODE_ENV !== "production" || window?.___OhTrustDebugger___) {
  _myError = console.error;
} else {
  _myError = function (message?: any, ...optionalParams: any[]) {
    return "";
  };
}
export const myLog = _myLog;
export const myError = _myError;
