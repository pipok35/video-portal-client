<template>
  <BaseModal title="Создать канал" width="400px">
    <form @submit.prevent="createChannel">
      <div class="flex flex-col gap-2">
        <span>Название</span>
        <BaseInput v-model="title" placeholder="Название" />
        <span>Описание</span>
        <BaseTextarea v-model="description" placeholder="Описание"></BaseTextarea>
        <BaseButton @click="createChannel">Создать</BaseButton>
      </div>
    </form>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useChannelStore } from '@/stores/channels'
import { useRouter } from 'vue-router'
import { handleError } from '@/utils/errorHandler'
import { useNotificationStore } from '@/stores/notification'

const title = ref('')
const description = ref('')
const channelStore = useChannelStore()
const router = useRouter()
const notificationStore = useNotificationStore()

const createChannel = async () => {
  try {
    const response = await channelStore.createChannel(title.value, description.value)
    notificationStore.addNotification({ type: response.data.status, message: response.data.message })

    router.push({ name: 'channels' })
  } catch (error) {
    handleError(error)
  }
}
</script>
