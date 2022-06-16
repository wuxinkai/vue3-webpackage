import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//注册全局组件
import components from './libs/index'

import installElementPlus from './plugins/element'



// 导入 svgIcon
import installIcons from '@/icons'

// 导入全局样式
import './styles/index.scss'
// 导入 svgIcon

// 路由守卫
import './permission'

// filter

import useTheree from './utils/theme'

const app = createApp(App)
installElementPlus(app)
installIcons(app)
useTheree()
//设置全局属性
import installFilter from '@/filters'
installFilter(app)
app.config.globalProperties.$quanjushuxing = 666666
app.config.globalProperties.$quanjuFn = function (d) {
  return `返回全局参数参数:${d}`
}

app.use(components)
app.use(store).use(router).mount('#app')

// 和vue2的区别
/*
（1）通过按需引入createApp 来构建vue实例
（2）通过vue的use来挂载插件
（3）没有了vue构造方法，无法再挂载原型
*/

// 模板
/*
（1）支持多个根标签
*/

// store
/*
通过vue导入createStore方法来构建store实例
无法通过Vue.use进行挂载
*/

// router
/*
通过vue导入createRouter方法来构建Router实例
通过按需导入
无法通过Vue.use进行挂载
*/

// vite
/*
依赖于es module 就导致无法直接对commonJS的模块化方式进行支持,要想支持必须采用 依赖预构建的方式支持
*/
