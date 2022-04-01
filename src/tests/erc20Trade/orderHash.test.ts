import {SubmitOrderRequestV3 } from "../../defs/loopring_defs";

import * as sign_tools from "../../api/sign/sign_tools";

describe("ERC20 Order Hash Test", function () {
  it(
    "ERC20 Order Hash",
    async () => {
      try {
        const orderRequest: SubmitOrderRequestV3 = {
          exchange: "0x2e76EBd1c7c0C8e7c2B875b6d505a260C525d25e",
          accountId: 11040,
          storageId: 10,
          sellToken: {
            tokenId: 1,
            volume: "986000000000000000000"
          },
          buyToken: {
            tokenId: 0,
            volume: "74861064000000000"
          },
          maxFeeBips: 60,
          validUntil: 1653995768,
          fillAmountBOrS: false,
          allOrNone: false,
          eddsaSignature: ""
        };

        const hash = await sign_tools.getOrderHash(orderRequest);

        // result should be : 0x15b965bbf0e01697939a5cd8be6e631f6cf4a3009ee9fb8631d193e0d5218b92
        console.log("ERC20 order hash is 0x" + hash);
      } catch (err) {
        console.log(err);
      }
    }
  );
});
