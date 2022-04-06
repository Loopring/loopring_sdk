# Transfer NFT
Definition: Send NFT to other account on Loopring L2

***
## Step 1. get account Info
```ts
const { exchangeInfo } = await LoopringAPI.exchangeAPI.getExchangeInfo();
const LOOPRING_EXPORTED_ACCOUNT.exchangeAddress =  exchangeInfo;
const { accInfo } = await LoopringAPI.exchangeAPI.getAccount({
  owner: LOOPRING_EXPORTED_ACCOUNT.address,
});
```

***
## Step 2. get eddsaKey
```ts
const eddsaKey = await signatureKeyPairMock(accInfo);
console.log("eddsaKey:", eddsaKey.sk);
```

***
## Step 3. get apiKey
```ts
const { apiKey } = await LoopringAPI.userAPI.getUserApiKey({
  accountId: accInfo.accountId}, eddsaKey.sk
);
console.log("apiKey:", apiKey);
const { userNFTBalances } = await LoopringAPI.userAPI.getUserNFTBalances(
  { accountId: accInfo.accountId, limit: 20 },
  apiKey
);
```
 
***
##Step 4. get storageId
```ts  
const storageId = await LoopringAPI.userAPI.getNextStorageId({
  accountId: accInfo.accountId,
  sellTokenId: LOOPRING_EXPORTED_ACCOUNT.nftTokenId,
}, apiKey);
```

***
## Step 5. get fee
```ts
const fee = await LoopringAPI.userAPI.getNFTOffchainFeeAmt({
  accountId: accInfo.accountId,
  requestType: sdk.OffchainNFTFeeReqType.NFT_TRANSFER,
  amount: "0",
}, apiKey);
console.log("fee:", fee);
```

***
## Step 6. Transfer NFT
```ts
const transferResult = await LoopringAPI.userAPI.submitNFTInTransfer({
  request: {
    exchange: LOOPRING_EXPORTED_ACCOUNT.exchangeAddress,
    fromAccountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
    fromAddress: LOOPRING_EXPORTED_ACCOUNT.address,
    toAccountId: 0, // toAccountId is not required, input 0 as default
    toAddress: LOOPRING_EXPORTED_ACCOUNT.address2,
    token: {
      tokenId: LOOPRING_EXPORTED_ACCOUNT.nftTokenId,
      nftData: LOOPRING_EXPORTED_ACCOUNT.nftData,
      amount: "1",
    },
    maxFee: {
      tokenId: TOKEN_INFO.tokenMap["LRC"].tokenId,
      amount: fee.fees["LRC"].fee ?? "9400000000000000000",
    },
    storageId: storageId.offchainId,
    validUntil: LOOPRING_EXPORTED_ACCOUNT.validUntil,
  },
  web3,
  chainId: sdk.ChainId.GOERLI,
  walletType: sdk.ConnectorNames.Unknown,
  eddsaKey: eddsaKey.sk,
  apiKey,
});
console.log("transfer Result:", transferResult);
```