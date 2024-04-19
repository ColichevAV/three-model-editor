import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'uno.css'
import './assets/main.css'
import './assets/sass/style.sass'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
