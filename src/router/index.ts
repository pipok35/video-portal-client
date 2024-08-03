import { createRouter, createWebHistory, RouterView } from 'vue-router'
import { h } from 'vue'

const authRoutes = [
  { name: 'register', path: '/register', component: () => import('@/views/pages/Register.vue'), meta: { layout: 'SimpleLayout' } },
  { name: 'login', path: '/login', component: () => import('@/views/pages/Login.vue'), meta: { layout: 'SimpleLayout' } }
]

const videoRoutes = [
  // { name: 'videos', path: '', component: ChannelsPage, meta: { layout: 'AppLayout' } },
  { name: 'createVideo', path: 'create', component: () => import('@/views/pages/CreateVideo.vue'), meta: { layout: 'AppLayout' } },
  { name: 'video', path: ':id', component: () => import('@/views/pages/Video.vue'), meta: { layout: 'AppLayout' } }
]

const channelRoutes = [
  { name: 'channels', path: '', component: () => import('@/views/pages/ChannelsPage.vue'), meta: { layout: 'AppLayout' } },
  { name: 'createChannel', path: 'create', component: () => import('@/views/pages/CreateChannelPage.vue'), meta: { layout: 'AppLayout' } },
  { name: 'channel', path: ':id', component: () => import('@/views/pages/ChannelPage.vue'), meta: { layout: 'AppLayout' } }
]

const routes = [
  { name: 'home', path: '/', component: () => import('@/views/pages/Home.vue'), meta: { layout: 'AppLayout' } },
  ...authRoutes,
  {
    path: '/videos',
    component: { render: () => h(RouterView) },
    children: videoRoutes
  },
  {
    path: '/channels',
    component: { render: () => h(RouterView) },
    children: channelRoutes
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
