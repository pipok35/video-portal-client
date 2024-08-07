<template>
  <div class=" bg-background shadow rounded-2xl flex flex-col gap-4 p-4">
    <div v-if="props.title" class="font-bold text-2xl">
      {{ props.title }}
    </div>
    <div class="grow">
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
