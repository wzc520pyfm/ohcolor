import { Alpha, Format, RGB_R, RGB_G, RGB_B } from "../../type";
import { ColorPlugin } from "ohcolor";
import "./type.d.ts";
const { round } = Math;

type FormatWithDec = Format | "dec";

const rgba2dec = (r: RGB_R, g: RGB_G, b: RGB_B, a: Alpha) => {
  const _r = round(r);
  const _g = round(g);
  const _b = round(b);
  const _a = round(a * 255);
  return (_r << 24) + (_g << 16) + (_b << 8) + _a;
};

/**
 * Plugin: extend format function to support formatting to get decimal number color.
 */
export const formatDec: ColorPlugin = (_, c) => {
  const proto = c.prototype;

  const oldFormat = proto.format;
  const getRGBA = proto.rgba;
  proto.format = function (f: FormatWithDec) {
    if (f === "dec") {
      return rgba2dec(...getRGBA.bind(this)());
    }
    return oldFormat.bind(this)(f);
  };
};

export default formatDec;
