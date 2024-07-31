<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Upload Video</h1>
    <form class="space-y-4" @submit.prevent="upload">
      <input v-model="title" type="text" placeholder="Title" class="border p-2 w-full" />
      <input v-model="description" type="text" placeholder="Description" class="border p-2 w-full" />
      <input v-model="url" type="text" placeholder="Video URL" class="border p-2 w-full" />
      <button type="submit" class="bg-blue-500 text-white p-2 rounded">Upload</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useVideoStore } from '../../stores/videoStore'

const title = ref('')
const description = ref('')
const url = ref('')
const videoStore = useVideoStore()

const upload = async () => {
  await videoStore.uploadVideo(title.value, description.value, url.value)
}
</script>
