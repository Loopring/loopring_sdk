# Deposit

- [Step1: getUserLayer2balance](#step1-getuserlayer2balance)
  - [ERC20](#1erc20)
  - [NFT](#3-nft)
- [Step2: Allow and Approve Loopring to get transaction those Token access](#step2️⃣-allow-and-approve-loopring-to-get-transaction-those-token-access)
  - [ERC20](#2-erc20-token-such-as-lrc-1)
  - [NFT](#3-nft-1)
- [Step3: Deposit](#step3️⃣-deposit)
  - [ETH](#1-eth-same-as-erc20-only-can-not-deposit-all-for-gas-cost)
  - [ERC20](#2-erc20-token-such-as-lrc-2)
  - [NFT](#3-nft-2)
- [Additional & Reference](#additional--reference)
  - [Approve Simple Signature Demo](#approve-simple-signature-demo)
  - [Deposit Signature  Demo](#deposit-signature-demo-fee-is-pay-by-eth-only-current-fee-is-0)

> **All Deposit Method, User should have enough `ETH` pay for the >Ethereum Gas (Loopring have no charge, no fee for Deposit).**

MockData & Initialize APIs [JS SDK Introduction](./INTRO.md)


***

### Step1️⃣: getUserLayer2balance 

### 1.ERC20
```ts
const {userBalances} = await LoopringAPI.userAPI.getUserBalances({owner: LOOPRING_EXPORTED_ACCOUNT.address, apikey});
```

SDK: [getUserBalances](https://github.com/Loopring/loopring_sdk/tree/master/src/api/user_api.ts#L408)
API: [getUserLayer2balance](https://uat2.loopring.io/api/v3/user/balances?accountId=12454)

#### 2. ERC20 Token (Such as LRC)

```ts
const {ethBalance} = await LoopringAPI.exchangeAPI.getEthBalances({owner: LOOPRING_EXPORTED_ACCOUNT.address});
const {tokenArr} = LoopringAPI.exchangeAPI.getMixMarkets()
const {tokenBalances} = await LoopringAPI.exchangeAPI.getTokenBalances({
  owner: LOOPRING_EXPORTED_ACCOUNT.address,
  token: tokenArr
})
const tokenBalance = tokenBalances.get(tokenArr[0]);
```

SDK: [getTokenBalances](https://github.com/Loopring/loopring_sdk/tree/master/src/api/exchange_api.ts#L543)
API: [/api/v3/eth/tokenBalances](https://uat2.loopring.io/api/v3/eth/tokenBalances?owner=0xfF7d59D9316EBA168837E3eF924BCDFd64b237D8&token=0xfc28028d9b1f6966fe74710653232972f50673be%2C0x0000000000000000000000000000000000000000%2C0xd4e71c4bb48850f5971ce40aa428b09f242d3e8a%2C0xcd2c81b322a5b530b5fa3432e57da6803b0317f7%2C0x47525e6a5def04c9a56706e93f54cc70c2e8f165)

SDK:[getMixMarkets](https://github.com/Loopring/loopring_sdk/tree/master/src/api/exchange_api.ts#L409)
API:[/api/v3/mix/markets](https://api.loopring.network/api/v3/mix/markets)

#### 3. NFT

- Prepare Token Address `nftTokenAddress`
- NFT ID `nftId`
- Know NFT Type `ERC721` or `ERC1155`

```ts
const response = await LoopringAPI.nftAPI.getNFTBalance({
  web3,
  account: LOOPRING_EXPORTED_ACCOUNT.address,
  tokenAddress: LOOPRING_EXPORTED_ACCOUNT.nftTokenAddress,
  nftId: LOOPRING_EXPORTED_ACCOUNT.nftId,
  nftType: NFTType.ERC1155,
});
```  

SDK: [getNFTBalance](https://github.com/Loopring/loopring_sdk/tree/master/src/api/nft_api.ts#L100)
***

### Step2️⃣: Allow and Approve Loopring to get transaction those Token access

#### 1. ETH Skip this step

#### 2. ERC20 Token (Such as LRC )

    - check Allowances
    - getNonce web3.eth.getTransactionCount
    - contract.approveMax

```ts
const tokenAddress = TOKEN_INFO.tokenMap.LRC.address;
const {tokenAllowances} = await LoopringAPI.exchangeAPI.getAllowances({
  owner: LOOPRING_EXPORTED_ACCOUNT.address,
  token: [tokenAddress],
})
if (!tokenAllowances.has(tokenAddress) || tokenAllowances.get(tokenAddress) < LOOPRING_EXPORTED_ACCOUNT.tradeLRCValue) {
  const nonce = await web3.eth.getTransactionCount(LOOPRING_EXPORTED_ACCOUNT.address);
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

SDK:[getAllowances](https://github.com/Loopring/loopring_sdk/tree/master/src/api/exchange_api.ts#L583)
API:[/api/v3/eth/allowances](https://uat2.loopring.io/api/v3/eth/allowances?owner=0xfF7d59D9316EBA168837E3eF924BCDFd64b237D8&token=0xfc28028d9b1f6966fe74710653232972f50673be)    
SDK:[getExchangeInfo](https://github.com/Loopring/loopring_sdk/tree/master/src/api/exchange_api.ts#L624)
API:[/api/v3/exchange/info](https://uat2.loopring.io/api/v3/exchange/info)   
SDK:[getTokens](https://github.com/Loopring/loopring_sdk/tree/master/src/api/exchange_api.ts#L416)
API:[/apiv3/exchange/tokens](https://uat2.loopring.io/api/v3/exchange/tokens)   
SDK:[approveMax](https://github.com/Loopring/loopring_sdk/tree/master/src/api/contract_api.ts#L271)

[Approve Signature Demo](#approve-simple-signature-demo)

#### 3. NFT

- check nft isApprovedForAll
- getNonce web3.eth.getTransactionCount
- contract.approveNFT (ALL) by nftTokenAddress

 ```ts
const isApproved = await LoopringAPI.nftAPI.isApprovedForAll({
  web3,
  from: LOOPRING_EXPORTED_ACCOUNT.address,
  exchangeAddress: exchangeAddr, //{exchangeInfo} = getExchangeInfo()  exchangeInfo.exchangeAddr
  nftType: NFTType.ERC1155,
  tokenAddress: nftTokenAddress,
});
if (!isApproved) {
  const nonce = await web3.eth.getTransactionCount(LOOPRING_EXPORTED_ACCOUNT.address);
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

SDK:[isApprovedForAll](https://github.com/Loopring/loopring_sdk/tree/master/src/api/nft_api.ts#L312)    
SDK:[approveNFT](https://github.com/Loopring/loopring_sdk/tree/master/src/api/nft_api.ts#L235)

[Approve Signature Demo](#approve-simple-signature-demo)

***

### Step3️⃣: Deposit

#### 1. ETH  (Same as ERC20, only can not deposit all for Gas cost)

#### 2. ERC20 Token (Such as LRC )

```ts
const nonce = await web3.eth.getTransactionCount(LOOPRING_EXPORTED_ACCOUNT.address);
const response = await LoopringAPI.contractAPI.deposit(
  web3,
  LOOPRING_EXPORTED_ACCOUNT.address,
  LOOPRING_EXPORTED_ACCOUNT.exchangeAddr, // {exchangeInfo} = getExchangeInfo()  exchangeInfo.exchangeAddr
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

SDK:[deposit](https://github.com/Loopring/loopring_sdk/tree/master/src/api/contract_api.ts#L300)

[Deposit Signature Demo](#deposit-signature-demo-fee-is-pay-by-eth-only-current-fee-is-0)

#### 3. NFT

```ts
const nonce = await web3.eth.getTransactionCount(LOOPRING_EXPORTED_ACCOUNT.address);
const response = await LoopringAPI.nftAPI.depositNFT({
    web3,
    from: LOOPRING_EXPORTED_ACCOUNT.address,
    exchangeAddress::exchangeAddr, //{exchangeInfo} = getExchangeInfo()  exchangeInfo.exchangeAddr
    nftType: NFTType.ERC1155,
    tokenAddress: nftTokenAddress,
    amount: 1,
    gasPrice: LOOPRING_EXPORTED_ACCOUNT.gasPrice,
    gasLimit: LOOPRING_EXPORTED_ACCOUNT.gasLimit,
    chainId: ChainId.GOERLI,
    nonce,
    sendByMetaMask: true
  }
);
```

SDK:[depositNFT](https://github.com/Loopring/loopring_sdk/tree/master/src/api/nft_api.ts#L354)

[Deposit Signature Demo](#deposit-signature-demo-fee-is-pay-by-eth-only-current-fee-is-0)


***

### Additional & Reference

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
  to: exchangeAddress, //{exchangeInfo} = getExchangeInfo()  exchangeInfo.depositAddress
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
  exchangeAddress,
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
