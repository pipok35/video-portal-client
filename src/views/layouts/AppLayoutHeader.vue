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
          <BaseButton type="router-link" :to="{ name: 'channel', params: { id: channelStore.currentChannel._id } }">Мой канал</BaseButton>
          <router-link :to="{ name: 'profile' }" class="min-w-10 min-h-10"><img :src="avatarUrl" class="block rounded-full max-w-12 min-h-12" /></router-link>
          <BaseButton color="red" size="large" right-icon="io-exit-outline" @click="logout">Выйти</BaseButton>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/users'
import { useChannelStore } from '@/stores/channels'
import { useRouter, useRoute } from 'vue-router'
import { useApiUrl } from '@/useApiUrl'
import { computed } from 'vue'

const userStore = useUserStore()
const channelStore = useChannelStore()
const router = useRouter()
const route = useRoute()
const apiUrl = useApiUrl()

const avatarUrl = computed(() => {
  return userStore.user?.avatarId ? `${apiUrl}/files/${userStore.user?.avatarId}/download` : ''
})

const logout = () => {
  userStore.logout()
  router.push('/login')
}

</script>

<style scoped>
</style>
