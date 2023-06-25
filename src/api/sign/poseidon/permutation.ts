/*
 Implements the Poseidon permutation:

 Starkad and Poseidon: New Hash Functions for Zero Knowledge Proof Systems
  - Lorenzo Grassi, Daniel Kales, Dmitry Khovratovich, Arnab Roy, Christian Rechberger, and Markus Schofnegger
  - https://eprint.iacr.org/2019/458.pdf

 Other implementations:

  - https://github.com/shamatar/PoseidonTree/
  - https://github.com/iden3/circomlib/blob/master/src/poseidon.js
  - https://github.com/dusk-network/poseidon252
 */
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
import { SignatureScheme } from "./eddsa";
import { modulo } from "./field";

import { TextEncoder } from "web-encoding";
import { BigNumber } from "@ethersproject/bignumber";

// @ts-ignore
var blake2b = require("blake2b");

export class PoseidonParams {
  public p: BigInt;
  public t: number;
  public nRoundsF: number;
  public nRoundsP: number;
  public seed: string;
  public e: BigInt;
  public constants_C: [BigInt];
  public constants_M: [[BigInt]];
  public security_target: number;

  constructor(
    p: BigInt,
    t: number,
    nRoundsF: number,
    nRoundsP: number,
    seed: string,
    e: BigInt,
    constants_C: [BigInt] | null,
    constants_M: [[BigInt]] | null,
    security_target: number
  ) {
    this.p = p;
    this.t = t;
    this.nRoundsF = nRoundsF;
    this.nRoundsP = nRoundsP;
    this.seed = seed;
    this.e = e;

    if (constants_C == null) {
      this.constants_C = permunation.poseidon_constants(
        p,
        `${seed}_constants`,
        nRoundsF + nRoundsP
      );
    } else {
      this.constants_C = constants_C;
    }

    if (constants_M == null) {
      this.constants_M = permunation.poseidon_matrix(
        p,
        `${seed}_matrix_0000`,
        t
      );
    } else {
      this.constants_M = constants_M;
    }

    this.security_target = security_target;
  }
}

export class permunation {
  static H(arg: string) {
    const outputLength = 32;

    const enc = new TextEncoder();
    const message = enc.encode(arg);
    // console.log(`message ${message}`)

    const buf = Buffer.alloc(outputLength);
    // console.log(`hashOfSize32Bytes ${buf.toString()}`)
    // console.log(`message ${message}`)
    blake2b(buf.length, null).update(message).final(buf);
    const items = buf.toJSON().data;
    // console.log(`H items ${items}`)

    let sum = BigInt("0");
    var i = 0;
    for (var i = 0; i < items.length; i++) {
      const itemBigInt = BigInt(items[i]);
      const tmp = itemBigInt * BigInt(BigNumber.from(256).pow(i).toString());
      sum = sum + tmp;
    }
    // console.log(`sum ${sum}`)
    return sum;
  }

  static H_Bigint(arg: BigInt) {
    const outputLength = 32;

    const message = new Uint8Array(SignatureScheme.to_bytes(arg));
    // console.log(`message ${message}`)

    const buf = Buffer.alloc(outputLength);
    // console.log(`hashOfSize32Bytes ${buf.toString()}`)
    blake2b(buf.length, null).update(message).final(buf);
    const items = buf.toJSON().data;
    // console.log(`H_Bigint items ${items}`)

    let sum = BigInt("0");
    var i = 0;
    for (var i = 0; i < items.length; i++) {
      const itemBigInt = BigInt(items[i]);
      const tmp = itemBigInt * BigInt(BigNumber.from(256).pow(i).toString());
      sum = sum + tmp;
    }
    // console.log(`sum ${sum}`)
    return sum;
  }

  static poseidon_constants(p: BigInt, seed: string, n: number) {
    let c: any;
    c = [];
    let seedBigInt = this.H(seed);
    const result = seedBigInt % p;
    c.push(result);
    for (let i = 0; i < n - 1; i++) {
      seedBigInt = this.H_Bigint(seedBigInt);
      const result = seedBigInt % p;
      c.push(result);
    }
    return c;
  }

