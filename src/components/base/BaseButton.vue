<template>
  <component
    :is="component"
    class="button"
    :class="[props.color, props.size, props.disabled ? 'disabled': null, props.leftIcon ? 'left-icon' : null, props.rightIcon ? 'right-icon' : null]"
    :href="component === 'a' ? href : null"
    :target="component === 'a' && blank ? '_blank' : null"
    :to="component === 'router-link' ? to : null"
    :type="component === 'button' ? type : null"
    @click="emit('click')"
  >
    <v-icon v-if="props.leftIcon" :icon="props.leftIcon" class="mr-2" />
    <span>
      <slot></slot>
    </span>
    <v-icon v-if="props.rightIcon" :name="props.rightIcon" class="ml-2" />
  </component>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

interface Props {
  color?: string
  size?: string
  disabled?: boolean
  leftIcon?: string
  rightIcon?: string
  type?: string
  href?: string
  to?: string
  blank?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  color: 'base',
  disabled: false,
  size: 'medium',
  type: 'button',
  blank: false
})

const component = computed(() => {
  if (props.type === 'link') {
    return 'a'
  } else if (props.type === 'router-link') {
    return 'router-link'
  } else {
    return 'button'
  }
})

const emit = defineEmits(['click'])

</script>

<style lang="less" scoped>
.button {
  @apply
    w-full
    inline-flex justify-center items-center
    rounded
    outline-none
    font-medium leading-none
    cursor-pointer
    rounded-xl
    transition duration-100;

  &.small {
    @apply px-2 py-1 text-xs;

    &.left-icon {
      @apply pl-3;
    }
    &.right-icon {
      @apply pr-3;
    }
  }
  &.medium {
    @apply px-4 ~"py-2.5" text-sm;

    &.left-icon {
      @apply pl-5;
    }
    &.right-icon {
      @apply pr-5;
    }
  }
  &.large {
    @apply px-6 py-3 text-xl;

    &.left-icon {
      @apply pl-6;
    }
    &.right-icon {
      @apply pr-6;
    }
  }

  &.base {
    @apply bg-base hover:bg-base-hover text-white;

    &.disabled {
      @apply bg-neutral-50;
    }
  }
  &.red {
    @apply bg-red-500 hover:bg-red-400 text-white;

    &.disabled {
      @apply bg-red-200;
    }
  }
  &.muted {
    @apply bg-neutral-100 hover:bg-neutral-200 text-neutral-400 ;

    &.disabled {
      @apply bg-neutral-50;
    }
  }
  &.inherit {
    @apply bg-inherit hover:bg-neutral-700 text-white;

    &.disabled {
      @apply bg-neutral-400;
    }
  }
}
</style>
