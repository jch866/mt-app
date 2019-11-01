<template>
  <div>
      <i class="el-icon-location"></i>
       {{ city }}  
      <nuxt-link to="/">切换城市</nuxt-link>
      [惠州,广州,揭阳]
  </div>
</template>

<script>
export default {
  data(){
    return {

    }
  },
  computed:{
    city(){
      return this.$store.state.geo.position.city;
    }
  }
}
</script>

<style>

</style>