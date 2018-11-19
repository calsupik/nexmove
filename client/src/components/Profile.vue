<template>
  <div class="profile">
    <nav-bar></nav-bar>
    <div class="container">
      <h1>Profile</h1>
      <b-form>
        <h3>Edit Profile</h3>
        <p>Username/Email: {{currentUser.username_email}}</p>
        <b-form-group>
          <b-form-input v-model="currentUser.first_name" type="text" placeholder="First Name"></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input v-model="currentUser.last_name" type="text" placeholder="Last Name"></b-form-input>
        </b-form-group>
      </b-form>
      <b-btn variant="success" v-on:click="saveUser(currentUser)">Save</b-btn>
    </div>
  </div>
</template>

<script>
import Users from '../factories/Users'
import NavBar from './Navbar'

export default {
  name: 'Dashboard',
  components: {
    navBar: NavBar
  },
  data () {
    return {
      currentUser: this.$store.state.auth.user
    }
  },
  computed: {},
  methods: {
    async saveUser (user) {
      user.name = user.first_name.trim() + ' ' + user.last_name.trim()
      await Users.save(user)
    }
  },
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
  margin: 20px
}

table {
  margin: 20px 0px
}
</style>
