<template>
  <UploadVideoModal v-if="isShowUploadVideoModal" width="400px" @close="isShowUploadVideoModal = false" />
  <CreateChannelModal v-if="isShowCreateChannelModal" width="400px" @close="isShowCreateChannelModal = false" />
  <div class="grid grid-cols-12 grid-rows-2 h-full gap-2 p-4">
    <div class="col-span-2 row-span-2">
      <BaseCard>
        <BaseButton color="inherit" size="large"><router-link :to="{ name: 'videos' }">Мои видео</router-link></BaseButton>
        <BaseButton color="inherit" size="large"><router-link :to="{ name: 'channels' }">Мои каналы</router-link></BaseButton>
        <BaseButton color="inherit" size="large" @click="isShowUploadVideoModal = true">Загрузить видео</BaseButton>
        <BaseButton color="inherit" size="large" @click="isShowCreateChannelModal = true">Создать канал</BaseButton>
      </BaseCard>
    </div>
    <div class="grid gap-2 col-span-10">
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
