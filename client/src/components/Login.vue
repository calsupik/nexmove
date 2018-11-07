<template>
  <b-container fluid>
    <img src="../assets/logo.png">
    <h1>Welcome to NexMove</h1>
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
            <h4>Create Account</h4>
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
  </b-container>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {}
  },
  methods: {},
  async created () {
    if (this.$store.state.isLoggedIn && this.$store.state.auth.user) {
      this.$router.push('dashboard')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
