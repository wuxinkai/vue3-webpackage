// import { defineAsyncComponent} from 'vue'

import popup from './popup/index.vue'
import popover from './popover/index.vue'
export default {
  install(app) {
    //获取当前文件夹下所有文件夹中的 index.vue
    app.component('pro-popup', popup)
    app.component('pro-popover', popover)
    //import.meta.glob 是异步方法 ，组件一般都用异步方法

    // const components = import.meta.glob('./*/index.vue')

   

    //2. 遍历获取到的组件模块


    //3. 利用app.component 进行注册
    // for (cosnt[fullPath, fn] of Object.entries(components)) {
    //   const componentName = `m-${fullPath.replace('./', '').split('/')[0]}`
    //   app.component(componentName, defineAsyncComponent(fn) )

    // }
  }
}

