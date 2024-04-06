import { StringColorRGB } from "../../type";

export {};

declare module "ohcolor" {
  interface MyColor {
    /** Returns the hex string of the rgba. */
    hex: () => StringColorRGB;
  }
}
