<template>
  <div class="bg-white shadow flex flex-col">
    <div v-if="props.title" class="p-4 border-b font-bold text-xl">
      {{ props.title }}
    </div>
    <div class="grow p-4">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>

interface Props {
  title?: string;
}

const props = defineProps<Props>()

</script>
