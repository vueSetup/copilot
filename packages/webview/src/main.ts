// import './assets/main.css'

import { createApp } from 'vue'
import Antdv from 'ant-design-vue'
import VSCodeUI from "./components/vscode-ui"
import App from './App.vue'

createApp(App)
    .use(VSCodeUI)
    .use(Antdv)
    .mount('#app')
