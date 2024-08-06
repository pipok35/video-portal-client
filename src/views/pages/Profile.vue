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
      <div>
        <BaseCard title="Профиль">
          Профиль
        </BaseCard>
      </div>
      <div>
        <BaseCard title="История просмотра">
          История просмотра
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import UploadVideoModal from '@/components/videos/UploadVideoModal.vue'
import CreateChannelModal from '@/components/channels/CreateChannelModal.vue'

const isShowUploadVideoModal = ref(false)
const isShowCreateChannelModal = ref(false)

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
