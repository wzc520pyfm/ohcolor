import { Alpha, Format, RGB_R, RGB_G, RGB_B } from "../../type";
import { ColorPlugin } from "ohcolor";
import "./type.d.ts";
const { round } = Math;

type FormatWithHex = Format | "hex";

const rgba2hex = (r: RGB_R, g: RGB_G, b: RGB_B, a: Alpha) => {
  const _r = round(r);
  const _g = round(g);
  const _b = round(b);
  const _a = round(a * 255);
  const u = (_r << 16) | (_g << 8) | _b;
  let str = "000000" + u.toString(16); // #.toUpperCase();
  str = str.slice(-6);
  let hxa = "0" + _a.toString(16);
  hxa = hxa.slice(-2);

  return `#${str}${hxa}`;
};

/**
 * Plugin: extend format function to support formatting hex color string.
 */
export const formatHex: ColorPlugin = (_, c) => {
  const proto = c.prototype;

  const oldFormat = proto.format;
  const getRGBA = proto.rgba;
  proto.format = function (f: FormatWithHex) {
    if (f === "hex") {
      return rgba2hex(...getRGBA.bind(this)());
    }
    return oldFormat.bind(this)(f);
  };
};

export default formatHex;
