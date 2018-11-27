<template>
  <b-navbar toggleable="md" class="navbar-dark bg-dark static-top">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand href="/#/dashboard">NexMove</b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown :text="user.first_name || user.username_email" right>
          <b-dropdown-item href="/#/profile">Profile</b-dropdown-item>
          <b-dropdown-item href="/auth/logout">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>

export default {
  name: 'NavBar',
  data () {
    return {
      user: this.$store.state.auth.user
    }
  },
  computed: {},
  methods: {},
  async created () {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar {
  box-shadow: 4px 3px 3px rgba(0, 0, 0, 0.2);
}
</style>
