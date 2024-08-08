import { defineStore } from 'pinia'
import { axios } from '@/axiosConfig'
import { IUser } from '@/interfaces/user'
import { UpdateUserDto } from '@/dto/update-user.dto'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as IUser | null,
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

        this.user = response.data as IUser
      }
    },
    async update (id: string, updateUserDto: UpdateUserDto) {
      await axios.post(`/users/${id}`, { ...updateUserDto })
      await this.fetchUser()
    },
    async updateAvatar (id: string, avatarId: string) {
      await axios.patch(`/users/${id}/avatar`, { avatarId })
      await this.fetchUser()
    },
    async cleanHistory (id: string) {
      await axios.patch(`/users/${id}/cleanHistory`)
      await this.fetchUser()
    },
    logout () {
      this.token = ''
      this.user = null
      localStorage.removeItem('token')
    }
  }
})
