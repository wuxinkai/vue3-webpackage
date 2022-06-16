<template>

  <div class="container mx-auto">
    <div class="flex space-x-4 ...">

      <div class="flex-1 ...">
        <!-- 全局组件 -->
        <pro-popup v-model:dialogVisible="dialogVisible" name="（2）从父页面传过来的值">
          （1）从插槽传过来的值
        </pro-popup>
        <el-button @click="onShowPopup" type="text">弹出框1</el-button>
      </div>
      <div class="flex-1 ...">
        <pro-popover plcaement="bottom-left">
          <!-- 具名插槽：弹出框的视图层 reference名字 -->
          <template #reference>
            <div class="icon-style w-4 h-4 p-1 cursor-pointer rounded-sm duration-200">
              <svg-icon icon="introduce" />
            </div>
          </template>
          <div class="flex items-center  p-2 cursor-pointer rounded hover:bg-zinc-100/90" @click="onItemClick(item)" v-for="(item,index) in themeArr">
            <svg-icon :icon="item.icon" />
            <span class="text-zinc-900 text-sm ml-2">{{item.name}}</span>
          </div>
        </pro-popover>
      </div>
      <div class="flex-1 ..."></div>
    </div>
  </div>

</template>

<script setup>


import { useStore } from 'vuex'
import { ref } from 'vue'

const dialogVisible = ref(false)
const themeArr = [
  { id: "0", type: 'TH1', icon: 'user', name: '极简白' },
  { id: "1", type: 'TH2', icon: 'guide', name: '极夜黑' },
  { id: "2", type: 'TH3', icon: 'change-theme', name: '跟随系统' },
]

const onShowPopup = () => {
  dialogVisible.value = true
}

const store = useStore()
const onItemClick = (themeItem) => {
  store.commit('theme/changeThemeType', themeItem.type)
}
</script>
<style lang="scss" scoped>
.icon-style {
  font-size: 30px;
  color: red;
  .svg-icon {
    color: red;
  }
}
</style>
