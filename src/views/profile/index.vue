<template>
  <div class="my-container">
    <el-row>
      <el-col :span="6">
        <project-card :features="featureData" class="user-card" />
      </el-col>
      <el-col :span="18">
        <el-card>
          <el-tabs v-model="activeName">
            <el-tab-pane label="功能" name="feature">
              <feature :features="featureData" />
            </el-tab-pane>
            <el-tab-pane label="章节" name="chapter">
              <chapter />
            </el-tab-pane>
            <el-tab-pane label="作者" name="author">
              <author />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import ProjectCard from './components/ProjectCard.vue'
import Chapter from './components/Chapter.vue'
// eslint-disable-next-line
import Feature from './components/Feature.vue'
import Author from './components/Author.vue'
import { ref } from 'vue'
import { feature } from '@/api/user'


const activeName = ref('feature')

const featureData = ref([])
const getFeatureData = async () => {
  featureData.value = await feature()

}
getFeatureData()


</script>

<style lang="scss" scoped>
.my-container {
  .user-card {
    margin-right: 20px;
  }
}
</style>
