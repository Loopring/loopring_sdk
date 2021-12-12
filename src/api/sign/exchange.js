import * as Poseidon from "./poseidon";

import * as fm from "../../utils/formatter";
import * as sigUtil from "eth-sig-util";

import * as abi from "ethereumjs-abi";
import * as ethUtil from "ethereumjs-util";
import ABI from "../ethereum/contracts";
import BN from "bn.js";
import EdDSA from "./eddsa";
import config from "../config";
import sha256 from "crypto-js/sha256";

const assert = require("assert");

export function generateKeyPair(seed) {
  return EdDSA.generateKeyPair(seed);
}

export function verify(publicKeyX, publicKeyY, seed) {
  const keyPair = generateKeyPair(seed);
  return (
    fm.formatEddsaKey(fm.toHex(fm.toBig(keyPair.publicKeyX))) === publicKeyX &&
    fm.formatEddsaKey(fm.toHex(fm.toBig(keyPair.publicKeyY))) === publicKeyY
  );
}

export function signGetApiKey(request, keyPair) {
  if (request.signature !== undefined) {
    return;
  }

  const method = "GET";
  const uri = encodeURIComponent(`${config.getServer()}/api/v2/apiKey`);
  const params = encodeURIComponent(`accountId=${request.accountId}`);
  const message = `${method}&${uri}&${params}`;
  const hash = fm.addHexPrefix(sha256(message).toString());
  // Create signature
  const signature = EdDSA.sign(keyPair.secretKey, hash);
  request.signature =
    fm.formatEddsaKey(fm.toHex(fm.toBig(signature.Rx))) +
    fm.clearHexPrefix(fm.formatEddsaKey(fm.toHex(fm.toBig(signature.Ry)))) +
    fm.clearHexPrefix(fm.formatEddsaKey(fm.toHex(fm.toBig(signature.s))));

  return request;
}

export function getAccountUpdateEcdsaSigTypedData(data) {
  let publicKey = new BN(
    EdDSA.pack(data["publicKeyX"], data["publicKeyY"]),
    16
  );

  let message = {
    owner: data["owner"],
    accountID: data["accountId"],
    feeTokenID: data["feeToken"],
    maxFee: data["maxFeeAmount"],
    publicKey: publicKey.toString(),
    validUntil: data["validUntil"],
    nonce: data["nonce"],
  };

  const typedData = {
    types: {
      EIP712Domain: [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" },
        { name: "verifyingContract", type: "address" },
      ],
      AccountUpdate: [
        { name: "owner", type: "address" },
        { name: "accountID", type: "uint32" },
        { name: "feeTokenID", type: "uint16" },
        { name: "maxFee", type: "uint96" },
        { name: "publicKey", type: "uint256" },
        { name: "validUntil", type: "uint32" },
        { name: "nonce", type: "uint32" },
      ],
    },
    primaryType: "AccountUpdate",
    domain: {
      name: "Loopring Protocol",
      version: "3.6.0",
      chainId: data["chainId"],
      verifyingContract: data["exchange"],
    },
    message: message,
  };
  return typedData;
}

export function getAccountUpdateEcdsaSig(data) {
  const typedData = getAccountUpdateEcdsaSigTypedData(data);
  const hash = sigUtil.TypedDataUtils.sign(typedData);
  return fm.toHex(hash);
}

export function signAccountUpdate(data, keyPair) {
  const inputs = [
    new BN(fm.toBuffer(data.exchange)).toString(),
    data.accountId,
    data.feeToken,
    data.maxFeeAmount,
    new BN(fm.toBuffer(data.publicKeyX)).toString(),
    new BN(fm.toBuffer(data.publicKeyY)).toString(),
    data.validUntil,
    data.nonce,
  ];

  const hasher = Poseidon.createHash(9, 6, 53);
  const hash = hasher(inputs).toString(10);
  const signature = EdDSA.sign(keyPair.secretKey, hash);

  data.signature =
    fm.formatEddsaKey(fm.toHex(fm.toBig(signature.Rx))) +
    fm.clearHexPrefix(fm.formatEddsaKey(fm.toHex(fm.toBig(signature.Ry)))) +
    fm.clearHexPrefix(fm.formatEddsaKey(fm.toHex(fm.toBig(signature.s))));

  return data;
}

