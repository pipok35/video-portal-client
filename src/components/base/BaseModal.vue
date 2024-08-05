<template>
  <div class="h-full flex justify-center items-center" :style="{ 'max-width': width }">
    <div>
      Модалка
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

interface Props {
  width: number;
}

const props = defineProps<Props>()
const emit = defineEmits(['files-added'])

</script>
