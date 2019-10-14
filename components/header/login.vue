<template>
  <div>
    <template v-if="isLogin">
      欢迎您!
      <span>{{user}}</span>
      <nuxt-link to="/loginout">退出</nuxt-link>
    </template>

    <template v-else>
      <nuxt-link to="/login">登录</nuxt-link>
      <nuxt-link to="/register">注册</nuxt-link>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: false,
      user: ""
    };
  }
};
</script>

<style>
</style>