import { SignatureScheme } from "./eddsa";
import { FQ } from "./field";
import { jubjub } from "./jubjub";
import { babyJub } from "./babyJub";
import { toHex } from "../../../utils";

/**
 * BigNumber -> BigInt
 * BigNumber.from() -> BigInt() or \dn
 * div -> /
 * sub -> -
 * gt -> >
 * lt -> <
 * gte -> >=
 * eq -> ==
 * and -> &&=
 */
export class EDDSAUtil {
  static sign(PrivateKey: string | undefined, hash: any) {
    const strKey = BigInt(PrivateKey ?? "");
    const msg = BigInt(hash);

    // console.log("strKey", strKey.toString())
    // console.log("msg", msg.toString())
    const copyKey = new FQ(strKey);
    const B = SignatureScheme.B();
    const signed = SignatureScheme.sign(msg, copyKey, B);
    // console.log("signed", signed.toStr())
    const x = EDDSAUtil.formatted(toHex(signed.sig.R.x.n).slice(2));
    const y = EDDSAUtil.formatted(toHex(signed.sig.R.y.n).slice(2));
    const s = EDDSAUtil.formatted(toHex(signed.sig.s.n).slice(2));
    const result = `0x${x}${y}${s}`;
    // console.log("result", result)
    return {
      Rx: signed.sig.R.x.n.toString(),
      Ry: signed.sig.R.y.n.toString(),
      s: signed.sig.s.n.toString(),
    };
  }

  static formatted(hexString: string) {
    const outputLength = 32 * 2;
    const more = outputLength - hexString.length;
    if (more > 0) {
      for (let i = 0; i < more; i++) {
        hexString = "0" + hexString;
      }
    } else {
      hexString = hexString.slice(0, outputLength);
    }
    return hexString;
  }

  static generateKeyPair(seed: any) {
    let bigInt = BigInt(0);
    for (let i = 0; i < seed.length; i++) {
      const item = seed[i];
      const itemBigInt = BigInt(item);
      const tmp = 256 ** BigInt(i);
      bigInt = bigInt + itemBigInt * tmp;
    }
    // console.log("sum", bigInt.toString())
    const secretKey = bigInt % jubjub.JUBJUB_L;
    // console.log("secretKey", secretKey.toString())

    const copySecretKey = BigInt(secretKey.toString());
    // console.log("copySecretKey", copySecretKey.toString())

    const B = SignatureScheme.B();
    // console.log("B", B.toString())

    const publicKey = B.mul(copySecretKey);
    // console.log("publicKey", publicKey.x.n.toString(), publicKey.y.n.toString())

    const keyPair = {
      publicKeyX: publicKey.x.n.toString(),
      publicKeyY: publicKey.y.n.toString(),
      secretKey: secretKey.toString(),
    };

    return keyPair;
  }

  static pack(publicKeyX: string, publicKeyY: string) {
    const P0 = BigInt(publicKeyX);
    const P1 = BigInt(publicKeyY);
    const newPack = babyJub.packPoint(P0, P1);
    return newPack;
  }
}
