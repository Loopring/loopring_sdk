# NFT API (Contract)
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

## Layer2 NFT
### Enum 
- [OffchainNFTFeeReqType](enums/OffchainNFTFeeReqType.md)
- [OffchainNFTFeeReqType](enums/OffchainNFTFeeReqType.md)

### Interface  
- [TokenVolumeNFT](interfaces/TokenVolumeNFT.md)
- [UserNFTBalanceInfo](../detail/interfaces/UserNFTBalanceInfo.md)
- [UserNFTDepositHistoryTx](../detail/interfaces/UserNFTDepositHistoryTx.md)
- [UserNFTTransferHistoryTx](../detail/interfaces/UserNFTTransferHistoryTx.md)
- [UserNFTWithdrawalHistoryTx](../detail/interfaces/UserNFTWithdrawalHistoryTx.md)
- [GetNFTOffchainFeeAmtRequest](../detail/interfaces/GetNFTOffchainFeeAmtRequest.md)
- [GetUserNFTBalancesRequest](../detail/interfaces/GetUserNFTBalancesRequest.md)
- [NFTMintRequestV3](../detail/interfaces/NFTMintRequestV3.md)
- [NFTTokenInfo](../detail/interfaces/NFTTokenInfo.md)
- [NFTWithdrawRequestV3](../detail/interfaces/NFTWithdrawRequestV3.md)
- [OriginNFTMINTRequestV3WithPatch](../detail/interfaces/OriginNFTMINTRequestV3WithPatch.md)
- [OriginNFTTransferRequestV3](../detail/interfaces/OriginNFTTransferRequestV3.md)
- [OriginNFTTransferRequestV3WithPatch](../detail/interfaces/OriginNFTTransferRequestV3WithPatch.md)
- [OriginNFTWithdrawRequestV3WithPatch](../detail/interfaces/OriginNFTWithdrawRequestV3WithPatch.md)
- [GetUserNFTDepositHistoryRequest](../detail/modules.md#getusernftdeposithistoryrequest)
- [GetUserNFTTransferHistoryRequest](../detail/modules.md#getusernfttransferhistoryrequest)
- [GetUserNFTWithdrawalHistoryRequest](../detail/modules.md#getusernftwithdrawalhistoryrequest)


### Function  
- [getNFTMintTypedData](../detail/modules.md#getnftminttypeddata)
- [getNFTTransferTypedData](../detail/modules.md#getnfttransfertypeddata)
- [getNFTWithdrawTypedData](../detail/modules.md#getnftwithdrawtypeddata)
- [getNftData](../detail/modules.md#getnftdata)
- [get\_EddsaSig\_NFT\_Mint](../detail/modules.md#get_eddsasig_nft_mint)
- [get\_EddsaSig\_NFT\_Transfer](../detail/modules.md#get_eddsasig_nft_transfer)
- [get\_EddsaSig\_NFT\_Withdraw](../detail/modules.md#get_eddsasig_nft_withdraw)
- [signNFTMintWithDataStructure](../detail/modules.md#signnftmintwithdatastructure)
- [signNFTMintWithDataStructureForContract](../detail/modules.md#signnftmintwithdatastructureforcontract)
- [signNFTMintWithoutDataStructure](../detail/modules.md#signnftmintwithoutdatastructure)
- [signNFTTransferWithDataStructureForContract](../detail/modules.md#signnfttransferwithdatastructureforcontract)
- [signNFTTransferWithoutDataStructure](../detail/modules.md#signnfttransferwithoutdatastructure)
- [signTNFTransferWithDataStructure](../detail/modules.md#signtnftransferwithdatastructure)
- [signNFTWithdrawWithDataStructure](../detail/modules.md#signnftwithdrawwithdatastructure)
- [signNFTWithdrawWithDataStructureForContract](../detail/modules.md#signnftwithdrawwithdatastructureforcontract)
- [signNFTWithdrawWithoutDataStructure](../detail/modules.md#signnftwithdrawwithoutdatastructure)



