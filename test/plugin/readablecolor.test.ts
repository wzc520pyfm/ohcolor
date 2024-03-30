import { expect, it, describe } from "vitest";
import { readableColor } from "../../src/plugin";
import { mycolor } from "ohcolor";

describe("mycolor plugin: readableColor", () => {
  it("should get black or white for best contrast depending on the luminosity.", () => {
    mycolor.extend(readableColor);

    expect(mycolor("#ffff00").readableColor()).toBe("#000");
    expect(mycolor("#fff").readableColor()).toBe("#000");
    expect(mycolor("#000").readableColor()).toBe("#fff");
  });

  it("returns whether or not the readable color should be black.", () => {
    mycolor.extend(readableColor);

    expect(mycolor("#ffff00").readableColorIsBlack()).toBe(true);
    expect(mycolor("#fff").readableColorIsBlack()).toBe(true);
    expect(mycolor("#000").readableColorIsBlack()).toBe(false);
  });
});
