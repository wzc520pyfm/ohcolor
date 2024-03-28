import type { MyColorPlugin } from "../..";
import {
  type InputColor as OInputColor,
  type MyColorCfg as OColorCfg,
  inputHex,
} from "../inputHex";
import { w3cx11, type W3CX11 } from "./w3cx11";

interface ColorCfg {
  color: W3CX11; // hex color
}

type MyColorCfg = OColorCfg & ColorCfg;

const parseColor = (cfg: MyColorCfg): OInputColor => {
  const { color } = cfg;
  const namedColor = color.toLowerCase?.() as W3CX11;

  if (w3cx11[namedColor]) {
    return w3cx11[namedColor];
  }

  // parse failed, return original color
  return color;
};

/**
 * Plugin: support parsing w3cx11 color
 * @note will install inputHex plugin at the same time
 */
export const inputNamed: MyColorPlugin = (_, c, mycolor) => {
  // Install dependent plugins
  mycolor.extend(inputHex);

  const proto = c.prototype;

  const oldParse = proto.parse;
  proto.parse = function (cfg: MyColorCfg) {
    const color = parseColor.bind(this)(cfg);
    const newCfg = { ...cfg, color };
    oldParse.bind(this)(newCfg as OColorCfg);
  };

  return mycolor;
};

type InputColor = OInputColor | W3CX11;

export type { MyColorCfg, InputColor };

export default inputNamed;

export { type W3CX11 } from "./w3cx11";
