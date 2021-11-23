# Contract API
deposit step:
-  check approveMax
-  (options)  approveNFT
-  deposit

NFT View step:
- getContractNFTMeta;
- getIPFS JSON information;


## getNonce
```typescript
    const nonce = await contract.getNonce(web3, acc.address);
```
## approveMax_LRC
```typescript
    const nonce = await contract.getNonce(web3, acc.address);
    const response = await contract.approveMax(web3, acc.address, lrc.address,
        acc.depositAddr, gasPrice, gasLimit, ChainId.GOERLI, nonce, true)
```
## deposit_LRC2
```typescript
    const nonce = await contract.getNonce(web3, acc.address)
    const response = await contract.deposit(web3, acc.address, acc.exchangeAddr,
        lrc, 11, 0, gasPrice, gasLimit, ChainId.GOERLI, nonce, true)
```
##approveZero_LRC
```typescript
    const nonce = await contract.getNonce(web3, acc.address)
    const response = await contract.approveZero(web3, acc.address, lrc.address,
        acc.depositAddr, gasPrice, gasLimit, ChainId.GOERLI, nonce, true)
```
##forceWithdrawal
```typescript
    const nonce = await contract.getNonce(web3, acc.address)
    const response = await contract.forceWithdrawal(web3, acc.address, acc.accountId, acc.exchangeAddr,
        eth, 0, gasPrice, gasLimit, ChainId.GOERLI, nonce, true)

```


