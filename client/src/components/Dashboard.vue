<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <b-button href="/auth/logout">Logout</b-button>
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
  async created () {
    if (!this.$store.state.isLoggedIn || !this.$store.state.auth.user) {
      this.$router.push('login')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
