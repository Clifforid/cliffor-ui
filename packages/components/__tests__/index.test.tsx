import {
  ClAlert,
  ClButton,
  ClButtonGroup,
  ClCollapse,
  ClCollapseItem,
  ClIcon,
  ClTooltip,
} from "../index";
import type { Plugin } from "vue";
import { describe, expect, it } from "vitest";
import { map, get } from "lodash-es";

const comps = [
  ClAlert,
  ClButton,
  ClButtonGroup,
  ClCollapse,
  ClCollapseItem,
  ClIcon,
  ClTooltip,
] as Plugin[];

describe("components/index", () => {
  it.each(map(comps, (c) => [get(c, "name") ?? "", c]))(
    "%s should be exported",
    (_, component) => {
      expect(component).toBeDefined();
      expect((component as Plugin).install).toBeDefined();
    }
  );
});
