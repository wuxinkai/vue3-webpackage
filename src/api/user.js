import request from '@/utils/request'

// 功能模块
export const feature = () => {
  return request({
    url: '/feature'
  })
}

// 章节模块
export const chapter = () => {
  return request({
    url: '/chapter'
  })
}
