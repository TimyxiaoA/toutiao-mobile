/**
 * 封装 axios 请求模块 我们把每一个请求都封装成每个独立的功能函数，在需要的时候加载调用，这种做法更便于接口的管理和维护
 */
import axios from 'axios'

const request = axios.create({
  // 接口的基准路径
  baseURL: 'http://ttapi.research.itcast.cn/'
})

export default request
