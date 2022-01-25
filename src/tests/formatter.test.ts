import { LoopringErrorCode } from "../defs";
import {
  addHexPrefix,
  clearHexPrefix,
  convertPublicKey,
  convertPublicKey2,
  formatAddress,
  formatEddsaKey,
  formatKey,
  fromGWEI,
  getDisplaySymbol,
  numberWithCommas,
  padLeftEven,
  PublicKey,
  toBig,
  toBN,
  toBuffer,
  toFixed,
  toGWEI,
  toHex,
  toNumber,
  zeroPad,
} from "..";

import * as fm from "../utils/formatter";
import { BigNumber } from "bignumber.js";
import { loopring_exported_account } from "./utils";

const NUMBER = 40244024;
const BUFFER = Buffer.from("40244024", "utf8");
const BIG_NUMBER = new BigNumber(123.4567);
const TIMEOUT = 30000;

describe("formatter test", function () {
  beforeEach(async () => {
    return;
  }, TIMEOUT);

  it(
    "enum_test",
    async () => {
      console.log(LoopringErrorCode[100000]);
      console.log(LoopringErrorCode[200000]);
    },
    TIMEOUT
  );

  it(
    "formatter1",
    async () => {
      const px = fm.formatEddsaKey(
        "4966334643155205117396087046889763297010019574817548934733242435404623801022"
      );
      const py = fm.formatEddsaKey(
        "12336121800785994591019936445923899190012791232373302800087997800255990054103"
      );

      const pk: PublicKey = {
        x: px,
        y: py,
      };

      console.log(px);
      console.log("px.length:", px.length);

      console.log(py);
      console.log("py.length:", py.length);

      console.log(convertPublicKey(pk));
    },
    TIMEOUT
  );

  it(
    "formatter2",
    async () => {
      const px = fm.formatEddsaKey(
        fm.toHex(
          fm.toBig(
            "4966334643155205117396087046889763297010019574817548934733242435404623801022"
          )
        )
      );
      const py = fm.formatEddsaKey(
        fm.toHex(
          fm.toBig(
            "12336121800785994591019936445923899190012791232373302800087997800255990054103"
          )
        )
      );

      const pk: PublicKey = {
        x: px,
        y: py,
      };

      console.log(px);
      console.log("px.length:", px.length);

      console.log(py);
      console.log("py.length:", py.length);

      const bn = convertPublicKey(pk);

      console.log(bn);
      console.log(bn.toString(10));
      console.log(fm.addHexPrefix(bn.toString(16)));
    },
    TIMEOUT
  );

  it(
    "formatter3",
    async () => {
      const px =
        "4966334643155205117396087046889763297010019574817548934733242435404623801022";
      const py =
        "12336121800785994591019936445923899190012791232373302800087997800255990054103";

      const pk: PublicKey = {
        x: px,
        y: py,
      };

      console.log(px);
      console.log("px.length:", px.length);

      console.log(py);
      console.log("py.length:", py.length);

      const bn = convertPublicKey2(pk);

      console.log(bn);
      console.log(bn.toString(10));
      console.log(fm.addHexPrefix(bn.toString(16)));
    },
    TIMEOUT
  );

  it("test toBuffer", async () => {
    console.log(toBuffer("420")); // todo add assertion
    console.log(toBuffer(BUFFER)); // todo add assertion
  });

  it("test zeroPad", async () => {
    console.log(zeroPad("420", 0)); // todo add assertion
  });

  it("test toHex", async () => {
    expect(toHex(loopring_exported_account.nftId)).toBe(
      "0x0000000000000000000000000000000000000000000000000000000000000099"
    );
  });

  it("test toNumber", async () => {
    expect(toNumber("69")).toBe(69);
    expect(toNumber(420)).toBe(420);
    expect(toNumber("12345.6789")).toBe(12345.6789);
    expect(toNumber(loopring_exported_account.nftId)).toBe(153);
  });

  // Missing test input data for Uint8Array
  it("test toNumber", async () => {
    expect(toNumber("69")).toBe(69);
    expect(toNumber(420)).toBe(420);
    expect(toNumber("12345.6789")).toBe(12345.6789);
    expect(toNumber(loopring_exported_account.nftId)).toBe(153);
    expect(toNumber(BIG_NUMBER)).toBe(123.4567);
  });

  it("test padLeftEven", async () => {
    expect(padLeftEven(loopring_exported_account.address)).toBe(
      loopring_exported_account.address
    );
    expect(padLeftEven(loopring_exported_account.testNotOx.slice(0, -1))).toBe(
      "0" + loopring_exported_account.testNotOx.slice(0, -1)
    );
  });

  it("test getDisplaySymbol", async () => {
    expect(getDisplaySymbol("USD")).toBe("$");
    expect(getDisplaySymbol("CNY")).toBe("￥");
    expect(getDisplaySymbol("EUR")).toBe("");
  });

  it("test toBig", async () => {
    expect(toBig("0x" + BUFFER)).toEqual(new BigNumber("0x" + BUFFER));
  });
  it("test toBig ", async () => {
    console.log(
      toBig("426702000000000000000")
        .div("1e" + 18)
        .toString()
    );
  });

  it("test toBN", async () => {
    // expect(toBN("0x" + BIG_NUMBER)).toEqual(BIG_NUMBER);
    expect(toBN(2).toString()).toEqual("2");
  });

  it("test fromGWEI", async () => {
    expect(fromGWEI(420)).toEqual(new BigNumber(4.2e11));
    expect(fromGWEI(420.0)).toEqual(new BigNumber(4.2e11));
    expect(fromGWEI("420")).toEqual(new BigNumber(4.2e11));
  });

  it("test toGWEI", async () => {
    expect(toGWEI(420)).toEqual(new BigNumber(4.2e-7));
    expect(toGWEI(420.0)).toEqual(new BigNumber(4.2e-7));
    expect(toGWEI("420")).toEqual(new BigNumber(4.2e-7));
  });

  it("test formatKey", async () => {
    expect(formatKey("0x" + BUFFER)).toBe(NUMBER.toString());
    expect(formatKey(loopring_exported_account.address)).toBe(
      loopring_exported_account.testNotOx
    );
    expect(formatKey(loopring_exported_account.testNotOx)).toBe(
      loopring_exported_account.testNotOx
    );
  });

  // Missing test input data for Uint8Array
  it("test formatAddress", async () => {
    expect(
      formatAddress(loopring_exported_account.testNotOx).toLowerCase()
    ).toBe(loopring_exported_account.address);
    expect(formatAddress(loopring_exported_account.address).toLowerCase()).toBe(
      loopring_exported_account.address
    );
    expect(formatAddress("0x" + BUFFER)).toBe("0x" + BUFFER);
  });

  it("test addHexPrefix", async () => {
    expect(addHexPrefix(loopring_exported_account.address)).toBe(
      loopring_exported_account.address
    );
    expect(addHexPrefix(loopring_exported_account.testNotOx)).toBe(
      loopring_exported_account.address
    );
    expect(() => addHexPrefix(420)).toThrowError("Unsupported type");
  });

  it("test clearHexPrefix", async () => {
    expect(clearHexPrefix(loopring_exported_account.address)).toBe(
      loopring_exported_account.testNotOx
    );
    expect(() => clearHexPrefix(420)).toThrowError("Unsupported type");
  });

  it("test toFixed", async () => {
    expect(toFixed(420, 0, 0)).toBe("420");
    expect(toFixed(420, 1, 0)).toBe("420.0");
    expect(toFixed(420, 2, 0)).toBe("420.00");
    expect(toFixed(421.421, 2, 1)).toBe("421.43");
    expect(toFixed(421.421, 1, 1)).toBe("421.5");
    expect(toFixed(421.421, 1, 0)).toBe("421.4");

    expect(toFixed(BIG_NUMBER, 1, 0)).toBe("123.4");
    expect(toFixed(BIG_NUMBER, 1, 1)).toBe("123.5");
    expect(toFixed(BIG_NUMBER, 2, 1)).toBe("123.46");
    expect(() => toFixed("wow", 2, 1)).toThrowError("Unsupported type");
  });

  it("test formatEddsaKey", async () => {
    expect(
      formatEddsaKey(
        "027a5b716c7309a30703ede3f1a218cdec857e424a31543f8a658e7d2208db33"
      )
    ).toBe(
      "0x027a5b716c7309a30703ede3f1a218cdec857e424a31543f8a658e7d2208db33"
    );
    expect(formatEddsaKey("1231dsab2")).toBe(
      "0x00000000000000000000000000000000000000000000000000000001231dsab2"
    );
  });

  it("test numberWithCommas", async () => {
    expect(numberWithCommas(420)).toBe("420");
    expect(numberWithCommas(1000)).toBe("1,000");
    expect(numberWithCommas("10000")).toBe("10,000");
    expect(numberWithCommas("1,000,000")).toBe("1,000,000");
    expect(numberWithCommas("10.000.000")).toBe("-");
    expect(numberWithCommas(null)).toBe(null);
  });
});

export default {};
