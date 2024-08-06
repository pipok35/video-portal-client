<template>
  <BaseModal title="Загрузить видео" width="400px">
    <form @submit.prevent="create">
      <div class="flex flex-col gap-2">
        <span>Название</span>
        <BaseInput v-model="title" type="text" placeholder="Название" />
        <span>Описание</span>
        <BaseTextarea v-model="description" type="text" placeholder="Описание" />
        <BaseFileUpload multiple @files-added="handleSelect" />
        <BaseButton>Загрузить</BaseButton>
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
let videoFile: IFile
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
      file: videoFile._id
    })

    router.push({ name: 'video', params: { id } })
  } catch (error) {
    console.error(error)
  }
}
</script>
