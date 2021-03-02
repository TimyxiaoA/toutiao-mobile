/**
 * 频道相关的请求接口模块
 */
import request from '@/utils/request.js'

/* 获取所有频道 */
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}

/*  删除指定用户频道 */
export const removeChannelById = id => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${id}`
  })
}

/* 添加用户指定频道 */
export const addChannelById = channels => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data: { channels: [channels] }
  })
}
