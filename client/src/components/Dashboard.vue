<template>
  <div class="dashboard">
    <nav-bar></nav-bar>
    <h1>Dashboard</h1>
    <h4>Locations</h4>
    <b-table v-if="locations" striped hover :items="locations"></b-table>
  </div>
</template>

<script>
import Locations from '../factories/Locations'
import NavBar from './Navbar'

export default {
  name: 'Dashboard',
  components: {
    navBar: NavBar
  },
  data () {
    return {
      locations: null
    }
  },
  computed: {},
  methods: {
    async getLocations () {
      this.locations = await Locations.getLocations()
    }
  },
  async mounted () {
    await this.getLocations()
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
  padding: 20px
}
</style>
