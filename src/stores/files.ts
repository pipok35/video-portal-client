import { defineStore } from 'pinia'
import { axios } from '@/axiosConfig'
import { Video } from '@/interfaces/video'
import { FileResponse } from '@/interfaces/file-response'

export const useFilesStore = defineStore('files', {
  state: () => ({
    files: [] as Video[]
  }),
  actions: {
    async upload (formData: FormData, type: string): Promise<FileResponse> {
      const response = await axios.post('/files/upload', formData, {
        params: {
          type
        }
      })

      return response.data
    }
  }
})
