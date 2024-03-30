import { ColorHexString } from "../../type";

export {};

declare module "ohcolor" {
  interface MyColor {
    /** Returns black or white for best contrast depending on the luminosity. */
    readableColor: () => ColorHexString;
    /** Returns whether or not the readable color should be black. */
    readableColorIsBlack: () => boolean;
  }
}
