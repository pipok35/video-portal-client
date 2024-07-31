import { defineStore } from 'pinia'
import axios from '../axiosConfig'

export const useUserStore = defineStore('user', {
  state: () => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user: null as any,
    token: localStorage.getItem('token') || ''
  }),
  actions: {
    async login (username: string, password: string) {
      const response = await axios.post('/auth/login', { username, password })
      this.token = response.data.access_token
      localStorage.setItem('token', this.token)
      await this.fetchUser()
    },
    async register (username: string, email: string, password: string) {
      await axios.post('/users/register', { username, email, password })
      await this.login(username, password)
    },
    async fetchUser () {
      if (this.token) {
        const response = await axios.get('/auth/me', {
          headers: { Authorization: `Bearer ${this.token}` }
        })

        this.user = response.data
      }
    },
    logout () {
      this.token = ''
      this.user = null
      localStorage.removeItem('token')
    }
  }
})
