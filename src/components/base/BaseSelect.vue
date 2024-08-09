<template>
  <div class="base-select">
    <select v-model="model" @change="handleChange">
      <option v-for="option in props.options" :key="option.value" :value="option.value" class="text-black">
        <span>{{ option.label }}</span>
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
interface Option {
  value: string | number;
  label: string;
}

const props = defineProps<{
  options: Option[]
}>()

const model = defineModel<string, number>()
const emit = defineEmits(['option-selected'])

const handleChange = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value
  emit('option-selected', value)
}
</script>

<style lang="less" scoped>
.base-select {
  @apply w-full
    flex items-stretch justify-between
    bg-base
    border border-base-hover rounded
    overflow-hidden
    p-2;

  &:hover {
    @apply border-gray-900;
  }

  > select {
    @apply w-full bg-transparent outline-none;
  }
}
</style>
