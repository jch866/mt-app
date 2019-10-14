<template>
  <el-row class="search-bar">
    <el-col :span="4" class="logo">
      <img src="https://cdn-1256130579.cos.ap-shanghai.myqcloud.com/images/loading-icon.svg" alt />
    </el-col>
    <el-col :span="12">
      <div class="main-search-input">
        <el-input
          placeholder="搜索内容"
          v-model="search"
          @blur="blurHandler"
          @focus="focusHandler"
          @input="inputHandler"
        ></el-input>
        <el-button type="primary">
          <i class="el-icon-search"></i>
        </el-button>
        <dl class="focus-list" v-show="isFocus">
          <dd v-for="(item,idx) in list" :key="idx">{{`搜索聚焦-${item}`}}</dd>
        </dl>
        <dl class="result-list" v-show="isSearch">
          <dd v-for="(item,idx) in list" :key="idx">{{`搜索结果-${item}`}}</dd>
        </dl>
      </div>
      <dl class="suggest-list">
        <dd v-for="(item,idx) in list" :key="idx">{{`建议-${item}`}}</dd>
      </dl>
    </el-col>
    <el-col :span="8">
      <dl class="right-menu">
        <dd v-for="(item,idx) in listR" :key="idx">{{`栏目R-${item}`}}</dd>
      </dl>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      list: [1, 2, 3, 4, 5, 6],
      listR: [1, 2, 3, 4],
      isFocus: false,
      isSearch: false,
      search:''
    };
  },
  computed: {
      
  },
  methods: {
    blurHandler() {
      this.isFocus = false;
    },
    focusHandler() {
      this.isFocus = true;
    },
    inputHandler() {
        this.isFocus = false;
        this.isSearch = true;
    }
  }
};
</script>
 