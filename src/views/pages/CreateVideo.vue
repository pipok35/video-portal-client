<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Загрузить видео</h1>
    <form class="space-y-4" @submit.prevent="create">
      <div class="flex flex-col gap-2">
        <input v-model="title" type="text" placeholder="Title" class="border p-2 w-full" />
        <input v-model="description" type="text" placeholder="Description" class="border p-2 w-full" />
        <BaseFileUpload multiple @files-added="handleSelect" />
      </div>
      <button type="submit" class="bg-blue-500 text-white p-2 rounded">Загрузить</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useVideoStore } from '@/stores/videos'
import { useFilesStore } from '@/stores/files'
import { useRouter } from 'vue-router'
import { FileResponse } from '@/interfaces/file-response'
import BaseFileUpload from '@/components/base/BaseFileUpload.vue'

const router = useRouter()
let videoFile: FileResponse
const title = ref('')
const description = ref('')
const videoStore = useVideoStore()
const filesStore = useFilesStore()

const uploadFile = async (file: File) => {
  if (file) {
    const formData = new FormData()
    formData.append('file', file)

    try {
      videoFile = await filesStore.upload(formData, 'videos')
    } catch (error) {
      console.error(error)
    }
  }
}

const handleSelect = (files: File[]) => {
  for (const file of files) {
    uploadFile(file)
  }
}

const create = async () => {
  try {
    const id = await videoStore.create({
      title: title.value,
      description: description.value,
      url: videoFile.url,
      filename: videoFile.name
    })

    router.push({ name: 'video', params: { id } })
  } catch (error) {
    console.error(error)
  }
}
</script>
