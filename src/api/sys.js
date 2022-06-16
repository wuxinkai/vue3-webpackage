import request from '@/utils/request'

/**
 * 登录
 */
export const login = (data) => {

  return request({
    url: '/login',
    method: 'POST',
    data
  })
}

/**
 * 获取用户信息
 */
export const getUserData = () => {
  return request({
    url: '/profile'
  })
}
