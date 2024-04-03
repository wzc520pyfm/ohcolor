export {};

declare module "ohcolor" {
  interface MyColor {
    /** Override format with hex prop. */
    format(f: "hex"): string | unknown;
  }
}
