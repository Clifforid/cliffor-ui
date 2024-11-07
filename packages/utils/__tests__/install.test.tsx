import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { defineComponent, createApp } from "vue";

import { withInstall, makeInstaller } from "../install";

const AppComp = defineComponent({
  setup() {
    return () => <div>App</div>;
  },
});

const CompA = withInstall(
  defineComponent({
    name: "CompA",
    setup() {
      return () => <div>CompA</div>;
    },
  })
);

const CompB = withInstall(
  defineComponent({
    name: "CompB",
    setup() {
      return () => <div>CompB</div>;
    },
  })
);

describe("install", () => {
  it("withInstall should be worked", () => {
    const wrapper = mount(() => <div id="app"></div>);
    const app = createApp(AppComp);

    app.use(CompA).mount(wrapper.element);

    expect(CompA.install).toBeDefined();
    expect(CompB.install).toBeDefined();
    expect(app._context.components["CompA"]).toBeTruthy();
    expect(app._context.components["CompB"]).toBeFalsy();
  });

  it("makeInstaller should be worked", () => {
    const wrapper = mount(() => <div id="app"></div>);
    const app = createApp(AppComp);

    const installer = makeInstaller([CompA, CompB]);
    app.use(installer).mount(wrapper.element);

    expect(installer).toBeDefined();
    expect(wrapper.findComponent(CompA)).toBeTruthy();
    expect(wrapper.findComponent(CompB)).toBeTruthy();
  });
});
