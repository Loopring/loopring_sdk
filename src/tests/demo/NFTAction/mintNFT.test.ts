import {
  DEFAULT_TIMEOUT,
  LOOPRING_EXPORTED_ACCOUNT,
  LoopringAPI,
  web3,
  TOKEN_INFO,
  signatureKeyPairMock,
} from '../../MockData'
import * as sdk from '../../../index'
import { CollectionMeta, NFTCounterFactualInfo } from '../../../defs'
const mockData = {
  nftTokenAddress: '0xfc26d5b9277f4375ba8ff7d4708f4dbf78954124',
}
/**
 * !!!important  describe
 * Follow mehod is the simple way for mint NTF, but this kind of NFT will using the same contact & with no Contract metadata forever on L1,
 * New Version of NFT will has it isolate Contract/colletion with metadata information
 * From Step 3. nftTokenAddress please follow create `collectionNFT` step create collection(contract), the api will return follow info for mint NFT
 * tokenAddress: collectionMeta.contractAddress,
 * counterFactualNftInfo: {
 *  nftOwner: ccInfo.owner,
 *  nftFactory: collectionMeta.nftFactory ?? sdk.NFTFactory_Collection[chainId],
 *  nftBaseUri: collectionMeta?.baseUri ?? "",
 * },
 **/
