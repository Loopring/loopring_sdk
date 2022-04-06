# Withdraw ERC20

Definition: Loopring L2 withdraw ERC20 to Ethereum L1,
> trade value should with decimals `sdk.toBig(value).times("1e" + TOKEN_INFO.tokenMap.LRC.decimals)`

***

## Step 1. getAccount

```ts
const {accInfo} = await LoopringAPI.exchangeAPI.getAccount({
  owner: LOOPRING_EXPORTED_ACCOUNT.address,
});
console.log("accInfo:", accInfo);
```

##Step 2.  eddsaKey

```ts
const eddsaKey = await signatureKeyPairMock(accInfo);
console.log("eddsaKey:", eddsaKey.sk);
```

***

## Step 3. apiKey

```ts
const {apiKey} = await LoopringAPI.userAPI.getUserApiKey({
    accountId: accInfo.accountId,
  },
  eddsaKey.sk
);
console.log("apiKey:", apiKey);

```

***

## Step 4. storageId

```ts
const storageId = await LoopringAPI.userAPI.getNextStorageId({
    accountId: accInfo.accountId,
    sellTokenId: TOKEN_INFO.tokenMap["LRC"].tokenId,
  },
  apiKey
);
console.log("storageId:", storageId);

```

***

## Step 5. fee

```ts
const fee = await LoopringAPI.userAPI.getOffchainFeeAmt({
    accountId: accInfo.accountId,
    requestType: sdk.OffchainFeeReqType.OFFCHAIN_WITHDRAWAL,
    tokenSymbol: TOKEN_INFO.tokenMap["LRC"].symbol,
  },
  apiKey
);
console.log("fee:", fee);

```

***

## Step 6. withdraw

```ts
const response = await LoopringAPI.userAPI.submitOffchainWithdraw({
  request: {
    exchange: LOOPRING_EXPORTED_ACCOUNT.exchangeAddress,
    accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
    counterFactualInfo: undefined,
    fastWithdrawalMode: false,
    hashApproved: "",
    maxFee: {
      tokenId: TOKEN_INFO.tokenMap["LRC"].tokenId,
      volume: fee.fees["LRC"].fee ?? "9400000000000000000",
    },
    minGas: 0,
    owner: LOOPRING_EXPORTED_ACCOUNT.address,
    to: LOOPRING_EXPORTED_ACCOUNT.address,
    storageId: 0,
    token: {
      tokenId: TOKEN_INFO.tokenMap.LRC.tokenId,
      volume: LOOPRING_EXPORTED_ACCOUNT.tradeLRCValue.toString(),
    },
    validUntil: 0,
  },
  web3,
  chainId: sdk.ChainId.GOERLI,
  walletType: sdk.ConnectorNames.MetaMask,
  eddsaKey: eddsaKey.sk,
  apiKey,
});
console.log("response:", response);
```