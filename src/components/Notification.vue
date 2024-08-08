<template>
  <div v-if="notifications.length" class="fixed top-16 right-0 m-4">
    <div v-for="(notification, index) in notifications" :key="index" class="mb-2">
      <div :class="classes(notification.type)">
        <v-icon name="bi-info-circle" />
        <div class="text-sm font-medium grow">{{ notification.message }}</div>
        <button type="button" :class="buttonClasses(notification.type)" @click="removeNotification(notification.id)">
          <v-icon name="ri-close-fill" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useNotificationStore } from '@/stores/notification'

const notificationStore = useNotificationStore()
const notifications = computed(() => notificationStore.notifications)

const classes = (type: string) => {
  return {
    'flex items-center gap-2 p-4 mb-4 rounded-lg': true,
    'text-green-800 bg-green-50 dark:bg-green-800 dark:text-green-400': type === 'success',
    'text-red-800 bg-red-50 dark:bg-red-800 dark:text-red-400': type === 'error',
    'text-blue-800 bg-blue-50 dark:bg-blue-800 dark:text-blue-400': type === 'info'
  }
}

const buttonClasses = (type: string) => {
  return {
    '-mx-1.5 -my-1.5 h-8 w-8': true,
    'dark:text-green-400': type === 'success',
    'dark:text-red-400': type === 'error',
    'dark:text-blue-400': type === 'info'
  }
}

function removeNotification (id: string) {
  notificationStore.removeNotification(id)
}
</script>
