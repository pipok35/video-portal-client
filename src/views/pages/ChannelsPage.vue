<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Мои каналы</h1>
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

onMounted(async () => {
  await channelStore.fetchChannels()
  channels.value = channelStore.channels
})
</script>
