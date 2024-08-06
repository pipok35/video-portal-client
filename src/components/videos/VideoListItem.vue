<template>
  <div class="rounded">
    <BaseCard>
      <router-link class="flex flex-col min-h-60 min-w-60 gap-2" :to="{ name: 'video', params: { id: props.video._id }}">
        <div class="min-h-48 text-center bg-gray-800 p-4 rounded">
          <span class="text-white">Видосик</span>
        </div>
        <h2 class="text-xl font-semibold">{{ props.video.title }}</h2>
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
