# Signature

Loopring SDK support EOA (EOA hardware wallet) & Loopring Smart wallet Signature

- For Browser extension, Dapp, Hardware wallet we only support for EOA
- For Loopring Smart wallet (App), Provider gateway only can be walletConnect

## Follow is the provider gateway we inject & test:

- MetaMask  (Ledger, Trezor)
- WalletConnect (Authereum, Loopring Smart wallet )
- Coinbase
- [Coming soon...](https://desk.zoho.com/portal/loopring/en/newticket)

## For signature:

For eth_sign signing types (eth_sign, personal_sign, v1, v3, v4)

### EOA:

- For Browser
  extension ([More information: signing-data](https://docs.metamask.io/guide/signing-data.html#a-brief-history))
  + common EOA we use the `v4` signature and `web3.eth.personal.ecRecover` validate signature
  + when `v4` signature is failed for any step, we will try `personal_sign` and `web3.eth.personal.ecRecover` validate
    signature
- For Dapp
  + when loopring Dex is inside Dapp Webview & connect by `window.ethereum`, we remove the `web3.eth.personal.ecRecover`
    validate

### Loopring Smart wallet:

- For Smart wallet we send `eth_signTypedData` by walletConnect & validate
  ABI.Contracts.ContractWallet.encodeInputs `isValidSignature(bytes32,bytes)`

### Loopring Counterfactual wallet:

- signature is same as Smart wallet
- But ecRecover is by
  walletOwner, `const {walletOwner} = await LoopringAPI.exchangeAPI.getCounterFactualInfo({ accountId: LOOPRING_EXPORTED_ACCOUNT.accountIdCF, });`

> ❗ when add `SigSuffix` `02|03` ( follow EIP712 + `02`, personal_sign + `03`)
>- for `v4` ecdsaSignature the result signature should + `SigSuffix.Suffix02`;
>- for `personal_sign` ecdsaSignature the result signature should + `SigSuffix.Suffix03`;

***

## generateKeyPair

```ts
const {accInfo} = await LoopringAPI.exchangeAPI.getAccount({
  owner: LOOPRING_EXPORTED_ACCOUNT.address,
});
const result = await signatureKeyPairMock(accInfo);
console.log(result.sk);
```

***

## getEcDSASig: eth_signTypedData_v4

```ts
// test case is not allow brock by Mock provider
const result = await sdk.getEcDSASig(
  web3,
  testTypedData,
  LOOPRING_EXPORTED_ACCOUNT.address,
  sdk.GetEcDSASigType.HasDataStruct,
  sdk.ChainId.GOERLI,
  LOOPRING_EXPORTED_ACCOUNT.accountId,
  "",
  sdk.ConnectorNames.Unknown
);
console.log("getEcDSASig:eth_signTypedData_v4",
  result,
  "ecdsaSig+sdk.SigSuffix.Suffix02",
  result.ecdsaSig + sdk.SigSuffix.Suffix02
);
```

***

## getEcDSASig: personalSign(WithoutDataStruct--Hardware wallet)

```ts
const result = await sdk.getEcDSASig(
  web3,
  testTypedData,
  LOOPRING_EXPORTED_ACCOUNT.address,
  sdk.GetEcDSASigType.WithoutDataStruct,
  sdk.ChainId.GOERLI,
  LOOPRING_EXPORTED_ACCOUNT.accountId,
  "",
  sdk.ConnectorNames.Unknown
);
console.log(
  "getEcDSASig:WithoutDataStruct(personalSign)",
  result,
  "ecdsaSig+sdk.SigSuffix.Suffix03",
  result.ecdsaSig + sdk.SigSuffix.Suffix03
);
```
***
## getEcDSASig: personalSign(Contract)

```ts
// test case is not allow brock by Mock provider
const result = await sdk.getEcDSASig(
  web3,
  testTypedData,
  LOOPRING_EXPORTED_ACCOUNT.address,
  sdk.GetEcDSASigType.Contract,
  sdk.ChainId.GOERLI,
  LOOPRING_EXPORTED_ACCOUNT.accountId,
  "",
  sdk.ConnectorNames.Unknown
);
console.log(
  "getEcDSASig:personalSign(Contract)",
  result
);
```

## Validate signature

[github: src/api/base_api.ts#personalSign](https://github.com/Loopring/loopring_sdk/blob/2c79c1837114f4f383e2d292de3da4b2dac02252/src/api/base_api.ts#L549)

```
 export async function personalSign(
  web3: any,
  account: string | undefined,
  pwd: string,
  msg: string,
  walletType: ConnectorNames,
  chainId: ChainId,
  accountId?: number,
  counterFactualInfo?: CounterFactualInfo,
  isMobile?: boolean
) {
  if (!account) {
    return { error: "personalSign got no account" };
  }

  return new Promise((resolve) => {
    try {
      web3.eth.personal.sign(
        msg,
        account,
        pwd,
        async function (err: any, result: any) {
          if (!err) {
            // Valid:1. counter Factual signature Valid
            if (counterFactualInfo && accountId) {
              myLog("fcWalletValid counterFactualInfo accountId:");
              const fcValid = await fcWalletValid(
                web3,
                account,
                msg,
                result,
                accountId,
                chainId,
                counterFactualInfo
              );
              if (fcValid.result) {
                resolve({
                  sig: result,
                  counterFactualInfo: fcValid.counterFactualInfo,
                });
                return;
              }
            }

            // Valid: 2. webview directory signature Valid
            if (
              (window?.ethereum?.isImToken || window?.ethereum?.isMetaMask) &&
              isMobile &&
              // Mobile directory connect will sign ConnectorNames as MetaMask only
              walletType === ConnectorNames.MetaMask
            ) {
              const address: string[] = await window.ethereum?.request({
                method: "eth_requestAccounts",
              });
              if (
                address?.find(
                  (item) => item.toLowerCase() === account.toLowerCase()
                )
              ) {
                return resolve({ sig: result });
              }
            }

            // Valid: 3. EOA signature Valid by ecRecover
            const valid: any = await ecRecover(web3, account, msg, result);
            if (valid.result) {
              return resolve({ sig: result });
            }

            // Valid: 4. contractWallet signature Valid `isValidSignature(bytes32,bytes)`
            const walletValid2: any = await contractWalletValidate32(
              web3,
              account,
              msg,
              result
            );

            if (walletValid2.result) {
              return resolve({ sig: result });
            }

            // Valid: 5. counter Factual signature Valid when no counterFactualInfo
            if (accountId) {
              const fcValid = await fcWalletValid(
                web3,
                account,
                msg,
                result,
                accountId,
                chainId
              );
              if (fcValid.result) {
                return resolve({
                  sig: result,
                  counterFactualInfo: fcValid.counterFactualInfo,
                });
              }
            }

            // Valid: 6. myKeyValid Valid again
            const myKeyValid: any = await mykeyWalletValid(
              web3,
              account,
              msg,
              result
            );

            if (myKeyValid.result) {
              return resolve({ sig: result });
            }

            // Valid: Error cannot pass personalSign Valid
            // eslint-disable-next-line no-console
            console.log(
              "web3.eth.personal.sign Valid, valid 5 ways, all failed!"
            );
            return resolve({
              error: "web3.eth.personal.sign Valid, valid 5 ways, all failed!",
            });
          } else {
            return resolve({
              error: "personalSign err before Validate:" + err,
            });
          }
        }
      );
    } catch (reason) {
      resolve({ error: reason });
    }
  });
}
```