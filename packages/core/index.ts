import { makeInstaller } from "@cliffor-ui/utils";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import components from "./compoents";
import "@cliffor-ui/theme/index.css";

library.add(fas);

/**
 * @description install all SFC as Vue Plugin with App.use
 */
const installer = makeInstaller(components);

export * from "../components";
export default installer;
