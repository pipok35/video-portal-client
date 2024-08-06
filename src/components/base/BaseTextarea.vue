<template>
  <div class="base-textarea">
    <textarea v-model="model" :placeholder="props.placeholder" class="textarea" />
  </div>
</template>

<script lang="ts" setup>
interface Props {
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {})
const model = defineModel<string>()
</script>

<style lang="less" scoped>
.base-textarea {
  @apply
    flex items-stretch justify-between
    w-full
    bg-base
    border border-base-hover rounded
    overflow-hidden;

  &:hover {
    @apply border-gray-900;
  }

  > .textarea {
    @apply w-full px-4 py-2 bg-transparent outline-none;
  }
}
</style>
