import { expect, it, describe } from "vitest";
// eslint-disable-next-line import/no-named-as-default
import mycolor from "../src";

describe("mycolor", () => {
  it("should get mycolor by default", async () => {
    const mycolor = await import("../src");
    expect(mycolor).toBeDefined();
  });
  it("should get default rgba color", () => {
    expect(mycolor().rgba()).toEqual([0, 0, 0, 0]);
    expect(mycolor(-1, -1, -1, -1).rgba()).toEqual([0, 0, 0, 0]);
  });
  it("should get mycolor by named", async () => {
    const { mycolor } = await import("../src");
    expect(mycolor).toBeDefined();
  });
  it("should get a new mycolor instance", () => {
    const color1 = mycolor(255, 165, 0, 1);
    const color2 = mycolor(color1);
    expect(color1).not.toBe(color2);
  });
  it("input rgba params, should get a rgba array", () => {
    expect(mycolor(255, 165, 0, 1).rgba()).toEqual([255, 165, 0, 1]);
  });
});

describe("mycolor built-in plugins", () => {
  it("input hex, should get a rgba array", () => {
    expect(mycolor("#ff3").rgba()).toEqual([255, 255, 51, 1]);
    expect(mycolor("#ff36").rgba()).toEqual([255, 255, 51, 0.4]);
    expect(mycolor("#ff3399").rgba()).toEqual([255, 51, 153, 1]);
    expect(mycolor("#ff339966").rgba()).toEqual([255, 51, 153, 0.4]);
    // without #
    expect(mycolor("ff3").rgba()).toEqual([255, 255, 51, 1]);
    expect(mycolor("ff36").rgba()).toEqual([255, 255, 51, 0.4]);
    expect(mycolor("ff3399").rgba()).toEqual([255, 51, 153, 1]);
    expect(mycolor("ff339966").rgba()).toEqual([255, 51, 153, 0.4]);
  });
  it("input w3cx11 color, should get a rgba array", () => {
    expect(mycolor("pink").rgba()).toEqual([255, 192, 203, 1]);
    expect(mycolor("orange").rgba()).toEqual([255, 165, 0, 1]);
    expect(mycolor("yellow").rgba()).toEqual([255, 255, 0, 1]);
    expect(mycolor("PINK").rgba()).toEqual([255, 192, 203, 1]);
    expect(mycolor("ORANGE").rgba()).toEqual([255, 165, 0, 1]);
    expect(mycolor("YELLOW").rgba()).toEqual([255, 255, 0, 1]);
  });
});
