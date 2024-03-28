import { inputHex } from "./plugin/inputHex";
import { inputNamed } from "./plugin/inputNamed";
import type {
  Alpha,
  Format,
  FormatResult,
  RGB_B,
  RGB_G,
  RGB_R,
  TColorRGBA,
} from "./type";
import U from "./utils";

const IS_MYCOLOR = "$isMyColorObject";

const isMyColor = (c: any) => c instanceof MyColor || !!(c && c[IS_MYCOLOR]);

// Only r,g,b,a params is supported by default, unless you use a plugin
const mycolor = function (...args: unknown[]): MyColor {
  // Immutable data, return the cloned value.
  if (isMyColor(args[0])) {
    return (args[0] as MyColor).clone();
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
  return new MyColor(cfg as Cfg);
};

const wrapper = (...args: unknown[]) => mycolor(...args);

const Utils = {
  ...U,
  i: isMyColor,
  w: wrapper,
};

type MaybeCfg = Cfg & {
  color: unknown;
};

const parseColor = (cfg: MaybeCfg): InputColor => {
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
      return [r, g, b, a]; // rgba
    }
  }
  return [0, 0, 0, 0]; // default
};

type InputColor = TColorRGBA;

interface Option {}

interface Cfg {
  color: InputColor;
  args: [...Cfg["color"], Option];
}
class MyColor {
  private r: RGB_R = 0;
  private g: RGB_G = 0;
  private b: RGB_B = 0;
  private a: Alpha = 0;
  public [IS_MYCOLOR] = false;

  constructor(cfg: Cfg) {
    this.parse(cfg); // for plugin
    this[IS_MYCOLOR] = true;
  }

  public parse(cfg: Cfg) {
    const [r, g, b, a] = parseColor(cfg);
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  public rgba(): TColorRGBA {
    return [this.r, this.g, this.b, this.a];
  }

  public format<T extends Format = Format>(f: T): FormatResult[T] {
    switch (f) {
      case "object": {
        return {
          r: this.r,
          g: this.g,
          b: this.b,
          a: this.a,
        } as FormatResult[T];
      }
      case "array": {
        return [this.r, this.g, this.b, this.a] as FormatResult[T];
      }
      case "string": {
        return `rgba(${this.r},${this.g},${this.b},${this.a})` as FormatResult[T];
      }
      default: {
        return [this.r, this.g, this.b, this.a] as FormatResult[T];
      }
    }
  }

  public clone() {
    return Utils.w(this.r, this.g, this.b, this.a);
  }
}

interface MyColorPlugin<T = MyColorFn> {
  (
    option: any,
    mycolorClass: typeof MyColor,
    mycolorFactory: typeof mycolor,
  ): T;
}
interface MyColorPluginFn<T> extends MyColorPlugin<T> {
  $i?: boolean;
}
mycolor.extend = <T>(plugin: MyColorPluginFn<T>, option?: any) => {
  if (!plugin.$i) {
    // install plugin only once
    const newMycolor = plugin(option, MyColor, mycolor);
    plugin.$i = true;
    return newMycolor;
  }
  // this plugin has been installed
  return mycolor as T;
};

// Install built-in plugins
mycolor.extend(inputHex);
mycolor.extend(inputNamed);

type MyColorFn = typeof mycolor;

export { mycolor, MyColor };
export default mycolor;

export type { Cfg, InputColor, MyColorFn, MyColorPlugin };
