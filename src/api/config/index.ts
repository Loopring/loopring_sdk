/* tslint:disable */
// @ts-nocheck
import { toBig, toFixed } from '../../utils/formatter'
import BigNumber from 'bignumber.js'

function getTokenBySymbol(symbol, tokens) {
  if (typeof symbol === 'undefined') {
    return {}
  }
  return tokens.find((token) => token.symbol.toLowerCase() === symbol.toLowerCase()) || {}
}

function fromWEI(symbol, valueInWEI, tokens, { precision, ceil }: any = {}) {
  try {
    const token = getTokenBySymbol(symbol, tokens)
    const precisionToFixed = precision ? precision : token.precision
    const value = toBig(valueInWEI).div('1e' + token.decimals)
    return toFixed(value, precisionToFixed, ceil)
  } catch (err) {
    return undefined
  }
}

function toWEI(symbol, value, tokens, rm = BigNumber.ROUND_FLOOR) {
  const token = getTokenBySymbol(symbol, tokens)
  if (typeof token === 'undefined') {
    return 0
  }
  return toBig(value)
    .times('1e' + token.decimals)
    .toFixed(0, rm)
}

export { fromWEI, toWEI }
export * from './guardianTypeData'
