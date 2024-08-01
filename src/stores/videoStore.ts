import { defineStore } from 'pinia'
import axios from '../axiosConfig'

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
    async uploadVideo (title: string, description: string, url: string) {
      await axios.post('/videos', { title, description, url })
      await this.fetchVideos()
    }
  }
})
