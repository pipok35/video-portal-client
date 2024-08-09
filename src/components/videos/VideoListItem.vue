<template>
  <BaseCard>
    <router-link :to="{ name: 'video', params: { id: props.video._id }}" class="flex flex-col items-start gap-4">
      <img :src="previewUrl" class="object-cover rounded-lg aspect-video" />
      <div class="text-sm">
        <div class="font-medium line-clamp-2">{{ video.title }}</div>
      </div>
    </router-link>
  </BaseCard>
</template>

<script setup lang="ts">
import { IVideo } from '@/interfaces/video'
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
