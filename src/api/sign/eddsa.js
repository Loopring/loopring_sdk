// Taken and modified from
// https://github.com/iden3/circomlib

// from https://github.com/Loopring/protocols/blob/master/packages/loopring_v3.js/src/eddsa.ts

import { F1Field, utils } from "ffjavascript";
import { bigInt } from "snarkjs";
import { createHash } from "./poseidon";
import babyJub from "./babyjub";
import createBlakeHash from "blake-hash";
import crypto from "crypto";

var assert = require("assert");
/*
function getKeyPair() {
  const entropy = crypto.randomBytes(32);
  const Fr = new F1Field(babyJub.subOrder);
  let secretKey = utils.leBuff2int(entropy);
  secretKey = Fr.e(secretKey);

  // Increment the secretKey until we found a point that is compressable
  let unpacked = null;
  while (unpacked == null) {
    const publicKey = babyJub.mulPointEscalar(babyJub.Base8, secretKey);
    const packed = this.pack(
      publicKey[0].toString(10),
      publicKey[1].toString(10)
    );
    unpacked = this.unpack(packed);
    if (unpacked == null) {
      secretKey = Fr.add(secretKey, Fr.e("1"));
    } else {
      assert(
        unpacked.publicKeyX === publicKey[0].toString(10),
        "invalid unpack X"
      );
      assert(
        unpacked.publicKeyY === publicKey[1].toString(10),
        "invalid unpack Y"
      );
    }
  }
  assert(
    babyJub.inCurve([
      babyJub.F.e(unpacked.publicKeyX),
      babyJub.F.e(unpacked.publicKeyY),
    ]),
    "invalid point"
  );

  const keyPair = {
    publicKeyX: unpacked.publicKeyX,
    publicKeyY: unpacked.publicKeyY,
    secretKey: secretKey.toString(10),
  };
  return keyPair;
}
*/

function pack(publicKeyX, publicKeyY) {
  const keyX = babyJub.F.e(publicKeyX);
  const keyY = babyJub.F.e(publicKeyY);
  const packed = babyJub.packPoint([keyX, keyY]);
  const reversed = Buffer.alloc(32);
  for (let i = 0; i < 32; i++) {
    reversed[31 - i] = packed[i];
  }
  return reversed.toString("hex");
}

/*
function unpack(publicKey) {
  if (publicKey.startsWith("0x")) {
    publicKey = publicKey.slice(2);
  }
  while (publicKey.length < 64) {
    publicKey = "0" + publicKey;
  }
  // Special case for 0
  if (publicKey === "00".repeat(32)) {
    const pubKey = {
      publicKeyX: "0",
      publicKeyY: "0",
    };
    return pubKey;
  } else {
    let packed = Buffer.from(publicKey, "hex");
    const reversed = Buffer.alloc(32);
    for (let i = 0; i < 32; i++) {
      reversed[31 - i] = packed[i];
    }
    const unpacked = babyJub.unpackPoint(reversed);
    if (unpacked == null) {
      return null;
    }
    const pubKey = {
      publicKeyX: unpacked[0].toString(10),
      publicKeyY: unpacked[1].toString(10),
    };
    return pubKey;
  }
}
*/

function sign(strKey, msg) {

  assert(false, "Disable")

  /*
  console.log("sign.............", strKey, msg)

  const key = bigInt(strKey);
  console.log("key.............", key)

  const prv = bigInt.leInt2Buff(key, 32);

  const h1 = createBlakeHash("blake512").update(prv).digest();
  const msgBuff = bigInt.leInt2Buff(bigInt(msg), 32);
  const rBuff = createBlakeHash("blake512")
    .update(Buffer.concat([h1.slice(32, 64), msgBuff]))
    .digest();
  let r = bigInt.leBuff2int(rBuff);
  r = r.mod(babyJub.order);
  console.log("r.............", r);

  const A = babyJub.mulPointEscalar(babyJub.Base8, key);
  console.log("A ", A)

  const R8 = babyJub.mulPointEscalar(babyJub.Base8, r);

  const hasher = createHash(6, 6, 52);
  
  console.log("[R8[0], R8[1], A[0], A[1], msg]", [R8[0], R8[1], A[0], A[1], msg]);
  const hm = hasher([R8[0], R8[1], A[0], A[1], msg]);
  console.log("hm.............", hm);

  const S = r.add(hm.mul(key)).mod(babyJub.order);

  return {
    Rx: R8[0].toString(),
    Ry: R8[1].toString(),
    s: S.toString(),
  };
  */
}

/*
function verify(msg, sig, pubKey) {
  const A = [bigInt(pubKey[0]), bigInt(pubKey[1])];
  const R = [bigInt(sig.Rx), bigInt(sig.Ry)];
  const S = bigInt(sig.s);

  // Check parameters
  if (!babyJub.inCurve(R)) return false;
  if (!babyJub.inCurve(A)) return false;
  if (S >= babyJub.subOrder) return false;

  const hasher = createHash(6, 6, 52);
  const hm = hasher([R[0], R[1], A[0], A[1], bigInt(msg)]);

  const Pleft = babyJub.mulPointEscalar(babyJub.Base8, S);
  let Pright = babyJub.mulPointEscalar(A, hm);
  Pright = babyJub.addPoint(R, Pright);

  if (!Pleft[0].equals(Pright[0])) return false;
  if (!Pleft[1].equals(Pright[1])) return false;

  return true;
}
*/

/*
function generateKeyPair(seed) {
  console.log("seed", seed)
  console.log("bigInt.leBuff2int(seed)", bigInt.leBuff2int(seed))
  const secretKey = bigInt.leBuff2int(seed).mod(babyJub.subOrder);
  console.log("secretKey", secretKey.toString())
  const publicKey = babyJub.mulPointEscalar(babyJub.Base8, secretKey);
  let result = {
    publicKeyX: publicKey[0].toString(10),
    publicKeyY: publicKey[1].toString(10),
    secretKey: secretKey.toString(10),
  };
  console.log("result", result)
  return result
}
*/
/*
function generatePubKeyFromPrivate(secretKey) {
  const publicKey = babyJub.mulPointEscalar(babyJub.Base8, bigInt(secretKey));
  return {
    publicKeyX: publicKey[0].toString(10),
    publicKeyY: publicKey[1].toString(10),
  };
}
*/

export default {
  // getKeyPair,
  pack,
  // unpack,
  sign,
  // verify,
  // generateKeyPair,
  // generatePubKeyFromPrivate,
};
