export {};

declare module "ohcolor" {
  interface MyColor {
    /** Returns a number (float) representing the luminance of a color.. */
    themeColors: () => Record<string, string>;
  }
}
