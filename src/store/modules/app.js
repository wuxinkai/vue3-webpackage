import { getItem, setItemStorage } from '@/utils/storage'
export default {
  state: () => ({
    // 折叠菜单
    sidebarOpened: true,
    tagsViewList: []
  }),
  mutations: {
    // 切换折叠按钮
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    //Tags 新增
    addTagsViewList(state, tag) {
      //判断是否存在
      const isFind = state.tagsViewList.find((item) => {
        return item.path === tag.path
      })
      // 处理重复
      if (!isFind) {
        state.tagsViewList.push(tag)
        setItemStorage('tagsView', state.tagsViewList)
      }
    },
    /**
 * 为制定的 tag 修改 title
 */
    changeTagsView(state, { index, tag }) {
      state.tagsViewList[index] = tag
      setItemStorage('tagsView', state.tagsViewList)
    },
    /**
     * 删除 tag
     * @param {type: 'other'||'right'||'index', index: index} payload
     */
    removeTagsView(state, payload) {
      if (payload.type === 'index') {
        state.tagsViewList.splice(payload.index, 1)
        return
      } else if (payload.type === 'other') {
        state.tagsViewList.splice(
          payload.index + 1,
          state.tagsViewList.length - payload.index + 1
        )
        state.tagsViewList.splice(0, payload.index)
      } else if (payload.type === 'right') {
        state.tagsViewList.splice(
          payload.index + 1,
          state.tagsViewList.length - payload.index + 1
        )
      }
      setItemStorage('tagsView', state.tagsViewList)
    }
  },
  actions: {}
}
