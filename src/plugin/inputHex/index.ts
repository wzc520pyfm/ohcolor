import type {
  Cfg as OColorCfg,
  MyColorPlugin,
  InputColor as OInputColor,
} from "../..";

type ColorHexString = string; // should recognize hexadecimal string, like #ff3399 and #F39
interface ColorCfg {
  color: ColorHexString;
}

type MyColorCfg = OColorCfg & ColorCfg;

const RE_HEX = /^#?([\dA-Fa-f]{6}|[\dA-Fa-f]{3})$/;
const RE_HEXA = /^#?([\dA-Fa-f]{8}|[\dA-Fa-f]{4})$/;

const parseColor = (cfg: MyColorCfg): OInputColor => {
  const { color } = cfg;
  let _hex: string | string[] = color;

  // match rgb hex format, eg #FF0000
  if (RE_HEX.test(_hex)) {
    // remove optional leading #
    if (_hex.length === 4 || _hex.length === 7) {
      _hex = _hex.slice(1);
    }
    // expand short-notation to full six-digit
    if (_hex.length === 3) {
      _hex = [..._hex];
      _hex = _hex[0] + _hex[0] + _hex[1] + _hex[1] + _hex[2] + _hex[2];
    }
    const u = Number.parseInt(_hex, 16);
    const r = u >> 16;
    const g = (u >> 8) & 0xff;
    const b = u & 0xff;
    return [r, g, b, 1];
  }

  // match rgba hex format, eg #FF000077
  if (RE_HEXA.test(_hex)) {
    if (_hex.length === 5 || _hex.length === 9) {
      // remove optional leading #
      _hex = _hex.slice(1);
    }
    // expand short-notation to full eight-digit
    if (_hex.length === 4) {
      _hex = [..._hex];
      _hex =
        _hex[0] +
        _hex[0] +
        _hex[1] +
        _hex[1] +
        _hex[2] +
        _hex[2] +
        _hex[3] +
        _hex[3];
    }
    const u = Number.parseInt(_hex, 16);
    const r = (u >> 24) & 0xff;
    const g = (u >> 16) & 0xff;
    const b = (u >> 8) & 0xff;
    const a = Math.round(((u & 0xff) / 0xff) * 100) / 100;
    return [r, g, b, a];
  }

  // parse failed, return original color
  return color;
};

export const inputHex: MyColorPlugin = (_, c, cf) => {
  const proto = c.prototype;

  const oldParse = proto.parse;
  proto.parse = function (cfg: MyColorCfg) {
    const color = parseColor.bind(this)(cfg);
    const newCfg = { ...cfg, color };
    oldParse.bind(this)(newCfg);
  };

  return cf;
};

type InputColor = OInputColor | ColorHexString;

export type { ColorHexString, MyColorCfg, InputColor };

export default inputHex;
