# Mint NFT

Definition: Mint Layer2 NFT, Loopring follow the ipfs NFT format, IPFS CID will convert to nftId, please view MetaNFT.md

***

## Step 1. get Account

```ts
const {accInfo} = await LoopringAPI.exchangeAPI.getAccount({
  owner: LOOPRING_EXPORTED_ACCOUNT.address,
});
console.log("accInfo:", accInfo);
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
const {apiKey} = await LoopringAPI.userAPI.getUserApiKey(
  {
    accountId: accInfo.accountId,
  },
  eddsaKey.sk
);
console.log("apiKey:", apiKey);

```

***

## Step 4. get fee

```ts
 const fee = await LoopringAPI.userAPI.getNFTOffchainFeeAmt(
  {
    accountId: accInfo.accountId,
    tokenAddress: LOOPRING_EXPORTED_ACCOUNT.nftTokenAddress,
    requestType: sdk.OffchainNFTFeeReqType.NFT_MINT,
  },
  apiKey
);
```

***

## Step 5. get storageId

```ts
const storageId = await LoopringAPI.userAPI.getNextStorageId(
  {
    accountId: accInfo.accountId,
    sellTokenId: LOOPRING_EXPORTED_ACCOUNT.nftTokenId, // same as maxFee tokenId
  },
  apiKey
);


```

***

## Step 6. get tokenAddress

```ts
const counterFactualNftInfo = {
  nftOwner: accInfo.owner,
  nftFactory: sdk.NFTFactory[sdk.ChainId.GOERLI],
  nftBaseUri: "",
};
const nftTokenAddress =
  LoopringAPI.nftAPI.computeNFTAddress(counterFactualNftInfo)
    .tokenAddress || "";
console.log("nftTokenAddress", nftTokenAddress);
```

***

## Step 7. Mint

```ts

const response = await LoopringAPI.userAPI.submitNFTMint({
  request: {
    exchange: LOOPRING_EXPORTED_ACCOUNT.exchangeAddress,
    minterId: accInfo.accountId,
    minterAddress: accInfo.owner,
    toAccountId: accInfo.accountId,
    toAddress: accInfo.owner,
    nftType: 0,
    tokenAddress: nftTokenAddress,
    nftId: LOOPRING_EXPORTED_ACCOUNT.nftId, //nftId.toString(16),
    amount: "1",
    validUntil: LOOPRING_EXPORTED_ACCOUNT.validUntil,
    storageId: storageId.offchainId ?? 9,
    maxFee: {
      tokenId: TOKEN_INFO.tokenMap["LRC"].tokenId,
      amount: fee.fees["LRC"].fee ?? "9400000000000000000",
    },
    royaltyPercentage: 5,
    counterFactualNftInfo,
    forceToMint: true, // suggest use as false, for here is just for run test
  },
  web3,
  chainId: sdk.ChainId.GOERLI,
  walletType: sdk.ConnectorNames.Unknown,
  eddsaKey: eddsaKey.sk,
  apiKey: apiKey,
});
```
