<template>

  <div class="login-container">
    <el-form class="login-form" ref="loginFromRef" :model="loginForm" :rules="loginRules">
      <div class="title-container">
        <h3 class="title bg-red-900">用户登录</h3>
        <!-- 外链svg -->
        <span class="svg-container">
          <svg-icon icon="https://res.lgdsunday.club/user.svg" />
        </span>
        <lang-select class="lang-select" effect="light" />
      </div>
      <!-- username -->
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon="user" />
        </span>

        <el-input v-model="loginForm.username" />
      </el-form-item>
      <!-- password -->
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon="password" />
        </span>
        <el-input v-model="loginForm.password" :type="passwordType" />
        <span class="show-pwd" @click="onChangePwdType">
          <svg-icon  :icon="passwordType === 'password' ? 'eye' : 'eye-open '" />
        </span>
      </el-form-item>
      <el-button type="primary" style="width: 100%; margin-bottom: 30px" :loading="loading" @click="handleLogin">登录</el-button>
      <!-- <div class="tips" v-html="msg.login.desc"></div> -->
    </el-form>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import router from '@/router'
// 数据源
const loginForm = ref({
  username: 'admin',
  password: '123456'
})

// 验证规则

const loginRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: "不能为空"
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能少于6位'))
        } else {
          callback()
        }
      }
    }

  ]
})



// 处理密码框文本显示状态
const passwordType = ref('password')
const onChangePwdType = () => {

  passwordType.value === 'password' ? (passwordType.value = 'text') : (passwordType.value = 'password')
}
// 提交
// 字段
const loading = ref(false)
const loginFromRef = ref(null)
const store = useStore()
const handleLogin = () => {
  loginFromRef.value.validate((valid) => {
    if (!valid) return
    loading.value = true
    store.dispatch('user/login', loginForm.value).then((res) => {
      loading.value = false
    }).catch((err) => {
      loading.value = false
    })
  })

}


</script>
<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;
:deep(.el-input__wrapper) {
  width: 100% !important;
  background: transparent;
  box-shadow: none;
}

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    :deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    :deep(.el-input) {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    :deep(.lang-select) {
      position: absolute;
      top: 4px;
      right: 0;
      background-color: white;
      font-size: 22px;
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .tips {
    font-size: 16px;
    line-height: 28px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
}
</style>
