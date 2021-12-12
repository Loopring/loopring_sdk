/* eslint-disable no-console  */
export const dumpError400 = (reason: any, src = "") => {
  if (src) {
    console.debug("src:", src);
  }
  if (reason?.response) {
    console.error(reason.response.data);
  } else {
    console.error(reason.message);
  }
};

export function sleep(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
