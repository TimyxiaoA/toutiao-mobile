/**
 * 封装 axios 请求模块 我们把每一个请求都封装成每个独立的功能函数，在需要的时候加载调用，这种做法更便于接口的管理和维护
 */
import axios from 'axios'
import store from '@/store/index.js'

// 处理大数字
import jsonBig from 'json-bigint'

const request = axios.create({
  // 接口的基准路径
  // baseURL: 'http://ttapi.research.itcast.cn/',

  transformResponse: [
    function(data) {
      try {
        // 如果转换成功则返回转换的数据结果
        return jsonBig.parse(data)
      } catch (err) {
        // 如果转换失败，则包装为统一数据格式并返回
        return data
      }
    }
  ]
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
