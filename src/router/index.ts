import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/pages/Home.vue'
import Movie from '../views/pages/Movie.vue'
import Register from '../views/pages/Register.vue'
import Login from '../views/pages/Login.vue'

const routes = [
  { path: '/', component: Home, meta: { layout: 'AppLayout' } },
  { path: '/movie/:id', component: Movie, meta: { layout: 'AppLayout' } },
  { path: '/register', component: Register, meta: { layout: 'SimpleLayout' } },
  { path: '/login', component: Login, meta: { layout: 'SimpleLayout' } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
