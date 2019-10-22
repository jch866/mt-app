<template>
  <div>
    <template v-if="user">
      欢迎您!
      <span>{{user}}</span>
      <nuxt-link to="/loginout">[退出]</nuxt-link>
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
      user: ""
    };
  },
  async mounted(){
    let self = this;
    let {status,data} = await this.$axios.get('/user/getUser');
    if(status ===200){
      if(data.code==0){
        self.user = data.user;
      }else{
        //self.$message('请求数据失败');
      }

    }
  },
  asyncData(){

  }
};
</script>

<style>
</style>