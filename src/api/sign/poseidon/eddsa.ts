/*
Implements Pure-EdDSA and Hash-EdDSA

The signer has two secret values:

    * k = Secret key
    * r = Per-(message,key) nonce

The signer provides a signature consiting of two values:

    * R = Point, image of `r*B`
    * s = Image of `r + (k*t)`

The signer provides the verifier with their public key:

    * A = k*B

Both the verifier and the signer calculate the common reference string:

    * t = H(R, A, M)

The nonce `r` is secret, and protects the value `s` from revealing the
signers secret key.

For Hash-EdDSA, the message `M` is compressed before H(R,A,M)

For further information see: https://ed2519.cr.yp.to/eddsa-20150704.pdf
*/

import { BigNumber } from "ethers";
import { field, FQ } from "./field";
import { jubjub, Point } from "./jubjub";
import { sha512 } from 'js-sha512';
import { permunation, PoseidonParams } from "./permutation";

export class Signature {
  public R: Point
  public s: FQ

  constructor(R: Point, s: FQ) {
    this.R = R
    this.s = s
  }

  toStr() {
    return `${this.R.x.n} ${this.R.y.n} ${this.s.n}`
  }
}

export class SignedMessage {
  public A: Point
  public sig: Signature
  public msg: BigNumber

  constructor(A: Point, sig: Signature, msg: BigNumber) {
    this.A = A
    this.sig = sig
    this.msg = msg
  }

  toStr() {
    return `${this.A.x.n} ${this.A.y.n} ${this.sig.toStr()} ${this.msg.toString()}`
  }
}

export class SignatureScheme {

  static to_bytes(arg: BigNumber) {
    let outputLength = 32

    // console.log(`input ${arg.toString()}`)

    let bitIntDataItems = bnToBuf(arg.toString());
    // console.log(`bigIntData ${bitIntDataItems}`)

    let more = outputLength - bitIntDataItems.length
    // console.log('more', more)
    if (more > 0) {
      for (var i = 0; i < more; i++) {
        bitIntDataItems = [0].concat(bitIntDataItems)
      }
    } else {
      bitIntDataItems = bitIntDataItems.slice(0, outputLength)
    }

    bitIntDataItems = bitIntDataItems.reverse()
    // console.log(`bigIntData return ${bitIntDataItems}`)
    return bitIntDataItems
  }

  /*
  Identity function for message

  Can be used to truncate the message before hashing it
  as part of the public parameters.
  */
  static prehash_message(M: BigNumber) {
    return M
  }

  /*
  Hash the key and message to create `r`, the blinding factor for this signature.

  If the same `r` value is used more than once, the key for the signature is revealed.

  From: https://eprint.iacr.org/2015/677.pdf (EdDSA for more curves)

  Page 3:

      (Implementation detail: To save time in the computation of `rB`, the signer
      can replace `r` with `r mod L` before computing `rB`.)
  */
  static hash_secret_python(k: FQ, arg: BigNumber) {
    let byteArray0 = this.to_bytes(k.n)
    let byteArray1 = this.to_bytes(arg)

    let sum = byteArray0.concat(byteArray1)
    // console.log("sum", sum)

    // let byteArrayHexStr = bytesToHexString(sum)
    // console.log("byteArrayHexStr", byteArrayHexStr)

    let digest1 = sha512.array(new Uint8Array(sum).buffer)

    // let digest1 = createHash('sha512').update .digest("SHA-512", new Uint8Array(sum).buffer)
    let sha512StrItems: any
    // console.log('digest1', digest1);
    for (var i = 0; i < digest1.length; i++) {  
      let itemInt = digest1[i]
      let st = itemInt.toString(16)
      if (st.length == 1) {
        st = '0' + st
      }
      sha512StrItems = [st].concat(sha512StrItems)
    }
    let sha512MessageHexStr = sha512StrItems.join("")
    // console.log(`sha512MessageHexStr ${sha512MessageHexStr}`)
    let sha512MessageHexStrBigInt = BigNumber.from("0x"+sha512MessageHexStr)
    // console.log(`sha512MessageHexStrBigInt ${sha512MessageHexStrBigInt}`)
    let hashed = sha512MessageHexStrBigInt.mod(jubjub.JUBJUB_L)
    // console.log(`hashed ${hashed.toString()}`)
    return hashed
  }

  static B() {
    return Point.generate()
  }

  static sign(msg: BigNumber, key: FQ, B: Point) {
    // console.log("B ", B.x.n.toString(), B.y.n.toString())

    let copyKey = new FQ(key.n, key.m)
    let A = B.mul(copyKey.n)

    // console.log("A.x ", A.x.n.toString(), A.x.m.toString())
    // console.log("A.y ", B.y.n.toString(), A.y.m.toString())

    let M = this.prehash_message(msg)
    // console.log("M ", M.toString())

    let r = this.hash_secret_python(key, M)
    // console.log("r ", r.toString())

    let copy_r = BigNumber.from(r.toString())

    let R = B.mul(copy_r)

    // console.log("R.x ", R.x.n.toString(), R.x.m.toString())
    // console.log("R.y ", R.y.n.toString(), R.y.m.toString())

    let t = this.hash_public(R, A, M)
    // console.log("hello world")
    // console.log("t ", t.toString())

    let t_c = t
    let key_n_t = key.n.mul(t_c)
    let left = r.add(key_n_t)
    let S = left.mod(jubjub.JUBJUB_E)

    // console.log("S ", S.toString())

    let signatureResult = new Signature(R, new FQ(S))
    // console.log("signatureResult", signatureResult.toStr())

    let signedMessage = new SignedMessage(A, signatureResult, msg)
    // console.log("signedMessage", signedMessage.toStr())

    return signedMessage
  }

  static as_scalar(point: Point) {
    // console.log(`as_scalar ${point.x.n.toString()}`)
    return [point.x.n, point.y.n]
  }

  static hash_public(R: Point, A: Point, M: BigNumber) {
    let inputMsg: any
    inputMsg = (this.as_scalar(R).concat(this.as_scalar(A))).concat([M])
    // console.log(`inputMsg ${inputMsg}`)
    let params = new PoseidonParams(field.SNARK_SCALAR_FIELD, 6, 6, 52, "poseidon", BigNumber.from(5), null, null, 128)
    let result = permunation.poseidon(inputMsg, params)
    return result
  }
}


export function bnToBuf(bn: string) {
  var hex = BigInt(bn).toString(16)
  if (hex.length % 2) {
    hex = '0' + hex
  }
  var len = hex.length / 2;
  var u8 = new Uint8Array(len);
  var i = 0;
  var j = 0;
  while (i < len) {
    u8[i] = parseInt(hex.slice(j, j + 2), 16)
    i += 1;
    j += 2;
  }
  return Array.from(u8);
}

export function bufToBn(buf: any) {
  var hex: any;
  hex = [];
  var u8 = Uint8Array.from(buf);

  u8.forEach(function (i) {
    var h = i.toString(16);
    if (h.length % 2) { h = '0' + h; }
    hex.push(h);
  });

  return BigInt('0x' + hex.join(''));
}

export function bytesToHexString(bytes: any) {
  var strItems: any;
  strItems = [];
  for (var i = 0; i < bytes.length; i++) {
    let item = bytes[i]
    let st = item.toString(16)
    if (st.length == 1) {
      st = '0' + st
    }
    // st = st.toUpperCase()
    strItems.push(st)
  }
  let strItemsJoined = strItems.join("")
  return strItemsJoined
}
