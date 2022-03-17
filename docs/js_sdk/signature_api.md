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
  
  - For Smart wallet
    

> ❗ when add `SigSuffix` `02|03`
>- for `v4` ecdsaSignature the result signature should + `SigSuffix.Suffix02`;
>- for `personal_sign` ecdsaSignature the result signature should + `SigSuffix.Suffix02`;
