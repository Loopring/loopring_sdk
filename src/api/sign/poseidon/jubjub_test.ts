import { assert } from "console";
import { BigNumber } from "ethers";
import { FQ } from "./field";

import { jubjub, Point } from "./jubjub";

function test_constants() {
  // console.log("test_constants")
  assert(
    jubjub.JUBJUB_Q ==
      "21888242871839275222246405745257275088548364400416034343698204186575808495617"
  );
  assert(
    jubjub.JUBJUB_E ==
      "21888242871839275222246405745257275088614511777268538073601725287587578984328"
  );
  assert(jubjub.JUBJUB_C == "8");
  assert(
    jubjub.JUBJUB_L ==
      "2736030358979909402780800718157159386076813972158567259200215660948447373041"
  );
  assert(jubjub.JUBJUB_A == "168700");
  assert(jubjub.JUBJUB_D == "168696");
  // console.log("test_constants passed")
}

function test_add_1() {
  // console.log("test_add_1")
  const point = new Point(
    new FQ(
      BigInt(
        "5925710879559963920674585068280151559572021649049974518737186312396312983287"
      )
    ),
    new FQ(
      BigInt(
        "16975020951829843291561856284829257584634286376639034318405002894754175986822"
      )
    )
  );
  const other = new Point(
    new FQ(
      BigInt(
        "5925710879559963920674585068280151559572021649049974518737186312396312983287"
      )
    ),
    new FQ(
      BigInt(
        "16975020951829843291561856284829257584634286376639034318405002894754175986822"
      )
    )
  );
  const sum = point.add(other);
  assert(
    sum.x.n ==
      BigInt(
        "3921821752680400551661691533275335336907961697969280331905459386565873550491"
      )
  );
  assert(
    sum.x.m ==
      BigInt(
        "21888242871839275222246405745257275088548364400416034343698204186575808495617"
      )
  );
  assert(
    sum.y.n ==
      BigInt(
        "8522068897570808837785568881356377871354274006792075192589502922612862896342"
      )
  );
  assert(
    sum.y.m ==
      BigInt(
        "21888242871839275222246405745257275088548364400416034343698204186575808495617"
      )
  );
  // console.log("test_add_1 passed")
}

function test_add_2() {
  // console.log("test_add_2")
  const point = new Point(
    new FQ(
      BigInt(
        "10975113445185536695224737904225227344281568447400334915125839333792816477396"
      )
    ),
    new FQ(
      BigInt(
        "18445435810976842694581549336952093637971779711294581156054437925992025486446"
      )
    )
  );
  const other = new Point(
    new FQ(
      BigInt(
        "5925710879559963920674585068280151559572021649049974518737186312396312983287"
      )
    ),
    new FQ(
      BigInt(
        "16975020951829843291561856284829257584634286376639034318405002894754175986822"
      )
    )
  );
  const sum = point.add(other);
  assert(
    sum.x.n ==
      BigInt(
        "4991609103248925747358645194965349262579784734809679007552644294476920671344"
      )
  );
  assert(
    sum.x.m ==
      BigInt(
        "21888242871839275222246405745257275088548364400416034343698204186575808495617"
      )
  );
  assert(
    sum.y.n ==
      BigInt(
        "423391641476660815714427268720766993055332927752794962916609674122318189741"
      )
  );
  assert(
    sum.y.m ==
      BigInt(
        "21888242871839275222246405745257275088548364400416034343698204186575808495617"
      )
  );
  // console.log("test_add_2 passed")
}

function test_divide_1() {
  // console.log("test_divide_1")
  const scaler = BigInt("1");
  const result = scaler / 2;
  assert(result == BigInt("0"));
  // console.log("test_divide_1 passed")
}

function test_divide_2() {
  // console.log("test_divide_2")
  const scaler = BigInt("2");
  const result = scaler / 2;
  assert(result == BigInt("1"));
  // console.log("test_divide_2 passed")
}

