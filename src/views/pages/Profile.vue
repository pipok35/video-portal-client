<template>
  <div class="grid grid-cols-12">
    <div class="col-span-2 flex flex-col">
      <router-link :to="{ name: 'videos' }" class="hover:underline">Мои Видео</router-link>
      <router-link :to="{ name: 'channels' }" class="hover:underline">Мои каналы</router-link>
      <router-link :to="{ name: 'createVideo' }" class="hover:underline">Загрузить видео</router-link>
      <router-link :to="{ name: 'createChannel' }" class="hover:underline">Создать канал</router-link>
    </div>
    <div>Main</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useUserStore } from '@/stores/users'
import BaseModal from '@/components/base/BaseModal.vue'

const userStore = useUserStore()

interface Props {
  multiple?: boolean;
}

const props = defineProps<Props>()
const emit = defineEmits(['files-added'])

</script>
