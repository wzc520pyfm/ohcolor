import { inputHex } from "./plugin/inputHex";
import type {
  Alpha,
  ColorSpace,
  Format,
  FormatResult,
  RGB_B,
  RGB_G,
  RGB_R,
  TColorRGBA,
} from "./type";
import U from "./utils";

const IS_MYCOLOR = "$isMyColorObject";

const isMyColor = (c: any) => c instanceof Color || !!(c && c[IS_MYCOLOR]);

// Only r,g,b,a params is supported by default, unless you use a plugin
const mycolor = function <CS extends Extract<ColorSpace, "rgb"> = "rgb">(
  ...args: unknown[]
): RGBAColor {
  // Immutable data, return the cloned value.
  if (isMyColor(args[0])) {
    return (args[0] as RGBAColor).clone();
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
  return new RGBAColor(cfg as Cfg<CS>);
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
): InputColor<CS> => {
  const { color } = cfg;
  if (
    Array.isArray(color) &&
    color.length === 4 &&
    color.every((c) => Utils.n(c))
  ) {
    const [r, g, b, a] = color;
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
      return [r, g, b, a] as InputColor<CS>; // rgba
    }
  }
  return [0, 0, 0, 0] as InputColor<CS>; // default
};

type InputColor<CS extends ColorSpace = "rgb"> = CS extends "rgb"
  ? TColorRGBA
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

interface RGBA<CS extends Extract<ColorSpace, "rgb"> = "rgb"> {
  rgba(): TColorRGBA;
  alpha(a: Alpha): Color<CS>;
}

class RGBAColor<CS extends Extract<ColorSpace, "rgb"> = "rgb">
  extends Color<CS>
  implements RGBA
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

  clone(): RGBAColor {
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
      default: {
        return [this.r, this.g, this.b, this.a] as R;
      }
    }
  }

  rgba(): TColorRGBA {
    return [this.r, this.g, this.b, this.a];
  }

  alpha(a: number): RGBAColor<CS> {
    return Utils.w(this.r, this.g, this.b, a);
  }
}

interface MyColorPlugin<T = MyColorFn> {
  (
    option: any,
    mycolorClass: typeof RGBAColor,
    mycolorFactory: typeof mycolor,
  ): T;
}
interface MyColorPluginFn<T> extends MyColorPlugin<T> {
  $i?: boolean;
}
mycolor.extend = <T>(plugin: MyColorPluginFn<T>, option?: any) => {
  if (!plugin.$i) {
    // install plugin only once
    const newMycolor = plugin(option, RGBAColor, mycolor);
    plugin.$i = true;
    return newMycolor;
  }
  // this plugin has been installed
  return mycolor as T;
};

// Install built-in plugins
mycolor.extend(inputHex);

type MyColorFn = typeof mycolor;

export {
  mycolor,
  RGBAColor as MyColor, // MyColor supports RGBA by default
};
export default mycolor;

export type { Cfg, InputColor, MyColorFn, MyColorPlugin };
