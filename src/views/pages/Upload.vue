<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Загрузить видео</h1>
    <form class="space-y-4" @submit.prevent="upload">
      <div class="flex flex-col gap-2">
        <input v-model="title" type="text" placeholder="Title" class="border p-2 w-full" />
        <input v-model="description" type="text" placeholder="Description" class="border p-2 w-full" />
        <input type="file" @change="onFileChange" />
      </div>
      <button type="submit" class="bg-blue-500 text-white p-2 rounded">Загрузить</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useVideoStore } from '../../stores/videoStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const title = ref('')
const description = ref('')
const videoStore = useVideoStore()
let selectedFile: File | null = null

function onFileChange (event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    selectedFile = target.files[0]
  }
}

const upload = async () => {
  if (selectedFile) {
    const formData = new FormData()
    formData.append('file', selectedFile)
    formData.append('title', title.value)
    formData.append('description', description.value)

    try {
      const video = await videoStore.uploadVideo(formData)

      router.push({ name: 'video', params: { id: video?.id } })
    } catch (error) {
      console.error(error)
    }
  }
}
</script>
