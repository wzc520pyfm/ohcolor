import { expect, it, describe } from "vitest";
import U from "../src/utils";

describe("utils test", () => {
  it("types", () => {
    expect(U.u(undefined)).toBeTruthy();
    expect(U.u(123)).toBeFalsy();

    expect(U.n(456)).toBeTruthy();
    expect(U.n("456")).toBeFalsy();

    expect(U.o({ a: 666 })).toBeTruthy();
    expect(U.o(789)).toBeFalsy();

    expect(U.s("hello")).toBeTruthy();
    expect(U.s(111)).toBeFalsy();
  });
});
