<template>
  <el-row :gutter="8">
    <el-col :span="6">
      <div class="cate-list" @mouseleave="leaveHandler">
        <dt>栏目列表</dt>
        <dd v-for="(item,idx) in catelist" :key="idx" @mouseenter="enterHandler(item)">
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
        <!-- <div v-for="(item,idx) in childList" :key="idx"> -->
        <!-- <dt>子栏目</dt> -->
        <dd v-for="(item,idx) in childList" :key="idx">{{item.name}}</dd>
        <!-- </div> -->
      </div>
    </el-col>
    <el-col :span="10">
      <!-- <el-carousel height="150px">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3 class="small">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel> -->
    </el-col>
    <el-col :span="6"></el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      catelist: [
        {
          name: "月卡",
          type: "kind1",
          child: [
            {
              name: "月卡1",
              id: 1
            },
            {
              name: "月卡2",
              id: 2
            },
            {
              name: "月卡3",
              id: 3
            },
            {
              name: "月卡4",
              id: 4
            }
          ]
        },

        {
          name: "停车场",
          type: "kind2",
          child: [
            {
              name: "停车场1",
              id: 1
            },
            {
              name: "停车场2",
              id: 2
            },
            {
              name: "停车场3",
              id: 3
            },
            {
              name: "停车场4",
              id: 4
            }
          ]
        },
        {
          name: "优惠券",
          type: "kind3",
          child: [
            {
              name: "优惠券1",
              id: 1
            },
            {
              name: "优惠券2",
              id: 2
            },
            {
              name: "优惠券3",
              id: 3
            },
            {
              name: "优惠券4",
              id: 4
            }
          ]
        },
        {
          name: "订单",
          type: "kind4",
          child: [
            {
              name: "订单1",
              id: 1
            },
            {
              name: "订单2",
              id: 2
            },
            {
              name: "订单3",
              id: 3
            },
            {
              name: "订单4",
              id: 4
            }
          ]
        },
        {
          name: "报表",
          type: "kind5",
          child: [
            {
              name: "报表1",
              id: 1
            },
            {
              name: "报表2",
              id: 2
            },
            {
              name: "报表3",
              id: 3
            },
            {
              name: "报表4",
              id: 4
            }
          ]
        }
      ],
      mtype: "",
      enterTimer: null
    };
  },
  computed: {
    childList() {
      return this.catelist.find(item => {
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
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>