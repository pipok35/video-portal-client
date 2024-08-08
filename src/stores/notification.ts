import { defineStore } from 'pinia'

interface Notification {
  id: string
  type: 'success' | 'error' | 'info';
  message: string;
}

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: [] as Notification[]
  }),
  actions: {
    addNotification (notification: Notification) {
      notification.id = Date.now().toString()
      this.notifications.push(notification)

      setTimeout(() => {
        this.removeNotification(notification.id)
      }, 4000)
    },
    removeNotification (id: string) {
      this.notifications = this.notifications.filter(notification => notification.id !== id)
    }
  }
})
