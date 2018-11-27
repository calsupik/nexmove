<template>
  <div id="profile" class="container-fluid">
    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <a href="#/profile">Profile</a>
      </li>
      <li class="breadcrumb-item active">Edit Profile</li>
    </ol>

    <!-- Profile Information -->
    <b-row>
      <div class="col-xl-3 col-sm-6 mb-3">
        <b-card>
          <b-row class="justify-content-md-center">
            <p><b>Username/Email:</b> {{currentUser.username_email}}</p>
          </b-row>
          <b-row>
            <b-col sm="3"><p><b>First Name:</b></p></b-col>
            <b-col sm="9"><b-form-input v-model="currentUser.first_name" type="text" placeholder="First Name"></b-form-input></b-col>
          </b-row>
          <b-row>
            <b-col sm="3"><p><b>Last Name:</b></p></b-col>
            <b-col sm="9"><b-form-input v-model="currentUser.last_name" type="text" placeholder="Last Name"></b-form-input></b-col>
          </b-row>
          <b-btn variant="success" v-on:click="saveUser(currentUser)">Save</b-btn>
        </b-card>
      </div>
    </b-row>

    <!-- Confirmation Alert -->
    <b-alert :show="dismissCountDown" :variant="dismissCountDownVariant" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged" dismissible>
      <p>{{alertText}}</p>
      <b-progress :variant="dismissCountDownVariant" :value="dismissCountDown" :max="dismissSecs" height="4px"></b-progress>
    </b-alert>
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
      dismissSecs: 4,
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
  async mounted () {},
  async created () {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.card {
  text-align: right;

  .row {
    padding: 10px;
  }
}
</style>
