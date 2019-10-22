<template>
  <div></div>
</template>

<script>
export default {
  layout: "login",
  data() {
    return {
      statusmsg: ""
    };
  },
  middleware: async ctx => { //ctx怎么有$axios方法
    let { status, data } = await ctx.$axios.get("/user/loginout");
    if (status === 200) {
      if (data && data.code === 0) {
        window.location.href = '/'
      }
    }
  },
  methods: {}
};
</script>

