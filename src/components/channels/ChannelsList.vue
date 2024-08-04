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
import { IChannel } from '@/interfaces/channel'
import ChannelListItem from '@/components/channels/ChannelListItem.vue'

interface Props {
  channels: IChannel[];
}

const props = defineProps<Props>()
</script>
