import { StringColorRGBA } from "../../type";

export {};

declare module "ohcolor" {
  interface MyColor {
    /** Override format with hex prop. */
    format<T extends "hex" = "hex", R = StringColorRGBA>(f: T): R;
  }
}
