import { describe, expect, it } from "vitest";
import {
  debugWarn,
  throwError,
  withInstall,
  makeInstaller,
  typeIconMap,
} from "../index";
import { each } from "lodash-es";

describe("utils/index", () => {
  it("debugWarn shold be exported", () => {
    expect(debugWarn).toBeDefined();
  });
  it("throwError shold be exported", () => {
    expect(throwError).toBeDefined();
  });
  it("withInstall shold be exported", () => {
    expect(withInstall).toBeDefined();
  });
  it("makeInstaller shold be exported", () => {
    expect(makeInstaller).toBeDefined();
  });
  it("typeIconMap shold be worked", () => {
    expect(typeIconMap).toBeDefined();
    each(
      [
        ["info", "circle-info"],
        ["success", "check-circle"],
        ["warning", "circle-exclamation"],
        ["danger", "circle-xmark"],
        ["error", "circle-xmark"],
      ],
      ([type, icon]) => {
        expect(typeIconMap.get(type)).toBe(icon);
      }
    );
  });
});
