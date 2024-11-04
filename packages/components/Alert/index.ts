import Alert from "./Alert.vue";
import { withInstall } from "@cliffor-ui/utils";

/**
 * @description transform SFC to Vue Plugin, in other words add install method to SFC, when use app.use(component) will call component.install automatically
 */
export const ClAlert = withInstall(Alert);

export * from "./types";
