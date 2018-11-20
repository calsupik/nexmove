<template>
  <div class="dashboard">
    <nav-bar></nav-bar>
    <b-container>
      <h1>Dashboard</h1>
      <locations></locations>
    </b-container>
  </div>
</template>

<script>
import NavBar from './Navbar'
import Locations from './Locations'

export default {
  name: 'Dashboard',
  components: {
    navBar: NavBar,
    locations: Locations
  },
  data () {
    return {}
  },
  computed: {},
  methods: {},
  async mounted () {
    if (!this.$store.state.isLoggedIn || !this.$store.state.auth.user) {
      this.$router.push('login')
    }
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
h1 {
  margin: 20px;
}
</style>
