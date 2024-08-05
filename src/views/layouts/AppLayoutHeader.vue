<template>
  <header class="bg-gray-800 text-white p-4">
    <div class="container mx-auto flex justify-between items-center">
      <router-link :to="{ name: 'home' }" class="flex gap-2 items-center">
        <img src="/logo.svg" alt="logo" width="30" height="30">
        <h1 class="text-2xl font-bold">Video Portal</h1>
      </router-link>
      <nav class="flex gap-8 items-center text-white">
        <router-link v-if="route.meta.layout === 'SimpleLayout' && route.name !== 'login'" to="/login" class="text-white mr-4">Войти</router-link>
        <router-link v-if="route.meta.layout === 'SimpleLayout' && route.name !== 'register'" to="/register" class="text-white">Зарегистрироваться</router-link>
        <router-link v-if="route.meta.layout === 'AppLayout' && route.name !== 'home'" :to="{ name: 'home' }" class="hover:underline">Главная</router-link>
        <router-link v-if="route.meta.layout === 'AppLayout'" :to="{ name: 'profile' }" class="hover:underline">Профиль</router-link>
        <button class="ml-4 bg-red-500 text-white p-2 rounded" @click="logout">Выйти</button>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/users'
import { useRouter, useRoute } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

const logout = () => {
  userStore.logout()
  router.push('/login')
}

</script>

<style scoped>
</style>
