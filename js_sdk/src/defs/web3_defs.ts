export enum ChainId {
    MAINNET = 1,
    GOERLI = 5,
}

export const NetworkContextName = 'NETWORK'

export enum ConnectorNames {
    Unknown = 'Unknown',
    MetaMask = 'MetaMask',
    Network = 'Network',
    WalletConnect = 'WalletConnect',
    WalletLink = 'WalletLink',
    Ledger = 'Ledger',
    Trezor = 'Trezor',
    Authereum = 'Authereum',
}

export enum SigSuffix {
    Suffix02 = '02',
    Suffix03 = '03',
}
