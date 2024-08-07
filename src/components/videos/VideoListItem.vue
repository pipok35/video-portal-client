<template>
  <BaseCard>
    <router-link :to="{ name: 'video', params: { id: props.video._id }}" class="flex flex-col w-full h-full gap-2">
      <img :src="previewUrl" class="grow rounded object-cover" />
      <div class="text-xl font-bold">{{ props.video.title }}</div>
      <BaseButton>Смотреть</BaseButton>
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
