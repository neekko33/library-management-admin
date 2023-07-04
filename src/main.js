import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import lang from "element-plus/lib/locale/lang/zh-cn";
import router from "./router";
import "./styles/index.css";

const app = createApp(App);
app.use(router);
app.use(createPinia());

app.mount("#app");
