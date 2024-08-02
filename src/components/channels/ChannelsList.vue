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
import { PropType } from 'vue'
import { Channel } from '@/interfaces/channel.interface'
import ChannelListItem from '@/components/channels/ChannelListItem.vue'

const props = defineProps({
  channels: {
    type: Array as PropType<Channel[]>,
    required: true
  }
})
</script>
