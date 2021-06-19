# JS_SDK

## Preinstall
Make sure you are using the original npm source.

```shell
    npm config set registry http://registry.npmjs.org
```

## Install
    yarn add loopring_sdk


## Test Environment

public key: 
0xfF7d59D9316EBA168837E3eF924BCDFd64b237D8

private key:
adc22517f2de0093429e5365b042da0ec9299353943db0f0cc104743c69104cf

Test Account Basic Info (for Goerli)
```javascript
const loopring_exported_account = {
  name : 'DEV Account 1',
  exchangeName: 'LoopringDEX: V2',
  priv_key: 'adc22517f2de0093429e5365b042da0ec9299353943db0f0cc104743c69104cf',
  depositAddr: '0xb684B265f650a77afd27Ce0D95252a7329B5bD72',
  exchangeAddr: '0x2e76EBd1c7c0C8e7c2B875b6d505a260C525d25e',
  address: '0xff7d59d9316eba168837e3ef924bcdfd64b237d8',
  accountId: 10083,
  apiKey: 'dLZNKRR5EJloOX5a9trd99OMv4qux2zFbOOK5SnQWbwCeGAOSzzsLCkVmrK24W4A',
  chainId: 5,
  publicKeyX: '0x1256c6535c9de10e874a59d098364ea67f6341a0e519971068b916d94ab95476',
  publicKeyY: '0x1a84c4104e002c506302239c8c68756b91cfa62a7a6d76be6fa8534b2feba3a3',
  ecdsaKey: '',
  eddsaKey: '0x3f0058a9ce78b9a23ad86cde5721687fc7048117335cd7377065106a8ee0689'
}
```

## Getting Started

#### Init APIs

```javascript
    const userApi: UserAPI = new UserApi(ChainId.GORLI)
    const exchangeApi: ExchangeAPI = new ExchangeAPI(ChainId.GORLI)
    const exchangeApi: AmmpoolAPI = new AmmpoolAPI(ChainId.GORLI)
    const wsAPI: WsAPI = new WsAPI(ChainId.GORLI)
```

#### Examples:(Transfer Process)

##### step 0. init api

```javascript
    const api: UserAPI = new UserApi(ChainId.GORLI)
    const exchangeApi: UserAPI = new UserApi(ChainId.GORLI)
```

##### step 1. get storageId for transfer

```javascript
        const request: GetNextStorageIdRequest = {
            accountId: acc.accountId, 
            sellTokenId: 1
        }
        const storageId = await api.getNextStorageId(request, acc.apiKey)
```

##### step 2. get nonce with getAccountApi

```javascript
        const { nonce } = await exchangeApi.getAccount({
            owner: acc.address
        })
```

##### step 3. submit internal transfer

```javascript
    const request: OriginTransferRequestV3 = {
        exchange: acc.exchangeAddr,
        payerAddr: acc.address,
        payerId: acc.accountId,
        payeeAddr: '0xb6AdaC3e924B4985Ad74646FEa3610f14cDFB79c',
        payeeId: 10392,
        storageId: storageId.offchainId,
        token: {
            tokenId: '1',
            volume: '100000000000000000000',
        },
        maxFee: {
            tokenId: '1',
            volume: '9400000000000000000',
        },
        validUntil: VALID_UNTIL,
    }

    const response = await api.submitInternalTransfer(request, web3, ChainId.GORLI, ConnectorNames.Injected, 
        acc.eddsaKey, acc.apiKey, true)
```
