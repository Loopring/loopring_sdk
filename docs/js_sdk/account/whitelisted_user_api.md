# Whitelisted User Part

## submitInternalTransfer

```javascript
// step 1. get account info

let addressWhitlisted = "0x35405E1349658BcA12810d0f879Bf6c5d89B512C";

let eddkeyWhitelisted =
  "0x27a5b716c7309a30703ede3f1a218cdec857e424a31543f8a658e7d2208db33";

const { accInfo } = await exchange.getAccount({ owner: addressWhitlisted });

console.log("accInfo:", accInfo);

const { exchangeInfo } = await exchange.getExchangeInfo();

// step 2 get apikey
const request: GetUserApiKeyRequest = {
  accountId: accInfo.accountId,
};

const { apiKey } = await userApi.getUserApiKey(request, eddkeyWhitelisted);

console.log("apiKey:", apiKey);

// step 3 get storageId
const request2: GetNextStorageIdRequest = {
  accountId: accInfo.accountId,
  sellTokenId: 1,
};
const storageId = await userApi.getNextStorageId(request2, apiKey);

// step 4 transfer
const request3: OriginTransferRequestV3 = {
  exchange: exchangeInfo.exchangeAddress,
  payerAddr: addressWhitlisted,
  payerId: accInfo.accountId,
  payeeAddr: "0xb6AdaC3e924B4985Ad74646FEa3610f14cDFB79c",
  payeeId: 0,
  storageId: storageId.offchainId,
  token: {
    tokenId: 1,
    volume: "100000000000000000000",
  },
  maxFee: {
    tokenId: 1,
    volume: "9400000000000000000",
  },
  validUntil: VALID_UNTIL,
};

console.log("request3:", request3);

const response = await whitelistedUserApi.submitInternalTransfer(
  request3,
  eddkeyWhitelisted,
  apiKey
);

console.log(response);
```

## submitOffchainWithdraw is unavailable.

TODO: submitOffchainWithdraw example