// 3.6
export function getWithdrawTypedData(data) {
  let message = {
    owner: data["owner"],
    accountID: data["accountID"],
    tokenID: data["tokenID"],
    amount: data["amount"],
    feeTokenID: data["feeTokenID"],
    maxFee: data["maxFeeAmount"],
    to: data["to"],
    extraData: data["extraData"],
    minGas: data["minGas"],
    validUntil: data["validUntil"],
    storageID: data["storageID"],
  };
  const typedData = {
    types: {
      EIP712Domain: [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" },
        { name: "verifyingContract", type: "address" },
      ],
      Withdrawal: [
        { name: "owner", type: "address" },
        { name: "accountID", type: "uint32" },
        { name: "tokenID", type: "uint16" },
        { name: "amount", type: "uint96" },
        { name: "feeTokenID", type: "uint16" },
        { name: "maxFee", type: "uint96" },
        { name: "to", type: "address" },
        { name: "extraData", type: "bytes" },
        { name: "minGas", type: "uint256" },
        { name: "validUntil", type: "uint32" },
        { name: "storageID", type: "uint32" },
      ],
    },
    primaryType: "Withdrawal",
    domain: {
      name: "Loopring Protocol",
      version: "3.6.0",
      chainId: data["chainId"],
      verifyingContract: data["exchange"],
    },
    message: message,
  };
  return typedData;
}

export function getWithdrawEcdsaSig(data) {
  const typedData = getWithdrawTypedData(data);
  let hash = sigUtil.TypedDataUtils.sign(typedData);
  // console.log('hash', fm.toHex(hash));
  return fm.toHex(hash);
}

export function getTransferTypedData(data) {
  let message = {
    from: data["from"],
    to: data["to"],
    tokenID: data["tokenID"],
    amount: data["amount"],
    feeTokenID: data["feeTokenID"],
    maxFee: data["maxFeeAmount"],
    validUntil: data["validUntil"],
    storageID: data["storageID"],
  };
  const typedData = {
    types: {
      EIP712Domain: [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" },
        { name: "verifyingContract", type: "address" },
      ],
      Transfer: [
        { name: "from", type: "address" },
        { name: "to", type: "address" },
        { name: "tokenID", type: "uint16" },
        { name: "amount", type: "uint96" },
        { name: "feeTokenID", type: "uint16" },
        { name: "maxFee", type: "uint96" },
        { name: "validUntil", type: "uint32" },
        { name: "storageID", type: "uint32" },
      ],
    },
    primaryType: "Transfer",
    domain: {
      name: "Loopring Protocol",
      version: "3.6.0",
      chainId: data["chainId"],
      verifyingContract: data["exchange"],
    },
    message: message,
  };
  return typedData;
}

// 3.6 This will be closed in prod.
export function getTransferEcdsaSig(data) {
  const typedData = getTransferTypedData(data);
  let hash = sigUtil.TypedDataUtils.sign(typedData);
  return fm.toHex(hash);
}

export function signTransfer(transfer, keyPair) {
  const inputs = [
    new BN(ethUtil.toBuffer(transfer.exchange)).toString(),
    transfer.payerId,
    transfer.payeeId,
    transfer.token,
    transfer.amount,
    transfer.feeTokenID,
    transfer.maxFeeAmount,
    new BN(ethUtil.toBuffer(transfer.payeeAddr)).toString(),
    0,
    0,
    transfer.validUntil,
    transfer.storageId,
  ];

  const hasher = Poseidon.createHash(13, 6, 53);
  const hash = hasher(inputs).toString(10);
  const signature = EdDSA.sign(keyPair.secretKey, hash);

  return (
    fm.formatEddsaKey(fm.toHex(fm.toBig(signature.Rx))) +
    fm.clearHexPrefix(fm.formatEddsaKey(fm.toHex(fm.toBig(signature.Ry)))) +
    fm.clearHexPrefix(fm.formatEddsaKey(fm.toHex(fm.toBig(signature.s))))
  );
}

