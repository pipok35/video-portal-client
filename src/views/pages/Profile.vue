<template>
  <CreateChannelModal v-if="showCreateChannelModal" width="400px" @close="showCreateChannelModal = false" />
  <UploadModal v-if="showUploadAvatarModal" type="avatars" width="400px" @upload="handleUploadAvatar" @close="showUploadAvatarModal = false" />
  <div class="flex gap-2 p-4 h-full">
    <BaseCard class="h-full min-w-80" title="Профиль">
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-4 items-center mb-4">
          <img :src="avatarUrl" class="rounded-full w-40 h-40">
          <div><BaseButton @click="showUploadAvatarModal = true">Загрузить аватарку</BaseButton></div>
        </div>
        <form v-if="user" class="flex flex-col gap-2" @submit.prevent="updateProfile">
          <span>E-mail</span>
          <BaseInput v-model="user.email" placeholder="E-mail" />
          <span>Имя пользователя</span>
          <BaseInput v-model="user.username" placeholder="Имя пользователя" />
          <div><BaseButton type="submit">Изменить</BaseButton></div>
        </form>
        <div class="flex flex-col gap-2">
          <div class="flex justify-between mb-2">
            <div class="text-2xl font-bold">Канал</div>
            <BaseButton size="small" @click="showCreateChannelModal = true">Добавить</BaseButton>
          </div>
          <BaseSelect v-model="channelStore.currentChannel._id" :options="userChannels" @option-selected="changeChannel"></BaseSelect>
          <BaseButton type="router-link" :to="{ name: 'channel', params: { id: channelStore.currentChannel._id } }">
            Перейти на канал
          </BaseButton>
        </div>
      </div>
    </BaseCard>
    <div class="grow flex flex-col gap-4">
      <div class="flex gap-2">
        <div class="font-bold pl-2 text-2xl">История просмотра</div>
        <BaseButton size="small" @click="cleanHistory">Очистить</BaseButton>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-2">
        <VideosList :videos="videoHistory" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/users'
import { useChannelStore } from '@/stores/channels'
import CreateChannelModal from '@/components/channels/CreateChannelModal.vue'
import { IUser } from '@/interfaces/user'
import VideosList from '@/components/videos/VideosList.vue'
import { IVideo } from '@/interfaces/video'
import { IFile } from '@/interfaces/file'
import { useApiUrl } from '@/useApiUrl'
import BaseButton from '@/components/base/BaseButton.vue'
import { useNotificationStore } from '@/stores/notification'
import { handleError } from '@/utils/errorHandler'

const userStore = useUserStore()
const channelStore = useChannelStore()
const showCreateChannelModal = ref<boolean>(false)
const showUploadAvatarModal = ref<boolean>(false)
const user = ref<IUser | null>(null)
const videoHistory = ref<IVideo[]>([])
const apiUrl = useApiUrl()
const notificationStore = useNotificationStore()
const userChannels = ref()

onMounted(async () => {
  loadHistory()
  loadChannels()
})

const loadChannels = async () => {
  try {
    await channelStore.fetchChannels()
    userChannels.value = channelStore.channels.map(channel => ({ value: channel._id, label: channel.title }))
  } catch (error) {
    handleError(error)
  }
}

const loadHistory = async () => {
  try {
    await userStore.fetchUser()
    if (userStore.user) {
      user.value = userStore.user
      videoHistory.value = userStore.user.videoHistory || []
    }
  } catch (error) {
    handleError(error)
  }
}

const changeChannel = async (channelId: string) => {
  try {
    const channel = await channelStore.fetchChannel(channelId)
    await channelStore.setChannel(channel)
  } catch (error) {
    handleError(error)
  }
}

const avatarUrl = computed(() => {
  return user.value?.avatarId ? `${apiUrl}/files/${user.value.avatarId}/download` : ''
})

const handleUploadAvatar = async (file: IFile) => {
  if (user.value) {
    try {
      const response = await userStore.updateAvatar(user.value._id, file._id)
      await userStore.fetchUser()
      user.value = userStore.user

      notificationStore.addNotification({ type: response.data.status, message: response.data.message })
    } catch (error) {
      handleError(error)
    }
  }
}

const updateProfile = async () => {
  if (user.value) {
    try {
      const response = await userStore.update(user.value._id, { ...user.value })
      await userStore.fetchUser()
      user.value = userStore.user

      notificationStore.addNotification({ type: response.data.status, message: response.data.message })
    } catch (error) {
      handleError(error)
    }
  }
}

const cleanHistory = async () => {
  if (!confirm('Вы действительно хотите очистить историю просмотра?')) {
    return
  }
  if (user.value) {
    try {
      const response = await userStore.cleanHistory(user.value._id)
      await userStore.fetchUser()
      videoHistory.value = userStore.user?.videoHistory || []

      notificationStore.addNotification({ type: response.data.status, message: response.data.message })
    } catch (error) {
      handleError(error)
    }
  }
}
</script>

<style lang="less">
.menu-item {
  @apply inline-flex items-center gap-2
    w-full
    font-medium leading-none
    cursor-pointer
    rounded-xl
    pl-2
    py-3
    text-xl;

  &:hover {
    @apply bg-base-hover;
  }
}
</style>
