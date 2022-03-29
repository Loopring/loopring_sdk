import { assert } from "console";
import { BigNumber } from "ethers";
import { field } from "./field";
import { permunation, PoseidonParams } from "./permutation";

function test_PoseidonParams() {
  // console.log("test_PoseidonParams")
  const p = field.SNARK_SCALAR_FIELD
  const t = 6
  const nRoundsF = 8
  const nRoundsP = 57
  const seed = "poseidon"
  const e = BigNumber.from(5)
  const security_target = 126

  const poseidonParams = new PoseidonParams(p, t, nRoundsF, nRoundsP, seed, e, null, null, security_target)
  // console.log(`poseidonParams ${poseidonParams.constants_C}`)
  // @ts-ignore
  assert(poseidonParams.constants_C[0].eq(BigNumber.from("14397397413755236225575615486459253198602422701513067526754101844196324375522")), "poseidonParams.constants_C[0]")
  // @ts-ignore
  assert(poseidonParams.constants_C[1].eq(BigNumber.from("10405129301473404666785234951972711717481302463898292859783056520670200613128")), "poseidonParams.constants_C[2]")
  // @ts-ignore
  assert(poseidonParams.constants_C[63].eq(BigNumber.from("14423660424692802524250720264041003098290275890428483723270346403986712981505")), "poseidonParams.constants_C[3]")
  // @ts-ignore
  assert(poseidonParams.constants_C[64].eq(BigNumber.from("10635360132728137321700090133109897687122647659471659996419791842933639708516")), "poseidonParams.constants_C[64]")
  
  // @ts-ignore
  assert(poseidonParams.constants_M[0][0].eq(BigNumber.from("19167410339349846567561662441069598364702008768579734801591448511131028229281")), "poseidonParams.constants_M[0][0]")
  // @ts-ignore
  assert(poseidonParams.constants_M[0][1].eq(BigNumber.from("14183033936038168803360723133013092560869148726790180682363054735190196956789")), "poseidonParams.constants_M[0][1]")
  // @ts-ignore
  assert(poseidonParams.constants_M[0][2].eq(BigNumber.from("9067734253445064890734144122526450279189023719890032859456830213166173619761")), "poseidonParams.constants_M[0][2]")

  // @ts-ignore
  assert(poseidonParams.constants_M[5][3].eq(BigNumber.from("8035240799672199706102747147502951589635001418759394863664434079699838251138")), "poseidonParams.constants_M[0][0]")
  // @ts-ignore
  assert(poseidonParams.constants_M[5][4].eq(BigNumber.from("21642389080762222565487157652540372010968704000567605990102641816691459811717")), "poseidonParams.constants_M[0][1]")
  // @ts-ignore
  assert(poseidonParams.constants_M[5][5].eq(BigNumber.from("20261355950827657195644012399234591122288573679402601053407151083849785332516")), "poseidonParams.constants_M[0][2]")

  // console.log("test_PoseidonParams passed")
}

function test_H_1() {
  console.log("test_H_1")
  const arg = "poseidon_constants"
  const hash = permunation.H(arg)
  assert(hash.eq(BigNumber.from("80062126029273061892314832722231078464247515902761170557848714403923749862373")))
  console.log("test_H_1 passed")
}

function test_H_2() {
  console.log("test_H_2")
  const arg = "poseidon_matrix_0000"
  const hash = permunation.H(arg)
  assert(hash.eq(BigNumber.from("14132513739920849383792069751007754351800355055139761101807090020635929082500")))
  console.log("test_H_2 passed")
}

function test_H_3() {
  console.log("test_H_3")
  const arg = BigNumber.from("14132513739920849383792069751007754351800355055139761101807090020635929082500")
  const hash = permunation.H_Bigint(arg)
  assert(hash.eq(BigNumber.from("2944673226682481007627110343206629017840128596422012786319796010373889882365")))
  console.log("test_H_3 passed")
}

