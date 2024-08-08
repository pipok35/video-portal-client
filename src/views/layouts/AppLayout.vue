<template>
  <div class="h-screen overflow-auto flex flex-col">
    <AppLayoutHeader />
    <main class="grow">
      <router-view v-if="userStore.user?._id"></router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/users'
import AppLayoutHeader from '@/views/layouts/AppLayoutHeader.vue'
import { AxiosError } from 'axios'

const userStore = useUserStore()

onMounted(async () => {
  try {
    await userStore.fetchUser()
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.response?.data.message)
    }
  }
})
</script>

<style scoped>
</style>
