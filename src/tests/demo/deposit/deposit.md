# Deposit ERC20

Definition: Move user L1 ERC20 assets to Loopring L2
> **All Deposit Method, User should have enough `ETH` pay for the Ethereum Gas (Loopring have no charge, no fee for Deposit).**

Provider will give the Gas Price & Limit, sdk also have a method get gasPrice:
`const gasPrice = (await LoopringAPI.exchangeAPI.getGasPrice() ).gasPrice;`

# ETH

***

## Step 1. getNonce

```ts
const nonce = await sdk.getNonce(web3, LOOPRING_EXPORTED_ACCOUNT.address);
console.log(
  `deposit: ${TOKEN_INFO.tokenMap.ETH.symbol}-${LOOPRING_EXPORTED_ACCOUNT.tradeETHValue}, gasPrice: ${LOOPRING_EXPORTED_ACCOUNT.gasPrice}, `
);
```

***

## Step 2. deposit

```ts
const response = await sdk.deposit(
  web3,
  LOOPRING_EXPORTED_ACCOUNT.address,
  LOOPRING_EXPORTED_ACCOUNT.exchangeAddress,
  TOKEN_INFO.tokenMap.ETH,
  LOOPRING_EXPORTED_ACCOUNT.tradeETHValue,
  0,
  LOOPRING_EXPORTED_ACCOUNT.gasPrice,
  LOOPRING_EXPORTED_ACCOUNT.gasLimit,
  sdk.ChainId.GOERLI,
  nonce,
  true
);

console.log(`nonce: ${nonce} deposit_ETH: `, response);
```

# ERC20

***

## Step 1. getAllowances

```ts
const {tokenAllowances} = await LoopringAPI.exchangeAPI.getAllowances({
  owner: LOOPRING_EXPORTED_ACCOUNT.address,
  token: [TOKEN_INFO.tokenMap.LRC.address],
});
if (
  tokenAllowances.has(TOKEN_INFO.tokenMap.LRC.address) &&
  Number(tokenAllowances.get(TOKEN_INFO.tokenMap.LRC.address)) <
  LOOPRING_EXPORTED_ACCOUNT.tradeLRCValue
) {
  const nonce = await web3.eth.getTransactionCount(
    LOOPRING_EXPORTED_ACCOUNT.address
  );
  await sdk.approveMax(
    web3,
    LOOPRING_EXPORTED_ACCOUNT.address,
    TOKEN_INFO.tokenMap.LRC.address, // LRC address  {tokenIdMap} = getTokens();  tokenIdMap['LRC']
    LOOPRING_EXPORTED_ACCOUNT.depositAddress, //{exchangeInfo} = getExchangeInfo()  exchangeInfo.depositAddress
    LOOPRING_EXPORTED_ACCOUNT.gasPrice,
    LOOPRING_EXPORTED_ACCOUNT.gasLimit,
    sdk.ChainId.GOERLI,
    nonce,
    true
  );
}
```

***

## Step 2. getNonce

```ts
      const nonce = await sdk.getNonce(web3, LOOPRING_EXPORTED_ACCOUNT.address);
console.log(
  `deposit: ${TOKEN_INFO.tokenMap.LRC.symbol}-${LOOPRING_EXPORTED_ACCOUNT.tradeLRCValue}, gasPrice: ${LOOPRING_EXPORTED_ACCOUNT.gasPrice}, `
);
```

***

## Step 3. deposit

```ts
      const response = await sdk.deposit(
  web3,
  LOOPRING_EXPORTED_ACCOUNT.address,
  LOOPRING_EXPORTED_ACCOUNT.exchangeAddress,
  TOKEN_INFO.tokenMap.LRC,
  sdk
    .toBig(LOOPRING_EXPORTED_ACCOUNT.tradeLRCValue)
    .div("1e" + TOKEN_INFO.tokenMap.LRC.decimals)
    .toNumber(),
  0,
  LOOPRING_EXPORTED_ACCOUNT.gasPrice,
  LOOPRING_EXPORTED_ACCOUNT.gasLimit,
  sdk.ChainId.GOERLI,
  nonce,
  true
);

console.log(`nonce: ${nonce}  deposit_LRC: `, response);
```    

