<template>
  <div class="container">
    <div>
      <h1 class="title">main content</h1>
      <h2 class="subtitle">main content subtitle</h2>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.fetchSomething();
  },
  methods: {
    async fetchSomething() {
      let url = "/user/getUser";
      let { status, data } = await this.$axios.get(url);
      if (status === 200) {
        if (data.code === 0) {
        }
      }
    }
  }
};
</script>

