export enum ChainId {
  MAINNET = 1,
  GOERLI = 5,
  SEPOLIA = 11155111,
  TAIKO = 167000,
  TAIKOHEKLA = 167009,
}

export const NetworkContextName = 'NETWORK'

export enum ConnectorNames {
  Unknown = 'Unknown',
  MetaMask = 'MetaMask',
  Network = 'Network',
  WalletConnect = 'WalletConnect',
  Gamestop = 'Gamestop',
  OtherExtension = 'OtherExtension',
  Coinbase = 'Coinbase',
  Ledger = 'Ledger',
  Trezor = 'Trezor',
  Authereum = 'Authereum',
}

export enum SigSuffix {
  Suffix02 = '02',
  Suffix03 = '03',
}

export const NFTFactory = {
  [ChainId.MAINNET]: '0xc852aC7aAe4b0f0a0Deb9e8A391ebA2047d80026',
  [ChainId.GOERLI]: '0x355E9941C5e301033ecfD37184E78443c5241035',
  [ChainId.SEPOLIA]: '0x8cC68c28c7E3d8Eeb1D74434164a1e91aCdA088D',
  [ChainId.TAIKOHEKLA]: '',
  [ChainId.TAIKO]: '',
}

export const NFTFactory_Collection = {
  [ChainId.MAINNET]: '0x97BE94250AEF1Df307749aFAeD27f9bc8aB911db',
  [ChainId.GOERLI]: '0x355E9941C5e301033ecfD37184E78443c5241035',
  [ChainId.SEPOLIA]: '0x8cC68c28c7E3d8Eeb1D74434164a1e91aCdA088D', 
}
