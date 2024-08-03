<template>
  <div v-if="video" class="p-4">
    {{ videoUrl }}
    <h1 class="text-2xl font-bold mb-4">{{ video.title }}</h1>
    <p class="mb-4">{{ video.description }}</p>
    <video :src="videoUrl" controls class="w-full"></video>
  </div>
</template>

<script setup lang="ts">
import qs from 'qs'
import { ref, onMounted, computed } from 'vue'
import { useVideoStore } from '@/stores/videos'
import { useRoute } from 'vue-router'
import { useApiUrl } from '@/useApiUrl'
import { Video } from '@/interfaces/video'

const apiUrl = useApiUrl()
const route = useRoute()
const videoStore = useVideoStore()
const video = ref<Video | null>(null)

const videoUrl = computed(() => {
  return video.value ? `${apiUrl}/files/download?${qs.stringify({ url: video.value.url })}` : ''
})

onMounted(async () => {
  video.value = await videoStore.fetchVideo(route.params.id as string)
})

</script>
