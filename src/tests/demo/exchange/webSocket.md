#WebSocket Command
Definition: Loopring L2 websocket 

### Loopring L2 websocket topic type: 
WsTopicType
- `account`
- `orderbook`
- `mixorder`
- `trade`
- `ticker`
- `candlestick`
- `ammpool`


    "getWsKey",
    async () => {
      const response = await LoopringAPI.wsAPI.getWsKey();
      console.log(response);
    },
    DEFAULT_TIMEOUT
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
    DEFAULT_TIMEOUT
  );
});
