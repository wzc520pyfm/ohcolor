import type { MyColorPlugin, MyColor, MyColorFn } from "../..";

interface OhColorClass extends MyColor {
  getLuminance: () => number;
}

interface OhColorFactory extends MyColorFn {
  (...args: unknown[]): OhColorClass;
}

const f = (x: number) => {
  const channel = x / 255;
  return channel <= 0.040_45
    ? channel / 12.92
    : Math.pow(((channel + 0.055) / 1.055), 2.4);
}

/**
 * Returns a number (float) representing the luminance of a color.
 */
export const getLuminance: MyColorPlugin<OhColorFactory> = (_, c, cf) => {
  const proto = c.prototype as OhColorClass;
  const getRGB = proto.rgba;
  proto.getLuminance = function() {
    const [r, g, b] = getRGB.bind(this)();
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  }

  return cf as OhColorFactory;
}

export default getLuminance
