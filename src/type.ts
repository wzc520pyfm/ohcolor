export type ColorSpace =
  | "rgb"
  | "hsl"
  | "hsv"
  | "hwb"
  | "cmyk"
  | "xyz"
  | "lab"
  | "lch"
  | "hex"
  | "keyword";
export type Format = "object" | "array" | "string" | "css";
export type FormatResult<T extends ColorSpace> = {
  [key in Format]: key extends "object"
    ? ColorObject<T>
    : key extends "array"
      ? ColorArray<T>
      : key extends "string"
        ? ColorString<T>
        : key extends "css"
          ? ColorCSS<T>
          : never;
};
export type ColorObject<T extends ColorSpace> = T extends "rgb"
  ? ColorRGB
  : never;
export type ColorArray<T extends ColorSpace> = T extends "rgb"
  ? TColorRGB
  : never;
export type ColorString<T extends ColorSpace> = T extends "rgb"
  ? StringColorRGB
  : never;
export type ColorCSS<T extends ColorSpace> = T extends "rgb"
  ? CssColorRGB
  : never;
export type RGB_R = number; // should recognize red channel, only 0 ~ 255
export type RGB_G = number; // should recognize green channel, only 0 ~ 255
export type RGB_B = number; // should recognize blue channel, only 0 ~ 255
export type Alpha = number; // should recognize alpha channel, only 0 ~ 1
export type TColorRGB = [RGB_R, RGB_G, RGB_B, Alpha]; // should recognize an array of three numbers, r,g,b number is 0 ~ 255, alpha number is 0 ~ 1
export type ColorRGB = { r: RGB_R; g: RGB_G; b: RGB_B; a: Alpha }; // should recognize an object with three properties, r,g,b property is 0 ~ 255, a property is 0 ~ 1
export type StringColorRGB = string; // should recognize a css string with rgb format
export type DecimalColorRGB = number; // should recognize a decimal number with rgb format, like 255
export type CssColorRGB = string; // should recognize a css string with rgb(a) format
export type Gl_RGB_R = number; // should recognize red channel, only 0 ~ 1
export type Gl_RGB_G = number; // should recognize green channel, only 0 ~ 1
export type Gl_RGB_B = number; // should recognize blue channel, only 0 ~ 1
export type GlColorRGB = [Gl_RGB_R, Gl_RGB_G, Gl_RGB_B, Alpha]; // should recognize an array of four numbers, each number is 0 ~ 1

export type ColorHexString = string; // should recognize hexadecimal string, like #ff3399 and #F39

// TODO: Prepare to support more color
export type ColorHex = number; // should recognize hexadecimal numbers, only 0 ~ 16777215
export type ColorNum = number; // should recognize any color space number
export type HSL_H = number; // should recognize hue channel, only 0 ~ 360
export type HSL_S = number; // should recognize saturation channel, only 0 ~ 100
export type HSL_L = number; // should recognize lightness channel, only 0 ~ 100
export type ColorHSL = { h: HSL_H; s: HSL_S; l: HSL_L; a?: Alpha }; // should recognize an object with three properties, h is 0 ~ 360, s and l and a are 0 ~ 100
