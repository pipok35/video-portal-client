import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './assets/tailwind.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import AppLayout from '@/views/layouts/AppLayout.vue'
import SimpleLayout from '@/views/layouts/SimpleLayout.vue'

import BaseCard from '@/components/base/BaseCard.vue'
import BaseModal from '@/components/base/BaseModal.vue'
import BaseFileUpload from '@/components/base/BaseFileUpload.vue'

library.add(faTimes)

const app = createApp(App)
app.use(createPinia())
app.use(router)

app.component('FontAwesomeIcon', FontAwesomeIcon)

app.component('AppLayout', AppLayout)
app.component('SimpleLayout', SimpleLayout)

app.component('BaseCard', BaseCard)
app.component('BaseModal', BaseModal)
app.component('BaseFileUpload', BaseFileUpload)

app.mount('#app')
