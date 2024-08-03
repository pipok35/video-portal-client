<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">{{ video.title }}</h1>
    <p class="mb-4">{{ video.description }}</p>
    <video :src="videoUrl" controls class="w-full"></video>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useVideoStore } from '@/stores/videos'
import { useRoute } from 'vue-router'
import { useApiUrl } from '@/useApiUrl'

const apiUrl = useApiUrl()
const route = useRoute()
const videoStore = useVideoStore()
const video = ref<{title: string, description: string, url: string, filename: string}>({
  title: '',
  description: '',
  url: '',
  filename: ''
})

const videoUrl = computed(() => {
  return `${apiUrl}/files/download?url=${encodeURIComponent(video.value.url)}`
})

onMounted(async () => {
  video.value = await videoStore.fetchVideo(route.params.id as string)
})

</script>
