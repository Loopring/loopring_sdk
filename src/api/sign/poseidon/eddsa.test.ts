import { SignatureScheme } from "./eddsa";
import { FQ } from "./field";
import { Point } from "./jubjub";

function test_sign_1() {
  // console.log("test_sign_1")
  const startTime: any = new Date();
  const msgHash = BigInt(
    "20693456676802104653139582814194312788878632719314804297029697306071204881418"
  );
  const private_key = new FQ(BigInt("1"));
  const signed = SignatureScheme.sign(
    msgHash,
    private_key,
    SignatureScheme.B()
  );
  console.log(
    signed.toStr() ===
      "16540640123574156134436876038791482806971768689494387082833631921987005038935 20819045374670962167435360035096875258406992893633759881276124905556507972311 4991609103248925747358645194965349262579784734809679007552644294476920671344 423391641476660815714427268720766993055332927752794962916609674122318189741 4678160339597842896640121413028167917237396460457527040724180632868306529961 20693456676802104653139582814194312788878632719314804297029697306071204881418"
  );
  const endTime: any = new Date();
  let timeDiff = endTime - startTime; //in ms
  timeDiff /= 1000;
  // console.log(timeDiff + " seconds");
  // console.log("test_sign_1 passed")
}

function test_prehash_message_1() {
  // console.log("test_prehash_message_1")
  const msg = BigInt(
    "20693456676802104653139582814194312788878632719314804297029697306071204881418"
  );
  const result = SignatureScheme.prehash_message(msg);
  console.log(
    result ==
      BigInt(
        "20693456676802104653139582814194312788878632719314804297029697306071204881418"
      )
  );
  // console.log("test_prehash_message_1 passed")
}

function test_to_bytes_1() {
  // console.log("test_to_bytes_1")
  const arg = BigInt(
    "20693456676802104653139582814194312788878632719314804297029697306071204881418"
  );
  const resutls = SignatureScheme.to_bytes(arg);
  console.log(
    JSON.stringify(resutls) ===
      JSON.stringify([
        10, 228, 215, 147, 146, 102, 9, 42, 66, 160, 26, 94, 171, 73, 235, 194,
        245, 106, 249, 114, 50, 52, 155, 182, 188, 18, 133, 216, 215, 20, 192,
        45,
      ])
  );
  // console.log("test_to_bytes_1 passed")
}

function test_hash_secret_1() {
  // console.log("test_hash_secret_1")
  const startTime: any = new Date();
  const arg = BigInt(
    "20693456676802104653139582814194312788878632719314804297029697306071204881418"
  );
  const result = SignatureScheme.hash_secret_python(new FQ(BigInt("1")), arg);
  console.log(
    result ==
      BigInt(
        "456425617452149303537516185998917840598824274191970480768523181450944242406"
      )
  );
  const endTime: any = new Date();
  let timeDiff = endTime - startTime; //in ms
  timeDiff /= 1000;
  // console.log(timeDiff + " seconds");
  // strip the ms
  // console.log("test_hash_secret_1 passed")
}

function test_hash_public_1() {
  // console.log("test_hash_public_1")
  const R = new Point(
    new FQ(
      BigInt(
        "4991609103248925747358645194965349262579784734809679007552644294476920671344"
      )
    ),
    new FQ(
      BigInt(
        "423391641476660815714427268720766993055332927752794962916609674122318189741"
      )
    )
  );
  const A = new Point(
    new FQ(
      BigInt(
        "16540640123574156134436876038791482806971768689494387082833631921987005038935"
      )
    ),
    new FQ(
      BigInt(
        "20819045374670962167435360035096875258406992893633759881276124905556507972311"
      )
    )
  );
  const M = BigInt(
    "20693456676802104653139582814194312788878632719314804297029697306071204881418"
  );
  const result = SignatureScheme.hash_public(R, A, M);
  console.log(
    result.eq(
      BigInt(
        "4221734722145693593102605227029250076638572186265556559955657451417362287555"
      )
    )
  );
  // console.log("test_hash_public_1 passed")
}

describe("eddsa_test", function () {
  it("test_sign_1", () => {
    test_sign_1();
  });
  it("test_prehash_message_1", () => {
    test_prehash_message_1();
  });
  it("test_to_bytes_1", () => {
    test_to_bytes_1();
  });
  it("test_hash_secret_1", () => {
    test_hash_secret_1();
  });
  it("test_hash_public_1", () => {
    test_hash_public_1();
  });
});

// function main() {
//   // console.log("\n\neddsa_test\n")
//
// }
//
// main();
