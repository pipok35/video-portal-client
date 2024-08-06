<template>
  <div class="flex flex-col gap-2">
    <ChannelListItem
      v-for="channel in props.channels"
      :key="channel._id"
      :channel="channel"
    />
  </div>
</template>

<script setup lang="ts">
import { IChannel } from '@/interfaces/channel'
import ChannelListItem from '@/components/channels/ChannelListItem.vue'

interface Props {
  channels: IChannel[];
}

const props = defineProps<Props>()
</script>
