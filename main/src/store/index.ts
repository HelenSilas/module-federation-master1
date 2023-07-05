import { defineStore } from 'pinia'
import { INormalizeSiteMapNodes } from '@/types'

export const mainStore = defineStore('main', {
  state: () => ({
    /**
       * 所有下级菜单节点
       */
    normalizeMenuNodes: {} as INormalizeSiteMapNodes
  }),

  getters: {},

  actions: {}
})

export default mainStore
