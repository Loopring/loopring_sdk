import { sleep } from "../utils";
import { ChainId } from "../defs";
import { BaseAPI } from "../api/base_api";
import { DEFAULT_TIMEOUT, LoopringAPI } from "./data";

describe("utils test", function () {
  beforeEach(async () => {
    LoopringAPI.InitApi(ChainId.GOERLI);
  });
  it(
    "getAvailableBroker",
    async () => {
      const result = await LoopringAPI.exchangeAPI.getAvailableBroker();
      console.log(result);
    },
    DEFAULT_TIMEOUT
  );

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