  static poseidon_matrix(p: BigInt, seed: string, t: number) {
    const c = this.poseidon_constants(p, seed, t * 2);
    let matrix: any;
    matrix = [];
    for (let i = 0; i < t; i++) {
      let row: any;
      row = [];
      for (let j = 0; j < t; j++) {
        const c_i = c[i];
        const c_t_j = c[t + j];
        const p_c = p;
        const c_t_j_p = c_t_j % p_c;
        const left = c_i - c_t_j_p;
        const p_2 = p_c - 2;
        const item_c = modulo(left, p_2, p_c);
        row.push(item_c);
      }
      matrix.push(row);
    }
    return matrix;
  }

  static poseidon_sbox(state: [BigInt], i: number, params: PoseidonParams) {
    /*
    iacr.org/2019/458 § 2.2 The Hades Strategy (pg 6)

    In more details, assume R_F = 2 · R_f is an even number. Then
    - the first R_f rounds have a full S-Box layer,
    - the middle R_P rounds have a partial S-Box layer (i.e., 1 S-Box layer),
    - the last R_f rounds have a full S-Box layer
    */
    const half_F = params.nRoundsF / 2;

    if (i < half_F || i >= half_F + params.nRoundsP) {
      for (let j = 0; j < state.length; j++) {
        const element_c = state[j];
        const e_c = params.e;
        const p_c = params.p;
        const item = modulo(element_c, e_c, p_c);
        state[j] = item;
      }
    } else {
      const element_c = state[0];
      const e_c = params.e;
      const p_c = params.p;
      const item = modulo(element_c, e_c, p_c);
      state[0] = item;
    }
    return state;
  }

  static poseidon_mix(state: [BigInt], M: [[BigInt]], p: BigInt) {
    /*
    The mixing layer is a matrix vector product of the state with the mixing matrix
      - https://mathinsight.org/matrix_vector_multiplication
    */
    let newState: any;
    newState = [];
    for (let i = 0; i < M.length; i++) {
      let sum = BigInt(0);
      for (let j = 0; j < state.length; j++) {
        const element = state[j];
        sum = sum + M[i][j] * element;
      }
      newState.push(sum % p);
    }
    return newState;
  }

  // poseidon
  /*
    Main instansiation of the Poseidon permutation

    The state is `t` elements wide, there are `F` full-rounds
    followed by `P` partial rounds, then `F` full rounds again.

        [    ARK    ]    --,
          | | | | | |       |
        [    SBOX   ]       -  Full Round
          | | | | | |       |
        [    MIX    ]    --`


        [    ARK    ]    --,
          | | | | | |       |
        [    SBOX   ]       -  Partial Round
                    |       |   Only 1 element is substituted in partial round
        [    MIX    ]    --`

    There are F+P rounds for the full permutation.

    You can provide `r = N - 2s` bits of input per round, where `s` is the desired
    security level, in most cases this means you can provide `t-1` inputs with
    appropriately chosen parameters. The permutation can be 'chained' together
    to form a sponge construct.
  */
  static poseidon(inputs: [BigInt], params: PoseidonParams) {
    let state: any;
    state = [];
    state = state.concat(inputs);
    // console.log(`state ${state}`)
    for (var i = 0; i < params.t - inputs.length; i++) {
      state.push(BigInt(0));
    }

    // console.log(`state ${state}`)
    // console.log(`params.constants_C.length ${params.constants_C.length}`)

    for (var i = 0; i < params.constants_C.length; i++) {
      const C_i = params.constants_C[i];

      for (let index = 0; index < state.length; index++) {
        const element = state[index];
        state[index] = element.add(C_i);
      }

      state = this.poseidon_sbox(state, i, params);
      // console.log(`after poseidon_sbox ${state}`)

      state = this.poseidon_mix(state, params.constants_M, params.p);
      // console.log(`after poseidon_mix ${state}`)
    }
    // console.log(`hash is ${state[0]}`)
    return state[0];
  }
}
