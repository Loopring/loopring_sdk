import {
  NFTOrderRequestV3,
  NFTTradeRequestV3,
} from "../../../defs/loopring_defs";

import * as sign_tools from "../../../api/sign/sign_tools";

describe("NFTAction Trade Hash Test", function () {
  it("NFTAction Trade Hash", async () => {
    try {
      const makerOrder: NFTOrderRequestV3 = {
        exchange: "0xD1221BA705B653d9Ea22569c911Bddf68264fAF4",
        accountId: 10979,
        storageId: 36,
        sellToken: {
          tokenId: 2,
          nftData: "",
          amount: "118117838",
        },
        buyToken: {
          tokenId: 32769,
          nftData:
            "0x26b32b508180c293e1a6581fd8a1ebff4734966578a008247c9f0bf9cdb5e492",
          amount: "2",
        },
        allOrNone: false,
        fillAmountBOrS: true,
        validUntil: 1680332114,
        maxFeeBips: 1000,
      };
      makerOrder.eddsaSignature =
        "0x2553b338ce18a9bc4f51412ccf2c37ba04538ef26e4897fdcf244d0bcf71fe270a0ccebe65cc4a13a3c3e6f84c3de919f7d81434df0a50b8f583e4c7b350b2a203c01b8472e3474c6b2225de41da6ae67a781986d43063ce8008d5978cab3c1f";

      const takerOrder: NFTOrderRequestV3 = {
        exchange: "0xD1221BA705B653d9Ea22569c911Bddf68264fAF4",
        accountId: 10092,
        storageId: 2,
        sellToken: {
          tokenId: 32769,
          nftData:
            "0x26b32b508180c293e1a6581fd8a1ebff4734966578a008247c9f0bf9cdb5e492",
          amount: "1",
        },
        buyToken: {
          tokenId: 2,
          nftData: "",
          amount: "59000000",
        },
        allOrNone: false,
        fillAmountBOrS: false,
        validUntil: 1680332114,
        maxFeeBips: 1000,
      };

      takerOrder.eddsaSignature =
        "0x28e1fef32e0e7d119d5f2a078bf9f0ad677f72eed18ef35d98326a389ebb5e900a92fe81cfd4fc0a2758dba3bbf55f79c073ac539490b5fc6e16a8046df946dd060025f14fc3d92ef72163639e4ec8cef629e335343c44a291aed5a6e8d646bf";

      const tradeRequest: NFTTradeRequestV3 = {
        maker: makerOrder,
        makerFeeBips: 99,
        taker: takerOrder,
        takerFeeBips: 99,
      };

      const hash = await sign_tools.getNftTradeHash(tradeRequest);

      // result should be 0x244b36f43e462167942bb336e180df74dcca5726742cfab9ae1b70b6dfe5f4a
      console.log("NFT Trade hash is 0x" + hash);
    } catch (err) {
      console.log(err);
    }
  });
});