export function signOffChainWithdraw(withdraw, keyPair) {
  const onchainDataHash = abi
    .soliditySHA3(
      ["uint256", "address", "bytes"],
      [
        withdraw.minGas,
        new BN(fm.clearHexPrefix(withdraw.to), 16),
        ethUtil.toBuffer(withdraw.extraData),
      ]
    )
    .slice(0, 20);

  const inputs = [
    new BN(ethUtil.toBuffer(withdraw.exchange)).toString(),
    withdraw.accountID,
    withdraw.tokenID,
    withdraw.amount,
    withdraw.feeTokenID,
    withdraw.maxFeeAmount,
    new BN(onchainDataHash).toString(),
    withdraw.validUntil,
    withdraw.storageID,
  ];

  const hasher = Poseidon.createHash(10, 6, 53);
  const hash = hasher(inputs).toString(10);
  const signature = EdDSA.sign(keyPair.secretKey, hash);

  return (
    fm.formatEddsaKey(fm.toHex(fm.toBig(signature.Rx))) +
    fm.clearHexPrefix(fm.formatEddsaKey(fm.toHex(fm.toBig(signature.Ry)))) +
    fm.clearHexPrefix(fm.formatEddsaKey(fm.toHex(fm.toBig(signature.s))))
  );
}

export function getAmmJoinEcdsaTypedData(data) {
  let message = {
    owner: data["owner"],
    joinAmounts: data["joinAmounts"],
    joinStorageIDs: data["joinStorageIDs"],
    mintMinAmount: data["mintMinAmount"],
    validUntil: data["validUntil"],
  };
  const typedData = {
    types: {
      EIP712Domain: [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" },
        { name: "verifyingContract", type: "address" },
      ],
      PoolJoin: [
        { name: "owner", type: "address" },
        { name: "joinAmounts", type: "uint96[]" },
        { name: "joinStorageIDs", type: "uint32[]" },
        { name: "mintMinAmount", type: "uint96" },
        { name: "validUntil", type: "uint32" },
      ],
    },
    primaryType: "PoolJoin",
    domain: {
      name: data["name"],
      version: "1.0.0",
      chainId: data["chainId"],
      verifyingContract: data["exchange"],
    },
    message: message,
  };
  return typedData;
}

export function getAmmJoinEcdsaSig(data) {
  const typedData = getAmmJoinEcdsaTypedData(data);
  const hash = sigUtil.TypedDataUtils.sign(typedData);
  return fm.toHex(hash);
}

export function getAmmExitEcdsaTypedData(data) {
  let message = {
    owner: data["owner"],
    burnAmount: data["burnAmount"],
    burnStorageID: data["burnStorageID"],
    exitMinAmounts: data["exitMinAmounts"],
    fee: data["fee"],
    validUntil: data["validUntil"],
  };
  const typedData = {
    types: {
      EIP712Domain: [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" },
        { name: "verifyingContract", type: "address" },
      ],
      PoolExit: [
        { name: "owner", type: "address" },
        { name: "burnAmount", type: "uint96" },
        { name: "burnStorageID", type: "uint32" },
        { name: "exitMinAmounts", type: "uint96[]" },
        { name: "fee", type: "uint96" },
        { name: "validUntil", type: "uint32" },
      ],
    },
    primaryType: "PoolExit",
    domain: {
      name: data["name"],
      version: "1.0.0",
      chainId: data["chainId"],
      verifyingContract: data["exchange"],
    },
    message: message,
  };
  return typedData;
}

export function getAmmExitEcdsaSig(data) {
  const typedData = getAmmExitEcdsaTypedData(data);
  const hash = sigUtil.TypedDataUtils.sign(typedData);
  return fm.toHex(hash);
}

