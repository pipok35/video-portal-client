<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">{{ video.title }}</h1>
    <p class="mb-4">{{ video.description }}</p>
    <video :src="`/uploads/${video.filename}`" controls class="w-full"></video>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useVideoStore } from '../../stores/videoStore'
import { useRoute } from 'vue-router'

const route = useRoute()
const videoStore = useVideoStore()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const video = ref({ filename: '', path: '', title: '', description: '' })

onMounted(async () => {
  video.value = await videoStore.fetchVideo(route.params.id as string)
})

</script>
