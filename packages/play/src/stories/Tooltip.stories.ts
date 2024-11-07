import type { StoryObj, Meta } from "@storybook/vue3";

import { fn } from "@storybook/test";
import { ClTooltip } from "cliffor-ui";
import "cliffor-ui/dist/theme/Tooltip.css";

type Story = StoryObj<typeof ClTooltip>;

const meta: Meta<typeof ClTooltip> = {
  title: "Example/Tooltip",
  component: ClTooltip,
  tags: ["autodocs"],
  argTypes: {
    trigger: {
      options: ["hover", "click", "contextmenu"],
      control: {
        type: "select",
      },
    },
    placement: {
      options: ["top", "bottom", "left", "right"],
      control: {
        type: "select",
      },
    },
  },
  args: {
    "onVisible-change": fn(),
  },
};

export const Default: Story = {
  args: {
    content: "This is a tooltip",
    placement: "top",
    trigger: "hover",
  },
  render: (args: any) => ({
    components: { ClTooltip },
    setup() {
      return {
        args,
      };
    },
    template: `
      <ClTooltip v-bind="args">
          <div style="height:30px;width:200px;background:red;padding:auto">trigger</div>
      </ClTooltip>
    `,
  }),
};

export default meta;
