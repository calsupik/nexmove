<template>
  <div id="login" class="bg-dark">
    <b-row class="justify-content-md-center">
      <img src="../assets/logo.png">
    </b-row>
    <b-row class="justify-content-md-center">
      <h1>Welcome to NexMove</h1>
    </b-row>
    <b-row class="justify-content-md-center" v-if="message">
      <b-alert :variant="message.variant" dismissible :show="message.show" @dismissed="message.show=false">
        {{message.text || errorText}}
      </b-alert>
    </b-row>
    <b-row class="justify-content-md-center" v-if="!forgot.show && !reset.show">
      <b-card-group deck>
        <b-card>
          <b-form action="../auth/local" method="post">
            <h3>Login</h3>
            <b-form-group>
              <b-form-input type="email" placeholder="Enter Email" name="username" required></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input type="password" placeholder="Enter Password" name="password" required></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-button type="submit" variant="success">Login</b-button>
            </b-form-group>
          </b-form>
          <a href="#" v-on:click="forgot.show=true">Forgot Password?</a>
        </b-card>
        <b-card>
          <b-form action="../auth/createuser" method="post">
            <h4>New User</h4>
            <b-form-group>
              <b-form-input type="email" placeholder="Enter Email" name="username" required></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input type="password" placeholder="Enter Password" name="password" required></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input type="password" placeholder="Confirm Password" name="cpassword" required></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-button type="submit" variant="primary">Submit</b-button>
            </b-form-group>
          </b-form>
        </b-card>
      </b-card-group>
    </b-row>
    <b-row class="justify-content-md-center" v-if="forgot.show && !reset.show">
      <b-card-group deck>
        <b-card>
          <b-form v-on:submit.prevent="forgotPasswordSubmit()">
            <h3>Forgot Password</h3>
            <b-form-group>
              <b-form-input type="email" placeholder="Enter Email" v-model="forgot.email" required></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-button type="submit" variant="success">Reset</b-button>
            </b-form-group>
          </b-form>
          <a href="#" v-on:click="forgot.show=false">Cancel</a>
        </b-card>
      </b-card-group>
    </b-row>
    <b-row class="justify-content-md-center" v-if="reset.show">
      <b-card-group deck>
        <b-card>
          <b-form v-on:submit.prevent="resetPasswordSubmit()">
            <h3>Reset Password</h3>
            <b-form-group>
              <b-form-input type="password" placeholder="Enter Current Temporary Password" v-model="reset.current" required></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input type="password" placeholder="Enter New Password" v-model="reset.new" required></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-button type="submit" variant="success">Submit</b-button>
            </b-form-group>
          </b-form>
        </b-card>
      </b-card-group>
    </b-row>
  </div>
</template>

<script>
import ApiAuth from '../factories/ApiAuth'

export default {
  name: 'Login',
  props: ['error'],
  computed: {
    errorText: function () {
      switch (this.error) {
        case 'incorrectpassword':
          return 'Incorrect password. Please try again.'
        case 'noemail':
          return 'Email not found. Try again or create a new user.'
        case 'nopassword':
          return 'Password Not Provided'
        case 'nouser':
          return 'User not found. Try again or create a new user.'
        case 'passwordsdonotmatch':
          return 'Passwords do not match.'
        case 'usernamealreadyexists':
          return 'Username already exisits. Sign in or use another email.'
        default:
          return 'An error occured. Please try again.'
      }
    }
  },
  data () {
    return {
      forgot: {
        show: false,
        email: null
      },
      reset: {
        show: false,
        current: null,
        new: null
      },
      message: {
        show: false,
        variant: null,
        text: null
      }
    }
  },
  methods: {
    async forgotPasswordSubmit () {
      try {
        await ApiAuth.forgotPassword(this.forgot.email)
        this.forgot.show = false
        this.message.variant = 'success'
        this.message.text = 'Email Sent!'
        this.message.show = true
      } catch (err) {
        this.message.variant = 'danger'
        this.message.text = err.message
        this.message.show = true
      }
    },
    async resetPasswordSubmit () {
      try {
        await ApiAuth.resetPassword({currentPassword: this.reset.current, newPassword: this.reset.new})
        this.$router.push('dashboard')
      } catch (err) {
        this.message.variant = 'danger'
        this.message.text = err.message
        this.message.show = true
      }
    }
  },
  async mounted () {
    if(this.error){
      this.message.variant = 'danger'
      this.message.text = this.errorText
      this.message.show = true
    }

    if (this.$store.state.isLoggedIn && this.$store.state.auth.user) {
      if (this.$store.state.auth.user.needs_password_reset) {
        this.reset.show = true
      } else {
        this.$router.push('dashboard')
      }
    }
  },
  async created () {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#login {
  min-height: calc(100vh);
  padding: 40px;

  .row {
    padding: 10px;

    h1 {
      color: white;
    }

    .card {
      text-align: center;
      box-shadow: 6px 3px 3px rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
