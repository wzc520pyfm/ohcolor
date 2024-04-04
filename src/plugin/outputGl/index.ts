import type { ColorPlugin } from "ohcolor";
import "./type.d.ts";

/**
 * Plugin: get rgba array, but in the channel range of 0 ~ 1 instead of 0 ~ 255.
 */
export const outputGl: ColorPlugin = (_, c) => {
  const proto = c.prototype;
  const getRGB = proto.rgba;
  proto.gl = function () {
    const [r, g, b, a] = getRGB.bind(this)();
    return [r / 255, g / 255, b / 255, a];
  };
};

export default outputGl;
