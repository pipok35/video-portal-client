<template>
  <BaseCard>
    <router-link class="flex flex-col gap-2" :to="{ name: 'channel', params: { id: props.channel._id }}">
      <div class="text-xl font-semibold">{{ props.channel.title }}</div>
      <div class="text-xl">{{ props.channel.description }}</div>
    </router-link>
  </BaseCard>
</template>

<script setup lang="ts">
import { IChannel } from '@/interfaces/channel'

interface Props {
  channel: IChannel;
}

const props = defineProps<Props>()
</script>
