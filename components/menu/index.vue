<template>
  <el-row :gutter="8">
    <el-col :span="6">
      <div class="cate-list" @mouseleave="leaveHandler">
        <dt>栏目列表</dt>
        <dd v-for="(item,idx) in menu" :key="idx" @mouseenter="enterHandler(item)">
          <span>{{item.name}}</span>
          <i class="el-icon-arrow-right"></i>
        </dd>
      </div>
      <div
        class="cate-list-child"
        v-if="mtype"
        @mouseenter="centerHandler"
        @mouseleave="cleaveHandler"
      >
        <div v-for="(item,idx) in childList" :key="idx" class="level2">
          <h4>{{item.title}}</h4>
          <span v-for="(childname,i) in item.child" :key="i">{{childname}}</span>
        </div>
      </div>
    </el-col>
    <el-col :span="10">
      <!-- <el-carousel height="150px">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3 class="small">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>-->
    </el-col>
    <el-col :span="6"></el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      mtype: "",
      enterTimer: null
    };
  },
  computed: {
    menu(){
      return this.$store.state.home.menu
    },
    childList() {
      return this.menu.find(item => {
        return item.type === this.mtype;
      }).child;
    }
  },
  methods: {
    enterHandler(item) {
      this.mtype = item.type;
    },
    leaveHandler() {
      let self = this;
      self.enterTimer = setTimeout(function() {
        self.mtype = "";
      }, 150);
    },
    centerHandler() {
      clearTimeout(this.enterTimer);
    },
    cleaveHandler() {
      this.mtype = "";
    }
  }
};
</script>
<style >
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>