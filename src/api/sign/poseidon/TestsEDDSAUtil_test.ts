import { BigNumber } from "ethers";
import { EDDSAUtil } from "./EDDSAUtil";
import { bnToBuf, SignatureScheme } from "./eddsa";
import { assert } from "console";

function test_generateKeyPair() {
  console.log("generateKeyPair")
  let seedHex = "0x" + "7f16a4c491d3494c3bc8ef097e7c123a9da6fa8167631efd5f82b89e803b0682"
  let seed = BigNumber.from(seedHex)
  console.log(`seed ${seed.toString()}`)
  let bitIntDataItems = bnToBuf(seed.toString());
  console.log(`bigIntData ${bitIntDataItems}`)
  
  let publicKey = EDDSAUtil.generateKeyPair(bitIntDataItems)

  assert(publicKey.x.n.eq(BigNumber.from("18584920749226215196041463810216086509508234553287520526360090588893385486657")))
  assert(publicKey.y.n.eq(BigNumber.from("4521439321743413283487130903749053907482128013050103604539374548984130428531")))

  console.log("generateKeyPair passed")
}

function main() {
  console.log("\n\TestsEDDSAUtil_test\n")
  test_generateKeyPair()
}

main();