export function signSetReferrer(request, keyPair) {
  if (request.signature !== undefined) {
    return;
  }

  const method = "POST";
  const uri = encodeURIComponent(`${config.getServer()}/api/v2/refer`);

  let params;

  if (request.referrer) {
    params = encodeURIComponent(
      JSON.stringify({
        address: request.address,
        referrer: request.referrer,
        publicKeyX: keyPair.publicKeyX,
        publicKeyY: keyPair.publicKeyY,
      })
    );
  } else {
    params = encodeURIComponent(
      JSON.stringify({
        address: request.address,
        promotionCode: request.promotionCode,
        publicKeyX: keyPair.publicKeyX,
        publicKeyY: keyPair.publicKeyY,
      })
    );
  }

  const message = `${method}&${uri}&${params}`;
  const hash = fm.addHexPrefix(sha256(message).toString());
  // Create signature
  return EdDSA.sign(keyPair.secretKey, hash);
}

export function signUpdateDistributeHash(request, keyPair) {
  const method = "POST";
  const uri = encodeURIComponent(
    `${config.getServer()}/api/v2/updateDistributeHash`
  );
  const params = encodeURIComponent(
    JSON.stringify({
      requestId: request.requestId,
      txHash: request.txHash,
      publicKeyX: keyPair.publicKeyX,
      publicKeyY: keyPair.publicKeyY,
    })
  );
  const message = `${method}&${uri}&${params}`;
  const hash = fm.addHexPrefix(sha256(message).toString());
  // Create signature
  return EdDSA.sign(keyPair.secretKey, hash);
}

export function createAccountAndDeposit({
  from,
  exchangeAddress,
  fee,
  chainId,
  publicX,
  publicY,
  token,
  amount,
  permission,
  nonce,
  gasPrice,
}) {
  try {
    let address, value;
    if (token.symbol.toUpperCase() === "ETH") {
      address = "0x0";
      value = "0";
    } else {
      address = token.address;
      value = fm.toHex(fm.toBig(amount).times("1e" + token.decimals));
    }

    const data = ABI.Contracts.ExchangeContract.encodeInputs(
      "updateAccountAndDeposit",
      {
        pubKeyX: fm.toHex(fm.toBN(publicX)),
        pubKeyY: fm.toHex(fm.toBN(publicY)),
        tokenAddress: address,
        amount: value,
        permission: fm.toBuffer(permission),
      }
    );

    return {
      from: from,
      to: exchangeAddress,
      value: fm.toBig(fee).toFixed(),
      data: data,
      chainId: chainId,
      nonce: nonce.toString(),
      gasPrice: fm.fromGWEI(gasPrice).toFixed(),
      gas: config.getGasLimitByType("create").gas.toString(),
    };
  } catch (err) {
    console.error("Failed in method createOrUpdateAccount. Error: ", err);
    throw err;
  }
}

// 3.6
export function deposit({
  from,
  exchangeAddress,
  chainId,
  token,
  fee,
  amount,
  nonce,
  gasPrice,
}) {
  let value, data;
  try {
    value = fm.toBig(amount).times("1e" + token.decimals);
    if (token.symbol.toUpperCase() === "ETH") {
      data = ABI.Contracts.ExchangeContract.encodeInputs("deposit", {
        tokenAddress: "0x0",
        amount: fm.toHex(value),
        from: from,
        to: from,
        extraData: "",
      });
      value = value.plus(fee);
    } else {
      data = ABI.Contracts.ExchangeContract.encodeInputs("deposit", {
        tokenAddress: token.address,
        amount: fm.toHex(value),
        from: from,
        to: from,
        extraData: "",
      });
      value = fm.toBig(fee);
    }

    const gas = config.getDepositGas(token.symbol).gas.toString();

    // Update to
    // It's different from 3.1
    return {
      from: from,
      to: exchangeAddress,
      value: value.toFixed(),
      data: data,
      chainId: chainId,
      nonce: nonce.toString(),
      gasPrice: fm.fromGWEI(gasPrice).toFixed(),
      gas: gas,
      extraData: "",
    };
  } catch (err) {
    console.error("Failed in method deposit. Error: ", err);
    throw err;
  }
}

