import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './assets/tailwind.css'

import AppLayout from '@/views/layouts/AppLayout.vue'
import SimpleLayout from '@/views/layouts/SimpleLayout.vue'

const app = createApp(App)
app.use(createPinia())
app.use(router)

app.component('AppLayout', AppLayout)
app.component('SimpleLayout', SimpleLayout)

app.mount('#app')
