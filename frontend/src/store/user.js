import { defineStore } from 'pinia'
import { login, getUserInfo, logout } from '@/api/auth'
import router from '@/router'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    userId: null,
    username: '',
    nickname: '',
    avatar: '',
    menus: [],
    permissions: []
  }),

  actions: {
    async login(userInfo) {
      const res = await login(userInfo)
      this.token = res.data.token
      this.userId = res.data.userId
      this.username = res.data.username
      this.nickname = res.data.nickname
      this.avatar = res.data.avatar
      localStorage.setItem('token', res.data.token)
      return res
    },

    async getUserInfo() {
      const res = await getUserInfo()
      this.userId = res.data.user.id
      this.username = res.data.user.username
      this.nickname = res.data.user.nickname
      this.avatar = res.data.user.avatar
      this.menus = res.data.menus
      this.permissions = res.data.permissions
      return res
    },

    async logout() {
      await logout()
      this.token = ''
      this.userId = null
      this.username = ''
      this.nickname = ''
      this.avatar = ''
      this.menus = []
      this.permissions = []
      localStorage.removeItem('token')
      router.push('/login')
    }
  }
})
