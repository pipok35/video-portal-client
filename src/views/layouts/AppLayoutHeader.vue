<template>
  <header class="bg-layout p-4">
    <div class="flex justify-between items-center">
      <router-link :to="{ name: 'home' }" class="flex gap-2">
        <img src="/logo.svg" alt="logo" width="40" height="40">
        <span class="text-3xl font-bold">Video Portal</span>
      </router-link>
      <nav>
        <BaseButton
          v-if="route.meta.layout === 'SimpleLayout' && route.name !== 'login'"
          type="router-link"
          to="/login"
          color="red"
          size="large"
        >
          Войти
        </BaseButton>
        <BaseButton
          v-if="route.meta.layout === 'SimpleLayout' && route.name !== 'register'"
          type="router-link"
          to="/register"
          color="red"
          size="large"
        >
          Зарегистрироваться
        </BaseButton>
        <div v-if="route.meta.layout === 'AppLayout'" class="flex gap-2 items-center">
          <router-link :to="{ name: 'profile' }"><v-icon name="fa-user-circle" scale="2.5"></v-icon></router-link>
          <BaseButton color="red" size="large" right-icon="io-exit-outline" @click="logout">Выйти</BaseButton>
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
