import { expect, it, describe } from "vitest";
import { mycolor } from "../../src";
import { outputGl } from "../../src/plugin/outputGl";

describe("mycolor plugin: outputGl", () => {
  it("should get rgba array that each value is 0 ~ 1", () => {
    mycolor.extend(outputGl);

    expect(mycolor("33cc00").gl()).toEqual([0.2, 0.8, 0, 1]);
  });
});
