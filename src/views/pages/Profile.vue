<template>
  <UploadVideoModal v-if="isShowUploadVideoModal" width="400px" title="Загрузить видео" @close="isShowUploadVideoModal = false" />
  <CreateChannelModal v-if="isShowCreateChannelModal" width="400px" title="Загрузить видео" @close="isShowCreateChannelModal = false" />
  <div class="grid grid-cols-12 gap-2 p-4">
    <div class="col-span-2">
      <BaseCard>
        <div class="flex flex-col gap-2">
          <router-link :to="{ name: 'videos' }" class="hover:underline">Мои видео</router-link>
          <router-link :to="{ name: 'channels' }" class="hover:underline">Мои каналы</router-link>
          <button class="text-left" @click="isShowUploadVideoModal = true">Загрузить видео</button>
          <button class="text-left" @click="isShowCreateChannelModal = true">Создать канал</button>
        </div>
      </BaseCard>
    </div>
    <div class="grid gap-2 col-span-10">
      <BaseCard title="Профиль">
        Профиль
      </BaseCard>
      <BaseCard title="История просмотра">
        История просмотра
      </BaseCard>
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
