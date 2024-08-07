<template>
  <UploadVideoModal v-if="isShowUploadVideoModal" width="400px" @close="isShowUploadVideoModal = false" />
  <CreateChannelModal v-if="isShowCreateChannelModal" width="400px" @close="isShowCreateChannelModal = false" />
  <div class="grid grid-cols-12 grid-rows-2 h-full gap-2 p-4">
    <div class="col-span-3 row-span-2">
      <BaseCard>
        <div class="menu-item">
          <router-link :to="{ name: 'videos' }">
            <v-icon name="md-ondemandvideo" scale="1.5" fill="#9c1314" />
            Мои видео
          </router-link>
        </div>
        <div class="menu-item">
          <router-link :to="{ name: 'channels' }">
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
        <div class="grid grid-cols-2">
          <div>
            аватарка
          </div>
          <form v-if="user" class="flex flex-col gap-2" @submit.prevent="updateProfile">
            <span>E-mail</span>
            <BaseInput v-model="user.email" placeholder="E-mail" />
            <span>Имя пользователя</span>
            <BaseInput v-model="user.username" placeholder="Имя пользователя" />
            <div class="ml-auto"><BaseButton type="submit">Изменить</BaseButton></div>
          </form>
        </div>
      </BaseCard>
      <BaseCard title="История просмотра">
        История просмотра
      </BaseCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/users'
import UploadVideoModal from '@/components/videos/UploadVideoModal.vue'
import CreateChannelModal from '@/components/channels/CreateChannelModal.vue'
import { User } from '@/interfaces/user'

const userStore = useUserStore()
const isShowUploadVideoModal = ref(false)
const isShowCreateChannelModal = ref(false)
const user = ref<User>()

onMounted(async () => {
  await userStore.fetchUser()
  if (userStore.user) {
    user.value = userStore.user
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
    text-2xl;

  &:hover {
    @apply bg-base-hover;
  }
}
</style>
