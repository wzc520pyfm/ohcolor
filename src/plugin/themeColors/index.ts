import { withTint, withShade, parseColor, hexValue } from "./util";
import type { ColorPlugin } from "ohcolor";
import "./type.d.ts";

export const _variants = {
  50: withTint(0.95),
  100: withTint(0.9),
  200: withTint(0.75),
  300: withTint(0.6),
  400: withTint(0.3),
  500: (c: number[]) => c,
  600: withShade(0.9),
  700: withShade(0.6),
  800: withShade(0.45),
  900: withShade(0.3),
  950: withShade(0.2),
};

/**
 * Plugin: returns a number (float) representing the luminance of a color.
 */
export const themeColors: ColorPlugin = (_, c, cf) => {
  const proto = c.prototype;
  const getRGB = proto.rgba;
  proto.themeColors = function (variants = _variants) {
    const [r, g, b] = getRGB.bind(this)();
    const colors: Record<string, string> = {};
    const components = parseColor(`${r},${g},${b}`);

    for (const [name, fn] of Object.entries(variants)) {
      colors[name] = hexValue(fn(components));
    }

    return colors;
  };

  return cf;
};

export default themeColors;
