<template>
  <div>
    <ul>
      <ChannelListItem
        v-for="channel in props.channels"
        :key="channel.id"
        :channel="channel"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import ChannelListItem from '@/components/channels/ChannelListItem.vue'

const props = defineProps({
  channels: {
    type: Array as PropType<any[]>,
    required: true
  }
})
</script>
