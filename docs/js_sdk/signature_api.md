# Loopring SDK signature Guid

Loopring SDK support EOA (EOA hardware wallet) & Loopring Smart wallet Signature

- For Browser extension, Dapp, Hardware wallet we only support for EOA
- For Loopring Smart wallet (App), Provider gateway only can be walletConnect

## Follow is the provider gateway we inject & test:
  - MetaMask  (Ledger, Trezor)
  - WalletConnect (Authereum, Loopring Smart wallet )
  - Coinbase 

## For signature:
For eth_sign signing types (eth_sign, personal_sign, v1, v3, v4)

### EOA:
  - For Browser extension ([More information: signing-data](https://docs.metamask.io/guide/signing-data.html#a-brief-history))
    + common EOA we use the `v4` signature and `web3.eth.personal.ecRecover` validate signature
    + when `v4` signature is failed for any step, we will try `personal_sign` and `web3.eth.personal.ecRecover` validate signature
  - For Dapp 
    + when loopring Dex is inside Dapp WebView & connect by `window.ethereum`, we remove the `web3.eth.personal.ecRecover` validate 

### Loopring Smart wallet:  
  - For Smart wallet we send `eth_signTypedData` by walletConnect & validate ABI.Contracts.ContractWallet.encodeInputs `isValidSignature(bytes32,bytes)` 

> ❗ when add `SigSuffix` `02|03`
>- for `v4` ecdsaSignature the result signature should + `SigSuffix.Suffix02`;
>- for `personal_sign` ecdsaSignature the result signature should + `SigSuffix.Suffix03`;

## Code: validate signature 
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
  counterFactualInfo?: CounterFactualInfo
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
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const address: string[] = await window?.ethereum?.request({
              method: "eth_requestAccounts",
            });
            // Valid: 2. webview signature Valid | EOA signature Valid by ecRecover
            if (
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              (window?.ethereum?.isImToken || window?.ethereum?.isMetaMask) &&
              walletType === ConnectorNames.MetaMask &&
              address?.find(
                (item) => item.toLowerCase() === account.toLowerCase()
              )
            ) {
              return resolve({ sig: result });
            } else {
              const valid: any = await ecRecover(web3, account, msg, result);
              if (valid.result) {
                return resolve({ sig: result });
              }
            }

            // // Valid: 3. contractWallet signature Valid `isValidSignature(bytes,bytes)`
            // const walletValid: any = await contractWalletValidate(
            //   web3,
            //   account,
            //   msg,
            //   result
            // );
            //
            // if (walletValid.result) {
            //   return resolve({ sig: result });
            // }

            // Valid: 3. contractWallet signature Valid `isValidSignature(bytes32,bytes)`
            const walletValid2: any = await contractWalletValidate32(
              web3,
              account,
              msg,
              result
            );

            if (walletValid2.result) {
              return resolve({ sig: result });
            }

            // Valid: 4. counter Factual signature Valid when no counterFactualInfo
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

            // Valid: 5. myKeyValid Valid again
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