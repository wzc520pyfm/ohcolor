import { expect, it, describe } from "vitest";
import { mycolor } from "../../src";
import { outputHex } from "../../src/plugin/outputHex";

describe("mycolor plugin: outputHex", () => {
  it("should get hex string of rgba", () => {
    mycolor.extend(outputHex);

    expect(mycolor(255, 255, 0, 1).hex()).toBe("#ffff00ff");
  });
});
