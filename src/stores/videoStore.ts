import { defineStore } from 'pinia'
import { axios } from '../axiosConfig'

export const useVideoStore = defineStore('video', {
  state: () => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    videos: [] as any[]
  }),
  actions: {
    async fetchVideos () {
      const response = await axios.get('/videos')
      this.videos = response.data
    },
    async fetchVideo (id: string) {
      const response = await axios.get(`/videos/${id}`)
      return response.data
    },
    async uploadVideo (formData: FormData) {
      await axios.post('/videos/upload', formData)
      await this.fetchVideos()
    }
  }
})
