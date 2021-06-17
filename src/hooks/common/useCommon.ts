import { useEffect } from 'react'
import { PromiseJob, PromiseJobInTimer } from '../../utils/hook_tools'
import { REFRESH_RATE_SLOW } from "../../defs/exchange_defs"

export function usePromiseJob(fetchPromise: any, setFunc: any, field? :string, prefix: any = undefined, dependencies: any[] = []) {

  const {
    handler,
    cleanUp,
  } = PromiseJob(fetchPromise, setFunc, field, prefix)

  useEffect(() => {
    handler()
    return () => cleanUp()
  }, [...dependencies])

}

export function usePromiseJobInTimer(fetchPromise: any, setFunc: any, field? :string, prefix: any = undefined, dependencies: any[] = [], timeout: number= REFRESH_RATE_SLOW) {

  const {
    handler,
    cleanUp,
  } = PromiseJobInTimer(fetchPromise, setFunc, field, prefix, timeout)

  useEffect(() => {
    const id = handler()
    return () => cleanUp(id)
  }, [...dependencies])

}
