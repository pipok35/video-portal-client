<template>
  <teleport to="body">
    <div class="base-modal-wrapper text-white">
      <div class="base-modal" :style="{ 'max-width': props.width }">
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
  </teleport>
</template>

<script lang="ts" setup>

interface Props {
  width: string
  title: string
}

const props = defineProps<Props>()
const emit = defineEmits(['close'])

</script>

<style lang="less">
.base-modal-wrapper {
  @apply
    fixed
    top-0 left-0
    w-full h-full
    bg-neutral-900/50
    z-40
    overflow-x-hidden
    overflow-y-auto;
}

.base-modal {
  @apply
    relative
    flex flex-col
    min-w-full md:min-w-min
    min-h-full md:min-h-min
    md:my-16 md:mx-auto
    md:rounded
    bg-background
    md:shadow-lg;
}
</style>
