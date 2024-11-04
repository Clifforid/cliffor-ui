import Collapse from "./Collapse.vue";
import CollapseItem from "./CollapseItem.vue";
import { withInstall } from "@cliffor-ui/utils";

/**
 * @description transform SFC to Vue Plugin, in other words add install method to SFC, when use app.use(component) will call component.install automatically
 */
export const ClCollapse = withInstall(Collapse);
export const ClCollapseItem = withInstall(CollapseItem);

export * from "./types";
