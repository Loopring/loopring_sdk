export enum ChainId {
  MAINNET = 1,
  GOERLI = 5,
}

export const NetworkContextName = "NETWORK";

export enum ConnectorNames {
  Unknown = "Unknown",
  MetaMask = "MetaMask",
  Network = "Network",
  WalletConnect = "WalletConnect",
  Gamestop = "Gamestop",
  OtherExtension = "OtherExtension",
  Coinbase = "Coinbase",
  Ledger = "Ledger",
  Trezor = "Trezor",
  Authereum = "Authereum",
}

export enum SigSuffix {
  Suffix02 = "02",
  Suffix03 = "03",
}

export const NFTFactory = {
  [ ChainId.MAINNET ]: "0xc852aC7aAe4b0f0a0Deb9e8A391ebA2047d80026",
  [ ChainId.GOERLI ]: "0x25315F9878BA07221db684b7ad3676502E914894",
};

export const NFTFactory_Collection = {
  [ ChainId.MAINNET ]: "0x97BE94250AEF1Df307749aFAeD27f9bc8aB911db",
  [ ChainId.GOERLI ]: "0xfDDA90dbCc99B3a91e3fB1292991Ba1076d9E281",
};
