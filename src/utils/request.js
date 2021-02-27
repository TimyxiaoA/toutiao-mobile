/**
 * 封装 axios 请求模块 我们把每一个请求都封装成每个独立的功能函数，在需要的时候加载调用，这种做法更便于接口的管理和维护
 */
import axios from 'axios'
import store from '@/store/index.js'

const request = axios.create({
  // 接口的基准路径
  baseURL: 'http://ttapi.research.itcast.cn/'
})

/* 请求拦截器 */
// Add a request interceptor
request.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

/* 响应拦截器 */

export default request
