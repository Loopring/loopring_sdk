import { BigInteger } from "jsbn";

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
export class field {
  // Fq is the base field of Jubjub
  static SNARK_SCALAR_FIELD = BigInt(
    "21888242871839275222246405745257275088548364400416034343698204186575808495617"
  );

  // Fr is the scalar field of Jubjub
  static FR_ORDER = BigInt(
    "21888242871839275222246405745257275088614511777268538073601725287587578984328"
  );
}

// A class for field elements in FQ. Wrap a number in this class,
// and it becomes a field element.
export class FQ {
  public m: BigInt;
  public n: BigInt;

  constructor(n: BigInt, field_modulus = field.SNARK_SCALAR_FIELD) {
    this.m = field_modulus;
    this.n = n % this.m;
  }

  //
  // Use this.n as other
  //

  add(other: BigInt) {
    const on = other;
    const n = (this.n + on) % this.m;
    return new FQ(n, this.m);
  }

  mul(other: BigInt) {
    const on = other;
    const n = (this.n * on) % this.m;
    return new FQ(n, this.m);
  }

  sub(other: BigInt) {
    const on = other;
    let new_n: BigInt;
    if (this.n >= on) {
      new_n = (this.n - on) % this.m;
    } else {
      new_n = (this.n - on + this.m) % this.m;
    }
    return new FQ(new_n, this.m);
  }

  div(other: BigInt) {
    const on_c = other;
    const m_c = this.m;
    const two_c = BigInt("2");
    const on_power_c = modulo(on_c, m_c - two_c, m_c);
    const n_on_power_remainder = (this.n * on_power_c) % this.m;

    return new FQ(n_on_power_remainder, this.m);
  }

  static one(modulus: BigInt = field.SNARK_SCALAR_FIELD) {
    return new FQ(BigInt("1"), modulus);
  }

  static zero(modulus: BigInt = field.SNARK_SCALAR_FIELD) {
    return new FQ(BigInt("0"), modulus);
  }
}

export function modulo(n: BigInt, p: BigInt, m: BigInt) {
  const n_ = new BigInteger(n.toString());
  const p_ = new BigInteger(p.toString());
  const m_ = new BigInteger(m.toString());

  // console.log("modulo", n_.toString(), p_.toString(), m_.toString());
  const result = n_.modPow(p_, m_);
  // console.log(n_.toString(), p_.toString(), m_.toString(), result.toString())
  return BigInt(result.toString());
}
