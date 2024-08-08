<template>
  <BaseModal title="Загрузить файл" width="400px" @close="emit('close')">
    <BaseFileUpload :multiple="multiple" @files-added="handleSelect" />
  </BaseModal>
</template>

<script setup lang="ts">
import { useFilesStore } from '@/stores/files'
import { useNotificationStore } from '@/stores/notification'
import { handleError } from '@/utils/errorHandler'

const filesStore = useFilesStore()
const notificationStore = useNotificationStore()

interface Props {
  type: 'videos' | 'previews' | 'avatars'
  multiple?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['upload', 'close'])

const uploadFile = async (file: File, type: 'videos' | 'previews' | 'avatars') => {
  if (file) {
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await filesStore.upload(formData, type)
      notificationStore.addNotification({ type: response.data.status, message: response.data.message })

      emit('upload', response.data.createdFile)
      if (!props.multiple) {
        emit('close')
      }
    } catch (error) {
      handleError(error)
    }
  }
}

const handleSelect = async (files: File[]) => {
  for (const file of files) {
    await uploadFile(file, props.type)
  }
}

</script>
