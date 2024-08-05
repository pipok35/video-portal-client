<template>
  <div class="bg-neutral-100">
    <component :is="$route.meta.layout"></component>
  </div>
</template>

<script setup lang="ts">
import { axios } from './axiosConfig'
import { useUserStore } from '@/stores/users'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

axios.interceptors.request.use(config => {
  if (userStore.token) {
    config.headers.Authorization = `Bearer ${userStore.token}`
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
