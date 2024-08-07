<template>
  <UploadVideoModal v-if="isShowUploadVideoModal" width="400px" @close="isShowUploadVideoModal = false" />
  <CreateChannelModal v-if="isShowCreateChannelModal" width="400px" @close="isShowCreateChannelModal = false" />
  <div class="grid grid-cols-12 grid-rows-2 h-full gap-2 p-4">
    <div class="col-span-3 row-span-2">
      <BaseCard>
        <div class="flex flex-col gap-4 items-center mb-4">
          <div class="bg-base rounded-full w-40 h-40"></div>
          <div><BaseButton>Загрузить аватарку</BaseButton></div>
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
        <div class="menu-item" @click="isShowUploadVideoModal = true">
          <v-icon name="hi-solid-plus" scale="1.5" fill="#9c1314" />
          Загрузить видео
        </div>
        <div class="menu-item" @click="isShowCreateChannelModal = true">
          <v-icon name="md-create" scale="1.5" fill="#9c1314" />
          Создать канал
        </div>
      </BaseCard>
    </div>
    <div class="grid gap-2 col-span-9">
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
      <div>
        <div class="font-bold text-2xl p-4">История просмотра</div>
        <VideosList v-if="videoHistory" :videos="videoHistory" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/users'
import UploadVideoModal from '@/components/videos/UploadVideoModal.vue'
import CreateChannelModal from '@/components/channels/CreateChannelModal.vue'
import { IUser } from '@/interfaces/user'
import VideosList from '@/components/videos/VideosList.vue'
import { IVideo } from '@/interfaces/video'

const userStore = useUserStore()
const isShowUploadVideoModal = ref<boolean>(false)
const isShowCreateChannelModal = ref<boolean>(false)
const user = ref<IUser>()
const videoHistory = ref<IVideo[]>([])

onMounted(async () => {
  await userStore.fetchUser()
  if (userStore.user) {
    user.value = userStore.user
    videoHistory.value = userStore.user.videoHistory
  }
})

const updateProfile = async () => {
  if (user.value) {
    await userStore.update(user.value._id, { username: user.value?.username, email: user.value?.email })
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
