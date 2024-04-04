import type { ColorPlugin } from "ohcolor";
import "./type.d.ts";

/**
 * Plugin: getters for rgba.
 */
export const getter: ColorPlugin = (_, c) => {
  const proto = c.prototype;
  const getRGBA = proto.rgba;
  proto.getR = function () {
    const r = getRGBA.bind(this)()[0];
    return r;
  };
  proto.getG = function () {
    const g = getRGBA.bind(this)()[1];
    return g;
  };
  proto.getB = function () {
    const b = getRGBA.bind(this)()[2];
    return b;
  };
  proto.getA = function () {
    const a = getRGBA.bind(this)()[3];
    return a;
  };
};

export default getter;
