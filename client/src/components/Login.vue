<template>
  <div id="login">
    <b-row class="justify-content-md-center">
      <img src="../assets/logo.png">
    </b-row>
    <b-row class="justify-content-md-center">
      <h1>Welcome to NexMove</h1>
    </b-row>
    <b-row class="justify-content-md-center" v-if="error">
      <b-alert variant="danger" dismissible :show="error" @dismissed="error=false">
        {{errorText}}
      </b-alert>
    </b-row>
    <b-row class="justify-content-md-center">
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
  </div>
</template>

<script>
export default {
  name: 'Login',
  props: ['error'],
  computed: {
    errorText: function () {
      switch (this.error) {
        case 'incorrectpassword':
          return 'Incorrect Password'
        case 'noemail':
          return 'Email Not Found'
        case 'nopassword':
          return 'Password Not Provided'
        case 'nouser':
          return 'User Not Found'
        case 'passwordsdonotmatch':
          return 'Passwords Do Not Match'
        case 'usernamealreadyexists':
          return 'Username Already Exisits'
        default:
          return 'An Error Occured'
      }
    }
  },
  data () {
    return {}
  },
  methods: {},
  async mounted () {
    if (this.$store.state.isLoggedIn && this.$store.state.auth.user) {
      this.$router.push('dashboard')
    }
  },
  async created () {
    if (this.$store.state.isLoggedIn && this.$store.state.auth.user) {
      this.$router.push('dashboard')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#login {
  background: linear-gradient(-45deg, #F89B3B 33%, transparent 0%), linear-gradient(-45deg, #696BAE 100%, transparent 33%);
  padding: 40px;
}

.row {
  padding: 10px;
}

h1 {
  color: white;
}

.card {
  text-align: center;
  box-shadow: 6px 3px 3px rgba(0, 0, 0, 0.2);
}
</style>
