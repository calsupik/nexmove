<template>
  <div id="app">
    <b-row v-if="$store.state.isLoading" class="justify-content-md-center">
      <h3>Loading...</h3>
    </b-row>
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
}
</style>
