

import Web3 from 'web3'

const PrivateKeyProvider = require("truffle-privatekey-provider")

const dumpRequest = async (request: any, currentTestName?: string) => {
  try {
    console.log('--->', request)
    console.log('--->', currentTestName, request.data)
  } catch (error) {
    if (error.response) {
      console.log('---error', expect.getState().currentTestName, error.response.data)
    } else {
      console.log('---error', expect.getState().currentTestName, error)
    }
  } finally {
  }
}

const apikey = 'k5nOMDDQ0ESqcSDakP7IX0FdVuncwZKyulmqxceEYXv1iYBeuJcOo0ClOVa1FbW1'
const edd = '0xb445691fce9c899fa2bfcb4d4ed6a08d4dca2e254d1a4147e4d345987f9d41b2'
const ecd = '0xb445691fce9c899fa2bfcb4d4ed6a08d4dca2e254d1a4147e4d345987f9d41b2'

const owner = '0xb639fff1f9dd568e3d89966885d2674e3999a603'

const new_account = '0xef439044717c3af35f4f46e52aa99280217a7114'
const acc_pwd = ''

const exAddr = '0x2e76EBd1c7c0C8e7c2B875b6d505a260C525d25e'

const privKey = "adc22517f2de0093429e5365b042da0ec9299353943db0f0cc104743c69104cf"

const provider = new PrivateKeyProvider(
  privKey,
  "https://goerli.infura.io/v3/a06ed9c6b5424b61beafff27ecc3abf3"
);
const web3 = new Web3(provider)

const loopring_exported_account = {
  name : 'DEV Account 1',
  exchangeName: 'LoopringDEX: V2',
  priv_key: 'adc22517f2de0093429e5365b042da0ec9299353943db0f0cc104743c69104cf',
  depositAddr: '0xb684B265f650a77afd27Ce0D95252a7329B5bD72',
  exchangeAddr: '0x2e76EBd1c7c0C8e7c2B875b6d505a260C525d25e',
  address: '0xff7d59d9316eba168837e3ef924bcdfd64b237d8',
  accountId: 10083,
  apiKey: '1uAAZ87ABCqcS8FDJvpNcVm65jM5Oo0opVl1eHYZHuhP2CxSbjnIaBmQfSWeUfHH',
  chainId: 5,
  publicKeyX: '0x1256c6535c9de10e874a59d098364ea67f6341a0e519971068b916d94ab95476',
  publicKeyY: '0x1a84c4104e002c506302239c8c68756b91cfa62a7a6d76be6fa8534b2feba3a3',
  ecdsaKey: '',
  eddsaKey: '0x3f0058a9ce78b9a23ad86cde5721687fc7048117335cd7377065106a8ee0689'
}

export { dumpRequest, apikey, exAddr, edd, ecd, owner, new_account, acc_pwd, loopring_exported_account, web3, }
