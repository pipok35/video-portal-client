<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Welcome to YouTube App</h1>
    <div v-if="videos.length === 0">No videos available.</div>
    <div v-else>
      <h2 class="text-xl font-semibold mb-2">Videos:</h2>
      <ul>
        <li v-for="video in videos" :key="video._id" class="mb-2">
          <router-link :to="{ path: `/video/${video._id}` }" class="text-blue-500">{{ video.title }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useVideoStore } from '../../stores/videoStore'

const videoStore = useVideoStore()

onMounted(async () => {
  await videoStore.fetchVideos()
})

const videos = videoStore.videos
</script>
