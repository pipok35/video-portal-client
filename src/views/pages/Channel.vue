<template>
  fdsfsfsfsf
  <div>
    <h1 class="text-2xl font-bold mb-4">{{ channel?.title }}</h1>
    <p>{{ channel?.description }}</p>
    <div class="flex gap-2">
      <button class="bg-green-500 text-white px-4 py-2" @click="subscribe">Подписаться</button>
      <button class="bg-red-500 text-white px-4 py-2" @click="unsubscribe">Отписаться</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useChannelStore } from '@/stores/channels'
import { IChannel } from '@/interfaces/channel'

const route = useRoute()
const channelStore = useChannelStore()
const channel = ref<IChannel | null>(null)

onMounted(async () => {
  const data = await channelStore.fetchChannel(route.params.id as string)
  channel.value = data
})

const subscribe = async () => {
  await channelStore.subscribeToChannel(channel.value!._id)
}

const unsubscribe = async () => {
  await channelStore.unsubscribeFromChannel(channel.value!._id)
}
</script>
