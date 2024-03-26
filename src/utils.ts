const isUndefined = (s: unknown) => s === undefined;
const isNumber = (s: unknown) => typeof s === "number";

export default {
  u: isUndefined,
  n: isNumber,
};
