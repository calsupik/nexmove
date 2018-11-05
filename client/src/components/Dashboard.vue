<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  data () {
    return {
      user: this.$store.state.auth.user
    }
  },
  methods: {

  },
  async mounted () {
    if(!this.$store.state.isLoggedIn){
      this.$router.push('login')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