function test_bitwiseand_1() {
  // console.log("test_bitwiseand_1")
  const scaler_c = BigInt("1");
  const result_c = scaler_c + BigInt(1);
  assert(result_c == BigInt("1"));
  // console.log("test_bitwiseand_1 passed")
}

function test_bitwiseand_2() {
  // console.log("test_bitwiseand_2")
  const scaler_c = BigInt("2");
  const result_c = scaler_c + BigInt(1);
  assert(result_c == BigInt("0"));
  // console.log("test_bitwiseand_2 passed")
}

function test_mul_1() {
  // console.log("test_mul_1")
  const B = new Point(
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
  const k = BigInt("1");
  const A = B.mul(k);
  assert(
    A.x.n ==
      BigInt(
        "16540640123574156134436876038791482806971768689494387082833631921987005038935"
      )
  );
  assert(
    A.x.m ==
      BigInt(
        "21888242871839275222246405745257275088548364400416034343698204186575808495617"
      )
  );
  assert(
    A.y.n ==
      BigInt(
        "20819045374670962167435360035096875258406992893633759881276124905556507972311"
      )
  );
  assert(
    A.y.m ==
      BigInt(
        "21888242871839275222246405745257275088548364400416034343698204186575808495617"
      )
  );
  // console.log("test_mul_1 passed")
}

function test_mul_2() {
  // console.log("test_mul_2")
  const B = new Point(
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
  const k = BigInt("2");
  const A = B.mul(k);
  assert(
    A.x.n ==
      BigInt(
        "17324563846726889236817837922625232543153115346355010501047597319863650987830"
      )
  );
  assert(
    A.x.m ==
      BigInt(
        "21888242871839275222246405745257275088548364400416034343698204186575808495617"
      )
  );
  assert(
    A.y.n ==
      BigInt(
        "20022170825455209233733649024450576091402881793145646502279487074566492066831"
      )
  );
  assert(
    A.y.m ==
      BigInt(
        "21888242871839275222246405745257275088548364400416034343698204186575808495617"
      )
  );
  // console.log("test_mul_2 passed")
}

function test_mul_3() {
  // console.log("test_mul_3")
  const x = new FQ(
    BigInt(
      "16540640123574156134436876038791482806971768689494387082833631921987005038935"
    ),
    BigInt(
      "21888242871839275222246405745257275088548364400416034343698204186575808495617"
    )
  );
  const y = new FQ(
    BigInt(
      "20819045374670962167435360035096875258406992893633759881276124905556507972311"
    ),
    BigInt(
      "21888242871839275222246405745257275088548364400416034343698204186575808495617"
    )
  );
  const B = new Point(x, y);
  const k = BigInt(
    "456425617452149303537516185998917840598824274191970480768523181450944242406"
  );
  const A = B.mul(k);
  assert(
    A.x.n ==
      BigInt(
        "4991609103248925747358645194965349262579784734809679007552644294476920671344"
      ),
    "A.x.n" + A.x.n.toString()
  );
  assert(
    A.x.m ==
      BigInt(
        "21888242871839275222246405745257275088548364400416034343698204186575808495617"
      ),
    "A.x.m" + A.x.m.toString()
  );
  assert(
    A.y.n ==
      BigInt(
        "423391641476660815714427268720766993055332927752794962916609674122318189741"
      ),
    "A.y.n" + A.y.n.toString()
  );
  assert(
    A.y.m ==
      BigInt(
        "21888242871839275222246405745257275088548364400416034343698204186575808495617"
      ),
    "A.y.m" + A.y.m.toString()
  );
  // console.log("test_mul_3 passed")
}

function main() {
  // console.log("hello")
  test_constants();
  test_add_1();
  test_add_2();
  test_divide_1();
  test_divide_2();
  test_bitwiseand_1();
  test_bitwiseand_2();
  test_mul_1();
  test_mul_2();
  test_mul_3();
}

main();
