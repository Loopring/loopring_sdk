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

import { BigNumber } from "ethers";
import { bnToBuf, SignatureScheme } from "./eddsa";
import { modulo } from './field';

// util is for TextEncoder
var util = require('util');

var sodium = require('sodium-native')

export class PoseidonParams {
  public p: BigNumber;
  public t: number;
  public nRoundsF: number;
  public nRoundsP: number;
  public seed: String;
  public e: BigNumber;
  public constants_C: [BigNumber]
  public constants_M: [[BigNumber]]
  public security_target: number

  constructor(p: BigNumber, t: number, nRoundsF: number, nRoundsP: number, seed: String, e: BigNumber, constants_C: [BigNumber] | null, constants_M: [[BigNumber]] | null, security_target: number) {
    this.p = p
    this.t = t
    this.nRoundsF = nRoundsF
    this.nRoundsP = nRoundsP
    this.seed = seed
    this.e = e

    if (constants_C == null) {
      this.constants_C = permunation.poseidon_constants(p, `${seed}_constants`, nRoundsF + nRoundsP)
    } else {
      this.constants_C = constants_C
    }

    if (constants_M == null) {
      this.constants_M = permunation.poseidon_matrix(p, `${seed}_matrix_0000`, t)
    } else {
      this.constants_M = constants_M
    }

    this.security_target = security_target
  }

}

export class permunation {

  static H(arg: string) {
    let outputLength = 32

    var enc = new util.TextEncoder();    
    var message = enc.encode(arg)
    // console.log(`message ${message}`)

    let buf = Buffer.alloc(outputLength)
    // console.log(`hashOfSize32Bytes ${buf.toString()}`)    
    sodium.crypto_generichash(buf, message)
    let items = buf.toJSON().data
    // console.log(`items ${items}`)

    let sum = BigNumber.from("0")
    var i = 0
    for (var i = 0; i < items.length; i++) {
      let itemBigInt = BigNumber.from(items[i])
      let tmp = itemBigInt.mul((BigNumber.from(256).pow(i)))
      sum = sum.add(tmp)
    }
    // console.log(`sum ${sum}`)
    return sum
  }

  static H_Bigint(arg: BigNumber) {
    let outputLength = 32

    let message = new Uint8Array(SignatureScheme.to_bytes(arg))
    // console.log(`message ${message}`)

    let buf = Buffer.alloc(outputLength)
    // console.log(`hashOfSize32Bytes ${buf.toString()}`)    
    sodium.crypto_generichash(buf, message)
    let items = buf.toJSON().data
    // console.log(`items ${items}`)

    let sum = BigNumber.from("0")
    var i = 0
    for (var i = 0; i < items.length; i++) {
      let itemBigInt = BigNumber.from(items[i])
      let tmp = itemBigInt.mul((BigNumber.from(256).pow(i)))
      sum = sum.add(tmp)
    }
    // console.log(`sum ${sum}`)
    return sum
  }


  static poseidon_constants(p: BigNumber, seed: string, n: number) {
    let c: any
    c = []
    let seedBigInt = this.H(seed)
    let result = seedBigInt.mod(p)
    c.push(result)
    for (var i = 0; i < n-1; i++) {
      seedBigInt = this.H_Bigint(seedBigInt)
      let result = seedBigInt.mod(p)
      c.push(result)
    }
    return c
  }

  static poseidon_matrix(p: BigNumber, seed: string, t: number) {
    let c = this.poseidon_constants(p, seed, t*2)
    let matrix: any
    matrix = []
    for (var i = 0; i < t; i++) {
      let row: any
      row = []
      for (var j = 0; j < t; j++) {
        let c_i = c[i]
        let c_t_j = c[t+j]
        let p_c = p
        let c_t_j_p = c_t_j.mod(p_c)
        let left = c_i.sub(c_t_j_p)
        let p_2 = p_c.sub(2)
        let item_c = modulo(left, p_2, p_c)
        row.push(item_c)
      }
      matrix.push(row)
    }
    return matrix
  }

  static poseidon_sbox(state: [BigNumber], i: number, params: PoseidonParams) {
    /*
    iacr.org/2019/458 § 2.2 The Hades Strategy (pg 6)

    In more details, assume R_F = 2 · R_f is an even number. Then
    - the first R_f rounds have a full S-Box layer,
    - the middle R_P rounds have a partial S-Box layer (i.e., 1 S-Box layer),
    - the last R_f rounds have a full S-Box layer
    */
    let half_F = params.nRoundsF / 2

    if (i < half_F || i >= (half_F + params.nRoundsP)) {
      for (var j = 0; j < state.length; j++) {
        let element_c = state[j]
        let e_c = params.e
        let p_c = params.p
        let item = modulo(element_c, e_c, p_c)
        state[j] = item
      }
    } else {
      let element_c = state[0]
      let e_c = params.e
      let p_c = params.p
      let item = modulo(element_c, e_c, p_c)
      state[0] = item
    }
    return state
  }

  static poseidon_mix(state: [BigNumber], M: [[BigNumber]], p: BigNumber) {
    /*
    The mixing layer is a matrix vector product of the state with the mixing matrix
      - https://mathinsight.org/matrix_vector_multiplication
    */
    let newState: any
    newState = []
    for (var i = 0; i < M.length; i++) {
      let sum = BigNumber.from(0)
      for (var j = 0; j < state.length; j++) {
        let element = state[j]
        sum = sum.add((M[i][j].mul(element)))
      }
      newState.push(sum.mod(p))
    }
    return newState
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
  static poseidon(inputs: [BigNumber], params: PoseidonParams) {
    let state: any
    state = []
    state = state.concat(inputs)
    // console.log(`state ${state}`)
    for (var i = 0; i < params.t - inputs.length; i++) {
      state.push(BigNumber.from(0))
    }

    // console.log(`state ${state}`)
    // console.log(`params.constants_C.length ${params.constants_C.length}`)

    for (var i = 0; i < params.constants_C.length; i++) {
      let C_i = params.constants_C[i]

      for (var index = 0; index < state.length; index++) {
        let element = state[index]
        state[index] = element.add(C_i)
      }

      state = this.poseidon_sbox(state, i, params)
      // console.log(`after poseidon_sbox ${state}`)

      state = this.poseidon_mix(state, params.constants_M, params.p)
      // console.log(`after poseidon_mix ${state}`)
    }
    // console.log(`hash is ${state[0]}`)
    return state[0]
  }

}
