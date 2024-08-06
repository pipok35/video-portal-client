import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './assets/tailwind.css'

import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { IoExitOutline, IoCloseOutline, FaUserCircle } from 'oh-vue-icons/icons'

import AppLayout from '@/views/layouts/AppLayout.vue'
import SimpleLayout from '@/views/layouts/SimpleLayout.vue'

import BaseCard from '@/components/base/BaseCard.vue'
import BaseModal from '@/components/base/BaseModal.vue'
import BaseFileUpload from '@/components/base/BaseFileUpload.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseInput from '@/components/base/BaseInput.vue'

addIcons(IoExitOutline, IoCloseOutline, FaUserCircle)

const app = createApp(App)
app.use(createPinia())
app.use(router)

app.component('VIcon', OhVueIcon)

app.component('AppLayout', AppLayout)
app.component('SimpleLayout', SimpleLayout)

app.component('BaseCard', BaseCard)
app.component('BaseModal', BaseModal)
app.component('BaseFileUpload', BaseFileUpload)
app.component('BaseButton', BaseButton)
app.component('BaseInput', BaseInput)

app.mount('#app')
