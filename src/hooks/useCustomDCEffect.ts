import { useDeepCompareEffect } from "react-use"

export function useCustomDCEffect(action: any, deps: any[] | undefined | null) {
    useDeepCompareEffect(action, [deps || {}])
}