function test_poseidon_constants() {
  // console.log("test_poseidon_constants")
  const p = field.SNARK_SCALAR_FIELD
  const seed = "poseidon_constants"
  const n = 65
  const constants_C = permunation.poseidon_constants(p, seed, n)
  assert(constants_C[0].eq(BigNumber.from("14397397413755236225575615486459253198602422701513067526754101844196324375522")))
  assert(constants_C[1].eq(BigNumber.from("10405129301473404666785234951972711717481302463898292859783056520670200613128")))
  assert(constants_C[2].eq(BigNumber.from("5179144822360023508491245509308555580251733042407187134628755730783052214509")))
  assert(constants_C[63].eq(BigNumber.from("14423660424692802524250720264041003098290275890428483723270346403986712981505")))
  assert(constants_C[64].eq(BigNumber.from("10635360132728137321700090133109897687122647659471659996419791842933639708516")))
  // console.log("test_poseidon_constants passed")
}

function test_poseidon_matrix() {
  console.log("test_poseidon_matrix")
  const p = field.SNARK_SCALAR_FIELD
  const seed = "poseidon_matrix_0000"
  const t = 9
  const constants_M = permunation.poseidon_matrix(p, seed, t)
  assert(constants_M[0][0].eq(BigNumber.from("16378664841697311562845443097199265623838619398287411428110917414833007677155")))
  assert(constants_M[0][1].eq(BigNumber.from("12968540216479938138647596899147650021419273189336843725176422194136033835172")))
  assert(constants_M[0][2].eq(BigNumber.from("3636162562566338420490575570584278737093584021456168183289112789616069756675")))
  assert(constants_M[1][3].eq(BigNumber.from("8642889650254799419576843603477253661899356105675006557919250564400804756641")))
  assert(constants_M[8][8].eq(BigNumber.from("11398590172899810645820530606484864595574598270604175688862890426075002823331")))
  console.log("test_poseidon_matrix passed")
}

function test_poseidon_1() {
  console.log("test_poseidon_1")
  const p = BigNumber.from("21888242871839275222246405745257275088548364400416034343698204186575808495617")
  const MAX_INPUT = 8
  const poseidonParams = new PoseidonParams(p, MAX_INPUT+1, 6, 53, "poseidon", BigNumber.from(5), null, null, 128)
  let intputs: any
  intputs = []
  intputs.push(BigNumber.from(1))
  const state0 = permunation.poseidon(intputs, poseidonParams)
  assert(state0.eq(BigNumber.from("20640057815290657586474256351705900781103272844170318852926520138679251832017")))
  console.log("test_poseidon_1 passed")
}

function test_poseidon_2() {
  console.log("test_poseidon_2")
  const p = BigNumber.from("21888242871839275222246405745257275088548364400416034343698204186575808495617")
  const MAX_INPUT = 8
  const poseidonParams = new PoseidonParams(p, MAX_INPUT+1, 6, 53, "poseidon", BigNumber.from(5), null, null, 128)
  let intputs: any
  intputs = []
  intputs.push(BigNumber.from(1))
  intputs.push(BigNumber.from(2))
  const state0 = permunation.poseidon(intputs, poseidonParams)
  assert(state0.eq(BigNumber.from("9251914430137119038619835991672259215400712688203929648293348181354900386736")))
  console.log("test_poseidon_2 passed")
}

function test_poseidon_3() {
  console.log("test_poseidon_3")
  const p = BigNumber.from("21888242871839275222246405745257275088548364400416034343698204186575808495617")
  const MAX_INPUT = 8
  const poseidonParams = new PoseidonParams(p, MAX_INPUT+1, 6, 53, "poseidon", BigNumber.from(5), null, null, 128)
  let intputs: any
  intputs = []
  intputs.push(BigNumber.from(1))
  intputs.push(BigNumber.from(2))
  intputs.push(BigNumber.from(3))
  intputs.push(BigNumber.from(4))
  intputs.push(BigNumber.from(5))
  intputs.push(BigNumber.from(6))
  intputs.push(BigNumber.from(7))
  intputs.push(BigNumber.from(8))
  const state0 = permunation.poseidon(intputs, poseidonParams)
  assert(state0.eq(BigNumber.from("1792233229836714442925799757877868602259716425270865187624398529027734741166")))
  console.log("test_poseidon_3 passed")
}

function main() {
  // console.log("\n\npermutation_test\n")
  // test_PoseidonParams()
  test_H_1()
  test_H_2()
  test_H_3()
  // test_poseidon_constants()
  test_poseidon_matrix()
  test_poseidon_1()
  test_poseidon_2()
  test_poseidon_3()
}

main();