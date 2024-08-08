<template>
  <div v-if="notifications.length" class="fixed bottom-0 right-0 m-4">
    <div v-for="(notification, index) in notifications" :key="index" class="mb-2">
      <div :class="`bg-${notification.type}-200 border-${notification.type}-400 text-${notification.type}-700 px-4 py-3 rounded relative`" role="alert">
        <span class="block sm:inline">{{ notification.message }}</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3" @click="removeNotification(index)">
          <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M14.348 5.652a1 1 0 10-1.414-1.414L10 7.172 7.065 4.238a1 1 0 10-1.414 1.414L8.828 10l-3.177 3.177a1 1 0 101.414 1.414L10 12.828l3.177 3.177a1 1 0 001.414-1.414L11.172 10l3.176-3.177z" /></svg>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useNotificationStore } from '@/stores/notification'

const notificationStore = useNotificationStore()
const notifications = computed(() => notificationStore.notifications)

function removeNotification (index: number) {
  notificationStore.removeNotification(index)
}
</script>
