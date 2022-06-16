import store from "@/store"
import { watch } from "vue"

export default () => {
  //1 当主题发生改变时， 或进入系统时 可以进行 html class 的配置

  watch(() => store.getters.themeType, (val) => {
    let themeClassName = ''
    switch (val) {
      case 'TH1':
        themeClassName="light"
        break;
        case 'TH2':
        themeClassName="dark"
        break;
        case 'TH3':
        themeClassName="light"
        break;
    }
    document.querySelector('html').className = themeClassName
  }, {
    //初始化执行
    immediate: true
  })


}
