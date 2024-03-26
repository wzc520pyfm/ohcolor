import { inputHex } from "./plugin/inputHex";
import type { Alpha, RGB_B, RGB_G, RGB_R, TColorRGBA } from "./type";
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
  return new MyColor(cfg as MyColorCfg);
};

const wrapper = (...args: unknown[]) => mycolor(...args);

const Utils = {
  ...U,
  i: isMyColor,
  w: wrapper,
};

const parseColor = (cfg: MyColorCfg): TColorRGBA => {
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

interface Config {}

interface MyColorCfg {
  color: TColorRGBA;
  args: [...MyColorCfg["color"], Config];
}
class MyColor {
  private r: RGB_R = 0;
  private g: RGB_G = 0;
  private b: RGB_B = 0;
  private a: Alpha = 0;
  public [IS_MYCOLOR] = false;

  constructor(cfg: MyColorCfg) {
    this.parse(cfg); // for plugin
    this[IS_MYCOLOR] = true;
  }

  public parse(cfg: MyColorCfg) {
    const [r, g, b, a] = parseColor(cfg);
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  public rgba(): TColorRGBA {
    return [this.r, this.g, this.b, this.a];
  }

  public clone() {
    return Utils.w(this.r, this.g, this.b, this.a);
  }
}

interface MyColorPlugin {
  (
    option: any,
    mycolorClass: typeof MyColor,
    mycolorFactory: typeof mycolor,
  ): void;
}
interface MyColorPluginFn extends MyColorPlugin {
  $i?: boolean;
}
mycolor.extend = (plugin: MyColorPluginFn, option?: any) => {
  if (!plugin.$i) {
    // install plugin only once
    plugin(option, MyColor, mycolor);
    plugin.$i = true;
  }
  return mycolor;
};

// Install built-in plugins
mycolor.extend(inputHex);

export { mycolor, MyColor };
export default mycolor;

export type { MyColorCfg, MyColorPlugin };
