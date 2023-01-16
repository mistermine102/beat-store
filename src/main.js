import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import store from "./stores/index";
import baseBeat from './components/base/BaseBeat.vue'

const app = createApp(App);

app.component("base-beat", baseBeat)

app.use(store);
app.use(router);

app.mount("#app");
