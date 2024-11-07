import { describe, expect, it, vi } from "vitest";
import { throwError, debugWarn } from "../error";

describe("utils/error", () => {
  it("throwError shold be worked", () => {
    expect(() => {
      throwError("scope", "msg");
    }).toThrowError("[scope]: msg");
  });
  it("debugWarn shold be worked", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    debugWarn("scope", "msg");
    debugWarn(new SyntaxError("custom error"));
    expect(warn.mock.calls).toMatchInlineSnapshot(`
      [
        [
          [ClUIError: [scope]: msg],
        ],
        [
          [SyntaxError: custom error],
        ],
      ]
    `);
  });
});
