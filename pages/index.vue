<template>
  <div class="container">
    <div>
      <h1 class="title">eptingche</h1>
      <h2 class="subtitle">eptingche</h2>
    </div>
  </div>
</template>

<script>

export default {
  data(){
    return{}
  },
  mounted(){
    this.fetchSomething();
  },
  methods: {
  async fetchSomething() {
    let url = '/demo/list'
    let{status,data} = await this.$axios.get(url)
    if(status === 200){
      console.log(data)
    }
  }
}
};
</script>

