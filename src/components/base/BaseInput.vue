<template>
  <div class="base-input" :class="[props.size]">
    <input v-model="model" :type="props.type" :placeholder="props.placeholder" class="input" />
  </div>
</template>

<script lang="ts" setup>

interface Props {
  type?: string
  placeholder?: string
  size?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  size: 'medium'
})
const model = defineModel<string, number>()
</script>

<style lang="less" scoped>
.base-input {
  @apply
    flex items-stretch justify-between
    w-full
    bg-base
    border border-base-hover rounded
    overflow-hidden;

  &:hover {
    @apply border-gray-900;
  }

  &.small {
    @apply text-xs;

    > .input {
      @apply py-2 text-xs;
    }
  }
  &.medium {
    @apply text-sm;

    > .input {
      @apply ~"py-2.5" text-sm;
    }
  }
  &.large {
    > .input {
      @apply py-3;
    }
  }

  > .input {
    @apply w-full px-4 bg-transparent outline-none;
  }
}
</style>
