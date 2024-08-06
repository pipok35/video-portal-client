<template>
  <div class=" bg-background shadow rounded-2xl flex flex-col h-full">
    <div v-if="props.title" class="p-4 font-bold text-xl">
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
