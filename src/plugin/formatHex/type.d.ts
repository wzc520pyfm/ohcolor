import { StringColorRGBA } from "../../type";

export {};

declare module "ohcolor" {
  interface MyColor {
    /** Override format: Support formatting to get color with hex string. */
    format<T extends "hex" = "hex", R = StringColorRGBA>(f: T): R;
  }
}
