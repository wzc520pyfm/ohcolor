import { expect, it, describe } from "vitest";
import { mycolor } from "../../src";
import { formatDec } from "../../src/plugin/formatDec";

describe("mycolor plugin: formatDec", () => {
  mycolor.extend(formatDec);
  it("input rgba color, should get a decimal number of rgba", () => {
    expect(mycolor(46, 139, 87, 0.6).format("dec")).toBe(780_883_865);
  });
  it("input rgba color, should get a array of rgba", () => {
    expect(mycolor(255, 165, 0, 1).format("array")).toEqual([255, 165, 0, 1]);
  });
});
