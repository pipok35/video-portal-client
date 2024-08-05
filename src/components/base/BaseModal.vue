<template>
  <div class="fixed w-full h-full bg-neutral-900 bg-opacity-30 z-10 flex flex-col justify-center items-center">
    <div class="relative shadow bg-white" :style="{ 'min-width': props.width }">
      <div class="flex p-4 border-b justify-between">
        <div class="text-xl font-bold">{{ props.title }}</div>
        <div class="controls">
          <button class="text-gray-500 hover:text-gray-700" @click="emit('close')"><font-awesome-icon icon="times" /></button>
        </div>
      </div>
      <div class="p-4">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

interface Props {
  width: number
  title: string
}

const props = defineProps<Props>()
const emit = defineEmits(['close'])

</script>
