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
  WalletLink = "WalletLink",
  Ledger = "Ledger",
  Trezor = "Trezor",
  Authereum = "Authereum",
}

export enum SigSuffix {
  Suffix02 = "02",
  Suffix03 = "03",
}

export const NFTFactory = {
  [ChainId.MAINNET]: "0xDB42E6F6cB2A2eFcF4c638cb7A61AdE5beD82609",
  [ChainId.GOERLI]: "0x40F2C1770E11c5bbA3A26aEeF89616D209705C5D",
};
