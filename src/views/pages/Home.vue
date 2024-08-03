<template>
  <div class="p-4">
    <div v-if="isLoading">Загрука...</div>
    <div v-else-if="videos.length === 0">Нет видео</div>
    <div v-else>
      <h2 class="text-xl font-semibold mb-2">Видео:</h2>
      <ul>
        <li v-for="video in videos" :key="video._id" class="mb-2">
          <router-link :to="{ name: 'video', params: { id: video._id }}" class="text-blue-500">{{ video.title }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useVideoStore } from '@/stores/videos'
import { Video } from '@/interfaces/video.interface'

const isLoading = ref(false)
const videos = ref<Video[]>([])
const videoStore = useVideoStore()

onMounted(async () => {
  isLoading.value = true

  await videoStore.fetchVideos()
  videos.value = videoStore.videos

  isLoading.value = false
})
</script>
