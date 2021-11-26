import { PublicKey } from "./loopring_defs"

/**
 * AccountInfo
 * @property accountId number Account ID
 * @property owner string  Ethereum address
 * @property frozen boolean The frozen state of the account, true stands for frozen, if the account is frozen, the user cant submit order.
 * @property publicKey PublicKey The user's public key
 * @property tags? string Comma separated list of tags such as VIP levels, etc
 * @property nonce number field.DexAccountV3.nonce
 * @property keyNonce number Nonce of users key change request, for backward compatible
 * @property keySeed string KeySeed of users L2 eddsaKey, the L2 key should be generated from this seed, i.e., L2_EDDSA_KEY=eth.sign(keySeed). Otherwise, user may meet error in login loopring DEX
 */
export interface AccountInfo {
    accountId: number
    owner: string
    frozen: boolean
    publicKey: PublicKey
    tags?: string
    nonce: number
    keyNonce: number
    keySeed: string
}
