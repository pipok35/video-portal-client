<template>
  <div
    class="p-4 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center"
    @dragover.prevent="onDragOver"
    @drop.prevent="onDrop"
    @paste.prevent="onPaste"
  >
    <input ref="fileInput" type="file" class="hidden" :multiple="props.multiple" @change="onFileChange" />
    <BaseButton @click="onBrowseFiles">Выбрать файл</BaseButton>
    <p>Или перетащите файл сюда</p>
    <p class="mb-2">Или вставьте файл из буфера обмена</p>
    <p v-for="file in files" :key="file.name">{{ file.name }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

interface Props {
  multiple?: boolean;
}

const props = defineProps<Props>()
const files = ref<File[]>([])
const newFiles = ref<File[]>([])
const fileInput = ref<HTMLInputElement | null>(null)
const emit = defineEmits(['files-added'])

const onBrowseFiles = () => {
  fileInput.value?.click()
}

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    addFiles(Array.from(target.files))
  }
}

const onDragOver = (event: DragEvent) => {
  event.dataTransfer!.dropEffect = 'copy'
}

const onDrop = (event: DragEvent) => {
  if (event.dataTransfer?.files) {
    addFiles(Array.from(event.dataTransfer.files))
  }
}

const onPaste = (event: ClipboardEvent) => {
  if (event.clipboardData?.files) {
    addFiles(Array.from(event.clipboardData.files))
  }
}

const addFiles = (incomingFiles: File[]) => {
  if (props.multiple) {
    const existingFileNames = files.value.map(file => file.name)
    const filteredNewFiles = incomingFiles.filter(file => !existingFileNames.includes(file.name))
    files.value = [...files.value, ...filteredNewFiles]
    newFiles.value = filteredNewFiles
  } else {
    files.value = incomingFiles
    newFiles.value = incomingFiles
  }
}

const emitFiles = () => {
  emit('files-added', newFiles.value)
}

watch(files, emitFiles)
</script>
