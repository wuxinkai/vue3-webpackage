import { ref } from 'vue'
import Sortable from 'sortablejs'
// import { articleSort } from '@/api/article'
import { ElMessage } from 'element-plus'

// 排序相关
export const tableRef = ref(null)

/**
 * 初始化排序
 */
export const initSortable = (tableData, cb) => {
  // 设置拖拽效果
  const el = tableRef.value.$el.querySelectorAll('.el-table__body > tbody')[0]
  // 1. 要拖拽的元素
  // 2. 配置对象
  Sortable.create(el, {
    // 拖拽时类名
    ghostClass: 'sortable-ghost',
    // 拖拽结束的回调方法
    async onEnd(event) {
      const { newIndex, oldIndex } = event
      // 修改数据 调用排序的接口  post请求
      // await articleSort({
      //   initRanking: tableData.value[oldIndex].ranking,  //最初始的排名
      //   finalRanking: tableData.value[newIndex].ranking //最终点的排名
      // })
      ElMessage.success({
        message: "拖拽成功",
        type: 'success'
      })
      // 直接重新获取数据无法刷新 table !!
      tableData.value = []
      // 重新获取数据
      cb && cb()
    }
  })
}
