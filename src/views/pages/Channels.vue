<template>
  <div class="p-4">
    <div v-if="isLoading" class="text-3xl font-bold mb-4">Загрука...</div>
    <div v-else-if="channels.length === 0" class="text-3xl font-bold mb-4">Нет каналов</div>
    <div v-else class="text-3xl font-bold mb-4">Мои каналы</div>
    <ChannelList :channels="channels" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useChannelStore } from '@/stores/channels'
import ChannelList from '@/components/channels/ChannelsList.vue'
import { IChannel } from '@/interfaces/channel'

const channelStore = useChannelStore()
const channels = ref<IChannel[]>([])
const isLoading = ref(false)

onMounted(async () => {
  isLoading.value = true

  await channelStore.fetchChannels()
  channels.value = channelStore.channels

  isLoading.value = false
})
</script>
