<template>
  <BaseModal title="Создать канал" width="400px">
    <form @submit.prevent="createChannel">
      <div class="flex flex-col gap-2">
        <span class="block text-gray-700">Название</span>
        <BaseInput v-model="title" type="text" />
        <label class="block text-gray-700">Описание</label>
        <textarea v-model="description" class="border p-2 w-full"></textarea>
        <BaseButton>Создать</BaseButton>
      </div>
    </form>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useChannelStore } from '@/stores/channels'
import { useRouter } from 'vue-router'

const title = ref('')
const description = ref('')
const channelStore = useChannelStore()
const router = useRouter()

const createChannel = async () => {
  await channelStore.createChannel(title.value, description.value)
  router.push({ name: 'channels' })
}
</script>
