import { BigNumber } from "ethers";
import { EDDSAUtil } from "./EDDSAUtil";
import { bnToBuf, SignatureScheme } from "./eddsa";
import { assert } from "console";

function testEddsaPack_1() {
  console.log("testEddsaPack")

  // Input
  const publicKeyX = "0x10440b6de1fc92536e20501e7513b5ca78d4c8c876450d97cfc2a4e24a4c67c7"
  const publicKeyY = "0x10dfbb7cd80bde2eeedbf9e0fad12819ca20be36b96a7f28c37c6a7550ed366c"

  // Output
  const eddsaPackOutput = "10dfbb7cd80bde2eeedbf9e0fad12819ca20be36b96a7f28c37c6a7550ed366c"

  const packed = EDDSAUtil.pack(publicKeyX, publicKeyY)  
  assert(packed === eddsaPackOutput)
  console.log("testEddsaPack passed")
}

function testEddsaPack_2() {
  console.log("testEddsaPack")

  // Input
  const publicKeyX = "0x191f8455196d7c9116065b69a745edbe3f5b6193125f48d818e16101b0ebd13f"
  const publicKeyY = "0x0729569e74800ba4344767d608ec54f12b14cc4404a8726b5f73ebf8b58f9a09"

  // Output
  const eddsaPackOutput = "8729569e74800ba4344767d608ec54f12b14cc4404a8726b5f73ebf8b58f9a09"

  const packed = EDDSAUtil.pack(publicKeyX, publicKeyY)  
  assert(packed === eddsaPackOutput)
  console.log("testEddsaPack passed")
}

function testEddsaPack_3() {
  console.log("testEddsaPack")

  // Input
  const publicKeyX = "0x1ae187c43a6b534be1ac60b335d5cc8c12a9d479339e5ce4134315e20c2940c4"
  const publicKeyY = "0x16fb785193a8657feb41b7944afde61fe05ea519621fa0f19d872a8fbba83463"

  // Output
  const eddsaPackOutput = "96fb785193a8657feb41b7944afde61fe05ea519621fa0f19d872a8fbba83463"

  const packed = EDDSAUtil.pack(publicKeyX, publicKeyY)  
  assert(packed === eddsaPackOutput)
  console.log("testEddsaPack passed")
}

function testEddsaSign() {
  console.log("testEddsaSign")
  const strKey = "1965533437444427599736796973543479035828634172708055838572430750620147597402"
  const msg = "20823375595941673465102915960468301465677704522962441935281926279865178787657"
  const result = EDDSAUtil.sign(strKey, msg)
  // assert(result == "0x04ad08469a4a8622a661a793615ebddfa6ea2b72c8f1b02e33288ea2bd71cede0ed7f67939097ab95d3c9d8647e198f4ef523bf6cfb8da0ead89a57e27eff0d12ea6ac32cc118b1bc0aeb8f1be37f317f399197f9e41c8a90ecfe9e296be42e5")
  console.log(result.Rx)
  console.log(result.Ry)
  console.log(result.s)
  
  assert(result.Rx === "2114973053955517366033592592501464590076342821657201629830614924692550700766")
  assert(result.Ry === "6713953096854639492359183468711112854151280690992619923536842965423886430417")
  assert(result.s === "21100876117443371431735908718802018647851328087147897184613053393129281831653")

  console.log("testEddsaSign passed")
}

function test_generateKeyPair() {
  console.log("generateKeyPair")
  const seedHex = "0x" + "7f16a4c491d3494c3bc8ef097e7c123a9da6fa8167631efd5f82b89e803b0682"
  const seed = BigNumber.from(seedHex)
  console.log(`seed ${seed.toString()}`)
  const bitIntDataItems = bnToBuf(seed.toString());
  console.log(`bigIntData ${bitIntDataItems}`)
  
  const keyPair = EDDSAUtil.generateKeyPair(bitIntDataItems)

  assert(keyPair.publicKeyX === "18584920749226215196041463810216086509508234553287520526360090588893385486657")
  assert(keyPair.publicKeyY === "4521439321743413283487130903749053907482128013050103604539374548984130428531")

  console.log("generateKeyPair passed")
}

function main() {
  console.log("\n\TestsEDDSAUtil_test\n")
  testEddsaPack_1()
  testEddsaPack_2()
  testEddsaPack_3()
  // test_generateKeyPair()
  // testEddsaSign()
}

main();