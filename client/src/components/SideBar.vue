<template>
  <ul class="sidebar navbar-nav">
    <li class="nav-item">
      <a class="nav-link" href="/#/dashboard">
        <i class="fas fa-fw fa-tachometer-alt"></i>
        <span>Dashboard</span>
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="/#/locations">
        <i class="fas fa-fw fa-location-arrow"></i>
        <span>Locations</span>
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="/#/profile">
        <i class="fas fa-fw fa-user"></i>
        <span>Profile</span>
      </a>
    </li>
  </ul>
</template>

<script>

export default {
  name: 'SideBar',
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
<style lang="scss" scoped>
.sidebar {
  width: calc(10%);
  min-height: calc(100vh - 56px);
  background-color: #212529;
  color: white;
  box-shadow: 4px 3px 3px rgba(0, 0, 0, 0.2);

  .nav-link {
    color: white;
    padding: 1rem;
  }
}
</style>
