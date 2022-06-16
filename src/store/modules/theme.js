import { getItem, setItemStorage } from '@/utils/storage'
import variables from '@/styles/variables.module.scss'
export default {
  namespaced: true,
  state: () => ({
    variables,
    themeType: null,
  }),
  mutations: {
    /**
     * 设置主题色
     */
    setMainColor(state, newColor) {
      state.mainColor = newColor
      state.variables.menuBg = newColor  //为了实现 点击切换就变化，  用的这个办法，
      setItemStorage('mainColor', newColor)
    },
    //设置主题
    changeThemeType(state, newThree) {
      state.themeType = newThree
    }
  }
}
