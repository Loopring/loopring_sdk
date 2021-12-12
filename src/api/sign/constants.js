import BN from "bn.js";

const TREE_DEPTH_TRADING_HISTORY = 14;
const TREE_DEPTH_ACCOUNTS = 20;
const TREE_DEPTH_TOKENS = 8;
const NUM_BITS_ACCOUNTID = TREE_DEPTH_ACCOUNTS;
const NUM_BITS_ORDERID = 20;
const NUM_BITS_LABEL = 32;
const MAX_NUM_TOKENS = 2 ** 8;
const MAX_AMOUNT = new BN(2).pow(new BN(96)).sub(new BN(1));

const Float28Encoding = {
  numBitsExponent: 5,
  numBitsMantissa: 23,
  exponentBase: 10,
};
const Float24Encoding = {
  numBitsExponent: 5,
  numBitsMantissa: 19,
  exponentBase: 10,
};
const Float16Encoding = {
  numBitsExponent: 5,
  numBitsMantissa: 11,
  exponentBase: 10,
};

const emptyBytes = [];
const zeroAddress = "0x" + "00".repeat(20);
const scalarField = new BN(
  "21888242871839275222246405745257275088548364400416034343698204186575808495617",
  10
);

export default {
  TREE_DEPTH_TRADING_HISTORY,
  TREE_DEPTH_ACCOUNTS,
  TREE_DEPTH_TOKENS,
  NUM_BITS_ACCOUNTID,
  NUM_BITS_ORDERID,
  NUM_BITS_LABEL,
  MAX_NUM_TOKENS,
  MAX_AMOUNT,
  Float28Encoding,
  Float24Encoding,
  Float16Encoding,
  emptyBytes,
  zeroAddress,
  scalarField,
};
