const TYPE_NAME = [
  "Boolean",
  "Number",
  "String",
  "Function",
  "Array",
  "Date",
  "RegExp",
  "Undefined",
  "Null",
];
const classToType = Object.fromEntries(
  TYPE_NAME.map((name) => {
    return [`[object ${name}]`, name.toLowerCase()];
  }),
);
const getType = (obj: unknown) => {
  return classToType[Object.prototype.toString.call(obj)] || "object";
};

const isUndefined = (s: unknown) => getType(s) === "undefined";
const isNumber = (s: unknown) => getType(s) === "number";
const isObject = (s: unknown) => getType(s) === "object";
const isString = (s: unknown) => getType(s) === "string";

export default {
  u: isUndefined,
  n: isNumber,
  o: isObject,
  s: isString,
};
