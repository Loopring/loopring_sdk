export const dumpError400 = (reason: any, src: string = '') => {
    if (src) {
        console.log('src:', src)
    }
    if (reason?.response) {
        console.log(reason.response.data)
    } else {
        console.log(reason.message)
    }
}

export function sleep(milliseconds: number) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
