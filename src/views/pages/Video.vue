<template>
  <div class="grid md:grid-cols-[3fr_1fr] gap-6 w-full max-w-7xl mx-auto p-4">
    <div class="grid gap-4 h-full">
      <div class="rounded-xl overflow-hidden aspect-video">
        <video :src="videoUrl" controls></video>
      </div>
      <div class="grid gap-2 flex-1">
        <h1 class="text-2xl font-bold">Big Buck Bunny</h1>
        <p class="text-muted-foreground">
          Big Buck Bunny tells the story of a giant rabbit with a heart of gold. When one sunny day three rodents
          rudely harass him, something snaps... and the rabbit ain't no bunny anymore!
        </p>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <span class="rounded-full w-10 h-10 border"><img :src="avatarUrl"></span>
            <div>
              <div class="text-sm text-muted-foreground">Pipok</div>
              <div class="text-sm text-muted-foreground">1234 подписчиков</div>
            </div>
            <BaseButton color="red">Подписаться</BaseButton>
          </div>
          <div>
            <div class="text-sm text-muted-foreground">1.2M Лайков</div>
          </div>
        </div>
      </div>
      <div class="grid gap-4 flex-1">
        <h2 class="text-lg font-medium">Комментарии</h2>
        <div class="grid gap-4">
          <div class="flex items-start gap-4">
            <span class="relative flex shrink-0 overflow-hidden rounded-full w-10 h-10 border">
              <v-icon name="fa-user-circle" class="aspect-square h-full w-full" />
            </span>
            <div class="grid gap-1.5">
              <div class="flex items-center gap-2">
                <div class="font-semibold">@iamwillpursell</div>
                <div class="text-xs text-muted-foreground">5 months ago</div>
              </div>
              <div>
                I really love the ecosystem Vercel is creating. The way each component can be added and modified with
                ease really makes these tools attractive.
              </div>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <span class="relative flex shrink-0 overflow-hidden rounded-full w-10 h-10 border">
              <v-icon name="fa-user-circle" class="aspect-square h-full w-full" alt="@shadcn" />
            </span>
            <div class="grid gap-1.5">
              <div class="flex items-center gap-2">
                <div class="font-semibold">@HackSoft</div>
                <div class="text-xs text-muted-foreground">2 months ago</div>
              </div>
              <div>
                We are more than excited to leverage all the new stuff, building better products for our clients ✨
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="grid gap-4 h-full">
      <div class="grid gap-2">
        <div class="grid gap-4 overflow-y-auto max-h-svh pr-2">
          <VideoListItem
            v-for="recommendation in recommendations"
            :key="recommendation._id"
            :video="recommendation"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useVideoStore } from '@/stores/videos'
import { useUserStore } from '@/stores/users'
import { useRoute } from 'vue-router'
import { useApiUrl } from '@/useApiUrl'
import { IVideo } from '@/interfaces/video'
import VideoListItem from '@/components/videos/VideoListItem.vue'

const apiUrl = useApiUrl()
const route = useRoute()
const videoStore = useVideoStore()
const userStore = useUserStore()
const video = ref<IVideo | null>(null)
const isLoading = ref(false)
const recommendations = ref<IVideo[]>([])

onMounted(async () => {
  isLoading.value = true

  try {
    await videoStore.fetchVideos()
    recommendations.value = videoStore.videos
  } catch (error) {
    console.error(error)
  }

  isLoading.value = false
})

const videoUrl = computed(() => {
  return video.value ? `${apiUrl}/files/${video.value.videoFile}/download` : ''
})

const avatarUrl = computed(() => {
  return userStore.user?.avatarId ? `${apiUrl}/files/${userStore.user?.avatarId}/download` : ''
})

onMounted(async () => {
  video.value = await videoStore.fetchVideo(route.params.id as string)
  addToHistory(video.value._id)
})

const addToHistory = async (videoId: string) => {
  await videoStore.addToHistory(videoId)
}

</script>
