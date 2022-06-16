
import { setItemStorage ,getItem,removeAllItem} from '@/utils/storage'
const getters = {
  token: (state) => state.user.token,
  // 折叠按钮
  sidebarOpened: (state) => state.app.sidebarOpened,
  //查看是否有人员信息
  hasUserInfo: (state) => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  //人员信息
  userInfo: (state) => state.user.userInfo,
  // 修改样式
  cssVar: (state) => {
    return {
      ...state.theme.variables,
    }
  },
  //设置主题
  // 主题2
  themeType: (state) => state.theme.themeType,
  tagsViewList: (state) => state.app.tagsViewList
}
export default getters
