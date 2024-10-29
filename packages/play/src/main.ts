import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import ClifforUI from "cliffor-ui";

const app = createApp(App);
app.use(ClifforUI);
app.mount("#app");
