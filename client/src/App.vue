<template>
  <div id="app">
    <h3 v-if="$store.state.isLoading">Loading...</h3>
    <router-view v-else/>
  </div>
</template>

<script>
export default {
  name: 'App',
  async created () {
    await this.$store.dispatch('init')
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
