<template>
  <header class="bg-blue-600 text-white p-4">
    <div class="container mx-auto flex justify-between items-center">
      <router-link :to="{ name: 'home' }" class="flex gap-2 items-center">
        <img src="/logo.svg" alt="logo" width="30" height="30">
        <h1 class="text-2xl font-bold">Video Portal</h1>
      </router-link>
      <nav class="flex gap-8 items-center text-white">
        <router-link :to="{ name: 'home' }" class="hover:underline">Главная</router-link>
        <router-link :to="{ name: 'channels' }" class="hover:underline">Мои каналы</router-link>
        <router-link :to="{ name: 'createVideo' }" class="hover:underline">Загрузить видео</router-link>
        <router-link :to="{ name: 'createChannel' }" class="hover:underline">Создать канал</router-link>
        <button class="ml-4 bg-red-500 text-white p-2 rounded" @click="logout">Выйти</button>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const logout = () => {
  userStore.logout()
  router.push('/login')
}

</script>

<style scoped>
</style>
