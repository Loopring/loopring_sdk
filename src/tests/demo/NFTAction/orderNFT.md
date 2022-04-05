# NFT order

***

## Step 1. getAccount

 ```ts
const {accInfo} = await LoopringAPI.exchangeAPI.getAccount({
  owner: LOOPRING_EXPORTED_ACCOUNT.address,
});
const {accInfo: accInfo2} = await LoopringAPI.exchangeAPI.getAccount({
  owner: LOOPRING_EXPORTED_ACCOUNT.address2,
});
console.log("accInfo:", accInfo);
```

***

## Step 2. eddsaKey

```ts
const eddsaKey = await signatureKeyPairMock(accInfo);
console.log("eddsaKey:", eddsaKey.sk);
const eddsaKey2 = await signatureKeyPairMock(accInfo2, web3_2);
console.log("eddsaKey:", eddsaKey.sk);
```      

***

## Step 3. apiKey

```ts
const {apiKey} = await LoopringAPI.userAPI.getUserApiKey(
  {
    accountId: accInfo.accountId,
  },
  eddsaKey.sk
);
const {apiKey: apiKey2} = await LoopringAPI.userAPI.getUserApiKey(
  {
    accountId: accInfo2.accountId,
  },
  eddsaKey2.sk
);
console.log("apiKey:", apiKey, "apiKey2", apiKey2);
// const { userNFTBalances } = await LoopringAPI.userAPI.getUserNFTBalances(
//   { accountId: accInfo.accountId, limit: 20 },
//   apiKey
// );
// console.log("NFTAction-INFO", userNFTBalances[0]);

```      

***

## Step 4. storageId

```ts
 const storageId = await LoopringAPI.userAPI.getNextStorageId(
  {
    accountId: accInfo.accountId,
    sellTokenId: LOOPRING_EXPORTED_ACCOUNT.nftTokenId,
  },
  apiKey
);
const storageId2 = await LoopringAPI.userAPI.getNextStorageId(
  {
    accountId: accInfo2.accountId,
    sellTokenId: TOKEN_INFO.tokenMap["LRC"].tokenId,
  },
  apiKey2
);
console.log("storageId:", storageId, "storageId2", storageId2);


```      

***

## Step 5. Validate Order

```ts
   const makerOrder: sdk.NFTOrderRequestV3 = {
  exchange: LOOPRING_EXPORTED_ACCOUNT.exchangeAddress,
  accountId: accInfo.accountId,
  storageId: storageId.orderId,
  sellToken: {
    tokenId: LOOPRING_EXPORTED_ACCOUNT.nftTokenId,
    nftData: LOOPRING_EXPORTED_ACCOUNT.nftData,
    amount: "1",
  },
  buyToken: {
    tokenId: TOKEN_INFO.tokenMap["LRC"].tokenId,
    amount: LOOPRING_EXPORTED_ACCOUNT.tradeLRCValue.toString(),
  },
  allOrNone: false,
  fillAmountBOrS: false,
  validUntil: LOOPRING_EXPORTED_ACCOUNT.validUntil,
  maxFeeBips: 1000,
};
makerOrder.eddsaSignature = sdk.get_EddsaSig_NFT_Order(
  makerOrder,
  eddsaKey.sk
);

const nftValidateMakerOrder =
  await LoopringAPI.userAPI.submitNFTValidateOrder({
    request: makerOrder,
    web3,
    chainId: sdk.ChainId.GOERLI,
    walletType: sdk.ConnectorNames.Unknown,
    eddsaKey: eddsaKey.sk,
    apiKey: apiKey,
  });
console.log("submitNFTValidateOrder MakerOrder", nftValidateMakerOrder);

const takerOrder: sdk.NFTOrderRequestV3 = {
  exchange: LOOPRING_EXPORTED_ACCOUNT.exchangeAddress,
  accountId: accInfo2.accountId,
  storageId: storageId2.orderId,
  sellToken: {
    tokenId: TOKEN_INFO.tokenMap["LRC"].tokenId,
    amount: LOOPRING_EXPORTED_ACCOUNT.tradeLRCValue.toString(),
  },
  buyToken: {
    tokenId: LOOPRING_EXPORTED_ACCOUNT.nftTokenId,
    nftData: LOOPRING_EXPORTED_ACCOUNT.nftData,
    amount: "1",
  },
  allOrNone: false,
  fillAmountBOrS: true,
  validUntil: LOOPRING_EXPORTED_ACCOUNT.validUntil,
  maxFeeBips: 100,
};

takerOrder.eddsaSignature = sdk.get_EddsaSig_NFT_Order(
  takerOrder,
  eddsaKey2.sk
);

const nftValidateTakerOrder =
  await LoopringAPI.userAPI.submitNFTValidateOrder({
    request: takerOrder,
    web3,
    chainId: sdk.ChainId.GOERLI,
    walletType: sdk.ConnectorNames.Unknown,
    eddsaKey: eddsaKey2.sk,
    apiKey: apiKey2,
  });
console.log("submitNFTValidateOrder takerOrder", nftValidateTakerOrder);

```

***

## Step 6. NFT Trade

```ts 
const response = await LoopringAPI.userAPI.submitNFTTrade({
  request: {
    maker: makerOrder,
    makerFeeBips: 1000,
    taker: takerOrder,
    takerFeeBips: 100,
  },
  web3,
  chainId: sdk.ChainId.GOERLI,
  walletType: sdk.ConnectorNames.Unknown,
  apiKey: apiKey,
  eddsaKey: eddsaKey.sk,
});

console.log(response);

```
    
