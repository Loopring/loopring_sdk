# Mint NFT

Definition: Mint Layer2 NFT, Loopring follow the ipfs NFT format, IPFS CID will convert to nftId, please view MetaNFT.md
 
>  <font color="red">!!!important  describe<font>
>  Follow mehod is the simple way for mint NTF, but this kind of NFT will using the same contact & with   no Contract metadata forever on L1, 
>  New Version of NFT will has it isolate Contract/colletion with metadata inforamtion 
>  From Step 3. nftTokenAddress please follow create `collectionNFT` step create collection(contract), the api will return follow info for mint NFT
>  tokenAddress: collectionMeta.contractAddress,
>  counterFactualNftInfo: {
>   nftOwner: ccInfo.owner,
>   nftFactory: collectionMeta.nftFactory ?? sdk.NFTFactory_Collection[chainId],
>   nftBaseUri: collectionMeta?.baseUri ?? "",
>  },

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
const {apiKey} = await LoopringAPI.userAPI.getUserApiKey({
   accountId: accInfo.accountId,
 },
 eddsaKey.sk
);
console.log("apiKey:", apiKey);

```

***

## Step 4. get storageId

```ts
const storageId = await LoopringAPI.userAPI.getNextStorageId(
{
	accountId: accInfo.accountId,
	sellTokenId: TOKEN_INFO.tokenMap[ "LRC" ].tokenId, // same as maxFee tokenId
},
apiKey
);
```

***

## Step 5. get collection Information(tokenAddress)

```ts
const collectionRes = await LoopringAPI.userAPI
	.getUserOwenCollection({
			owner: accInfo.owner,
			tokenAddress: mockData.nftTokenAddress,
			isMintable: true
		},
		apiKey
	)
if ((collectionRes &&
	((collectionRes as sdk.RESULT_INFO).code ||
		(collectionRes as sdk.RESULT_INFO).message)) || !collectionRes.collections.length
) {
	console.log("Collection is disable to mint ");
	throw "Collection is disable to mint ";
}

const collectionMeta = (collectionRes as any).collections[ 0 ] as CollectionMeta;

const counterFactualNftInfo: NFTCounterFactualInfo = {
	nftOwner: accInfo.owner,
	nftFactory: collectionMeta.nftFactory ?? sdk.NFTFactory_Collection[ sdk.ChainId.GOERLI ],
	nftBaseUri: collectionMeta.baseUri,
};

```

***

## Step 6. fee

```ts
const fee = await LoopringAPI.userAPI.getNFTOffchainFeeAmt(
	{
		accountId: accInfo.accountId,
		tokenAddress: collectionMeta.contractAddress,
		requestType: sdk.OffchainNFTFeeReqType.NFT_MINT,
	},
	apiKey
);
```

***

## Step7. Mint

```ts
const response = await LoopringAPI.userAPI.submitNFTMint({
	request: {
		exchange: LOOPRING_EXPORTED_ACCOUNT.exchangeAddress,
		minterId: accInfo.accountId,
		minterAddress: accInfo.owner,
		toAccountId: accInfo.accountId,
		toAddress: accInfo.owner,
		nftType: 0,
		tokenAddress: nftTokenAddress, // please read the description -> tokenAddress: collectionMeta.contractAddress,
		nftId: LOOPRING_EXPORTED_ACCOUNT.nftId, //nftId.toString(16),
		amount: "1",
		validUntil: LOOPRING_EXPORTED_ACCOUNT.validUntil,
		storageId: storageId.offchainId ?? 9,
		maxFee: {
			tokenId: TOKEN_INFO.tokenMap[ "LRC" ].tokenId,
			amount: fee.fees[ "LRC" ].fee ?? "9400000000000000000",
		},
		counterFactualNftInfo,
		royaltyPercentage: 5,
		forceToMint: true, // suggest use as false, for here is just for run test
	        // please read the description
	        // counterFactualNftInfo: {
	        //  nftOwner: ccInfo.owner,
	        //  nftFactory: collectionMeta.nftFactory ?? sdk.NFTFactory_Collection[chainId],
	        //  nftBaseUri: collectionMeta?.baseUri ?? "",
	        // },
	},
	web3,
	chainId: sdk.ChainId.GOERLI,
	walletType: sdk.ConnectorNames.Unknown,
	eddsaKey: eddsaKey.sk,
	apiKey: apiKey,
});
```

____

### ps: Mint with legacy nftFactory

<font color='red'>! Mint NFT from this way has no collection information at deploy contract(tokenAdress is
unique)</font>
***

#### Step 1,2,3,4 is same logic

#### Step 5. get tokenAddress

```ts
const counterFactualNftInfo = {
	nftOwner: accInfo.owner,
	nftFactory: sdk.NFTFactory[ sdk.ChainId.GOERLI ],
	nftBaseUri: "",
};
const nftTokenAddress =
	LoopringAPI.nftAPI.computeNFTAddress(counterFactualNftInfo)
		.tokenAddress || "";
console.log("nftTokenAddress", nftTokenAddress);
```

***

#### Step 6. get fee

```ts
 const fee = await LoopringAPI.userAPI.getNFTOffchainFeeAmt(
	{
		accountId: accInfo.accountId,
		tokenAddress: nftTokenAddress,
		requestType: sdk.OffchainNFTFeeReqType.NFT_MINT,
	},
	apiKey
);
```

#### Step 7. Mint

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
			tokenId: TOKEN_INFO.tokenMap[ "LRC" ].tokenId,
			amount: fee.fees[ "LRC" ].fee ?? "9400000000000000000",
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
