import { makeInstaller } from "@cliffor-ui/utils";
import components from "./compoents";
import "@cliffor-ui/theme/index.css";

const installer = makeInstaller(components);

export * from "@cliffor-ui/components";
export default installer;
