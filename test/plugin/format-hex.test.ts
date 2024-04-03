import { expect, it, describe } from "vitest";
import { mycolor } from "../../src";
import { formatHex } from "../../src/plugin/formatHex";

describe("mycolor plugin: formatHex", () => {
  mycolor.extend(formatHex);
  it("input rgba color, should get a string of rgba hex", () => {
    expect(mycolor(255, 165, 0, 1).format("hex")).toEqual("#ffa500ff");
  });
  it("input rgba color, should get a array of rgba", () => {
    expect(mycolor(255, 165, 0, 1).format("array")).toEqual([255, 165, 0, 1]);
  });
  it("input rgba color, should get a string of rgba", () => {
    expect(mycolor(255, 165, 0, 1).format("string")).toEqual(
      `rgba(255,165,0,1)`,
    );
  });
});