// 3.6
export function forceWithdraw({
  from,
  accountID,
  exchangeAddress,
  chainId,
  token,
  nonce,
  gasPrice,
  fee,
}) {
  try {
    // withdraw is not in 3.6
    const data = ABI.Contracts.ExchangeContract.encodeInputs("forceWithdraw", {
      owner: from,
      tokenAddress: token,
      accountID: accountID,
    });

    const value = fm.toBig(fee);

    return {
      from: from,
      to: exchangeAddress,
      value: value.toFixed(),
      data: data,
      chainId: chainId,
      nonce: nonce.toString(),
      gasPrice: fm.fromGWEI(gasPrice).toFixed(),
      gas: config.getGasLimitByType("withdraw").gas.toString(),
    };
  } catch (err) {
    console.error("Failed in method withdraw. Error: ", err);
    throw err;
  }
}

function setupOffChainWithdrawal(withdrawal, tokens) {
  let token, feeToken;
  if (!withdrawal.token.startsWith("0x")) {
    token = config.getTokenBySymbol(withdrawal.token, tokens);
  } else {
    token = config.getTokenByAddress(withdrawal.token, tokens);
  }
  if (!withdrawal.tokenF.startsWith("0x")) {
    feeToken = config.getTokenBySymbol(withdrawal.tokenF, tokens);
  } else {
    feeToken = config.getTokenByAddress(withdrawal.tokenF, tokens);
  }
  withdrawal.tokenId = token.id;
  withdrawal.token = token.address;
  withdrawal.amountInBN = config.toWEI(token.symbol, withdrawal.amount, tokens);
  withdrawal.amount = withdrawal.amountInBN;

  withdrawal.tokenFId = feeToken.id;
  withdrawal.tokenF = feeToken.address;
  withdrawal.amountFInBN = config.toWEI(
    feeToken.symbol,
    withdrawal.amountF,
    tokens
  );
  withdrawal.amountF = withdrawal.amountFInBN;

  withdrawal.label =
    withdrawal.label !== undefined ? withdrawal.label : config.getLabel();
  return withdrawal;
}

export function signWithdrawal(_withdrawal, keyPair, exchangeId, tokens) {
  if (_withdrawal.signature !== undefined) {
    return;
  }

  const withdrawal = setupOffChainWithdrawal(_withdrawal, tokens);
  const hasher = Poseidon.createHash(9, 6, 53);

  // Calculate hash
  const inputs = [
    exchangeId,
    withdrawal.accountId,
    withdrawal.tokenId,
    withdrawal.amountInBN,
    withdrawal.tokenFId,
    withdrawal.amountFInBN,
    withdrawal.label,
    withdrawal.nonce,
  ];
  const hash = hasher(inputs).toString(10);

  // Create signature
  withdrawal.hash = hash;
  withdrawal.signature = EdDSA.sign(keyPair.secretKey, hash);

  /**
  // Verify signature
  const success = EdDSA.verify(hash, withdrawal.signature, [
    keyPair.publicKeyX,
    keyPair.publicKeyY
  ]);
  assert(success, 'Failed to verify signature');
  */
  return withdrawal;
}

