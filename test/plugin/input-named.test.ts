import { expect, it, describe } from "vitest";
import { mycolor } from "../../src";
import { inputNamed } from "../../src/plugin";

describe("mycolor plugin: inputNamed", () => {
  const mycolor2 = mycolor.extend(inputNamed);
  it("input w3cx11 color, should get a rgba array", () => {
    expect(mycolor2("pink").rgba()).toEqual([255, 192, 203, 1]);
    expect(mycolor2("orange").rgba()).toEqual([255, 165, 0, 1]);
    expect(mycolor2("yellow").rgba()).toEqual([255, 255, 0, 1]);
    expect(mycolor2("PINK").rgba()).toEqual([255, 192, 203, 1]);
    expect(mycolor2("ORANGE").rgba()).toEqual([255, 165, 0, 1]);
    expect(mycolor2("YELLOW").rgba()).toEqual([255, 255, 0, 1]);
  });
});
