<template>
  <div>
    <img src="../assets/logo.png" alt="">
    <h2>Vue Starter</h2>
    <div>
      <button v-on:click="welcome">Start</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloVue",
  methods: {
    welcome() {
      alert("welcome");
    }
  }
};
</script>
<style lang="scss" scoped>
  body{
    height: 100%;
  }
</style>
