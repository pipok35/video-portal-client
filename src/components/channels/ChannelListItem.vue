<template>
  <li class="border p-4 mb-2">
    <router-link :to="{ name: 'channel', params: { id: props.channel._id }}">
      <h2 class="text-xl font-semibold">{{ props.channel.title }}</h2>
    </router-link>
    <p>{{ props.channel.description }}</p>
  </li>
</template>

<script setup lang="ts">
import { IChannel } from '@/interfaces/channel'

interface Props {
  channel: IChannel;
}

const props = defineProps<Props>()
</script>
