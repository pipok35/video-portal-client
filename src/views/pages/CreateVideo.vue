<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Загрузить видео</h1>
    <form class="space-y-4" @submit.prevent="create">
      <div class="flex flex-col gap-2">
        <input v-model="title" type="text" placeholder="Title" class="border p-2 w-full" />
        <input v-model="description" type="text" placeholder="Description" class="border p-2 w-full" />
        <input type="file" @change="handleSelect" />
      </div>
      <button type="submit" class="bg-blue-500 text-white p-2 rounded">Загрузить</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useVideoStore } from '@/stores/videoStore'
import { useFilesStore } from '@/stores/filesStore'
import { useRouter } from 'vue-router'

const router = useRouter()
let video = {
  url: '',
  name: ''
}
const title = ref('')
const description = ref('')
const videoStore = useVideoStore()
const filesStore = useFilesStore()
let selectedFile: File | null = null

function handleSelect (event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    selectedFile = target.files[0]
    uploadFile(selectedFile)
  }
}

const uploadFile = async (file: File) => {
  if (file) {
    const formData = new FormData()
    formData.append('file', file)

    try {
      video = await filesStore.upload(formData)
    } catch (error) {
      console.error(error)
    }
  }
}

const create = async () => {
  try {
    const id = await videoStore.create({ url: video.url, filename: video.name, title: title.value, description: description.value })
    console.log(id)
    router.push({ name: 'video', params: { id } })
  } catch (error) {
    console.error(error)
  }
}
</script>
