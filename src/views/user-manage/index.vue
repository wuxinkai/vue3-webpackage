<template>
  <div class="user-manage-container">

    <el-card>

      <el-table :data="tableData" border style="width: 100%">
        <!-- 索引 -->
        <el-table-column label="id" prop="id" align="center" />
        <!-- 姓名 -->
        <el-table-column prop="name" label="姓名" align="center" />
        <!-- 联系方式 -->
        <el-table-column prop="mobile" label="联系方式" align="center" />
        <!-- 头像 -->
        <el-table-column label="头像" align="center">
          <template v-slot="{ row }">
            <el-image class="avatar" :src="row.avatar" :preview-src-list="[row.avatar]" />
          </template>
        </el-table-column>
        <!-- 角色 -->
        <el-table-column label="角色" align="center">
          <template v-slot="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag v-for="item in row.role" :key="item.id" size="mini">{{
                item.title
              }}</el-tag>
            </div>
            <div v-else>
              <el-tag size="mini">员工</el-tag>
            </div>
          </template>
        </el-table-column>
        <!-- 时间 -->
        <el-table-column prop="openTime" label="开通时间" align="center">
          <template v-slot="{ row }">
          开通时间
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" fixed="right" width="260" align="center">
          <template #default="{ row }">
            <el-button @click="onShowClick(row.id)" type="primary" size="mini">查看</el-button>
            <el-button type="info" size="mini" @click="onShowRoleClick(row)">角色</el-button>
            <el-button type="danger" @click="onRemoveClick(row)" size="mini" >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[2, 5, 10, 20]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>


    <!-- 查看 -->
    <roles-dialog v-model="roleDialogVisible" :userId="selectUserId" @updateRole="getListData"></roles-dialog>
  </div>
</template>

<script setup>
import { ref, onActivated, watch } from 'vue'
import { getUserManageList, deleteUser } from '@/api/user-manage'
import { useRouter } from 'vue-router'

import { ElMessageBox, ElMessage } from 'element-plus'
// import ExportToExcel from './components/Export2Excel.vue'
import RolesDialog from './components/roles.vue'

const router = useRouter()
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
  total.value =1000
}
getListData()

// 处理导入用户后数据不重新加载的问题
onActivated(getListData)
// 分页相关
/**
 * size 改变触发
 */
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

/**
 * excel 导入点击事件
 */
const onImportExcelClick = () => {
  router.push('/user/import')
}

/**
 * 删除按钮点击事件
 */

const onRemoveClick = (row) => {
  ElMessageBox.confirm(`确定要删除文章${row.username}吗`,
    {
      type: 'warning'
    }
  ).then(async () => {
    await deleteUser(row._id)
    // ElMessage.success(i18n.t('msg.excel.removeSuccess'))
    // 重新渲染数据
    getListData()
  })
}

/**
 * excel 导出点击事件
 */
const exportToExcelVisible = ref(false)
const onToExcelClick = () => {
  exportToExcelVisible.value = true
}

/**
 * 查看按钮点击事件
 */
const onShowClick = (id) => {
  router.push(`/user/info/${id}`)
}

/**
 * 查看角色的点击事件
 */
const roleDialogVisible = ref(false)
const selectUserId = ref('')
const onShowRoleClick = (row) => {
  roleDialogVisible.value = true
  selectUserId.value = row._id

}

// 保证每次打开重新获取用户角色数据,每次点击打开，都会从新获取数据
watch(roleDialogVisible, (val) => {
  if (!val) selectUserId.value = ''
})
</script>

<style lang="scss" scoped>
.user-manage-container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }
  :deep(.avatar) {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  :deep(.el-tag) {
    margin-right: 6px;
  }

  :deep(.pagination) {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
