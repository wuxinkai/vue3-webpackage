<template>
  <div class="author-container">
    <div class="header">
      <pan-thumb image="https://img4.sycdn.imooc.com/61110c2b0001152907400741-140-140.jpg" height="60px" width="60px" :hoverable="false">
        Sunday
      </pan-thumb>
      <div class="header-desc">
        <h3>Sunday</h3>
        <span>一个前端开发程序猿</span>
      </div>
    </div>
    <div class="info">
      高级技术专家，曾就职于国内一线互联网公司，统筹过的多个大型项目用户数已过千万级。致力于研究大前端技术，多次受邀参加国内前端技术分享会，如：2018 年 Google 中国技术分享会
    </div>
  </div>
</template>

<script setup>
import PanThumb from '@/components/PanThumb/index.vue'
import { } from 'vue'
</script>

<style lang="scss" scoped>
.author-container {
  .header {
    display: flex;
    .header-desc {
      margin-left: 12px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      span {
        font-size: 14px;
      }
    }
  }
  .info {
    margin-top: 16px;
    line-height: 22px;
    font-size: 14px;
    text-indent: 26px;
  }
}
</style>
