
<template>
  <el-collapse v-model="activeName" accordion>
    <el-collapse-item v-for="item in features" :key="item.id" :title="item.title" :name="item.id">
      <text v-html="item.id"></text>

      <text v-html="item.e"></text>
      <text v-html="item.f"></text>
      <text v-html="item.title"></text>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup>
import { ref, defineProps } from 'vue'
const activeName = ref(0)
defineProps({
  features: {
    type: Array,
    required: true
  }
})

</script>

<style lang='scss' scoped>
:deep(.el-collapse-item__header) {
  font-weight: bold;
}

.el-collapse-item {
  :deep(a) {
    color: #2d62f7;
    margin: 0 4px;
  }
}
text{
  margin-right: 16px;
}
</style>
