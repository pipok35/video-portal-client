import { defineStore } from 'pinia'
import { axios } from '@/axiosConfig'
import { IFile } from '@/interfaces/file'

export const useFilesStore = defineStore('files', {
  state: () => ({
    files: [] as IFile[]
  }),
  actions: {
    async upload (formData: FormData, type: string): Promise<IFile> {
      const response = await axios.post('/files/upload', formData, {
        params: {
          type
        }
      })

      return response.data
    },
    async download (fileId: string) {
      const response = await axios.get(`/files/${fileId}/download`)

      return response.data
    }
  }
})
