import { expect, it, describe } from "vitest";
import { mycolor } from "../../src";
import { getLuminance } from "../../src/plugin";

describe("mycolor plugin: getLuminance", () => {
  it("should get luminance", () => {
    mycolor.extend(getLuminance);

    expect(mycolor(255, 255, 0, 1).getLuminance()).toBe(0.9278);
  });
});
