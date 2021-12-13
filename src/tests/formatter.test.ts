import { LoopringErrorCode } from "../defs";
import { addHexPrefix, clearHexPrefix, convertPublicKey, convertPublicKey2, formatAddress, formatEddsaKey, formatKey, fromGWEI, getDisplaySymbol, numberWithCommas, padLeftEven, PublicKey, toBig, toBN, toBuffer, toFixed, toGWEI, toHex, toNumber, zeroPad, } from "..";

import * as fm from "../utils/formatter";
import { BigNumber } from "bignumber.js";

const ADDRESS_WITH_HEX = "0x2e76EBd1c7c0C8e7c2B875b6d505a260C525d25e";
const ADDRESS_WITHOUT_HEX = "2e76EBd1c7c0C8e7c2B875b6d505a260C525d25e";
const BUFFER = Buffer.from("420420", "utf8");
const BIG_NUMBER = new BigNumber(12.34);
const SIXTY_NINE_CHARS_LONG_KEY = "165406401235741561344368760387914828069717686894943870828336319219870";
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

        const bn = convertPublicKey2(pk)

        console.log(bn);
        console.log(bn.toString(10));
        console.log(fm.addHexPrefix(bn.toString(16)));

    }, TIMEOUT)

    it("test toBuffer", async () => {
        console.log(toBuffer("420"));  // todo add assertion
        console.log(toBuffer(BUFFER));  // todo add assertion
    })

    it("test zeroPad", async () => {
        console.log(zeroPad("420", 0));  // todo add assertion
    })

    it("test toHex", async () => {
        expect(toHex(ADDRESS_WITHOUT_HEX)).toBe("0x32653736454264316337633043386537633242383735623664353035613236304335323564323565");
    })

    it("test toNumber", async () => {
        expect(toNumber("69")).toBe(69);
        expect(toNumber(420)).toBe(420);
        expect(toNumber("12345.6789")).toBe(12345.6789);
        expect(toNumber(BUFFER)).toBe(343230343230);
    })

    // Missing test input data for Uint8Array
    it("test toNumber", async () => {
        expect(toNumber("69")).toBe(69);
        expect(toNumber(420)).toBe(420);
        expect(toNumber("12345.6789")).toBe(12345.6789);
        expect(toNumber(BUFFER)).toBe(343230343230);
        expect(toNumber(BIG_NUMBER)).toBe(12.34);
    })

    it("test padLeftEven", async () => {
        expect(padLeftEven(ADDRESS_WITH_HEX)).toBe(ADDRESS_WITH_HEX);
        expect(padLeftEven(ADDRESS_WITH_HEX.slice(0, -1))).toBe("0" + ADDRESS_WITH_HEX.slice(0, -1));
    })

    it("test getDisplaySymbol", async () => {
        expect(getDisplaySymbol("USD")).toBe("$");
        expect(getDisplaySymbol("CNY")).toBe("￥");
        expect(getDisplaySymbol("EUR")).toBe("");
    })

    it("test toBig", async () => {
        expect(toBig(BUFFER)).toEqual(new BigNumber(3.4323034323e+11));
    })

    it("test toBN", async () => {
        expect(toBN(BIG_NUMBER)).toEqual(BIG_NUMBER);
        expect(toBN(2)).toEqual(new BigNumber(2));
    })

    it("test fromGWEI", async () => {
        expect(fromGWEI(420)).toEqual(new BigNumber(4.2e+11));
        expect(fromGWEI(420.00)).toEqual(new BigNumber(4.2e+11));
        expect(fromGWEI("420")).toEqual(new BigNumber(4.2e+11));
    })

    it("test toGWEI", async () => {
        expect(toGWEI(420)).toEqual(new BigNumber(4.2e-7));
        expect(toGWEI(420.00)).toEqual(new BigNumber(4.2e-7));
        expect(toGWEI("420")).toEqual(new BigNumber(4.2e-7));
    })

    it("test formatKey", async () => {
        expect(formatKey(BUFFER)).toBe("343230343230");
        expect(formatKey(ADDRESS_WITH_HEX)).toBe(ADDRESS_WITHOUT_HEX);
        expect(formatKey(ADDRESS_WITHOUT_HEX)).toBe(ADDRESS_WITHOUT_HEX);
    })

    // Missing test input data for Uint8Array
    it("test formatAddress", async () => {
        expect(formatAddress(ADDRESS_WITHOUT_HEX)).toBe(ADDRESS_WITH_HEX);
        expect(formatAddress(ADDRESS_WITH_HEX)).toBe(ADDRESS_WITH_HEX);
        expect(formatAddress(BUFFER)).toBe("0x343230343230");
    })

    it("test addHexPrefix", async () => {
        expect(addHexPrefix(ADDRESS_WITH_HEX)).toBe(ADDRESS_WITH_HEX);
        expect(addHexPrefix(ADDRESS_WITHOUT_HEX)).toBe(ADDRESS_WITH_HEX);
        expect(() => addHexPrefix(420)).toThrowError("Unsupported type");
    })

    it("test clearHexPrefix", async () => {
        expect(clearHexPrefix(ADDRESS_WITH_HEX)).toBe(ADDRESS_WITHOUT_HEX);
        expect(() => clearHexPrefix(420)).toThrowError("Unsupported type");
    })

    it("test toFixed", async () => {
        expect(toFixed(420, 0, 0)).toBe("420");
        expect(toFixed(420, 1, 0)).toBe("420.0");
        expect(toFixed(420, 2, 0)).toBe("420.00");
        expect(toFixed(421.421, 2, 1)).toBe("421.43");
        expect(toFixed(421.421, 1, 1)).toBe("421.5");
        expect(toFixed(421.421, 1, 0)).toBe("421.4");

        expect(toFixed(BIG_NUMBER, 1, 0)).toBe("12.3");
        expect(toFixed(BIG_NUMBER, 1, 1)).toBe("12.4");
        expect(toFixed(BIG_NUMBER, 2, 1)).toBe("12.34");
        expect(() => toFixed("wow", 2, 1)).toThrowError("Unsupported type");
    })

    it("test formatEddsaKey", async () => {
        expect(formatEddsaKey(SIXTY_NINE_CHARS_LONG_KEY)).toBe("0x" + SIXTY_NINE_CHARS_LONG_KEY);
        expect(formatEddsaKey("1231dsab2")).toBe("0x00000000000000000000000000000000000000000000000000000001231dsab2");
    })

    it("test numberWithCommas", async () => {
        expect(numberWithCommas(420)).toBe("420");
        expect(numberWithCommas(1000)).toBe("1,000");
        expect(numberWithCommas("10000")).toBe("10,000");
        expect(numberWithCommas("1,000,000")).toBe("1,000,000");
        expect(numberWithCommas("10.000.000")).toBe("-");
        expect(numberWithCommas(null)).toBe(null);
    })
})

export default {}
