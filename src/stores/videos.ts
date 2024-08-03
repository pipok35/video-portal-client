import { defineStore } from 'pinia'
import { axios } from '@/axiosConfig'
import { Video } from '@/interfaces/video'
import { CreateVideDto } from '@/dto/create-video'

export const useVideoStore = defineStore('video', {
  state: () => ({
    videos: [] as Video[]
  }),
  actions: {
    async fetchVideos () {
      const response = await axios.get('/videos')
      this.videos = response.data as Video[]
    },
    async fetchVideo (id: string): Promise<Video> {
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
