import { useMemo, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactContextInterface } from '@web3-react/core/dist/types'

import { useWeb3React } from '@web3-react/core'

import { injected } from '../../networks/web3_connectors'

import { ChainId, NetworkContextName } from '../../defs/web3_defs'

/*
import EXCHANGE_ABI from 'config/abis/exchange_3_6.json'
import ERC20_ABI from 'config/abis/erc20.json'
import DEPOSIT_ABI from 'config/abis/deposit.json'

import Web3 from 'web3'
*/

export function useActiveWeb3React(): Web3ReactContextInterface<Web3Provider> & { chainId?: ChainId } {
  const context = useWeb3React<Web3Provider>()
  const contextNetwork = useWeb3React<Web3Provider>(NetworkContextName)
  return context.active ? context : contextNetwork
}

export function useEtherscan() {
  const { chainId } = useActiveWeb3React()

  const [etherscanUrl, setEtherscanUrl] = useState<string>('')

  useEffect(() => {
    switch(chainId) {
      case ChainId.MAINNET:
        setEtherscanUrl('https://etherscan.io/address/')
        break
      default:
        setEtherscanUrl('https://goerli.etherscan.io/address/')
    }
  }, [chainId])

  return {
    etherscanUrl,
  }
}

export function useEagerConnect() {

  const { activate, active } = useWeb3React()

  const [tried, setTried] = useState(false)

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized: boolean) => {
      if (isAuthorized) {
        console.log('useEagerConnect isAuthorized')
        activate(injected, undefined, true).catch(() => {
          setTried(true)
        })
      } else {
        console.log('useEagerConnect NOT isAuthorized')
        setTried(true)
      }
    })
  }, []) // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true)
    }
  }, [tried, active])

  return tried
}

export function useInactiveListener(onReConnectInjected: any = undefined, suppress: boolean = false) {
  const { active, error, activate, chainId, } = useWeb3React()
  const dispatch = useDispatch()

  useEffect((): any => {
    const { ethereum } = window as any

    const reConnectInjected = () => {
      console.log('--------------------------> reConnectInjected')
      activate(injected)
      if (onReConnectInjected) {
        onReConnectInjected()
      }
    }

    if (ethereum && ethereum.on && !active && !error) {

      const handleChainChanged = (chainId: string | number) => {
        console.log('Handling \'chainChanged\' event with payload', chainId)
        reConnectInjected()
      }
      const handleAccountsChanged = (accounts: string[]) => {
        console.log('---------------------------------------------')
        console.log('Handling \'accountsChanged\' event with payload', accounts)
        console.log('before reset accounts.length=', accounts.length)
        if (accounts.length > 0) {
          console.log('before reset!!!!!!!!!!!!!!!!1')
          reConnectInjected()
        }
      }

      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('chainChanged', handleChainChanged)
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
        }
      }
    }
  }, [active, error, chainId, activate, dispatch])
}

export function useBlockNumber() {
  const { library, chainId } = useActiveWeb3React()

  const [blockNumber, setBlockNumber] = useState<number>()

  useEffect((): any => {
      if (!!library) {
          let stale = false

          library
              .getBlockNumber()
              .then((blockNumber: number) => {
                  if (!stale) {
                      setBlockNumber(blockNumber)
                  }
              })
              .catch(() => {
                  if (!stale) {
                      setBlockNumber(-1)
                  }
              })

          const updateBlockNumber = (blockNumber: number) => {
              setBlockNumber(blockNumber)
          }
          library.on('block', updateBlockNumber)

          return () => {
              stale = true
              library.removeListener('block', updateBlockNumber)
              setBlockNumber(undefined)
          }
      }
  }, [library, chainId])

  return {
      blockNumber,
  }
}

export function useBalance() {
  const { account, library, chainId } = useActiveWeb3React()

  const [balance, setBalance] = useState<number>()
  useEffect((): any => {
      if (!!account && !!library) {
          let stale = false

          library
              .getBalance(account)
              .then((balance: any) => {
                  if (!stale) {
                      setBalance(balance)
                  }
              })
              .catch(() => {
                  if (!stale) {
                      setBalance(0)
                  }
              })

          return () => {
              stale = true
              setBalance(0)
          }
      }
  }, [account, library, chainId]) // ensures refresh if referential identity of library doesn't change across chainIds

  return {
      balance,
  }
}
