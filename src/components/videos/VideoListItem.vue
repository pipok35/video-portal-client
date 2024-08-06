<template>
  <div class="rounded">
    <BaseCard>
      <router-link
        class="flex flex-col min-h-60 min-w-60 gap-2"
        :to="{ name: 'video', params: { id: props.video._id }}"
      >
      </router-link>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { IVideo } from '@/interfaces/video'
import BaseCard from '../base/BaseCard.vue'

interface Props {
  video: IVideo;
}

const props = defineProps<Props>()
</script>
