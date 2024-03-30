import type { ColorPlugin } from "ohcolor";
import "./type.d.ts";

const f = (x: number) => {
  const channel = x / 255;
  return channel <= 0.040_45
    ? channel / 12.92
    : Math.pow((channel + 0.055) / 1.055, 2.4);
};

/**
 * Plugin: returns a number (float) representing the luminance of a color.
 */
export const getLuminance: ColorPlugin = (_, c, cf) => {
  const proto = c.prototype;
  const getRGB = proto.rgba;
  proto.getLuminance = function () {
    const [r, g, b] = getRGB.bind(this)();
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };

  return cf;
};

export default getLuminance;
