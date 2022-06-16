import axios from 'axios'
import { ElMessage } from 'element-plus'
import store from '@/store'
//token超时设置
import { isCheckTimeout } from './auth'
const service = axios.create({
  /*
imooc-admin\.env.production 设置的环境变量
imooc-admin\.env.development 设置的环境变量
*/
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 50000 //超时时间
})

// 请求拦截，判断是否有人员信息数据如果有人员信息数据就不去请求
service.interceptors.request.use((config) => {
  if (store.getters.token) {
    // 如果token存在 注入token
    // config.headers.Authorization = `Bearer ${store.getters.token}`
    if (isCheckTimeout()) {
      // 登出操作
      store.dispatch('user/logout')
      return Promise.reject(new Error('token 失效'))
    }
  }
  return  config
})
// 请求拦截器


service.interceptors.response.use((response) => {
  const { success, desc, data } = response.data
  // 要更具success的成功与否决定下面的操作
  if (success) {
    return data
  } else {
    // 业务错误
    ElMessage.error(desc) // 提示错误消息
    return Promise.reject(new Error(desc))
  }
}, (error) => {
  // TODO: 将来处理 token 超时问题
  if (error.response && error.response.data && error.response.data.code === 401) {
    // token超时
    store.dispatch('user/logout')
  }
  ElMessage.error(error.message) // 提示错误消息
  return Promise.reject(error)
}
)

export default service
