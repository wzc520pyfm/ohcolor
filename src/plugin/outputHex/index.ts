import { formatHex } from "../formatHex";
import type { ColorPlugin } from "ohcolor";
import "./type.d.ts";

/**
 * Plugin: support output hexadecimal color string.
 */
export const outputHex: ColorPlugin = (_, c, mycolor) => {
  // Install dependent plugins
  mycolor.extend(formatHex);

  const proto = c.prototype;

  proto.hex = function () {
    return proto.format.bind(this)("hex");
  };
};

export default outputHex;
