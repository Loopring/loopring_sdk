# NFT META METHODS

***

## getContractNFTMeta

```ts
const result = await LoopringAPI.nftAPI.getContractNFTMeta({
  web3,
  tokenAddress: LOOPRING_EXPORTED_ACCOUNT.nftTokenAddress,
  nftId: LOOPRING_EXPORTED_ACCOUNT.nftId,
  nftType: sdk.NFTType.ERC1155,
});
console.log(result);
```    

***

## getInfoForNFTTokens

```ts
const response = await LoopringAPI.nftAPI.getInfoForNFTTokens({
  nftDatas: [LOOPRING_EXPORTED_ACCOUNT.nftData],
});
console.log(`getInfoForNFTTokens: response: `, JSON.stringify(response));
```

***

## computeNFTAddress

```ts
const response = LoopringAPI.nftAPI.computeNFTAddress({
  nftOwner: "0xE20cF871f1646d8651ee9dC95AAB1d93160b3467",
  nftFactory: "0x40F2C1770E11c5bbA3A26aEeF89616D209705C5D",
});
console.log(
  `computeNFTAddress:`,
  response,
  "0xee354d81778a4c5a08fd9dbeb5cfd01a840a746d"
);
```

***

## ipfsCid0ToNftID

```ts
const ipfs = "QmNuqdeWUJ9iEiw5qZfJ2pJ9onqAS45ZffvV8JQSUzp7DQ";
const nftID =
  "0x0880847b7587968f32ba6c741f9d797d9dc64971979922a80c4e590453b8dc2f";
console.log(
  `ipfsCid0ToNftID: ipfs: `,
  ipfs,
  LoopringAPI.nftAPI.ipfsCid0ToNftID(ipfs)
);
```

*** 

## ipfsNftIDToCid

```ts
const ipfs = "QmNuqdeWUJ9iEiw5qZfJ2pJ9onqAS45ZffvV8JQSUzp7DQ";
const nftID =
  "0x0880847b7587968f32ba6c741f9d797d9dc64971979922a80c4e590453b8dc2f";

console.log(
  `ipfsCid0ToNftID: nftID: `,
  nftID,
  LoopringAPI.nftAPI.ipfsNftIDToCid(nftID)
);
```
 