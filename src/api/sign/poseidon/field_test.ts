import { field, FQ, modulo } from "./field";

function test_constants() {
  // console.log("test_constants")
  console.log(
    (field.SNARK_SCALAR_FIELD = BigInt(
      "21888242871839275222246405745257275088548364400416034343698204186575808495617"
    ))
  );
  console.log(
    (field.FR_ORDER = BigInt(
      "21888242871839275222246405745257275088614511777268538073601725287587578984328"
    ))
  );
  // console.log("test_constants passed")
}

function test_half() {
  // console.log("test_half")
  const half = BigInt(
    "10944121435919637611123202872628637544274182200208017171849102093287904247808"
  );
  console.log(field.SNARK_SCALAR_FIELD / 2 == half);
  // console.log("test_half passed")
}

function test_p() {
  // console.log("test_p")
  const p = BigInt(
    "21888242871839275222246405745257275088548364400416034343698204186575808495617"
  );
  console.log(field.SNARK_SCALAR_FIELD == p);
  // console.log("test_p passed")
}

function test_FQ_1() {
  // console.log("test_FQ_1")
  const n = BigInt("1");
  const privateKey = new FQ(n);
  console.log(privateKey.n == BigInt("1"));
  console.log(
    privateKey.m ==
      BigInt(
        "21888242871839275222246405745257275088548364400416034343698204186575808495617"
      )
  );
  // console.log("test_FQ_1 passed")
}

function test_FQ_add_1() {
  // console.log("test_FQ_add_1")
  const field1 = new FQ(
    BigInt(
      "16975020951829843291561856284829257584634286376639034318405002894754175986822"
    ),
    BigInt(
      "21888242871839275222246405745257275088548364400416034343698204186575808495617"
    )
  );
  const field2 = new FQ(
    BigInt(
      "64019726205844806607227168444173457603185468776494125031546307012808629654"
    ),
    BigInt(
      "21888242871839275222246405745257275088548364400416034343698204186575808495617"
    )
  );
  const result1 = field1.add(field2.n);
  const result2 = field2.add(field1.n);

  console.log(result1.n == result2.n);
  console.log(result1.m == result2.m);
  // console.log("test_FQ_add_1 passed")
}

function test_FQ_mul_1() {
  // console.log("test_FQ_mul_1")
  const other = BigInt(
    "16975020951829843291561856284829257584634286376639034318405002894754175986822"
  );
  const field = new FQ(
    BigInt(
      "8023312754331632317345164874475855606161388395970421403351236980717209379200"
    ),
    BigInt(
      "21888242871839275222246405745257275088548364400416034343698204186575808495617"
    )
  );
  const result = field.mul(other);

  console.log(
    result.n ==
      "7078307911818432186422689430568175567157289995259698798344014234848622444761"
  );
  console.log(
    result.m ==
      "21888242871839275222246405745257275088548364400416034343698204186575808495617"
  );
  // console.log("test_FQ_mul_1 passed")
}

function test_FQ_mul_2() {
  // console.log("test_FQ_mul_2")
  const other = BigInt(
    "16975020951829843291561856284829257584634286376639034318405002894754175986822"
  );
  const field = new FQ(
    BigInt(
      "64019726205844806607227168444173457603185468776494125031546307012808629654"
    ),
    BigInt(
      "21888242871839275222246405745257275088548364400416034343698204186575808495617"
    )
  );
  const result = field.mul(other);

  console.log(
    result.n ==
      "8023312754331632317345164874475855606161388395970421403351236980717209379200"
  );
  console.log(
    result.m ===
      "21888242871839275222246405745257275088548364400416034343698204186575808495617"
  );
  // console.log("test_FQ_mul_2 passed")
}

