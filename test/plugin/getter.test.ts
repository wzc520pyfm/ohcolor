import { expect, it, describe } from "vitest";
import { mycolor } from "../../src";
import { getter } from "../../src/plugin/getter";

describe("mycolor plugin: getter", () => {
  it("should get red, green, blue, alpha", () => {
    mycolor.extend(getter);

    const color = mycolor(255, 135, 0, 1);

    expect(color.getR()).toBe(255);
    expect(color.getG()).toBe(135);
    expect(color.getB()).toBe(0);
    expect(color.getA()).toBe(1);
  });
});
