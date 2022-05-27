import {
  DEFAULT_TIMEOUT,
  LOOPRING_EXPORTED_ACCOUNT,
  LoopringAPI,
  web3,
  signatureKeyPairMock,
  web3_2,
  TOKEN_INFO,
} from "../../MockData";
import * as sdk from "../../../index";
import { myLog } from "../../../utils/log_tools";
let mockData: any = {
  takerOrder: undefined,
  takerOrderEddsaSignature: undefined,
  makerOrder: undefined,
  makerOrderEddsaSignature: undefined,
  makerFeeBips: 1000,
  maxFeeBips: 100,
};

describe("tradeNFT", function () {
  beforeEach(async () => {
    // Step 1. getAccount
    const accInfo = (
      await LoopringAPI.exchangeAPI.getAccount({
        owner: LOOPRING_EXPORTED_ACCOUNT.address,
      })
    ).accInfo;
    const accInfo2 = (
      await LoopringAPI.exchangeAPI.getAccount({
        owner: LOOPRING_EXPORTED_ACCOUNT.address2,
      })
    ).accInfo;
    // Step 2. eddsaKey
    const eddsaKey = await signatureKeyPairMock(accInfo);
    const eddsaKey2 = await signatureKeyPairMock(accInfo2, web3_2);
    // Step 3. apiKey
    const apiKey = (
      await LoopringAPI.userAPI.getUserApiKey(
        {
          accountId: accInfo.accountId,
        },
        eddsaKey.sk
      )
    ).apiKey;
    const apiKey2 = (
      await LoopringAPI.userAPI.getUserApiKey(
        {
          accountId: accInfo2.accountId,
        },
        eddsaKey2.sk
      )
    ).apiKey;

    // Step 4. storageId
    const storageId = await LoopringAPI.userAPI.getNextStorageId(
      {
        accountId: accInfo.accountId,
        sellTokenId: LOOPRING_EXPORTED_ACCOUNT.nftTokenId,
      },
      apiKey
    );
    const storageId2 = await LoopringAPI.userAPI.getNextStorageId(
      {
        accountId: accInfo2.accountId,
        sellTokenId: TOKEN_INFO.tokenMap["LRC"].tokenId,
      },
      apiKey2
    );
    // Step 5. generate Order, please read validateNFTOrder
    const makerOrder: sdk.NFTOrderRequestV3 = {
      exchange: LOOPRING_EXPORTED_ACCOUNT.exchangeAddress,
      accountId: accInfo.accountId,
      storageId: storageId.orderId,
      sellToken: {
        tokenId: LOOPRING_EXPORTED_ACCOUNT.nftTokenId,
        nftData: LOOPRING_EXPORTED_ACCOUNT.nftData,
        amount: "1",
      },
      buyToken: {
        tokenId: TOKEN_INFO.tokenMap["LRC"].tokenId,
        amount: LOOPRING_EXPORTED_ACCOUNT.tradeLRCValue.toString(),
      },
      allOrNone: false,
      fillAmountBOrS: false,
      validUntil: LOOPRING_EXPORTED_ACCOUNT.validUntil,
      maxFeeBips: 1000,
    };
    const makerOrderEddsaSignature = sdk.get_EddsaSig_NFT_Order(
      makerOrder,
      eddsaKey.sk
    );

    const takerOrder: sdk.NFTOrderRequestV3 = {
      exchange: LOOPRING_EXPORTED_ACCOUNT.exchangeAddress,
      accountId: accInfo2.accountId,
      storageId: storageId2.orderId,
      sellToken: {
        tokenId: TOKEN_INFO.tokenMap["LRC"].tokenId,
        amount: LOOPRING_EXPORTED_ACCOUNT.tradeLRCValue.toString(),
      },
      buyToken: {
        tokenId: LOOPRING_EXPORTED_ACCOUNT.nftTokenId,
        nftData: LOOPRING_EXPORTED_ACCOUNT.nftData,
        amount: "1",
      },
      allOrNone: false,
      fillAmountBOrS: true,
      validUntil: LOOPRING_EXPORTED_ACCOUNT.validUntil,
      maxFeeBips: 100,
    };
    const takerOrderEddsaSignature = sdk.get_EddsaSig_NFT_Order(
      takerOrder,
      eddsaKey2.sk
    );

    mockData = {
      takerOrder,
      takerOrderEddsaSignature,
      makerOrder,
      makerOrderEddsaSignature,
      makerFeeBips: 1000,
      maxFeeBips: 100,
    };
  }, DEFAULT_TIMEOUT * 2);
  it(
    "tradeNFT",
    async () => {
      jest.useFakeTimers("legacy");
      // private or third account can signature and approve this order
      // Step 1. getAccount
      const accInfoC = (
        await LoopringAPI.exchangeAPI.getAccount({
          owner: LOOPRING_EXPORTED_ACCOUNT.address,
        })
      ).accInfo;

      // Step 1. eddsaKeyC
      const eddsaKeyC = await signatureKeyPairMock(accInfoC);

      // Step 3. apiKey
      const apiKeyC = (
        await LoopringAPI.userAPI.getUserApiKey(
          {
            accountId: accInfoC.accountId,
          },
          eddsaKeyC.sk
        )
      ).apiKey;
      myLog(
        "mockData.makerOrder",
        mockData.makerOrder,
        "mockData.takerOrder",
        mockData.takerOrder
      );
      //  NFT Trade
      const response = await LoopringAPI.userAPI.submitNFTTrade({
        request: {
          maker: {
            ...mockData.makerOrder,
            eddsaSignature: mockData.makerOrderEddsaSignature,
          },
          makerFeeBips: 1000,
          taker: {
            ...mockData.takerOrder,
            eddsaSignature: mockData.takerOrderEddsaSignature,
          },
          takerFeeBips: 100,
        },
        web3,
        chainId: sdk.ChainId.GOERLI,
        walletType: sdk.ConnectorNames.Unknown,
        apiKey: apiKeyC,
        eddsaKey: eddsaKeyC.sk,
      });

      console.log(response);
    },
    DEFAULT_TIMEOUT * 2
  );
});
