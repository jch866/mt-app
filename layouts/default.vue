<template>
  <el-container class="wrap">
    <el-header class="header-section">
        <mt-header></mt-header>
        <mt-menu></mt-menu>
    </el-header>
    <el-main>
      <nuxt />
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>
<script>
import mtHeader from '@/components/header/index'
import mtMenu from '@/components/menu/index'
export default {
  components:{
    mtHeader,mtMenu
  }
}
</script>
 
