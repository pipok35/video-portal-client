<template>
  <header class="bg-layout text-white p-4">
    <div class="flex justify-between items-center">
      <router-link :to="{ name: 'home' }" class="flex gap-2 items-center">
        <img src="/logo.svg" alt="logo" width="30" height="30">
        <h1 class="text-2xl font-bold">Video Portal</h1>
      </router-link>
      <nav>
        <BaseButton v-if="route.meta.layout === 'SimpleLayout' && route.name !== 'login'" color="red">
          <router-link to="/login" class="text-white">Войти</router-link>
        </BaseButton>
        <BaseButton v-if="route.meta.layout === 'SimpleLayout' && route.name !== 'register'" color="red">
          <router-link to="/register" class="text-white">Зарегистрироваться</router-link>
        </BaseButton>
        <div v-if="route.meta.layout === 'AppLayout'" class="flex gap-2">
          <router-link :to="{ name: 'profile' }" class="p-2"><v-icon name="fa-user-circle" scale="1.5"></v-icon></router-link>
          <BaseButton color="red" right-icon="io-exit-outline" @click="logout">Выйти</BaseButton>
        </div>
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
