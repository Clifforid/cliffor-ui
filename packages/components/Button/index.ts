import Button from "./Button.vue";
import ButtonGroup from "./ButtonGroup.vue";
import { withInstall } from "@cliffor-ui/utils";

/**
 * @description transform SFC to Vue Plugin, in other words add install method to SFC, when use app.use(component) will call component.install automatically
 */
export const ClButton = withInstall(Button);
export const ClButtonGroup = withInstall(ButtonGroup);

export * from "./types";
