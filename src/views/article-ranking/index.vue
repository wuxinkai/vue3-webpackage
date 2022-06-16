<template>

  <h1>
    app.config.globalProperties.$quanjushuxing = 666666
  </h1>

  <el-card class="header">
    <div class="dynamic-box">
      <span class="title">标题</span>
      <el-checkbox-group v-model="selectDynamicLabel">
        <el-checkbox v-for="(item, index) in dynamicData" :key="index" :label="item.label">{{ item.label }}</el-checkbox>
      </el-checkbox-group>
    </div>
  </el-card>

  <el-card>

    <el-table ref="tableRef" :data="tableData" class="table-box" border style="width: 100%">
      <el-table-column align="center" v-for="(item, index) in tableColumns" :key="index" :prop="item.prop" :label="item.label">
        <template #default="{ row }" v-if="item.prop === 'poster'">
          <img :src="row.poster" alt="">
        </template>
        <template #default="{ row }" v-if="item.prop === 'urlImg'">
          <img :src="row.urlImg" v-if="row.urlImg">
        </template>

      </el-table-column>

    </el-table>
    <!-- 分页 -->
    <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[2, 5, 10, 20]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </el-card>

</template>

<script setup>
import { ref, onActivated, onMounted } from 'vue'
import { getUserManageList, deleteUser } from '@/api/user-manage'
import { tableColumns, selectDynamicLabel, dynamicData } from './dynamic'
import { tableRef, initSortable } from './sortable'
import { getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
console.log(proxy?.$quanjushuxing)
let newda = proxy?.$quanjuFn(777)
console.log(newda)




// 数据相关
const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(6)
// 获取数据的方法
const getListData = async () => {
  const result = await getUserManageList({
    page: page.value,
    size: size.value
  })
  tableData.value = result
  total.value = 1000
}
getListData()


const handleSizeChange = (currentSize) => {
  size.value = currentSize
  getListData()
}

/**
 * 页码改变触发
 */
const handleCurrentChange = (currentPage) => {
  page.value = currentPage
  getListData()
}


// 表格拖拽相关
onMounted(() => {
  initSortable(tableData, getListData)
})

</script>

<style lang="scss" scoped>
.table-box {
  :deep(.sortable-ghost) {
    opacity: 0.6;
    color: #fff !important;
    background: red !important;
  }
}
</style>
