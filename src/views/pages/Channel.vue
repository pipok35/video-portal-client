<template>
  <UploadVideoModal v-if="showUploadVideoModal" width="400px" @upload="loadVideos()" @close="showUploadVideoModal = false" />
  <UploadModal v-if="showUploadAvatarModal" type="avatars" width="400px" @upload="handleUploadAvatar" @close="showUploadAvatarModal = false" />
  <div class="flex flex-col items-center justify-center w-full">
    <div class="container px-4 py-8 sm:px-6 lg:px-8">
      <BaseCard class="mb-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="relative w-20 h-20">
              <img :src="avatarUrl" class="rounded-full h-full w-full" />
              <div class="inline-flex items-center justify-center border cursor-pointer font-medium h-8 w-8 absolute bottom-0 right-0 bg-background rounded-full" @click="showUploadAvatarModal = true">
                <v-icon name="fa-edit" class="pl-1" />
              </div>
            </div>
            <div>
              <h1 class="text-2xl font-bold">{{ channel?.title }}</h1>
              <p class="text-muted-foreground">C{{ channel?.description }}</p>
            </div>
          </div>
          <BaseButton color="red" right-icon="hi-solid-plus" @click="showUploadVideoModal = true">Добавить видео</BaseButton>
        </div>
      </BaseCard>
      <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
        <VideosList :videos="channelVideos" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useChannelStore } from '@/stores/channels'
import { useVideoStore } from '@/stores/videos'
import { IChannel } from '@/interfaces/channel'
import { IVideo } from '@/interfaces/video'
import { useApiUrl } from '@/useApiUrl'
import UploadVideoModal from '@/components/videos/UploadVideoModal.vue'
import { IFile } from '@/interfaces/file'
import { handleError } from '@/utils/errorHandler'
import { useNotificationStore } from '@/stores/notification'
import VideosList from '@/components/videos/VideosList.vue'

const route = useRoute()
const channelStore = useChannelStore()
const videoStore = useVideoStore()
const channel = ref<IChannel | null>(null)
const channelVideos = ref<IVideo[]>([])
const apiUrl = useApiUrl()
const showUploadVideoModal = ref<boolean>(false)
const showUploadAvatarModal = ref<boolean>(false)
const notificationStore = useNotificationStore()

onMounted(async () => {
  try {
    channel.value = await channelStore.fetchChannel(route.params.id as string)
  } catch (error) {
    handleError(error)
  }

  await loadVideos()
})

const avatarUrl = computed(() => {
  return channel.value?.avatarId ? `${apiUrl}/files/${channel.value.avatarId}/download` : ''
})

const loadVideos = async () => {
  try {
    await videoStore.fetchVideos({ channel: channel.value?._id })
    channelVideos.value = videoStore.videos
  } catch (error) {
    handleError(error)
  }
}

const handleUploadAvatar = async (file: IFile) => {
  if (channel.value) {
    try {
      const response = await channelStore.updateAvatar(channel.value._id, file._id)
      channel.value = await channelStore.fetchChannel(route.params.id as string)

      notificationStore.addNotification({ type: response.data.status, message: response.data.message })
    } catch (error) {
      handleError(error)
    }
  }
}
</script>
