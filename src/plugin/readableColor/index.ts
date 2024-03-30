import { getLuminance } from "../getLuminance";
import type { ColorPlugin } from "ohcolor";
import "./type.d.ts";

/**
 * Plugin: returns black or white for best contrast depending on the luminosity.
 */
export const readableColor: ColorPlugin = (_, c, mycolor) => {
  // Install dependent plugins
  mycolor.extend(getLuminance);

  const proto = c.prototype;
  proto.readableColorIsBlack = function () {
    return proto.getLuminance.bind(this)() > 0.179;
  };
  proto.readableColor = function () {
    return proto.readableColorIsBlack.bind(this)() ? "#000" : "#fff";
  };
};

export default readableColor;
