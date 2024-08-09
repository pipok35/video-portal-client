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
import { useNotificationStore } from '@/stores/notification'
import { handleError } from '@/utils/errorHandler'

const videoFile = ref<IFile>()
const previewFile = ref<IFile>()
const title = ref('')
const description = ref('')
const showUploadPreviewModal = ref<boolean>(false)
const showUploadVideoFileModal = ref<boolean>(false)
const videoStore = useVideoStore()
const notificationStore = useNotificationStore()
const emit = defineEmits(['close', 'upload'])

const create = async () => {
  try {
    const response = await videoStore.create({
      title: title.value,
      description: description.value,
      videoFile: videoFile.value ? videoFile.value._id : '',
      previewFile: previewFile.value ? previewFile.value._id : ''
    })

    notificationStore.addNotification({ type: response.data.status, message: response.data.message })

    emit('close')
    emit('upload')
  } catch (error) {
    handleError(error)
  }
}
</script>
