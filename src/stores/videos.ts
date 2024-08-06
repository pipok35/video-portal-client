import { defineStore } from 'pinia'
import { axios } from '@/axiosConfig'
import { IVideo } from '@/interfaces/video'
import { CreateVideDto } from '@/dto/create-video'

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
    async create (data: CreateVideDto): Promise<string> {
      const response = await axios.post('/videos/create', data)
      await this.fetchVideos()

      return response.data
    }
  }
})
