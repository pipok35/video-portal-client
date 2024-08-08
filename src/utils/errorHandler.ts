import { AxiosError } from 'axios'
import { useNotificationStore } from '@/stores/notification'

export function handleError (error: unknown) {
  const notificationStore = useNotificationStore()

  if (error instanceof AxiosError) {
    const message = error.response?.data?.message || 'An error occurred'
    notificationStore.addNotification({ type: 'error', message })
  } else {
    notificationStore.addNotification({ type: 'error', message: 'An unexpected error occurred' })
  }
}
