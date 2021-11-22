# Contract API
NFT deposit step:
 -  check isApprovedForAll
 -  (options)  approveNFT
 -  deposit

NFT View step:
 - getContractNFTMeta;
 - getIPFS JSON information;
### approveNFT
```typescript
    const nonce = await contract.getNonce(web3, loopring_exported_account.address)
    const response = await nft.approveNFT({
        web3,
        from:loopring_exported_account.address,
        depositAddress:loopring_exported_account.depositAddr,
        tokenAddress:nftTokenAddress,
        tokenId:nftId,
        nftType:NFTType.ERC1155,
        gasPrice,
        gasLimit,
        chainId:ChainId.GOERLI,
        nonce,
        sendByMetaMask:true
    })
```

### getContractNFTMeta
```typescript
    const nonce = await contract.getNonce(web3, loopring_exported_account.address)

    const response = await nft.getContractNFTMeta({
            web3: web3,
            tokenAddress: '0x1197d20d12bc9f80a4902c04c5a4b88371d32b0c14adce746eeea564850f47a5',
            _id: '0x000000000000000000000000000000000000000000000000000000000000007b',
            nftType: NFTType.ERC1155
        }
    )
```    

### getInfoForNFTTokens
```typescript
    const response = await nft.getInfoForNFTTokens({
        nftDatas:['0x1197d20d12bc9f80a4902c04c5a4b88371d32b0c14adce746eeea564850f47a5','0x10e7f3b7ff37e4ebffabedb9fa19c66c63482b4b642d176068517c505edcd123']
    })
```    

### deposit (ERC1155)
```typescript
    const nonce = await contract.getNonce(web3, loopring_exported_account.address)
    const response = await nft.depositNFT({
        web3,
        from: loopring_exported_account.address,
        exchangeAddress: loopring_exported_account.exchangeAddr,
        nftType:NFTType.ERC1155,
        tokenAddress:nftTokenAddress,
        nftID:nftId,
        amount:1,
        gasPrice, gasLimit, chainId:ChainId.GOERLI, nonce, sendByMetaMask:true
    })
```  

###isApprovedForAll 
```typescript
    const response = await nft.isApprovedForAll({web3,
        from:loopring_exported_account.address,
        exchangeAddress:loopring_exported_account.exchangeAddr,
        nftType: NFTType.ERC1155,
        tokenAddress:nftTokenAddress})

```



