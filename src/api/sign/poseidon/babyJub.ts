import { SignatureScheme, bytesToHexString } from "./eddsa";
import { field } from "./field";

/**
 * BigNumber -> BigInt
 * BigNumber.from() -> BigInt() or \dn
 * div -> /
 * mul -> *
 * sub -> -
 * gt -> >
 * lt -> <
 * gte -> >=
 * eq -> ==
 * and -> &&=
 * pow -> **
 */
export class babyJub {
  static packPoint(P0: BigInt, P1: BigInt) {
    const packed = SignatureScheme.to_bytes(P1).reverse();
    // console.log("packed", packed)
    if (babyJub.lt(P0, BigInt("0"))) {
      // lt -> <
      // console.log("Update .... lt ")
      packed[0] = packed[0] | 0x80;
    }
    const hexStr = bytesToHexString(packed);
    // console.log("hexStr", hexStr)
    return hexStr;
  }

  static lt(a: BigInt, b: BigInt) {
    const half = field.SNARK_SCALAR_FIELD / BigInt("2"); // div -> /
    const p = field.SNARK_SCALAR_FIELD;
    let aa: BigInt;
    let bb: BigInt;
    if (a > half) {
      // gt -> >
      aa = a - p; // sub -> -
    } else {
      aa = a;
    }
    if (b > half) {
      // gt -> >
      bb = b - p; // sub -> -
    } else {
      bb = b;
    }
    // console.log("lt", a.toString(), b.toString(), aa.toString(), bb.toString());
    return aa < bb; // lt -> <
  }

  static gt(a: BigInt, b: BigInt) {
    const half = field.SNARK_SCALAR_FIELD / BigInt("2"); // div -> /
    const p = field.SNARK_SCALAR_FIELD;
    let aa: BigInt;
    let bb: BigInt;
    if (a > half) {
      aa = a - p; // sub -> -
    } else {
      aa = a;
    }
    if (b > half) {
      // gt -> >
      bb = b - p; // sub -> -
    } else {
      bb = b;
    }
    // console.log("gt", a.toString(), b.toString(), aa.toString(), bb.toString());
    return aa > bb; // gt -> >
  }

  [key: string]: any;
}
