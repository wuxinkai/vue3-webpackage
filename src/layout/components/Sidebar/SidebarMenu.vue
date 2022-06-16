<template>
  <!-- 一级 menu 菜单 -->
  <el-menu :uniqueOpened="true" :background-color="$store.getters.cssVar.menuBg" :text-color="$store.getters.cssVar.menuText" :active-text-color="$store.getters.cssVar.menuActiveText" router :default-active="activeMenu" :collapse="!$store.getters.sidebarOpened">
    <sidebar-item v-for="item in menuList" :key="item.path" :route="item"></sidebar-item>
  </el-menu>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { filterRouters, generateMenus } from '@/utils/route'
import SidebarItem from './SidebarItem.vue'

const router = useRouter()
const menuList = computed(() => {
  const FilterRouters = filterRouters(router.getRoutes())
  return generateMenus(FilterRouters)
})

//获取当前选中节点
const route = useRoute()
const activeMenu = computed(() => {
  return route.path
})
</script>

<style lang="scss" scoped></style>
