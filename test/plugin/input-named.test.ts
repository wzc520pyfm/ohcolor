import { expect, it, describe } from "vitest";
import { mycolor } from "../../src";
import { inputNamed } from "../../src/plugin/inputNamed";

describe("mycolor plugin: inputNamed", () => {
  mycolor.extend(inputNamed);
  it("input w3cx11 color, should get a rgba array", () => {
    expect(mycolor("pink").rgba()).toEqual([255, 192, 203, 1]);
    expect(mycolor("orange").rgba()).toEqual([255, 165, 0, 1]);
    expect(mycolor("yellow").rgba()).toEqual([255, 255, 0, 1]);
    expect(mycolor("PINK").rgba()).toEqual([255, 192, 203, 1]);
    expect(mycolor("ORANGE").rgba()).toEqual([255, 165, 0, 1]);
    expect(mycolor("YELLOW").rgba()).toEqual([255, 255, 0, 1]);
  });
  it("input hex string, should get a rgba array", () => {
    expect(mycolor("#ff00ff").rgba()).toEqual([255, 0, 255, 1]);
  });
});
