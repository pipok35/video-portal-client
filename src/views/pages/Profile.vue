<template>
  <UploadVideoModal v-if="showUploadVideoModal" width="400px" @close="showUploadVideoModal = false" />
  <CreateChannelModal v-if="showCreateChannelModal" width="400px" @close="showCreateChannelModal = false" />
  <UploadModal v-if="showUploadAvatarModal" type="avatars" width="400px" @upload="handleUploadAvatar" @close="showUploadAvatarModal = false" />
  <div class="flex gap-2 p-4">
    <div class="w-1/3">
      <BaseCard class="h-full">
        <div class="flex flex-col gap-4 items-center mb-4">
          <img :src="avatarUrl" class="rounded-full w-40 h-40">
          <div><BaseButton @click="showUploadAvatarModal = true">Загрузить аватарку</BaseButton></div>
        </div>
        <div class="menu-item">
          <router-link class="w-full" :to="{ name: 'videos' }">
            <v-icon name="md-ondemandvideo" scale="1.5" fill="#9c1314" />
            Мои видео
          </router-link>
        </div>
        <div class="menu-item">
          <router-link class="w-full" :to="{ name: 'channels' }">
            <v-icon name="hi-users" scale="1.5" fill="#9c1314" />
            Мои каналы
          </router-link>
        </div>
        <div class="menu-item" @click="showUploadVideoModal = true">
          <v-icon name="hi-solid-plus" scale="1.5" fill="#9c1314" />
          Загрузить видео
        </div>
        <div class="menu-item" @click="showCreateChannelModal = true">
          <v-icon name="md-create" scale="1.5" fill="#9c1314" />
          Создать канал
        </div>
      </BaseCard>
    </div>
    <div class="grow flex flex-col gap-2">
      <div>
        <BaseCard title="Профиль">
          <div class="grid grid-cols-3 gap-4">
            <form v-if="user" class="flex flex-col gap-2" @submit.prevent="updateProfile">
              <span>E-mail</span>
              <BaseInput v-model="user.email" placeholder="E-mail" />
              <span>Имя пользователя</span>
              <BaseInput v-model="user.username" placeholder="Имя пользователя" />
              <div><BaseButton type="submit">Изменить</BaseButton></div>
            </form>
            <div>
            </div>
          </div>
        </BaseCard>
      </div>
      <div class="flex justify-between">
        <div class="font-bold text-2xl p-2">История просмотра</div>
        <BaseButton color="red" @click="cleanHistory">Очистить историю</BaseButton>
      </div>
      <div>
        <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-2">
          <VideoListItem
            v-for="video in videoHistory"
            :key="video._id"
            :video="video"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/users'
import UploadVideoModal from '@/components/videos/UploadVideoModal.vue'
import CreateChannelModal from '@/components/channels/CreateChannelModal.vue'
import { IUser } from '@/interfaces/user'
import VideoListItem from '@/components/videos/VideoListItem.vue'
import { IVideo } from '@/interfaces/video'
import { IFile } from '@/interfaces/file'
import { useApiUrl } from '@/useApiUrl'
import BaseButton from '@/components/base/BaseButton.vue'

const userStore = useUserStore()
const showUploadVideoModal = ref<boolean>(false)
const showCreateChannelModal = ref<boolean>(false)
const showUploadAvatarModal = ref<boolean>(false)
const user = ref<IUser | null>(null)
const videoHistory = ref<IVideo[]>([])
const apiUrl = useApiUrl()

onMounted(async () => {
  await userStore.fetchUser()
  if (userStore.user) {
    user.value = userStore.user
    videoHistory.value = userStore.user.videoHistory || []
  }
})

const avatarUrl = computed(() => {
  return user.value?.avatarId ? `${apiUrl}/files/${user.value.avatarId}/download` : ''
})

const handleUploadAvatar = async (file: IFile) => {
  if (user.value) {
    await userStore.updateAvatar(user.value._id, file._id)
    user.value = userStore.user
  }
}

const updateProfile = async () => {
  if (user.value) {
    await userStore.update(user.value._id, { ...user.value })
    user.value = userStore.user
  }
}

const cleanHistory = async () => {
  if (!confirm('Вы действительно хотите очистить историю просмотра?')) {
    return
  }
  if (user.value) {
    try {
      await userStore.cleanHistory(user.value._id)
      videoHistory.value = userStore.user?.videoHistory || []
    } catch (error) {
      console.error(error)
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
