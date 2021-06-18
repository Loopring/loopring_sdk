export interface AccountInfo {
    accountId: number
    publicKey: any
    owner: string
    nonce: number
    fronzen: boolean
}

export const POLLING_INTERVAL = 10000
