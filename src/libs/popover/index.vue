<template>
  <div class="relative" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
    <div ref="referebceTarget">
      <!-- 具名插槽：弹出框的视图层 -->
      <slot name="reference" />
    </div>
    <!-- 气泡 -->
    <transition name="slide">
      <div ref="contentTarget" v-show="isViable" :style="contentStyle" class="absolute p-1 z-20 bg-white border rounded-md">
        <!-- 匿名插槽：弹出框中显示的内容 -->
        <slot />
      </div>
    </transition>
  </div>

</template>

<script>
// 关闭时间
const DELAY_TIME = 100
//左上
const PROP_TOP_LEFT = 'top-left'
//右上
const PROP_TOP_RIGHT = 'top-right'
//左下
const PROP_BOTTOM_LEFT = 'bottom-left'
//右下
const PROP_BOTTOM_RIGHT = 'bottom-right'

const placementEnum = [
  PROP_TOP_LEFT,
  PROP_TOP_RIGHT,
  PROP_BOTTOM_LEFT,
  PROP_BOTTOM_RIGHT
]
</script>

<script setup>
import { nextTick, ref, watch } from 'vue'

// 1 指定所有可选位置常量 并生成 enum
// 2 通过prop控制指定位置
// 3 获取dom  创建读取元素尺寸
// 4 根据prop 计算样式对象

//接收上面定义的常量
const props = defineProps({
  //控制气泡位置
  plcaement: {
    type: String,
    default: PROP_BOTTOM_LEFT,
    validator(val) {
      const result = placementEnum.includes(val)
      if (!result) {
        throw new Error(`你的plcaement必须是${placementEnum.join('. ')}中的一个`)
      }
      return result
    }
  }
})

//计算元素尺寸
const referebceTarget = ref(null)
const contentTarget = ref(null)
const contentStyle = ref({
  top: 0,
  left: 0
})
//传入ref等到宽高
const useElenemtSize = (target) => {
  if (!target) return {}
  return {
    width: target.offsetWidth,
    height: target.offsetHeight
  }
}




const isViable = ref(false)
let timeOut

//鼠标移入
const onMouseenter = () => {
  isViable.value = true
  if (timeOut) {
    clearTimeout(timeOut)
  }
}
//鼠标出
const onMouseleave = () => {
  //解决鼠标移入，dom
  timeOut = setTimeout(() => {
    isViable.value = false
  }, DELAY_TIME);
}

//气泡样式 气泡展示的时候进行计算
watch(isViable, (val) => {
  if (!val) return
  //等元素渲染完成
  nextTick(() => {
    switch (props.plcaement) {
      case PROP_TOP_LEFT:
        contentStyle.value.top = 0
        contentStyle.value.left = -useElenemtSize(contentTarget.value).width + 'px'
        break
      case PROP_TOP_RIGHT:
        contentStyle.value.top = 0
        contentStyle.value.left = useElenemtSize(contentTarget.value).width + 'px'
        break
        break
      case PROP_BOTTOM_LEFT:
        contentStyle.value.top = useElenemtSize(referebceTarget.value).height + 'px'
        contentStyle.value.left = -useElenemtSize(contentTarget.value).width + 'px'
        break
        break
      case PROP_BOTTOM_RIGHT:
        contentStyle.value.top = useElenemtSize(referebceTarget.value).height + 'px'
        contentStyle.value.left = -useElenemtSize(contentTarget.value).width + 'px'
        break
    }
  })
})

</script>
<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