function test_FQ_mul_3() {
  // console.log("test_FQ_mul_3")
  const field1 = new FQ(
    BigInt(
      "16975020951829843291561856284829257584634286376639034318405002894754175986822"
    ),
    BigInt(
      "21888242871839275222246405745257275088548364400416034343698204186575808495617"
    )
  );
  const field2 = new FQ(
    BigInt(
      "16975020951829843291561856284829257584634286376639034318405002894754175986822"
    ),
    BigInt(
      "21888242871839275222246405745257275088548364400416034343698204186575808495617"
    )
  );
  const result1 = field1.add(field2.n);
  const result2 = field2.add(field1.n);

  console.log(result1.n == result2.n);
  console.log(result1.m == result2.m);
  // console.log("test_FQ_mul_3 passed")
}

function test_FQ_mul_4() {
  // console.log("test_FQ_mul_4")
  const field1 = new FQ(
    BigInt(
      "16975020951829843291561856284829257584634286376639034318405002894754175986822"
    ),
    BigInt(
      "21888242871839275222246405745257275088548364400416034343698204186575808495617"
    )
  );
  const field2 = new FQ(
    BigInt(
      "64019726205844806607227168444173457603185468776494125031546307012808629654"
    ),
    BigInt(
      "21888242871839275222246405745257275088548364400416034343698204186575808495617"
    )
  );
  const field3 = new FQ(
    BigInt(
      "8023312754331632317345164874475855606161388395970421403351236980717209379200"
    ),
    BigInt(
      "21888242871839275222246405745257275088548364400416034343698204186575808495617"
    )
  );

  const result1 = field1.mul(field2.n).mul(field3.n);
  const result2 = field2.mul(field1.n).mul(field3.n);
  const result3 = field3.mul(field1.n).mul(field2.n);
  const result4 = field3.mul(field2.n).mul(field1.n);

  console.log(result1.n == result2.n);
  console.log(result1.m == result2.m);
  console.log(result1.n == result3.n);
  console.log(result1.m == result3.m);
  console.log(result1.n == result4.n);
  console.log(result1.m == result4.m);

  // console.log("test_FQ_mul_4 passed")
}

function test_FQ_module() {
  // console.log("test_FQ_module")
  const n = BigInt(
    "-14716512740585223458018047979811180521493135094147670344522878941283115968141"
  );
  const m = BigInt(
    "21888242871839275222246405745257275088548364400416034343698204186575808495617"
  );
  const n_m = (n + m) % m;
  console.log(
    n_m ==
      BigInt(
        "7171730131254051764228357765446094567055229306268363999175325245292692527476"
      )
  );

  // console.log("test_FQ_module passed")
}

function test_FQ_sub() {
  // console.log("test_FQ_sub")
  const field = new FQ(
    BigInt(
      "397593468802287547516812218524989251246873285051017590397180750166966730405"
    ),
    BigInt(
      "21888242871839275222246405745257275088548364400416034343698204186575808495617"
    )
  );
  const other = BigInt(
    "15114106209387511005534860198336169772740008379198687934920059691450082698546"
  );
  // console.log("test_FQ_sub passed")
}

function test_modulo() {
  console.log("test_modulo");
  const n = BigInt(
    "15511699678189798553051672416861159023986881664249705525317240441617049428951"
  );
  const p = BigInt(
    "21888242871839275222246405745257275088548364400416034343698204186575808495615"
  );
  const m = BigInt(
    "21888242871839275222246405745257275088548364400416034343698204186575808495617"
  );
  const on_power_c = modulo(n, p, m);
  console.log("on_power_c", on_power_c.toString());
  console.log(
    on_power_c.toString() ===
      "5307867014497036273760343161114758635681413365004069877684017182635568142756"
  );
}

function main() {
  // console.log("\n\nfield_test\n")
  // test_constants()
  // test_half()
  // test_p()
  // test_FQ_1()
  // test_FQ_add_1()
  // test_FQ_mul_1()
  // test_FQ_mul_2()
  // test_FQ_mul_3()
  // test_FQ_mul_4()
  // test_FQ_module()
  // test_FQ_sub()
  test_modulo();
}

main();
