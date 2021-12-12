import { sleep } from "../utils";

describe("utils test", function () {
  beforeEach(async () => {
    return;
  });

  it("sleep_test", async () => {
    console.log(new Date().getTime());
    await sleep(5000);
    console.log(new Date().getTime());
  });

  it("stringify_test", async () => {
    const demo: any = {
      a: 5,
      c: { d: 5, e: "k" },
      b: "ss",
    };

    console.log(JSON.stringify(demo));

    const keys = Object.keys(demo).sort();

    console.log(keys);
    console.log(JSON.stringify(demo, keys));

    const demo2: any = {};

    keys.forEach((item, index) => {
      demo2[item] = demo[item];
    });

    console.log(demo2);

    console.log(JSON.stringify(demo2));

    const ordered = Object.keys(demo)
      .sort()
      .reduce((obj: any, key) => {
        obj[key] = demo[key];
        return obj;
      }, {});

    console.log(JSON.stringify(ordered));
  });
});

export default {};
