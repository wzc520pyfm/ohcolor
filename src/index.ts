import { inputHex } from "./plugin/inputHex";
import type {
  Alpha,
  ColorSpace,
  Format,
  FormatResult,
  RGB_B,
  RGB_G,
  RGB_R,
  TColorRGB,
} from "./type";
import U from "./utils";

const IS_MYCOLOR = Symbol("$isMyColorObject");

const isMyColor = (c: any) => c instanceof Color || !!(c && c[IS_MYCOLOR]);

// Only r,g,b,a params is supported by default, unless you use a plugin
const mycolor = function <CS extends Extract<ColorSpace, "rgb"> = "rgb">(
  ...args: unknown[]
): RGBColor {
  // Immutable data, return the cloned value.
  if (isMyColor(args[0])) {
    return (args[0] as RGBColor).clone();
  }

  // Promise: If there are multiple parameters and the last parameter is an object, the last parameter is config
  const hasCfg = args.length > 1 && typeof args[-1] === "object";
  const baseCfg = hasCfg ? (args[-1] as object) : {};
  const _color = hasCfg ? args.slice(0, -1) : args;
  const color = _color.length === 1 ? _color[0] : _color;

  const cfg = {
    ...baseCfg,
    color,
    args,
  };
  return new RGBColor(cfg as Cfg<CS>);
};

const wrapper = (...args: unknown[]) => mycolor(...args);

const Utils = {
  n: U.n,
  w: wrapper,
};

type MaybeCfg<CS extends ColorSpace = "rgb"> = Cfg<CS> & {
  color: unknown;
};

const parseColor = <CS extends Extract<ColorSpace, "rgb"> = "rgb">(
  cfg: MaybeCfg<CS>,
): ParsedColor<CS> => {
  const { color } = cfg;
  if (
    Array.isArray(color) &&
    (color.length === 4 || color.length === 3) &&
    color.every((c) => Utils.n(c))
  ) {
    const [r, g, b, a = 1] = color;
    if (
      r >= 0 &&
      r <= 255 &&
      g >= 0 &&
      g <= 255 &&
      b >= 0 &&
      b <= 255 &&
      a >= 0 &&
      a <= 1
    ) {
      return [r, g, b, a] as ParsedColor<CS>; // rgba
    }
  }
  return [0, 0, 0, 0] as ParsedColor<CS>; // default
};

type OptionalTupleLast<T extends any[]> = T extends [...infer U, infer L]
  ? [...U, L?]
  : never;
type InputColor<CS extends ColorSpace = "rgb"> = CS extends "rgb"
  ? OptionalTupleLast<TColorRGB>
  : never;
type ParsedColor<CS extends ColorSpace = "rgb"> = CS extends "rgb"
  ? TColorRGB
  : never;

interface Option {
  cs?: ColorSpace;
}

interface Cfg<CS extends ColorSpace = "rgb"> {
  color: InputColor<CS>;
  args?: [...Cfg<CS>["color"], Option];
}

abstract class Color<CS extends ColorSpace> {
  abstract [IS_MYCOLOR]: boolean;
  abstract parse(cfg: Cfg<CS>): void;
  abstract clone(): Color<CS>;
  abstract format<T extends Format = Format>(f: T): FormatResult<CS>[T];
}

interface RGB<CS extends Extract<ColorSpace, "rgb"> = "rgb"> {
  /** @description Get rgba array by standard methods */
  rgba(): TColorRGB;
  red(): RGB_R;
  red(r: RGB_R): Color<CS>;
  green(): RGB_G;
  green(g: RGB_G): Color<CS>;
  blue(): RGB_B;
  blue(b: RGB_B): Color<CS>;
  alpha(): Alpha;
  alpha(a: Alpha): Color<CS>;
}

class RGBColor<CS extends Extract<ColorSpace, "rgb"> = "rgb">
  extends Color<CS>
  implements RGB
{
  private r: RGB_R = 0;
  private g: RGB_G = 0;
  private b: RGB_B = 0;
  private a: Alpha = 0;
  public [IS_MYCOLOR] = false;

  constructor(cfg: Cfg<CS>) {
    super();
    this.parse(cfg); // for plugin
    this[IS_MYCOLOR] = true;
  }

  // for plugin, need to be public
  /** @internal */
  parse(cfg: Cfg<CS>): void {
    const [r, g, b, a] = parseColor(cfg);
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  clone(): RGBColor {
    return Utils.w(this.r, this.g, this.b, this.a);
  }

  format<T extends Format = Format, R = FormatResult<CS>[T]>(f: T): R {
    switch (f) {
      case "object": {
        return {
          r: this.r,
          g: this.g,
          b: this.b,
          a: this.a,
        } as R;
      }
      case "array": {
        return [this.r, this.g, this.b, this.a] as R;
      }
      case "string": {
        return `rgba(${this.r},${this.g},${this.b},${this.a})` as R;
      }
      // https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/rgb
      case "css": {
        return `rgb(${this.r} ${this.g} ${this.b} / ${this.a})` as R;
      }
      default: {
        return [this.r, this.g, this.b, this.a] as R;
      }
    }
  }

  rgba(): TColorRGB {
    return [this.r, this.g, this.b, this.a];
  }

  red(): RGB_R;
  red(r: RGB_R): RGBColor<CS>;
  red(r?: RGB_R): RGB_R | RGBColor<CS> {
    if (U.u(r)) {
      return this.r;
    }
    return Utils.w(r, this.g, this.b, this.a);
  }

  green(): RGB_G;
  green(g: RGB_G): RGBColor<CS>;
  green(g?: RGB_G): RGB_G | RGBColor<CS> {
    if (U.u(g)) {
      return this.g;
    }
    return Utils.w(this.r, g, this.b, this.a);
  }

  blue(): RGB_B;
  blue(b: RGB_B): RGBColor<CS>;
  blue(b?: RGB_B): RGB_B | RGBColor<CS> {
    if (U.u(b)) {
      return this.b;
    }
    return Utils.w(this.r, this.g, b, this.a);
  }

  alpha(): Alpha;
  alpha(a: Alpha): RGBColor<CS>;
  alpha(a?: Alpha): Alpha | RGBColor<CS> {
    if (U.u(a)) {
      return this.a;
    }
    return Utils.w(this.r, this.g, this.b, a);
  }
}

interface ColorPlugin<T = unknown> {
  (
    option: T | undefined,
    mycolorClass: typeof RGBColor,
    mycolorFactory: typeof mycolor,
  ): void;
}
interface ColorPluginFn<T = unknown> extends ColorPlugin<T> {
  $i?: boolean;
}
mycolor.extend = <T = unknown>(plugin: ColorPluginFn<T>, option?: T) => {
  if (!plugin.$i) {
    // install plugin only once
    plugin(option, RGBColor, mycolor);
    plugin.$i = true;
  }
};

// Install built-in plugins
mycolor.extend(inputHex);

type MyColorFn = typeof mycolor;

export {
  mycolor,
  RGBColor as MyColor, // MyColor supports RGBA by default
};
export default mycolor;

export type { Cfg, InputColor, MyColorFn, ColorPlugin };
