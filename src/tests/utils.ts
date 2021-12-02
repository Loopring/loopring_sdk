

import Web3 from 'web3'

const PrivateKeyProvider = require("truffle-privatekey-provider")

const dumpRequest = async (request: any, currentTestName?: string) => {
  try {
    console.log('--->', request)
    console.log('--->', currentTestName, request.data)
  } catch (error: any) {
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

const privateKey = "adc22517f2de0093429e5365b042da0ec9299353943db0f0cc104743c69104cf"

const provider = new PrivateKeyProvider(
  privateKey,
  "https://goerli.infura.io/v3/a06ed9c6b5424b61beafff27ecc3abf3"
);
const web3 = new Web3(provider)

const local_web3 = () => {
  return new Web3('http://127.0.0.1:8545')
}
let nftTokenAddress = '0x662168Dc15F4D516bE7741f3BBC3592Ea9A6eDB5'
let nftId = '0x0000000000000000000000000000000000000000000000000000000000000099'
let nftData = '0x20771c3bac05b4225b2203c39001b4222e0934597dfb74ab145147da67f91e7f'

const loopring_exported_account = {
  name : 'DEV Account 1',
  exchangeName: 'LoopringDEX: V2',
  privateKey: 'adc22517f2de0093429e5365b042da0ec9299353943db0f0cc104743c69104cf',
  depositAddr: '0xb684B265f650a77afd27Ce0D95252a7329B5bD72',
  exchangeAddr: '0x2e76EBd1c7c0C8e7c2B875b6d505a260C525d25e',
  address: '0xff7d59d9316eba168837e3ef924bcdfd64b237d8',
  address2: '0xb6d8c39D5528357dBCe6BEd82aC71c74e9D19079',
  accountId: 10083,
  accountId2: 10488,
  addressWhitlisted: '0x35405E1349658BcA12810d0f879Bf6c5d89B512C',
  apiKey: '2PYgTOZwXHkPXtJMlOMG06ZX1QKJInpoky6iYIbtMgmkbfdL4PvxyEOj0LPOfgYX',
  chainId: 5,
  publicKeyX: '0x1256c6535c9de10e874a59d098364ea67f6341a0e519971068b916d94ab95476',
  publicKeyY: '0x1a84c4104e002c506302239c8c68756b91cfa62a7a6d76be6fa8534b2feba3a3',
  ecdsaKey: '',
  eddsaKey: '0x27a5b716c7309a30703ede3f1a218cdec857e424a31543f8a658e7d2208db33',
  nftTokenAddress,
  nftId,
  nftData,
  nftTokenID:32777
}

export { local_web3, dumpRequest, apikey, exAddr, edd, ecd, owner, new_account, acc_pwd, loopring_exported_account, web3, }
