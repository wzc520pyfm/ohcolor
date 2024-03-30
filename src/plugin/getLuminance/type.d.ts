export {};

declare module "ohcolor" {
  interface MyColor {
    /** Returns the luminance of the color. */
    getLuminance: () => number;
  }
}
