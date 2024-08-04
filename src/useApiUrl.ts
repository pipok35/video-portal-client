import { ref } from 'vue'

const _apiUrl = ref(import.meta.env.VITE_API_URL)

export function useApiUrl () {
  return _apiUrl.value
}
