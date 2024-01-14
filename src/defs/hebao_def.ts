export type ChallengeData = {
  actionResult: string
  securityResult: {
    securityId: string
    verifyCodeEffectTime: number
    verifyCodeExpiredTime: number
  }
  verifyMethods: { verifyType: string; value: string; optionId: string }[]
  wallet: string
  txHash: string
}