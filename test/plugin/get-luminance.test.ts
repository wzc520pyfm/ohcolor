import { expect, it, describe } from "vitest";
import { mycolor } from "../../src";
import { getLuminance } from "../../src/plugin";

describe("mycolor plugin: getLuminance", () => {
  it("should get luminance", () => {
    const mycolor2 = mycolor.extend(getLuminance);

    expect(mycolor2(255, 255, 0, 1).getLuminance()).toBe(0.9278);
  });
});
