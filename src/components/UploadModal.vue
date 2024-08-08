<template>
  <BaseModal title="Загрузить файл" width="400px" @close="emit('close')">
    <BaseFileUpload :multiple="multiple" @files-added="handleSelect" />
  </BaseModal>
</template>

<script setup lang="ts">
import { useFilesStore } from '@/stores/files'

const filesStore = useFilesStore()
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
      const file = await filesStore.upload(formData, type)

      emit('upload', file)
      if (!props.multiple) {
        emit('close')
      }
    } catch (error) {
      console.error(error)
    }
  }
}

const handleSelect = async (files: File[]) => {
  for (const file of files) {
    await uploadFile(file, props.type)
  }
}

</script>
