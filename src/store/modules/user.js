import { login, getUserData } from '@/api/sys'
import md5 from 'md5'
import { getRandomWord } from '@/utils/route'
import { setItemStorage ,getItem,removeAllItem} from '@/utils/storage'
import { setTimeStamp} from '@/utils/auth'
import axios from 'axios'
import router from '@/router'
export default {
  namespaced: true,
  state: () => ({
    token: getItem('token') || '',
    userInfo: {},
  }),
  mutations: {
    // 设置token
    setToken(state, token) {
      state.token = token
      // 存储本地浏览器
      setItemStorage('token', token)
    },
    //设置人员信息
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
      state.userInfo.avatar = require('../../assets/images/userimg.png')

    }
  },
  actions: {
    //登录
    login(context, userInfo) {
      const { username, password } = userInfo
      // return new Promise((resolve, reject) => {
      //   login({username, password}).then((data) => {
      //     // 设置上面的setToken
      //       this.commit('user/setToken',getRandomWord(true, 2, 9))
      //       router.push('/')
      //       // 保存登录时间
      //       setTimeStamp()
      //       resolve()
      //     }).catch((err) => {
      //       reject(err)
      //     })
      // })



      return new Promise((resolve, reject) => {
        axios.post('https://www.fastmock.site/mock/9d12c14426b750d73d484c14876cc29f/vue3/login', { username, password }).then(value => {
          let res = value.data.data
          this.commit('user/setToken',res.token)
          setTimeStamp()
          router.push('/')
        })
      })

    },
    // 获取人员信息
    async getUserInfo(context) {
      const res = await getUserData()
      this.commit('user/setUserInfo', res)
      return res
    },
   //退出
    logout() {
      this.commit('user/setToken', '')
      this.commit('user/setUserInfo', {})
      removeAllItem()
      router.push('/login')
    }
  }
}
