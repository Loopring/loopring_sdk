import * as sdk from "..";

let api: sdk.WsAPI;
let apiMain: sdk.WsAPI;
describe("WsAPI test", function () {
  beforeEach(() => {
    api = new sdk.WsAPI({ chainId: sdk.ChainId.GOERLI });
    apiMain = new sdk.WsAPI({ chainId: sdk.ChainId.MAINNET });
  });

  it(
    "getWsKey",
    async () => {
      const response = await apiMain.getWsKey();
      console.log(response);
    },
    sdk.DEFAULT_TIMEOUT
  );

  it(
    "getOrderBookArg",
    async () => {
      const arg1 = sdk.getMixOrderArg({ market: "LRC-ETH", level: 50 });
      console.log(arg1);

      const arg2 = sdk.getOrderBookArg({
        market: "LRC-ETH",
        level: 50,
        count: 40,
        snapshot: false,
      });
      console.log(arg2);
    },
    sdk.DEFAULT_TIMEOUT
  );
});
