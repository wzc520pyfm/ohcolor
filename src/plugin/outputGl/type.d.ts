import { GlColorRGB } from "../../type";

export {};

declare module "ohcolor" {
  interface MyColor {
    /** Returns the luminance of the color. */
    gl: () => GlColorRGB;
  }
}
