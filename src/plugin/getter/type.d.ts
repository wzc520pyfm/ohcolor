export {};

declare module "ohcolor" {
  interface MyColor {
    /** Returns a red channel value. */
    getR: () => number;
    /** Returns a green channel value. */
    getG: () => number;
    /** Returns a blue channel value. */
    getB: () => number;
    /** Returns a alpha channel value. */
    getA: () => number;
  }
}
