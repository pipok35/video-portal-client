<template>
  <div class="p-4">
    <div v-if="isLoading">Загрука...</div>
    <div v-else-if="videos.length === 0">Нет видео</div>
    <div v-else>
      <h2 class="text-3xl font-bold mb-4">Мои видео</h2>
      <VideosList :videos="videos" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useVideoStore } from '@/stores/videos'
import { useUserStore } from '@/stores/users'
import { IVideo } from '@/interfaces/video'
import VideosList from '@/components/videos/VideosList.vue'

const isLoading = ref(false)
const videos = ref<IVideo[]>([])
const videoStore = useVideoStore()
const userStore = useUserStore()

onMounted(async () => {
  isLoading.value = true

  await videoStore.fetchVideos({ conditions: { 'created.by': userStore.user?._id } })
  videos.value = videoStore.videos

  isLoading.value = false
})
</script>
