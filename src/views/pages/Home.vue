<template>
  <div class="p-4">
    <div v-if="isLoading" class="text-3xl font-bold mb-4">Загрука...</div>
    <div v-else-if="videos.length === 0" class="text-3xl font-bold mb-4">Нет видео</div>
    <div v-else>
      <h2 class="text-3xl font-bold mb-4">Рекомендации</h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-2">
        <VideoListItem
          v-for="video in videos"
          :key="video._id"
          :video="video"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useVideoStore } from '@/stores/videos'
import { IVideo } from '@/interfaces/video'
import VideoListItem from '@/components/videos/VideoListItem.vue'

const isLoading = ref(false)
const videos = ref<IVideo[]>([])
const videoStore = useVideoStore()

onMounted(async () => {
  isLoading.value = true

  try {
    await videoStore.fetchVideos()
    videos.value = videoStore.videos
  } catch (error) {
    console.error(error)
  }

  isLoading.value = false
})
</script>
