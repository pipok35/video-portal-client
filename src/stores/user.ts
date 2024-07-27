import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: null
  }),
  actions: {
    async register (username: string, password: string) {
      const response = await axios.post('http://localhost:3000/auth/register', { username, password })
      return response.data
    },
    async login (username: string, password: string) {
      const response = await axios.post('http://localhost:3000/auth/login', { username, password })
      this.token = response.data.access_token
      localStorage.setItem('token', this.token)
      this.user = await this.getProfile()
    },
    async getProfile () {
      const response = await axios.post('http://localhost:3000/auth/profile', {}, {
        headers: { Authorization: `Bearer ${this.token}` }
      })
      this.user = response.data
      return this.user
    },
    logout () {
      this.token = ''
      this.user = null
      localStorage.removeItem('token')
    }
  }
})
