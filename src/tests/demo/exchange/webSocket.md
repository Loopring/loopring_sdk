#WebSocket Command
Definition: Loopring L2 websocket 

### Loopring L2 websocket topic type: 
WsTopicType
- `account`
- `orderbook`
- `mixorder`
- `mixtrade`
- `ticker`
- `candlestick`
- `ammpool`

## getWsKey (required by account related socket)
```ts 
const response = await LoopringAPI.wsAPI.getWsKey();
console.log(response);
```
## getOrderBookArg  
```ts
const arg1 = sdk.getMixOrderArg({ market: "LRC-ETH", level: 50 });
console.log(arg1);

const arg2 = sdk.getOrderBookArg({
  market: "LRC-ETH",
  level: 50,
  count: 40,
  snapshot: false,
});
console.log(arg2);
```