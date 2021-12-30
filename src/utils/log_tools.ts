/* eslint-disable no-console  */
let _myLog;
if (process.env.NODE_ENV !== 'production') {
  _myLog = console.log;
} else {
  _myLog = function (message?: any, ...optionalParams: any[]) {
    return''
  };
}
let _myError;
if (process.env.NODE_ENV !== 'production') {
  _myError = console.error;
} else {
  _myError = function (message?: any, ...optionalParams: any[]) {
    return''
  };
}
export const myLog = _myLog;
export const myError = _myError;