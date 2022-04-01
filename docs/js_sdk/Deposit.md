# Deposit

- [ETH](#1-let-start-from-eth)
  - [step1: get eth balance](#step1-getuser-layer1-eth-balance) 
  - [step2: deposit](#step2-deposit) 
- [ERC20](#2-erc20-token-such-as-lrc)
  - [step1: get eth & token balance](#step1-getuser-layer1-eth--tokenbalances-balance)
  - [step2: check Approval](#step2-allow-and-approve-loopring-to-get-transaction-those-token-access)
  - [step3: deposit](#step3-deposit)
- [NFT](#3-nft)
  - [step1: get eth & NFT balance](#step1-getuser-layer1-eth--nft-balance)
  - [step2: check Approval](#step2-allow-and-approve-loopring-to-get-transaction-for-this-nft-tokenaddress)
  - [step3: deposit](#step3-deposit)
- [Additional & Reference](#additional--reference)
  - [Approve Simple Signature Demo](#approve-simple-signature-demo)
  - [Deposit Signature  Demo](#deposit-signature-demo-fee-is-pay-by-eth-only-current-fee-is-0)

> **All Deposit Method, User should have enough `ETH` pay for the >Ethereum Gas (Loopring have no charge, no fee for Deposit).**

MockData & Initialize APIs [JS SDK Introduction](./INTRO.md)

SDK: [Deposit & DepositNFT](https://github.com/Loopring/loopring_sdk/tree/master/src/tests/demo/deposit)

***

## 1. Let start from ETH

#### Step1️⃣: getUser Layer1 ETH balance

```ts
const {ethBalance} = await LoopringAPI.exchangeAPI.getEthBalances({owner: LOOPRING_EXPORTED_ACCOUNT.address});
```

SDK: [Layer1_ETH_Balance](https://github.com/Loopring/loopring_sdk/blob/master/src/tests/demo/account/account.test.ts)

#### Step2️⃣: Deposit

```ts
const nonce = await LoopringAPI.contractAPI.getNonce(
  web3,
  LOOPRING_EXPORTED_ACCOUNT.address
);
const response = await LoopringAPI.contractAPI.deposit(
  web3,
  LOOPRING_EXPORTED_ACCOUNT.address,
  LOOPRING_EXPORTED_ACCOUNT.exchangeAddress, // {exchangeInfo} = getExchangeInfo()  exchangeInfo.exchangeAddress
  TOKEN_INFO.tokenMap.ETH,
  0.1, // tradeValue
  0, // fee 0
  gasPrice,
  gasLimit,
  ChainId.GOERLI,
  nonce,
  true
);
```

***

## 2. ERC20 Token (Such as LRC)

#### Step1️⃣: getUser Layer1 ETH & tokenBalances balance

```ts
const {ethBalance} = await LoopringAPI.exchangeAPI.getEthBalances({owner: LOOPRING_EXPORTED_ACCOUNT.address});
const {tokenArr} = LoopringAPI.exchangeAPI.getMixMarkets()
const {tokenBalances} = await LoopringAPI.exchangeAPI.getTokenBalances({
  owner: LOOPRING_EXPORTED_ACCOUNT.address,
  token: tokenArr
})
const tokenBalance = tokenBalances.get(tokenArr[0]);
```

SDK: [Layer1_ERC20_Balance](https://github.com/Loopring/loopring_sdk/blob/master/src/tests/demo/account/account.test.ts)
[getMixMarkets](https://github.com/Loopring/loopring_sdk/blob/master/src/tests/demo/exchange/exchange.test.ts)

#### Step2️⃣: Allow and Approve Loopring to get transaction those Token access

    - check Allowances
    - nonce web3.eth.getTransactionCount
    - LoopringAPI.contractAPI.approveMax

```ts
const tokenAddress = TOKEN_INFO.tokenMap.LRC.address;
const {tokenAllowances} = await LoopringAPI.exchangeAPI.getAllowances({
  owner: LOOPRING_EXPORTED_ACCOUNT.address,
  token: [tokenAddress],
}
if (!tokenAllowances.has(tokenAddress) || tokenAllowances.get(tokenAddress) < LOOPRING_EXPORTED_ACCOUNT.tradeLRCValue) {
  const nonce = await LoopringAPI.contractAPI.getNonce(
    web3,
    LOOPRING_EXPORTED_ACCOUNT.address
  );
  const response = await LoopringAPI.contractAPI.approveMax(
    web3,
    LOOPRING_EXPORTED_ACCOUNT.address,
    tokenAddress, // LRC address  {tokenIdMap} = getTokens();  tokenIdMap['LRC']
    LOOPRING_EXPORTED_ACCOUNT.depositAddress, //{exchangeInfo} = getExchangeInfo()  exchangeInfo.depositAddress
    LOOPRING_EXPORTED_ACCOUNT.gasPrice,
    LOOPRING_EXPORTED_ACCOUNT.gasLimit,
    ChainId.GOERLI,
    nonce,
    true
  );
}
```

SDK: [getAllowances](https://github.com/Loopring/loopring_sdk/blob/master/src/tests/demo/account/account.test.ts)

#### Step3️⃣️: Deposit

```ts
const nonce = await LoopringAPI.contractAPI.getNonce(
  web3,
  LOOPRING_EXPORTED_ACCOUNT.address
);
const response = await LoopringAPI.contractAPI.deposit(
  web3,
  LOOPRING_EXPORTED_ACCOUNT.address,
  LOOPRING_EXPORTED_ACCOUNT.exchangeAddress, // {exchangeInfo} = getExchangeInfo()  exchangeInfo.exchangeAddress
  TOKEN_INFO.tokenMap.LRC,
  10, // tradeValue
  0, // fee 0
  gasPrice,
  gasLimit,
  ChainId.GOERLI,
  nonce,
  true
);
```

***

## 3. NFT

    - Prepare Token Address `nftTokenAddress`
    - NFT ID `nftId`
    - Know NFT Type `ERC721` or `ERC1155`

#### Step1️⃣: getUser Layer1 ETH & NFT balance

```ts
const {ethBalance} = await LoopringAPI.exchangeAPI.getEthBalances({owner: LOOPRING_EXPORTED_ACCOUNT.address});
const response = await LoopringAPI.nftAPI.getNFTBalance({
  web3,
  account: LOOPRING_EXPORTED_ACCOUNT.address,
  tokenAddress: LOOPRING_EXPORTED_ACCOUNT.nftTokenAddress,
  nftId: LOOPRING_EXPORTED_ACCOUNT.nftId,
  nftType: sdk.NFTType.ERC1155,
});
```

SDK: [Layer1_getNFTBalance](https://github.com/Loopring/loopring_sdk/blob/master/src/tests/demo/account/account.test.ts)

#### Step2️⃣: Allow and Approve Loopring to get transaction for this NFT TokenAddress

    - check nft isApprovedForAll
    - nonce web3.eth.getTransactionCount
    - contract.approveNFT (ALL) by nftTokenAddress

 ```ts
const isApproved = await LoopringAPI.nftAPI.isApprovedForAll({
  web3,
  from: LOOPRING_EXPORTED_ACCOUNT.address,
  exchangeAddress: LOOPRING_EXPORTED_ACCOUNT.exchangeAddress, //{exchangeInfo} = getExchangeInfo()  exchangeInfo.exchangeAddress
  nftType: NFTType.ERC1155,
  tokenAddress: nftTokenAddress,
});
if (!isApproved) {
  const nonce = await LoopringAPI.contractAPI.getNonce(
    web3,
    LOOPRING_EXPORTED_ACCOUNT.address
  );
  const response = await LoopringAPI.nftAPI.approveNFT({
    web3,
    from: LOOPRING_EXPORTED_ACCOUNT.address,
    depositAddress,
    tokenAddress: LOOPRING_EXPORTED_ACCOUNT.nftTokenAddress,
    tokenId: LOOPRING_EXPORTED_ACCOUNT.nftId,
    nftType: NFTType.ERC1155,
    gasPrice,
    gasLimit,
    chainId: ChainId.GOERLI,
    nonce,
    approved: true,
    sendByMetaMask: true,
  });
}

 ```

#### Step3️⃣: Deposit

```ts
const nonce = await LoopringAPI.contractAPI.getNonce(
  web3,
  LOOPRING_EXPORTED_ACCOUNT.address
);

const response = await LoopringAPI.nftAPI.depositNFT({
  web3,
  from: LOOPRING_EXPORTED_ACCOUNT.address,
  exchangeAddress: LOOPRING_EXPORTED_ACCOUNT.exchangeAddress,
  nftType: sdk.NFTType.ERC1155,
  tokenAddress: LOOPRING_EXPORTED_ACCOUNT.nftTokenAddress,
  nftId: LOOPRING_EXPORTED_ACCOUNT.nftId,
  amount: 1,
  gasPrice: LOOPRING_EXPORTED_ACCOUNT.gasPrice,
  gasLimit: LOOPRING_EXPORTED_ACCOUNT.gasLimit,
  chainId: sdk.ChainId.GOERLI,
  nonce,
  sendByMetaMask: true,
});
```

***

## Additional & Reference

#### Approve Simple Signature Demo

For more detail about genERC{XXX}Data please
read [Contract ABI Specification](//https://docs.soliditylang.org/en/develop/abi-spec.html#)

```ts 
/* ERC20 Approve Data structure */
const data = genERC20Data(ERC20Method.Approve, {
  _spender: depositAddress,
  _value: "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",
});
/* NFT setApprovalForAll Data structure */
// if (nftType === NFTType.ERC1155) {
//    data = this._genERC1155Data(NFTMethod.setApprovalForAll, {
//       operator: depositAddress,
//       approved,
//    });
// } else if (nftType === NFTType.ERC721) {
//    //TODO list not support now
//    data = this._genERC721Data(NFTMethod.setApprovalForAll, {
//       operator: depositAddress,
//       approved,
//    });
// }
const gasPrice = fm.fromGWEI(gasPrice).toNumber();
web3.eth.sendTransaction({
  from: LOOPRING_EXPORTED_ACCOUNT.address,
  to: depositAddress, //{exchangeInfo} = getExchangeInfo()  exchangeInfo.depositAddress    
  value: "0",
  data,
  chainId,
  nonce,
  gasPrice,
  gasLimit,
}).then((_error, transactionHash: string) => {
  if (!err) {
    resolve({result: transactionHash});
  } else {
    resolve({error: {message: err.message}});
  }
});
```

### Deposit Signature Demo (fee is pay by ETH only current fee is 0)

- tokenSymbol is ETH, sendTransaction value should be `amount + fee`
- Other tokenSymbol as LRC sendTransaction value is `fee`
- `fee` is pay by ETH only  (current fee is 0)

```ts
const tokenAddress = "0x?????????";
const tokenSymbol = "LRC";
const fee = 0;
/* tokenSymbol is ETH, sendTransaction value should be `amount + fee` (current fee is 0)
 * other tokenSymbol as LRC addresss valueC is fee (current fee is 0)
 */
const value = tokenSymbol === "ETH" ? amount + fee : fee;
const data = genExchangeData(ERC20Method.Deposit, {
  tokenAddress,
  amount,
  from,
  to: from,
  extraData: "",
});
/* NFT deposit Data structure */
// const data = genExchangeData(NFTMethod.depositNFT, {
//   from,
//   to: from,
//   nftType,
//   tokenAddress,
//   nftId,
//   amount,
//   extraData: extraData ? extraData : "",
// });
web3.eth.sendTransaction({
  from: LOOPRING_EXPORTED_ACCOUNT.address,
  to: LOOPRING_EXPORTED_ACCOUNT.exchangeAddress, //{exchangeInfo} = getExchangeInfo()  exchangeInfo.depositAddress
  value,
  data,
  chainId,
  nonce,
  gasPrice,
  gasLimit,
}).then((_error, transactionHash: string) => {
  if (!err) {
    resolve({result: transactionHash});
  } else {
    resolve({error: {message: err.message}});
  }
});

return await sendRawTx(
  web3,
  from,
  LOOPRING_EXPORTED_ACCOUNT.exchangeAddress,
  valueC.toFixed(),
  data,
  chainId,
  nonce,
  gasPrice,
  gasLimit,
  sendByMetaMask
);

```

last but not least, waiting and check your layer 2 account Balance... start Layer2

#### Reference

- @Loopring-web/web3-provider Package & [DEMO](https://github.com/Loopring/web3-provider)
- Loopring allow you directory dev with our [APIs](https://docs.loopring.io/en/)
- For your Web-app & Dapp welcome use our [JS SDK](https://loopring.github.io/loopring_sdk)
