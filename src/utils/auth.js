
import { setItemStorage, getItem } from '@/utils/storage'


// 超时时长(毫秒) 两小时
export const TOKEN_TIMEOUT_VALUE = 2 * 3600 * 1000


/**
 * 获取时间戳
 */

export function getTimeStamp() {
  return getItem('timeStamp')
}

/**
 * 设置时间戳
 */
export function setTimeStamp() {
  setItemStorage('timeStamp', Date.now())
}

/**
 * 是否超时, 对比当前时间和登录时间
 */

export function isCheckTimeout() {
  // 当前时间戳
  var currentTime = Date.now()
  // 缓存时间戳
  var timeStamp = getTimeStamp()
  console.log(currentTime - timeStamp , TOKEN_TIMEOUT_VALUE)
  return currentTime - timeStamp > TOKEN_TIMEOUT_VALUE
}
