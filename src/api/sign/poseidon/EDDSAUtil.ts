import { BigNumber } from "ethers";
import { SignatureScheme } from "./eddsa";
import { FQ } from "./field";
import { jubjub } from "./jubjub";
import { babyJub } from "./babyJub";

export class EDDSAUtil {
  
  static sign(PrivateKey: string | undefined, hash: any) {
    let strKey = BigNumber.from(PrivateKey)
    let msg = BigNumber.from(hash)

    // console.log("strKey", strKey.toString())
    // console.log("msg", msg.toString())
    let copyKey = new FQ(strKey)
    let B = SignatureScheme.B()
    let signed = SignatureScheme.sign(msg, copyKey, B)
    // console.log("signed", signed.toStr())
    let x = EDDSAUtil.formatted(signed.sig.R.x.n.toHexString().slice(2))
    let y = EDDSAUtil.formatted(signed.sig.R.y.n.toHexString().slice(2))
    let s = EDDSAUtil.formatted(signed.sig.s.n.toHexString().slice(2))
    let result = `0x${x}${y}${s}`
    // console.log("result", result)
    return {
      "Rx": signed.sig.R.x.n.toString(),
      "Ry": signed.sig.R.y.n.toString(),
      "s": signed.sig.s.n.toString()
    }
  }

  static formatted(hexString: string) {
    let outputLength = 32 * 2
    let more = outputLength - hexString.length
    if (more > 0) {
      for (var i = 0; i < more; i++) {
        hexString = "0" + (hexString)
      }
    } else {
      hexString = hexString.slice(0, outputLength)
    }
    return hexString
  }

  static generateKeyPair(seed: any) {
    // console.log("seed", seed)
    let bigInt = BigNumber.from(0)
    for (var i = 0; i < seed.length; i++) {
      let item = seed[i]
      let itemBigInt = BigNumber.from(item)
      let tmp = BigNumber.from("256").pow(i)
      bigInt = bigInt.add(itemBigInt.mul(tmp))
    }
    // console.log("sum", bigInt.toString())

    let secretKey = bigInt.mod(jubjub.JUBJUB_L)
    // console.log("secretKey", secretKey.toString())

    let copySecretKey = BigNumber.from(secretKey.toString())
    let B = SignatureScheme.B()
    let publicKey = B.mul(copySecretKey)
    // console.log("publicKey", publicKey.x.n.toString(), publicKey.y.n.toString())

    let keyPair = {
      "publicKeyX": publicKey.x.n.toString(),
      "publicKeyY": publicKey.y.n.toString(),
      "secretKey": secretKey.toString()
    }

    return keyPair
  }

  static pack(publicKeyX: string, publicKeyY: string) {
    let P0 = BigNumber.from(publicKeyX)
    let P1 = BigNumber.from(publicKeyY)
    let newPack = babyJub.packPoint(P0, P1)
    return newPack
  }

}
