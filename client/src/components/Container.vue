<template>
  <div id="container">
    <nav-bar></nav-bar>
    <div id="wrapper">
      <side-bar></side-bar>
      <div id="content-wrapper">
        <component data-useriq v-bind:is="currentView"></component>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from './Navbar'
import SideBar from './SideBar'
import Dashboard from './Dashboard'
import Locations from './Locations'
import Profile from './Profile'

export default {
  name: 'Container',
  components: {
    navBar: NavBar,
    sideBar: SideBar,
    dashboard: Dashboard,
    locations: Locations,
    profile: Profile
  },
  props: {
    currentView: {
      type: String,
      required: true
    }
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
<style lang="scss" scoped>
#wrapper {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;

  #content-wrapper {
    overflow-x: hidden;
    width: 100%;
    padding: 40px;
  }
}

</style>
