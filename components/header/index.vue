<template>
  <div>
    <el-row :gutter="10" class="header-top">
      <el-col :span="6">
        <city />
      </el-col>
      <el-col :span="6">
        <login />
      </el-col>
      <el-col :span="12">
        <header-nav />
      </el-col>
    </el-row>
    <el-row>
      <search-bar />
    </el-row>
  </div>
</template>

<script>
import city from "./city";
import login from "./login";
import headerNav from "./nav";
import searchBar from "./search";
export default {
  components: {
    city,
    login,
    headerNav,
    searchBar
  }
};
</script>

<style>
</style>