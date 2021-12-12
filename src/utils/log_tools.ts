/* eslint-disable no-console  */
export function myLog(message?: any, ...optionalParams: any[]) {
  if (process.env.NODE_ENV !== "production") {
    console.log(message, ...optionalParams);
  }
}

export function myError(message?: any, ...optionalParams: any[]) {
  if (process.env.NODE_ENV !== "production") {
    console.error(message, ...optionalParams);
  }
}
