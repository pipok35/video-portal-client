import { defineStore } from 'pinia'
import { axios } from '@/axiosConfig'
import { Video } from '@/interfaces/video.interface'

export const useFilesStore = defineStore('files', {
  state: () => ({
    files: [] as Video[]
  }),
  actions: {
    async upload (formData: FormData): Promise<{ name: string; url: string }> {
      const response = await axios.post('/files/upload', formData)

      return response.data
    }
  }
})
