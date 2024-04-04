export {};

declare module "ohcolor" {
  interface MyColor {
    /** Override format with hex prop. */
    format<T extends "hex" = "hex", R = string>(f: T): R;
  }
}
