import { makeInstaller } from "@cliffor-ui/utils";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import components from "./compoents";
import printLogo from "./printLogo";
import "@cliffor-ui/theme/index.css";

printLogo();

library.add(fas);

/**
 * @description install all SFC as Vue Plugin with App.use
 */
const installer = makeInstaller(components);

export * from "@cliffor-ui/components";
export default installer;
