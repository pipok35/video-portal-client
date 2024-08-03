<template>
  <div>
    <ul>
      <ChannelListItem
        v-for="channel in props.channels"
        :key="channel._id"
        :channel="channel"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Channel } from '@/interfaces/channel'
import ChannelListItem from '@/components/channels/ChannelListItem.vue'

interface Props {
  channels: Channel[];
}

const props = defineProps<Props>()
</script>
