import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)
// 定义常量防止写错
const TOKEN_KEY = 'TOUTIAO_USER'
export default new Vuex.Store({
  state: {
    // user: null
    user: getItem(TOKEN_KEY)
    // user: JSON.parse(window.localStorage.getItem(TOKEN_KEY))
  },
  mutations: {
    // 保存 token
    setUser(state, data) {
      state.user = data
      // 使用本地储存保存 token 持久化页面
      setItem(TOKEN_KEY, state.user)
      // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
    }
  },
  actions: {},
  modules: {}
})
