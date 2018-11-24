<template>
  <div id="profile">
    <nav-bar></nav-bar>
    <b-container>
      <h1 class="text-center">Profile</h1>
      <h4 class="text-center">Edit Profile</h4>

      <b-row class="justify-content-md-center">
        <b-alert :show="dismissCountDown" :variant="dismissCountDownVariant" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged" dismissible>
          <p>{{alertText}}</p>
          <b-progress :variant="dismissCountDownVariant" :value="dismissCountDown" :max="dismissSecs" height="4px"></b-progress>
        </b-alert>
      </b-row>

      <b-row class="justify-content-md-center">
        <p>Username/Email: {{currentUser.username_email}}</p>
      </b-row>

      <b-row class="justify-content-md-center">
        <b-card>
          <b-form>
            <b-form-group>
              <label>First Name:</label>
              <b-form-input v-model="currentUser.first_name" type="text" placeholder="First Name"></b-form-input>
            </b-form-group>
            <b-form-group>
              <label>Last Name:</label>
              <b-form-input v-model="currentUser.last_name" type="text" placeholder="Last Name"></b-form-input>
            </b-form-group>
          </b-form>
          <b-btn variant="success" v-on:click="saveUser(currentUser)">Save</b-btn>
        </b-card>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Users from '../factories/Users'
import NavBar from './Navbar'

export default {
  name: 'Profile',
  components: {
    navBar: NavBar
  },
  data () {
    return {
      currentUser: this.$store.state.auth.user,
      dismissSecs: 5,
      dismissCountDown: 0,
      dismissCountDownVariant: 'success',
      alertText: null
    }
  },
  computed: {},
  methods: {
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    async saveUser (user) {
      user.name = user.first_name.trim() + ' ' + user.last_name.trim()
      const response = await Users.save(user)

      this.dismissCountDown = this.dismissSecs
      if (response >= 400) {
        this.alertText = 'Error Saving Profile.'
        this.dismissCountDownVariant = 'warning'
      } else {
        this.alertText = 'Profile Saved Successfully!'
      }
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
  padding: 20px;
}

.card {
  text-align: center;
}
</style>
