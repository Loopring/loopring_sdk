# Active Account

Definition: After user Deposit or (Third-Part Transfer), how to active Loopring L2 account.

***

## Step 1. get account info

```ts
const {accInfo} = await LoopringAPI.exchangeAPI.getAccount({
  owner: LOOPRING_EXPORTED_ACCOUNT.address,
});
```

***

## Step 2. use keySeed or CUSTOMER_KEY_SEED generateKeyPair

```ts
const keySeed =
  accInfo.keySeed && accInfo.keySeed !== ""
    ? accInfo.keySeed
    : sdk.BaseAPI.KEY_MESSAGE.replace(
      "${exchangeAddress}",
      LOOPRING_EXPORTED_ACCOUNT.exchangeAddress
    ).replace("${nonce}", accInfo.nonce.toString());
const eddsaKey = await sdk.generateKeyPair({
  web3,
  address: accInfo.owner,
  keySeed,
  walletType: sdk.ConnectorNames.MetaMask,
  chainId: sdk.ChainId.GOERLI,
});
console.log("eddsakey:", eddsaKey.sk);
```

Or

```ts
// CUSTOMER_KEY_SEED = "XXXXXX" + " with key nonce: " + "${nonce}";
const keySeed = CUSTOMER_KEY_SEED.replace(
  "${nonce}",
  accInfo.nonce.toString()
const eddsaKey = await sdk.generateKeyPair({
  web3,
  address: accInfo.owner,
  keySeed,
  walletType: sdk.ConnectorNames.MetaMask,
  chainId: sdk.ChainId.GOERLI,
});
console.log("eddsakey:", eddsaKey.sk);
```

***

## Step 3. get fee

```ts
const fee = await LoopringAPI.globalAPI.getActiveFeeInfo({
  accountId: accInfo.accountId,
});
console.log("fee:", fee);
```  

***

## Step 4. updateAccount (active or rest）

```ts
      const result = await LoopringAPI.userAPI.updateAccount({
  request: {
    exchange: LOOPRING_EXPORTED_ACCOUNT.exchangeAddress,
    owner: accInfo.owner,
    accountId: accInfo.accountId,
    publicKey: {x: eddsaKey.formatedPx, y: eddsaKey.formatedPy},
    maxFee: {
      tokenId: TOKEN_INFO.tokenMap["LRC"].tokenId,
      volume: fee.fees["LRC"].fee ?? "9400000000000000000",
    },
    keySeed,
    validUntil: LOOPRING_EXPORTED_ACCOUNT.validUntil,
    nonce: accInfo.nonce as number,
  },
  web3,
  chainId: sdk.ChainId.GOERLI,
  walletType: sdk.ConnectorNames.Unknown,
  isHWAddr: false,
});

const {accInfo: updateAccountInfo} =
  await LoopringAPI.exchangeAPI.getAccount({
    owner: LOOPRING_EXPORTED_ACCOUNT.address,
  });
console.log(
  "updateAccount Result: ",
  result,
  "updateAccountInfo:",
  updateAccountInfo
);
```