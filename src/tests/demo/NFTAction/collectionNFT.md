# Collection NFT

Definition: allow user create a NFT Collection with different Contract(token) address.

- allow user mint the NFTs with collection
- when collection deployed, NFTs will have different Contract(token) address in layer1
- Loopring own collection on L2, allow user to view/edit their Collection information.
- will soon enable the "Import Collection" to manage legacy NFTs

***

##Create Collection
```ts
const eddsaKey = await signatureKeyPairMock(accInfo);
const {apiKey} = await LoopringAPI.userAPI.getUserApiKey(
 { accountId: accInfo.accountId,},
 eddsaKey.sk
);
const response = await LoopringAPI.userAPI.submitNFTCollection({
	name: 'XXX' + Date.now(), //required, one account is not able to multiple
	tileUri: 'ipfs://QmaNZ2FCgvBPqnxtkbToVVbK2Nes6xk5K4Ns6BsmkPucAM', //required
	description: 'test',
	owner: mockData.accInfo.owner,
	avatar: 'ipfs://QmaNZ2FCgvBPqnxtkbToVVbK2Nes6xk5K4Ns6BsmkPucAM',
	banner: 'ipfs://QmaNZ2FCgvBPqnxtkbToVVbK2Nes6xk5K4Ns6BsmkPucAM',
	nftFactory: NFTFactory_Collection[LOOPRING_EXPORTED_ACCOUNT.chainId as ChainId ]},
	LOOPRING_EXPORTED_ACCOUNT.chainId as ChainId,
	mockData.apiKey,
	mockData.eddsaKey.sk)
console.log('createCollection', response)

```

## getUserNFFByCollection
```ts
const response = await LoopringAPI.userAPI
	.getUserNFTCollection(
		{
			accountId: mockData.accInfo.accountId.toString(),
			limit: 24,
			offset: 0,
		},
		mockData.apiKey
	)
	.catch((_error) => {
		throw _error;
	});
console.log("getUserNFFByCollection", response);

```

## getUserOwnCollection (User own create Collection)
```ts
const response = await LoopringAPI.userAPI
  .getUserOwenCollection(
    {
      owner: mockData.accInfo.owner,
      limit: 24,
      offset: 0,
      tokenAddress: undefined,
      isMintable: false, //false
    },
    mockData.apiKey
  )
  .catch((_error) => {
    throw _error;
  });
console.log("getUserNFFByCollection", response);

```

## getUserNFTCollection  (User asset NFT's Collections)
```ts 
const response = await LoopringAPI.userAPI
  .getUserNFTCollection({
    tokenAddress: contract, // option
    collectionId: id, // option
    accountId:  mockData.accInfo.accountId,
    limit: 20,
    offset:10,
  }, mockData.apiKey)

```

## getCollectionWholeNFTs
```ts
const response = await LoopringAPI.nftAPI.getCollectionWholeNFTs({
  id: 279,
  offset: 0,
  limit: 24,
  metadata: true,
});
console.log("getCollectionWholeNFTs", response);
```