import { defineStore } from 'pinia'
import axios from '../axiosConfig'

export const useChannelStore = defineStore('channel', {
  state: () => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    channels: [] as any[]
  }),
  actions: {
    async fetchChannels () {
      const response = await axios.get('http://localhost:3000/channels')
      this.channels = response.data
    },
    async fetchChannel (id: string) {
      const response = await axios.get(`http://localhost:3000/channels/${id}`)
      return response.data
    },
    async createChannel (name: string, description: string) {
      const token = localStorage.getItem('token')
      await axios.post('http://localhost:3000/channels', { name, description }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      await this.fetchChannels()
    },
    async subscribeToChannel (channelId: string) {
      const token = localStorage.getItem('token')
      await axios.post(`http://localhost:3000/channels/${channelId}/subscribe`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      await this.fetchChannels()
    },
    async unsubscribeFromChannel (channelId: string) {
      const token = localStorage.getItem('token')
      await axios.post(`http://localhost:3000/channels/${channelId}/unsubscribe`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      await this.fetchChannels()
    }
  }
})
