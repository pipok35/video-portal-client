<template>
  <BaseModal title="Загрузить видео" width="400px">
    <form @submit.prevent="create">
      <div class="flex flex-col gap-2">
        <span>Название</span>
        <BaseInput v-model="title" placeholder="Название" />
        <span>Описание</span>
        <BaseTextarea v-model="description" placeholder="Описание" />
        <span>Файл видео</span>
        <BaseFileUpload multiple @files-added="handleSelectVideo" />
        <span>Файл превью</span>
        <BaseFileUpload multiple @files-added="handleSelectPreview" />
        <BaseButton @click="create">Загрузить</BaseButton>
      </div>
    </form>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useVideoStore } from '@/stores/videos'
import { useFilesStore } from '@/stores/files'
import { useRouter } from 'vue-router'
import { IFile } from '@/interfaces/file'

const router = useRouter()
const videoFile = ref<IFile>()
const previewFile = ref<IFile>()
const title = ref('')
const description = ref('')
const videoStore = useVideoStore()
const filesStore = useFilesStore()

const uploadFile = async (file: File, type: 'videos' | 'previews') => {
  if (file) {
    const formData = new FormData()
    formData.append('file', file)

    try {
      return await filesStore.upload(formData, type)
    } catch (error) {
      console.error(error)
    }
  }
}

// const uploadPreviewFile = async (file: File) => {
//   if (file) {
//     const formData = new FormData()
//     formData.append('file', file)

//     try {
//       previewFile.value = await filesStore.upload(formData, 'previews')
//     } catch (error) {
//       console.error(error)
//     }
//   }
// }

const handleSelectPreview = async (files: File[]) => {
  for (const file of files) {
    previewFile.value = await uploadFile(file, 'previews')
  }
}

const handleSelectVideo = async (files: File[]) => {
  for (const file of files) {
    videoFile.value = await uploadFile(file, 'videos')
  }
}

const create = async () => {
  try {
    const id = await videoStore.create({
      title: title.value,
      description: description.value,
      videoFile: videoFile.value ? videoFile.value._id : '',
      previewFile: previewFile.value ? previewFile.value._id : ''
    })

    router.push({ name: 'video', params: { id } })
  } catch (error) {
    console.error(error)
  }
}
</script>
