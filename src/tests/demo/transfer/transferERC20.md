# Transfer ERC20 
Definition: Send ERC20 tokens to other account on Loopring L2, 
> trade value should with decimals `sdk.toBig(value).times("1e" + TOKEN_INFO.tokenMap.LRC.decimals)`

***
## Step 1. get account Info
    const { exchangeInfo } = await LoopringAPI.exchangeAPI.getExchangeInfo();
    const LOOPRING_EXPORTED_ACCOUNT.exchangeAddress =  exchangeInfo;

```ts
const { accInfo } = await LoopringAPI.exchangeAPI.getAccount({
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
## Step 3. get apikey
```ts
const { apiKey } = await LoopringAPI.userAPI.getUserApiKey(
  {
    accountId: accInfo.accountId,
  },
  eddsaKey.sk
);
console.log("apiKey:", apiKey);
const { userBalances } = await LoopringAPI.userAPI.getUserBalances(
  { accountId: LOOPRING_EXPORTED_ACCOUNT.accountId, tokens: "" },
  apiKey
);
```

***
## Step 4. get storageId
```ts
const storageId = await LoopringAPI.userAPI.getNextStorageId(
  {
    accountId: accInfo.accountId,
    sellTokenId: TOKEN_INFO.tokenMap["LRC"].tokenId,
  },
  apiKey
);
console.log("storageId:", storageId);
 ```

***
## Step 5. get fee
```ts
const fee = await LoopringAPI.userAPI.getOffchainFeeAmt({
  accountId: accInfo.accountId,
  requestType: sdk.OffchainFeeReqType.TRANSFER,
}, apiKey);
console.log("fee:", fee);
```
***
## Step 6. transfer
```ts
const transferResult = await LoopringAPI.userAPI.submitInternalTransfer({
  request: {
    exchange: LOOPRING_EXPORTED_ACCOUNT.exchangeAddress,
    payerAddr: accInfo.owner,
    payerId: accInfo.accountId,
    payeeAddr: LOOPRING_EXPORTED_ACCOUNT.address2,
    payeeId: LOOPRING_EXPORTED_ACCOUNT.accountId2,
    storageId: storageId.offchainId,
    token: {
      tokenId: TOKEN_INFO.tokenMap.LRC.tokenId,
      volume: LOOPRING_EXPORTED_ACCOUNT.tradeLRCValue.toString(),
    },
    maxFee: {
      tokenId: TOKEN_INFO.tokenMap["LRC"].tokenId,
      volume: fee.fees["LRC"].fee ?? "9400000000000000000",
    },
    validUntil: LOOPRING_EXPORTED_ACCOUNT.validUntil,
  },
  web3,
  chainId: sdk.ChainId.GOERLI,
  walletType: sdk.ConnectorNames.Trezor,
  eddsaKey: eddsaKey.sk,
  apiKey: apiKey,
});
console.log("transferResult:", transferResult);
```