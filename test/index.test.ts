import { expect, it, describe } from "vitest";
// eslint-disable-next-line import/no-named-as-default
import mycolor from "../src/index";

describe("mycolor", () => {
  it("should get mycolor by default", async () => {
    const mycolor2 = await import("../src");
    expect(mycolor2).toBeDefined();
  });
  it("should get default rgba color", () => {
    expect(mycolor().rgba()).toEqual([0, 0, 0, 0]);
    expect(mycolor(-1, -1, -1, -1).rgba()).toEqual([0, 0, 0, 0]);
  });
  it("should get mycolor by named", async () => {
    const { mycolor: mycolor3 } = await import("../src");
    expect(mycolor3).toBeDefined();
  });
  it("should get a new mycolor instance", () => {
    const color1 = mycolor(255, 165, 0, 1);
    const color2 = mycolor(color1);
    expect(color1).not.toBe(color2);
  });
  it("input rgba params, should get a rgba array", () => {
    expect(mycolor(255, 165, 0, 1).rgba()).toEqual([255, 165, 0, 1]);
  });
  it("input rgba params, set red, green, blue and alpha", () => {
    const color1 = mycolor(255, 165, 0, 1);
    const color2 = color1.alpha(0.1);
    expect(color1).not.toEqual(color2);

    expect(mycolor(255, 165, 0, 1).red(133).rgba()).toEqual([133, 165, 0, 1]);
    expect(mycolor(255, 165, 0, 1).green(34).rgba()).toEqual([255, 34, 0, 1]);
    expect(mycolor(255, 165, 0, 1).blue(99).rgba()).toEqual([255, 165, 99, 1]);
    expect(mycolor(255, 165, 0, 1).alpha(0.5).rgba()).toEqual([
      255, 165, 0, 0.5,
    ]);
  });
  it("format color", () => {
    expect(mycolor(255, 165, 0, 1).format("array")).toEqual([255, 165, 0, 1]);
    expect(mycolor(255, 165, 0, 1).format("object")).toEqual({
      r: 255,
      g: 165,
      b: 0,
      a: 1,
    });
    expect(mycolor(255, 165, 0, 1).format("string")).toEqual(
      "rgba(255,165,0,1)",
    );
    expect(mycolor(255, 165, 0, 1).format("css")).toEqual(
      "rgb(255 165 0 / 1)",
    );
    // @ts-expect-error
    expect(mycolor(255, 165, 0, 1).format("unknown")).toEqual([255, 165, 0, 1]);
  });
  it("allows multiple plugins to be installed", async () => {
    const { inputHex } = await import("../src/plugin/inputHex");
    const { getLuminance } = await import("../src/plugin/getLuminance");
    const { readableColor } = await import("../src/plugin/readableColor");

    mycolor.extend(inputHex);
    mycolor.extend(getLuminance);
    mycolor.extend(readableColor);
    expect(mycolor("#ff0000").getLuminance()).toBe(0.2126);
    expect(mycolor("#ff0000").readableColor()).toBe("#000");
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
});
