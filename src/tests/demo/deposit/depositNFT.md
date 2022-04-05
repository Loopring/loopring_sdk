# Deposit NFT

Definition: Move user L1 NFT assets to Loopring L2

> **All Deposit Method, User should have enough `ETH` pay for the Ethereum Gas (Loopring have no charge, no fee for Deposit).**


***

## Step 1. getNFTBalance & getEthBalances

```ts
const {ethBalance} = await LoopringAPI.exchangeAPI.getEthBalances({
  owner: LOOPRING_EXPORTED_ACCOUNT.address,
});
const nftBalance = await LoopringAPI.nftAPI.getNFTBalance({
  web3,
  account: LOOPRING_EXPORTED_ACCOUNT.address,
  tokenAddress: LOOPRING_EXPORTED_ACCOUNT.nftTokenAddress,
  nftId: LOOPRING_EXPORTED_ACCOUNT.nftId,
  nftType: sdk.NFTType.ERC1155,
});
```

***

## Step 2. isApprovedForAll

```ts
 const isApprovedForAll = await LoopringAPI.nftAPI.isApprovedForAll({
  web3,
  from: LOOPRING_EXPORTED_ACCOUNT.address,
  exchangeAddress: LOOPRING_EXPORTED_ACCOUNT.exchangeAddress,
  nftType: sdk.NFTType.ERC1155, // todo： sdk.NFTType.ERC721
  tokenAddress: LOOPRING_EXPORTED_ACCOUNT.nftTokenAddress,
});
console.log(`check is approveNFT`, isApprovedForAll);

```

***

## Step 3. approveNFT All

```ts
  if (!isApprovedForAll) {
  const nonce = await sdk.getNonce(
    web3,
    LOOPRING_EXPORTED_ACCOUNT.address
  );
  const approveNFT = await LoopringAPI.nftAPI.approveNFT({
    web3,
    from: LOOPRING_EXPORTED_ACCOUNT.address,
    depositAddress: LOOPRING_EXPORTED_ACCOUNT.depositAddress,
    tokenAddress: LOOPRING_EXPORTED_ACCOUNT.nftTokenAddress,
    nftType: sdk.NFTType.ERC1155, // todo： sdk.NFTType.ERC721
    gasPrice: LOOPRING_EXPORTED_ACCOUNT.gasPrice,
    gasLimit: LOOPRING_EXPORTED_ACCOUNT.gasLimit,
    chainId: sdk.ChainId.GOERLI,
    nonce,
    sendByMetaMask: true,
  });
  console.log(`nonce: ${nonce} approveNFT: ${approveNFT?.result}`);
}
```

***

## Step 3. nonce

```ts
 const nonce = await sdk.getNonce(web3, LOOPRING_EXPORTED_ACCOUNT.address);

console.log(
  `deposit: NFT, gasPrice: ${LOOPRING_EXPORTED_ACCOUNT.gasPrice}, `
);
```

***

## Step 4. depositNFT

```ts
  const response = await LoopringAPI.nftAPI.depositNFT({
  web3,
  from: LOOPRING_EXPORTED_ACCOUNT.address,
  exchangeAddress: LOOPRING_EXPORTED_ACCOUNT.exchangeAddress,
  nftType: sdk.NFTType.ERC1155,   // todo： sdk.NFTType.ERC721
  tokenAddress: LOOPRING_EXPORTED_ACCOUNT.nftTokenAddress,
  nftId: LOOPRING_EXPORTED_ACCOUNT.nftId,
  amount: 2,   // todo：when sdk.NFTType.ERC721  amount: 1,
  gasPrice: LOOPRING_EXPORTED_ACCOUNT.gasPrice,
  gasLimit: LOOPRING_EXPORTED_ACCOUNT.gasLimit + 100000,
  chainId: sdk.ChainId.GOERLI,
  nonce,
  sendByMetaMask: true,
});
console.log(`nonce: ${nonce} deposit NFT ERC1155: `, response);

```
