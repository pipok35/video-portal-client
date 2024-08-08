import { defineStore } from 'pinia'

interface Notification {
  type: 'success' | 'error' | 'info';
  message: string;
}

interface NotificationState {
  notifications: Notification[];
}

export const useNotificationStore = defineStore('notification', {
  state: (): NotificationState => ({
    notifications: []
  }),
  actions: {
    addNotification (notification: Notification) {
      this.notifications.push(notification)
    },
    removeNotification (index: number) {
      this.notifications.splice(index, 1)
    }
  }
})
