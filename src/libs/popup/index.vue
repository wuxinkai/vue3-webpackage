<template>
  <!-- 蒙版 -->
  <teleport to="body">
    <!--内容 -->
    <transition name="fade">
      <div @click="confirm()" v-if="dialogVisible" class="w-screen fixed  h-screen bg-zinc-900/80 z-40 top-0 left-0"></div>
    </transition>
    <transition name="popup-down-up">
      <div v-bind="$attrs" v-if="dialogVisible" class="w-screen text-xl text-white z-50  fixed top-20 left-40">
        <slot />
        <p>{{name}}</p>
      </div>
    </transition>
  </teleport>

</template>
<script setup>
import { watch, toRefs } from 'vue'
import { useScrollLock } from "@vueuse/core"
const props = defineProps({
  dialogVisible: {
    type: Boolean,
    required: true
  },
  name: {
    type: String,
    default: '我是默认值'
  }
})



//更新事件
const emits = defineEmits(['update:dialogVisible'])
const confirm = () => {

  emits('update:dialogVisible', false)
}

// 滚动锁定，弹框出现不能发起滚动事件
const isLocked = useScrollLock(document.body)

//监听数据变化
const visible = toRefs(props).dialogVisible;
watch(visible, (newValue, oldValue) => {
  //锁定滚动
  isLocked.value = newValue
  alert(newValue);
});

</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.popup-down-up-enter-active,
.popup-down-up-leave-active {
  transition: all 0.3s;
}

.popup-down-up-enter-from,
.popup-down-up-leave-to {
  transition: all 0.3s;
}

// w-screen  宽全屏
// h-screen 高全屏
//  bg-zinc-90/80 设置背景色  80表示透明度
</style>
