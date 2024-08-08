<template>
  <div v-if="video" class="p-4">
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
import { IVideo } from '@/interfaces/video'
import { AxiosError } from 'axios'

const apiUrl = useApiUrl()
const route = useRoute()
const videoStore = useVideoStore()
const video = ref<IVideo | null>(null)

const videoUrl = computed(() => {
  return video.value ? `${apiUrl}/files/${video.value.videoFile}/download` : ''
})

onMounted(async () => {
  try {
    video.value = await videoStore.fetchVideo(route.params.id as string)
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.response?.data.message)
    }
  }

  if (video.value) {
    addToHistory(video.value._id)
  }
})

const addToHistory = async (videoId: string) => {
  try {
    await videoStore.addToHistory(videoId)
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.response?.data.message)
    }
  }
}

</script>
