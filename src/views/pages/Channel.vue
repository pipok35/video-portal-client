<template>
  <div class="flex flex-col items-center justify-center w-full">
    <div class="container px-4 py-8 sm:px-6 lg:px-8">
      <BaseCard class="mb-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="relative">
              <img
                alt="Channel Avatar"
                width="80"
                height="80"
                style="aspect-ratio: 80 / 80; object-fit: cover;"
                class="rounded-full"
              />
              <button class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-10 w-10 absolute bottom-0 right-0 p-1 bg-background rounded-full shadow">
                <v-icon name="fa-edit" />
              </button>
            </div>
            <div>
              <h1 class="text-2xl font-bold">{{ channel?.title }}</h1>
              <p class="text-muted-foreground">C{{ channel?.description }}</p>
            </div>
          </div>
          <BaseButton color="red" right-icon="hi-solid-plus">Добавить видео</BaseButton>
        </div>
      </BaseCard>
      <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
        <VideoListItem
          v-for="video in channelVideos"
          :key="video._id"
          :video="video"
          class="max-h-60"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useChannelStore } from '@/stores/channels'
import { useVideoStore } from '@/stores/videos'
import { IChannel } from '@/interfaces/channel'
import { IVideo } from '@/interfaces/video'
import VideoListItem from '@/components/videos/VideoListItem.vue'

const route = useRoute()
const channelStore = useChannelStore()
const videoStore = useVideoStore()
const channel = ref<IChannel | null>(null)
const channelVideos = ref<IVideo[]>([])

onMounted(async () => {
  const data = await channelStore.fetchChannel(route.params.id as string)
  channel.value = data

  try {
    await videoStore.fetchVideos()
    channelVideos.value = videoStore.videos
    console.log(channelVideos.value)
  } catch (error) {
    console.error(error)
  }
})
</script>
