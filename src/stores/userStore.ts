import { defineStore } from 'pinia'
import { axios } from '@/axiosConfig'
import { User } from '@/interfaces/user.interface'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    token: localStorage.getItem('token') || '' as string
  }),
  actions: {
    async login (email: string, password: string) {
      const response = await axios.post('/auth/login', { email, password })
      this.token = response.data.access_token
      localStorage.setItem('token', this.token)
      await this.fetchUser()
    },
    async register (username: string, email: string, password: string) {
      await axios.post('/users/register', { username, email, password })
      await this.login(email, password)
    },
    async fetchUser () {
      if (this.token) {
        const response = await axios.get('/auth/me')

        this.user = response.data as User
      }
    },
    logout () {
      this.token = ''
      this.user = null
      localStorage.removeItem('token')
    }
  }
})
