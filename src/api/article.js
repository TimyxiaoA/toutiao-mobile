/**
 * 文章相关的请求模块
 */
import request from '@/utils/request'

/* 获取此频道新闻推荐 */
export const getAticlesById = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}

/* 获取新闻文章详情 */
export const getAticleInfo = articleId => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${articleId}`
  })
}

// 取消收藏文章
export const deleteCollect = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${target}`
  })
}

// 收藏文章
export const addCollect = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/collections',
    data: {
      target: target.toString()
    }
  })
}

// 取消文章点赞
export const deleteLike = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${target}`
  })
}

// 文章点赞
export const addLike = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    data: {
      target: target.toString()
    }
  })
}
