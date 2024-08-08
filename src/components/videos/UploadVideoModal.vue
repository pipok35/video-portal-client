<template>
  <UploadModal v-if="showUploadVideoFileModal" type="videos" width="400px" @upload="(file: IFile) => videoFile = file" @close="showUploadVideoFileModal = false" />
  <UploadModal v-if="showUploadPreviewModal" type="previews" width="400px" @upload="(file: IFile) => previewFile = file" @close="showUploadPreviewModal = false" />
  <BaseModal title="Загрузить видео" width="400px" @close="emit('close')">
    <form @submit.prevent="create">
      <div class="flex flex-col gap-2">
        <span>Название</span>
        <BaseInput v-model="title" placeholder="Название" />
        <span>Описание</span>
        <BaseTextarea v-model="description" placeholder="Описание" />
        <span>Файл видео</span>
        <div v-if="videoFile">{{ videoFile.name }}</div>
        <BaseButton @click="showUploadVideoFileModal = true">Выбрать</BaseButton>
        <span>Файл превью</span>
        <div v-if="previewFile">{{ previewFile.name }}</div>
        <BaseButton @click="showUploadPreviewModal = true">Выбрать</BaseButton>
        <div class="ml-auto"><BaseButton @click="create">Загрузить</BaseButton></div>
      </div>
    </form>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useVideoStore } from '@/stores/videos'
import { IFile } from '@/interfaces/file'

const videoFile = ref<IFile>()
const previewFile = ref<IFile>()
const title = ref('')
const description = ref('')
const showUploadPreviewModal = ref<boolean>(false)
const showUploadVideoFileModal = ref<boolean>(false)
const videoStore = useVideoStore()
const emit = defineEmits(['close'])

const create = async () => {
  try {
    await videoStore.create({
      title: title.value,
      description: description.value,
      videoFile: videoFile.value ? videoFile.value._id : '',
      previewFile: previewFile.value ? previewFile.value._id : ''
    })

    emit('close')
  } catch (error) {
    console.error(error)
  }
}
</script>
