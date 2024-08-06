<template>
  <div class="flex flex-wrap gap-2">
    <VideoListItem
      v-for="video in props.videos"
      :key="video._id"
      :video="video"
    />
  </div>
</template>

<script setup lang="ts">
import { IVideo } from '@/interfaces/video'
import VideoListItem from '@/components/videos/VideoListItem.vue'

interface Props {
  videos: IVideo[];
}

const props = defineProps<Props>()
</script>
