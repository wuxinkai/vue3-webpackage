# my-admin

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### css样式js通用变量
#### 定义变量 src\styles\variables.scss
```
//定义变量
$menuText: #bfcbd9;

//导出变量
:export {
  menuText: $menuText;
  menuActiveText: $menuActiveText;
}

```
#### store变量 src\store\modules\theme.js
```
import variables from '@/styles/variables.module.scss'

export default {
  namespaced: true,
  state: () => ({
    variables
  }),
}
```
#### getters导出变量src\store\getters.js
```
const getters = {
  cssVar: (state) => {
    return {
      ...state.theme.variables,
    
    }
  },
}
export default getters

```
#### store中引入依赖 index src\store\index.js
```
import { createStore } from 'vuex'
import getters from './getters'
import theme from './modules/theme'
export default createStore({
  getters,
  modules: {
    theme
  }
})

```

#### 页面应用变量
```
<template>
    <sidebar id="guide-sidebar" class="sidebar-container" :style="{ backgroundColor: $store.getters.cssVar.menuBg  }" />
</template>
```
### css使用定义的变量
```
遇到css不兼容
/deep/ xxx修改为&:deep


<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.module.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  widows: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width #{$sideBarDuration};
}
.hideSidebar .fixed-header {
  width: calc(100% - #{$hideSideBarWidth});
}
</style>

```
### css文件使用
```
variables.module.scss //定义常量
sidebar.scss //设置菜单
mixin.scss //定义通用样式
```
### js定义变量在css中使用
```
<script>
let logoHeight = 44
</script>
<style lang="scss" scoped>
.logo-container {
  height: v-bind(logoHeight) + 'px';
  padding: 10px 0 22px 0;
```

### token失效
```
```
### filter和 find 进行去重
```
 let data = routes.filter((route) => { return !childrenRoutes.find((childrenRoute) => {
      return childrenRoute.path === route.path
    })
  })
```

### 公有路由和私有路由
```
/**
 * 私有路由表
 */
export const privateRoutes = []

/**
 * 公开路由表
 */
let publicRoutes = []
//私有和共用全部插入到页面
const router = createRouter({
  history: createWebHistory(),
  routes: [...publicRoutes, ...privateRoutes]
})
```
# 解决path无法获取的问题
```
npm install -D path-browserify

//vue.config.js这部分加上 path: require.resolve("path-browserify") 代码即可
configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: defaultSettings.title,
    resolve: {
      alias: {
        path: require.resolve("path-browserify"),
      },
    },
  },
```
# 主题生成
```
```
# 页面搜索
- 根据内容对所有页面进行搜索
- 以select形式展示检索出的页面
- 通过检索页面可快速进入对应页面
```
```
# 分配角色
- 超级管理员的角色是不能发生变化的
- 管理员也不能随便发生变化
- 
```

```
# 全局属性
src\main.js 中定义全局属性
```
app.config.globalProperties.$quanjushuxing = 666666
app.config.globalProperties.$quanjuFn = function(d) {
  console.log(d)
}
```
在项目中使用全局属性
```
//引入插件
import { getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
//属性
console.log(proxy?.$quanjushuxing)
//函数
let newda = proxy?.$quanjuFn(777)
console.log(newda)

```
# 开源插件 看她是什么协议的

# tailwindcss 学习
1安装插件
```
 cnpm install tailwindcss -D
 cnpm install postcss -D 
 cnpm install autoprefixer -D
```
2 创建postcss.config.js与tailwind.config.js文件
```
npx tailwind init -p

```
3 在根路径 tailwind.config.js下
```
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
4 在src\styles\index.scss 输入
```
//tailwind 基础组件
@tailwind base;
@tailwind components;
@tailwind utilities;
```

5 在min.js引入
```
import './styles/index.scss'
```
6 在项目中使用  bg-red-900
```
  <h3 class="title bg-red-900">用户登录</h3>
```
7如果报错就下载
```
npm i -D sass @1.45.0
```
# vive 通用组件
全局组件存放处\my-admin\src\libs

```
// import { defineAsyncComponent} from 'vue'

import popup from './popup/index.vue'
export default {
  install(app) {
    //获取当前文件夹下所有文件夹中的 index.vue
    app.component('pro-popup', popup)
    // const components = import.meta.glob('./*/index.vue')

    //2. 遍历获取到的组件模块

    //3. 利用app.component 进行注册
    // for (cosnt[fullPath, fn] of Object.entries(components)) {
    //   const componentName = `m-${fullPath.replace('./', '').split('/')[0]}`
    //   app.component(componentName, defineAsyncComponent(fn) )

    // }
  }
}


```
### import.meta.globEager 和import.meta.glob 区别
```
//用于组件
// const components = import.meta.glob('./*/index.vue')

 //用于指令  指令你不需要异步方法
  const globEager = import.meta.glob.globEager('./*/index.vue')
```

#  popover 全局组件
- 指定所有可选位置的常量。生成enum
- 通过prop控制指定位置
- 获取元素dom 创建 读取元素的指定方法
- 生成气泡
- 防抖函数，延迟关闭弹窗
```
```

# 主题替换 dark
- 主题替换原理：通过类名改变，进行主题替换 
``` 


```
# 通过环境变量查找node
```
#!/usr/bin/env bash
```  

# 什么是cs架构什么是bs架构
```
client-server 这种是一定要安装到客户端才能用的软件  手机app都是cs架构
borwser-server 只需要浏览器才可以访问就是b/s架构
```
# 测试
- 功能测试：业务逻辑
- 界面测试：ui
- 安全测试： 攻击 代码，漏洞
- 性能测试： 并发
- 兼容性：测试
- 回归测试：修好一个bug 改出3个bug，需要从新测试
- 冒烟测试：硬件测试