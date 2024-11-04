import type { Meta, StoryObj } from "@storybook/vue3";
import { ClCollapse, ClCollapseItem } from "cliffor-ui";
import "cliffor-ui/dist/theme/Collapse.css";

type Story = StoryObj<typeof ClCollapse>;

const meta: Meta<typeof ClCollapse> = {
  title: "Example/Collapse",
  component: ClCollapse,
  subcomponents: { ClCollapseItem },
  tags: ["autodocs"],
};

export const Default: Story = {
  render: (args) => ({
    components: {
      ClCollapse,
      ClCollapseItem,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
    <cl-collapse v-bind="args">
      <cl-collapse-item name="a" title="Title a">
        <div>this is content a</div>
      </cl-collapse-item>
      <cl-collapse-item name="b" title="title b">
        <div>this is content b</div>
      </cl-collapse-item>
      <cl-collapse-item name="c" title="title c  disable" disabled>
        <div>this is content c</div>
      </cl-collapse-item>
    </cl-collapse>
    `,
  }),
  args: {
    accordion: true,
    modelValue: ["a"],
  },
};

export default meta;
