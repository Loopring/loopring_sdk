import crypto from 'crypto'
import { providers } from 'ethers'
// @ts-ignore
import * as _fetch from 'node-fetch'
Object.defineProperty(global, 'crypto', {
  value: {
    getRandomValues: (arr: any) => crypto.randomBytes(arr.length),
  },
})

Object.defineProperty(global, 'fetch', {
  value: _fetch,
})

Object.defineProperty(global, 'window', {
  value: {
    ethereum: providers?.EtherscanProvider,
  },
})
