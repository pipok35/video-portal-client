import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/pages/Home.vue'
import Video from '../views/pages/Video.vue'
import Register from '../views/pages/Register.vue'
import Login from '../views/pages/Login.vue'
import Upload from '../views/pages/Upload.vue'

const routes = [
  { name: 'home', path: '/', component: Home, meta: { layout: 'AppLayout' } },
  { name: 'video', path: '/video/:id', component: Video, meta: { layout: 'AppLayout' } },
  { name: 'register', path: '/register', component: Register, meta: { layout: 'SimpleLayout' } },
  { name: 'upload', path: '/upload', component: Upload, meta: { layout: 'AppLayout' } },
  { name: 'login', path: '/login', component: Login, meta: { layout: 'SimpleLayout' } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
