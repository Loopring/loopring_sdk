import { toBig, toFixed } from '../common/formatter';
const config = require('./config.json');

function getMaintenanceMode() {
  return config.maintenanceMode;
}

function getRelayerHost(restUrl = true) {
  if (
    window.location.hostname === 'loopring.io' ||
    window.location.hostname === 'www.loopring.io' ||
    window.location.hostname === 'v1.loopring.io' ||
    window.location.hostname === 'www.v1.loopring.io'
  ) {
    return restUrl ? config.prodServerUrl : config.prodWsUrl;
  } else if (
    window.location.hostname === 'exchange.loopring.io' ||
    window.location.hostname === 'www.exchange.loopring.io'
  ) {
    return restUrl ? config.prod36ServerUrl : config.prod36WsUrl;
  } else {
    // No uat
    return restUrl ? config.uat2ServerUrl : config.uat2WsUrl;
  }
}

function getServer() {
  return 'https://' + getRelayerHost();
}

function getWsServer() {
  return 'wss://' + getRelayerHost(false) + '/v2/ws';
}

function getChannelId() {
  return config.defaultChannelId;
}

function getLabel() {
  return config.label;
}

function getMaxFeeBips() {
  return config.maxFeeBips;
}

function getTokenBySymbol(symbol, tokens) {
  if (typeof symbol === 'undefined') {
    return {};
  }
  return (
    tokens.find(
      (token) => token.symbol.toLowerCase() === symbol.toLowerCase()
    ) || {}
  );
}

function getTokenByName(name, tokens) {
  if (typeof name === 'undefined') {
    return {};
  }
  return (
    tokens.find((token) => token.name.toLowerCase() === name.toLowerCase()) ||
    {}
  );
}

function getTokenByAddress(address, tokens) {
  if (typeof address === 'undefined') {
    return {};
  }
  return tokens.find(
    (token) => token.address.toLowerCase() === address.toLowerCase()
  );
}

function getTokenByTokenId(tokenId, tokens) {
  if (typeof tokenId === 'undefined') {
    return {};
  }
  return tokens.find((token) => token.tokenId === tokenId);
}

function fromWEI(symbol, valueInWEI, tokens, { precision, ceil } = {}) {
  try {
    const token = getTokenBySymbol(symbol, tokens);
    const precisionToFixed = precision ? precision : token.precision;
    const value = toBig(valueInWEI).div('1e' + token.decimals);
    return toFixed(value, precisionToFixed, ceil);
  } catch (error) {
    return undefined;
  }
}

function feeFromWei(symbol, valueInWEI, tokens) {
  try {
    const token = getTokenBySymbol(symbol, tokens);
    return toBig(valueInWEI)
      .div('1e' + token.decimals)
      .toNumber()
      .toString();
  } catch (error) {
    return undefined;
  }
}

function toWEI(symbol, value, tokens, rm = 3) {
  const token = getTokenBySymbol(symbol, tokens);
  if (typeof token === 'undefined') {
    return 0;
  }
  return toBig(value)
    .times('1e' + token.decimals)
    .toFixed(0, rm);
}

function getMarketByPair(pair, markets) {
  if (pair) {
    return markets.find((m) => m.market === pair);
  }
}

function isSupportedMarket(market, markets) {
  return !!getMarketByPair(market, markets);
}

function getMarketsByTokenR(token, markets) {
  return markets.filter((item) => item.split('-')[1] === token);
}

function getMarketsByTokenL(token, markets) {
  return markets.filter((item) => item.split('-')[0] === token);
}

function getTokenSupportedMarkets(token) {
  const leftMarket = getMarketsByTokenL(token);
  const rightMarket = getMarketsByTokenR(token);
  return [...leftMarket, ...rightMarket];
}

function getDepositGas(token) {
  if (token) {
    const data = config.deposits.find(
      (d) => d.token.toUpperCase() === token.toUpperCase()
    );
    if (data) {
      return data;
    }
  }
  return getGasLimitByType('depositTo');
}

function getGasLimitByType(type) {
  if (type) {
    return config.txs.find((tx) => type === tx.type);
  }
}

function getFeeByType(type, fees) {
  if (type) {
    return fees.find((fee) => type === fee.type);
  }
}

function getMaxAmountInWEI() {
  return config.maxAmount;
}

function getLocalTokens() {
  return config.localTokens;
}

function getFeeByToken(token, fees) {
  return fees.find((fee) => fee.token.toLowerCase() === token.toLowerCase());
}

export default {
  getMaintenanceMode,
  getRelayerHost,
  getServer,
  getWsServer,
  getTokenBySymbol,
  getTokenByName,
  getTokenByAddress,
  getTokenByTokenId,
  getMarketByPair,
  getGasLimitByType,
  getFeeByType,
  getChannelId,
  getLabel,
  isSupportedMarket,
  getMarketsByTokenR,
  getTokenSupportedMarkets,
  getMaxFeeBips,
  getMaxAmountInWEI,
  fromWEI,
  toWEI,
  getDepositGas,
  getLocalTokens,
  getFeeByToken,
  feeFromWei,
};