describe('mintNFT', function () {
  it(
    'submitNFTMint',
    async () => {
      // Step 1. getAccount
      const { accInfo } = await LoopringAPI.exchangeAPI.getAccount({
        owner: LOOPRING_EXPORTED_ACCOUNT.address,
      })
      console.log('accInfo:', accInfo)

      // Step 2. eddsaKey
      const eddsaKey = await signatureKeyPairMock(accInfo)
      console.log('eddsaKey:', eddsaKey.sk)

      // Step 3. apiKey
      const { apiKey } = await LoopringAPI.userAPI.getUserApiKey(
        {
          accountId: accInfo.accountId,
        },
        eddsaKey.sk,
      )
      console.log('apiKey:', apiKey)

      // Step 3. nftTokenAddress
      const counterFactualNftInfo = {
        nftOwner: accInfo.owner,
        nftFactory: LOOPRING_EXPORTED_ACCOUNT.uatNFTFactory,
        nftBaseUri: '',
      }
      const nftTokenAddress =
        LoopringAPI.nftAPI.computeNFTAddress(counterFactualNftInfo).tokenAddress || ''
      console.log('nftTokenAddress', nftTokenAddress)

      // Step 4. fee
      const fee = await LoopringAPI.userAPI.getNFTOffchainFeeAmt(
        {
          accountId: accInfo.accountId,
          tokenAddress: nftTokenAddress,
          requestType: sdk.OffchainNFTFeeReqType.NFT_MINT,
        },
        apiKey,
      )

      // Step 5. storageId
      const storageId = await LoopringAPI.userAPI.getNextStorageId(
        {
          accountId: accInfo.accountId,
          sellTokenId: TOKEN_INFO.tokenMap['LRC'].tokenId,
        },
        apiKey,
      )

      // Step 7. Mint
      const response = await LoopringAPI.userAPI.submitNFTMint(
        {
          request: {
            exchange: LOOPRING_EXPORTED_ACCOUNT.exchangeAddress,
            minterId: accInfo.accountId,
            minterAddress: accInfo.owner,
            toAccountId: accInfo.accountId,
            toAddress: accInfo.owner,
            nftType: 0,
            tokenAddress: nftTokenAddress, // please read the description -> tokenAddress: collectionMeta.contractAddress,
            nftId: LOOPRING_EXPORTED_ACCOUNT.nftId, //nftId.toString(16),
            amount: '1',
            validUntil: LOOPRING_EXPORTED_ACCOUNT.validUntil,
            storageId: storageId.offchainId ?? 9,
            maxFee: {
              tokenId: TOKEN_INFO.tokenMap['LRC'].tokenId,
              amount: fee.fees['LRC'].fee ?? '9400000000000000000',
            },
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
        },
        { _noEcdsa: true },
      )

      console.log(response)
    },
    DEFAULT_TIMEOUT * 3,
  )

  //Suggest use this function
  it(
    'submitNFTMintWithCollection',
    async () => {
      // Step 1. getAccount
      const { accInfo } = await LoopringAPI.exchangeAPI.getAccount({
        owner: LOOPRING_EXPORTED_ACCOUNT.address,
      })
      console.log('accInfo:', accInfo)

      // Step 2. eddsaKey
      const eddsaKey = await signatureKeyPairMock(accInfo)
      console.log('eddsaKey:', eddsaKey.sk)

      // Step 3. apiKey
      const { apiKey } = await LoopringAPI.userAPI.getUserApiKey(
        {
          accountId: accInfo.accountId,
        },
        eddsaKey.sk,
      )
      console.log('apiKey:', apiKey)

      // Step 4. storageId
      const storageId = await LoopringAPI.userAPI.getNextStorageId(
        {
          accountId: accInfo.accountId,
          sellTokenId: TOKEN_INFO.tokenMap['LRC'].tokenId, // same as maxFee tokenId
        },
        apiKey,
      )

      // Step 5. get collection Information(tokenAddress)
      const collectionRes = await LoopringAPI.userAPI.getUserOwenCollection(
        {
          owner: accInfo.owner,
          tokenAddress: mockData.nftTokenAddress,
          isMintable: true,
        },
        apiKey,
      )
      if (
        (collectionRes &&
          ((collectionRes as sdk.RESULT_INFO).code ||
            (collectionRes as sdk.RESULT_INFO).message)) ||
        !collectionRes.collections.length
      ) {
        console.log('Collection is disable to mint ')
        throw 'Collection is disable to mint '
      }

      const collectionMeta = (collectionRes as any).collections[0] as CollectionMeta

      const counterFactualNftInfo: NFTCounterFactualInfo = {
        nftOwner: accInfo.owner,
        nftFactory: collectionMeta.nftFactory ?? sdk.NFTFactory_Collection[sdk.ChainId.GOERLI],
        nftBaseUri: collectionMeta.baseUri,
      }

      // Step 6. fee
      const fee = await LoopringAPI.userAPI.getNFTOffchainFeeAmt(
        {
          accountId: accInfo.accountId,
          tokenAddress: collectionMeta.contractAddress,
          requestType: sdk.OffchainNFTFeeReqType.NFT_MINT,
        },
        apiKey,
      )

      // Step 7. Mint
      const response = await LoopringAPI.userAPI.submitNFTMint({
        request: {
          exchange: LOOPRING_EXPORTED_ACCOUNT.exchangeAddress,
          minterId: accInfo.accountId,
          minterAddress: accInfo.owner,
          toAccountId: accInfo.accountId,
          toAddress: accInfo.owner,
          nftType: 0,
          tokenAddress: collectionMeta.contractAddress,
          nftId: LOOPRING_EXPORTED_ACCOUNT.nftId, //nftId.toString(16),
          amount: '1',
          validUntil: LOOPRING_EXPORTED_ACCOUNT.validUntil,
          storageId: storageId.offchainId ?? 9,
          maxFee: {
            tokenId: TOKEN_INFO.tokenMap['LRC'].tokenId,
            amount: fee.fees['LRC'].fee ?? '9400000000000000000',
          },
          counterFactualNftInfo,
          royaltyPercentage: 5,
          forceToMint: true, // suggest use as false, for here is just for run test
        },
        web3,
        chainId: sdk.ChainId.GOERLI,
        walletType: sdk.ConnectorNames.Unknown,
        eddsaKey: eddsaKey.sk,
        apiKey: apiKey,
      })

      console.log(response)
    },
    DEFAULT_TIMEOUT * 3,
  )
})
