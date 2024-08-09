<template>
  <BaseCard class="flex flex-col gap-2 w-full">
    <router-link :to="{ name: 'video', params: { id: props.video._id }}" class="flex flex-col gap-2 h-full">
      <img :src="previewUrl" class="rounded grow" />
      <div class="text-xl font-bold">{{ props.video.title }}</div>
    </router-link>
  </BaseCard>
</template>

<script setup lang="ts">
import { IVideo } from '@/interfaces/video'
import BaseCard from '../base/BaseCard.vue'
import { computed } from 'vue'
import { useApiUrl } from '@/useApiUrl'

interface Props {
  video: IVideo;
}

const props = defineProps<Props>()
const apiUrl = useApiUrl()

const previewUrl = computed(() => {
  return props.video ? `${apiUrl}/files/${props.video.previewFile}/download` : ''
})
</script>
