<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Welcome to YouTube App</h1>
    <div v-if="isLoading">Загрука...</div>
    <div v-else-if="videos.length === 0">Нет видео</div>
    <div v-else>
      <h2 class="text-xl font-semibold mb-2">Видео:</h2>
      <ul>
        <li v-for="video in videos" :key="video._id" class="mb-2">
          <router-link :to="{ path: `/video/${video._id}` }" class="text-blue-500">{{ video.title }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useVideoStore } from '../../stores/videoStore'

interface Video {
  _id: string;
  title: string;
  description: string;
  ovnerId: string;
}

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
