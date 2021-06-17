import { REFRESH_RATE } from "../defs/exchange_defs"

export function PromiseJob(fetchPromise: any, setFunc: any, field?: string, prefix: any = 'PromiseJob') {

    let mounted = true

    const handler = () => {
        if (fetchPromise()) {
            fetchPromise().then((data: any) => {
                if (mounted) {
                    setFunc(field ? data[field] : data)
                } else {
                    console.log(prefix + ' unmounted!')
                }
            }).catch((reason: any) => {
                console.error(reason)
            })
        }
    }

    const cleanUp = () => {
        mounted = false
    }

    return {
        handler,
        cleanUp,
    }

}


export function PromiseJobInTimer(fetchPromise: any, setFunc: any, field?: string, prefix: any = 'PromiseJobInTimer', timeout: number = REFRESH_RATE) {

    let mounted = true

    const handler = () => {

        mounted = true

        const fetchFunc = () => {
            if (fetchPromise()) {
                fetchPromise().then((data: any) => {
                    if (mounted) {
                        setFunc(field ? data[field] : data)
                    } else {
                        console.log(prefix + ' unmounted!')
                    }
                }).catch((reason: any) => {
                    console.error(reason)
                })
            }
        }

        fetchFunc()

        const id = setInterval(fetchFunc, timeout)

        return id
    }

    const cleanUp = (handler: any) => {
        mounted = false
        if (handler) clearInterval(handler)
    }

    return {
        handler,
        cleanUp,
    }

}
