/**
 * 搜索相关的请求接口模块
 */
import request from '@/utils/request.js'

/* 获取联想建议 */
export const getSearchSuggestion = q => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: { q }
  })
}
