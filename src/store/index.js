import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)
// 定义常量防止写错
const TOKEN_KEY = 'TOUTIAO_USER'
export default new Vuex.Store({
  state: {
    // user: null
    user: getItem(TOKEN_KEY),
    // user: JSON.parse(window.localStorage.getItem(TOKEN_KEY))
    cachePages: ['LayoutIndex']
  },
  mutations: {
    // 保存 token
    setUser(state, data) {
      state.user = data
      // 使用本地储存保存 token 持久化页面
      setItem(TOKEN_KEY, state.user)

      // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
    },
    // 添加缓存页面
    addCachePage(state, pageName) {
      if (!state.cachePages.includes(pageName)) {
        state.cachePages.push(pageName)
      }
    },
    // 移除缓存页面
    removeCachePage(state, pageName) {
      const idx = state.cachePages.indexOf(pageName)
      if (idx !== -1) {
        // console.log(this.state.cachePages === state.cachePages)
        state.cachePages.splice(idx, 1)
      }
    }
  },
  actions: {},
  modules: {}
})
