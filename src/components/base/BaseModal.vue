<template>
  <div class="fixed w-full h-full bg-neutral-900 bg-opacity-30 z-10 flex flex-col justify-center items-center">
    <div class="relative shadow bg-background rounded-2xl" :style="{ 'min-width': props.width }">
      <div class="flex justify-between">
        <div class="text-xl font-bold p-4">{{ props.title }}</div>
        <div class="controls p-4">
          <v-icon class="cursor-pointer" name="ri-close-fill" scale="1.5" fill="white" inverse @click="emit('close')" />
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
  width: string
  title: string
}

const props = defineProps<Props>()
const emit = defineEmits(['close'])

</script>
