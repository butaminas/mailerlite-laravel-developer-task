import { createApp } from "vue"
import router from "./router"
import pinia from "./store/store"

import App from "./App.vue"

createApp(App).use(router).use(pinia).mount("#app")
