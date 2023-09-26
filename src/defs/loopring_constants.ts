export enum HEBAO_LOCK_STATUS {
  LOCK_FAILED = 'LOCK_FAILED',
  CREATED = 'CREATED',
  LOCK_WAITING = 'LOCK_WAITING',
  UNLOCK_FAILED = 'UNLOCK_FAILED',
  LOCKED = 'LOCKED',
  UNLOCK_WAITING = 'UNLOCK_WAITING',
}

export enum HEBAO_META_TYPE {
  recovery = 16,
  transfer = 18,
  // add_guardian = 34,
  approve_token = 23,
  remove_guardian = 35,
  unlock_wallet = 37,
  upgrade_contract = 201,
  deposit_wallet = 202,
}

export const SoursURL = 'https://static.loopring.io/assets/'
