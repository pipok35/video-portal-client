import { defineStore } from 'pinia'
import { axios } from '@/axiosConfig'
import { IVideo } from '@/interfaces/video'
import { CreateVideDto } from '@/dto/create-video.dto'

export const useVideoStore = defineStore('video', {
  state: () => ({
    videos: [] as IVideo[]
  }),
  actions: {
    async fetchVideos (conditions?: object) {
      const response = await axios.get('/videos', {
        params: {
          ...conditions
        }
      })
      this.videos = response.data as IVideo[]
    },
    async fetchVideo (id: string): Promise<IVideo> {
      const response = await axios.get(`/videos/${id}`)
      return response.data
    },
    async create (data: CreateVideDto) {
      return await axios.post('/videos/create', data)
    },
    async addToHistory (videoId: string) {
      await axios.patch(`/videos/${videoId}/addToHistory`)
    }
  }
})
