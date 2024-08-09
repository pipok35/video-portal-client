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
import { useChannelStore } from '@/stores/channels'
import AppLayoutHeader from '@/views/layouts/AppLayoutHeader.vue'

const userStore = useUserStore()
const channelStore = useChannelStore()

onMounted(async () => {
  await userStore.fetchUser()

  const storedChannel = localStorage.getItem('channel')
  if (storedChannel) {
    const currentChannel = await channelStore.fetchChannel(storedChannel)
    channelStore.setChannel(currentChannel)
  }
})
</script>

<style scoped>
</style>
