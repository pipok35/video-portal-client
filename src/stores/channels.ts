import { defineStore } from 'pinia'
import { axios } from '@/axiosConfig'
import { IChannel } from '@/interfaces/channel'

export const useChannelStore = defineStore('channel', {
  state: () => ({
    channels: [] as IChannel[]
  }),
  actions: {
    async fetchChannels () {
      const response = await axios.get('/channels')
      this.channels = response.data
    },
    async fetchChannel (id: string): Promise <IChannel> {
      const response = await axios.get(`/channels/${id}`)
      return response.data
    },
    async createChannel (title: string, description: string) {
      return await axios.post('/channels', { title, description })
    },
    async subscribeToChannel (channelId: string) {
      await axios.post(`/channels/${channelId}/subscribe`, {})
    },
    async unsubscribeFromChannel (channelId: string) {
      await axios.post(`/channels/${channelId}/unsubscribe`, {})
    }
  }
})
