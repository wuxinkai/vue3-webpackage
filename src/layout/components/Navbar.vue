<template>
  <div class="navbar dark:bg-zinc-800 duration-500">
    <!-- 折叠按钮 -->
    <hamburger class="hamburger-container" />
    <breadcrumb id="guide-breadcrumb" class="breadcrumb-container" />

    <div class="right-menu">
      <guide class="right-menu-item hover-effect" />

      <header-search class="right-menu-item hover-effect" />

      <screenfull class="right-menu-item hover-effect" />

      <theme-picker class="right-menu-item hover-effect" />

      <!-- 头像 -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar shape="square" :size="40" :src="$store.getters.userInfo.avatar"></el-avatar>
          <el-icon class="el-icon-s-tools"></el-icon>

        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item> 首页 </el-dropdown-item>
            </router-link>
            <a target="_blank" href="">
              <el-dropdown-item>返回</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="logout">
             退出当前登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
// 搜索页面
import HeaderSearch from '../components/HeaderSearch'

// 主题换肤
import ThemePicker from '../components/ThemeSelect/index'

//折叠菜单
import Hamburger from '../components/Hamburger'
//面包屑导航
import Breadcrumb from '../components/Breadcrumb'
//全屏,
import Screenfull from '../components/Screenfull'
// 引导页
import Guide from '../components/Guide'
import { useStore } from 'vuex'
import { resetRouter } from '@/router'


//退出当前登录
const store = useStore()
const logout = (context) => {
  // resetRouter()
  store.dispatch('user/logout')
}

</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    // hover 动画
    transition: background 0.5s;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;

    :deep(.right-menu-item) {
      display: inline-block;
      padding: 0 18px 0 0;
      font-size: 24px;
      color: #5a5e66;
      vertical-align: text-bottom;
      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;
        // &:hover {
        //   background: rgba(0, 0, 0, 0.025);
        // }
      }
    }

    :deep(.avatar-container) {
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .el-avatar {
          --el-avatar-background-color: none;
          margin-right: 12px;
        }
      }
    }
  }
}
</style>