export function signOrder(_order, keyPair, tokens) {
  if (_order.signature !== undefined) {
    return;
  }

  const order = setupOrder(_order, tokens);
  const hasher = Poseidon.createHash(12, 6, 53);

  // Calculate hash
  const inputs = [
    order.exchange,
    order.orderId,
    order.accountId,
    order.tokenSId,
    order.tokenBId,
    order.amountSInBN,
    order.amountBInBN,
    order.validUntil,
    order.maxFeeBips,
    order.fillAmountBOrS ? 1 : 0,
  ];
  order.hash = hasher(inputs).toString(10);

  // Create signature
  const signature = EdDSA.sign(keyPair.secretKey, order.hash);
  // order.signature = signature;
  // order.signatureRx = signature.Rx;
  // order.signatureRy = signature.Ry;
  // order.signatureS = signature.s;

  let signatureRx_Hex = fm.clearHexPrefix(
    fm.toHex(fm.toBN(signature.Rx.toString("hex")))
  );
  if (signatureRx_Hex.length < 64) {
    const padding = new Array(64 - signatureRx_Hex.length).fill(0);
    signatureRx_Hex = padding.join("").toString() + signatureRx_Hex;
  }

  let signatureRy_Hex = fm.clearHexPrefix(
    fm.toHex(fm.toBN(signature.Ry.toString("hex")))
  );
  if (signatureRy_Hex.length < 64) {
    const padding = new Array(64 - signatureRy_Hex.length).fill(0);
    signatureRy_Hex = padding.join("").toString() + signatureRy_Hex;
  }

  let signatureS_Hex = fm.clearHexPrefix(
    fm.toHex(fm.toBN(signature.s.toString("hex")))
  );
  if (signatureS_Hex.length < 64) {
    const padding = new Array(64 - signatureS_Hex.length).fill(0);
    signatureS_Hex = padding.join("").toString() + signatureS_Hex;
  }

  order["eddsaSig"] = "0x" + signatureRx_Hex + signatureRy_Hex + signatureS_Hex;

  order.buy = undefined;
  order.hash = undefined;

  /**
  // Verify signature
  const success = EdDSA.verify(order.hash, order.signature, [
    keyPair.publicKeyX,
    keyPair.publicKeyY
  ]);
  assert(success, 'Failed to verify signature');
   */
  return order;
}

function setupOrder(order, tokens) {
  let tokenBuy, tokenSell;
  if (!order.tokenS.startsWith("0x")) {
    tokenSell = config.getTokenBySymbol(order.tokenS, tokens);
  } else {
    tokenSell = config.getTokenByAddress(order.tokenS, tokens);
  }
  if (!order.tokenB.startsWith("0x")) {
    tokenBuy = config.getTokenBySymbol(order.tokenB, tokens);
  } else {
    tokenBuy = config.getTokenByAddress(order.tokenB, tokens);
  }
  order.tokenS = tokenSell.address;
  order.tokenB = tokenBuy.address;
  order.tokenSId = tokenSell.tokenId;
  order.tokenBId = tokenBuy.tokenId;

  order.amountSInBN = config.toWEI(
    tokenSell.symbol,
    order.amountS,
    tokens,
    order.buy ? 2 : 3
  );
  order.amountS = order.amountSInBN;

  order.amountBInBN = config.toWEI(
    tokenBuy.symbol,
    order.amountB,
    tokens,
    order.buy ? 2 : 3
  );
  order.amountB = order.amountBInBN;

  // 3.6 change
  order.fillAmountBOrS = order.buy !== undefined ? !!order.buy : false;

  order.maxFeeBips =
    order.maxFeeBips !== undefined ? order.maxFeeBips : config.getMaxFeeBips();
  order.allOrNone = order.allOrNone !== undefined ? !!order.allOrNone : false;

  order.feeBips =
    order.feeBips !== undefined ? order.feeBips : order.maxFeeBips;
  // order.rebateBips = order.rebateBips !== undefined ? order.rebateBips : 0;
  // order.label = order.label !== undefined ? order.label : config.getLabel();

  /*
  assert(order.maxFeeBips < 64, 'maxFeeBips >= 64');
  assert(order.feeBips < 64, 'feeBips >= 64');
  assert(order.rebateBips < 64, 'rebateBips >= 64');
  assert(order.label < 2 ** 16, 'order.label >= 2**16');
  */

  // Sign the order
  return order;
}

