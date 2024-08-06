<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">{{ channel?.title }}</h1>
    <p>{{ channel?.description }}</p>
    <div class="flex gap-2">
      <BaseButton @click="subscribe">Подписаться</BaseButton>
      <BaseButton @click="unsubscribe">Отписаться</BaseButton>
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
