import { createApp } from "vue";
import App from "./App.vue";
import ClifforUI from "cliffor-ui";
import "cliffor-ui/dist/index.css";

const app = createApp(App);
app.use(ClifforUI);
app.mount("#app");
