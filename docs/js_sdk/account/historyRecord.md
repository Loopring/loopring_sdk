# User Actions History
For check account Actions, more detail such as filters please read SDK interface or API .

***

## getUserTrades

```ts 
  async () => {
  const result = await LoopringAPI.userAPI.getUserTrades(
    {
      accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
      offset: 0,
      limit: 20,
      fillTypes: sdk.TradesFillTypes.dex,
    },
    apiKey
  );
  console.log("getUserTrades:", result);
  ```

***

## getUserTxs

```ts 
  async () => {
  const result = await LoopringAPI.userAPI.getUserTxs(
    {
      accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
      types: [
        sdk.UserTxTypes.DEPOSIT,
        sdk.UserTxTypes.TRANSFER,
        sdk.UserTxTypes.ONCHAIN_WITHDRAWAL,
      ],
    },
    apiKey
  );
  console.log("getUserTxs:", result);
  ```

***

## getUserNFTTransactionHistory

```ts 
  async () => {
  const result = await LoopringAPI.userAPI.getUserNFTTransactionHistory(
    {
      accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
      types: [
        sdk.UserNFTTxTypes.DEPOSIT,
        sdk.UserNFTTxTypes.TRANSFER,
        sdk.UserNFTTxTypes.WITHDRAW,
        sdk.UserNFTTxTypes.MINT,
      ],
    },
    apiKey
  );
  console.log("getUserNFTTransactionHistory:", result);
  ```

***

## getOrders

```ts 
  async () => {
  const result = await LoopringAPI.userAPI.getOrders(
    {
      accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
      orderTypes: sdk.OrderType.LimitOrder,
    },
    apiKey
  );

  console.log("getOrders:", result);
  ```
