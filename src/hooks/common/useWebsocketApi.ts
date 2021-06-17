import { useCallback, useMemo, useState, useRef, useEffect } from 'react'

import { useActiveWeb3React } from '../web3/useWeb3'
import { useWsAPI, } from './useApi2'

import { ChainId } from '../../defs/web3_defs'

import { getAccountArg, getCandlestickArg, getAmmpoolArg, getTickerArg, WsProps } from '../../defs/ws_defs'

const stateArr = [
    { key: 0, value: 'Connecting' },
    { key: 1, value: 'Connected' },
    { key: 2, value: 'Closing' },
    { key: 3, value: 'Closed' }
]

export const useWebsocket = ({ topics, verify, needApiKey, apiKey, }: { topics: any, needApiKey: boolean, apiKey: string|undefined, verify: boolean, }) => {
    const ws = useRef<WebSocket | null>(null)
    const [wsData, setMessage] = useState<any>(undefined)
    const [readyState, setReadyState] = useState({ key: 0, value: 'Connecting' })

    const { chainId, } = useActiveWeb3React()

    const api = useWsAPI()

    const creatWebSocket = () => {

        if (!api || !chainId) {
            return
        }

        api.getWsKey().then((wsApiKey: any) => {
            let basePath: string = 'wss://ws.'
            switch (chainId) {
                case ChainId.MAINNET:
                    basePath += process.env.REACT_APP_API_URL
                    break
                default:
                    basePath += process.env.REACT_APP_API_URL_UAT
                    basePath = 'wss://ws.uat2.loopring.io'
            }

            basePath += '/v3/ws?wsApiKey=' + wsApiKey
    
            try {
                ws.current = new WebSocket(basePath)

                const subTopics = (topics: any) => {
                    let data: any = {
                        op: 'sub',
                        unsubscribeAll: 'true',
                        topics: topics,
                    }
            
                    if (needApiKey && apiKey) {
                        data.apiKey = apiKey
                    }
            
                    const flat_txt = JSON.stringify(data)
                    sendMessage(flat_txt)
                }
    
                ws.current.onopen = (_e) => {
                    setReadyState(stateArr[ws.current?.readyState ?? 0])
                    subTopics(topics)
                }
                
                ws.current.onclose = (e) => {
                    setReadyState(stateArr[ws.current?.readyState ?? 0])
                }
                
                ws.current.onerror = (e) => {
                    setReadyState(stateArr[ws.current?.readyState ?? 0])
                }
    
                ws.current.onmessage = (e) => {
                    setMessage(e.data)
                }
            } catch (error) {
                console.log(error)
            }

        })

        
    }

    const webSocketInit = () => {
        if (!ws.current || ws.current.readyState === 3) {
            creatWebSocket()
        }
    }

    const closeWebSocket = () => {
        ws.current?.close()
    }

    const sendMessage = (msg: any) => {
        ws.current?.send(msg)
    }

    const reconnect = () => {
        try {
            closeWebSocket()
            ws.current = null
            creatWebSocket()
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {

        verify && webSocketInit()
        return () => {
            ws.current?.close()
        }
    }, [ws, verify])

    return {
        wsData,
        readyState,
        sendMessage,
        closeWebSocket,
        reconnect,
    }
}

export function useWs(topics: any, needApiKey: boolean, apiKey?: string, verify: boolean = true) {
    const [socketData, setSocketData] = useState({})

    const [isLocalPage, setIsLocalPage] = useState<boolean>(true)

    useEffect(() => {

        let mounted = true

        const checkIsLocalPage = () => {
            console.log('enter checkIsLocalPage')
            document.addEventListener('visibilitychange', function () {
                // page invisible trigger!
                let isLocalPage = true
                if (document.visibilityState === 'hidden') {
                    isLocalPage = false
                }
                if (mounted) {
                    setIsLocalPage(isLocalPage)
                } else {
                    console.log('unmounted! dont setIsLocalPage!')
                }
            })
        }

        checkIsLocalPage()

        return () => {
            mounted = false
        }

    }, [])

    const { wsData, readyState, closeWebSocket, reconnect, sendMessage, } = useWebsocket({
        topics,
        apiKey,
        needApiKey,
        verify,
    })

    useEffect(() => {
    
        if (needApiKey && !apiKey) {
            return
        }

        if (!verify) {
            return
        }

        if (wsData === 'ping') {
            try {
                sendMessage('pong')
            } catch (err) {
                console.log(err)
            }
        } else {
            if (wsData) {
                setSocketData(JSON.parse(wsData))
            }
        }
        
        // if closed and is currente page then, reconnect.
        if (readyState.key === 3 && isLocalPage) {
            reconnect()
        }
        // if not current page, close it.
        if (!isLocalPage) {
            closeWebSocket()
        }

    }, [wsData, readyState, isLocalPage, verify, apiKey])

    return {
        socketData,
    }
}

export function useAmmpoolWs(apiKey: string) {

    let topics: any[] = []

    topics.push(getTickerArg('LRC-ETH'))

    topics.push(getAmmpoolArg('0x18920d6E6Fb7EbE057a4DD9260D6D95845c95036'))

    const needApiKey = false

    const { socketData } = useWs(topics, needApiKey, apiKey)

    return {
        socketData,
    }

}