export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function signCancel(_cancel, keyPair) {
  if (_cancel.signature !== undefined) {
    return;
  }
  const cancel = setupCancel(_cancel);
  const hasher = Poseidon.createHash(9, 6, 53);

  // Calculate hash
  const inputs = [
    cancel.exchangeId,
    cancel.accountId,
    cancel.orderTokenId,
    cancel.orderId,
    cancel.tokenFId,
    cancel.amountFInBN,
    cancel.label,
    cancel.nonce,
  ];
  const hash = hasher(inputs).toString(10);

  // Create signature
  cancel.signature = EdDSA.sign(keyPair.secretKey, hash);

  /**
     *
     // Verify signature
     const success = EdDSA.verify(hash, cancel.signature, [
     keyPair.publicKeyX,
     keyPair.publicKeyY
     ]);
     assert(success, 'Failed to verify signature');
     */

  return cancel;
}

function setupCancel(cancel, tokens) {
  let orderToken, feeToken;
  if (!cancel.orderToken.startsWith("0x")) {
    orderToken = config.getTokenBySymbol(cancel.orderToken, tokens);
  } else {
    orderToken = config.getTokenByAddress(cancel.orderToken, tokens);
  }
  if (!cancel.tokenF.startsWith("0x")) {
    feeToken = config.getTokenBySymbol(cancel.tokenF, tokens);
  } else {
    feeToken = config.getTokenByAddress(cancel.tokenF, tokens);
  }
  cancel.tokenFId = feeToken.tokenId;
  cancel.tokenF = feeToken.symbol;
  cancel.orderTokenId = orderToken.tokenId;
  cancel.orderToken = orderToken.symbol;

  cancel.amountFInBN = config.toWEI(feeToken.symbol, cancel.amountF, tokens);
  cancel.amountF = cancel.amountFInBN;

  cancel.label = cancel.label !== undefined ? cancel.label : config.getLabel();
  return cancel;
}

export function signFlexCancel(request, keyPair) {
  const method = "DELETE";
  const uri = encodeURIComponent(`${config.getServer()}/api/v2/orders`);
  let params = `accountId=${request.accountId}`;

  if (request.clientOrderId) {
    params =
      params + `&clientOrderId=${encodeURIComponent(request.clientOrderId)}`;
  }

  if (request.orderHash) {
    params = params + `&orderHash=${encodeURIComponent(request.orderHash)}`;
  }

  const encodedParams = encodeURIComponent(params);
  const message = `${method}&${uri}&${encodedParams}`;

  const hash = fm.addHexPrefix(sha256(message).toString());
  // Create signature
  request.signature = EdDSA.sign(keyPair.secretKey, hash);

  /**
     *
     // Verify signature
     const success = EdDSA.verify(hash, request.signature, [
     keyPair.publicKeyX,
     keyPair.publicKeyY
     ]);
     assert(success, 'Failed to verify signature');
     */

  return request;
}

export function batchCancelOrdersByHash(accountId, orderHashes, keyPair) {
  const method = "DELETE";
  const uri = encodeURIComponent(`${config.getServer()}/api/v2/orders/byHash`);
  const coma = encodeURIComponent(",");
  const params = `accountId=${accountId}&orderHash=${orderHashes.join(coma)}`;
  const encodedParams = encodeURIComponent(params);
  const message = `${method}&${uri}&${encodedParams}`;

  const hash = fm.addHexPrefix(sha256(message).toString());
  // Create signature
  const signature = EdDSA.sign(keyPair.secretKey, hash);

  return {
    accountId,
    orderHashes,
    signature,
  };
}

export function batchCancelOrdersByClientOrderIds(
  accountId,
  clientOrderIds,
  keyPair
) {
  const method = "DELETE";
  const uri = encodeURIComponent(
    `${config.getServer()}/api/v2/orders/byClientOrderId`
  );

  const coma = encodeURIComponent(",");
  const params = `accountId=${accountId}&clientOrderId=${clientOrderIds.join(
    coma
  )}`;

  const encodedParams = encodeURIComponent(params);
  const message = `${method}&${uri}&${encodedParams}`;

  const hash = fm.addHexPrefix(sha256(message).toString());
  // Create signature
  const signature = EdDSA.sign(keyPair.secretKey, hash);

  return {
    accountId,
    clientOrderIds,
    signature,
  };
}
