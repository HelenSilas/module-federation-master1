import { defineStore } from 'pinia'
import { UserInfo } from '@/types/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {} as UserInfo
  }),
  actions: {
    setUserInfo (userInfo: UserInfo) {
      this.userInfo = userInfo
    }
  }
})

export default useUserStore
