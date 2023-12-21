import { registerPlugins } from "@/plugins"
import { createApp } from "vue"
import App from "./App.vue"
import "@mdi/font/css/materialdesignicons.css";
import "@fortawesome/fontawesome-free/css/all.css";

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
