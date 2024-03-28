import { expect, it, describe } from "vitest";
import { mycolor } from "../../src";
import { themeColors } from "../../src/plugin";

describe("mycolor plugin: themeColors", () => {
  const fixture = {
    hex: "#ABABAB",
    theme: {
      50: "#FBFBFB",
      100: "#F7F7F7",
      200: "#EAEAEA",
      300: "#DDDDDD",
      400: "#C4C4C4",
      500: "#ABABAB",
      600: "#9A9A9A",
      700: "#676767",
      800: "#4D4D4D",
      900: "#333333",
      950: "#222222",
    },
  };
  it("input hex string, get theme", () => {
    const mycolor2 = mycolor.extend(themeColors);

    expect(mycolor2(fixture.hex).themeColors()).toMatchObject(fixture.theme);
  });
});
