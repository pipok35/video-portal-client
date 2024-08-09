<template>
  <div class="bg-layout text-white font-sans">
    <Notification />
    <component :is="$route.meta.layout"></component>
  </div>
</template>

<script setup lang="ts">
import Notification from '@/components/Notification.vue'
import { axios } from './axiosConfig'
import { useUserStore } from '@/stores/users'
import { useRouter } from 'vue-router'
import { useChannelStore } from '@/stores/channels'

const userStore = useUserStore()
const channelStore = useChannelStore()
const router = useRouter()

axios.interceptors.request.use(config => {
  if (userStore.token) {
    config.headers.Authorization = `Bearer ${userStore.token}`
  }
  if (channelStore.currentChannel) {
    config.headers.channelId = channelStore.currentChannel._id
  }

  return config
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response?.status === 401) {
    userStore.logout()

    router.push({ name: 'login' })
  }
  return Promise.reject(error)
})
</script>
