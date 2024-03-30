export type ColorSpace =
  | "rgb" // maybe should changed to "rgba" ?
  | "hsl"
  | "hsv"
  | "hwb"
  | "cmyk"
  | "xyz"
  | "lab"
  | "lch"
  | "hex"
  | "keyword";
export type Format = "object" | "array" | "string";
export type FormatResult<T extends ColorSpace> = {
  [key in Format]: key extends "object"
    ? ColorObject<T>
    : key extends "array"
      ? ColorArray<T>
      : key extends "string"
        ? ColorString<T>
        : never;
};
export type ColorObject<T extends ColorSpace> = T extends "rgb"
  ? ColorRGBA
  : never;
export type ColorArray<T extends ColorSpace> = T extends "rgb"
  ? TColorRGBA
  : never;
export type ColorString<T extends ColorSpace> = T extends "rgb"
  ? StringColorRGBA
  : never;
export type RGB_R = number; // should recognize red channel, only 0 ~ 255
export type RGB_G = number; // should recognize green channel, only 0 ~ 255
export type RGB_B = number; // should recognize blue channel, only 0 ~ 255
export type Alpha = number; // should recognize alpha channel, only 0 ~ 1
export type TColorRGB = [RGB_R, RGB_G, RGB_B]; // should recognize an array of three numbers, each number is 0 ~ 255
export type TColorRGBA = [RGB_R, RGB_G, RGB_B, Alpha]; // should recognize an array of three numbers
export type ColorRGB = { r: RGB_R; g: RGB_G; b: RGB_B }; // should recognize an object with three properties, each property is 0 ~ 255
export type ColorRGBA = { r: RGB_R; g: RGB_G; b: RGB_B; a: Alpha }; // should recognize an object with three properties
export type StringColorRGB = string; // should recognize a css string with rgba format
export type StringColorRGBA = string; // should recognize a css string with rgba format

// TODO: Prepare to support more color
export type ColorHex = number; // should recognize hexadecimal numbers, only 0 ~ 16777215
export type ColorNum = number; // should recognize any color space number
export type HSL_H = number; // should recognize hue channel, only 0 ~ 360
export type HSL_S = number; // should recognize saturation channel, only 0 ~ 100
export type HSL_L = number; // should recognize lightness channel, only 0 ~ 100
export type ColorHSL = { h: HSL_H; s: HSL_S; l: HSL_L }; // should recognize an object with three properties, h is 0 ~ 360, s and l are 0 ~ 100
export type ColorHSLA = { h: HSL_H; s: HSL_S; l: HSL_L; a: Alpha }; // should recognize an object with three properties, h is 0 ~ 360, s and l are 0 ~ 100
