import { defineStore } from 'pinia'
import { axios } from '@/axiosConfig'
import { Channel } from '@/interfaces/channel.interface'

export const useChannelStore = defineStore('channel', {
  state: () => ({
    channels: [] as Channel[]
  }),
  actions: {
    async fetchChannels () {
      const response = await axios.get('/channels')
      this.channels = response.data
    },
    async fetchChannel (id: string): Promise <Channel> {
      const response = await axios.get(`/channels/${id}`)
      return response.data
    },
    async createChannel (title: string, description: string) {
      await axios.post('/channels', { title, description })
      await this.fetchChannels()
    },
    async subscribeToChannel (channelId: string) {
      await axios.post(`/channels/${channelId}/subscribe`, {})
      await this.fetchChannels()
    },
    async unsubscribeFromChannel (channelId: string) {
      await axios.post(`/channels/${channelId}/unsubscribe`, {})
      await this.fetchChannels()
    }
  }
})
