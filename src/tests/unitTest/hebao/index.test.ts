// getRelayerCurrentTime
import { DEFAULT_TIMEOUT, LOOPRING_EXPORTED_ACCOUNT } from '../../MockData'
import { HebaoAPI } from '../../../api/hebao_api'
import { Wallet } from 'ethers'

describe('hebaoapi test', function () {
  it(
    'computeWalletAddress',
    async () => {
      const api = new HebaoAPI({
        baseUrl: 'http://aa65c5ccf949448559c0dc8c814e2d4c-1601735065.us-east-2.elb.amazonaws.com',
        chainId: 5,
      })
      const owner = new Wallet(LOOPRING_EXPORTED_ACCOUNT.smartWallet1.ownerPrivateKey).address
      const salt = LOOPRING_EXPORTED_ACCOUNT.smartWallet1.salt
      // debugger
      const walletAddress = await api.computeWalletAddress({ network: 'GOERLI', owner, salt })
      expect(walletAddress.address).toEqual(LOOPRING_EXPORTED_ACCOUNT.smartWallet1.address.toLowerCase())
      console.log(walletAddress)
    },
    DEFAULT_TIMEOUT,
  )
  it(
    'getWallet',
    async () => {
      const api = new HebaoAPI({
        baseUrl: 'http://aa65c5ccf949448559c0dc8c814e2d4c-1601735065.us-east-2.elb.amazonaws.com',
        chainId: 5,
      })
      await new Promise((res, rej) => setTimeout(() => {
        res('');
      }, 4 * 1000)) // api frequency
      const owner = new Wallet(LOOPRING_EXPORTED_ACCOUNT.smartWallet1.ownerPrivateKey).address
      const walletAddress = await api.computeWalletAddress({
        network: 'GOERLI',
        owner,
        salt: LOOPRING_EXPORTED_ACCOUNT.smartWallet1.salt,
      })
      const res = await api.getWallet(
        {
          owner,
          network: 'GOERLI',
          wallet: walletAddress.address,
          timestamp: Date.now(),
        },
        LOOPRING_EXPORTED_ACCOUNT.smartWallet1.ownerPrivateKey,
      )
      expect(res).not.toBeUndefined()
    },
    DEFAULT_TIMEOUT,
  )
})
